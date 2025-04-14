"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateWithDeepSeek } from "@/lib/deepseek";
import { revalidatePath } from "next/cache";
import { trackDeepSeekUsage } from "@/lib/ai-helpers";

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    TASK: Improve a resume ${type} description for a ${user.industry} professional.
    
    CURRENT CONTENT: "${current}"
    
    REQUIREMENTS:
    1. Transform the content to be more impactful, quantifiable, and aligned with industry standards
    2. Use strong action verbs at the beginning of phrases
    3. Include specific metrics and measurable results where appropriate (percentages, numbers, etc.)
    4. Highlight relevant technical skills for the ${user.industry} industry
    5. Keep the content concise yet detailed and professional
    6. Focus on achievements and outcomes rather than just responsibilities
    7. Incorporate industry-specific keywords that would perform well in ATS systems
    8. Maintain the same general information but enhance the presentation
    
    FORMAT: Return ONLY the improved content as a single paragraph without any additional explanations, 
    comments, or formatting. Do not include phrases like "Improved version:" or any other metadata.
  `;

  try {
    const improvedContent = await generateWithDeepSeek(prompt);
    trackDeepSeekUsage(
      prompt,
      improvedContent,
      "resume_improvement",
      `Improved ${type} description for ${user.industry} professional`
    );

    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}
