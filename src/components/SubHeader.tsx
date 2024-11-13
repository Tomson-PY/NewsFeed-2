import React from 'react';
import { Newspaper, Bot, BookOpen, Tag } from 'lucide-react';

interface SubHeaderProps {
  activeView: 'dashboard' | 'feeds' | 'bookmarks' | 'settings';
}

export const SubHeader: React.FC<SubHeaderProps> = ({ activeView }) => {
  const getContent = () => {
    switch (activeView) {
      case 'dashboard':
        return {
          icon: <Newspaper className="w-6 h-6" />,
          title: 'Latest Updates',
          subtitle: 'Stay informed with your personalized news feed'
        };
      case 'feeds':
        return {
          icon: <Bot className="w-6 h-6" />,
          title: 'Manage AI News Feeds',
          subtitle: 'Customize your AI news sources'
        };
      case 'bookmarks':
        return {
          icon: <BookOpen className="w-6 h-6" />,
          title: 'Read Later',
          subtitle: 'Your saved articles for future reading'
        };
      case 'settings':
        return {
          icon: <Tag className="w-6 h-6" />,
          title: 'Search Tags',
          subtitle: 'Manage your content filters'
        };
      default:
        return {
          icon: <Newspaper className="w-6 h-6" />,
          title: 'News Feed',
          subtitle: 'Latest updates'
        };
    }
  };

  const content = getContent();

  return (
    <div className="fixed top-16 left-20 right-0 z-10 bg-white border-b border-gray-200 h-16">
      <div className="h-full flex items-center px-8">
        <div className="text-purple-600">
          {content.icon}
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-purple-900">{content.title}</h2>
          <p className="text-sm text-purple-600">{content.subtitle}</p>
        </div>
      </div>
    </div>
  );
};