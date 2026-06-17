import { Link } from 'react-router-dom';
import { Heart, Music } from 'lucide-react';
import { Song } from '@/types';
import { useSongStore } from '@/store/songStore';

interface Props {
  song: Song;
}

export default function SongCard({ song }: Props) {
  const { favorites, toggleFavorite } = useSongStore();
  const isFavorited = favorites.includes(song.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group">
      {/* Image */}
      <Link to={`/song/${song.id}`} className="relative overflow-hidden h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <img
          src={song.image}
          alt={song.title}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(song.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition"
        >
          <Heart
            size={20}
            className={isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}
          />
        </button>
      </Link>

      {/* Content */}
      <Link to={`/song/${song.id}`} className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1">
            {song.title}
          </h3>
          {song.isFeatured && <span className="text-lg">⭐</span>}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{song.artist}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="inline-block bg-grace-100 dark:bg-grace-900/30 text-grace-700 dark:text-grace-400 px-2 py-1 rounded">
            {song.category}
          </span>
          <span className="flex items-center gap-1">
            <Music size={14} />
            {(song.duration / 60).toFixed(1)}m
          </span>
        </div>
      </Link>
    </div>
  );
}
