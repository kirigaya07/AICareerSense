"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize the AI model with the specified version
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generateAIInsights = async (industry) => {
  // Construct a structured prompt to generate industry-specific insights in JSON format
  const prompt = `
  Analyze the current state of the ${industry} industry and provide a structured summary strictly in the following JSON format:
  {
    "salaryRanges": [
      { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
    ],
    "growthRate": number,
    "demandLevel": "HIGH" | "MEDIUM" | "LOW",
    "topSkills": ["string", "string", "string", "string", "string"],
    "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
    "keyTrends": ["string", "string", "string", "string", "string"],
    "recommendedSkills": ["string", "string", "string", "string", "string"]
  }

  Requirements:
  - Respond with ONLY valid JSON. Do NOT include any explanations, comments, or formatting (no markdown, no code blocks).
  - Ensure "salaryRanges" contains AT LEAST 5 commonly found roles in this industry.
  - "growthRate" should be a number representing a percentage (e.g., 7.2).
  - Each of "topSkills", "keyTrends", and "recommendedSkills" must contain AT LEAST 5 entries.
  - Ensure all string values are descriptive and realistic for the given industry.

  Output only the JSON object as specified.
`;

  // Generate content using the AI model
  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  // Clean the response by removing any potential code block formatting
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  // Parse and return the structured JSON response
  return JSON.parse(cleanedText);
};

export async function getIndustryInsights() {
  // Authenticate the user
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Fetch the user from the database, including their industry insights
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true, // Ensure industry insights are retrieved if they exist
    },
  });

  if (!user) throw new Error("User not found");

  // If the user has no industry insights, generate new ones
  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry); // Generate AI-based insights

    // Store the new insights in the database with a scheduled next update
    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set the next update for 7 days later
      },
    });

    return industryInsight;
  }

  // Return the existing industry insights if available
  return user.industryInsight;
}
