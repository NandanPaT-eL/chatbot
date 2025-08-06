from langchain_community.document_loaders import TextLoader
from langchain.docstore.document import Document
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
import os

# Load raw file
loader = TextLoader("data/rag_feed.txt", encoding="utf-8")
documents = loader.load()

# Cleaning logic
def clean_text(text):
    return text.replace("–", ":").replace("...", ".").strip()

cleaned_documents = []
for doc in documents:
    cleaned_content = clean_text(doc.page_content)
    cleaned_doc = Document(page_content=cleaned_content, metadata=doc.metadata)
    cleaned_documents.append(cleaned_doc)

# Section splitting
full_text = cleaned_documents[0].page_content
sections = full_text.split("\n## ")

chunks = []
for i, sec in enumerate(sections):
    if not sec.strip():
        continue
    content = "## " + sec.strip() if i != 0 else sec.strip()
    doc = Document(page_content=content)
    chunks.append(doc)

# Save in Chroma
model = "all-MiniLM-L6-v2"
embedding_model = HuggingFaceEmbeddings(model_name=model)
persist_directory = "final_coe"

vectordb = Chroma.from_documents(
    documents=chunks,
    embedding=embedding_model,
    persist_directory=persist_directory
)
vectordb.persist()

print(f"Stored {len(chunks)} cleaned & chunked sections into Chroma at `{persist_directory}`.")