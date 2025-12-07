export enum Language {
  ENGLISH = 'en',
  BANGLA = 'bn'
}

export interface SlideContent {
  title: string;
  explanation: string;
  visualPrompt: string;
}

export interface Slide extends SlideContent {
  id?: string;
  mediaType: 'image' | 'video';
  mediaUrl?: string; // Base64 or URL
}

export interface LessonPlan {
  topic: string;
  slides: Slide[];
}

export enum AppState {
  HOME,
  GENERATING_PLAN,
  GENERATING_MEDIA,
  PLAYING
}