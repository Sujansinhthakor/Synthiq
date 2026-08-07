# 🎬 Synthiq

> Turn natural language into stunning math and science animations using AI.

Synthiq is an AI-powered platform that converts plain English prompts into high-quality educational animations. Describe what you want to visualize, and Synthiq generates [Manim](https://www.manim.community/) code with an LLM, renders it inside an isolated Docker environment, and delivers the final video.

```
"Animate the derivation of the quadratic formula."
"Show how binary search works with an array animation."
"Visualize matrix multiplication step by step."
```

---

## 📹 Demo



https://github.com/user-attachments/assets/73231b12-8484-4ba1-a1ed-9467cf93f003





## 🏗️ Architecture

```text
               User Prompt
                    │
                    ▼
          Next.js Frontend
                    │
                    ▼
         Node.js / TypeScript API
                    │
                    ▼
             OpenAI GPT Model
                    │
        Generates Manim Python Code
                    │
                    ▼
        Docker (Manim Community)
                    │
             Renders MP4 Video
                    │
                    ▼
               AWS S3 Upload
                    │
                    ▼
          Pre-signed Video URL
                    │
                    ▼
              User Playback
```

---

## 🧰 Tech Stack

**Frontend** — Next.js · React · TypeScript · Tailwind CSS

**Backend** — Node.js · Express · TypeScript

**AI** — OpenAI API

**Rendering** — Manim Community · Docker

**Storage** — AWS S3

**Authentication** — NextAuth.js · Google OAuth




## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/synthiq.git
cd synthiq
```

### 2. Install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Configure environment variables

Create a `.env` file in `frontend/`:

```dotenv
DATABASE_URL=

NEXTAUTH_SECRET=
NEXT_PUBLIC_API_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Create a `.env` file in `backend/`:

```dotenv
AWS_ACCESS_KEY_ID=''
AWS_SECRET_ACCESS_KEY=''
AWS_REGION=''
AWS_BUCKET_NAME=''
OPENAI_API_KEY=''
NEXTAUTH_SECRET=''
```

### 4. Run the app

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd ../backend
npm run dev
```

---

## 🗺️ Future Improvements

- [ ] Streaming render progress
- [ ] Multi-scene generation
- [ ] Voice narration
- [ ] Custom animation styles
- [ ] Multiple LLM support
- [ ] Editable generated code
- [ ] Collaboration & sharing
- [ ] Export to GIF

---

## ⭐ Support

If you like this project, consider giving it a star!
