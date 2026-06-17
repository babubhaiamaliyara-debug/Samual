import { useParams, useNavigate } from 'react-router-dom';
import { useSongStore } from '@/store/songStore';
import { ArrowLeft, Heart, Share2, Music, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function SongDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { songs, favorites, toggleFavorite, playlists, addSongToPlaylist } = useSongStore();
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);

  const song = songs.find((s) => s.id === id);

  if (!song) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Song not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-grace-600 hover:text-grace-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const isFavorited = favorites.includes(song.id);

  const handleShare = () => {
    const text = `Check out "${song.title}" by ${song.artist} on Christian Songs App!`;
    if (navigator.share) {
      navigator.share({ title: song.title, text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Song link copied!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-grace-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
            {song.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2">
            {/* Song image */}
            <div className="relative h-96 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-8">
              <img
                src={song.image}
                alt={song.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-sm text-gray-300 mb-2">Song Details</p>
                  <h1 className="text-3xl font-bold mb-2">{song.title}</h1>
                  <p className="text-lg text-gray-200">{song.artist}</p>
                </div>
              </div>
            </div>

            {/* Song information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Language</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">
                    {song.language}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Category</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{song.category}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Duration</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {(song.duration / 60).toFixed(1)}m
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Views</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {song.views.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => toggleFavorite(song.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    isFavorited
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
                  {isFavorited ? 'Favorited' : 'Add to Favorites'}
                </button>

                {playlists.length > 0 && (
                  <button
                    onClick={() => setShowPlaylistModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-grace-100 dark:bg-grace-900/30 text-grace-700 dark:text-grace-400 rounded-lg hover:bg-grace-200 dark:hover:bg-grace-900/50 transition"
                  >
                    <Music size={20} />
                    Add to Playlist
                  </button>
                )}

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-holy-100 dark:bg-holy-900/30 text-holy-700 dark:text-holy-400 rounded-lg hover:bg-holy-200 dark:hover:bg-holy-900/50 transition"
                >
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>

            {/* YouTube video */}
            {song.youtubeUrl && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Watch on YouTube
                </h2>
                <div className="relative w-full pt-[56.25%] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`${song.youtubeUrl}?controls=1`}
                    title={song.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Lyrics */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Lyrics</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <p className="hymn-text whitespace-pre-line">{song.lyrics}</p>
              </div>
            </div>

            {/* Chords */}
            {song.chords && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Chords</h2>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <pre className="font-mono text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {song.chords}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-28">
              <div className="text-center mb-6">
                <MapPin className="mx-auto mb-3 text-grace-600 dark:text-grace-400" size={40} />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Song Details</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A beautiful {song.category.toLowerCase()} sung by {song.artist}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">LANGUAGE</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">
                    {song.language === 'hindi'
                      ? 'हिंदी'
                      : song.language === 'gujarati'
                      ? 'ગુજરાતી'
                      : 'English'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">CATEGORY</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{song.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">ADDED</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(song.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Modal */}
      {showPlaylistModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Add to Playlist
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => {
                    addSongToPlaylist(playlist.id, song.id);
                    setShowPlaylistModal(false);
                    alert('Added to playlist!');
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">{playlist.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {playlist.songs.length} songs
                  </p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowPlaylistModal(false)}
              className="w-full mt-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
