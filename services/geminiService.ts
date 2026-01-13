
import { GoogleGenAI, Type } from "@google/genai";
import { AIResponse } from "../types";
import { KHUSHI_KNOWLEDGE } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIHint = async (question: string, currentTotal: number, targetAnswer: number): Promise<AIResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The student is solving an abacus math problem.
      Question: ${question}
      Target Answer: ${targetAnswer}
      Current Value on Abacus: ${currentTotal}
      
      If the current value is correct, cheer them on.
      If it is incorrect, provide a gentle hint about abacus rules (Small Friends, Big Friends) or what's missing.
      Keep it short, encouraging, and focused on abacus technique.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hint: { type: Type.STRING },
            cheer: { type: Type.STRING },
          },
          required: ["hint", "cheer"]
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    return data as AIResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      hint: "Check your bead positions carefully!",
      cheer: "You can do it!"
    };
  }
};

export const getChatResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are a helpful assistant for the KHUSHI Abacus App. 
        Use the following knowledge base to answer questions about the KHUSHI Foundation and its partners:
        ${KHUSHI_KNOWLEDGE}
        Be friendly, concise, and professional. If you don't know something, say you're still learning.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm having trouble connecting right now. Please try again later!";
  }
};
