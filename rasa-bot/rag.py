import os
from dotenv import load_dotenv

from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Pinecone as LangchainPinecone
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain_community.llms import HuggingFaceHub

from pinecone import Pinecone, ServerlessSpec

# Load environment variables
load_dotenv()

# ENV variables
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENV = os.getenv("PINECONE_ENV")  # e.g., "us-east-1"
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")
HUGGINGFACEHUB_API_TOKEN = os.getenv("HUGGINGFACEHUB_API_TOKEN")

# Initialize Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)

# Check if index exists
if PINECONE_INDEX_NAME not in pc.list_indexes().names():
    raise ValueError(f"Index '{PINECONE_INDEX_NAME}' not found.")

# Load data
loader = TextLoader("input.txt")
documents = loader.load()

# Split text
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
docs = text_splitter.split_documents(documents)

# Embeddings
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Vector store
vectorstore = LangchainPinecone.from_documents(
    docs,
    embedding=embeddings,
    index_name=PINECONE_INDEX_NAME
)

# LLM
llm = HuggingFaceHub(
    repo_id="google/flan-t5-large",
    model_kwargs={"temperature": 0.5, "max_length": 512}
)

# RAG chain
qa = RetrievalQA.from_chain_type(llm=llm, retriever=vectorstore.as_retriever())
