import os
import re
import shutil
import warnings
from dotenv import load_dotenv

import speech_recognition as sr
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# LangChain imports
from langchain_community.document_loaders import Docx2txtLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.schema.runnable import RunnablePassthrough, RunnableLambda

# ================== ENV + SETUP ==================
os.environ["TOKENIZERS_PARALLELISM"] = "false"
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=FutureWarning)
load_dotenv()

INPUT_DOC = os.getenv("INPUT_DOC")
CHROMA_DIR = os.getenv("CHROMA_DIR", "./chroma_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "bvmcoe")

# ================== FASTAPI APP ==================
app = FastAPI()


frontend_url = os.getenv("FRONTEND_URL")


print(f"🔗 Allowed frontend origin: {frontend_url}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================== DOCUMENT INGESTION ==================
print("\nLoading documents...")
loader = Docx2txtLoader(INPUT_DOC)
documents = loader.load()
print(f"Loaded {len(documents)} document(s) from {INPUT_DOC}")

# Split
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1500,
    chunk_overlap=500,
    length_function=len
)
splits = text_splitter.split_documents(documents)
print(f"Split into {len(splits)} chunks.")

# Embeddings
embedding_function = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Vectorstore (reset each time)
if os.path.exists(CHROMA_DIR):
    shutil.rmtree(CHROMA_DIR)
    print(f"Deleted old persistent directory: {CHROMA_DIR}")

print("Creating new Chroma vectorstore...")
vectorstore = Chroma.from_documents(
    collection_name=COLLECTION_NAME,
    documents=splits,
    embedding=embedding_function,
    persist_directory=CHROMA_DIR
)
print(f"Vectorstore created (auto-persisted at {CHROMA_DIR})")

# ================== LLM + RAG CHAIN ==================
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.1,
    max_tokens=2048
)

def docs2str(docs):
    return "\n".join(doc.page_content.strip() for doc in docs)

retriever = vectorstore.as_retriever(search_kwargs={"k": 8})

template = """
You are a helpful and engaging assistant for the Center of Excellence for Digital Manufacturing (CoEDM) at Birla Vishvakarma Mahavidyalaya (BVM).

Conversation so far:
{history}

When answering:
- Do NOT copy text verbatim from the documents. Instead, rephrase in your own words.
- Keep answers realistic, clear, and slightly conversational.
- For lists (projects, internships), give them neatly numbered without extra fluff.
- For explanations of a specific project/internship:
  • Start with a short plain-English overview (1–2 sentences).  
  • Then highlight key features, participants, or mentors if available.  
  • Keep it professional but friendly.
- Always ensure formatting is clean with line breaks and bullets if helpful.
- Avoid overwhelming detail unless the user explicitly asks for it.
- Use history only if required.
- Be concise, but not robotic.
- If stated to list something, just list the topics, do not explain.
- If you might get to answer about the internship, the dataset has a general overview of Summer Internship program and then specific internship programs. So dont list summer internship as an individual internship, all the internships are part of Summer Internship program.

Context from documents:
{context}

User Question: {question}

Your Engaging Answer:
"""
prompt = ChatPromptTemplate.from_template(template)

# ✅ FIX: use RunnableLambda instead of plain lambdas
rag_chain = (
    {
        "context": RunnableLambda(lambda x: retriever.get_relevant_documents(x["question"])) | RunnableLambda(docs2str),
        "question": RunnableLambda(lambda x: x["question"]),
        "history": RunnableLambda(lambda x: x["history"]),
    }
    | prompt
    | llm
    | StrOutputParser()
)

# ================== VOICE INPUT ONLY ==================
def listen_to_microphone():
    recognizer = sr.Recognizer()
    mic = sr.Microphone()
    with mic as source:
        recognizer.adjust_for_ambient_noise(source)
        print("🎤 Listening... speak now.")
        audio = recognizer.listen(source)
    try:
        return recognizer.recognize_google(audio)
    except sr.UnknownValueError:
        return "Sorry, I could not understand your voice."
    except sr.RequestError:
        return "Could not connect to speech recognition service."

# ================== API SCHEMA ==================
class QuestionRequest(BaseModel):
    question: str

chat_history = []  # store tuples: (user, bot)

def format_history():
    """Format chat history into a conversation block for the prompt."""
    if not chat_history:
        return "No previous conversation."
    return "\n".join([f"User: {u}\nBot: {b}" for u, b in chat_history])

# ================== API ROUTES ==================
@app.post("/ask")
def ask_question(payload: QuestionRequest):
    question = payload.question.strip()

    # Greeting / Thanks / Bye
    if re.search(r"\b(hello|hi|hey|good morning|good afternoon|good evening)\b", question.lower()):
        return {"answer": "Hello! How can I assist you regarding digital manufacturing at BVM?"}
    if re.search(r"\b(thank you|thanks|tysm|thx)\b", question.lower()):
        return {"answer": "You're welcome! Feel free to ask anything else."}
    if re.search(r"\b(bye|goodbye|see you|exit|quit|farewell)\b", question.lower()):
        return {"answer": "Goodbye! If you need assistance again with CoEDM at BVM, feel free to return anytime."}

    try:
        response = rag_chain.invoke({
            "question": question,
            "history": format_history()
        })
    except Exception as e:
        return {"error": f"RAG chain failed: {e}"}

    answer = response if response else "I don't have that information in my dataset."
    chat_history.append((question, answer))

    return {"answer": answer}

@app.get("/ask/voice")
def ask_with_voice():
    query = listen_to_microphone()
    return ask_question(QuestionRequest(question=query))

@app.get("/history")
def get_history():
    return {"history": chat_history}

@app.delete("/history")
def clear_history():
    chat_history.clear()
    return {"message": "Chat history cleared."}

# ================== STARTUP MESSAGE ==================
print("\n🚀 FastAPI Chatbot Ready with RAG + Voice Input + History!")
print("Run with: uvicorn main:app --reload\n")