import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGameStore } from '../state/useGameStore';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { isDarkMode } = useGameStore();
  const location = useLocation();
  const [isGamesOpen, setIsGamesOpen] = useState(false);

  const isGamePage = location.pathname === '/slots' || location.pathname === '/aviator';

  return (
    <header className={`border-b sticky top-0 z-50 transition-colors duration-300 ${
      isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-tbank-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/">
              <img 
                src="/logo.png" 
                alt="Т-Банк" 
                className="h-8 w-auto"
              />
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link 
                to="/personal"
                className={`font-medium transition-colors ${
                  location.pathname === '/personal'
                    ? 'text-tbank-yellow'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-tbank-yellow' 
                      : 'text-tbank-black hover:text-tbank-yellow'
                }`}
              >
                Частным лицам
              </Link>
              <Link 
                to="/"
                className={`font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'text-tbank-yellow'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-tbank-yellow' 
                      : 'text-tbank-black hover:text-tbank-yellow'
                }`}
              >
                Бизнесу
              </Link>
              
              {/* Games Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsGamesOpen(true)}
                onMouseLeave={() => setIsGamesOpen(false)}
              >
                <button
                  className={`font-medium transition-colors ${
                    isGamePage
                      ? 'text-tbank-yellow'
                      : isDarkMode 
                        ? 'text-gray-300 hover:text-tbank-yellow' 
                        : 'text-tbank-black hover:text-tbank-yellow'
                  }`}
                >
                  Игры {isGamesOpen ? '▲' : '▼'}
                </button>
                
                <AnimatePresence>
                  {isGamesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full left-0 mt-2 w-56 rounded-xl shadow-tbank-xl overflow-hidden ${
                        isDarkMode ? 'bg-zinc-800' : 'bg-white'
                      }`}
                    >
                      <Link
                        to="/slots"
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                          location.pathname === '/slots'
                            ? 'bg-tbank-yellow text-tbank-black'
                            : isDarkMode
                              ? 'hover:bg-zinc-700 text-white'
                              : 'hover:bg-tbank-gray-50 text-tbank-black'
                        }`}
                      >
                        <span className="text-2xl">🎰</span>
                        <div>
                          <div className="font-bold">Слоты</div>
                          <div className={`text-xs ${
                            location.pathname === '/slots' 
                              ? 'text-tbank-black' 
                              : isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
                          }`}>
                            Классические слоты
                          </div>
                        </div>
                      </Link>
                      <Link
                        to="/aviator"
                        className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                          location.pathname === '/aviator'
                            ? 'bg-tbank-yellow text-tbank-black'
                            : isDarkMode
                              ? 'hover:bg-zinc-700 text-white'
                              : 'hover:bg-tbank-gray-50 text-tbank-black'
                        }`}
                      >
                        <span className="text-2xl">✈️</span>
                        <div>
                          <div className="font-bold">Авиатор</div>
                          <div className={`text-xs ${
                            location.pathname === '/aviator' 
                              ? 'text-tbank-black' 
                              : isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
                          }`}>
                            Поймай множитель
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a 
                href="#" 
                className={`font-medium transition-colors ${
                  isDarkMode ? 'text-gray-300 hover:text-tbank-yellow' : 'text-tbank-black hover:text-tbank-yellow'
                }`}
              >
                Еще
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link 
              to="/account" 
              className={`font-medium transition-colors ${
                location.pathname === '/account'
                  ? 'text-tbank-yellow'
                  : isDarkMode
                    ? 'text-gray-400 hover:text-tbank-yellow'
                    : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              Личный кабинет
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

