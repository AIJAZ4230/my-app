
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ChevronRight } from 'lucide-react';
import { NewsPost } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface NewsCardProps {
  post: NewsPost;
  variant?: 'horizontal' | 'vertical';
}

export const NewsCard: React.FC<NewsCardProps> = ({ post, variant = 'vertical' }) => {
  if (variant === 'horizontal') {
    return (
      <Link to={`/post/${post.id}`} className="flex gap-4 group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-xl transition-theme">
        <div className="w-1/3 aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="flex-1">
          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{post.category}</span>
          <h3 className="font-bold text-slate-900 dark:text-white mt-1 line-clamp-2 leading-snug transition-theme">{post.title}</h3>
          <div className="flex items-center mt-2 text-[10px] text-slate-400 dark:text-slate-500 font-medium transition-theme">
            <Clock className="w-3 h-3 mr-1" />
            <span>{formatDistanceToNow(new Date(post.publishedAt))} ago</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none dark:hover:ring-2 dark:hover:ring-slate-700 transition-all duration-300 border border-slate-100 dark:border-slate-700 group flex flex-col h-full transition-theme">
      <Link to={`/post/${post.id}`} className="block relative overflow-hidden aspect-[16/9]">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
            {post.category}
          </span>
        </div>
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center space-x-4 mb-3 text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-wider transition-theme">
          <div className="flex items-center"><User className="w-3 h-3 mr-1 text-red-600" /> {post.author}</div>
          <div className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {formatDistanceToNow(new Date(post.publishedAt))} ago</div>
        </div>
        <Link to={`/post/${post.id}`} className="block group-hover:text-red-600 transition-colors">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-3 leading-tight transition-theme">{post.title}</h2>
        </Link>
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed transition-theme">{post.excerpt}</p>
        <Link 
          to={`/post/${post.id}`}
          className="inline-flex items-center text-red-600 dark:text-red-500 font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-transform"
        >
          Read Full Story <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};
