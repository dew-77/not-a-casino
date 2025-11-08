import { useGameStore } from '../state/useGameStore';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useGameStore();

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        w-14 h-8 rounded-full relative transition-colors duration-300
        ${isDarkMode ? 'bg-tbank-yellow' : 'bg-tbank-gray-200'}
      `}
      aria-label="Toggle theme"
    >
      <div
        className={`
          absolute top-1 w-6 h-6 rounded-full transition-all duration-300
          ${isDarkMode ? 'left-7 bg-tbank-black' : 'left-1 bg-white'}
          flex items-center justify-center text-xs
        `}
      >
        {isDarkMode ? '🌙' : '☀️'}
      </div>
    </button>
  );
}

