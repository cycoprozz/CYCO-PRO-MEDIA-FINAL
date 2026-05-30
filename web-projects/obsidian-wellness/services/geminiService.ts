import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "Obsidian", a digital wellness guide for a high-end massage and nutrition studio focused on luxury wellness, grounded presence, and intentional living.
Your tone is calm, confident, professional, and refined. You are knowledgeable about therapeutic massage (deep tissue, sports recovery) and clean nutrition (anti-inflammatory, functional foods).
Keep answers concise (under 100 words), encouraging, and rooted in holistic health.
Do not offer medical advice. Focus on recovery, stress relief, and "food as fuel".
`;

export const getWellnessAdvice = async (userQuery: string): Promise<string> => {
  if (!apiKey) {
    return "Wellness guide is currently offline. Please contact the studio directly.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I apologize, I am aligning my thoughts. Please ask again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently unable to process your request. Please focus on your breath and try again later.";
  }
};