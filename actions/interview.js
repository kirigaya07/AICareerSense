"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateWithDeepSeek } from "@/lib/deepseek";
import { trackDeepSeekUsage } from "@/lib/ai-helpers";

export async function generateQuiz() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      skills: true,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const prompt = `
    You are a technical interviewer for a ${user.industry} role.
    
    Generate 10 challenging technical interview questions for a candidate ${
      user.skills?.length ? `with expertise in ${user.skills.join(", ")}` : ""
    }.
    
    Requirements:
    - Each question must be multiple choice with exactly 4 options (A, B, C, D)
    - Include a mix of conceptual and practical questions
    - Ensure questions test deep understanding, not just memorization
    - Make sure there is only one correct answer per question
    - Provide a detailed explanation for why the correct answer is right
    
    Return your response in this JSON format only, with no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
    `;

    const text = await generateWithDeepSeek(prompt);
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const quiz = JSON.parse(cleanedText);

    await trackDeepSeekUsage(
      prompt,
      text,
      "interview",
      "Generated interview questions"
    );

    return quiz.questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz questions");
  }
}

export async function saveQuizResult(questions, answers, score) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: answers[index] === q.correctAnswer,
    explanation: q.explanation,
  }));

  // Get wrong answers
  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  // Only generate improvement tips if there are wrong answers
  let improvementTip = "";
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
      CONTEXT: The user is a ${user.industry} professional who answered these technical interview questions incorrectly:

      ${wrongQuestionsText}

      TASK: Create a personalized learning recommendation based on these knowledge gaps.
      
      REQUIREMENTS:
      1. Be specific and actionable - suggest exactly what topic to study
      2. Be encouraging and positive in tone
      3. Do NOT mention the specific mistakes or questions
      4. Focus ONLY on what skills/concepts to improve
      5. Maximum 2 sentences total
      6. Start with a phrase like "Consider focusing on..." or "You might benefit from..."
      
      EXAMPLE FORMAT:
      "Consider focusing on [specific technical concept from their industry]. Strengthening your knowledge in this area will help you tackle similar problems with confidence."
    `;

    try {
      improvementTip = await generateWithDeepSeek(improvementPrompt);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
      // Provide a fallback improvement tip if generation fails
      improvementTip =
        "Consider reviewing fundamental concepts in your field. Regular practice will help strengthen your knowledge.";
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}

export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}
