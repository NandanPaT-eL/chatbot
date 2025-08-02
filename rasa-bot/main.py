from rag import qa

def chat_interface():
    print("Chatbot initialized. Type 'exit' or 'quit' to end.")
    while True:
        try:
            query = input("\nYou: ")
            if query.lower() in ["exit", "quit"]:
                break
            result = qa({"query": query})  # Updated invocation
            print("\nBot:", result["result"])
        except KeyboardInterrupt:
            print("\nExiting...")
            break
        except Exception as e:
            print(f"\nError: {str(e)}")

if __name__ == "__main__":
    chat_interface()