
import React from 'react';
import { NewsPost, CategoryItem } from '../types';
import { NewsCard } from '../components/NewsCard';
import { Zap } from 'lucide-react';

interface HomeProps {
  posts: NewsPost[];
  categories: CategoryItem[];
}

export const Home: React.FC<HomeProps> = ({ posts, categories }) => {
  const breakingNews = posts.filter(p => p.isBreaking);
  const latestNews = [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {breakingNews.length > 0 && (
        <div className="mb-10 bg-red-600 text-white p-5 rounded-2xl shadow-xl flex items-center space-x-4">
          <div className="bg-white/20 p-2.5 rounded-xl animate-pulse">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center space-x-8 whitespace-nowrap">
              <span className="font-black uppercase tracking-widest text-xs bg-black/20 px-2 py-1 rounded">Breaking</span>
              <p className="font-bold text-sm sm:text-lg truncate">{breakingNews[0].title}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center transition-theme">
            <span className="w-1.5 h-8 bg-red-600 rounded-full mr-4"></span>
            Top Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestNews.slice(0, 4).map(post => (
              <NewsCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center transition-theme">
            <span className="w-1.5 h-8 bg-blue-600 rounded-full mr-4"></span>
            Quick Updates
          </h2>
          <div className="bg-white dark:bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-6 transition-theme shadow-sm">
            {latestNews.slice(4, 9).map(post => (
              <NewsCard key={post.id} post={post} variant="horizontal" />
            ))}
          </div>
        </div>
      </div>

      {categories.map(cat => {
        const catPosts = posts.filter(p => p.category === cat.name);
        if (catPosts.length === 0) return null;
        
        return (
          <section key={cat.id} className="mb-16">
            <div className="flex justify-between items-center mb-8 border-b dark:border-slate-800 pb-4 transition-theme">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{cat.name} News</h2>
              <button className="text-red-600 dark:text-red-500 font-black text-xs uppercase tracking-widest hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {catPosts.slice(0, 3).map(post => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};
