import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSongStore } from '@/store/songStore';
import { mockSongs } from '@/data/mockSongs';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Home from '@/pages/Home';
import SongDetail from '@/pages/SongDetail';
import Language from '@/pages/Language';
import Search from '@/pages/Search';
import Favorites from '@/pages/Favorites';
import Playlists from '@/pages/Playlists';
import Profile from '@/pages/Profile';
import Admin from '@/pages/Admin';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';

export default function App() {
  const { setSongs, isDarkMode } = useSongStore();

  useEffect(() => {
    setSongs(mockSongs);
  }, [setSongs]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <div className="flex h-screen dark:bg-gray-950">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/song/:id" element={<SongDetail />} />
              <Route path="/language/:lang" element={<Language />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
