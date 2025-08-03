import os
import subprocess
import textwrap
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
import warnings
warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=FutureWarning)


# Suppress tokenizers warning
os.environ["TOKENIZERS_PARALLELISM"] = "false"

# Step 1: Load Chroma vector DB with embedding function
embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectordb = Chroma(persist_directory="chroma_store", embedding_function=embedding_model)
retriever = vectordb.as_retriever(search_kwargs={"k": 3})

# Step 2: Welcome message
print("\nWelcome to the QA Bot for Center of Excellence at BVM")
print("Birla Vishwakarma Mahavidyalaya, CVM University")
print("Type 'exit' to quit.\n")

# Step 3: Interactive Q&A loop
while True:
    query = input("Ask a question: ").strip()
    if query.lower() in ["exit", "quit"]:
        print("Goodbye!")
        break

    # Step 4: Retrieve top-k relevant chunks
    try:
        docs = retriever.get_relevant_documents(query)
    except Exception as e:
        print(f"Error retrieving documents: {e}")
        continue

    if not docs:
        print("No relevant information found.")
        continue

    context = "\n\n".join([doc.page_content for doc in docs])

    # Step 5: Format prompt for Phi-3
    prompt = textwrap.dedent(f"""
        You are a helpful assistant answering questions about the Center of Excellence in Digital Manufacturing
        at Birla Vishwakarma Mahavidyalaya, a constituent college of Charutar Vidya Mandal University.

        Use only the context below to answer.

        Context:
        {context}

        Question: {query}

        Answer:
    """)

    # Step 6: Call Ollama using subprocess (Popen)
    try:
        # Use Popen with stdin=PIPE, stdout=PIPE, stderr=PIPE
        # and pass the prompt to stdin
        process = subprocess.Popen(
            ["ollama", "run", "phi3"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            # Set a timeout for the process to avoid hanging indefinitely
            # A timeout of 60 seconds is a reasonable starting point
        )

        # Use process.communicate() with a timeout
        stdout, stderr = process.communicate(input=prompt, timeout=60)

        # Check for actual errors from Ollama (e.g., if it failed to load)
        # The progress spinner is often on stderr, so let's be careful
        if "Error" in stderr or "error" in stderr:
            print("Error from Ollama:", stderr.strip())
        else:
            print("\nAnswer:")
            print(stdout.strip())
            print("-" * 60)

    except subprocess.TimeoutExpired:
        print("Ollama process timed out.")
        process.kill()  # Terminate the process if it times out
    except Exception as e:
        print(f"Failed to query Ollama: {e}")