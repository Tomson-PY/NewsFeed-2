import React from 'react';
import { Bot } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 header-gradient text-white h-16">
      <div className="h-full flex items-center px-8">
        <Bot className="w-8 h-8" />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">OTTOMATOR Custom AI News Feed</h1>
        </div>
      </div>
    </header>
  );
};