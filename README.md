# RAG Chatbot + Project Management Dashboard

## Project Overview

This project combines a **Retrieval-Augmented Generation (RAG) Chatbot** with a **CRUD-based Project Management Dashboard**.

- The **RAG Chatbot** answers user questions about the **Center of Excellence in Digital Manufacturing at Birla Vishwakarma Mahavidyalaya (BVM)**, using document-based retrieval and Google Gemini as the LLM.
- The **Project Management Dashboard** is a full-featured admin interface to create, read, update, and delete projects with image uploads.

---

## ⚙️ Tech Stack

### Backend
- Python + FastAPI
- LangChain for RAG functionality
- Google Gemini (Generative AI)
- Chroma DB for storing embeddings
- MongoDB (for project data)
- dotenv for managing environment variables

### Frontend
- **Streamlit** for chatbot interface
- **React + Axios + Tailwind CSS** for Project Management Admin Dashboard

---

## Features

### 🔹 RAG Chatbot
- Answer questions based only on the provided documents (PDFs/DOCXs).
- Supports voice input/output using:
    - `speech_recognition`
    - `pyttsx3` (text-to-speech)
- Maintains in-session chat history.
- Provides structured answers with clear formatting.

### 🔹 Project Management Dashboard
- Create, view, edit, and delete project entries.
- Upload project images (handled by multer in the backend).
- Displays key metrics:
    - Total projects
    - Ongoing projects
    - Completed projects
- Filter projects by title or status.

---

## Architecture Diagram

![image](https://github.com/user-attachments/assets/2ea8c7ce-d358-4fd5-abe6-0d6d417f74ab)


---

## Setup Instructions

### Backend Setup (RAG Chatbot)

1. Clone the repo:
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. Install dependencies:
    ```bash
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

3. Create `.env` file in the root with:
    ```
    GOOGLE_API_KEY=your-google-api-key
    HUGGINGFACEHUB_API_TOKEN=your-huggingface-token
    LANGCHAIN_API_KEY=your-langchain-api-key
    LANGCHAIN_PROJECT=your-project-name
    ```

4. Place your documents (PDFs/DOCX files) in a folder (e.g., `/Documents/`).

5. Run the backend:
    ```bash
    python main.py
    ```

---

### Streamlit Chat Interface

1. Install Streamlit if not already installed:
    ```bash
    pip install streamlit
    ```

2. Run Streamlit:
    ```bash
    streamlit run app.py
    ```

3. Open in browser:  
   `http://localhost:8501`

---

### Project Management Admin Dashboard

1. Navigate to the React frontend directory:
    ```bash
    cd admin-dashboard
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend:
    ```bash
    npm run dev
    ```

4. Ensure backend Node.js API is running to handle project CRUD.

---

## Usage Example

### Query Chatbot via API
```bash
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is Digital Manufacturing?"}'
```

Contributions are welcome!
Please open issues or submit pull requests.
