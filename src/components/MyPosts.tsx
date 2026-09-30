import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Copy,
  PenTool,
  Download,
  Trash2,
  FolderArchive,
  Calendar,
  Clock,
  Plus,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { SavedPost, Platform } from '../types';

interface MyPostsProps {
  posts: SavedPost[];
  onSelectPost: (post: SavedPost) => void;
  onDeletePost: (id: string) => void;
  onCreateNew: () => void;
  showToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

type FilterType = 'all' | Platform | 'posters';
type SortType = 'newest' | 'oldest' | 'name';

export const MyPosts: React.FC<MyPostsProps> = ({
  posts,
  onSelectPost,
  onDeletePost,
  onCreateNew,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('newest');

  const filteredPosts = posts
    .filter((post) => {
      // Platform filter
      if (filter === 'posters') {
        if (!post.isPoster) return false;
      } else if (filter !== 'all') {
        if (post.platform !== filter) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = post.eventName.toLowerCase().includes(q);
        const inContent = post.content.toLowerCase().includes(q);
        const inTags = post.hashtags.some((t) => t.toLowerCase().includes(q));
        if (!inName && !inContent && !inTags) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sort === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sort === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return a.eventName.localeCompare(b.eventName);
    });

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    showToast('success', 'Post copied to clipboard! 📋');
  };

  const handleDownload = (post: SavedPost) => {
    const blob = new Blob([post.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${post.eventName.replace(/[^a-zA-Z0-9]/g, '_')}_${post.platform}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Downloaded post file! 📥');
  };

  const handleDelete = (id: string, name: string) => {
    onDeletePost(id);
    showToast('info', 'Post deleted 🗑️', `Removed "${name}" from library.`);
  };

  return (
    <div className="max-w-6xl mx-auto pb-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>📂 My Posts</span>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {posts.length} Total
            </span>
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Archive of your generated posts, campaign variations, and exportable copies.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Create New Post</span>
        </button>
      </div>

      {/* Controls Bar: Search, Filters, Sorting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event, keyword, or hashtag..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Filter Pills */}
          <div className="flex rounded-xl bg-neutral-100 dark:bg-neutral-800/80 p-1 border border-neutral-200 dark:border-neutral-700/80">
            {(['all', 'instagram', 'facebook', 'linkedin', 'x', 'whatsapp'] as FilterType[]).map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                    filter === f
                      ? 'bg-white dark:bg-neutral-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-2xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {f === 'all' ? 'All' : f}
                </button>
              )
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 rounded-xl">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortType)}
              className="bg-transparent text-neutral-800 dark:text-neutral-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Event Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Post List / Empty State */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-4">
            <FolderArchive className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            No Posts Found
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto">
            {posts.length === 0
              ? 'Your saved posts will appear here. Create your first event post and start building your content library.'
              : 'No posts match your current search query and filters.'}
          </p>
          <button
            onClick={onCreateNew}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Post</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                    {post.platform}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono flex items-center gap-1">
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

                <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  <span>Language: {post.language}</span>
                  <span>·</span>
                  <span>Style: {post.style}</span>
                </div>

                <p className="mt-3 text-xs text-neutral-700 dark:text-neutral-300 line-clamp-4 leading-relaxed bg-neutral-50 dark:bg-neutral-800/40 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 font-sans">
                  {post.content}
                </p>

                {/* Hashtag pills */}
                {post.hashtags.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1 text-[11px] text-indigo-600 dark:text-indigo-400">
                    {post.hashtags.slice(0, 3).map((tag) => (
                      <span key={tag} className="font-mono">
                        {tag}
                      </span>
                    ))}
                    {post.hashtags.length > 3 && (
                      <span className="text-neutral-400">+{post.hashtags.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => onSelectPost(post)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
                >
                  <PenTool className="w-3 h-3" />
                  <span>Edit in Studio</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(post.content)}
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                    title="Copy post"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDownload(post)}
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                    title="Download .txt"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(post.id, post.eventName)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                    title="Delete post"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
