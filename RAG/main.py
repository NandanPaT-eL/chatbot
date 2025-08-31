import os
import re
import textwrap
import warnings
import speech_recognition as sr
import pyttsx3
import requests
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

os.environ["TOKENIZERS_PARALLELISM"] = "false"
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=FutureWarning)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectordb = Chroma(persist_directory="birla_coee", embedding_function=embedding_model)
retriever = vectordb.as_retriever(search_kwargs={"k": 8})

chat_history = []

def listen_to_microphone():
    recognizer = sr.Recognizer()
    mic = sr.Microphone()
    with mic as source:
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
    try:
        return recognizer.recognize_google(audio)
    except sr.UnknownValueError:
        return "Sorry, I could not understand your voice."
    except sr.RequestError:
        return "Could not connect to speech recognition service."

def speak_text(text):
    engine = pyttsx3.init()
    engine.setProperty('rate', 160)
    engine.say(text)
    engine.runAndWait()

def contains_word(text, word_list):
    return any(re.search(rf"\b{re.escape(kw)}\b", text) for kw in word_list)

class QuestionRequest(BaseModel):
    question: str

@app.post("/ask")
def ask_question(payload: QuestionRequest, speak: bool = Query(False)):
    user_query = payload.question.strip()
    corrected_text = user_query.lower()

    greeting_keywords = ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"]
    thanks_keywords = ["thank you", "thanks", "thx", "thank u", "thnks", "tysm"]
    bye_keywords = ["bye", "goodbye", "see you", "exit", "quit", "gudbye", "see ya", "farewell"]

    if contains_word(corrected_text, greeting_keywords):
        answer = "Hello! How can I assist you regarding digital manufacturing at BVM?"
        if speak: speak_text(answer)
        return {"answer": answer}
    if contains_word(corrected_text, thanks_keywords):
        answer = "You're welcome! Feel free to ask anything else."
        if speak: speak_text(answer)
        return {"answer": answer}
    if contains_word(corrected_text, bye_keywords):
        answer = "Goodbye! If you need assistance again with the Center of Excellence in Digital Manufacturing at BVM, feel free to return anytime."
        if speak: speak_text(answer)
        return {"answer": answer}

    search_query = user_query
    if chat_history:
        last_q, last_a = chat_history[-1]
        search_query = f"Previous question: {last_q}\nPrevious answer: {last_a}\nFollow-up question: {user_query}"

    try:
        docs = retriever.get_relevant_documents(search_query)
    except Exception as e:
        return {"error": f"Document retrieval error: {str(e)}"}

    if not docs or all(len(doc.page_content.strip()) == 0 for doc in docs):
        return {"answer": "I don't have that information in my dataset."}

    context = "\n\n".join([doc.page_content for doc in docs])
    history_prompt = "\n".join([f"User: {q}\nBot: {a}" for q, a in chat_history[-3:]])

    prompt = textwrap.dedent(f"""
    You are an AI assistant answering ONLY about the Center of Excellence 
    in Digital Manufacturing at Birla Vishwakarma Mahavidyalaya (BVM), CVMU University.

    Conversation so far:
    {history_prompt}

    Current Question:
    {user_query}

    Retrieved Context:
    {context}

    RULES:
    - Use ONLY the provided context to answer. 
    - If answer is not present in the context, reply exactly: "I don't have that information in my dataset." 
    - If asked to "list", return a clean numbered or bulleted list only. 
    - Keep answers clear, precise, and within 50 to 60 words. 
    - Never add extra info outside the dataset.

    Final Answer:
    """)

    try:
        r = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": "mistral:7b-instruct", "prompt": prompt, "stream": False}
        )
        raw_answer = r.json().get("response", "").strip()
        answer = raw_answer if raw_answer else "I don't have that information in my dataset."
        chat_history.append((user_query, answer))
        if speak: speak_text(answer)
        return {"answer": answer}
    except Exception as e:
        return {"error": f"Ollama failed: {e}"}

@app.get("/ask/voice")
def ask_with_voice(speak: bool = Query(False)):
    query = listen_to_microphone()
    return ask_question(QuestionRequest(question=query), speak=speak)
