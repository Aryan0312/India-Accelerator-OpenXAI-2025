JACKED AI 🏋️‍♂️🤖
-A Personal AI Gym Buddy to Keep You on Track


👥 Team
Project Name: JACKED AI
Team Name: CODE CRAFTERS


📌 Project Description
JACKED AI is an AI-powered chatbot that acts as your gym partner.
It helps users:
-Set and follow fitness goals (bulk, cut, strength, endurance)
-Get personalized workout splits and exercise recommendations
-Receive nutrition & recovery tips
-Stay motivated with accountability check-ins

⚡ Built on Next.js frontend + Ollama backend with LLaMA 3 model, JACKED AI is lightweight and simple but effective.

🎯 Track
-Track: Health & Fitness (AI for Well-being)

🚀 Features
💬 Conversational chatbot for fitness guidance
🏋️‍♂️ Personalized training splits & workout suggestions
🥗 Diet & recovery advice


🎨 Simple and clean UI with Next.js

📂 Folder Structure
000_JACKED_AI/
│── example/                # Example config
│── nextjs-app/             # Main Next.js app
│   ├── app/                # App router
│   │   ├── api/chat/       # API route for chat
│   │   │   └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── components/chat.tsx
│   ├── config/             # Config files
│   ├── public/             # Assets
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
│── ollama-model.txt        # LLaMA 3 model reference
│── LICENSE
│── README.md



🛠️ Tech Stack

Frontend: Next.js, TypeScript, TailwindCSS

AI Model: Ollama (LLaMA 3)

Backend: Next.js API Routes 


⚡ Getting Started

Ollama installed locally with LLaMA 3 model


Installation

Clone the repository:
git clone https://github.com/your-username/jacked-ai.git
cd jacked-ai/nextjs-app


Install dependencies:
npm install


Run the development server:
npm run dev


Make sure Ollama is running with LLaMA 3:
ollama run llama3


Open your browser at:
http://localhost:3000



📈 Future Improvements
✅ User accounts for progress tracking
✅ Integrate with wearable fitness trackers
✅ Advanced nutrition planner with macros
✅ Gamified streaks & leaderboard for motivation