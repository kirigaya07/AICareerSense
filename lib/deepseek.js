"use server";

export async function generateWithDeepSeek(prompt) {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.APP_URL || "https://aspireai.com", // Your site URL
          "X-Title": "AspireAI", // Your app name
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat:free", // Updated to the correct model name
          messages: [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "API request failed");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating content with DeepSeek:", error);
    throw error;
  }
}
