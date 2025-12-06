import { GoogleGenAI, Type } from "@google/genai";
import { Language, SlideContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonText = async (topic: string, language: Language): Promise<SlideContent[]> => {
  const langInstruction = language === Language.BANGLA 
    ? "The output fields 'title' and 'explanation' MUST be in Bengali (Bangla). The 'visualPrompt' MUST remain in English." 
    : "The output must be in English.";

  const prompt = `
    You are an expert primary school civics teacher in Bangladesh. 
    Create a 5-slide lesson plan on the topic: "${topic}".
    The target audience is young students. Keep language simple, encouraging, and kind.
    
    ${langInstruction}
    
    For each slide, provide:
    1. A short, catchy title.
    2. A simple explanation (2-3 sentences max).
    3. A visual prompt description to generate an illustration (keep this in English, describe a flat vector art style, friendly, educational).
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            explanation: { type: Type.STRING },
            visualPrompt: { type: Type.STRING }
          },
          required: ["title", "explanation", "visualPrompt"]
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate lesson plan");
  }

  try {
    return JSON.parse(response.text) as SlideContent[];
  } catch (e) {
    console.error("JSON parse error", e);
    throw new Error("Invalid response format from AI");
  }
};

export const generateSlideImage = async (prompt: string): Promise<string> => {
  try {
    // Enhanced prompt for consistency
    const enhancedPrompt = `${prompt}. Style: minimalist flat vector illustration, pastel colors, educational, child-friendly, white background.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: enhancedPrompt,
      config: {
        imageConfig: {
          aspectRatio: "4:3" // Best for slides
        }
      }
    });

    // Extract image from parts
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Image generation error:", error);
    // Fallback placeholder if generation fails to avoid breaking the UX completely
    return `https://picsum.photos/800/600?blur=2`; 
  }
};