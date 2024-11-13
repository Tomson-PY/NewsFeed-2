import React from 'react';
import { useStore } from '../store/useStore';
import { Bookmark, BookmarkCheck, Tag, Circle, CircleDot } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { feedItems, preferences, toggleBookmark, toggleRead } = useStore();
  
  const getDateInfo = (pubDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const articleDate = new Date(pubDate);
    articleDate.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - articleDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return <span className="text-green-600 font-medium">FRESH</span>;
    } else if (diffDays === 1) {
      return <span className="text-gray-500">1 Day</span>;
    } else {
      return <span className="text-gray-500">{diffDays} Days</span>;
    }
  };

  const filterAndSortItems = () => {
    if (!preferences) return [];

    const filtered = feedItems
      .filter((item) => preferences.selectedCategories?.includes(item.category))
      .map(item => {
        const matchingTags = getMatchingTags(item);
        return {
          ...item,
          matchingTagsCount: matchingTags.length,
          matchingTags
        };
      })
      .filter(item => 
        !preferences.searchTags?.length || item.matchingTagsCount > 0
      );

    return filtered.sort((a, b) => {
      if (b.matchingTagsCount !== a.matchingTagsCount) {
        return b.matchingTagsCount - a.matchingTagsCount;
      }
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });
  };

  const getMatchingTags = (item: any) => {
    if (!preferences?.searchTags || preferences.searchTags.length === 0) {
      return [];
    }
    
    const searchText = `${item.title} ${item.content}`.toLowerCase();
    return preferences.searchTags.filter(tag => searchText.includes(tag.toLowerCase()));
  };

  const filteredAndSortedItems = filterAndSortItems();

  if (!preferences) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      {filteredAndSortedItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <Tag className="w-16 h-16 text-purple-200 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No articles match your selected tags</p>
          <p className="text-gray-400 mt-2">Try adjusting your search tags in Settings</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedItems.map((item) => (
            <article 
              key={item.id} 
              className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
                item.matchingTagsCount > 1 ? 'ring-2 ring-purple-200' : ''
              }`}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-purple-900">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600">
                    {item.title}
                  </a>
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.content}</p>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500">
                      {new Date(item.pubDate).toLocaleDateString()}
                    </span>
                    <span className="text-xs mt-0.5">
                      {getDateInfo(item.pubDate)}
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="px-6 py-4 bg-purple-50 border-t border-purple-100 flex items-center">
                <div className="flex-1 flex gap-2">
                  {item.matchingTags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <div className="tooltip-wrapper">
                    <button
                      onClick={() => toggleRead(item.id)}
                      className="p-2 rounded-full hover:bg-purple-100 transition-colors"
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
                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className="p-2 rounded-full hover:bg-purple-100 transition-colors"
                    >
                      {preferences.bookmarkedItems?.includes(item.id) ? (
                        <BookmarkCheck className="w-5 h-5 text-purple-600 fill-current" />
                      ) : (
                        <Bookmark className="w-5 h-5 text-purple-400 hover:text-purple-600" />
                      )}
                    </button>
                    <div className="tooltip">
                      {preferences.bookmarkedItems?.includes(item.id) ? "Remove from Read Later" : "Save for Later"}
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