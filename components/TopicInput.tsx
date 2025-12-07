import React, { useState } from 'react';
import { ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';
import { Language } from '../types';

interface TopicInputProps {
  onSubmit: (topic: string, isPreset?: boolean, presetId?: string) => void;
  onBack: () => void;
  language: Language;
}

const PRESETS = [
  { id: "washing-hands", en: "Washing Hands Properly", bn: "সঠিকভাবে হাত ধোয়া", icon: "🧼" },
  { id: "road-safety", en: "Crossing the Road Safely", bn: "নিরাপদে রাস্তা পারাপার", icon: "🚦" },
  { id: "school-clean", en: "Keeping Our School Clean", bn: "বিদ্যালয় পরিষ্কার রাখা", icon: "🧹" },
  { id: "respect-elders", en: "Respecting Elders", bn: "বড়দের সম্মান করা", icon: "🤝" },
  { id: "wasting-water", en: "Not Wasting Water", bn: "পানি অপচয় রোধ", icon: "💧" },
  { id: "standing-line", en: "Standing in Line", bn: "লাইনে ধরে দাঁড়ানো", icon: "🚶" },
];

const TopicInput: React.FC<TopicInputProps> = ({ onSubmit, onBack, language }) => {
  const [customTopic, setCustomTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTopic.trim()) {
      onSubmit(customTopic, false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in relative">
      <button 
        onClick={onBack}
        className="absolute top-0 left-4 md:left-0 flex items-center text-gray-500 hover:text-bangla-green transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        {language === Language.ENGLISH ? "Back" : "ফিরে যান"}
      </button>

      <h2 className={`text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 mt-8 ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
        {language === Language.ENGLISH ? "What should we learn today?" : "আজ আমরা কী শিখব?"}
      </h2>

      {/* Presets Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {PRESETS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => onSubmit(language === Language.BANGLA ? preset.bn : preset.en, true, preset.id)}
            className="flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-bangla-green hover:shadow-md transition-all duration-200 group"
          >
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">{preset.icon}</span>
            <span className={`font-semibold text-gray-700 text-center ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
              {language === Language.BANGLA ? preset.bn : preset.en}
            </span>
          </button>
        ))}
      </div>

      {/* Custom Input */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Sparkles className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder={language === Language.ENGLISH ? "Or type your own topic here..." : "অথবা আপনার পছন্দমতো বিষয় লিখুন..."}
              className={`block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-bangla-green focus:border-bangla-green sm:text-lg ${language === Language.BANGLA ? 'font-bengali' : ''}`}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-end gap-4">
            <button
              type="submit"
              disabled={!customTopic.trim()}
              className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-bangla-green hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bangla-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className={language === Language.BANGLA ? 'font-bengali' : ''}>
                 {language === Language.ENGLISH ? "Start" : "শুরু করুন"}
              </span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopicInput;