import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Sparkles,
  Copy,
  PenTool,
  Save,
  CheckCircle,
  Clock,
  ArrowRight,
  Layers,
  Share2,
} from 'lucide-react';
import { EventDetails, CalendarPhase } from '../types';
import { generateCalendarAPI } from '../services/api';

interface ContentCalendarProps {
  eventDetails: EventDetails;
  onEditInStudio: (caption: string, platform: any) => void;
  showToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export const ContentCalendar: React.FC<ContentCalendarProps> = ({
  eventDetails,
  onEditInStudio,
  showToast,
}) => {
  const [phases, setPhases] = useState<CalendarPhase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadCalendar();
  }, [eventDetails.eventName]);

  const loadCalendar = async () => {
    setIsLoading(true);
    try {
      const data = await generateCalendarAPI(eventDetails);
      setPhases(data.phases);
    } catch (err) {
      console.error(err);
      showToast('error', 'Could not load calendar plan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, caption: string) => {
    navigator.clipboard.writeText(caption);
    setCopiedId(id);
    showToast('success', 'Caption copied to clipboard! 📋');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleStatusToggle = (id: string) => {
    setPhases((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status:
                p.status === 'Draft'
                  ? 'Scheduled'
                  : p.status === 'Scheduled'
                  ? 'Published'
                  : 'Draft',
            }
          : p
      )
    );
    showToast('info', 'Status updated');
  };

  return (
    <div className="max-w-5xl mx-auto pb-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Campaign Timeline Strategy</span>
          </div>
          <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            📅 Event Content Calendar
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Suggested promotional timeline from 7 days out through post-event gratitude.
          </p>
        </div>

        <button
          onClick={loadCalendar}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-800 hover:bg-neutral-100 border border-neutral-300 dark:border-neutral-700 rounded-xl transition-colors shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{isLoading ? 'Generating Plan...' : 'Regenerate Plan'}</span>
        </button>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {phases.map((phase, idx) => {
          const isCopied = copiedId === phase.id;

          return (
            <div
              key={phase.id}
              className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col md:flex-row md:items-start gap-6"
            >
              {/* Left Column: Timeline Indicator */}
              <div className="md:w-48 shrink-0 space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800/60 inline-block">
                  {phase.timeframe}
                </span>

                <h3 className="text-sm font-bold text-neutral-900 dark:text-white mt-1">
                  {phase.title}
                </h3>

                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Target: <span className="font-semibold">{phase.platform}</span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleStatusToggle(phase.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors cursor-pointer border ${
                      phase.status === 'Published'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60'
                        : phase.status === 'Scheduled'
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'
                    }`}
                  >
                    ● {phase.status}
                  </button>
                </div>
              </div>

              {/* Right Column: Suggested Post Caption & Actions */}
              <div className="flex-1 space-y-3">
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed font-sans">
                  {phase.suggestedCaption}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <span className="text-[11px] text-neutral-400 font-mono">
                    Phase {idx + 1} of {phases.length}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(phase.id, phase.suggestedCaption)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        onEditInStudio(
                          phase.suggestedCaption,
                          phase.platform.toLowerCase().includes('instagram')
                            ? 'instagram'
                            : phase.platform.toLowerCase().includes('linkedin')
                            ? 'linkedin'
                            : 'facebook'
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>Edit in Studio</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
