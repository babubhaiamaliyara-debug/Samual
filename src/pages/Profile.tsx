import { useSongStore } from '@/store/songStore';
import { User, Music, Heart, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, favorites, playlists, songs } = useSongStore();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-grace-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <User size={64} className="mx-auto text-gray-300 dark:text-gray-700 mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            View your profile, manage your favorites, and more.
          </p>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="flex-1 bg-grace-600 text-white py-3 rounded-lg hover:bg-grace-700 transition font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex-1 border border-grace-600 text-grace-600 py-3 rounded-lg hover:bg-grace-50 transition font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-grace-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-grace-600 to-holy-600 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30">
                <User size={48} />
              </div>
              <div>
                <h1 className="text-4xl font-bold">{currentUser.name}</h1>
                <p className="text-grace-100">{currentUser.email}</p>
                {currentUser.role === 'admin' && (
                  <span className="inline-block mt-2 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-semibold">
                    Admin
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition border border-white/30"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <Music size={32} className="mx-auto text-grace-600 dark:text-grace-400 mb-3" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {songs.length}
              </p>
              <p className="text-gray-600 dark:text-gray-400">Total Songs</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <Heart size={32} className="mx-auto text-red-600 dark:text-red-400 mb-3" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {favorites.length}
              </p>
              <p className="text-gray-600 dark:text-gray-400">Favorites</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <Music size={32} className="mx-auto text-holy-600 dark:text-holy-400 mb-3" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {playlists.length}
              </p>
              <p className="text-gray-600 dark:text-gray-400">Playlists</p>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Account Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Full Name</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentUser.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Email</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {currentUser.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Member Since</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {new Date(currentUser.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Role</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                  {currentUser.role}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Links
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                to="/favorites"
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/30 dark:hover:to-red-900/20 rounded-lg transition"
              >
                <Heart size={24} className="text-red-600 dark:text-red-400" />
                <span className="font-semibold text-gray-900 dark:text-white">View Favorites</span>
              </Link>

              <Link
                to="/playlists"
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-grace-50 to-grace-100 dark:from-grace-900/20 dark:to-grace-900/10 hover:from-grace-100 hover:to-grace-200 dark:hover:from-grace-900/30 dark:hover:to-grace-900/20 rounded-lg transition"
              >
                <Music size={24} className="text-grace-600 dark:text-grace-400" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  View Playlists
                </span>
              </Link>

              {currentUser.role === 'admin' && (
                <Link
                  to="/admin"
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/10 hover:from-yellow-100 hover:to-yellow-200 dark:hover:from-yellow-900/30 dark:hover:to-yellow-900/20 rounded-lg transition"
                >
                  <span className="text-2xl">⚙️</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Admin Panel
                  </span>
                </Link>
              )}

              <Link
                to="/search"
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-holy-50 to-holy-100 dark:from-holy-900/20 dark:to-holy-900/10 hover:from-holy-100 hover:to-holy-200 dark:hover:from-holy-900/30 dark:hover:to-holy-900/20 rounded-lg transition"
              >
                <span className="text-2xl">🔍</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Discover Songs
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
