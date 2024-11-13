import React from 'react';
import { useStore } from '../store/useStore';
import { BookmarkCheck, ExternalLink, Circle, CircleDot } from 'lucide-react';

export const BookmarkView: React.FC = () => {
  const { feedItems, preferences, toggleBookmark, toggleRead } = useStore();
  
  if (!preferences) {
    return <div>Loading...</div>;
  }

  const bookmarkedItems = feedItems.filter((item) => 
    preferences.bookmarkedItems?.includes(item.id)
  );

  return (
    <div className="p-8">
      {bookmarkedItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <BookmarkCheck className="w-16 h-16 text-purple-200 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No bookmarked articles yet</p>
          <p className="text-gray-400 mt-2">Save interesting articles to read them later</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookmarkedItems.map((item) => (
            <article key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-3 text-purple-900">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600">
                        {item.title}
                      </a>
                    </h2>
                    <p className="text-gray-600 mb-4">{item.content}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-500">{new Date(item.pubDate).toLocaleDateString()}</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="tooltip-wrapper">
                      <button
                        onClick={() => toggleRead(item.id)}
                        className="p-2 rounded-full hover:bg-purple-50"
                      >
                        {preferences.readItems?.includes(item.id) ? (
                          <Circle className="w-5 h-5 text-purple-600 fill-current" />
                        ) : (
                          <CircleDot className="w-5 h-5 text-purple-400 hover:text-purple-600" />
                        )}
                      </button>
                      <div className="tooltip">
                        {preferences.readItems?.includes(item.id) ? "Mark as unread" : "Mark as read"}
                      </div>
                    </div>
                    <div className="tooltip-wrapper">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-purple-400 hover:text-purple-600 rounded-full hover:bg-purple-50"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                      <div className="tooltip">
                        Open article in new tab
                      </div>
                    </div>
                    <div className="tooltip-wrapper">
                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className="p-2 rounded-full hover:bg-purple-50"
                      >
                        <BookmarkCheck className="w-5 h-5 text-purple-600 fill-current" />
                      </button>
                      <div className="tooltip">
                        Remove from Read Later
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};