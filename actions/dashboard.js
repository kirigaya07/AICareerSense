"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateWithDeepSeek } from "@/lib/deepseek";

export const generateAIInsights = async (industry) => {
  // Construct a structured prompt to generate industry-specific insights in JSON format
  const prompt = `
  TASK: Generate a detailed analysis of the current state of the ${industry} industry in JSON format.

  OUTPUT FORMAT: Return ONLY the following JSON structure without ANY explanatory text, markdown formatting, or code block delimiters:
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

  REQUIREMENTS:
  1. "salaryRanges" MUST contain EXACTLY 5 of the most in-demand roles in the ${industry} industry with realistic salary figures in USD
  2. For each role, provide accurate min, max, and median salaries based on current market data
  3. "growthRate" MUST be a numeric percentage value (e.g., 5.7 for 5.7% growth) reflecting annual industry growth
  4. "demandLevel" MUST be one of: "HIGH", "MEDIUM", or "LOW" based on current hiring trends
  5. "topSkills" MUST list EXACTLY 5 most valuable technical skills for ${industry} professionals today
  6. "marketOutlook" MUST be one of: "POSITIVE", "NEUTRAL", or "NEGATIVE" based on comprehensive industry forecast
  7. "keyTrends" MUST list EXACTLY 5 current technological or business trends shaping the ${industry}
  8. "recommendedSkills" MUST list EXACTLY 5 emerging skills that will be valuable in the next 1-2 years

  VALIDATION:
  - All strings must be properly quoted
  - All arrays must have exactly 5 elements
  - No comments, explanations, or formatting outside the JSON structure
  - Numbers must be actual numbers without quotation marks
  - Ensure all JSON syntax is valid with correct use of commas, brackets, and quotes
`;

  try {
    // Use the DeepSeek helper function instead
    const text = await generateWithDeepSeek(prompt);

    // Clean the response by removing any potential code block formatting
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    // Parse and return the structured JSON response
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Error generating industry insights:", error);
    throw new Error("Failed to generate industry insights: " + error.message);
  }
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
