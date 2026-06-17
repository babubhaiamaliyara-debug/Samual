import { useEffect, useState } from 'react';
import { useSongStore } from '@/store/songStore';
import { bibleverses } from '@/data/mockSongs';
import SongCard from '@/components/songs/SongCard';
import BibleVerseCard from '@/components/home/BibleVerseCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { songs } = useSongStore();
  const [todayVerse, setTodayVerse] = useState(bibleverses[0]);

  useEffect(() => {
    const today = new Date().getDate();
    setTodayVerse(bibleverses[today % bibleverses.length]);
  }, []);

  const featuredSongs = songs.filter((s) => s.isFeatured).slice(0, 4);
  const newSongs = songs.filter((s) => s.isNew).slice(0, 4);
  const popularSongs = [...songs].sort((a, b) => b.views - a.views).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-grace-50/30 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Banner */}
      <section className="relative h-96 bg-gradient-to-r from-grace-600 to-holy-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="text-9xl absolute top-10 left-10 text-white">✝</div>
          <div className="text-7xl absolute bottom-20 right-10 text-white opacity-50">♪</div>
        </div>

        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Christian Songs</h1>
            <p className="text-xl md:text-2xl text-grace-100 mb-8">
              Worship, praise, and spiritual inspiration in multiple languages
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/language/english"
                className="bg-white text-grace-600 px-8 py-3 rounded-lg font-semibold hover:bg-grace-50 transition"
              >
                Explore Songs
              </Link>
              <Link
                to="/search"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
              >
                Search Hymns
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bible Verse of the Day */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-3xl">📖</span> Bible Verse of the Day
          </h2>
          <BibleVerseCard verse={todayVerse} />
        </div>
      </section>

      {/* Featured Songs */}
      {featuredSongs.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-3xl">⭐</span> Featured Songs
              </h2>
              <Link
                to="/language/english"
                className="text-grace-600 dark:text-grace-400 hover:text-grace-700 flex items-center gap-2"
              >
                View all <ChevronRight size={20} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredSongs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Songs */}
      {newSongs.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-3xl">🎵</span> Latest Additions
              </h2>
              <Link
                to="/search"
                className="text-grace-600 dark:text-grace-400 hover:text-grace-700 flex items-center gap-2"
              >
                View all <ChevronRight size={20} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newSongs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Songs */}
      {popularSongs.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-3xl">🔥</span> Most Popular
              </h2>
              <Link
                to="/search"
                className="text-grace-600 dark:text-grace-400 hover:text-grace-700 flex items-center gap-2"
              >
                View all <ChevronRight size={20} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularSongs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-grace-600 dark:bg-grace-900/50">
        <div className="max-w-4xl mx-auto text-center text-white dark:text-grace-100">
          <h2 className="text-3xl font-bold mb-4">Join Our Worship Community</h2>
          <p className="text-lg mb-8 text-grace-100 dark:text-grace-200">
            Create your account to save favorite songs, build playlists, and track your worship journey.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-grace-600 px-8 py-3 rounded-lg font-semibold hover:bg-grace-50 transition"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
