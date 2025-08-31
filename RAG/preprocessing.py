from langchain_community.document_loaders import TextLoader
from langchain.docstore.document import Document
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter

loader = TextLoader("data/dataset.txt", encoding="utf-8")
documents = loader.load()

def clean_text(text: str) -> str:
    return (
        text.replace("–", "-")
            .replace("...", ".")
            .replace("•", "-")
            .strip()
    )

cleaned_documents = [
    Document(page_content=clean_text(doc.page_content), metadata=doc.metadata)
    for doc in documents
]

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,    
    chunk_overlap=100,
    separators=["\n## ", "\n\n", "\n", ".", " "]
)

chunks = text_splitter.split_documents(cleaned_documents)

print(f"Created {len(chunks)} chunks for embedding.")

model_name = "all-MiniLM-L6-v2"
embedding_model = HuggingFaceEmbeddings(model_name=model_name)

persist_directory = "birla_coee"

vectordb = Chroma.from_documents(
    documents=chunks,
    embedding=embedding_model,
    persist_directory=persist_directory
)
print(f"Stored {len(chunks)} chunks in Chroma at `{persist_directory}`")