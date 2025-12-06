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
  imageUrl?: string; // Base64 or URL
  isLoadingImage: boolean;
}

export interface LessonPlan {
  topic: string;
  slides: Slide[];
}

export enum AppState {
  HOME,
  GENERATING_PLAN,
  GENERATING_IMAGES,
  PLAYING
}