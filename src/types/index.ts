export interface Feed {
  id: string;
  title: string;
  url: string;
  category: string;
}

export interface FeedItem {
  id: string;
  title: string;
  link: string;
  content: string;
  pubDate: string;
  category: string;
}

export interface UserPreferences {
  selectedCategories: string[];
  selectedFeeds: string[];
  bookmarkedItems: string[];
  readItems: string[];
  searchTags: string[]; // Added for search tags
}