# 🚀 AspireAI - AI-Powered Career Development Platform

![AspireAI Logo](https://github.com/kirigaya07/AICareerSense/blob/master/public/logo.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-blue?logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-DB-blue?logo=postgresql)](https://www.postgresql.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)](#)

---

## 📚 Table of Contents

- [🔍 Overview](#-overview)
- [✨ Features](#-features)
- [💎 AI Token System](#-ai-token-system)
- [⚙️ Tech Stack](#-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [🔧 Prerequisites](#-prerequisites)
  - [📁 Environment Setup](#-environment-setup)
  - [📦 Installation](#-installation)
- [📁 Project Structure](#-project-structure)
- [🛠 Contributing](#-contributing)
- [🪪 License](#-license)
- [📬 Contact](#-contact)

---

## 🔍 Overview

**AspireAI** is an advanced, AI-powered career development platform designed to guide users through every step of their professional journey. Whether you're crafting the perfect resume, preparing for interviews, or navigating industry shifts, AspireAI provides intelligent, real-time support and tools to supercharge your career.

---

## ✨ Features

- **AI-Powered Career Guidance**  
  Receive personalized career path suggestions and role-specific advice using cutting-edge AI algorithms.

- **Smart Resume Creation**  
  Generate ATS-optimized resumes with dynamic formatting and keyword suggestions to increase job match success.

- **Interview Preparation**  
  Practice realistic, role-based questions with real-time AI feedback and tips to improve your answers.

- **Industry Insights**  
  Stay updated on salary trends, in-demand roles, skills, and hiring patterns relevant to your domain.

- **Cover Letter Generation**  
  Instantly generate tailored cover letters specific to any job listing using AI prompts.

- **Continuous Career Development**  
  Get learning path suggestions, course recommendations, and skill assessments to grow consistently.

---

## 💎 AI Token System

AspireAI operates on a **credit-based token model** that powers all AI-driven features. Token costs are dynamically managed based on feature usage and system configuration, ensuring fair usage and scalability.

🪙 **Tokens** can be earned via subscriptions or purchased directly through Razorpay.

---

## ⚙️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/), [React 19](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: Next.js API Routes, [Prisma ORM](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: [Clerk.dev](https://clerk.dev/)
- **AI Integration**: Google Generative AI (PaLM)
- **UI Library**: [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
- **Payments**: [Razorpay](https://razorpay.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### 🔧 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js v18+**
- **PostgreSQL** installed and running
- **Clerk account** for authentication
- **Google AI API Key**
- **Razorpay account**

---

### 📁 Environment Setup

Create a `.env` file in the root directory and add the following environment variables:

```env
# PostgreSQL Database
DATABASE_URL="postgresql://username:password@localhost:5432/aspireai"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Google Generative AI
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

---

### 📦 Installation

1. Clone the Repository:
   ```bash
   git clone https://github.com/kirigaya07/AICareerSense.git
   cd aspireai
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` in your browser to access the app.

---

### 📁 Project Structure

```bash
aspireai/
├── app/                  # Next.js app directory
│   ├── (main)/           # Main application routes
│   ├── api/              # API routes (e.g., auth, AI, payments)
│   └── lib/              # Reusable utility functions
├── components/           # Reusable React UI components
├── actions/              # Server actions / data operations
├── data/                 # Static data files and constants
├── prisma/               # Prisma schema and migrations
│   ├── schema.prisma     # Database schema definition
│   └── seed.js           # Initial data for local development
├── public/               # Static files (images, favicon, etc.)
└── .env                  # Environment variables
```

---

### 🛠 Contributing

We love contributions! ❤️

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add: amazing feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Create a Pull Request.

Please make sure to follow the Code of Conduct and adhere to our contribution guidelines.

---

### 🪪 License

This project is licensed under the [MIT License](LICENSE).

---

### 📬 Contact

For questions or feedback, feel free to reach out via [GitHub Issues](https://github.com/kirigaya07/AICareerSense/issues).
