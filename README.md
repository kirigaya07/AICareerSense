# AspireAI - AI-Powered Career Development Platform

![AspireAI Logo](https://via.placeholder.com/150x50?text=AspireAI)

## Overview

AspireAI is an advanced career development platform that leverages artificial intelligence to provide personalized career guidance, resume building, interview preparation, and professional development tools. Our platform helps job seekers and professionals optimize their career journey with data-driven insights and AI-powered recommendations.

## Features

- **AI-Powered Career Guidance** - Get personalized career advice and insights powered by advanced AI technology
- **Smart Resume Creation** - Generate ATS-optimized resumes with AI assistance
- **Interview Preparation** - Practice with role-specific questions and get instant feedback
- **Industry Insights** - Stay ahead with real-time industry trends, salary data, and market analysis
- **Cover Letter Generation** - Create tailored cover letters for specific job applications
- **Career Development** - Continuous learning and skill development recommendations

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: Clerk
- **AI Integration**: Google Generative AI
- **UI Components**: Radix UI, Lucide React icons
- **Payment Processing**: Razorpay
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google AI API key
- Clerk account for authentication

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/aspireai"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Google AI
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Razorpay (for payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aspireai.git
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

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
aspireai/
├── app/                  # Next.js app directory
│   ├── (main)/           # Main application routes
│   ├── api/              # API routes
│   └── lib/              # Utility functions
├── components/           # Reusable UI components
├── actions/              # Server actions
├── data/                 # Static data files
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Prisma schema
│   └── seed.js           # Database seeding script
└── public/               # Static assets
```

## Token System

AspireAI uses a token-based system for AI feature usage:

- Users receive tokens through subscription plans or one-time purchases
- Different features consume varying amounts of tokens:
  - Cover Letter Generation: 100 tokens
  - Resume Analysis: 50 tokens
  - Interview Questions: 75 tokens
  - Industry Insights: 60 tokens
  - Career Advice: 40 tokens

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/yourusername/aspireai](https://github.com/kirigaya07/AICareerSense)

---
Built with ❤️ by Kirigaya07
