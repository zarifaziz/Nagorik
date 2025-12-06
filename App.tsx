import React, { useState, useCallback, useEffect } from 'react';
import Hero from './components/Hero';
import TopicInput from './components/TopicInput';
import LoadingScreen from './components/LoadingScreen';
import LessonPlayer from './components/LessonPlayer';
import { generateLessonText, generateSlideImage } from './services/geminiService';
import { AppState, Language, Slide, LessonPlan } from './types';

function App() {
  const [state, setState] = useState<AppState>(AppState.HOME);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [slides, setSlides] = useState<Slide[]>([]);
  const [progress, setProgress] = useState(0);

  // Function to start the lesson generation process
  const handleStartLesson = useCallback(async (topic: string) => {
    setCurrentTopic(topic);
    setState(AppState.GENERATING_PLAN);
    setProgress(10);

    try {
      // Step 1: Generate Text Content
      const content = await generateLessonText(topic, language);
      
      const initialSlides: Slide[] = content.map(c => ({
        ...c,
        isLoadingImage: true
      }));

      setSlides(initialSlides);
      setState(AppState.GENERATING_IMAGES);
      setProgress(30);

      // Step 2: Generate Images one by one (to show progress and avoid rate limits)
      // We start the player immediately after getting text, but images load in background?
      // For better UX, let's load at least the first image before showing player,
      // or show a specific loading screen for "Generating Visuals".
      // Let's do parallel requests with a small delay if needed, or sequential for safety.
      
      const newSlides = [...initialSlides];
      
      // We will transition to playing immediately to let user read, 
      // but we need to manage the image generation in the background/effect
      setState(AppState.PLAYING);
      
      // Trigger background image generation
      for (let i = 0; i < newSlides.length; i++) {
        try {
          const imageUrl = await generateSlideImage(newSlides[i].visualPrompt);
          setSlides(prev => {
            const updated = [...prev];
            updated[i] = { ...updated[i], imageUrl, isLoadingImage: false };
            return updated;
          });
        } catch (e) {
          console.error(`Failed to load image for slide ${i}`, e);
          setSlides(prev => {
            const updated = [...prev];
            updated[i] = { 
              ...updated[i], 
              imageUrl: 'https://picsum.photos/800/600', 
              isLoadingImage: false 
            };
            return updated;
          });
        }
      }

    } catch (error) {
      console.error("Error creating lesson:", error);
      alert(language === Language.ENGLISH ? "Sorry, something went wrong. Please try again." : "দুঃখিত, কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      setState(AppState.HOME);
    }
  }, [language]);

  const handleExit = () => {
    if (confirm(language === Language.ENGLISH ? "Are you sure you want to exit?" : "আপনি কি নিশ্চিত যে আপনি বের হতে চান?")) {
      setState(AppState.HOME);
      setSlides([]);
      setCurrentTopic("");
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-soft-bg">
      {state === AppState.HOME && (
        <div className="animate-fade-in">
          <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-bangla-green rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                না
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-800">Nagorik</span>
            </div>
          </nav>
          
          <div className="py-10">
            {currentTopic === "" ? (
              <Hero 
                onStart={() => setCurrentTopic("selecting")} 
                language={language}
                setLanguage={setLanguage}
              />
            ) : (
              <TopicInput 
                onSubmit={handleStartLesson} 
                language={language} 
              />
            )}
          </div>
        </div>
      )}

      {state === AppState.GENERATING_PLAN && (
        <LoadingScreen 
          message={language === Language.ENGLISH ? "Writing lesson plan..." : "পাঠ পরিকল্পনা লিখছি..."}
          language={language}
          progress={progress}
        />
      )}

      {state === AppState.GENERATING_IMAGES && (
        <LoadingScreen 
