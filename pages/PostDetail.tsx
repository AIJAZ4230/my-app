
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { NewsPost } from '../types';
import { Calendar, User, ArrowLeft, Share2, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface PostDetailProps {
  posts: NewsPost[];
}

export const PostDetail: React.FC<PostDetailProps> = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-theme">Post not found</h2>
        <Link to="/" className="text-red-600 mt-4 font-black flex items-center uppercase tracking-widest text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 transition-theme">
      <Link to="/" className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-red-600 mb-8 font-bold transition-theme text-xs uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portal
      </Link>

      <header className="mb-10">
        <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block transition-theme">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-8 tracking-tight transition-theme">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 py-6 border-y border-slate-100 dark:border-slate-800 transition-theme">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-black text-slate-600 dark:text-slate-300 transition-theme">
              {post.author[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white transition-theme">{post.author}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase transition-theme">Staff Correspondent</p>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 hidden sm:block"></div>
          <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest transition-theme">
            <Calendar className="w-4 h-4 mr-2 text-red-600" />
            {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <button className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-500 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl dark:shadow-none border dark:border-slate-800">
        <img src={post.imageUrl} alt={post.title} className="w-full object-cover max-h-[600px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-12 prose dark:prose-invert prose-slate prose-lg max-w-none">
          {post.aiSummary && (
            <div className="bg-indigo-50/50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-8 rounded-r-3xl mb-12 flex items-start gap-5 transition-theme">
              <Sparkles className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-indigo-900 dark:text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-3">AI Intelligence Summary</h4>
                <p className="text-indigo-800 dark:text-indigo-200 italic font-semibold leading-relaxed text-lg">
                  "{post.aiSummary}"
                </p>
              </div>
            </div>
          )}
          
          <div className="text-slate-800 dark:text-slate-200 leading-relaxed space-y-8 text-xl transition-theme">
            {post.content.split('\n').map((para, i) => (
              para.trim() && <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
