import React from 'react';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  ThumbsUp,
  Share2,
  Repeat2,
  BarChart2,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Platform, EventDetails } from '../types';

interface LivePlatformPreviewProps {
  platform: Platform;
  content: string;
  eventDetails: EventDetails;
}

export const LivePlatformPreview: React.FC<LivePlatformPreviewProps> = ({
  platform,
  content,
  eventDetails,
}) => {
  const organizerName = eventDetails.organizer || eventDetails.eventName || 'Event Host';
  const organizerHandle = organizerName.toLowerCase().replace(/[^a-z0-9]/g, '');

  return (
    <div className="flex flex-col h-full">
      {/* Header notice */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 dark:border-neutral-800 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Preview</span>
        </div>
        <span className="text-[11px] text-neutral-400 dark:text-neutral-500 italic">
          Preview only — actual appearance may vary by platform.
        </span>
      </div>

      {/* Platform Mockup Container */}
      <div className="flex-1 flex items-start justify-center overflow-y-auto pr-1">
        {/* INSTAGRAM PREVIEW */}
        {platform === 'instagram' && (
          <div className="w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md overflow-hidden text-neutral-900 dark:text-white text-xs">
            {/* Insta Header */}
            <div className="flex items-center justify-between p-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                  <div className="w-full h-full rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center font-bold text-neutral-800 dark:text-white text-xs">
                    {organizerName.slice(0, 1)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs">{organizerHandle}</span>
                    <ShieldCheck className="w-3 h-3 text-sky-500 fill-sky-500/20" />
                  </div>
                  <span className="text-[10px] text-neutral-400 block -mt-0.5">
                    {eventDetails.venue ? eventDetails.venue.split(',')[0] : 'Event Announcement'}
                  </span>
                </div>
              </div>
              <button className="text-neutral-400 font-bold tracking-widest text-sm">•••</button>
            </div>

            {/* Poster / Event Card Image */}
            <div className="aspect-square bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-800 relative p-6 flex flex-col justify-between text-white overflow-hidden">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold opacity-90">
                <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md">
                  Official Announcement
                </span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black tracking-tight leading-tight drop-shadow-sm">
                  {eventDetails.eventName}
                </h4>
                <div className="flex flex-wrap gap-2 text-[11px] text-indigo-100 font-medium pt-1">
                  {eventDetails.date && (
                    <span className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded">
                      <Calendar className="w-3 h-3" />
                      {eventDetails.date}
                    </span>
                  )}
                  {eventDetails.time && (
                    <span className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3" />
                      {eventDetails.time}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-[10px] text-indigo-200 border-t border-white/20 pt-2 flex items-center justify-between">
                <span>📍 {eventDetails.venue || 'Location TBA'}</span>
                <span>By {organizerName}</span>
              </div>
            </div>

            {/* Insta Action Bar */}
            <div className="p-3 pb-1 flex items-center justify-between">
              <div className="flex items-center gap-4 text-neutral-800 dark:text-neutral-200">
                <Heart className="w-5 h-5 hover:text-rose-500 transition-colors cursor-pointer" />
                <MessageCircle className="w-5 h-5 hover:text-neutral-500 transition-colors cursor-pointer" />
                <Send className="w-5 h-5 hover:text-neutral-500 transition-colors cursor-pointer" />
              </div>
              <Bookmark className="w-5 h-5 text-neutral-800 dark:text-neutral-200 hover:text-neutral-500 cursor-pointer" />
            </div>

            {/* Likes count */}
            <div className="px-3 text-[11px] font-bold text-neutral-900 dark:text-neutral-100">
              1,482 likes
            </div>

            {/* Caption Body */}
            <div className="p-3 pt-1.5 space-y-1">
              <p className="text-xs text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed">
                <span className="font-bold mr-1.5">{organizerHandle}</span>
                {content}
              </p>
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider pt-1">
                2 HOURS AGO
              </div>
            </div>
          </div>
        )}

        {/* FACEBOOK PREVIEW */}
        {platform === 'facebook' && (
          <div className="w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md overflow-hidden text-neutral-900 dark:text-white text-xs">
            {/* Header */}
            <div className="p-4 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {organizerName.slice(0, 1)}
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight text-neutral-900 dark:text-white">
                    {organizerName}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-0.5">
                    <span>Just now</span>
                    <span>·</span>
                    <span>🌐</span>
                  </div>
                </div>
              </div>
              <button className="text-neutral-400 text-sm font-bold">•••</button>
            </div>

            {/* Post text */}
            <div className="px-4 pb-3 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed">
              {content}
            </div>

            {/* Event Media Banner */}
            <div className="bg-neutral-100 dark:bg-neutral-800 border-t border-b border-neutral-200 dark:border-neutral-800 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                    {eventDetails.date ? eventDetails.date.toUpperCase() : 'UPCOMING EVENT'}
                  </span>
                  <h5 className="font-bold text-sm text-neutral-900 dark:text-white mt-0.5">
                    {eventDetails.eventName}
                  </h5>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                    {eventDetails.shortDescription}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex flex-col items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Engagement metrics */}
            <div className="px-4 py-2 flex items-center justify-between text-[11px] text-neutral-500 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">
                  👍
                </span>
                <span>248 others</span>
              </div>
              <div>36 comments · 14 shares</div>
            </div>

            {/* Action Bar */}
            <div className="grid grid-cols-3 p-1.5 text-center text-xs font-semibold text-neutral-600 dark:text-neutral-300">
              <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>Comment</span>
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        )}

        {/* LINKEDIN PREVIEW */}
        {platform === 'linkedin' && (
          <div className="w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md overflow-hidden text-neutral-900 dark:text-white text-xs">
            {/* Header */}
            <div className="p-4 pb-3 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-lg bg-sky-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {organizerName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm text-neutral-900 dark:text-white">
                      {organizerName}
                    </span>
                    <span className="text-[11px] text-neutral-400">· 1st</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 block line-clamp-1">
                    Promoting {eventDetails.eventName} · 12,400+ followers
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 mt-0.5">
                    <span>1h</span>
                    <span>·</span>
                    <span>🌐</span>
                  </div>
                </div>
              </div>
              <button className="text-neutral-400 text-sm font-bold">•••</button>
            </div>

            {/* Post text */}
            <div className="px-4 pb-3 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed">
              {content}
            </div>

            {/* Professional Attached Banner */}
            <div className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 p-4">
              <div className="text-[10px] uppercase tracking-wider font-bold text-sky-700 dark:text-sky-400 mb-1">
                Executive Event Spotlight
              </div>
              <div className="font-bold text-sm text-neutral-900 dark:text-white">
                {eventDetails.eventName}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                {eventDetails.date && <span>📅 {eventDetails.date}</span>}
                {eventDetails.venue && <span>📍 {eventDetails.venue}</span>}
              </div>
            </div>

            {/* LinkedIn Reactions Bar */}
            <div className="grid grid-cols-4 p-1.5 border-t border-neutral-100 dark:border-neutral-800 text-center text-xs font-semibold text-neutral-600 dark:text-neutral-300">
              <button className="flex items-center justify-center gap-1 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Like</span>
              </button>
              <button className="flex items-center justify-center gap-1 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Comment</span>
              </button>
              <button className="flex items-center justify-center gap-1 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
                <Repeat2 className="w-3.5 h-3.5" />
                <span>Repost</span>
              </button>
              <button className="flex items-center justify-center gap-1 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg">
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
          </div>
        )}

        {/* X (TWITTER) PREVIEW */}
        {platform === 'x' && (
          <div className="w-full max-w-md rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black shadow-md overflow-hidden text-neutral-900 dark:text-white text-xs p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {organizerName.slice(0, 1)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm truncate text-neutral-900 dark:text-white">
                    {organizerName}
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                    @{organizerHandle}
                  </span>
                  <span className="text-neutral-400">·</span>
                  <span className="text-neutral-500 text-xs">12m</span>
                </div>

                <div className="mt-2 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 whitespace-pre-wrap leading-relaxed">
                  {content}
                </div>

                {/* X card container */}
                <div className="mt-3 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50 dark:bg-neutral-900/60 p-3">
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
                    <span>{eventDetails.venue || 'Event Location'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                  <div className="font-bold text-xs text-neutral-900 dark:text-white">
                    {eventDetails.eventName}
                  </div>
                </div>

                {/* X Controls */}
                <div className="flex items-center justify-between pt-3 text-neutral-500 dark:text-neutral-400 text-xs max-w-sm">
                  <button className="flex items-center gap-1 hover:text-sky-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>24</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-emerald-500 transition-colors">
                    <Repeat2 className="w-4 h-4" />
                    <span>89</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>412</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-sky-500 transition-colors">
                    <BarChart2 className="w-4 h-4" />
                    <span>12.8K</span>
                  </button>
                  <button className="hover:text-sky-500 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WHATSAPP PREVIEW */}
        {platform === 'whatsapp' && (
          <div className="w-full max-w-sm rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-[#EFEAE2] dark:bg-[#0B141A] shadow-md overflow-hidden text-neutral-900 dark:text-white text-xs">
            {/* WhatsApp App Bar */}
            <div className="bg-[#008069] dark:bg-[#202C33] text-white p-3 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  {organizerName.slice(0, 1)}
                </div>
                <div>
                  <h4 className="font-semibold text-xs leading-none">{organizerName}</h4>
                  <span className="text-[10px] text-emerald-100/80 block mt-0.5">
                    online / official broadcast
                  </span>
                </div>
              </div>
              <button className="text-white text-sm font-bold">⋮</button>
            </div>

            {/* Chat Area */}
            <div className="p-3 space-y-2 min-h-[320px] flex flex-col justify-end bg-radial from-neutral-200/20 dark:from-neutral-900/40 to-transparent">
              <div className="self-center bg-white/80 dark:bg-[#182229]/90 text-neutral-500 text-[10px] px-3 py-1 rounded-md shadow-xs mb-2 uppercase tracking-wider font-semibold">
                TODAY
              </div>

              {/* Message Bubble */}
              <div className="self-start max-w-[88%] bg-white dark:bg-[#202C33] rounded-2xl rounded-tl-xs p-3.5 shadow-sm text-neutral-900 dark:text-neutral-100 space-y-2 border border-black/5">
                <div className="text-xs whitespace-pre-wrap leading-relaxed">
                  {content}
                </div>

                <div className="flex items-center justify-end gap-1 text-[10px] text-neutral-400 dark:text-neutral-500 pt-1">
                  <span>10:42 AM</span>
                  <span className="text-sky-500 font-bold">✓✓</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
