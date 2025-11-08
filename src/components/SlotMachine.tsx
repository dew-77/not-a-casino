import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGameStore } from '../state/useGameStore';
import { type Symbol, getRandomInt } from '../lib/rng';
import { generateRiggedReels } from '../lib/riggedRng';
import { Reel } from './Reel';
import { ControlPanel } from './ControlPanel';

/**
 * Tinkov's legendary quotes
 */
const WIN_QUOTES = [
  'Это было не просто смело, это было охуеть как смело!',
  'Вот это да! Охуенный результат!',
  'Красавчик! Так держать!',
];

const LOSE_QUOTES = [
  'Миш, мне похуй, я так чувствую',
  'Какое-то величие, какая-то хуйня, мне вообще они неинтересны',
  'Ну это пиздец какой-то просто!',
  'Я ошибся, я могу один раз ошибиться?',
  'Бывает. Попробуй еще раз!',
];

/**
 * Check if three symbols match
 */
function checkWin(reels: Symbol[][]): { won: boolean; amount: number; multiplier: number; line: string } {
  const bet = useGameStore.getState().bet;
  
  // Check middle row (index 1 of each reel)
  const middleRow = [reels[0][1], reels[1][1], reels[2][1]];
  if (middleRow[0] === middleRow[1] && middleRow[1] === middleRow[2]) {
    return { won: true, amount: bet * 10, multiplier: 10, line: 'middle row' };
  }
  
  // Check top row
  const topRow = [reels[0][0], reels[1][0], reels[2][0]];
  if (topRow[0] === topRow[1] && topRow[1] === topRow[2]) {
    return { won: true, amount: bet * 5, multiplier: 5, line: 'top row' };
  }
  
  // Check bottom row
  const bottomRow = [reels[0][2], reels[1][2], reels[2][2]];
  if (bottomRow[0] === bottomRow[1] && bottomRow[1] === bottomRow[2]) {
    return { won: true, amount: bet * 5, multiplier: 5, line: 'bottom row' };
  }
  
  // Check diagonal (top-left to bottom-right)
  const diagonal1 = [reels[0][0], reels[1][1], reels[2][2]];
  if (diagonal1[0] === diagonal1[1] && diagonal1[1] === diagonal1[2]) {
    return { won: true, amount: bet * 5, multiplier: 5, line: 'diagonal1' };
  }
  
  // Check diagonal (bottom-left to top-right)
  const diagonal2 = [reels[0][2], reels[1][1], reels[2][0]];
  if (diagonal2[0] === diagonal2[1] && diagonal2[1] === diagonal2[2]) {
    return { won: true, amount: bet * 5, multiplier: 5, line: 'diagonal2' };
  }
  
  return { won: false, amount: 0, multiplier: 0, line: '' };
}

export function SlotMachine() {
  const {
    reels,
    isSpinning,
    lastResult,
    winChance,
    isDarkMode,
    setReels,
    setIsSpinning,
    setLastResult,
    deductBet,
    addWinnings,
  } = useGameStore();

  const [spinCount, setSpinCount] = useState(0);
  const [showWinningLine, setShowWinningLine] = useState<string | null>(null);
  const [showCombinations, setShowCombinations] = useState(false);

  // Confetti effects
  const fireConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Конфетти слева
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FFDD2D', '#FFE566', '#FFF099', '#FF006e', '#3a86ff']
      });
      
      // Конфетти справа
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FFDD2D', '#FFE566', '#FFF099', '#FF006e', '#3a86ff']
      });
    }, 250);
  };

  const fireSalute = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FFDD2D', '#FFE566', '#FFF099']
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleSpin = async () => {
    // Check if player has enough balance
    if (!deductBet()) {
      setLastResult({
        won: false,
        amount: 0,
        message: '❌ Недостаточно средств!',
      });
      return;
    }

    // Clear previous result
    setLastResult(null);
    setShowWinningLine(null);
    setIsSpinning(true);

    // Generate new reels with rigged chance
    const newReels = generateRiggedReels(winChance);

    // Wait for animation to complete
    setTimeout(() => {
      setReels(newReels);
      setIsSpinning(false);

      // Check for win
      const result = checkWin(newReels);
      
      if (result.won) {
        addWinnings(result.amount);
        setShowWinningLine(result.line);
        
        // Запускаем конфетти и салют!
        setTimeout(() => {
          fireSalute();
          setTimeout(() => fireConfetti(), 200);
        }, 300);
        
        const lineNames: { [key: string]: string } = {
          'middle row': 'средний ряд',
          'top row': 'верхний ряд',
          'bottom row': 'нижний ряд',
          'diagonal1': 'диагональ ↘',
          'diagonal2': 'диагональ ↗'
        };
        const randomQuote = WIN_QUOTES[getRandomInt(0, WIN_QUOTES.length - 1)];
        setLastResult({
          won: true,
          amount: result.amount,
          message: `🎉 Выигрыш ${result.amount} ₽! (${result.multiplier}x, ${lineNames[result.line]})\n${randomQuote}`,
        });
      } else {
        const randomQuote = LOSE_QUOTES[getRandomInt(0, LOSE_QUOTES.length - 1)];
        setLastResult({
          won: false,
          amount: 0,
          message: `😔 ${randomQuote}`,
        });
      }

      setSpinCount((prev: number) => prev + 1);
    }, 1500);
  };

  const getWinLinePosition = (line: string) => {
    switch (line) {
      case 'middle row':
        return 'top-1/2 -translate-y-1/2 border-y-[3px]';
      case 'top row':
        return 'top-[25%] -translate-y-1/2 border-y-[3px]';
      case 'bottom row':
        return 'bottom-[25%] translate-y-1/2 border-y-[3px]';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-5xl mx-auto">
      {/* Combinations Button */}
      <button
        onClick={() => setShowCombinations(!showCombinations)}
        className={`self-end px-4 py-2 rounded-xl font-medium text-sm transition-colors shadow-tbank ${
          isDarkMode 
            ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
            : 'bg-white text-tbank-black hover:bg-tbank-gray-50'
        }`}
      >
        {showCombinations ? '✕ Закрыть' : 'ℹ️ Комбинации'}
      </button>

      {/* Combinations Modal */}
      <AnimatePresence>
        {showCombinations && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`w-full rounded-tbank p-6 shadow-tbank-lg overflow-hidden transition-colors ${
              isDarkMode ? 'bg-zinc-900' : 'bg-white'
            }`}
          >
            <h3 className={`font-black text-xl mb-4 ${isDarkMode ? 'text-white' : 'text-tbank-black'}`}>
              Выигрышные комбинации
            </h3>
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-3 rounded-xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-tbank-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">━━━</div>
                  <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-tbank-black'}`}>Средний ряд</span>
                </div>
                <span className="font-black text-tbank-yellow">×10</span>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-tbank-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">━━━</div>
                  <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-tbank-black'}`}>Верхний ряд</span>
                </div>
                <span className="font-black">×5</span>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-tbank-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">━━━</div>
                  <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-tbank-black'}`}>Нижний ряд</span>
                </div>
                <span className="font-black">×5</span>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-tbank-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">╲</div>
                  <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-tbank-black'}`}>Диагональ ↘</span>
                </div>
                <span className="font-black">×5</span>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-xl ${
                isDarkMode ? 'bg-gray-700' : 'bg-tbank-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">╱</div>
                  <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-tbank-black'}`}>Диагональ ↗</span>
                </div>
                <span className="font-black">×5</span>
              </div>
            </div>
            <p className={`text-sm mt-4 ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
              Совпадение любых 3 одинаковых символов на линии даёт выигрыш
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slot Machine Display */}
      <div className={`relative rounded-tbank p-8 shadow-tbank-lg w-full transition-colors ${
        isDarkMode ? 'bg-zinc-900' : 'bg-white'
      }`}>
        <div className={`absolute -top-3 left-8 px-4 py-1 rounded-full font-bold text-xs transition-colors ${
          isDarkMode ? 'bg-zinc-800 text-gray-200' : 'bg-tbank-gray-100 text-tbank-black'
        }`}>
          Игровые барабаны
        </div>
        
        {/* Reels Container */}
        <div className="relative flex gap-4 justify-center items-center min-h-[300px]">
          {reels.map((reel, index) => (
            <Reel
              key={`${spinCount}-${index}`}
              symbols={reel}
              isSpinning={isSpinning}
              delay={index}
            />
          ))}

          {/* Winning Line Indicator */}
          {showWinningLine && !isSpinning && (
            <>
              {/* Horizontal Lines */}
              {!showWinningLine.includes('diagonal') && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`absolute left-0 right-0 border-tbank-yellow pointer-events-none ${getWinLinePosition(showWinningLine)}`}
                  style={{ borderColor: '#FFDD2D' }}
                />
              )}
              
              {/* Diagonal Lines */}
              {showWinningLine === 'diagonal1' && (
                <motion.svg 
                  className="absolute inset-0 w-full h-full" 
                  style={{ pointerEvents: 'none' }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <line 
                    x1="16.67%" y1="16.67%" 
                    x2="83.33%" y2="83.33%" 
                    stroke="#FFDD2D" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                  />
                </motion.svg>
              )}
              {showWinningLine === 'diagonal2' && (
                <motion.svg 
                  className="absolute inset-0 w-full h-full" 
                  style={{ pointerEvents: 'none' }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <line 
                    x1="16.67%" y1="83.33%" 
                    x2="83.33%" y2="16.67%" 
                    stroke="#FFDD2D" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                  />
                </motion.svg>
              )}
            </>
          )}
        </div>
      </div>

      {/* Result Message */}
      <AnimatePresence mode="wait">
        {lastResult && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`
              text-base sm:text-lg font-bold px-6 py-4 rounded-tbank shadow-tbank text-center whitespace-pre-line w-full transition-colors
              ${lastResult.won
                ? 'bg-tbank-yellow text-tbank-black'
                : isDarkMode 
                  ? 'bg-zinc-900 text-white border border-zinc-800' 
                  : 'bg-white text-tbank-black border border-tbank-gray-100'
              }
            `}
          >
            {lastResult.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Panel */}
      <ControlPanel onSpin={handleSpin} />
    </div>
  );
}

