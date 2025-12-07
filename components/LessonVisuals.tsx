import React from 'react';
import { 
  Hand, Bug, Droplets, Timer, Waves, Sparkles, 
  Octagon, Eye, Ear, Footprints, Users, 
  Trash2, Recycle, BookOpen, Utensils, Brush,
  MessageCircle, Bus, ShoppingBag, HeartHandshake,
  Frown, PaintBucket, Clock, Heart, ArrowRight, XCircle, Smile,
  ShieldCheck, Volume2
} from 'lucide-react';

interface LessonVisualsProps {
  visualId: string;
}

const VisualContainer: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = "bg-blue-50" }) => (
  <div className={`w-full h-full flex items-center justify-center ${color}`}>
    <div className="relative w-64 h-64 flex items-center justify-center bg-white rounded-full shadow-lg border-4 border-gray-100 p-8">
      {children}
    </div>
  </div>
);

const LessonVisuals: React.FC<LessonVisualsProps> = ({ visualId }) => {
  const renderVisual = () => {
    switch (visualId) {
      // Washing Hands
      case 'germs':
        return (
          <div className="relative text-gray-700">
            <Hand className="w-40 h-40" strokeWidth={1.5} />
            <Bug className="w-12 h-12 text-green-600 absolute top-10 right-8 animate-pulse" fill="currentColor" />
            <Bug className="w-8 h-8 text-green-500 absolute bottom-8 left-10 animate-bounce" fill="currentColor" />
            <Bug className="w-6 h-6 text-green-700 absolute top-20 left-12" fill="currentColor" />
          </div>
        );
      case 'soap':
        return (
          <div className="relative text-blue-500">
             <div className="w-24 h-16 border-4 border-current rounded-xl flex items-center justify-center mb-4 bg-blue-100">
                <span className="font-bold text-xl tracking-widest">SOAP</span>
             </div>
             <div className="absolute -top-4 -right-4 flex">
                <div className="w-4 h-4 bg-blue-200 rounded-full animate-ping"></div>
                <div className="w-6 h-6 bg-blue-300 rounded-full ml-2"></div>
             </div>
             <Hand className="w-32 h-32 text-gray-700 absolute top-10 left-4 opacity-50" />
          </div>
        );
      case 'scrub':
        return (
          <div className="flex items-center justify-center text-blue-600">
            <Timer className="w-20 h-20 absolute -top-8 text-gray-400" />
            <Hand className="w-32 h-32 -mr-8 text-gray-600" strokeWidth={2} />
            <Hand className="w-32 h-32 -ml-8 text-gray-600 scale-x-[-1]" strokeWidth={2} />
            <div className="absolute text-2xl font-bold bg-white px-2 rounded mt-20">20s</div>
          </div>
        );
      case 'rinse':
        return (
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-400 rounded-b-lg mb-2"></div>
            <Droplets className="w-16 h-16 text-blue-500 animate-bounce" fill="currentColor" />
            <Hand className="w-40 h-40 text-gray-700" />
          </div>
        );
      case 'dry':
        return (
          <div className="relative">
            <Hand className="w-40 h-40 text-gray-700" />
            <Sparkles className="w-12 h-12 text-yellow-400 absolute top-0 right-0 animate-pulse" fill="currentColor" />
            <Sparkles className="w-8 h-8 text-yellow-400 absolute bottom-4 left-0" />
          </div>
        );

      // Road Safety
      case 'stop':
        return (
          <div className="flex flex-col items-center">
            <Octagon className="w-40 h-40 text-red-600 mb-2" fill="currentColor" />
            <div className="w-full h-2 bg-gray-300 rounded-full"></div>
            <span className="text-white font-bold text-2xl absolute top-14">STOP</span>
          </div>
        );
      case 'look':
        return (
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-gray-800 flex items-center justify-center bg-gray-50 space-x-8">
               <div className="w-4 h-4 bg-black rounded-full"></div>
               <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
            <ArrowRight className="w-16 h-16 text-bangla-green absolute top-8 -right-12" strokeWidth={4} />
            <ArrowRight className="w-16 h-16 text-bangla-green absolute top-8 -left-12 rotate-180" strokeWidth={4} />
          </div>
        );
      case 'listen':
        return (
          <div className="flex items-center">
            <Ear className="w-32 h-32 text-gray-700" />
            <Volume2 className="w-16 h-16 text-red-500 ml-4 animate-pulse" />
          </div>
        );
      case 'zebra':
        return (
          <div className="relative w-48 h-48 bg-gray-800 rounded-lg flex flex-col justify-evenly p-4 overflow-hidden">
             <div className="h-6 w-full bg-white skew-x-12"></div>
             <div className="h-6 w-full bg-white skew-x-12"></div>
             <div className="h-6 w-full bg-white skew-x-12"></div>
             <Footprints className="w-24 h-24 text-yellow-400 absolute top-8 left-12 rotate-12" fill="currentColor" />
          </div>
        );
      case 'hold-hand':
        return (
          <div className="flex items-end justify-center space-x-2">
             <div className="flex flex-col items-center">
               <div className="w-8 h-8 rounded-full bg-gray-800 mb-1"></div>
               <div className="w-12 h-20 bg-gray-700 rounded-t-xl"></div>
             </div>
             <div className="flex flex-col items-center">
               <div className="w-12 h-12 rounded-full bg-gray-800 mb-1"></div>
               <div className="w-16 h-32 bg-gray-700 rounded-t-xl"></div>
             </div>
             <Heart className="w-8 h-8 text-red-500 absolute -top-4 animate-bounce" fill="currentColor" />
          </div>
        );

      // School Clean
      case 'trash':
        return (
          <div className="relative">
             <Hand className="w-24 h-24 text-gray-700 absolute -top-8 -left-8 rotate-45" />
             <div className="w-6 h-6 bg-gray-400 rounded absolute top-4 left-6 animate-ping"></div>
             <Trash2 className="w-40 h-40 text-green-600" />
          </div>
        );
      case 'dustbin':
        return (
          <div className="flex flex-col items-center text-green-600">
             <Recycle className="w-20 h-20 mb-2 animate-spin-slow" />
             <Trash2 className="w-32 h-32" />
          </div>
        );
      case 'tidy':
        return (
          <div className="flex flex-col items-center">
             <div className="flex space-x-2 mb-1">
                <BookOpen className="w-12 h-12 text-blue-500" />
                <div className="w-2 h-12 bg-yellow-400 rounded"></div>
             </div>
             <div className="w-48 h-4 bg-gray-800 rounded"></div>
             <div className="flex justify-between w-32">
                <div className="w-2 h-16 bg-gray-400"></div>
                <div className="w-2 h-16 bg-gray-400"></div>
             </div>
          </div>
        );
      case 'no-spill':
        return (
          <div className="relative">
             <Utensils className="w-32 h-32 text-gray-400" />
             <div className="w-16 h-16 bg-orange-400 rounded-full absolute top-8 left-8 opacity-20"></div>
             <ShieldCheck className="w-16 h-16 text-green-500 absolute -bottom-2 -right-2" fill="white" />
          </div>
        );
      case 'clean-together':
        return (
          <div className="flex space-x-4">
             <Brush className="w-24 h-24 text-blue-500 -scale-x-100" />
             <Brush className="w-24 h-24 text-green-500" />
          </div>
        );

      // Elders
      case 'salam':
        return (
          <div className="flex items-center space-x-4">
             <MessageCircle className="w-32 h-32 text-bangla-green" />
             <span className="absolute text-xl font-bold text-white pl-4">Salam!</span>
          </div>
        );
      case 'listen-elder':
        return (
          <div className="flex items-center">
             <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-500" />
             </div>
             <ArrowRight className="w-8 h-8 mx-2 text-gray-400" />
             <Ear className="w-24 h-24 text-bangla-green" />
          </div>
        );
      case 'seat':
        return (
          <div className="relative">
             <Bus className="w-40 h-40 text-blue-600" />
             <ArrowRight className="w-16 h-16 text-green-500 absolute top-10 left-10" strokeWidth={4} />
          </div>
        );
      case 'help-carry':
        return (
          <div className="flex items-center space-x-2">
             <ShoppingBag className="w-24 h-24 text-red-400" />
             <Hand className="w-24 h-24 text-gray-700" />
          </div>
        );
      case 'speak-softly':
        return (
          <div className="flex items-center">
             <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-gray-700 flex items-center justify-center">
                   <div className="w-12 h-2 bg-gray-700 rounded-full"></div>
                </div>
             </div>
             <Waves className="w-16 h-16 text-blue-300 ml-4" />
          </div>
        );

      // Water
      case 'tap-off':
        return (
          <div className="relative">
             <div className="w-8 h-8 bg-gray-400 rounded-b-lg mb-2 mx-auto"></div>
             <Frown className="w-32 h-32 text-gray-400" />
             <XCircle className="w-16 h-16 text-red-500 absolute -bottom-2 -right-2" fill="white" />
          </div>
        );
      case 'bucket':
        return (
           <div className="relative">
              <PaintBucket className="w-40 h-40 text-blue-600" fill="currentColor" fillOpacity={0.2} />
              <Droplets className="w-12 h-12 text-blue-400 absolute top-0 left-12 animate-bounce" />
           </div>
        );
      case 'leak':
        return (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-400 rounded-lg mb-2"></div>
            <Droplets className="w-12 h-12 text-blue-500" />
            <div className="w-32 h-4 bg-red-500 mt-4 rounded-full animate-pulse"></div>
          </div>
        );
      case 'shower':
        return (
          <div className="relative">
            <div className="w-20 h-4 bg-gray-400 rounded-full rotate-45 mb-4"></div>
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <div className="grid grid-cols-3 gap-1">
                   {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 bg-black rounded-full"></div>)}
                </div>
            </div>
            <Clock className="w-12 h-12 text-red-500 absolute -bottom-4 -right-4" />
          </div>
        );
      case 'water-life':
        return (
           <div className="relative">
              <Droplets className="w-40 h-40 text-blue-500" fill="currentColor" />
              <Heart className="w-16 h-16 text-white absolute top-12 left-12" fill="white" />
           </div>
        );

      // Line
      case 'line-end':
        return (
           <div className="flex items-center space-x-2">
              <div className="w-8 h-16 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-16 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-16 bg-bangla-green rounded-full border-2 border-green-700"></div>
              <ArrowRight className="w-8 h-8 text-green-600" />
           </div>
        );
      case 'distance':
        return (
           <div className="flex items-center justify-between w-48">
              <div className="w-12 h-24 bg-gray-400 rounded-full"></div>
              <div className="h-0.5 bg-gray-400 flex-1 mx-2 relative">
                 <div className="absolute -top-1 left-0 w-2 h-2 bg-gray-400 rounded-full"></div>
                 <div className="absolute -top-1 right-0 w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
              <div className="w-12 h-24 bg-gray-400 rounded-full"></div>
           </div>
        );
      case 'wait':
        return (
           <div className="relative">
              <div className="w-16 h-32 bg-gray-400 rounded-full mx-auto"></div>
              <Clock className="w-16 h-16 text-blue-500 absolute top-8 -right-8" />
           </div>
        );
      case 'no-push':
        return (
           <div className="flex items-center relative">
              <div className="w-12 h-24 bg-gray-400 rounded-full"></div>
              <Hand className="w-16 h-16 text-gray-600 -ml-4" />
              <div className="w-12 h-24 bg-gray-400 rounded-full ml-1"></div>
              <XCircle className="w-24 h-24 text-red-600 absolute left-4 opacity-80" />
           </div>
        );
      case 'order':
        return (
           <div className="flex items-center justify-center space-x-4">
              <Smile className="w-16 h-16 text-green-500" />
              <Smile className="w-16 h-16 text-green-500" />
              <Smile className="w-16 h-16 text-green-500" />
           </div>
        );
      
      default:
        return <BookOpen className="w-32 h-32 text-gray-300" />;
    }
  };

  return <VisualContainer>{renderVisual()}</VisualContainer>;
};

export default LessonVisuals;