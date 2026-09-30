import React from 'react';
import { Moon, Sun, X, RefreshCw, Sparkles, Check, Globe } from 'lucide-react';
import { Language, Platform } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  defaultLanguage: Language;
  onChangeDefaultLanguage: (lang: Language) => void;
  onResetDemoData: () => void;
  showToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  onToggleDarkMode,
  defaultLanguage,
  onChangeDefaultLanguage,
  onResetDemoData,
  showToast,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
              Application Settings
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Customize appearance, localization defaults, and demo state.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Setting 1: Dark Mode Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-200 shadow-2xs">
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Theme Mode</h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {darkMode ? 'Dark mode enabled' : 'Light mode enabled'}
              </p>
            </div>
          </div>

          <button
            onClick={onToggleDarkMode}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white hover:bg-neutral-100 transition-colors"
          >
            Toggle to {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>

        {/* Setting 2: Default Language */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-200 shadow-2xs">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                Default Language
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Primary copy generation language
              </p>
            </div>
          </div>

          <select
            value={defaultLanguage}
            onChange={(e) => {
              onChangeDefaultLanguage(e.target.value as Language);
              showToast('success', 'Default language updated');
            }}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white focus:outline-none"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi (हिंदी)</option>
            <option value="Gujarati">Gujarati (ગુજરાતી)</option>
          </select>
        </div>

        {/* Setting 3: Reset Demo Data */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/80 dark:border-neutral-700/80">
          <div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
              Restore Demo Data
            </h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Reload initial Tech Fest 2026 and sample posts
            </p>
          </div>

          <button
            onClick={() => {
              onResetDemoData();
              showToast('info', 'Demo data restored', 'Loaded initial sample events');
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 text-neutral-800 dark:text-neutral-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restore</span>
          </button>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
