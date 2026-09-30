import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  Search,
  X,
  GraduationCap,
  Wrench,
  BookOpen,
  Briefcase,
  Trophy,
  Palette,
  Rocket,
  Users,
  Cake,
  Heart,
} from 'lucide-react';
import { EVENT_TEMPLATES, EventTemplateItem } from '../data/demoData';
import { EventDetails } from '../types';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (details: EventDetails, style: string) => void;
}

const ICON_MAP: Record<string, any> = {
  GraduationCap,
  Wrench,
  BookOpen,
  Briefcase,
  Trophy,
  Palette,
  Sparkles,
  Rocket,
  Users,
  Cake,
  Heart,
  MapPin,
};

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = ['all', ...Array.from(new Set(EVENT_TEMPLATES.map((t) => t.category)))];

  const filteredTemplates = EVENT_TEMPLATES.filter((t) => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.eventDetails.eventName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Event Templates
              </h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Select any of the 12 pre-configured templates to immediately populate event details and audience settings.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 px-6 border-b border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row gap-3 items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/30">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg capitalize whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => {
            const Icon = ICON_MAP[template.icon] || Sparkles;

            return (
              <div
                key={template.id}
                className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                onClick={() => {
                  onSelectTemplate(template.eventDetails, template.suggestedStyle);
                  onClose();
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      {template.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {template.name}
                  </h3>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {template.description}
                  </p>

                  <div className="mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] text-neutral-600 dark:text-neutral-300 space-y-1">
                    <div className="font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                      "{template.eventDetails.eventName}"
                    </div>
                    <div className="text-neutral-400 truncate">
                      {template.eventDetails.venue}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
