"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Get token packages
export async function getTokenPackages() {
  // Define token packages
  const TOKEN_PACKAGES = [
    { id: "basic", tokens: 10000, amount: 1, description: "Basic Package" },
    {
      id: "standard",
      tokens: 25000,
      amount: 2,
      description: "Standard Package",
    },
    { id: "premium", tokens: 50000, amount: 3, description: "Premium Package" },
  ];

  return TOKEN_PACKAGES;
}

// Get package by ID
export async function getPackageById(packageId) {
  const packages = await getTokenPackages();
  return packages.find((pkg) => pkg.id === packageId);
}

// Get user's payment history
export async function getPaymentHistory() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const payments = await db.payment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return payments;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw new Error("Failed to fetch payments");
  }
}

// Get user's token balance
export async function getUserTokenInfo() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { tokens: true },
    });

    if (!user) throw new Error("User not found");

    const packages = await getTokenPackages();

    return {
      tokens: user.tokens || 10000,
      packages,
    };
  } catch (error) {
    console.error("Error fetching user token info:", error);
    // Return mock data if there's an error
    return {
      tokens: 10000,
      packages: await getTokenPackages(),
    };
  }
}

// Get token transaction history
export async function getTokenTransactionHistory(limit = 5) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const transactions = await db.tokenTransaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
}

// Record successful payment and add tokens
export async function recordSuccessfulPayment(paymentId, packageId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { id: true },
  });

  if (!user) throw new Error("User not found");

  const tokenPackage = await getPackageById(packageId);
  if (!tokenPackage) throw new Error("Invalid package");

  const payment = await db.payment.findUnique({
    where: { razorpayId: paymentId },
  });

  if (!payment) throw new Error("Payment not found");

  if (payment.status === "COMPLETED") {
    return { success: true, message: "Payment already processed" };
  }

  // Update payment and add tokens in a transaction
  await db.$transaction([
    // Update payment status
    db.payment.update({
      where: { id: payment.id },
      data: { status: "COMPLETED" },
    }),

    // Add tokens to user
    db.user.update({
      where: { id: user.id },
      data: { tokens: { increment: tokenPackage.tokens } },
    }),

    // Record token transaction
    db.tokenTransaction.create({
      data: {
        userId: user.id,
        amount: tokenPackage.tokens,
        description: `Purchased ${tokenPackage.description}`,
        featureType: "purchase",
      },
    }),
  ]);

  revalidatePath("/tokens");

  return { success: true, message: "Payment processed successfully" };
}

// Get user's token transaction history
export async function getTokenTransactions() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });

    if (!user) throw new Error("User not found");

    // Get the user's token transactions
    const transactions = await db.tokenTransaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50, // Limit to most recent 50 transactions
    });

    return transactions;
  } catch (error) {
    console.error("Error fetching token transactions:", error);
    return [];
  }
}
