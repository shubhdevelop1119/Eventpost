import React from 'react';
import { Sparkles, Check, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { QualityScore } from '../types';

interface PostQualityScoreProps {
  score: QualityScore;
  onImproveScore: () => void;
  isImproving?: boolean;
}

export const PostQualityScore: React.FC<PostQualityScoreProps> = ({
  score,
  onImproveScore,
  isImproving = false,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const getScoreColor = (value: number) => {
    if (value >= 85) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-500';
    if (value >= 70) return 'text-indigo-600 dark:text-indigo-400 bg-indigo-500';
    return 'text-amber-600 dark:text-amber-400 bg-amber-500';
  };

  const metrics = [
    { label: 'Information completeness', value: score.completeness },
    { label: 'Engagement', value: score.engagement },
    { label: 'Clarity', value: score.clarity },
    { label: 'Call-to-action', value: score.callToAction },
    { label: 'Hashtag relevance', value: score.hashtagRelevance },
    { label: 'Platform suitability', value: score.platformSuitability },
  ];

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/60 p-4 transition-all">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex flex-col items-center justify-center shadow-xs">
            <span className="text-base font-extrabold text-neutral-900 dark:text-white leading-none font-mono">
              {score.overall}
            </span>
            <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider block mt-0.5">
              / 100
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                Post Quality
              </h4>
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                (AI-generated content quality estimate)
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Optimized for platform distribution & viral engagement
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onImproveScore}
            disabled={isImproving}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg shadow-xs transition-all hover:scale-[1.01]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isImproving ? 'Improving...' : 'Improve Score'}</span>
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle details"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Progress Bars & Breakdown */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-800 space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {metrics.map((m) => (
              <div key={m.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-600 dark:text-neutral-400">{m.label}</span>
                  <span className="font-mono font-semibold text-neutral-900 dark:text-white text-[11px]">
                    {m.value}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      m.value >= 85
                        ? 'bg-emerald-500'
                        : m.value >= 70
                        ? 'bg-indigo-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Feedback Points */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              {score.positivePoints.map((pt, i) => (
                <div key={i} className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1">
              {score.improvementSuggestions.map((sug, i) => (
                <div key={i} className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{sug}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
