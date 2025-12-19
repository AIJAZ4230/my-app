
export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

export interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string; // Changed from enum to string to support dynamic categories
  author: string;
  publishedAt: string;
  imageUrl: string;
  isBreaking?: boolean;
  aiSummary?: string;
}

export interface AppState {
  posts: NewsPost[];
  categories: CategoryItem[];
  isAdmin: boolean;
}
