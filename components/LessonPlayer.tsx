import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Download, ImageOff } from 'lucide-react';
import { Slide, Language } from '../types';

interface LessonPlayerProps {
  slides: Slide[];
  topic: string;
  language: Language;
  onExit: () => void;
}

const LessonPlayer: React.FC<LessonPlayerProps> = ({ slides, topic, language, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleImageError = (url: string) => {
    setImageErrors(prev => ({ ...prev, [url]: true }));
  };

  const currentSlide = slides[currentIndex];
  const isLastSlide = currentIndex === slides.length - 1;
  const progress = ((currentIndex + 1) / slides.length) * 100;
  
  // Check if current image has failed to load
  const hasError = currentSlide.mediaUrl && imageErrors[currentSlide.mediaUrl];

  return (
    <div className="flex flex-col h-screen bg-soft-bg">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <button 
          onClick={onExit}
          className="p-2 text-gray-500 hover:text-bangla-green hover:bg-green-50 rounded-lg transition-colors"
          title="Back to Home"
        >
          <Home className="w-6 h-6" />
        </button>
        
        <div className="flex-1 px-4 text-center">
          <h2 className={`font-bold text-gray-800 truncate ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
            {topic}
          </h2>
          <div className="w-full max-w-xs mx-auto bg-gray-100 rounded-full h-1 mt-1">
            <div 
              className="bg-bangla-green h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[60vh] md:h-[75vh] border border-gray-100">
          
          {/* Visual Side */}
          <div className="w-full md:w-3/5 bg-gray-100 relative flex items-center justify-center overflow-hidden group">
             {currentSlide.mediaType === 'video' ? (
                <video 
                  src={currentSlide.mediaUrl} 
                  controls 
                  autoPlay
                  loop
                  className="w-full h-full object-cover"
                />
             ) : hasError ? (
                <div className="flex flex-col items-center justify-center p-8 text-center text-gray-400">
                  <ImageOff className="w-16 h-16 mb-4" />
                  <p className="font-semibold">Image not found</p>
                  <p className="text-sm mt-2 max-w-xs">
                    Please run <code className="bg-gray-200 px-1 rounded text-gray-600 font-mono">node generate_images.js</code> in your terminal to generate the local images.
                  </p>
                </div>
             ) : (
                <img 
                  src={currentSlide.mediaUrl} 
                  alt={currentSlide.visualPrompt}
                  className="w-full h-full object-cover animate-fade-in transition-transform duration-1000 group-hover:scale-105"
                  loading="eager"
                  onError={() => currentSlide.mediaUrl && handleImageError(currentSlide.mediaUrl)}
                />
             )}
            
            {/* Slide Number Badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-gray-600 shadow-sm z-10">
              {currentIndex + 1} / {slides.length}
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-white relative">
            
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-bangla-green/5 rounded-bl-full"></div>

            <h1 className={`text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 leading-tight ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
              {currentSlide.title}
            </h1>
            <p className={`text-lg md:text-xl text-gray-600 leading-relaxed ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
              {currentSlide.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Footer / Controls */}
      <div className="bg-white border-t border-gray-200 p-4 md:p-6 pb-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all ${
              currentIndex === 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
            <span className={language === Language.BANGLA ? 'font-bengali' : ''}>
              {language === Language.ENGLISH ? "Previous" : "আগের"}
            </span>
          </button>

          {isLastSlide ? (
             <button 
             onClick={onExit}
             className="flex items-center space-x-2 px-8 py-3 bg-bangla-green text-white rounded-full font-bold hover:bg-green-800 hover:shadow-lg transition-all active:scale-95"
           >
             <span className={language === Language.BANGLA ? 'font-bengali' : ''}>
                {language === Language.ENGLISH ? "Complete Lesson" : "পাঠ সম্পন্ন"}
             </span>
             <Download className="w-5 h-5" />
           </button>
          ) : (
            <button 
              onClick={nextSlide}
              className="flex items-center space-x-2 px-8 py-3 bg-bangla-red text-white rounded-full font-bold hover:bg-red-600 hover:shadow-lg transition-all active:scale-95"
            >
              <span className={language === Language.BANGLA ? 'font-bengali' : ''}>
                {language === Language.ENGLISH ? "Next" : "পরবর্তী"}
              </span>
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;