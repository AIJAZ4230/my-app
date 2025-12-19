
import { GoogleGenAI } from "@google/genai";

export const generateSmartSummary = async (content: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{
        parts: [{
          text: `Summarize the following news article into a concise, professional 2-3 sentence overview: ${content}`
        }]
      }],
      config: {
        // No maxOutputTokens set to avoid conflicts with thinking budget for summary tasks
      }
    });

    // Access the text property directly as per the @google/genai guidelines
    const text = response.text;
    return text || "Summary unavailable.";
  } catch (error) {
    console.error("Gemini summary error:", error);
    return "AI was unable to generate a summary at this time.";
  }
};
