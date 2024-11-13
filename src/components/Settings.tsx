import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Tag, X } from 'lucide-react';

export const Settings: React.FC = () => {
  const { preferences, addSearchTag, removeSearchTag } = useStore();
  const [newTag, setNewTag] = useState('');

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim()) {
      addSearchTag(newTag.trim());
      setNewTag('');
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-purple-900 mb-4">Search Tags</h2>
            <form onSubmit={handleAddTag} className="flex gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Enter a search tag..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary flex items-center gap-2"
                disabled={!newTag.trim()}
              >
                <Tag className="w-4 h-4" />
                Create Search Tag
              </button>
            </form>

            <div className="space-y-3">
              {(!preferences?.searchTags || preferences.searchTags.length === 0) ? (
                <p className="text-gray-500 text-center py-4">No search tags created yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {preferences.searchTags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full group hover:bg-purple-100 transition-colors"
                    >
                      <Tag className="w-4 h-4" />
                      <span>{tag}</span>
                      <button
                        onClick={() => removeSearchTag(tag)}
                        className="p-0.5 hover:bg-purple-200 rounded-full transition-colors"
                        title="Remove tag"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};