import { consumeTokens, getFeatureCost } from "@/lib/tokens";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

// Helper function to track token usage for AI features
export async function trackAIUsage(featureType, description, customTokens = null) {
    try {
        // Get the token cost for this feature from the database
        const tokenCost = customTokens || await getFeatureCost(featureType);

        if (!tokenCost) {
            console.error(`No token cost defined for feature: ${featureType}`);
            return false;
        }

        // Consume tokens and record the transaction
        await consumeTokens(tokenCost, description, featureType);
        return true;
    } catch (error) {
        console.error(`Error tracking AI usage: ${error.message}`);
        throw error;
    }
}
