
import React, { useState } from 'react';
import { NewsPost, CategoryItem } from '../types';
import { ADMIN_PASSWORD } from '../constants';
import { LayoutDashboard, PlusCircle, Trash2, ShieldAlert, Sparkles, Loader2, Image as ImageIcon, Settings } from 'lucide-react';
import { generateSmartSummary } from '../services/geminiService';

interface AdminProps {
  posts: NewsPost[];
  categories: CategoryItem[];
  onAddPost: (post: NewsPost) => void;
  onDeletePost: (id: string) => void;
  onAddCategory: (cat: CategoryItem) => void;
  onDeleteCategory: (id: string) => void;
}

export const Admin: React.FC<AdminProps> = ({ 
  posts, categories, onAddPost, onDeletePost, onAddCategory, onDeleteCategory 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'categories'>('list');
  const [isSummarizing, setIsSummarizing] = useState(false);

  // New Post Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || '');
  const [imageUrl, setImageUrl] = useState('');
  const [isBreaking, setIsBreaking] = useState(false);
  const [aiSummary, setAiSummary] = useState('');

  // Category Form State
  const [newCatName, setNewCatName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied: Incorrect Password');
    }
  };

  const handleGenerateSummary = async () => {
    if (!content) return alert('Please enter content first');
    setIsSummarizing(true);
    const summary = await generateSmartSummary(content);
    setAiSummary(summary);
    setIsSummarizing(false);
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (categories.length === 0) return alert('Create at least one category first');
    const newPost: NewsPost = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      excerpt: content.substring(0, 150) + '...',
      category: category || categories[0].name,
      imageUrl: imageUrl || `https://picsum.photos/seed/${Math.random()}/800/600`,
      publishedAt: new Date().toISOString(),
      author: 'Administrator',
      isBreaking,
      aiSummary
    };
    onAddPost(newPost);
    alert('Post Published!');
    setActiveTab('list');
    resetPostForm();
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const newCat: CategoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCatName.trim(),
      slug: newCatName.trim().toLowerCase().replace(/\s+/g, '-')
    };
    onAddCategory(newCat);
    setNewCatName('');
  };

  const resetPostForm = () => {
    setTitle('');
    setContent('');
    setCategory(categories[0]?.name || '');
    setImageUrl('');
    setIsBreaking(false);
    setAiSummary('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 transition-theme">
        <div className="max-w-md w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white dark:border-slate-800 transition-theme">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-red-600 p-4 rounded-2xl mb-6 shadow-xl shadow-red-200 dark:shadow-red-900/20">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white transition-theme">Restricted Access</h1>
            <p className="text-slate-500 dark:text-slate-400 text-center text-sm mt-3 font-bold transition-theme uppercase tracking-tight">Enter Secure Credential</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Admin Password"
              className="w-full px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 dark:text-white focus:ring-4 focus:ring-red-500/10 focus:border-red-600 outline-none text-center text-lg transition-all"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-red-200 dark:shadow-red-900/30 active:scale-[0.98] uppercase tracking-widest text-sm"
            >
              Verify & Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 transition-theme">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white transition-theme">Admin Panel</h1>
          <p className="text-slate-500 dark:text-slate-400 font-black uppercase text-[10px] tracking-widest mt-2 transition-theme">Command Center & Controls</p>
        </div>
        <div className="flex bg-white/50 dark:bg-slate-800/50 backdrop-blur p-1.5 rounded-2xl border border-white dark:border-slate-700 overflow-x-auto shadow-sm transition-theme">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'list' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-white/30 dark:hover:bg-slate-700/30'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Articles</span>
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'create' ? 'bg-red-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-white/30 dark:hover:bg-slate-700/30'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Post</span>
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'categories' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md' : 'text-slate-500 dark:text-slate-400 hover:bg-white/30 dark:hover:bg-slate-700/30'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Buttons</span>
          </button>
        </div>
      </div>

      {activeTab === 'list' && (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-white dark:border-slate-700 shadow-xl overflow-x-auto transition-theme">
          <table className="w-full min-w-[600px]">
            <thead className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-white dark:border-slate-700 transition-theme">
              <tr>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Article Details</th>
                <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 text-right text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50 dark:divide-slate-700/50">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-white/50 dark:hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <img src={post.imageUrl} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                    <span className="font-bold text-slate-900 dark:text-white">{post.title}</span>
                  </td>
                  <td className="px-6 py-4"><span className="text-xs font-black uppercase text-red-600">{post.category}</span></td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => onDeletePost(post.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"><Trash2 className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'create' && (
        <form onSubmit={handleSubmitPost} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-3xl border border-white dark:border-slate-700 shadow-xl space-y-6 transition-theme">
          <div>
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Article Headline</label>
            <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white outline-none font-bold focus:border-red-600 transition-colors" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Category Selection</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white outline-none focus:border-red-600 transition-colors">
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Thumbnail Image URL</label>
              <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white outline-none focus:border-red-600 transition-colors" placeholder="https://..." />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-2">Full Story Content</label>
            <textarea required rows={8} value={content} onChange={e => setContent(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white outline-none focus:border-red-600 transition-colors font-medium" />
          </div>
          <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 transition-theme">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">AI Intelligence Summary</span>
              <button type="button" onClick={handleGenerateSummary} disabled={isSummarizing} className="text-xs font-black text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 transition-colors flex items-center">
                {isSummarizing ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Sparkles className="w-3 h-3 mr-2" />}
                Generate Smart Overview
              </button>
            </div>
            <p className="text-sm text-indigo-900 dark:text-indigo-200 italic font-semibold leading-relaxed">{aiSummary || "Summary will appear here after generation..."}</p>
          </div>
          <button type="submit" className="w-full bg-red-600 text-white font-black py-4 rounded-xl shadow-lg shadow-red-200 dark:shadow-red-900/30 hover:bg-red-700 active:scale-[0.99] transition-all uppercase tracking-widest text-sm">Publish Article to Portal</button>
        </form>
      )}

      {activeTab === 'categories' && (
        <div className="space-y-8 transition-theme">
          <form onSubmit={handleAddCategory} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-3xl border border-white dark:border-slate-700 shadow-xl flex flex-col md:flex-row gap-4">
            <input required value={newCatName} onChange={e => setNewCatName(e.target.value)} placeholder="New Button Label (e.g. Cinema)" className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white outline-none focus:border-slate-900 transition-colors font-bold" />
            <button type="submit" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-black shadow-lg hover:opacity-90 active:scale-[0.95] transition-all uppercase tracking-widest text-xs">Add Navigation Button</button>
          </form>
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-white dark:border-slate-700 shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50/50 dark:bg-slate-900/50">
                <tr>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Button Label</th>
                  <th className="px-6 py-5 text-left text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Routing Slug</th>
                  <th className="px-6 py-5 text-right text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/50 dark:divide-slate-700/50">
                {categories.map(cat => (
                  <tr key={cat.id} className="hover:bg-white/50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="px-6 py-4 font-black text-slate-900 dark:text-white">{cat.name}</td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-500">/category/{cat.slug}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => onDeleteCategory(cat.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"><Trash2 className="w-5 h-5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
