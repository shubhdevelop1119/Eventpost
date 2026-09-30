import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Building,
  Users,
  Link as LinkIcon,
  Phone,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  MessageCircle,
} from 'lucide-react';
import {
  EventDetails,
  CustomizationOptions,
  Platform,
  WritingStyle,
  ContentLength,
  Language,
  EmojiLevel,
  GeneratedVersion,
  HashtagCategories,
  QualityScore,
} from '../types';
import { DEMO_EVENT } from '../data/demoData';
import { generatePostsAPI } from '../services/api';

interface CreatePostFormProps {
  onGenerationComplete: (
    details: EventDetails,
    custom: CustomizationOptions,
    versions: GeneratedVersion[],
    selectedVersion: GeneratedVersion,
    hashtags: HashtagCategories,
    score: QualityScore
  ) => void;
  onOpenTemplates: () => void;
  initialEventDetails?: EventDetails;
}

const AUDIENCE_OPTIONS = [
  'Students',
  'Professionals',
  'Customers',
  'Parents',
  'General Public',
  'Local Community',
  'Business Audience',
];

const PLATFORMS: { id: Platform; name: string; icon: any; desc: string }[] = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, desc: 'Visual captions & discovery tags' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, desc: 'Community updates & event invites' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, desc: 'Professional insights & networking' },
  { id: 'x', name: 'X (Twitter)', icon: Twitter, desc: 'Punchy threads & viral hooks' },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, desc: 'Direct broadcast messages' },
];

const WRITING_STYLES: { id: WritingStyle; name: string; emoji: string }[] = [
  { id: 'Exciting', name: 'Exciting', emoji: '✨' },
  { id: 'Friendly', name: 'Friendly', emoji: '😊' },
  { id: 'Professional', name: 'Professional', emoji: '💼' },
  { id: 'Fun', name: 'Fun', emoji: '🎉' },
  { id: 'Promotional', name: 'Promotional', emoji: '📢' },
  { id: 'Formal', name: 'Formal', emoji: '📰' },
];

const LOADING_STEPS = [
  'Understanding your event…',
  'Choosing the right tone…',
  'Writing engaging content…',
  'Generating hashtags…',
  'Optimizing for your platform…',
  'Preparing your preview…',
];

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
  onGenerationComplete,
  onOpenTemplates,
  initialEventDetails,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  // Form State
  const [eventDetails, setEventDetails] = useState<EventDetails>(
    initialEventDetails || DEMO_EVENT
  );

  const [customization, setCustomization] = useState<CustomizationOptions>({
    platform: 'instagram',
    style: 'Exciting',
    length: 'medium',
    language: 'English',
    emojiLevel: 'engaging',
    includeHashtags: true,
  });

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [generatedVersions, setGeneratedVersions] = useState<GeneratedVersion[]>([]);
  const [selectedVersionId, setSelectedVersionId] = useState<'A' | 'B' | 'C'>('A');
  const [generatedHashtags, setGeneratedHashtags] = useState<HashtagCategories>({
    popular: [],
    eventSpecific: [],
    location: [],
  });
  const [qualityScore, setQualityScore] = useState<QualityScore | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Update initialEventDetails if passed down (e.g. from template)
  useEffect(() => {
    if (initialEventDetails) {
      setEventDetails(initialEventDetails);
    }
  }, [initialEventDetails]);

  // Loading animation cycling
  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const toggleAudience = (item: string) => {
    setEventDetails((prev) => {
      const exists = prev.targetAudience.includes(item);
      return {
        ...prev,
        targetAudience: exists
          ? prev.targetAudience.filter((a) => a !== item)
          : [...prev.targetAudience, item],
      };
    });
  };

  const handleLoadDemo = () => {
    setEventDetails(DEMO_EVENT);
  };

  const handleGenerate = async () => {
    if (!eventDetails.eventName.trim()) {
      setErrorMessage('Please enter an event name');
      return;
    }

    setCurrentStep(3);
    setIsGenerating(true);
    setErrorMessage(null);
    setLoadingStepIndex(0);

    try {
      const response = await generatePostsAPI(eventDetails, customization);
      setGeneratedVersions(response.versions);
      setSelectedVersionId('A');
      setGeneratedHashtags(response.hashtags);
      setQualityScore(response.qualityScore);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        "We couldn't generate your post right now. Please check your details and try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectAndProceed = () => {
    const selected =
      generatedVersions.find((v) => v.id === selectedVersionId) ||
      generatedVersions[0];
    if (selected && qualityScore) {
      onGenerationComplete(
        eventDetails,
        customization,
        generatedVersions,
        selected,
        generatedHashtags,
        qualityScore
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Stepper Navigation */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-md mx-auto relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-y-1/2 z-0" />

          {/* Step 1 */}
          <button
            onClick={() => setCurrentStep(1)}
            className={`relative z-10 flex flex-col items-center gap-1.5 focus:outline-none ${
              currentStep === 1
                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                : currentStep > 1
                ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                : 'text-neutral-400'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 1
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950'
                  : currentStep > 1
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
              }`}
            >
              1
            </div>
            <span className="text-xs whitespace-nowrap">Event Details</span>
          </button>

          {/* Step 2 */}
          <button
            onClick={() => {
              if (eventDetails.eventName.trim()) setCurrentStep(2);
            }}
            disabled={!eventDetails.eventName.trim()}
            className={`relative z-10 flex flex-col items-center gap-1.5 focus:outline-none ${
              currentStep === 2
                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                : currentStep > 2
                ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                : 'text-neutral-400'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 2
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950'
                  : currentStep > 2
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
              }`}
            >
              2
            </div>
            <span className="text-xs whitespace-nowrap">Customize</span>
          </button>

          {/* Step 3 */}
          <button
            onClick={() => {
              if (generatedVersions.length > 0) setCurrentStep(3);
            }}
            disabled={generatedVersions.length === 0}
            className={`relative z-10 flex flex-col items-center gap-1.5 focus:outline-none ${
              currentStep === 3
                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-neutral-400'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 3
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
              }`}
            >
              3
            </div>
            <span className="text-xs whitespace-nowrap">Generate</span>
          </button>
        </div>
      </div>

      {/* STEP 1: EVENT DETAILS */}
      {currentStep === 1 && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-neutral-100 dark:border-neutral-800">
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Event Information
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Provide core details. The AI will weave them into an authentic, platform-tuned post.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLoadDemo}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800/60 transition-colors"
              >
                Load Demo: Tech Fest 2026
              </button>
              <button
                type="button"
                onClick={onOpenTemplates}
                className="text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg transition-colors"
              >
                Choose Template
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Event Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Event Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={eventDetails.eventName}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, eventName: e.target.value })
                }
                placeholder="e.g. Tech Fest 2026, Global Founders Summit"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/60 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Short Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={eventDetails.shortDescription}
                onChange={(e) =>
                  setEventDetails({ ...eventDetails, shortDescription: e.target.value })
                }
                placeholder="e.g. Join us for an exciting technology festival featuring coding competitions, workshops, innovation challenges and expert sessions."
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/60 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-all leading-relaxed"
              />
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Date</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={eventDetails.date}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, date: e.target.value })
                  }
                  placeholder="e.g. 15 October 2026"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/60 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Time</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={eventDetails.time}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, time: e.target.value })
                  }
                  placeholder="e.g. 10:00 AM – 5:00 PM"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/60 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>

            {/* Venue and Organizer Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Venue</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={eventDetails.venue}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, venue: e.target.value })
                  }
                  placeholder="e.g. ABC College, Rajkot"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/60 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Organizer</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={eventDetails.organizer}
                  onChange={(e) =>
                    setEventDetails({ ...eventDetails, organizer: e.target.value })
                  }
                  placeholder="e.g. ABC College, Student Council"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/60 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>

            {/* Target Audience (Multi-Select) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Target Audience (Select all that apply)</span>
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {AUDIENCE_OPTIONS.map((item) => {
                  const selected = eventDetails.targetAudience.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleAudience(item)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all border ${
                        selected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-neutral-50 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                      }`}
                    >
                      {selected ? '✓ ' : '+ '}
                      {item}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-2">
                The selected audience directly calibrates the phrasing and vocabulary of generated posts.
              </p>
            </div>

            {/* Hidden behind '+ Add More Details' */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowMoreDetails(!showMoreDetails)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
              >
                <span>{showMoreDetails ? 'Hide Additional Details' : '+ Add More Details'}</span>
                {showMoreDetails ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {showMoreDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 p-4 rounded-2xl bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-200/70 dark:border-neutral-800 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      <span className="flex items-center gap-1">
                        <LinkIcon className="w-3 h-3 text-neutral-400" />
                        <span>Registration / Website URL</span>
                      </span>
                    </label>
                    <input
                      type="url"
                      value={eventDetails.registrationUrl || ''}
                      onChange={(e) =>
                        setEventDetails({ ...eventDetails, registrationUrl: e.target.value })
                      }
                      placeholder="https://example.com/register"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-neutral-400" />
                        <span>Contact Information / Email</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      value={eventDetails.contactInfo || ''}
                      onChange={(e) =>
                        setEventDetails({ ...eventDetails, contactInfo: e.target.value })
                      }
                      placeholder="info@abccollege.edu | +91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Step 1 Actions */}
          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (eventDetails.eventName.trim()) {
                  setCurrentStep(2);
                } else {
                  setErrorMessage('Please enter an event name before continuing');
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-600/20 transition-all hover:scale-[1.01]"
            >
              <span>Continue to Customization</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CUSTOMIZATION */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8 animate-in fade-in duration-200">
          <div className="pb-5 border-b border-neutral-100 dark:border-neutral-800">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Customize Generation
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Fine-tune the platform target, writing tone, length, language, and hashtag preferences.
            </p>
          </div>

          {/* Platform Selector Cards */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-3">
              Target Platform
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {PLATFORMS.map((p) => {
                const Icon = p.icon;
                const isSelected = customization.platform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      setCustomization({ ...customization, platform: p.id })
                    }
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/60 border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'bg-white dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-900 dark:text-white">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
                        {p.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Writing Style */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-3">
              Writing Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {WRITING_STYLES.map((style) => {
                const isSelected = customization.style === style.id;
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() =>
                      setCustomization({ ...customization, style: style.id })
                    }
                    className={`px-3 py-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs'
                        : 'bg-neutral-50 dark:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                    }`}
                  >
                    <span className="mr-1">{style.emoji}</span>
                    <span className="text-xs">{style.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Length & Language Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Length */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Length
              </label>
              <div className="flex rounded-xl bg-neutral-100 dark:bg-neutral-800 p-1 border border-neutral-200 dark:border-neutral-700">
                {(['short', 'medium', 'detailed'] as ContentLength[]).map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setCustomization({ ...customization, length: len })}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                      customization.length === len
                        ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            {/* Language (English, Hindi, Gujarati) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Language
              </label>
              <div className="flex rounded-xl bg-neutral-100 dark:bg-neutral-800 p-1 border border-neutral-200 dark:border-neutral-700">
                {(['English', 'Hindi', 'Gujarati'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setCustomization({ ...customization, language: lang })}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      customization.language === lang
                        ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Emoji Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                Emoji Level
              </label>
              <div className="flex rounded-xl bg-neutral-100 dark:bg-neutral-800 p-1 border border-neutral-200 dark:border-neutral-700">
                {(['none', 'minimal', 'engaging'] as EmojiLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setCustomization({ ...customization, emojiLevel: level })}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                      customization.emojiLevel === level
                        ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hashtags toggle */}
          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
              Hashtags Preference
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCustomization({ ...customization, includeHashtags: true })}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  customization.includeHashtags
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-700'
                    : 'bg-neutral-50 dark:bg-neutral-800/40 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'
                }`}
              >
                ✓ Generate automatically
              </button>
              <button
                type="button"
                onClick={() => setCustomization({ ...customization, includeHashtags: false })}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  !customization.includeHashtags
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-700'
                    : 'bg-neutral-50 dark:bg-neutral-800/40 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'
                }`}
              >
                Don't generate
              </button>
            </div>
          </div>

          {/* Step 2 Actions */}
          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 bg-neutral-100 dark:bg-neutral-800 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Details</span>
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-600/25 transition-all hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate 3 Versions</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: GENERATION & VERSION SELECTION */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Animated Loading Screen */}
          {isGenerating ? (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-12 text-center shadow-xs">
              <div className="relative w-16 h-16 mx-auto mb-6">
                <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 animate-ping" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                  <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                ✨ Creating your post...
              </h2>

              <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold h-6">
                {LOADING_STEPS[loadingStepIndex]}
              </p>

              <div className="mt-8 max-w-xs mx-auto space-y-2">
                <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
                    style={{
                      width: `${((loadingStepIndex + 1) / LOADING_STEPS.length) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span>Synthesizing copy</span>
                  <span>
                    Step {loadingStepIndex + 1} of {LOADING_STEPS.length}
                  </span>
                </div>
              </div>
            </div>
          ) : errorMessage ? (
            /* Friendly Error State */
            <div className="bg-white dark:bg-neutral-900 border border-rose-200 dark:border-rose-900/50 rounded-3xl p-10 text-center shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 mx-auto flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Something went wrong
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-md mx-auto">
                {errorMessage}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={handleGenerate}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                >
                  Try Again
                </button>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-xl"
                >
                  Edit Event Details
                </button>
              </div>
            </div>
          ) : (
            /* 3 Post Versions Selection */
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    <FileCheck className="w-4 h-4" />
                    <span>3 AI Versions Generated</span>
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                    Choose your favorite
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Select a version to open in Post Studio for fine-tuning, real-time live preview, and sharing.
                  </p>
                </div>

                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 bg-neutral-100 dark:bg-neutral-800 rounded-lg transition-colors shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate All</span>
                </button>
              </div>

              {/* Version Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {generatedVersions.map((version) => {
                  const isSelected = selectedVersionId === version.id;
                  return (
                    <div
                      key={version.id}
                      onClick={() => setSelectedVersionId(version.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-indigo-50/60 dark:bg-indigo-950/40 border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                          : 'bg-neutral-50/50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200'
                            }`}
                          >
                            {version.name}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          )}
                        </div>

                        <p className="text-xs text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed font-normal line-clamp-10">
                          {version.text}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between text-[11px]">
                        <span className="text-neutral-500 dark:text-neutral-400">
                          {version.styleLabel}
                        </span>
                        <span
                          className={`font-semibold ${
                            isSelected
                              ? 'text-indigo-600 dark:text-indigo-400'
                              : 'text-neutral-500'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Click to select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Proceed to Post Studio Button */}
              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 bg-neutral-100 dark:bg-neutral-800 rounded-xl"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Customize Settings</span>
                </button>

                <button
                  type="button"
                  onClick={handleSelectAndProceed}
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.01]"
                >
                  <span>Open Selected Post in Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
