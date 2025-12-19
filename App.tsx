
import React, { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { PostDetail } from './pages/PostDetail';
import { Admin } from './pages/Admin';
import { NewsPost, CategoryItem } from './types';
import { INITIAL_POSTS, INITIAL_CATEGORIES } from './constants';
import { NewsCard } from './components/NewsCard';

const safeStorage = {
  getItem: (key: string, fallback: any) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  setItem: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<NewsPost[]>(() => 
    safeStorage.getItem('jkad_posts', INITIAL_POSTS)
  );

  const [categories, setCategories] = useState<CategoryItem[]>(() => 
    safeStorage.getItem('jkad_categories', INITIAL_CATEGORIES)
  );

  const [darkMode, setDarkMode] = useState<boolean>(() => 
    safeStorage.getItem('jkad_darkmode', false)
  );

  useEffect(() => {
    safeStorage.setItem('jkad_posts', posts);
  }, [posts]);

  useEffect(() => {
    safeStorage.setItem('jkad_categories', categories);
  }, [categories]);

  useEffect(() => {
    safeStorage.setItem('jkad_darkmode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const addPost = (newPost: NewsPost) => setPosts([newPost, ...posts]);
  const deletePost = (id: string) => {
    if (confirm('Delete this article?')) setPosts(posts.filter(p => p.id !== id));
  };

  const addCategory = (newCat: CategoryItem) => setCategories([...categories, newCat]);
  const deleteCategory = (id: string) => {
    if (confirm('Delete this button? Post items in this category will become unorganized.')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-theme ${darkMode ? 'dark' : ''}`}>
        <Navbar categories={categories} darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home posts={posts} categories={categories} />} />
            <Route path="/post/:id" element={<PostDetail posts={posts} />} />
            <Route 
              path="/admin" 
              element={
                <Admin 
                  posts={posts} 
                  categories={categories}
                  onAddPost={addPost} 
                  onDeletePost={deletePost}
                  onAddCategory={addCategory}
                  onDeleteCategory={deleteCategory}
                />
              } 
            />
            <Route path="/category/:slug" element={<CategoryPage posts={posts} categories={categories} />} />
          </Routes>
        </main>
        
        <footer className="bg-slate-900 dark:bg-black text-slate-400 py-12 px-4 border-t border-slate-800 transition-theme">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <span className="text-2xl font-black text-white uppercase tracking-tighter">JK Smart<span className="text-red-600"> Updates</span></span>
              <p className="mt-2 text-sm">Your reliable source for regional and world news.</p>
            </div>
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
            </div>
            <div className="text-xs font-medium">
              &copy; {new Date().getFullYear()} JK Smart Updates.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

const CategoryPage: React.FC<{ posts: NewsPost[], categories: CategoryItem[] }> = ({ posts, categories }) => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find(c => c.slug === slug);
  const filteredPosts = posts.filter(p => p.category === category?.name);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-12 capitalize transition-theme">{category?.name || 'Category'} News</h1>
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-slate-400 dark:text-slate-500 font-bold transition-theme">No articles found in this category.</div>
      )}
    </div>
  );
};

export default App;
