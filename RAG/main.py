import os
import subprocess
import textwrap
import warnings
import speech_recognition as sr
import pyttsx3
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from textblob import TextBlob

# Suppress warnings
os.environ["TOKENIZERS_PARALLELISM"] = "false"
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=FutureWarning)

app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize embeddings and retriever
embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectordb = Chroma(persist_directory="final_coe", embedding_function=embedding_model)
retriever = vectordb.as_retriever(search_kwargs={"k": 3})

# Chat history
chat_history = []

# Speech-to-text
def listen_to_microphone():
    recognizer = sr.Recognizer()
    mic = sr.Microphone()
    with mic as source:
        print("Speak now...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)

    try:
        query = recognizer.recognize_google(audio)
        print(f"You said: {query}")
        return query
    except sr.UnknownValueError:
        return "Sorry, I could not understand your voice."
    except sr.RequestError:
        return "Could not connect to speech recognition service."

# Text-to-speech
def speak_text(text):
    engine = pyttsx3.init()
    engine.setProperty('rate', 160)
    engine.say(text)
    engine.runAndWait()

class QuestionRequest(BaseModel):
    question: str

@app.post("/ask")
def ask_question(payload: QuestionRequest, speak: bool = Query(False)):
    # Correct spelling using TextBlob
    corrected_text = str(TextBlob(payload.question.strip()).correct()).lower()

    # Define sentiment keywords (add more variants)
    greeting_keywords = ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"]
    thanks_keywords = ["thank you", "thanks", "thx", "thank u", "thnks", "tysm"]
    welcome_keywords = ["you're welcome", "you are welcome", "no problem", "my pleasure", "sure"]
    bye_keywords = ["bye", "goodbye", "see you", "exit", "quit", "gudbye", "see ya", "farewell"]

    if any(kw in corrected_text for kw in greeting_keywords):
        answer = "Hello! How can I assist you regarding digital manufacturing at BVM?"
        if speak:
            speak_text(answer)
        return {"answer": answer}

    if any(kw in corrected_text for kw in thanks_keywords):
        answer = "You're welcome! Feel free to ask anything else."
        if speak:
            speak_text(answer)
        return {"answer": answer}

    if any(kw in corrected_text for kw in welcome_keywords):
        answer = "Happy to help!"
        if speak:
            speak_text(answer)
        return {"answer": answer}

    if any(kw in corrected_text for kw in bye_keywords):
        answer = "Goodbye! If you need assistance again with the Center of Excellence in Digital Manufacturing at BVM, feel free to return anytime."
        if speak:
            speak_text(answer)
        return {"answer": answer}

    # Retrieve documents from vector DB
    try:
        docs = retriever.get_relevant_documents(corrected_text)
    except Exception as e:
        return {"error": f"Document retrieval error: {str(e)}"}

    if not docs:
        return {"answer": "No relevant information found."}

    context = "\n\n".join([doc.page_content for doc in docs])
    history_prompt = "\n".join([f"User: {q}\nBot: {a}" for q, a in chat_history[-3:]])

    prompt = textwrap.dedent(f"""
        You are a helpful assistant providing concise answers about the Center of Excellence in Digital Manufacturing
        at Birla Vishwakarma Mahavidyalaya (BVM), CVMU University.

        Use the context below to answer the user's question. Be clear, relevant, and informative.

        IMPORTANT: Keep your answer complete but within 50 to 60 words.

        {history_prompt}
        User: {corrected_text}

        Context:
        {context}

        Bot:
    """)

    try:
        process = subprocess.Popen(
            ["ollama", "run", "phi3"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        stdout, stderr = process.communicate(input=prompt, timeout=60)

        if stderr.strip().lower().startswith("error"):
            return {"error": stderr.strip()}
        else:
            answer = stdout.strip()
            chat_history.append((corrected_text, answer))
            if speak:
                speak_text(answer)
            return {"answer": answer}

    except subprocess.TimeoutExpired:
        process.kill()
        return {"error": "Ollama process timed out."}
    except Exception as e:
        return {"error": f"Ollama failed: {e}"}

@app.get("/ask/voice")
def ask_with_voice(speak: bool = Query(False)):
    query = listen_to_microphone()
    return ask_question(QuestionRequest(question=query), speak=speak)