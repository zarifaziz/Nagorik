import React from 'react';
import { Loader2 } from 'lucide-react';
import { Language } from '../types';

interface LoadingScreenProps {
  message: string;
  language: Language;
  progress?: number; // 0 to 100
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message, language, progress }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-bangla-green opacity-20 rounded-full animate-ping"></div>
        <div className="relative bg-white p-4 rounded-full shadow-lg">
           <Loader2 className="w-12 h-12 text-bangla-green animate-spin" />
        </div>
      </div>
      
      <h3 className={`text-2xl font-bold text-gray-800 mb-2 ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
        {message}
      </h3>
      
      {progress !== undefined && (
        <div className="w-full max-w-md mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-bangla-green h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-500 font-medium">{Math.round(progress)}%</p>
        </div>
      )}

      <p className="mt-8 text-gray-400 max-w-sm text-sm">
        {language === Language.ENGLISH 
          ? "We are using AI to create custom educational content just for you."
          : "আমরা আপনার জন্য বিশেষ শিক্ষামূলক কনটেন্ট তৈরি করতে এআই ব্যবহার করছি।"}
      </p>
    </div>
  );
};

export default LoadingScreen;