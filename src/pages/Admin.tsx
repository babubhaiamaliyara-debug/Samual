import { useState } from 'react';
import { useSongStore } from '@/store/songStore';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, Users, Music, Settings } from 'lucide-react';
import { v4 as uuidv4 } from 'crypto';

export default function Admin() {
  const navigate = useNavigate();
  const { currentUser, songs, addSong, deleteSong, updateSong } = useSongStore();
  const [activeTab, setActiveTab] = useState<'songs' | 'users' | 'settings'>('songs');
  const [showNewSong, setShowNewSong] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    language: 'english' as const,
    lyrics: '',
    chords: '',
    youtubeUrl: '',
    category: 'Hymn',
    duration: 300,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
  });

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400">
            You must be an admin to access this panel.
          </p>
        </div>
      </div>
    );
  }

  const handleAddSong = () => {
    if (editingId) {
      updateSong(editingId, { ...formData, id: editingId });
      setEditingId(null);
    } else {
      addSong({
        ...formData,
        id: uuidv4(),
        views: 0,
        createdAt: new Date().toISOString(),
      });
    }
    resetForm();
    setShowNewSong(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      artist: '',
      language: 'english',
      lyrics: '',
      chords: '',
      youtubeUrl: '',
      category: 'Hymn',
      duration: 300,
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-grace-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings size={40} />
              <h1 className="text-3xl font-bold">Admin Panel</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0">
            <button
              onClick={() => setActiveTab('songs')}
              className={`px-6 py-4 font-medium border-b-2 transition ${
                activeTab === 'songs'
                  ? 'border-grace-600 text-grace-600 dark:text-grace-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              <Music className="inline mr-2" size={20} />
              Songs
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 font-medium border-b-2 transition ${
                activeTab === 'users'
                  ? 'border-grace-600 text-grace-600 dark:text-grace-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              <Users className="inline mr-2" size={20} />
              Users
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Songs Management */}
          {activeTab === 'songs' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Songs</h2>
                <button
                  onClick={() => {
                    resetForm();
                    setEditingId(null);
                    setShowNewSong(!showNewSong);
                  }}
                  className="flex items-center gap-2 bg-grace-600 text-white px-6 py-2 rounded-lg hover:bg-grace-700 transition font-semibold"
                >
                  <Plus size={20} />
                  Add Song
                </button>
              </div>

              {/* New/Edit Song Form */}
              {showNewSong && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                    {editingId ? 'Edit Song' : 'Add New Song'}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Song Title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-grace-500"
                    />
                    <input
                      type="text"
                      placeholder="Artist"
                      value={formData.artist}
                      onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-grace-500"
                    />
                    <select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value as any })}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-grace-500"
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="gujarati">Gujarati</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-grace-500"
                    />
                    <input
                      type="number"
                      placeholder="Duration (seconds)"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-grace-500"
                    />
                    <input
                      type="url"
                      placeholder="YouTube URL"
                      value={formData.youtubeUrl}
                      onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-grace-500"
                    />
                  </div>

                  <textarea
                    placeholder="Lyrics"
                    value={formData.lyrics}
                    onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-grace-500"
                  />

                  <textarea
                    placeholder="Chords (optional)"
                    value={formData.chords}
                    onChange={(e) => setFormData({ ...formData, chords: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-grace-500"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleAddSong}
                      className="px-6 py-2 bg-grace-600 text-white rounded-lg hover:bg-grace-700 transition font-semibold"
                    >
                      {editingId ? 'Update Song' : 'Add Song'}
                    </button>
                    <button
                      onClick={() => {
                        setShowNewSong(false);
                        setEditingId(null);
                        resetForm();
                      }}
                      className="px-6 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Songs Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Artist</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Language</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Views</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {songs.map((song) => (
                      <tr key={song.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 text-sm font-medium">{song.title}</td>
                        <td className="px-6 py-4 text-sm">{song.artist}</td>
                        <td className="px-6 py-4 text-sm capitalize">{song.language}</td>
                        <td className="px-6 py-4 text-sm">{song.views.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button
                            onClick={() => {
                              setFormData({
                                title: song.title,
                                artist: song.artist,
                                language: song.language,
                                lyrics: song.lyrics,
                                chords: song.chords || '',
                                youtubeUrl: song.youtubeUrl || '',
                                category: song.category,
                                duration: song.duration,
                                image: song.image,
                              });
                              setEditingId(song.id);
                              setShowNewSong(true);
                            }}
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteSong(song.id)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Management */}
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Manage Users</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4 text-blue-700 dark:text-blue-400">
                User management is coming soon. Currently, users are stored in-app only.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
