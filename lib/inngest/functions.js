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
  TASK: Generate a detailed analysis of the ${industry} industry in India using ONLY Glassdoor's latest data in JSON format.

  OUTPUT FORMAT: Return ONLY the following JSON structure without ANY explanatory text, markdown formatting, or code block delimiters:
  {
    "salaryRanges": [
      { "role": "string", "min": number, "max": number, "median": number, "location": "India" }
    ],
    "growthRate": number,
    "demandLevel": "HIGH" | "MEDIUM" | "LOW",
    "topSkills": ["string", "string", "string", "string", "string"],
    "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
    "keyTrends": ["string", "string", "string", "string", "string"],
    "recommendedSkills": ["string", "string", "string", "string", "string"]
  }

  REQUIREMENTS:
  1. "salaryRanges" MUST contain EXACTLY 5 of the most in-demand roles in the ${industry} industry with:
     - Salaries in thousands for India
     - Accurate min, max, and median figures from Glassdoor
     - Example: { "role": "Data Scientist", "min": 8, "max": 25, "median": 15, "location": "India" }

  2. "growthRate" MUST be a numeric percentage value (e.g., 8.2 for 8.2% growth) from Glassdoor industry reports

  3. "demandLevel" MUST be one of:
     - "HIGH" (50,000+ job postings on Glassdoor)
     - "MEDIUM" (20,000-50,000 postings)
     - "LOW" (<20,000 postings)

  4. "topSkills" MUST list EXACTLY 5 most valuable technical skills from Glassdoor job postings

  5. "marketOutlook" MUST be one of: "POSITIVE", "NEUTRAL", or "NEGATIVE" based on Glassdoor's industry forecast

  6. "keyTrends" MUST list EXACTLY 5 current trends from Glassdoor industry reports

  7. "recommendedSkills" MUST list EXACTLY 5 emerging skills from Glassdoor's future-jobs data

  VALIDATION:
  - All strings must be properly double-quoted ("string")
  - All arrays must have exactly 5 elements (no more, no less)
  - No comments, explanations, or formatting outside the JSON structure
  - Numbers must be actual numbers without quotation marks
  - Ensure all JSON syntax is valid:
     - Correct use of commas (no trailing commas)
     - Proper matching of brackets and braces
     - No trailing whitespace or special characters
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
      const insights = await step.run(
        `Process insights for ${industry}`,
        async () => {
          // Since generateWithDeepSeek returns text directly, no need to access nested properties
          const cleanedText = result.replace(/```(?:json)?\n?/g, "").trim();
          return JSON.parse(cleanedText);
        }
      );

      // Update the database with the new insights
      await step.run(`Update ${industry} insights`, async () => {
        await db.industryInsight.update({
          where: {
            industry,
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
