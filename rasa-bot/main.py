from rag import qa

while True:
    query = input("\nYou: ")
    if query.lower() in ["exit", "quit"]:
        break
    result = qa.run(query)
    print("\nBot:", result)
