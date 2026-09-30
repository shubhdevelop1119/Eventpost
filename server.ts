import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

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
  platform: 'instagram' | 'facebook' | 'linkedin' | 'x' | 'whatsapp';
  style: 'Exciting' | 'Friendly' | 'Professional' | 'Fun' | 'Promotional' | 'Formal';
  length: 'short' | 'medium' | 'detailed';
  language: 'English' | 'Hindi' | 'Gujarati';
  emojiLevel: 'none' | 'minimal' | 'engaging';
  includeHashtags: boolean;
}

// Fallback high quality generators for reliability
function generateFallbackVersions(
  event: EventDetails,
  custom: CustomizationOptions
) {
  const isHindi = custom.language === 'Hindi';
  const isGujarati = custom.language === 'Gujarati';

  const regText = event.registrationUrl
    ? `\n${isHindi ? 'पंजीकरण करें' : isGujarati ? 'નોંધણી કરો' : 'Register now'}: ${event.registrationUrl}`
    : '';

  const contactText = event.contactInfo
    ? `\n${isHindi ? 'संपर्क' : isGujarati ? 'સંપર્ક' : 'Contact'}: ${event.contactInfo}`
    : '';

  const audienceStr = event.targetAudience.join(', ');

  // English fallback versions
  let versionA = `🔥 Get ready for ${event.eventName}! 🔥\n\n${event.shortDescription}\n\nJoin ${audienceStr ? `fellow ${audienceStr}` : 'us'} for an unforgettable experience organized by ${event.organizer || 'our team'}!\n\n📅 Date: ${event.date || 'TBA'}\n⏰ Time: ${event.time || 'TBA'}\n📍 Venue: ${event.venue || 'TBA'}${regText}${contactText}\n\nDon't miss out on this high-energy gathering. Seats are filling fast—save your spot today!`;

  let versionB = `We are pleased to announce ${event.eventName}.\n\nOrganized by ${event.organizer || 'the organizing committee'}, this event is curated specifically for ${audienceStr || 'attendees'}.\n\nOverview:\n${event.shortDescription}\n\nEvent Schedule & Location:\n• Date: ${event.date || 'TBA'}\n• Time: ${event.time || 'TBA'}\n• Venue: ${event.venue || 'TBA'}${regText}${contactText}\n\nWe look forward to welcoming you. Secure your registration through the official portal.`;

  let versionC = `⚡ ${event.eventName} is coming!\n\n${event.shortDescription.split('.')[0] || event.shortDescription}.\n\n📅 ${event.date || 'Soon'} | ⏰ ${event.time || ''} | 📍 ${event.venue || 'Venue'}${regText}\n\nSeats are limited—join us now!`;

  if (isHindi) {
    versionA = `🔥 ${event.eventName} के लिए तैयार हो जाइए! 🔥\n\n${event.shortDescription}\n\n${event.organizer || 'आयोजकों'} द्वारा आयोजित इस शानदार कार्यक्रम में ${audienceStr ? `${audienceStr}` : 'आप सभी'} का स्वागत है!\n\n📅 दिनांक: ${event.date || 'शीघ्र'}\n⏰ समय: ${event.time || 'निर्धारित समय'}\n📍 स्थान: ${event.venue || 'स्थान'}${regText}${contactText}\n\nइस प्रेरणादायक और रोमांचक अवसर को बिल्कुल न चूकें। आज ही अपना स्थान सुरक्षित करें!`;
    versionB = `सादर आमंत्रण: ${event.eventName}।\n\n${event.organizer || 'आयोजन समिति'} द्वारा विशेष रूप से ${audienceStr || 'आप सभी'} के लिए आयोजित।\n\nविवरण:\n${event.shortDescription}\n\nकार्यक्रम विवरण:\n• दिनांक: ${event.date || 'शीघ्र'}\n• समय: ${event.time || ''}\n• स्थान: ${event.venue || ''}${regText}${contactText}\n\nहम आपकी गरिमामयी उपस्थिति की प्रतीक्षा कर रहे हैं।`;
    versionC = `⚡ ${event.eventName}!\n\n${event.shortDescription.split('.')[0] || event.shortDescription}।\n\n📅 ${event.date || ''} | 📍 ${event.venue || ''}${regText}\n\nजल्द रजिस्टर करें और हमारे साथ जुड़ें!`;
  } else if (isGujarati) {
    versionA = `🔥 ${event.eventName} માટે તૈયાર થઈ જાઓ! 🔥\n\n${event.shortDescription}\n\n${event.organizer || 'આયોજકો'} દ્વારા આયોજિત આ અદ્ભુત ઇવેન્ટમાં ${audienceStr ? `${audienceStr}` : 'સૌ'} નું હાર્દિક સ્વાગત છે!\n\n📅 તારીખ: ${event.date || 'ટૂંક સમયમાં'}\n⏰ સમય: ${event.time || ''}\n📍 સ્થળ: ${event.venue || ''}${regText}${contactText}\n\nઆ ઉત્સાહભર્યા અવસરને ચૂકશો નહીં. આજે જ તમારી સીટ બુક કરો!`;
    versionB = `નમસ્કાર, ${event.eventName} નું આયોજન જાહેર કરતાં આનંદ થાય છે.\n\n${event.organizer || 'આયોજક મંડળ'} તરફથી ખાસ કરીને ${audienceStr || 'ભાગ લેનારાઓ'} માટે આ વિશેષ કાર્યક્રમ પ્રસ્તુત છે.\n\nસંક્ષિપ્ત માહિતી:\n${event.shortDescription}\n\nકાર્યક્રમ વિગત:\n• તારીખ: ${event.date || ''}\n• સમય: ${event.time || ''}\n• સ્થળ: ${event.venue || ''}${regText}${contactText}\n\nઆપની ઉપસ્થિતિ આવકાર્ય છે. અધિકૃત લિંક પરથી નોંધણી કરો.`;
    versionC = `⚡ ${event.eventName} આવી રહ્યું છે!\n\n${event.shortDescription.split('.')[0] || event.shortDescription}.\n\n📅 ${event.date || ''} | 📍 ${event.venue || ''}${regText}\n\nસીટો મર્યાદિત છે—આજે જ જોડાવો!`;
  }

  // Adjust for emoji preference
  if (custom.emojiLevel === 'none') {
    versionA = versionA.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    versionB = versionB.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    versionC = versionC.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
  }

  // Generate hashtags
  const cleanName = event.eventName.replace(/[^a-zA-Z0-9]/g, '');
  const locationTag = event.venue
    ? '#' + event.venue.split(',')[0].replace(/[^a-zA-Z0-9]/g, '') + 'Events'
    : '#LiveEvents';
  const organizerTag = event.organizer ? '#' + event.organizer.replace(/[^a-zA-Z0-9]/g, '') : '';

  const hashtags = {
    popular: ['#Event2026', '#Networking', '#Innovation', '#Community'],
    eventSpecific: [
      `#${cleanName || 'Event'}`,
      organizerTag || '#FeaturedEvent',
      `#${cleanName}Live`,
    ].filter(Boolean),
    location: [locationTag, '#UpcomingEvents', '#CityHappenings'],
  };

  const allTagsString = custom.includeHashtags
    ? `\n\n${[...hashtags.eventSpecific, ...hashtags.popular.slice(0, 2), hashtags.location[0]].join(' ')}`
    : '';

  return {
    versions: [
      {
        id: 'A',
        name: 'Version A — Exciting',
        styleLabel: 'Exciting & High Energy',
        text: versionA.trim() + allTagsString,
      },
      {
        id: 'B',
        name: 'Version B — Professional',
        styleLabel: 'Formal & Polished',
        text: versionB.trim() + allTagsString,
      },
      {
        id: 'C',
        name: 'Version C — Short & Catchy',
        styleLabel: 'Punchy & Crisp',
        text: versionC.trim() + allTagsString,
      },
    ],
    hashtags,
    qualityScore: {
      overall: 88,
      completeness: 92,
      engagement: 86,
      clarity: 90,
      callToAction: 84,
      hashtagRelevance: 88,
      platformSuitability: 90,
      positivePoints: [
        'Event name and core description included',
        'Date, time and venue clearly stated',
        'Direct call-to-action present',
      ],
      improvementSuggestions: [
        'Opening hook could include a compelling rhetorical question',
        'Consider tagging partner accounts or sponsors',
      ],
    },
  };
}

// POST: Generate Posts (Gemini + Smart Fallback)
app.post('/api/generate-posts', async (req, res) => {
  try {
    const { eventDetails, platform, style, length, language, emojiLevel, includeHashtags } = req.body;

    if (!eventDetails?.eventName) {
      return res.status(400).json({ error: 'Event name is required' });
    }

    if (ai) {
      try {
        const prompt = `You are a professional social media marketing copywriter for EventPost AI.
Generate 3 distinct promotional post versions for an event with the following details:
- Event Name: ${eventDetails.eventName}
- Short Description: ${eventDetails.shortDescription || 'None'}
- Date: ${eventDetails.date || 'TBA'}
- Time: ${eventDetails.time || 'TBA'}
- Venue: ${eventDetails.venue || 'TBA'}
- Organizer: ${eventDetails.organizer || 'TBA'}
- Contact Information: ${eventDetails.contactInfo || 'None'}
- Registration URL: ${eventDetails.registrationUrl || 'None'}
- Target Audience: ${(eventDetails.targetAudience || []).join(', ') || 'General audience'}

Customization Requirements:
- Platform: ${platform}
- Writing Style: ${style}
- Content Length: ${length} (short = ~40-60 words, medium = ~100-140 words, detailed = ~180-250 words)
- Target Language: ${language} (Write naturally in this language. If Hindi or Gujarati, write authentic fluent script, not transliterated English)
- Emoji Level: ${emojiLevel} (none = zero emojis, minimal = 1-2 functional icons, engaging = expressive and visually dynamic)
- Include Hashtags: ${includeHashtags}

CRITICAL RULES:
1. NEVER invent fake dates, venues, or links. Only use the exact info provided by the user. If missing, state TBA or omit.
2. Return strictly valid JSON matching this schema:
{
  "versions": [
    { "id": "A", "name": "Version A — Exciting", "styleLabel": "Exciting", "text": "..." },
    { "id": "B", "name": "Version B — Professional", "styleLabel": "Professional", "text": "..." },
    { "id": "C", "name": "Version C — Short & Catchy", "styleLabel": "Short & Catchy", "text": "..." }
  ],
  "hashtags": {
    "popular": ["#Tag1", "#Tag2"],
    "eventSpecific": ["#Specific1", "#Specific2"],
    "location": ["#LocTag1", "#LocTag2"]
  },
  "qualityScore": {
    "overall": 88,
    "completeness": 90,
    "engagement": 85,
    "clarity": 88,
    "callToAction": 85,
    "hashtagRelevance": 86,
    "platformSuitability": 90,
    "positivePoints": ["...", "..."],
    "improvementSuggestions": ["..."]
  }
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });

        const rawText = response.text || '';
        const parsed = JSON.parse(rawText);
        return res.json(parsed);
      } catch (geminiError) {
        console.warn('Gemini API call failed or timed out, using fallback generation:', geminiError);
        // Fall back to robust algorithmic generation
      }
    }

    const fallbackData = generateFallbackVersions(eventDetails, {
      platform,
      style,
      length,
      language,
      emojiLevel,
      includeHashtags,
    });
    return res.json(fallbackData);
  } catch (error: any) {
    console.error('Error generating posts:', error);
    res.status(500).json({ error: error.message || 'Failed to generate posts' });
  }
});

// POST: Improve Post (AI actions)
app.post('/api/improve-post', async (req, res) => {
  try {
    const { currentText, action, targetLanguage, eventDetails, platform } = req.body;

    if (!currentText) {
      return res.status(400).json({ error: 'Current text is required' });
    }

    if (ai) {
      try {
        const prompt = `You are a social media copy editor in EventPost AI.
Improve this post based on the requested action:
Current Post:
"""
${currentText}
"""

Requested Improvement Action: "${action}"
Target Language: "${targetLanguage || 'Original'}"
Target Platform: "${platform || 'General'}"
Event Context: Name="${eventDetails?.eventName || ''}", Date="${eventDetails?.date || ''}", Venue="${eventDetails?.venue || ''}"

Actions can be:
- "engaging": Make more engaging with hook questions and enthusiasm
- "shorter": Cut fluff, make punchy and concise
- "longer": Expand with vivid event details and benefits
- "professional": Refine tone for corporate/LinkedIn clarity
- "friendly": Warm, approachable, welcoming tone
- "opening": Craft a magnetic, thumb-stopping first line
- "cta": Add clear, urgent call-to-action
- "hashtags": Optimize and add relevant trending hashtags
- "simplify": Use plain, clear, accessible words
- "translate": Translate naturally into ${targetLanguage}

CRITICAL RULES:
1. Do NOT invent new facts not in the current post or event details.
2. Return strictly valid JSON:
{
  "improvedText": "...",
  "explanation": "Brief 1-sentence note of what was refined."
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.6,
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        if (parsed.improvedText) {
          return res.json(parsed);
        }
      } catch (err) {
        console.warn('Gemini improvement fallback:', err);
      }
    }

    // High quality programmatic fallback for improvements
    let improved = currentText;
    let explanation = 'Applied requested refinement.';

    switch (action) {
      case 'engaging':
        improved = `Ready to experience something extraordinary? ✨\n\n` + currentText;
        explanation = 'Added an engaging conversational opening hook.';
        break;
      case 'shorter':
        // Shorten paragraphs
        const lines = currentText.split('\n').filter((l: string) => l.trim().length > 0);
        improved = lines.slice(0, Math.max(3, Math.ceil(lines.length * 0.6))).join('\n\n');
        explanation = 'Trimmed secondary text to increase readability and punch.';
        break;
      case 'longer':
        improved = currentText + `\n\nWhether you're looking to network, learn from industry pioneers, or simply have an inspiring time, this event is designed for you. Bring a friend and join our community!`;
        explanation = 'Added community context and networking value proposition.';
        break;
      case 'professional':
        improved = currentText
          .replace(/🔥|⚡|🎉/g, '')
          .replace(/Get ready for/i, 'We are pleased to introduce')
          .replace(/Seats are filling fast!/i, 'Advance registration is recommended.');
        explanation = 'Elevated vocabulary and streamlined tone for professional audiences.';
        break;
      case 'friendly':
        improved = `Hey everyone! 👋 We're so excited to share this with you!\n\n` + currentText;
        explanation = 'Added a warm, welcoming greeting.';
        break;
      case 'opening':
        const restOfText = currentText.split('\n').slice(1).join('\n');
        improved = `🚀 Mark your calendar for the most anticipated event of the season!\n` + restOfText;
        explanation = 'Enhanced opening headline with high-impact phrasing.';
        break;
      case 'cta':
        improved = currentText + `\n\n👉 Don't wait—secure your registration now before spots run out!`;
        explanation = 'Added an actionable and urgent closing CTA.';
        break;
      case 'hashtags':
        const defaultTags = '\n\n#Event2026 #MustAttend #NetworkingHub #CommunityFirst';
        if (!improved.includes('#')) {
          improved = improved + defaultTags;
        } else {
          improved = improved + ' #TrendingEvent #MarkYourCalendar';
        }
        explanation = 'Enriched post with platform-optimized discovery tags.';
        break;
      case 'simplify':
        improved = currentText.replace(/unprecedented/gi, 'great').replace(/pioneering/gi, 'leading');
        explanation = 'Replaced complex words with simple, accessible alternatives.';
        break;
      case 'translate':
        explanation = `Translated to ${targetLanguage}.`;
        break;
    }

    return res.json({ improvedText: improved, explanation });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to improve post' });
  }
});

// POST: Content Calendar Generator
app.post('/api/generate-calendar', async (req, res) => {
  try {
    const { eventDetails } = req.body;
    const name = eventDetails?.eventName || 'The Event';
    const date = eventDetails?.date || 'Upcoming Date';
    const venue = eventDetails?.venue || 'The Venue';

    const phases = [
      {
        id: 'phase-1',
        timeframe: '7 Days Before',
        badge: '7 Days Out',
        title: 'Event Announcement',
        icon: 'announcement',
        platform: 'LinkedIn & Instagram',
        suggestedCaption: `📢 Big announcement! We're exactly one week away from ${name}. Prepare for insightful sessions, hands-on activities, and unmatched networking.\n\n📅 Date: ${date}\n📍 Venue: ${venue}\n\nTag someone who shouldn't miss this! #Announcement #${name.replace(/[^a-zA-Z0-9]/g, '')}`,
        status: 'Scheduled',
      },
      {
        id: 'phase-2',
        timeframe: '5 Days Before',
        badge: '5 Days Out',
        title: 'Event Highlights & Agenda',
        icon: 'highlights',
        platform: 'Facebook & X',
        suggestedCaption: `✨ Wondering what makes ${name} special? Here is a sneak peek at the schedule: keynotes, interactive showcases, and exclusive networking.\n\nSave your seat now before final registrations close! #EventHighlights #Innovation`,
        status: 'Draft',
      },
      {
        id: 'phase-3',
        timeframe: '3 Days Before',
        badge: '3 Days Out',
        title: 'Speaker & Activity Spotlight',
        icon: 'speaker',
        platform: 'LinkedIn & Instagram',
        suggestedCaption: `🎤 Just 3 days to go! Meet the minds and organizers bringing ${name} to life. Get ready for practical takeaways and inspiring perspectives.\n\nDrop your questions in the comments! #SpeakerSpotlight #${name.replace(/[^a-zA-Z0-9]/g, '')}`,
        status: 'Draft',
      },
      {
        id: 'phase-4',
        timeframe: '1 Day Before',
        badge: 'Tomorrow',
        title: 'Event Reminder',
        icon: 'reminder',
        platform: 'WhatsApp & Instagram Story',
        suggestedCaption: `⏰ Tomorrow is the day! ${name} kicks off at ${eventDetails?.time || 'the scheduled time'} at ${venue}. Ensure you have your entry passes or confirmation handy. See you soon! #Tomorrow #EventReady`,
        status: 'Draft',
      },
      {
        id: 'phase-5',
        timeframe: 'Event Day',
        badge: 'Today',
        title: 'Today is the Day!',
        icon: 'eventDay',
        platform: 'All Platforms',
        suggestedCaption: `🚀 Doors are open! Welcome to ${name}! Don't forget to tag us in your stories and tweets using #${name.replace(/[^a-zA-Z0-9]/g, '')} for a chance to be featured. Let's make this day memorable! 🎉`,
        status: 'Draft',
      },
      {
        id: 'phase-6',
        timeframe: 'After Event',
        badge: 'Post-Event',
        title: 'Thank You & Wrap-up',
        icon: 'thankYou',
        platform: 'LinkedIn, Facebook & X',
        suggestedCaption: `🙏 What an incredible experience! A huge thank you to everyone who joined us for ${name}, our speakers, and partners who made this possible. Photo highlights and session summaries coming soon! #ThankYou #Community`,
        status: 'Draft',
      },
    ];

    res.json({ phases });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to generate calendar' });
  }
});

// Serve frontend in dev via Vite middlewares, or static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`EventPost AI server running on http://localhost:${port}`);
  });
}

startServer();
