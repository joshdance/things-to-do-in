export type Category =
  | "food-drink"
  | "attractions"
  | "outdoor"
  | "arts-culture"
  | "entertainment"
  | "shopping"
  | "sports";

export type City = "oklahoma-city" | "salt-lake-city" | "seattle" | "london" | "wales";

export type Tag =
  | "kid-friendly"
  | "stroller-friendly"
  | "wheelchair-accessible"
  | "dog-friendly"
  | "free"
  | "budget"
  | "rainy-day"
  | "quick-stop"
  | "half-day"
  | "full-day";

export interface ArticleSource {
  source: string; // e.g., "fullsuitcase"
  articleTitle?: string;
  articleUrl?: string;
}

export interface Article {
  title: string;
  url: string;
  source: string;
  description?: string;
}

export interface Video {
  url: string; // Full URL to the video (YouTube, TikTok, Instagram, Facebook)
  platform: "youtube" | "tiktok" | "instagram" | "facebook"; // Platform identifier
  title?: string; // Optional title for the video
  orientation?: "portrait" | "landscape"; // Video orientation (defaults to landscape)
}

export interface UnsplashPhoto {
  url: string;
  photographerName: string;
  photographerUsername: string;
  photographerUrl: string;
}

export interface Activity {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  address: string;
  city: City;
  website?: string;
  imageUrl?: string; // Deprecated: use unsplashPhoto instead
  unsplashPhoto?: UnsplashPhoto; // Proper Unsplash attribution
  priceRange?: "$" | "$$" | "$$$" | "$$$$";
  tags?: Tag[]; // Filterable properties like kid-friendly, wheelchair-accessible, etc.
  recommendedBy?: ArticleSource[]; // Articles that recommend this activity
  articles?: Article[]; // Featured articles about this activity
  videos?: Video[]; // Videos showcasing the activity
}
