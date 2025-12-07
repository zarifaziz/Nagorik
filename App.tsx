import React, { useState, useCallback } from 'react';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import LessonPlayer from './components/LessonPlayer';
import { generateLessonText, getOrGenerateSlideImage } from './services/geminiService';
import { AppState, Language, Slide } from './types';
import { PRESET_LESSONS } from './data/presets';

function App() {
  const [state, setState] = useState<AppState>(AppState.HOME);
  const [language, setLanguage] = useState<Language>(Language.BANGLA);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [slides, setSlides] = useState<Slide[]>([]);
  const [progress, setProgress] = useState(0);

  // Function to start the lesson generation process
  const handleStartLesson = useCallback(async (topic: string, isPreset: boolean = false, presetId?: string) => {
    setCurrentTopic(topic);
    
    let initialSlides: Slide[] = [];

    // Step 1: Get Content (Text)
    try {
      if (isPreset && presetId && PRESET_LESSONS[presetId]) {
        // Use preset text
        const presetData = PRESET_LESSONS[presetId];
        const content = language === Language.BANGLA ? presetData.bn : presetData.en;
        initialSlides = content.map((c, idx) => ({
          ...c,
          // We generate a stable ID for caching preset images: "preset-lessonId-slideIdx"
          // This allows us to "pre-generate" them once and keep them forever in browser DB
          id: `preset-${presetId}-${idx}`,
          mediaType: 'image',
          mediaUrl: undefined
        }));
      } else {
        // Generate text via AI for custom topics
        setState(AppState.GENERATING_PLAN);
        setProgress(20);
        const content = await generateLessonText(topic, language);
        // Custom topics get ephemeral IDs or hashed IDs based on prompt
        initialSlides = content.map((c, idx) => ({
          ...c,
          id: `custom-${Date.now()}-${idx}`,
          mediaType: 'image',
          mediaUrl: undefined
        }));
      }

      // Step 2: Generate Media (Check Cache First)
      setState(AppState.GENERATING_MEDIA);
      setProgress(isPreset ? 10 : 30); 
      
      const totalSlides = initialSlides.length;
      let completedMedia = 0;

      // Generate images in parallel
      const finalSlides = await Promise.all(initialSlides.map(async (slide, index) => {
        try {
          // Add a small delay for batched requests if we are generating fresh
          if (!isPreset) await new Promise(r => setTimeout(r, index * 200));

          // This service now checks IndexedDB first. 
          // If the user has opened this lesson before, it returns INSTANTLY.
          // If not, it generates via Gemini and saves it.
          const url = await getOrGenerateSlideImage(slide.id || `slide-${index}`, slide.visualPrompt);
          
          completedMedia++;
          const startP = isPreset ? 10 : 30;
          setProgress(startP + (completedMedia / totalSlides) * (100 - startP));
          
          return { ...slide, mediaUrl: url };
        } catch (e) {
          console.error(`Media generation failed for slide ${index}`, e);
          return { 
            ...slide, 
            mediaType: 'image' as const,
            mediaUrl: 'https://placehold.co/800x600/f3f8f6/006a4e.png?text=Image+Error' 
          };
        }
      }));

      setSlides(finalSlides);
      setState(AppState.PLAYING);

    } catch (error) {
      console.error("Error creating lesson:", error);
      alert(language === Language.ENGLISH ? "Sorry, something went wrong. Please try again." : "দুঃখিত, কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      setState(AppState.HOME);
      setCurrentTopic("");
    }
  }, [language]);

  const handleExit = () => {
    setState(AppState.HOME);
    setSlides([]);
    setCurrentTopic("");
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-soft-bg">
      {state === AppState.HOME && (
        <Hero 
          onSubmit={handleStartLesson} 
          language={language}
          setLanguage={setLanguage}
        />
      )}

      {state === AppState.GENERATING_PLAN && (
        <LoadingScreen 
          message={language === Language.ENGLISH ? "Planning your lesson..." : "আপনার পাঠ পরিকল্পনা করছি..."}
          language={language}
          progress={progress}
        />
      )}

      {state === AppState.GENERATING_MEDIA && (
        <LoadingScreen 
          message={language === Language.ENGLISH ? "Drawing illustrations..." : "ছবি আঁকা হচ্ছে..."}
          language={language}
          progress={progress}
        />
      )}

      {state === AppState.PLAYING && (
        <LessonPlayer 
          slides={slides} 
          topic={currentTopic} 
          language={language}
          onExit={handleExit}
        />
      )}
    </div>
  );
}

export default App;
