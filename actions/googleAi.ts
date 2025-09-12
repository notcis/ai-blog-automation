"use server";

import { GoogleGenAI } from "@google/genai";

import "dotenv/config";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateContentAi = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  const cleanedResponse = text?.trim().replace(/^```json|```$/g, "");
  const parsedResponse = JSON.parse(cleanedResponse || "{}");

  return parsedResponse;
};
