import React from 'react';
import { Globe } from 'lucide-react';
import { useTolgee } from '@tolgee/react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
];

const LanguageSelector = () => {
  const tolgee = useTolgee(['language']);

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors">
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium">
          {languages.find((lang) => lang.code === tolgee.getLanguage())?.name}
        </span>
      </button>

      <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => tolgee.changeLanguage(lang.code)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors
              ${
                tolgee.getLanguage() === lang.code ? 'text-indigo-600 font-medium' : 'text-gray-700'
              }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
