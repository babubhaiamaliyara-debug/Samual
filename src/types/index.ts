export type Language = 'hindi' | 'english' | 'gujarati';

export interface Song {
  id: string;
  title: string;
  artist: string;
  language: Language;
  lyrics: string;
  chords?: string;
  youtubeUrl?: string;
  category: string;
  duration: number;
  views: number;
  isFeatured?: boolean;
  isNew?: boolean;
  image: string;
  createdAt: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  songs: string[];
  userId: string;
  image?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  favorites: string[];
  playlists: string[];
  createdAt: string;
  role: 'user' | 'admin';
}

export interface BibleVerse {
  reference: string;
  text: string;
  version: string;
}

export interface AdminStats {
  totalSongs: number;
  totalUsers: number;
  totalPlaylists: number;
  favoritesCount: number;
}
