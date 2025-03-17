"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { trackAIUsage } from "@/lib/ai-helpers";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Get token packages
export async function getTokenPackages() {
    // Define token packages
    const TOKEN_PACKAGES = [
        { id: "basic", tokens: 10000, amount: 1, description: "Basic Package" },
        { id: "standard", tokens: 25000, amount: 2, description: "Standard Package" },
        { id: "premium", tokens: 50000, amount: 3, description: "Premium Package" },
    ];

    return TOKEN_PACKAGES;
}

// Get package by ID
export async function getPackageById(packageId) {
    const packages = await getTokenPackages();
    return packages.find(pkg => pkg.id === packageId);
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

// Get feature costs
export async function getFeatureCosts() {
    // Define fallback data once
    const fallbackCosts = [
        { id: "1", featureName: "cover_letter", tokenCost: 100, description: "Generate Cover Letter" },
        { id: "2", featureName: "resume_analysis", tokenCost: 50, description: "Resume Analysis" },
        { id: "3", featureName: "interview_questions", tokenCost: 75, description: "Interview Questions" },
        { id: "4", featureName: "industry_insights", tokenCost: 60, description: "Industry Insights" },
        { id: "5", featureName: "career_advice", tokenCost: 40, description: "Career Advice" },
    ];

    try {
        const costs = await db.featureCost.findMany({
            orderBy: { tokenCost: "desc" },
        });

        return costs.length > 0 ? costs : fallbackCosts;
    } catch (error) {
        console.error("Error fetching feature costs:", error);
        return fallbackCosts;
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

// Inside your feature function:
await trackAIUsage(
    "feature_name",     // The feature type (must match entries in FeatureCost table)
    "Description text", // A description of what the tokens were used for
);

export async function generateCoverLetter(data) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    try {
        // Track token usage for cover letter generation
        await trackAIUsage(
            "cover_letter",
            `Generated Cover Letter for ${data.companyName}`
        );

        // Generate the content with AI
        const prompt = `Generate a cover letter for ${data.companyName}...`;
        const result = await model.generateContent(prompt);
        const content = result.response.text().trim();

        // Save the result to database
        const coverLetter = await db.coverLetter.create({
            data: {
                content,
                companyName: data.companyName,
                userId: user.id,
            },
        });

        return coverLetter;
    } catch (error) {
        console.error("Error generating cover letter:", error);
        throw new Error(error.message || "Failed to generate cover letter");
    }
}

export async function generateInterviewQuestions(data) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    try {
        // 1. Track token usage BEFORE generating content
        await trackAIUsage(
            "interview_questions", // Must match an entry in the FeatureCost table
            `Generated Interview Questions for ${data.jobTitle} position`
        );

        // 2. Generate the content with AI
        const prompt = `Generate interview questions for ${data.jobTitle} position...`;
        const result = await model.generateContent(prompt);
        const content = result.response.text().trim();

        // 3. Save the result to database
        const interviewQuestions = await db.interviewQuestions.create({
            data: {
                content,
                jobTitle: data.jobTitle,
                userId: user.id,
            },
        });

        return interviewQuestions;
    } catch (error) {
        // 4. Handle errors, including insufficient tokens
        if (error.message === "Insufficient tokens") {
            throw new Error("You don't have enough tokens. Please purchase more to continue.");
        }

        console.error("Error generating interview questions:", error);
        throw new Error(error.message || "Failed to generate interview questions");
    }
} 