import React from 'react';
import { Home, Rss, Bookmark, Tag, Settings } from 'lucide-react';

interface SidebarProps {
  activeView: 'dashboard' | 'feeds' | 'bookmarks' | 'settings';
  onViewChange: (view: 'dashboard' | 'feeds' | 'bookmarks' | 'settings') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-20 bg-gradient-to-b from-purple-900 to-purple-800 text-white flex flex-col items-center py-6">
      <nav className="flex flex-col space-y-6">
        <button 
          onClick={() => onViewChange('dashboard')}
          className={`p-3 rounded-xl transition-colors ${
            activeView === 'dashboard' ? 'bg-purple-700 shadow-lg' : 'hover:bg-purple-700/50'
          }`}
        >
          <Home className="w-6 h-6" />
        </button>
        <button 
          onClick={() => onViewChange('feeds')}
          className={`p-3 rounded-xl transition-colors ${
            activeView === 'feeds' ? 'bg-purple-700 shadow-lg' : 'hover:bg-purple-700/50'
          }`}
        >
          <Rss className="w-6 h-6" />
        </button>
        <button 
          onClick={() => onViewChange('bookmarks')}
          className={`p-3 rounded-xl transition-colors ${
            activeView === 'bookmarks' ? 'bg-purple-700 shadow-lg' : 'hover:bg-purple-700/50'
          }`}
        >
          <Bookmark className="w-6 h-6" />
        </button>
        <button 
          onClick={() => onViewChange('settings')}
          className={`p-3 rounded-xl transition-colors ${
            activeView === 'settings' ? 'bg-purple-700 shadow-lg' : 'hover:bg-purple-700/50'
          }`}
        >
          <Tag className="w-6 h-6" />
        </button>
      </nav>

      <div className="mt-auto">
        <button 
          onClick={() => onViewChange('settings')}
          className="p-3 hover:bg-purple-700/50 rounded-xl transition-colors"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </aside>
  );
};