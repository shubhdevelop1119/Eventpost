export type Platform = 'instagram' | 'facebook' | 'linkedin' | 'x' | 'whatsapp';

export type WritingStyle = 'Exciting' | 'Friendly' | 'Professional' | 'Fun' | 'Promotional' | 'Formal';

export type ContentLength = 'short' | 'medium' | 'detailed';

export type Language = 'English' | 'Hindi' | 'Gujarati';

export type EmojiLevel = 'none' | 'minimal' | 'engaging';

export interface EventDetails {
  eventName: string;
  shortDescription: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  contactInfo?: string;
  registrationUrl?: string;
  targetAudience: string[];
}

export interface CustomizationOptions {
  platform: Platform;
  style: WritingStyle;
  length: ContentLength;
  language: Language;
  emojiLevel: EmojiLevel;
  includeHashtags: boolean;
}

export interface GeneratedVersion {
  id: 'A' | 'B' | 'C';
  name: string;
  styleLabel: string;
  text: string;
}

export interface HashtagCategories {
  popular: string[];
  eventSpecific: string[];
  location: string[];
}

export interface QualityScore {
  overall: number;
  completeness: number;
  engagement: number;
  clarity: number;
  callToAction: number;
  hashtagRelevance: number;
  platformSuitability: number;
  positivePoints: string[];
  improvementSuggestions: string[];
}

export interface SavedPost {
  id: string;
  eventName: string;
  eventDetails: EventDetails;
  content: string;
  platform: Platform;
  language: Language;
  style: WritingStyle;
  hashtags: string[];
  versions: GeneratedVersion[];
  selectedVersionId: 'A' | 'B' | 'C';
  createdAt: string;
  isPoster?: boolean;
}

export type PosterTemplate = 'Modern' | 'Minimal' | 'Professional' | 'Colorful' | 'Corporate' | 'College Event';

export interface PosterConfig {
  template: PosterTemplate;
  accentColor: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  ctaText: string;
  registrationUrl?: string;
  showQr: boolean;
}

export interface CalendarPhase {
  id: string;
  timeframe: string;
  badge: string;
  title: string;
  icon: string;
  platform: string;
  suggestedCaption: string;
  status: 'Scheduled' | 'Draft' | 'Published';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}
