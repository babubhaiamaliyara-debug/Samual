import { useState, useMemo } from 'react';
import { useSongStore } from '@/store/songStore';
import SongCard from '@/components/songs/SongCard';
import { Search as SearchIcon } from 'lucide-react';
import { Language } from '@/types';

export default function Search() {
  const { songs } = useSongStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(songs.map((s) => s.category))];

  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      const matchesQuery =
        searchQuery === '' ||
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.lyrics.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLanguage = !selectedLanguage || song.language === selectedLanguage;
      const matchesCategory = !selectedCategory || song.category === selectedCategory;

      return matchesQuery && matchesLanguage && matchesCategory;
    });
  }, [searchQuery, selectedLanguage, selectedCategory, songs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-grace-50 dark:from-gray-950 dark:to-gray-900">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-grace-600 to-holy-600 text-white px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Search Songs</h1>

          {/* Search input */}
          <div className="relative mb-6">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-grace-200" size={24} />
            <input
              type="text"
              placeholder="Search by title, artist, or lyrics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder:text-grace-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Filters summary */}
          <div className="text-sm text-grace-100">
            {filteredSongs.length} result{filteredSongs.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* Filters and Results */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-24 space-y-6">
                {/* Language Filter */}
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">Language</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedLanguage(null)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedLanguage === null
                          ? 'bg-grace-100 dark:bg-grace-900/30 text-grace-700 dark:text-grace-400 font-semibold'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      All Languages
                    </button>
                    {(['english', 'hindi', 'gujarati'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition capitalize ${
                          selectedLanguage === lang
                            ? 'bg-grace-100 dark:bg-grace-900/30 text-grace-700 dark:text-grace-400 font-semibold'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {lang === 'hindi' ? 'हिंदी' : lang === 'gujarati' ? 'ગુજરાતી' : 'English'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">Category</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCategory === null
                          ? 'bg-grace-100 dark:bg-grace-900/30 text-grace-700 dark:text-grace-400 font-semibold'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                          selectedCategory === cat
                            ? 'bg-grace-100 dark:bg-grace-900/30 text-grace-700 dark:text-grace-400 font-semibold'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear filters */}
                {(searchQuery || selectedLanguage || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedLanguage(null);
                      setSelectedCategory(null);
                    }}
                    className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition text-sm"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {filteredSongs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSongs.map((song) => (
                    <SongCard key={song.id} song={song} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <SearchIcon size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No songs found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
