# RAG/main.py

import os
import subprocess
import textwrap
import warnings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

# Suppress warnings
os.environ["TOKENIZERS_PARALLELISM"] = "false"
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=FutureWarning)

# FastAPI App
app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Embedding & Vector DB
embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectordb = Chroma(persist_directory="chroma_store", embedding_function=embedding_model)
retriever = vectordb.as_retriever(search_kwargs={"k": 3})

class QuestionRequest(BaseModel):
    question: str

@app.post("/ask")
def ask_question(payload: QuestionRequest):
    query = payload.question.strip().lower()

    # Handle farewell messages directly
    if query in ["bye", "goodbye", "see you", "exit", "quit"]:
        return {
            "answer": "Goodbye! If you need assistance again with the Center of Excellence in Digital Manufacturing at BVM, feel free to return anytime."
        }

    try:
        docs = retriever.get_relevant_documents(query)
    except Exception as e:
        return {"error": f"Document retrieval error: {str(e)}"}

    if not docs:
        return {"answer": "No relevant information found."}

    context = "\n\n".join([doc.page_content for doc in docs])

    prompt = textwrap.dedent(f"""
        You are a helpful assistant answering questions about the Center of Excellence in Digital Manufacturing
        at Birla Vishwakarma Mahavidyalaya, a constituent college of Charutar Vidya Mandal University.

        Use only the context below to answer and you are developed by Nandan Patel and Nirjari Bhatt.

        Try to give a complete and helpful answer, but keep your response under 50 words.
        Context:
        {context}

        Question: {query}

        Answer:
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
            return {"answer": stdout.strip()}

    except subprocess.TimeoutExpired:
        process.kill()
        return {"error": "Ollama process timed out."}
    except Exception as e:
        return {"error": f"Ollama failed: {e}"}