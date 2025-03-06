"user server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const generateAIInsights = async (industry) => {};

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
