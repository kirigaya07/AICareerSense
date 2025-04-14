import { consumeTokens } from "@/lib/tokens";
import { calculateDeepSeekTokenUsage } from "@/lib/deepseek-tokens";

// New function to track DeepSeek model token usage
export async function trackDeepSeekUsage(
  input,
  output,
  featureType,
  description
) {
  try {
    // Make sure we have valid input and output
    if (!input || !output) {
      console.error("Invalid input or output for token tracking");

      // Use a minimum default token count instead of failing
      const defaultTokens = 100;
      await consumeTokens(
        defaultTokens,
        `${description} (default token count)`,
        featureType
      );

      return {
        success: true,
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: defaultTokens,
      };
    }

    // Calculate tokens used by DeepSeek
    const tokenUsage = await calculateDeepSeekTokenUsage(input, output);

    // Double-check that we have a valid token count before consuming
    if (
      !tokenUsage ||
      typeof tokenUsage.totalTokens !== "number" ||
      isNaN(tokenUsage.totalTokens)
    ) {
      console.warn("Invalid token calculation result, using default value");

      // Use a minimum default token count instead of failing
      const defaultTokens = 100;
      await consumeTokens(
        defaultTokens,
        `${description} (default token count)`,
        featureType
      );

      return {
        success: true,
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: defaultTokens,
      };
    }

    // Consume tokens based on actual usage
    const result = await consumeTokens(
      tokenUsage.totalTokens,
      `${description} (${tokenUsage.inputTokens} input + ${tokenUsage.outputTokens} output tokens)`,
      featureType
    );

    // Return token usage details
    return {
      ...result,
      ...tokenUsage,
    };
  } catch (error) {
    console.error(`Error tracking DeepSeek usage: ${error.message}`);

    // Use a minimum default token count in case of errors
    const defaultTokens = 100;
    try {
      await consumeTokens(
        defaultTokens,
        `${description} (default token count - error recovery)`,
        featureType
      );
    } catch (secondError) {
      console.error(
        `Failed to use default token count: ${secondError.message}`
      );
    }

    throw error;
  }
}
