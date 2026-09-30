import { EventDetails, CustomizationOptions, GeneratedVersion, HashtagCategories, QualityScore, CalendarPhase } from '../types';

export interface GeneratePostResponse {
  versions: GeneratedVersion[];
  hashtags: HashtagCategories;
  qualityScore: QualityScore;
}

export interface ImprovePostResponse {
  improvedText: string;
  explanation: string;
}

export async function generatePostsAPI(
  eventDetails: EventDetails,
  customization: CustomizationOptions
): Promise<GeneratePostResponse> {
  const res = await fetch('/api/generate-posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventDetails,
      platform: customization.platform,
      style: customization.style,
      length: customization.length,
      language: customization.language,
      emojiLevel: customization.emojiLevel,
      includeHashtags: customization.includeHashtags,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate posts');
  }

  return await res.json();
}

export async function improvePostAPI(
  currentText: string,
  action: string,
  targetLanguage: string,
  eventDetails: EventDetails,
  platform: string
): Promise<ImprovePostResponse> {
  const res = await fetch('/api/improve-post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      currentText,
      action,
      targetLanguage,
      eventDetails,
      platform,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to improve post');
  }

  return await res.json();
}

export async function generateCalendarAPI(eventDetails: EventDetails): Promise<{ phases: CalendarPhase[] }> {
  const res = await fetch('/api/generate-calendar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventDetails }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate calendar');
  }

  return await res.json();
}
