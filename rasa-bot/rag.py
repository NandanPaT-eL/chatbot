import os
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore  # Updated import
from langchain.chains import RetrievalQA
from langchain_community.llms import HuggingFaceHub
from pinecone import Pinecone

def initialize_qa_chain():
    # Load environment
    load_dotenv()

    # Configuration
    PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
    INDEX_NAME = os.getenv("INDEX_NAME")
    HF_TOKEN = os.getenv("HUGGINGFACEHUB_API_TOKEN")

    # Initialize Pinecone (v3+ style)
    pc = Pinecone(api_key=PINECONE_API_KEY)
    
    # Initialize embeddings
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # Connect to Pinecone index using the new integration
    vectorstore = PineconeVectorStore.from_existing_index(
        index_name=INDEX_NAME,
        embedding=embeddings,
        text_key="text"
    )

    # Initialize LLM
    llm = HuggingFaceHub(
        repo_id="google/flan-t5-base",
        huggingfacehub_api_token=HF_TOKEN,
        model_kwargs={"temperature": 0.5, "max_length": 512}
    )

    # Create QA chain
    return RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever()
    )

# Initialize QA chain when imported
qa = initialize_qa_chain()