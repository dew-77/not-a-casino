import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../state/useGameStore';
import { Header } from '../components/Header';

interface GameHistory {
  multiplier: number;
  won: boolean;
  profit: number;
}

export function AviatorGame() {
  const { balance, bet, setBet, isDarkMode, deductBet, addWinnings } = useGameStore();
  
  const [isFlying, setIsFlying] = useState(false);
  const [multiplier, setMultiplier] = useState(1.00);
  const [crashed, setCrashed] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [cashOutMultiplier, setCashOutMultiplier] = useState(0);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [_targetMultiplier, setTargetMultiplier] = useState(2.00);
  const [customBet, setCustomBet] = useState('');
  
  const intervalRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);

  // Генерируем случайный множитель, при котором самолет упадет
  const generateCrashPoint = (): number => {
    const winChance = useGameStore.getState().winChance;
    const random = Math.random() * 100;
    
    if (random < winChance) {
      // Выигрыш: множитель от 2x до 10x
      return 2 + Math.random() * 8;
    } else {
      // Проигрыш: множитель от 1.1x до 2.5x
      return 1.1 + Math.random() * 1.4;
    }
  };

  // Старт игры
  const startGame = () => {
    if (balance < bet) {
      return;
    }

    if (!deductBet()) {
      return;
    }

    setIsFlying(true);
    setCrashed(false);
    setCashedOut(false);
    setMultiplier(1.00);
    setCashOutMultiplier(0);
    
    const crashPoint = generateCrashPoint();
    setTargetMultiplier(crashPoint);
    startTimeRef.current = Date.now();

    // Обновляем множитель каждые 50ms
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000; // seconds
      
      // Формула роста множителя (экспоненциальный рост)
      const currentMultiplier = Math.pow(1.1, elapsed * 2);
      
      if (currentMultiplier >= crashPoint) {
        // Самолет упал!
        clearInterval(intervalRef.current);
        setMultiplier(crashPoint);
        setCrashed(true);
        setIsFlying(false);
        
        if (!cashedOut) {
          // Игрок проиграл
          setGameHistory(prev => [{
            multiplier: crashPoint,
            won: false,
            profit: -bet
          }, ...prev.slice(0, 9)]);
        }
      } else {
        setMultiplier(currentMultiplier);
      }
    }, 50);
  };

  // Кэш-аут (забрать выигрыш)
  const handleCashOut = () => {
    if (!isFlying || cashedOut || crashed) return;
    
    clearInterval(intervalRef.current);
    setCashedOut(true);
    setCashOutMultiplier(multiplier);
    setIsFlying(false);
    
    const winAmount = bet * multiplier;
    addWinnings(winAmount);
    
    setGameHistory(prev => [{
      multiplier: multiplier,
      won: true,
      profit: winAmount - bet
    }, ...prev.slice(0, 9)]);
  };

  // Очистка интервала при размонтировании
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleCustomBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setCustomBet('');
      return;
    }
    
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setCustomBet(value);
      setBet(Math.min(numValue, balance));
    }
  };

  const handlePresetClick = (amount: number) => {
    setBet(amount);
    setCustomBet('');
  };

  const PRESET_BETS = [10, 50, 100, 500];

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'bg-black' : 'bg-tbank-gray-50'}`}>
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`text-4xl font-black mb-8 transition-colors ${
          isDarkMode ? 'text-white' : 'text-tbank-black'
        }`}>
          🛩️ Авиатор
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Game Display - 2 columns */}
          <div className="lg:col-span-2">
            <div className={`rounded-tbank p-8 shadow-tbank-lg transition-colors ${
              isDarkMode ? 'bg-zinc-900' : 'bg-white'
            }`}>
              {/* Game Area */}
              <div className={`relative h-[400px] rounded-xl overflow-hidden ${
                isDarkMode ? 'bg-gradient-to-br from-zinc-950 to-zinc-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
              }`}>
                {/* Multiplier Display */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    className={`text-6xl font-black px-8 py-4 rounded-2xl shadow-tbank-xl ${
                      cashedOut 
                        ? 'bg-tbank-yellow text-tbank-black'
                        : crashed
                          ? isDarkMode ? 'bg-red-900 text-white' : 'bg-red-500 text-white'
                          : isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white text-tbank-black'
                    }`}
                    animate={isFlying ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  >
                    {cashedOut ? cashOutMultiplier.toFixed(2) : multiplier.toFixed(2)}×
                  </motion.div>
                </div>

                {/* Airplane */}
                <AnimatePresence>
                  {!crashed && (
                    <motion.div
                      className="absolute text-6xl"
                      initial={{ x: 50, y: 350, rotate: 0 }}
                      animate={isFlying ? {
                        x: [50, 700],
                        y: [350, 50],
                        rotate: [-15, -25],
                      } : { x: 50, y: 350, rotate: 0 }}
                      exit={{ 
                        y: 500, 
                        rotate: -90,
                        transition: { duration: 0.5 }
                      }}
                      transition={{
                        duration: isFlying ? 10 : 0,
                        ease: "linear"
                      }}
                    >
                      ✈️
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Crash Message */}
                <AnimatePresence>
                  {crashed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className={`text-4xl font-black px-8 py-4 rounded-2xl ${
                        cashedOut 
                          ? 'bg-tbank-yellow text-tbank-black'
                          : isDarkMode ? 'bg-red-900 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {cashedOut ? `🎉 Выигрыш ${(bet * cashOutMultiplier).toFixed(0)} ₽!` : '💥 Упал!'}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Trajectory Line */}
                {isFlying && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path
                      d={`M 50 350 Q 200 200, ${Math.min(700, 50 + (multiplier - 1) * 200)} ${Math.max(50, 350 - (multiplier - 1) * 100)}`}
                      stroke={isDarkMode ? '#FFDD2D' : '#FFDD2D'}
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="10,5"
                      opacity="0.5"
                    />
                  </svg>
                )}
              </div>

              {/* Controls */}
              <div className="mt-6 space-y-4">
                <button
                  onClick={isFlying ? handleCashOut : startGame}
                  disabled={isFlying && (crashed || cashedOut) || balance < bet}
                  className={`w-full py-6 rounded-xl font-black text-2xl transition-all shadow-tbank-lg ${
                    isFlying && !crashed && !cashedOut
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : balance < bet
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-tbank-yellow hover:bg-yellow-400 text-tbank-black'
                  }`}
                >
                  {isFlying && !crashed && !cashedOut ? '🛑 ЗАБРАТЬ' : crashed ? 'НОВАЯ ИГРА' : 'СТАРТ'}
                </button>

                {cashedOut && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-lg font-bold text-tbank-yellow"
                  >
                    +"Миш, мне похуй, я так чувствую" – Олег Тиньков
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Balance & Bet Control */}
            <div className={`rounded-tbank p-6 shadow-tbank-lg transition-colors ${
              isDarkMode ? 'bg-zinc-900' : 'bg-white'
            }`}>
              <div className={`mb-6 pb-6 border-b ${isDarkMode ? 'border-zinc-800' : 'border-tbank-gray-100'}`}>
                <div className={`text-sm mb-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                  Баланс
                </div>
                <div className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-tbank-black'}`}>
                  {balance.toLocaleString()} ₽
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
                  }`}>
                    Сумма ставки
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_BETS.map(amount => (
                      <button
                        key={amount}
                        onClick={() => handlePresetClick(amount)}
                        disabled={isFlying || balance < amount}
                        className={`py-3 px-4 rounded-xl font-bold transition-all ${
                          bet === amount && !customBet
                            ? 'bg-tbank-yellow text-tbank-black shadow-tbank'
                            : isDarkMode
                              ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                              : 'bg-tbank-gray-50 text-tbank-black hover:bg-tbank-gray-100'
                        } ${(isFlying || balance < amount) ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        {amount} ₽
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
                  }`}>
                    Или своя сумма
                  </label>
                  <input
                    type="number"
                    value={customBet}
                    onChange={handleCustomBetChange}
                    placeholder="Введите сумму"
                    disabled={isFlying}
                    className={`w-full px-4 py-3 rounded-xl font-bold transition-colors ${
                      isDarkMode
                        ? 'bg-zinc-800 text-white placeholder-gray-500 border-zinc-700'
                        : 'bg-tbank-gray-50 text-tbank-black placeholder-tbank-gray-300 border-tbank-gray-200'
                    } border-2 focus:outline-none focus:border-tbank-yellow ${
                      isFlying ? 'opacity-40 cursor-not-allowed' : ''
                    }`}
                    min="1"
                    max={balance}
                  />
                </div>

                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                  Текущая ставка: <span className="font-bold text-tbank-yellow">{bet} ₽</span>
                </div>
              </div>
            </div>

            {/* Game History */}
            <div className={`rounded-tbank p-6 shadow-tbank-lg transition-colors ${
              isDarkMode ? 'bg-zinc-900' : 'bg-white'
            }`}>
              <h3 className={`font-black text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-tbank-black'}`}>
                История игр
              </h3>
              <div className="space-y-2">
                {gameHistory.length === 0 ? (
                  <p className={`text-sm text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                    Сыграйте первую игру
                  </p>
                ) : (
                  gameHistory.map((game, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        isDarkMode ? 'bg-zinc-800' : 'bg-tbank-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{game.won ? '✈️' : '💥'}</span>
                        <div>
                          <div className={`font-bold ${
                            game.won ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {game.multiplier.toFixed(2)}×
                          </div>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        game.won ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {game.profit > 0 ? '+' : ''}{game.profit.toFixed(0)} ₽
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

