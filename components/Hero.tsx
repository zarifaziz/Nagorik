import React from 'react';
import { BookOpen, Heart, Users } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  onStart: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, language, setLanguage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center max-w-4xl mx-auto">
      <div className="mb-8 p-3 bg-white rounded-full shadow-sm flex items-center space-x-1">
        <button 
          onClick={() => setLanguage(Language.ENGLISH)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${language === Language.ENGLISH ? 'bg-bangla-green text-white' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          English
        </button>
        <button 
          onClick={() => setLanguage(Language.BANGLA)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${language === Language.BANGLA ? 'bg-bangla-green text-white' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          বাংলা
        </button>
      </div>

      <h1 className={`text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
        {language === Language.ENGLISH ? 'Building a Better' : 'গড়ি এক সুন্দর'} <span className="text-bangla-green">{language === Language.ENGLISH ? 'Future' : 'ভবিষ্যৎ'}</span>, <br />
        {language === Language.ENGLISH ? 'One Lesson at a Time.' : 'শিক্ষার মাধ্যমে।'}
      </h1>

      <p className={`text-lg md:text-xl text-gray-600 mb-10 max-w-2xl ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
        {language === Language.ENGLISH 
          ? "Free, AI-powered civics education for schools in Bangladesh. Teach manners, safety, and community values easily."
          : "বাংলাদেশের স্কুলগুলোর জন্য বিনামূল্যে এআই-চালিত নাগরিক শিক্ষা। আদবকেতা, নিরাপত্তা এবং সামাজিক মূল্যবোধ শেখান সহজে।"}
      </p>

      <button 
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-bangla-red font-lg rounded-full hover:bg-red-600 hover:scale-105 shadow-lg"
      >
        <span className={language === Language.BANGLA ? 'font-bengali' : ''}>
          {language === Language.ENGLISH ? "Create a Lesson" : "পাঠ তৈরি করুন"}
        </span>
        <BookOpen className="ml-2 w-5 h-5" />
      </button>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-3 bg-green-100 rounded-full text-bangla-green mb-4">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className={`font-bold text-lg mb-2 ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
             {language === Language.ENGLISH ? "Values" : "মূল্যবোধ"}
          </h3>
          <p className="text-gray-500 text-sm">
             {language === Language.ENGLISH ? "Manners & Etiquette" : "আদবকেতা ও শিষ্টাচার"}
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-3 bg-red-100 rounded-full text-bangla-red mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h3 className={`font-bold text-lg mb-2 ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
             {language === Language.ENGLISH ? "Community" : "সম্প্রদায়"}
          </h3>
          <p className="text-gray-500 text-sm">
             {language === Language.ENGLISH ? "Respect & Helping Others" : "সম্মান ও সহযোগিতা"}
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className={`font-bold text-lg mb-2 ${language === Language.BANGLA ? 'font-bengali' : ''}`}>
             {language === Language.ENGLISH ? "Safety" : "নিরাপত্তা"}
          </h3>
          <p className="text-gray-500 text-sm">
             {language === Language.ENGLISH ? "Traffic & Hygiene" : "ট্রাফিক ও পরিচ্ছন্নতা"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;