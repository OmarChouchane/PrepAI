# 🧠 PrepAI – AI-Powered Interview Preparation Platform

> Practice job interviews like never before – powered by real-time AI voice agents and generative intelligence.

PrepAI is a full-stack web application that allows users to simulate realistic interview scenarios with the help of Vapi AI voice agents and Google Gemini. Whether you're a student or a professional, PrepAI gives you an edge in preparing for interviews through interactive voice conversations and instant feedback.

---

## ✨ Features

- 🎤 **AI Voice Interviews** – Talk with Vapi AI agents in real-time, simulating job interviews.
- 🧠 **Dynamic Questions** – Questions generated using Google Gemini tailored to your selected job role.
- 📝 **Live Feedback** – Receive AI-driven evaluations and transcript-based insights.
- 🔐 **Authentication** – Secure login and session tracking with Firebase.
- 📊 **Dashboard** – Track and review previous interviews.
- 📱 **Responsive Design** – Clean and accessible UI built with shadcn/ui + Tailwind CSS.

---

## 🧩 Tech Stack

| Layer         | Tech Used                         |
|--------------|------------------------------------|
| Frontend     | Next.js, Tailwind CSS, shadcn/ui   |
| Backend      | Next.js API Routes (Serverless)    |
| Authentication | Firebase Auth                     |
| Database     | Firebase Firestore                 |
| AI Voice     | [Vapi AI](https://vapi.ai)         |
| AI Content   | [Google Gemini](https://deepmind.google/technologies/gemini/) |
| Validation   | Zod                                |
| Deployment   | Vercel                             |

---

## 🖥️ Screenshots

> UI design made in Figma and implemented in React components.

| Dashboard | Interview | Feedback |
|-----------|-----------|----------|
| ![Dashboard](https://github.com/user-attachments/assets/d551e53a-3aad-45c2-a1e8-5da950e745de) | ![Interview](https://github.com/user-attachments/assets/b32f7d1e-1182-49b3-a39b-375b72c1493b) | ![Feedback](https://github.com/user-attachments/assets/c72e56f8-3c1e-41e1-93c3-445758eb757b) |

---

## 🧪 Local Development

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/prepai.git
cd prepai

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Add your Firebase, Vapi, and Gemini keys

# 4. Run the app
npm run dev

```
---

## 📐 Design Reference

- 📄 [Technical Design Document (PDF)](https://github.com/user-attachments/files/20960801/PrepAI.Technical.Design.Document.pdf)

- 🎨 [Figma UI](https://www.figma.com/design/UfE1C5CzFtheNDJ2ZepEDP/PrepAI?node-id=0-1)

---

## 🚀 Deployment

PrepAI is deployed on **Vercel**.  
Firebase handles authentication and real-time data storage.  
The architecture is designed to be fully serverless and scalable.

---

## 👤 About the Author

Hi! I’m **Omar Chouchane**, a passionate full-stack developer who loves building cool AI-powered projects.  
Feel free to connect with me or check out my work:

🔗 [LinkedIn](https://www.linkedin.com/in/omar-chouchane/)  
🐙 [GitHub](https://github.com/OmarChouchane)  
📫 [Say hello!](omar.chouchane@insat.ucar.tn)



