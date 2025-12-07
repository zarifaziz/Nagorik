import { GoogleGenAI, Type } from "@google/genai";
import { Language, SlideContent } from "../types";
import { getImageFromDB, saveImageToDB } from "../utils/db";

// Note: We will create fresh instances for specific calls to ensure API key freshness if needed
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonText = async (topic: string, language: Language): Promise<SlideContent[]> => {
  const ai = getAI();
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
    3. A visual prompt description to generate an illustration. Describe a specific scene with characters (like a Bangladeshi boy or girl) doing the action. style: comic book.
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

// Generates an image or retrieves it from local IDB cache
export const getOrGenerateSlideImage = async (id: string, prompt: string): Promise<string> => {
  // 1. Check Local Cache
  const cachedImage = await getImageFromDB(id);
  if (cachedImage) {
    console.log(`✨ Cache hit for ${id}`);
    return cachedImage;
  }

  // 2. Generate if missing
  console.log(`🎨 Generating new image for ${id}...`);
  const ai = getAI();
  try {
    const enhancedPrompt = `
      Create a high-quality, vibrant children's comic book style illustration for: "${prompt}".
      Style: Pixar-style 3D render, cute, educational, vibrant colors, soft lighting, clear, NO TEXT in the image.
      Context: Educational material for primary school children in Bangladesh.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: enhancedPrompt,
      config: {
        imageConfig: {
          aspectRatio: "4:3"
        }
      }
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const base64Image = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          
          // 3. Save to Local Cache
          await saveImageToDB(id, base64Image);
          return base64Image;
        }
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Image generation error:", error);
    // Return a colorful placeholder if generation fails, but don't cache it so we retry later
    return `https://placehold.co/800x600/e0f2fe/006a4e.png?text=Image+Generation+Failed`; 
  }
};
