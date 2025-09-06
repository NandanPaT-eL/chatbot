import os
import re
import shutil
import warnings
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langchain_community.document_loaders import Docx2txtLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.schema.runnable import RunnableLambda

os.environ["TOKENIZERS_PARALLELISM"] = "false"
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=FutureWarning)
load_dotenv()

INPUT_DOC = os.getenv("INPUT_DOC")
CHROMA_DIR = os.getenv("CHROMA_DIR", "./chroma_db")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "bvmcoe")

app = FastAPI()
frontend_url = os.getenv("FRONTEND_URL")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

loader = Docx2txtLoader(INPUT_DOC)
documents = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1500, chunk_overlap=500, length_function=len)
splits = text_splitter.split_documents(documents)
embedding_function = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

if os.path.exists(CHROMA_DIR):
    shutil.rmtree(CHROMA_DIR)

vectorstore = Chroma.from_documents(
    collection_name=COLLECTION_NAME,
    documents=splits,
    embedding=embedding_function,
    persist_directory=CHROMA_DIR
)

llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.1, max_tokens=2048)

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
- For lists, give them neatly numbered.
- Be concise, professional, and friendly.

Context from documents:
{context}

User Question: {question}

Your Engaging Answer:
"""
prompt = ChatPromptTemplate.from_template(template)

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

class QuestionRequest(BaseModel):
    question: str

chat_history = []

def format_history():
    if not chat_history:
        return "No previous conversation."
    return "\n".join([f"User: {u}\nBot: {b}" for u, b in chat_history])

@app.post("/ask")
def ask_question(payload: QuestionRequest):
    question = payload.question.strip()
    if re.search(r"\b(hello|hi|hey|good morning|good afternoon|good evening)\b", question.lower()):
        return {"answer": "Hello! How can I assist you regarding digital manufacturing at BVM?"}
    if re.search(r"\b(thank you|thanks|tysm|thx)\b", question.lower()):
        return {"answer": "You're welcome! Feel free to ask anything else."}
    if re.search(r"\b(bye|goodbye|see you|exit|quit|farewell)\b", question.lower()):
        return {"answer": "Goodbye! If you need assistance again with CoEDM at BVM, feel free to return anytime."}

    try:
        response = rag_chain.invoke({"question": question, "history": format_history()})
    except Exception as e:
        return {"error": f"RAG chain failed: {e}"}

    answer = response if response else "I don't have that information in my dataset."
    chat_history.append((question, answer))
    return {"answer": answer}

@app.get("/history")
def get_history():
    return {"history": chat_history}

@app.delete("/history")
def clear_history():
    chat_history.clear()
    return {"message": "Chat history cleared."}

print("\n🚀 FastAPI Chatbot Ready with RAG! Run with: uvicorn main:app --reload\n")
