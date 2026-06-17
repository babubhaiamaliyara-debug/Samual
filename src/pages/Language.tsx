import { useParams } from 'react-router-dom';
import { useSongStore } from '@/store/songStore';
import SongCard from '@/components/songs/SongCard';
import { Language as LanguageType } from '@/types';

const languageInfo: Record<string, { name: string; emoji: string; description: string }> = {
  english: {
    name: 'English',
    emoji: '🇬🇧',
    description: 'Beautiful hymns and worship songs in English',
  },
  hindi: {
    name: 'हिंदी',
    emoji: '🇮🇳',
    description: 'भक्ति गीत और स्तुति गीत हिंदी में',
  },
  gujarati: {
    name: 'ગુજરાતી',
    emoji: '🇮🇳',
    description: 'ગુજરાતી ભક્તિ અને સ્તુતિ ગીતો',
  },
};

export default function Language() {
  const { lang } = useParams<{ lang: string }>();
  const { songs } = useSongStore();

  if (!lang || !Object.keys(languageInfo).includes(lang)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Language not found</p>
      </div>
    );
  }

  const langKey = lang as LanguageType;
  const info = languageInfo[lang];
  const languageSongs = songs.filter((s) => s.language === langKey);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-grace-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-grace-600 to-holy-600 text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-5xl mb-4">{info.emoji}</p>
          <h1 className="text-4xl font-bold mb-4">{info.name} Songs</h1>
          <p className="text-lg text-grace-100">{info.description}</p>
          <p className="text-sm text-grace-200 mt-4">
            {languageSongs.length} songs available
          </p>
        </div>
      </div>

      {/* Songs Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {languageSongs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {languageSongs.map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No songs available in this language yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
