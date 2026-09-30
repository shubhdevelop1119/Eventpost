import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  PenTool,
  Calendar,
  FolderArchive,
  Layers,
  Image as ImageIcon,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  onOpenSettings,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create', label: 'Create Post', icon: Sparkles, badge: 'New' },
    { id: 'studio', label: 'Post Studio', icon: PenTool },
    { id: 'poster', label: 'Poster Studio', icon: ImageIcon },
    { id: 'calendar', label: 'Content Calendar', icon: Calendar },
    { id: 'myposts', label: 'My Posts', icon: FolderArchive },
    { id: 'templates', label: 'Templates', icon: Layers },
  ];

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile/tablet) */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-4 min-h-[calc(100vh-4rem)]">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-neutral-400 dark:text-neutral-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-100/60 dark:bg-indigo-900/40 px-1.5 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 transition-all"
          >
            <Settings className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (visible only on mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 py-2 px-3 flex items-center justify-around">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
            currentTab === 'dashboard'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => onNavigate('create')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
            currentTab === 'create'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Create</span>
        </button>
        <button
          onClick={() => onNavigate('studio')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
            currentTab === 'studio'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>Studio</span>
        </button>
        <button
          onClick={() => onNavigate('poster')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
            currentTab === 'poster'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Poster</span>
        </button>
        <button
          onClick={() => onNavigate('calendar')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
            currentTab === 'calendar'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Plan</span>
        </button>
        <button
          onClick={() => onNavigate('myposts')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-xs font-medium transition-colors ${
            currentTab === 'myposts'
              ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          <FolderArchive className="w-4 h-4" />
          <span>Posts</span>
        </button>
      </div>
    </>
  );
};
