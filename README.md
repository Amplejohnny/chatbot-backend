# 🤖 Chatbot Backend API

This is the backend for a **chatbot application** built with **Express.js**, **MongoDB Atlas**, and **Hugging Face AI** integration. It provides intelligent chat capabilities, real-time message handling, and easy deployment options, including **Docker support**.

---

## 🚀 Features

- RESTful API with **Express.js**
- AI-powered conversations via **Hugging Face Transformers**
- **MongoDB Atlas** for persistent message storage
- Environment-based configuration for secure secrets
- Optional **Docker** support for containerized deployment

---

## 🧰 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18+
- **MongoDB Atlas** account
- **Hugging Face API key**
- **Docker** (optional)

---

## 🛠️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Amplejohnny/chatbot-backend.git
cd chatbot-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.rnrtuvu.mongodb.net/chatbot_db?retryWrites=true&w=majority
HF_API_KEY=<your-huggingface-api-key>
```

---

## ▶️ Run Locally

Start the development server:

```bash
npm run dev
```

---

## 🐳 Docker Setup (Optional)

To build and run the app in a container:

```bash
docker build -t chatbot-backend .
docker run -p 3000:3000 --env-file .env chatbot-backend
```

---

## 📦 API Structure (Optional to expand later)

Coming soon: Documentation for routes, endpoints, and payloads.

---

## 📄 License

MIT License © [Amplejohnny](https://github.com/Amplejohnny)
