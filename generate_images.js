import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ---
const API_KEY = process.env.API_KEY; 
const OUTPUT_DIR = 'public/images';

if (!API_KEY) {
  console.error("❌ Error: API_KEY environment variable is not set.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// --- DATA (Duplicated from presets.ts to make this script standalone) ---
const PRESET_LESSONS = {
  'washing-hands': [
    { id: 'cover', prompt: "cute 3d cartoon boy washing hands with soap foam bubbles in bright bathroom" },
    { id: 'slide-1', prompt: "Close-up cartoon illustration of a child's hands covered in cute, colorful little germ monsters." },
    { id: 'slide-2', prompt: "A bar of soap creating lots of shiny bubbles." },
    { id: 'slide-3', prompt: "A happy child washing hands at a sink, scrubbing for 20 seconds." },
    { id: 'slide-4', prompt: "Clean, sparkling water rinsing suds off hands into a sink." },
    { id: 'slide-5', prompt: "Two hands held up high, sparkling clean, drying with a towel." }
  ],
  'road-safety': [
    { id: 'cover', prompt: "cute 3d cartoon girl waiting at zebra crossing with traffic light, safe city street" },
    { id: 'slide-1', prompt: "A child stopping safely at the edge of a sidewalk curb. City street background." },
    { id: 'slide-2', prompt: "A cartoon child looking left and right, big eyes, checking for cars." },
    { id: 'slide-3', prompt: "A child cupping their hand to their ear to listen for traffic." },
    { id: 'slide-4', prompt: "A happy child walking across a black and white zebra crossing." },
    { id: 'slide-5', prompt: "A small child holding the hand of a taller parent walking." }
  ],
  'school-clean': [
    { id: 'cover', prompt: "group of cute 3d cartoon children cleaning a colorful classroom, happy" },
    { id: 'slide-1', prompt: "A helpful student bending down to pick up a crumpled piece of paper." },
    { id: 'slide-2', prompt: "A student throwing trash into a colorful recycling bin." },
    { id: 'slide-3', prompt: "A neat and tidy school desk with books stacked perfectly." },
    { id: 'slide-4', prompt: "A child eating lunch carefully at a table, no mess." },
    { id: 'slide-5', prompt: "A group of diverse children happily cleaning a classroom together." }
  ],
  'respect-elders': [
    { id: 'cover', prompt: "cute 3d cartoon child bowing or greeting an elderly grandmother respectfully" },
    { id: 'slide-1', prompt: "A young child waving and smiling respectfully at an elderly person." },
    { id: 'slide-2', prompt: "A child sitting attentively and listening to a grandmother telling a story." },
    { id: 'slide-3', prompt: "Inside a bus, a child standing up to offer their seat to an older person." },
    { id: 'slide-4', prompt: "A child helping an older person carry a grocery bag." },
    { id: 'slide-5', prompt: "A child speaking gently, soft colors, flowers, kindness." }
  ],
  'wasting-water': [
    { id: 'cover', prompt: "cute 3d blue water drop character hugging the earth globe, precious water concept" },
    { id: 'slide-1', prompt: "A bathroom sink with the tap turned OFF." },
    { id: 'slide-2', prompt: "A colorful bucket filled with water in a garden." },
    { id: 'slide-3', prompt: "A cartoon wrench fixing a dripping tap." },
    { id: 'slide-4', prompt: "A shower head spraying water, timer clock next to it." },
    { id: 'slide-5', prompt: "A beautiful blue water drop holding a globe/earth inside it." }
  ],
  'standing-line': [
    { id: 'cover', prompt: "cute animal characters standing in a polite queue line, waiting happily" },
    { id: 'slide-1', prompt: "A line of cute animal characters standing in a queue." },
    { id: 'slide-2', prompt: "Characters in line with little arrows showing safe space between them." },
    { id: 'slide-3', prompt: "A child standing in line waiting patiently." },
    { id: 'slide-4', prompt: "A 'No Pushing' sign, cute cartoon style." },
    { id: 'slide-5', prompt: "Everyone at the front of the line getting their turn and looking super happy." }
  ]
};

// --- GENERATION LOGIC ---

async function generateImage(prompt, outputPath) {
  // Skip if already exists
  if (fs.existsSync(outputPath)) {
    console.log(`⏩ Skipping ${outputPath} (already exists)`);
    return;
  }

  console.log(`🎨 Generating: ${prompt.substring(0, 50)}...`);

  try {
    const enhancedPrompt = `
      Create a high-quality, vibrant children's comic book style illustration for: "${prompt}".
      Style: Pixar-style 3D render, cute, educational, vibrant colors, soft lighting, clear, NO TEXT in the image.
      Context: Educational material for primary school children.
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
          const buffer = Buffer.from(part.inlineData.data, 'base64');
          fs.writeFileSync(outputPath, buffer);
          console.log(`✅ Saved to ${outputPath}`);
          return;
        }
      }
    }
    console.error(`❌ Failed to get image data for: ${prompt}`);

  } catch (error) {
    console.error(`❌ Error generating ${prompt}:`, error.message);
  }
}

async function main() {
  // Ensure directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const [lessonId, slides] of Object.entries(PRESET_LESSONS)) {
    const lessonDir = path.join(OUTPUT_DIR, lessonId);
    if (!fs.existsSync(lessonDir)) {
      fs.mkdirSync(lessonDir, { recursive: true });
    }

    for (const slide of slides) {
      const fileName = `${slide.id}.png`;
      const filePath = path.join(lessonDir, fileName);
      await generateImage(slide.prompt, filePath);
      
      // Small delay to be nice to the API
      await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
  }
  console.log("\n✨ All done! Run your app to see the images.");
}

main();
