import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';

// --- CONFIGURATION ---
const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY;
const OUTPUT_DIR = 'public/covers';

if (!API_KEY) {
  console.error("❌ Error: GEMINI_API_KEY environment variable is not set.");
  console.error("   Run with: GEMINI_API_KEY=your_key node generate_covers.js");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Cover image prompts for each lesson
const COVER_PROMPTS = [
  {
    id: 'washing-hands',
    prompt: 'A cheerful Bangladeshi child happily washing hands with lots of colorful soap bubbles in a bright bathroom, 3D Pixar style, vibrant colors, educational illustration for children'
  },
  {
    id: 'road-safety',
    prompt: 'A Bangladeshi child safely waiting at a zebra crossing with a green traffic light, holding parent hand, 3D Pixar style, vibrant colors, educational illustration for children'
  },
  {
    id: 'school-clean',
    prompt: 'Group of happy Bangladeshi children cleaning their colorful classroom together, sweeping and organizing desks, 3D Pixar style, vibrant colors, educational illustration'
  },
  {
    id: 'respect-elders',
    prompt: 'A Bangladeshi child respectfully greeting an elderly grandmother with traditional salaam gesture, warm family scene, 3D Pixar style, vibrant colors, educational illustration'
  },
  {
    id: 'wasting-water',
    prompt: 'A cute blue water droplet character hugging planet Earth, with a Bangladeshi child turning off a tap, 3D Pixar style, vibrant colors, save water educational illustration'
  },
  {
    id: 'standing-line',
    prompt: 'Cute diverse children standing patiently in an orderly queue line at school, waiting for their turn, 3D Pixar style, vibrant colors, educational illustration'
  }
];

async function generateImage(prompt, outputPath) {
  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`⏩ Skipping ${outputPath} (already exists)`);
    return true;
  }

  console.log(`🎨 Generating cover for: ${path.basename(outputPath, '.png')}...`);

  try {
    const enhancedPrompt = `
      Create a high-quality, vibrant children's illustration: "${prompt}".
      Style: Pixar-style 3D render, cute characters, educational, vibrant saturated colors, soft lighting, clear composition, NO TEXT in the image.
      Aspect ratio should work well as a card cover image.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: enhancedPrompt,
      config: {
        responseModalities: ['image', 'text'],
        imageSafetySetting: 'block_none'
      }
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const buffer = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync(outputPath, buffer);
          console.log(`✅ Saved: ${outputPath}`);
          return true;
        }
      }
    }
    console.error(`❌ No image data in response for: ${path.basename(outputPath)}`);
    return false;

  } catch (error) {
    console.error(`❌ Error generating ${path.basename(outputPath)}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Generating lesson cover images...\n');

  // Ensure directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let successCount = 0;

  for (const cover of COVER_PROMPTS) {
    const filePath = path.join(OUTPUT_DIR, `${cover.id}.png`);
    const success = await generateImage(cover.prompt, filePath);
    if (success) successCount++;
    
    // Delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n✨ Done! Generated ${successCount}/${COVER_PROMPTS.length} cover images.`);
  console.log(`📁 Images saved to: ${OUTPUT_DIR}/`);
}

main();
