import { create } from 'zustand';
import { Song, Playlist, User, Language } from '@/types';

interface SongStore {
  songs: Song[];
  playlists: Playlist[];
  currentUser: User | null;
  favorites: string[];
  searchQuery: string;
  selectedLanguage: Language | null;
  isDarkMode: boolean;

  setSongs: (songs: Song[]) => void;
  addSong: (song: Song) => void;
  updateSong: (id: string, updates: Partial<Song>) => void;
  deleteSong: (id: string) => void;

  setPlaylists: (playlists: Playlist[]) => void;
  createPlaylist: (playlist: Playlist) => void;
  updatePlaylist: (id: string, updates: Partial<Playlist>) => void;
  deletePlaylist: (id: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;

  setCurrentUser: (user: User | null) => void;
  toggleFavorite: (songId: string) => void;

  setSearchQuery: (query: string) => void;
  setSelectedLanguage: (language: Language | null) => void;
  toggleDarkMode: () => void;

  getSongsByLanguage: (language: Language) => Song[];
  getFavoriteSongs: () => Song[];
  searchSongs: (query: string) => Song[];
}

export const useSongStore = create<SongStore>((set, get) => ({
  songs: [],
  playlists: [],
  currentUser: null,
  favorites: [],
  searchQuery: '',
  selectedLanguage: null,
  isDarkMode: localStorage.getItem('darkMode') === 'true',

  setSongs: (songs) => set({ songs }),
  addSong: (song) => set((state) => ({ songs: [...state.songs, song] })),
  updateSong: (id, updates) =>
    set((state) => ({
      songs: state.songs.map((song) => (song.id === id ? { ...song, ...updates } : song)),
    })),
  deleteSong: (id) =>
    set((state) => ({
      songs: state.songs.filter((song) => song.id !== id),
    })),

  setPlaylists: (playlists) => set({ playlists }),
  createPlaylist: (playlist) =>
    set((state) => ({ playlists: [...state.playlists, playlist] })),
  updatePlaylist: (id, updates) =>
    set((state) => ({
      playlists: state.playlists.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  deletePlaylist: (id) =>
    set((state) => ({
      playlists: state.playlists.filter((p) => p.id !== id),
    })),
  addSongToPlaylist: (playlistId, songId) =>
    set((state) => ({
      playlists: state.playlists.map((p) =>
        p.id === playlistId && !p.songs.includes(songId)
          ? { ...p, songs: [...p.songs, songId] }
          : p
      ),
    })),
  removeSongFromPlaylist: (playlistId, songId) =>
    set((state) => ({
      playlists: state.playlists.map((p) =>
        p.id === playlistId ? { ...p, songs: p.songs.filter((id) => id !== songId) } : p
      ),
    })),

  setCurrentUser: (user) => set({ currentUser: user }),
  toggleFavorite: (songId) =>
    set((state) => ({
      favorites: state.favorites.includes(songId)
        ? state.favorites.filter((id) => id !== songId)
        : [...state.favorites, songId],
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.isDarkMode;
      localStorage.setItem('darkMode', String(newDarkMode));
      return { isDarkMode: newDarkMode };
    }),

  getSongsByLanguage: (language) => {
    const state = get();
    return state.songs.filter((song) => song.language === language);
  },

  getFavoriteSongs: () => {
    const state = get();
    return state.songs.filter((song) => state.favorites.includes(song.id));
  },

  searchSongs: (query) => {
    const state = get();
    const lowerQuery = query.toLowerCase();
    return state.songs.filter(
      (song) =>
        song.title.toLowerCase().includes(lowerQuery) ||
        song.artist.toLowerCase().includes(lowerQuery) ||
        song.lyrics.toLowerCase().includes(lowerQuery)
    );
  },
}));
