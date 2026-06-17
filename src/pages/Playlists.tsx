import { useState } from 'react';
import { useSongStore } from '@/store/songStore';
import { ListMusic, Plus, Trash2, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'crypto';

export default function Playlists() {
  const { playlists, createPlaylist, deletePlaylist, updatePlaylist, currentUser } = useSongStore();
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = () => {
    if (newName.trim()) {
      createPlaylist({
        id: uuidv4(),
        name: newName,
        description: newDesc,
        songs: [],
        userId: currentUser?.id || 'guest',
        createdAt: new Date().toISOString(),
      });
      setNewName('');
      setNewDesc('');
      setShowNewPlaylist(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-grace-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-grace-600 to-holy-600 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ListMusic size={40} />
              <h1 className="text-4xl font-bold">My Playlists</h1>
            </div>
            {currentUser && (
              <button
                onClick={() => setShowNewPlaylist(!showNewPlaylist)}
                className="flex items-center gap-2 bg-white text-grace-600 px-6 py-2 rounded-lg hover:bg-grace-50 transition font-semibold"
              >
                <Plus size={20} />
                New Playlist
              </button>
            )}
          </div>
        </div>
      </div>

      {/* New Playlist Form */}
      {showNewPlaylist && (
        <div className="px-4 sm:px-6 lg:px-8 py-6 bg-grace-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                Create New Playlist
              </h3>
              <input
                type="text"
                placeholder="Playlist name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-grace-500"
              />
              <textarea
                placeholder="Description (optional)"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-grace-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreate}
                  className="flex-1 bg-grace-600 text-white py-2 rounded-lg hover:bg-grace-700 transition font-semibold"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowNewPlaylist(false);
                    setNewName('');
                    setNewDesc('');
                  }}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Playlists Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {!currentUser ? (
            <div className="text-center py-16">
              <ListMusic size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Sign in to create playlists
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create and manage your own playlists to organize your favorite worship songs.
              </p>
              <Link
                to="/login"
                className="inline-block bg-grace-600 text-white px-6 py-2 rounded-lg hover:bg-grace-700 transition"
              >
                Sign In
              </Link>
            </div>
          ) : playlists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {playlists.map((playlist) => (
                <Link
                  key={playlist.id}
                  to={`/playlists/${playlist.id}`}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group"
                >
                  <div className="h-32 bg-gradient-to-br from-grace-600 to-holy-600 flex items-center justify-center relative overflow-hidden">
                    <ListMusic size={48} className="text-white opacity-20" />
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          // Edit functionality
                        }}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition"
                      >
                        <Edit2 size={16} className="text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deletePlaylist(playlist.id);
                        }}
                        className="p-2 bg-white/90 rounded-full hover:bg-white transition"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {playlist.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {playlist.description || 'No description'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ListMusic size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No playlists yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your first playlist to organize your favorite worship songs.
              </p>
              <button
                onClick={() => setShowNewPlaylist(true)}
                className="inline-flex items-center gap-2 bg-grace-600 text-white px-6 py-2 rounded-lg hover:bg-grace-700 transition"
              >
                <Plus size={20} />
                Create Playlist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
