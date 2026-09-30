import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Save,
  Download,
  RotateCcw,
  RefreshCw,
  Plus,
  X,
  Check,
  Languages,
  ChevronDown,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  MessageCircle,
  FileText,
  Image as ImageIcon,
  CheckCheck,
} from 'lucide-react';
import {
  EventDetails,
  CustomizationOptions,
  Platform,
  WritingStyle,
  ContentLength,
  Language,
  QualityScore,
  HashtagCategories,
  SavedPost,
} from '../types';
import { LivePlatformPreview } from './LivePlatformPreview';
import { PostQualityScore } from './PostQualityScore';
import { improvePostAPI, generatePostsAPI } from '../services/api';

interface PostStudioProps {
  eventDetails: EventDetails;
  initialContent: string;
  initialPlatform: Platform;
  initialLanguage: Language;
  initialStyle: WritingStyle;
  initialScore: QualityScore;
  initialHashtags: HashtagCategories;
  onSavePost: (post: SavedPost) => void;
  onNavigateToPoster: () => void;
  showToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

const PLATFORM_LIST: { id: Platform; label: string; icon: any; maxChars?: number }[] = [
  { id: 'instagram', label: 'Instagram', icon: Instagram, maxChars: 2200 },
  { id: 'facebook', label: 'Facebook', icon: Facebook, maxChars: 5000 },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, maxChars: 3000 },
  { id: 'x', label: 'X (Twitter)', icon: Twitter, maxChars: 280 },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, maxChars: 4000 },
];

const WRITING_STYLES: WritingStyle[] = [
  'Exciting',
  'Friendly',
  'Professional',
  'Fun',
  'Promotional',
  'Formal',
];

const CTA_SUGGESTIONS = [
  'Register Now',
  'Save Your Seat',
  'Join Us',
  "Don't Miss Out",
  'Book Your Spot',
  'Learn More',
];

const IMPROVEMENT_ACTIONS = [
  { id: 'engaging', label: 'Make more engaging', desc: 'Adds high-energy hooks and enthusiasm' },
  { id: 'shorter', label: 'Make shorter', desc: 'Cuts fluff and sharpens core message' },
  { id: 'longer', label: 'Make longer', desc: 'Expands benefits and community context' },
  { id: 'professional', label: 'Make more professional', desc: 'Polished corporate tone' },
  { id: 'friendly', label: 'Make more friendly', desc: 'Warm and approachable greeting' },
  { id: 'opening', label: 'Improve opening hook', desc: 'Crafts an irresistible first sentence' },
  { id: 'cta', label: 'Add stronger call-to-action', desc: 'Clear urgent registration push' },
  { id: 'hashtags', label: 'Generate better hashtags', desc: 'Adds platform-optimized tags' },
  { id: 'simplify', label: 'Simplify language', desc: 'Replaces complex words with clear prose' },
  { id: 'translate', label: 'Translate language', desc: 'Convert seamlessly into Hindi / Gujarati / English' },
];

export const PostStudio: React.FC<PostStudioProps> = ({
  eventDetails,
  initialContent,
  initialPlatform,
  initialLanguage,
  initialStyle,
  initialScore,
  initialHashtags,
  onSavePost,
  onNavigateToPoster,
  showToast,
}) => {
  const [content, setContent] = useState<string>(initialContent);
  const [history, setHistory] = useState<string[]>([initialContent]);
  const [platform, setPlatform] = useState<Platform>(initialPlatform);
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [style, setStyle] = useState<WritingStyle>(initialStyle);
  const [score, setScore] = useState<QualityScore>(initialScore);
  const [hashtags, setHashtags] = useState<HashtagCategories>(initialHashtags);

  // Custom hashtag input
  const [customTagInput, setCustomTagInput] = useState('');
  const [showImproveMenu, setShowImproveMenu] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Stats
  const charCount = content.length;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const currentPlatformMeta = PLATFORM_LIST.find((p) => p.id === platform);
  const isOverCharLimit =
    currentPlatformMeta?.maxChars && charCount > currentPlatformMeta.maxChars;

  // Handle Undo
  const handleUndo = () => {
    if (history.length > 1) {
      const prev = history[history.length - 2];
      setHistory((h) => h.slice(0, -1));
      setContent(prev);
      showToast('info', 'Change reverted', 'Restored previous version');
    }
  };

  // Handle AI Improvement Action
  const handleApplyImprovement = async (actionId: string) => {
    setIsImproving(true);
    setShowImproveMenu(false);
    try {
      const res = await improvePostAPI(
        content,
        actionId,
        language,
        eventDetails,
        platform
      );

      if (res.improvedText) {
        setHistory((prev) => [...prev, res.improvedText]);
        setContent(res.improvedText);
        // Boost quality score slightly
        setScore((prev) => ({
          ...prev,
          overall: Math.min(98, prev.overall + 4),
          engagement: Math.min(98, prev.engagement + 5),
          positivePoints: [
            ...prev.positivePoints,
            res.explanation || 'Refined with AI optimization',
          ].slice(-4),
        }));
        showToast('success', 'Post improved! ✨', res.explanation);
      }
    } catch (err: any) {
      showToast('error', 'Improvement failed', err.message);
    } finally {
      setIsImproving(false);
    }
  };

  // Handle Full Regenerate
  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const res = await generatePostsAPI(eventDetails, {
        platform,
        style,
        length: 'medium',
        language,
        emojiLevel: 'engaging',
        includeHashtags: true,
      });

      if (res.versions && res.versions.length > 0) {
        const newText = res.versions[0].text;
        setHistory((prev) => [...prev, newText]);
        setContent(newText);
        setHashtags(res.hashtags);
        setScore(res.qualityScore);
        showToast('success', 'Regenerated fresh post! 🔄');
      }
    } catch (err: any) {
      showToast('error', 'Regeneration failed', err.message);
    } finally {
      setIsRegenerating(false);
    }
  };

  // Copy Complete Post
  const handleCopyPost = () => {
    navigator.clipboard.writeText(content);
    showToast('success', 'Post copied to clipboard! 📋', 'Ready to paste into your social app.');
  };

  // Copy Caption Only (excluding hashtags)
  const handleCopyCaptionOnly = () => {
    const lines = content.split('\n');
    const withoutTags = lines.filter((l) => !l.trim().startsWith('#')).join('\n').trim();
    navigator.clipboard.writeText(withoutTags);
    showToast('success', 'Caption copied to clipboard! 📋');
  };

  // Copy Hashtags Only
  const handleCopyHashtags = () => {
    const allTags = [
      ...hashtags.popular,
      ...hashtags.eventSpecific,
      ...hashtags.location,
    ].join(' ');
    navigator.clipboard.writeText(allTags);
    showToast('success', 'Hashtags copied! #️⃣', allTags);
  };

  // Save Post
  const handleSave = () => {
    const saved: SavedPost = {
      id: `post-${Date.now()}`,
      eventName: eventDetails.eventName,
      eventDetails,
      content,
      platform,
      language,
      style,
      hashtags: [
        ...hashtags.popular,
        ...hashtags.eventSpecific,
        ...hashtags.location,
      ],
      versions: [],
      selectedVersionId: 'A',
      createdAt: new Date().toISOString(),
      isPoster: false,
    };
    onSavePost(saved);
    showToast('success', 'Post saved successfully! 💾', 'Saved to My Posts library.');
  };

  // Download Post as Text file
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${eventDetails.eventName.replace(/[^a-zA-Z0-9]/g, '_')}_${platform}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Downloaded post file! 📥');
  };

  // Insert CTA
  const handleInsertCTA = (cta: string) => {
    const regUrl = eventDetails.registrationUrl ? ` ${eventDetails.registrationUrl}` : '';
    const newContent = `${content.trim()}\n\n👉 ${cta}!${regUrl}`;
    setHistory((prev) => [...prev, newContent]);
    setContent(newContent);
    showToast('info', 'CTA inserted', `Added: "${cta}"`);
  };

  // Add Custom Hashtag
  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTagInput.trim()) return;
    const cleanTag = customTagInput.startsWith('#')
      ? customTagInput.trim()
      : `#${customTagInput.trim()}`;
    setHashtags((prev) => ({
      ...prev,
      eventSpecific: [...prev.eventSpecific, cleanTag],
    }));
    // Append to content if not present
    if (!content.includes(cleanTag)) {
      setContent((prev) => `${prev.trim()} ${cleanTag}`);
    }
    setCustomTagInput('');
    showToast('info', 'Hashtag added', cleanTag);
  };

  // Remove Hashtag
  const handleRemoveTag = (category: keyof HashtagCategories, tag: string) => {
    setHashtags((prev) => ({
      ...prev,
      [category]: prev[category].filter((t) => t !== tag),
    }));
    setContent((prev) => prev.replace(tag, '').replace(/\s{2,}/g, ' ').trim());
  };

  return (
    <div className="max-w-7xl mx-auto pb-16 space-y-6">
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Post Studio
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              Editing: {eventDetails.eventName}
            </span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Real-time live multi-platform editor with AI enhancement actions.
          </p>
        </div>

        {/* Global studio quick actions */}
        <div className="flex items-center flex-wrap gap-2">
          {history.length > 1 && (
            <button
              onClick={handleUndo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-2xs transition-colors"
              title="Undo last improvement"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Undo</span>
            </button>
          )}

          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-2xs transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleCopyPost}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-2xs transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Post</span>
          </button>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Post</span>
          </button>

          <button
            onClick={onNavigateToPoster}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/40 hover:bg-violet-100 border border-violet-200 dark:border-violet-800/60 rounded-lg transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Open Poster</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: AI Content Editor & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Controls Bar: Platform / Tone / Language / Length */}
          <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs space-y-3">
            {/* Platform Selector Tabs */}
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                Platform Adaption
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PLATFORM_LIST.map((p) => {
                  const Icon = p.icon;
                  const isActive = platform === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPlatform(p.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-controls row: Style, Language */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-medium text-neutral-500">Tone:</span>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value as WritingStyle)}
                  className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1 font-semibold text-xs border-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  {WRITING_STYLES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Languages className="w-3.5 h-3.5 text-neutral-400" />
                <span className="font-medium text-neutral-500">Language:</span>
                <select
                  value={language}
                  onChange={(e) => {
                    const newLang = e.target.value as Language;
                    setLanguage(newLang);
                    // trigger quick translate improvement
                    handleApplyImprovement('translate');
                  }}
                  className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-lg px-2.5 py-1 font-semibold text-xs border-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generated Post Textarea */}
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
                <span>Generated Post</span>
                <span className="text-[10px] text-neutral-400 font-normal normal-case">
                  (Editable live text)
                </span>
              </label>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span
                  className={
                    isOverCharLimit
                      ? 'text-rose-500 font-bold'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }
                >
                  {charCount} chars
                  {currentPlatformMeta?.maxChars && ` / ${currentPlatformMeta.maxChars}`}
                </span>
                <span className="text-neutral-300 dark:text-neutral-700">·</span>
                <span className="text-neutral-500 dark:text-neutral-400">{wordCount} words</span>
              </div>
            </div>

            <textarea
              rows={11}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 rounded-xl border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-800/40 text-neutral-900 dark:text-neutral-100 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-sans"
              placeholder="Your generated promotional post will appear here..."
            />

            {/* Studio Action Toolbar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowImproveMenu(!showImproveMenu)}
                  disabled={isImproving}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-xs transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isImproving ? 'Improving...' : '✨ Improve with AI'}</span>
                  <ChevronDown className="w-3 h-3 ml-0.5" />
                </button>

                {/* AI Improvement Dropdown Menu */}
                {showImproveMenu && (
                  <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Select AI Action
                    </div>
                    <div className="space-y-0.5">
                      {IMPROVEMENT_ACTIONS.map((act) => (
                        <button
                          key={act.id}
                          onClick={() => handleApplyImprovement(act.id)}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-neutral-800 dark:text-neutral-200 transition-colors flex flex-col"
                        >
                          <span className="font-semibold">{act.label}</span>
                          <span className="text-[10px] text-neutral-400">{act.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopyCaptionOnly}
                  className="px-2.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  title="Copy caption without hashtags"
                >
                  Copy Caption
                </button>

                <button
                  onClick={handleCopyHashtags}
                  className="px-2.5 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  title="Copy all hashtags"
                >
                  Copy Hashtags
                </button>

                <button
                  onClick={handleDownload}
                  className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  title="Download .txt"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* AI Post Score */}
          <PostQualityScore
            score={score}
            onImproveScore={() => handleApplyImprovement('engaging')}
            isImproving={isImproving}
          />

          {/* Smart Hashtags Section */}
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  Smart Hashtags
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Platform-tested tags segmented for maximum discovery
                </p>
              </div>

              <button
                onClick={handleCopyHashtags}
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Hashtags</span>
              </button>
            </div>

            <div className="space-y-3">
              {/* Popular Tags */}
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 block mb-1.5">
                  Popular
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {hashtags.popular.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag('popular', tag)}
                        className="hover:text-rose-500 transition-colors ml-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Event Specific Tags */}
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 block mb-1.5">
                  Event-specific
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {hashtags.eventSpecific.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag('eventSpecific', tag)}
                        className="hover:text-rose-500 transition-colors ml-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Location Tags */}
              <div>
                <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 block mb-1.5">
                  Location
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {hashtags.location.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag('location', tag)}
                        className="hover:text-rose-500 transition-colors ml-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Add Custom Tag Form */}
              <form onSubmit={handleAddCustomTag} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={customTagInput}
                  onChange={(e) => setCustomTagInput(e.target.value)}
                  placeholder="Add custom hashtag (e.g. #InnovateNow)"
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800"
                >
                  Add
                </button>
              </form>
            </div>
          </div>

          {/* Call-to-Action Generator */}
          <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs space-y-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                Call-To-Action Generator
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Click a CTA to append it with your registration link directly to the post.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {CTA_SUGGESTIONS.map((cta) => (
                <button
                  key={cta}
                  onClick={() => handleInsertCTA(cta)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 border border-neutral-200 dark:border-neutral-700 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>{cta}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Platform Preview (5 cols) */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs min-h-[580px]">
            <LivePlatformPreview
              platform={platform}
              content={content}
              eventDetails={eventDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
