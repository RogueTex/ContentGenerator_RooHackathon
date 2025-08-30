# AI Content Generator

This is a web application that uses AI to generate content.

## Project Structure

- **Frontend**: Built with React and Vite, styled with Tailwind CSS.
- **Backend**: Built with Node.js and Express, integrated with Google Gemini API for AI content generation.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd ai-content-generator
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory based on `.env.example`:
    ```
    GOOGLE_GEMINI_API_KEY=YOUR_API_KEY_HERE
    PORT=5000
    ```
    Replace `YOUR_API_KEY_HERE` with your actual Google Gemini API key.

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application

1.  **Start the Backend:**
    ```bash
    cd backend
    npm run dev
    ```

2.  **Start the Frontend:**
    ```bash
    cd ../frontend
    npm run dev
    ```

The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:5000`.