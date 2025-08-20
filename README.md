# QMS Event Management System with AI Assistant

This is a full-stack web application designed for creating, managing, and analyzing Quality Management System (QMS) events. The application features a modern, responsive user interface and is powered by a robust Python backend.

The standout feature is an integrated AI Assistant, powered by Google's Gemini 1.5 model, which provides intelligent insights, summaries, and actionable recommendations directly from the event dashboard.

## Key Features

*   **Wizard-Style Event Creation:** A guided, multi-step process for creating new QMS events with detailed fields for robust data capture.
*  **Simple In-Memory Storage:** Event data is stored in memory while the server is running. **Note:** This means all created events will be lost when the backend server is restarted.
*   **Modern UI/UX:** A clean, professional dashboard interface with a sidebar navigation, dynamic page headers, and a custom color palette.
*   **Event Listing Dashboard:** A responsive grid layout that displays all created events as informative cards with status badges.
*   **AI-Powered Assistant:** A chat-style modal that allows users to interact with their QMS data using natural language. It can:
    *   Filter and identify high-risk events.
    *   Summarize recent activity.
    *   Suggest actionable next steps for specific events.
    *   Draft professional notifications for event closures.
    *   Answer general queries about the event data.

## Technology Stack

| Area | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React (with Vite)** | A fast, modern JavaScript library for building user interfaces. |
| | **Redux Toolkit** | For predictable and centralized state management. |
| | **React Router** | For client-side routing and navigation. |
| | **Axios** | For making HTTP requests to the backend API. |
| | **React Icons** | For a rich library of high-quality icons. |
| **Backend** | **Python (FastAPI)** | A high-performance web framework for building APIs. |
| | **SQLAlchemy ORM** | For interacting with the database using Python objects. |
| | **Uvicorn** | The ASGI server that runs the FastAPI application. |
| | **SQLite** | A self-contained, file-based SQL database for persistent storage. |
| **AI Integration**| **Google Generative AI** | The official Python SDK for the Gemini family of models. |
| | **Gemini 1.5 Pro/Flash** | The Large Language Model powering the AI assistant. |

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

*   **Node.js and npm:** (v18 or later) - [Download Node.js](https://nodejs.org/)
*   **Python:** (v3.7 or later) - [Download Python](https://python.org/)
*   **A Gemini API Key:** - [Get an API Key from Google AI Studio](https://ai.google.dev/)

### Backend Setup (FastAPI)

1.  **Navigate to the Backend Directory:**
    ```bash
    cd backend
    ```

2.  **Create and Activate a Virtual Environment:**
    *   **Windows:**
        ```bash
        python -m venv venv
        .\venv\Scripts\activate
        ```
    *   **macOS / Linux:**
        ```bash
        python3 -m venv venv
        source venv/bin/activate
        ```

3.  **Install Dependencies:**
    ```bash
    pip install "fastapi[all]" "sqlalchemy[asyncio]" aiosqlite google-generativeai python-dotenv
    ```

4.  **Set Up Your API Key:**
    *   Create a new file named `.env` in the `qms-backend` root.
    *   Add your Gemini API key to this file:
        ```
        GEMINI_API_KEY="YOUR_API_KEY_HERE"
        ```
    *   **Note:** The `.env` file is included in `.gitignore` and should never be committed to version control.

### Frontend Setup (React)

1.  **Navigate to the Frontend Directory:**
    ```bash
    cd frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

## Running the Application

You must have both the backend and frontend servers running simultaneously.

1.  **Start the Backend Server:**
    *   In your `backend` terminal (with the virtual environment active), run:
    ```bash
    uvicorn main:app --reload
    ```
    *   The API will be available at `http://localhost:8000`.

2.  **Start the Frontend Server:**
    *   In your `frontend` terminal, run:
    ```bash
    npm run dev
    ```
    *   The application will be available at `http://localhost:5173` (or the port specified in your terminal).

3.  **Access the Application:**
    *   Open your web browser and navigate to `http://localhost:5173`.

## Using the AI Assistant

1.  Navigate to the **View Events** page from the sidebar.
2.  Click the blue robot icon in the bottom-right corner to open the assistant.
3.  Try one of the pre-defined prompts or use your own natural language questions.

#### Sample Prompts to Test

After creating a few sample events, try these prompts:

*   `Show high-risk events.`
*    `Summarize open events for the last month.`
*   `What should we do about the power supply failure?` (or `Suggest next steps for event ID 1.`)
*   `Draft a closure email for the fire extinguisher audit.` (or `Generate a draft notification for event closure 2.`)
*   `Are there any recent trends related to the IT department?`
