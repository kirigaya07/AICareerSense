"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";

/**
 * Updates the user's profile information and ensures the industry insight record exists.
 * Uses a database transaction to maintain consistency between user updates and industry insights.
 *
 * @param {Object} data - The updated user profile data.
 * @param {string} data.industry - The user's selected industry.
 * @param {number} data.experience - The user's years of experience.
 * @param {string} data.bio - The user's bio.
 * @param {string[]} data.skills - The user's skills.
 * @throws {Error} If the user is not authenticated, not found, or if the update fails.
 * @returns {Promise<{ updateUser: Object, industryInsight: Object }>} Updated user and industry insight records.
 */
export async function updateUser(data) {
  // Authenticate the user and get their ID.
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized"); // Throw an error if the user is not authenticated.

  // Fetch the user from the database using their Clerk user ID.
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found"); // Throw an error if the user does not exist.

  try {
    // Perform database operations within a transaction to ensure data consistency.
    const result = await db.$transaction(
      async (tx) => {
        // Check if an industry insight record already exists for the given industry.
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // If no industry insight exists, create a new one with default values.
        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        // Update the user's profile with the provided data.
        const updateUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updateUser, industryInsight }; // Return the updated user and industry insight data.
      },
      {
        timeout: 10000, // Set a transaction timeout of 10 seconds.
      }
    );

    return { success: true, ...result }; // Return the final transaction result.
  } catch (error) {
    console.error("Error updating user and industry", error.message);
    throw new Error("Failed to update profile"); // Throw a user-friendly error message.
  }
}

/**
 * Retrieves the onboarding status of the currently authenticated user.
 * The user is considered onboarded if they have an assigned industry.
 *
 * @throws {Error} If the user is not authenticated, not found, or if the database query fails.
 * @returns {Promise<{ isOnboarded: boolean }>} An object indicating whether the user is onboarded.
 */
export async function getUserOnboardingStatus() {
  // Authenticate the user and get their Clerk user ID.
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized"); // Throw an error if authentication fails.

  // Fetch the user from the database to check if they exist.
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found"); // Throw an error if the user does not exist.

  try {
    // Retrieve only the "industry" field to determine onboarding status.
    const userIndustry = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true, // Select only the industry field.
      },
    });

    return {
      isOnboarded: !!userIndustry?.industry, // Convert industry presence to a boolean value.
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status"); // Provide a user-friendly error message.
  }
}
