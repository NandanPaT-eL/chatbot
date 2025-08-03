from langchain_community.document_loaders import TextLoader
from langchain.docstore.document import Document
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from sentence_transformers import SentenceTransformer

# File loading and basic preprocessing
loader = TextLoader("data/rag_feed.txt", encoding="utf-8")
documents = loader.load()

cleaned_documents = []

def clean_text(text):
    return (
        text.replace("–", ":").replace("...", ".").strip()
    )

for doc in documents:
    cleaned_content = clean_text(doc.page_content)
    cleaned_doc = Document(page_content=cleaned_content, metadata=doc.metadata)
    cleaned_documents.append(cleaned_doc)

print(cleaned_documents)


# Converting the raw file into chunks
full_text = cleaned_documents[0].page_content
sections = full_text.split("\n## ")

chunks = []
for i, sec in enumerate(sections):
    if not sec.strip():
        continue
    content = "## " + sec.strip() if i != 0 else sec.strip()
    doc = Document(page_content=content)
    chunks.append(doc)


# Embedding and storing it in Chroma
model = "all-MiniLM-L6-v2"
embedding_model = HuggingFaceEmbeddings(model_name=model)
persist_directory = "chroma_store"

vectordb = Chroma.from_documents(
    documents=chunks,
    embedding=embedding_model,
    persist_directory=persist_directory
)
print(f"Stored {len(chunks)} chunks in Chroma at {persist_directory}")