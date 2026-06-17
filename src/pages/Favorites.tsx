import { useSongStore } from '@/store/songStore';
import SongCard from '@/components/songs/SongCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { songs, favorites } = useSongStore();
  const favoriteSongs = songs.filter((s) => favorites.includes(s.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-grace-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={40} className="fill-current" />
            <h1 className="text-4xl font-bold">My Favorite Songs</h1>
          </div>
          <p className="text-lg text-red-100">
            {favoriteSongs.length} song{favoriteSongs.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {favoriteSongs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteSongs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No favorite songs yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start adding songs to your favorites to keep track of your loved hymns and worship songs.
              </p>
              <Link
                to="/search"
                className="inline-block bg-grace-600 text-white px-6 py-2 rounded-lg hover:bg-grace-700 transition"
              >
                Explore Songs
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
