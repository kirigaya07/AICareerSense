import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { generateWithDeepSeek } from "@/lib/deepseek";

export const generateIndustryInsights = inngest.createFunction(
  { name: "Generate Industry Insights" },
  { cron: "0 0 * * 0" }, // Run every Sunday at midnight
  async ({ event, step }) => {
    const industries = await step.run("Get distinct industries", async () => {
      return await db.user.groupBy({
        by: ["industry"],
        where: {
          industry: {
            not: null,
          },
        },
      });
    });

    for (const { industry } of industries) {
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

      // Get the response using step.ai.wrap
      const result = await step.ai.wrap(
        "deepseek",
        async (p) => {
          return await generateWithDeepSeek(p);
        },
        prompt
      );

      // Process the result, knowing it's already text
      const insights = await step.run(`Process insights for ${industry}`, async () => {
        // Since generateWithDeepSeek returns text directly, no need to access nested properties
        const cleanedText = result.replace(/```(?:json)?\n?/g, "").trim();
        return JSON.parse(cleanedText);
      });

      // Update the database with the new insights
      await step.run(`Update ${industry} insights`, async () => {
        await db.industryInsight.update({
          where: {
            industry
          },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      });
    }
  }
);
