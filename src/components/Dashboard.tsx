import React from 'react';
import {
  Sparkles,
  PenTool,
  Calendar,
  Layers,
  FileText,
  Eye,
  Image as ImageIcon,
  ArrowRight,
  Plus,
  ExternalLink,
  Clock,
  MapPin,
  CheckCircle,
} from 'lucide-react';
import { SavedPost, Platform } from '../types';

interface DashboardProps {
  onNavigate: (tab: string, state?: any) => void;
  recentPosts: SavedPost[];
  onSelectPost: (post: SavedPost) => void;
  onUseTemplateClick: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  recentPosts,
  onSelectPost,
  onUseTemplateClick,
}) => {
  const getPlatformLabel = (platform: Platform) => {
    switch (platform) {
      case 'instagram':
        return 'Instagram';
      case 'facebook':
        return 'Facebook';
      case 'linkedin':
        return 'LinkedIn';
      case 'x':
        return 'X (Twitter)';
      case 'whatsapp':
        return 'WhatsApp';
      default:
        return platform;
    }
  };

  const getPlatformBadgeColor = (platform: Platform) => {
    switch (platform) {
      case 'instagram':
        return 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800/50';
      case 'facebook':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/50';
      case 'linkedin':
        return 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/50';
      case 'x':
        return 'text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700';
      case 'whatsapp':
        return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50';
      default:
        return 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/50';
    }
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-neutral-900 dark:via-indigo-950/20 dark:to-neutral-900 p-8 sm:p-12 shadow-xs">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-100/70 dark:bg-indigo-900/40 mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Event Marketing Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
            Create posts that get noticed. ✨
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            Turn your event details into engaging, platform-ready content in seconds.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('create')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm shadow-indigo-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create New Post</span>
            </button>

            <button
              onClick={() => onNavigate('studio')}
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700/80 border border-neutral-300/80 dark:border-neutral-700 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 cursor-pointer"
            >
              <PenTool className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              <span>Open Post Studio</span>
            </button>

            <button
              onClick={onUseTemplateClick}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Layers className="w-4 h-4" />
              <span>Browse 12 Templates</span>
            </button>
          </div>
        </div>

        {/* Decorative subtle backdrop mesh */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none hidden md:block" />
      </section>

      {/* Four Feature Cards */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
            Core Capabilities
          </h2>
          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
            Everything for your event launch
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Create Post */}
          <div
            onClick={() => onNavigate('create')}
            className="group relative p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-indigo-300 dark:hover:border-indigo-700/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <span>📝 Create Post</span>
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Generate social-media content from event information.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
              <span>Start Generator</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 2: Live Preview */}
          <div
            onClick={() => onNavigate('studio')}
            className="group relative p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-indigo-300 dark:hover:border-indigo-700/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <span>👀 Live Preview</span>
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                See how your content will appear on different platforms.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
              <span>Preview Live Mockup</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 3: Create Poster */}
          <div
            onClick={() => onNavigate('poster')}
            className="group relative p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-indigo-300 dark:hover:border-indigo-700/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <span>🎨 Create Poster</span>
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Turn event information into a promotional poster.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center text-xs font-semibold text-violet-600 dark:text-violet-400 group-hover:translate-x-0.5 transition-transform">
              <span>Open Poster Designer</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 4: Content Plan */}
          <div
            onClick={() => onNavigate('calendar')}
            className="group relative p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-indigo-300 dark:hover:border-indigo-700/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <span>📅 Content Plan</span>
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Generate a complete promotional schedule for your event.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform">
              <span>View Campaign Plan</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
              Recent Posts
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Pick up where you left off or adapt for a new platform
            </p>
          </div>
          <button
            onClick={() => onNavigate('myposts')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All Posts ({recentPosts.length})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentPosts.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-400 mx-auto flex items-center justify-center mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              No Posts Yet
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto">
              Your saved posts will appear here. Create your first event post and start building your content library.
            </p>
            <button
              onClick={() => onNavigate('create')}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Post</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentPosts.slice(0, 4).map((post) => (
              <div
                key={post.id}
                className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs transition-all flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${getPlatformBadgeColor(
                        post.platform
                      )}`}
                    >
                      {getPlatformLabel(post.platform)}
                    </span>
                    <span className="text-[11px] text-neutral-400 dark:text-neutral-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight truncate">
                    {post.eventName}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-1.5">
                    {post.eventDetails.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-neutral-400" />
                        {post.eventDetails.date}
                      </span>
                    )}
                    {post.eventDetails.venue && (
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span className="truncate">{post.eventDetails.venue}</span>
                      </span>
                    )}
                  </div>

                  {/* Small preview of content */}
                  <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed bg-neutral-50 dark:bg-neutral-800/50 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800/80">
                    {post.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Saved in library</span>
                  </div>

                  <button
                    onClick={() => onSelectPost(post)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-white hover:bg-indigo-600 dark:hover:bg-indigo-600 border border-indigo-200 dark:border-indigo-800/70 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>View / Edit</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
