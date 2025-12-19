
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShieldCheck, Newspaper, Sun, Moon } from 'lucide-react';
import { CategoryItem } from '../types';

interface NavbarProps {
  categories: CategoryItem[];
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ categories, darkMode, onToggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-800 sticky top-0 z-50 transition-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-red-600 p-1.5 rounded-lg group-hover:bg-red-700 transition-colors">
                <Newspaper className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase transition-theme">JK Smart<span className="text-red-600"> Updates</span></span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-500 transition-theme">Home</Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-500 transition-theme whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onToggleDarkMode}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link
              to="/admin"
              className="flex items-center space-x-1 px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-all text-sm font-bold"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-4">
             <button 
              onClick={onToggleDarkMode}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-300 p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b dark:border-slate-800 py-6 px-6 space-y-4 shadow-2xl transition-theme">
          <Link to="/" className="block text-lg font-black text-slate-900 dark:text-white" onClick={() => setIsOpen(false)}>Home</Link>
          <div className="grid grid-cols-2 gap-4 py-4 border-y dark:border-slate-800">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="block text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <Link
            to="/admin"
            className="flex items-center space-x-2 text-lg font-black text-red-600 pt-2"
            onClick={() => setIsOpen(false)}
          >
            <ShieldCheck className="h-5 w-5" />
            <span>Admin Dashboard</span>
          </Link>
        </div>
      )}
    </nav>
  );
};
