import { Link, useLocation } from 'react-router-dom';
import { Home, Music, Globe, Heart, ListMusic, BookOpen, Settings, X } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/language/english', label: 'English Songs', icon: Music },
    { path: '/language/hindi', label: 'Hindi Songs', icon: Globe },
    { path: '/language/gujarati', label: 'Gujarati Songs', icon: Globe },
    { path: '/favorites', label: 'Favorites', icon: Heart },
    { path: '/playlists', label: 'Playlists', icon: ListMusic },
    { path: '/search', label: 'Search', icon: Settings },
    { path: '/profile', label: 'About Us', icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform md:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-grace-500 to-holy-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">✝</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Christian<br />Songs
            </span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="md:hidden">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(path)
                  ? 'bg-grace-100 dark:bg-grace-900/30 text-grace-700 dark:text-grace-400 font-medium'
                  : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            © 2024 Christian Songs. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  );
}
