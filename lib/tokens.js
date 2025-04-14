"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Check if user has enough tokens
export async function hasEnoughTokens(tokensNeeded = 1) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { id: true, tokens: true },
  });

  if (!user) throw new Error("User not found");

  return user.tokens >= tokensNeeded;
}

// Consume tokens for an operation and record the transaction
export async function consumeTokens(tokensToConsume, description, featureType) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { id: true, tokens: true },
  });

  if (!user) throw new Error("User not found");

  if (user.tokens < tokensToConsume) {
    throw new Error("Insufficient tokens");
  }

  // Update user tokens and record transaction in a single transaction
  const result = await db.$transaction([
    // Decrement user tokens
    db.user.update({
      where: { id: user.id },
      data: { tokens: { decrement: tokensToConsume } },
    }),

    // Record the transaction
    db.tokenTransaction.create({
      data: {
        userId: user.id,
        amount: -tokensToConsume,
        description,
        featureType,
      },
    }),
  ]);

  return {
    success: true,
    remainingTokens: result[0].tokens,
  };
}

// Add tokens to user account and record the transaction
export async function addTokens(tokensToAdd, description = "Token Purchase") {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { id: true },
  });

  if (!user) throw new Error("User not found");

  // Update user tokens and record transaction in a single transaction
  const result = await db.$transaction([
    // Increment user tokens
    db.user.update({
      where: { id: user.id },
      data: { tokens: { increment: tokensToAdd } },
    }),

    // Record the transaction
    db.tokenTransaction.create({
      data: {
        userId: user.id,
        amount: tokensToAdd,
        description,
        featureType: "purchase",
      },
    }),
  ]);

  return {
    success: true,
    newBalance: result[0].tokens,
  };
}

// Get user's current token balance
export async function getTokenBalance() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { tokens: true },
  });

  if (!user) throw new Error("User not found");

  return user.tokens;
}
