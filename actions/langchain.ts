"use server";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.5-flash",
  temperature: 1.0,
});

export const generateContentLc = async (prompt: string) => {
  const response = await model.invoke(prompt);
  const text = response.text;
  const cleanedResponse = text?.trim().replace(/^```json|```$/g, "");
  const parsedResponse = JSON.parse(cleanedResponse || "{}");

  return parsedResponse;
};
