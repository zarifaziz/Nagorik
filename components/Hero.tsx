import React, { useState } from 'react';
import { Search, Sparkles, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { PRESET_LIST } from '../data/presets';

interface HeroProps {
  onSubmit: (topic: string, isPreset?: boolean, presetId?: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Hero: React.FC<HeroProps> = ({ onSubmit, language, setLanguage }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim(), false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-soft-bg animate-fade-in pb-12">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/50 backdrop-blur sticky top-0 z-20">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-bangla-green rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
            না
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-800">Nagorik</span>
        </div>
        
        <div className="flex bg-gray-100 rounded-full p-1">
          <button 
            onClick={() => setLanguage(Language.BANGLA)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${language === Language.BANGLA ? 'bg-white text-bangla-green shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            বাংলা
          </button>
          <button 
            onClick={() => setLanguage(Language.ENGLISH)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${language === Language.ENGLISH ? 'bg-white text-bangla-green shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            English
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-4 pt-10 pb-8 md:pt-16 md:pb-12 text-center max-w-5xl mx-auto w-full">
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
          {language === Language.ENGLISH ? "What will you learn today?" : "আজ আপনি কী শিখবেন?"}
        </h1>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-bangla-green to-teal-500 rounded-full blur opacity-20 transform translate-y-2"></div>
          <form onSubmit={handleSearch} className="relative bg-white rounded-full shadow-lg flex items-center p-2 border border-gray-100 transition-shadow focus-within:shadow-xl">
            <div className="pl-4 text-gray-400">
              <Search className="w-6 h-6" />
            </div>
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={language === Language.ENGLISH ? "Search for a topic or describe a lesson..." : "একটি বিষয় অনুসন্ধান করুন বা একটি পাঠ বর্ণনা করুন..."}
              className={`flex-1 p-3 md:p-4 text-lg bg-transparent border-none focus:ring-0 focus:outline-none placeholder-gray-400 ${language === Language.BANGLA ? 'font-bengali' : ''}`}
            />
            <button 
              type="submit"
              disabled={!query.trim()}
              className="bg-bangla-green text-white px-6 py-3 rounded-full font-bold hover:bg-green-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden md:inline">{language === Language.ENGLISH ? "Generate" : "তৈরি করুন"}</span>
            </button>
          </form>
        </div>

        {/* Categories / Presets */}
        <div className="text-left w-full">
          <h2 className={`text-2xl font-bold text-gray-800 mb-6 px-2 ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
             {language === Language.ENGLISH ? "Popular Lessons" : "জনপ্রিয় পাঠ"}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRESET_LIST.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onSubmit(language === Language.BANGLA ? preset.bn : preset.en, true, preset.id)}
                className="group relative flex flex-col h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 text-left"
              >
                {/* Image Placeholder - since we are generating on demand now */}
                <div className="h-full w-full overflow-hidden relative bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center group-hover:from-green-100 group-hover:to-emerald-200 transition-colors">
                   <BookOpen className="w-16 h-16 text-bangla-green opacity-20" />
                   
                   {/* Gradient Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <div className="flex items-center space-x-2 text-white/90 mb-1 text-xs font-bold uppercase tracking-wider">
                    <span className="bg-white/20 backdrop-blur px-2 py-1 rounded">Lesson</span>
                  </div>
                  <h3 className={`text-white text-xl font-bold leading-tight ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
                    {language === Language.BANGLA ? preset.bn : preset.en}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
