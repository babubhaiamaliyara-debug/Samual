import { BibleVerse } from '@/types';
import { Share2 } from 'lucide-react';

interface Props {
  verse: BibleVerse;
}

export default function BibleVerseCard({ verse }: Props) {
  const handleShare = () => {
    const text = `${verse.reference}\n\n"${verse.text}"\n\n— ${verse.version}`;
    if (navigator.share) {
      navigator.share({ title: verse.reference, text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Verse copied to clipboard!');
    }
  };

  return (
    <div className="bg-gradient-to-br from-grace-50 to-holy-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border border-grace-200 dark:border-gray-600 shadow-lg">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-grace-700 dark:text-grace-400 mb-2">
            {verse.reference}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{verse.version}</p>
        </div>
        <button
          onClick={handleShare}
          className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition"
          title="Share verse"
        >
          <Share2 size={24} className="text-grace-600 dark:text-grace-400" />
        </button>
      </div>

      <p className="text-xl text-gray-800 dark:text-gray-100 leading-relaxed font-serif italic">
        "{verse.text}"
      </p>

      <div className="mt-6 pt-4 border-t border-grace-200 dark:border-gray-600">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          💡 Let this verse inspire your day and guide your worship.
        </p>
      </div>
    </div>
  );
}
