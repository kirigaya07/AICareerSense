"use server";

import { readFileSync } from "fs";
import path from "path";

// Load the DeepSeek tokenizer configuration
let tokenizer = null;
let tokenizerConfig = null;

try {
  const tokenizerPath = path.join(
    process.cwd(),
    "deepseek_v3_tokenizer",
    "tokenizer.json"
  );
  const configPath = path.join(
    process.cwd(),
    "deepseek_v3_tokenizer",
    "tokenizer_config.json"
  );

  tokenizer = JSON.parse(readFileSync(tokenizerPath, "utf-8"));
  tokenizerConfig = JSON.parse(readFileSync(configPath, "utf-8"));
} catch (error) {
  console.error("Failed to load DeepSeek tokenizer:", error);
}

// Count tokens using DeepSeek tokenizer rules
export async function countDeepSeekTokens(text) {
  if (!text) return 0; // Handle null or empty text

  if (!tokenizer || !tokenizerConfig) {
    console.warn("DeepSeek tokenizer not loaded, using fallback estimation");
    // Fallback: Rough estimation (4 characters per token on average)
    return Math.ceil(text.length / 4);
  }

  // Simple implementation based on DeepSeek tokenizer
  const words = text.split(/\s+/);
  let tokenCount = 0;

  for (const word of words) {
    // Simple approximation based on word length and typical BPE patterns
    tokenCount += Math.max(1, Math.ceil(word.length / 3));
  }

  return tokenCount;
}

// Calculate tokens for both input and output
export async function calculateDeepSeekTokenUsage(input, output) {
  const inputTokens = await countDeepSeekTokens(input);
  const outputTokens = await countDeepSeekTokens(output);

  return {
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
  };
}
