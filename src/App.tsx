import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CreatePostForm } from './components/CreatePostForm';
import { PostStudio } from './components/PostStudio';
import { PosterGenerator } from './components/PosterGenerator';
import { ContentCalendar } from './components/ContentCalendar';
import { MyPosts } from './components/MyPosts';
import { TemplatesModal } from './components/TemplatesModal';
import { SettingsModal } from './components/SettingsModal';
import { ToastContainer } from './components/Toast';
import {
  EventDetails,
  CustomizationOptions,
  SavedPost,
  GeneratedVersion,
  HashtagCategories,
  QualityScore,
  Platform,
  WritingStyle,
  Language,
  ToastMessage,
} from './types';
import {
  DEMO_EVENT,
  DEFAULT_CUSTOMIZATION,
  INITIAL_SAVED_POSTS,
} from './data/demoData';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('eventpost_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('eventpost_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('eventpost_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // App Data State
  const [eventDetails, setEventDetails] = useState<EventDetails>(DEMO_EVENT);
  const [customization, setCustomization] = useState<CustomizationOptions>(DEFAULT_CUSTOMIZATION);

  // Studio Active State
  const [studioContent, setStudioContent] = useState<string>(
    INITIAL_SAVED_POSTS[0].content
  );
  const [studioPlatform, setStudioPlatform] = useState<Platform>('instagram');
  const [studioLanguage, setStudioLanguage] = useState<Language>('English');
  const [studioStyle, setStudioStyle] = useState<WritingStyle>('Exciting');
  const [studioScore, setStudioScore] = useState<QualityScore>({
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
  });
  const [studioHashtags, setStudioHashtags] = useState<HashtagCategories>({
    popular: ['#TechFest2026', '#Innovation', '#Technology'],
    eventSpecific: ['#ABCCollegeTech', '#CodingChallenge'],
    location: ['#RajkotEvents', '#GujaratEvents'],
  });

  // Saved Posts Persistence
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('eventpost_saved_posts');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          return INITIAL_SAVED_POSTS;
        }
      }
    }
    return INITIAL_SAVED_POSTS;
  });

  useEffect(() => {
    localStorage.setItem('eventpost_saved_posts', JSON.stringify(savedPosts));
  }, [savedPosts]);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (type: 'success' | 'info' | 'error', title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Modals
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Handlers
  const handleSavePost = (post: SavedPost) => {
    setSavedPosts((prev) => [post, ...prev.filter((p) => p.id !== post.id)]);
  };

  const handleDeletePost = (id: string) => {
    setSavedPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSelectPostForStudio = (post: SavedPost) => {
    setEventDetails(post.eventDetails);
    setStudioContent(post.content);
    setStudioPlatform(post.platform);
    setStudioLanguage(post.language);
    setStudioStyle(post.style);
    setCurrentTab('studio');
  };

  const handleGenerationComplete = (
    details: EventDetails,
    custom: CustomizationOptions,
    versions: GeneratedVersion[],
    selectedVersion: GeneratedVersion,
    hashtags: HashtagCategories,
    score: QualityScore
  ) => {
    setEventDetails(details);
    setCustomization(custom);
    setStudioContent(selectedVersion.text);
    setStudioPlatform(custom.platform);
    setStudioLanguage(custom.language);
    setStudioStyle(custom.style);
    setStudioHashtags(hashtags);
    setStudioScore(score);

    // Also auto-save to library
    const newSaved: SavedPost = {
      id: `post-${Date.now()}`,
      eventName: details.eventName,
      eventDetails: details,
      content: selectedVersion.text,
      platform: custom.platform,
      language: custom.language,
      style: custom.style,
      hashtags: [
        ...hashtags.popular,
        ...hashtags.eventSpecific,
        ...hashtags.location,
      ],
      versions,
      selectedVersionId: selectedVersion.id,
      createdAt: new Date().toISOString(),
    };
    handleSavePost(newSaved);

    showToast('success', 'Generated 3 versions! ✨', 'Loaded into Post Studio');
    setCurrentTab('studio');
  };

  const handleSelectTemplate = (templateDetails: EventDetails, suggestedStyle: string) => {
    setEventDetails(templateDetails);
    setStudioStyle((suggestedStyle as WritingStyle) || 'Exciting');
    showToast('info', 'Template Applied', `Populated "${templateDetails.eventName}"`);
    setCurrentTab('create');
  };

  const handleResetDemoData = () => {
    setEventDetails(DEMO_EVENT);
    setSavedPosts(INITIAL_SAVED_POSTS);
    setStudioContent(INITIAL_SAVED_POSTS[0].content);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          if (tab === 'templates') {
            setIsTemplatesOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex w-full">
        {/* Sidebar for Desktop & Mobile Bottom Bar */}
        <Sidebar
          currentTab={currentTab}
          onNavigate={(tab) => {
            if (tab === 'templates') {
              setIsTemplatesOpen(true);
            } else {
              setCurrentTab(tab);
            }
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Dynamic Main Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {currentTab === 'dashboard' && (
            <Dashboard
              onNavigate={(tab) => {
                if (tab === 'templates') {
                  setIsTemplatesOpen(true);
                } else {
                  setCurrentTab(tab);
                }
              }}
              recentPosts={savedPosts}
              onSelectPost={handleSelectPostForStudio}
              onUseTemplateClick={() => setIsTemplatesOpen(true)}
            />
          )}

          {currentTab === 'create' && (
            <CreatePostForm
              initialEventDetails={eventDetails}
              onGenerationComplete={handleGenerationComplete}
              onOpenTemplates={() => setIsTemplatesOpen(true)}
            />
          )}

          {currentTab === 'studio' && (
            <PostStudio
              eventDetails={eventDetails}
              initialContent={studioContent}
              initialPlatform={studioPlatform}
              initialLanguage={studioLanguage}
              initialStyle={studioStyle}
              initialScore={studioScore}
              initialHashtags={studioHashtags}
              onSavePost={handleSavePost}
              onNavigateToPoster={() => setCurrentTab('poster')}
              showToast={showToast}
            />
          )}

          {currentTab === 'poster' && (
            <PosterGenerator
              eventDetails={eventDetails}
              showToast={showToast}
            />
          )}

          {currentTab === 'calendar' && (
            <ContentCalendar
              eventDetails={eventDetails}
              onEditInStudio={(caption, plat) => {
                setStudioContent(caption);
                setStudioPlatform(plat);
                setCurrentTab('studio');
                showToast('info', 'Loaded into Studio', 'Caption ready for live preview');
              }}
              showToast={showToast}
            />
          )}

          {currentTab === 'myposts' && (
            <MyPosts
              posts={savedPosts}
              onSelectPost={handleSelectPostForStudio}
              onDeletePost={handleDeletePost}
              onCreateNew={() => setCurrentTab('create')}
              showToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <TemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        defaultLanguage={studioLanguage}
        onChangeDefaultLanguage={setStudioLanguage}
        onResetDemoData={handleResetDemoData}
        showToast={showToast}
      />

      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
