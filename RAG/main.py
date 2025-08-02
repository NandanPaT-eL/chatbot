import os
import json
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceBgeEmbeddings
from langchain.llms import Ollama
from langchain.chains import RetrievalQA

# Step 1: Load the markdown document
loader = TextLoader("text_data.md", encoding="utf-8")
docs = loader.load()

# Step 2: Split into chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(docs)

# Step 3: Convert text to embeddings
embeddings = HuggingFaceBgeEmbeddings(model_name="BAAI/bge-small-en-v1.5")
db = FAISS.from_documents(chunks, embeddings)
retriever = db.as_retriever()

# Step 4: Local LLM setup
llm = Ollama(model="mistral")  # or llama3

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="stuff"
)

# Step 5: JSON conversation logging
json_file = "conversation_log.json"
if os.path.exists(json_file):
    with open(json_file, "r") as f:
        conversation_log = json.load(f)
else:
    conversation_log = []

# Step 6: Interactive chatbot loop
while True:
    query = input("\n🗨️ You: ")
    if query.lower() in ['exit', 'quit']:
        break

    response = qa_chain.run(query)
    print("🤖 Bot:", response)

    # Save to JSON
    conversation_log.append({"user": query, "bot": response})
    with open(json_file, "w") as f:
        json.dump(conversation_log, f, indent=2)
