import { useState } from 'react';
import { useGameStore } from '../state/useGameStore';
import { Header } from '../components/Header';

export function AdminPanel() {
  const { balance, winChance, setWinChance, setBalance, isDarkMode } = useGameStore();
  const [localChance, setLocalChance] = useState(winChance);
  const [localBalance, setLocalBalance] = useState(balance);

  const handleSaveChance = () => {
    setWinChance(localChance);
  };

  const handleSaveBalance = () => {
    setBalance(localBalance);
  };

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'bg-black' : 'bg-tbank-gray-50'}`}>
      <Header />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`text-4xl font-black mb-8 transition-colors ${
          isDarkMode ? 'text-white' : 'text-tbank-black'
        }`}>
          ⚙️ Админ-панель
        </h1>
        
        <div className="space-y-6">
          {/* Win Chance Control */}
          <div className={`rounded-tbank p-6 shadow-tbank-lg transition-colors ${
            isDarkMode ? 'bg-zinc-900' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-black mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-tbank-black'
            }`}>Управление шансом выигрыша</h2>
            <p className={`mb-6 transition-colors ${
              isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
            }`}>Установите вероятность выигрыша игрока</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={`text-sm font-medium transition-colors ${
                    isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
                  }`}>
                    Шанс выигрыша
                  </label>
                  <span className="text-3xl font-black text-tbank-yellow">
                    {localChance}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={localChance}
                  onChange={(e) => setLocalChance(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-tbank-yellow transition-colors ${
                    isDarkMode ? 'bg-zinc-800' : 'bg-tbank-gray-100'
                  }`}
                />
                <div className={`flex justify-between text-xs mt-1 transition-colors ${
                  isDarkMode ? 'text-gray-500' : 'text-tbank-gray-300'
                }`}>
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>

              <button
                onClick={handleSaveChance}
                className="w-full py-3 bg-tbank-yellow text-tbank-black font-bold rounded-xl hover:bg-tbank-yellow/90 transition-colors"
              >
                Применить шанс выигрыша
              </button>

              <div className={`p-4 rounded-xl transition-colors ${
                isDarkMode ? 'bg-zinc-800' : 'bg-tbank-gray-50'
              }`}>
                <h3 className={`font-bold text-sm mb-2 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-tbank-black'
                }`}>Текущий активный шанс</h3>
                <p className={`text-2xl font-black transition-colors ${
                  isDarkMode ? 'text-white' : 'text-tbank-black'
                }`}>{winChance}%</p>
              </div>
            </div>
          </div>

          {/* Balance Control */}
          <div className={`rounded-tbank p-6 shadow-tbank-lg transition-colors ${
            isDarkMode ? 'bg-zinc-900' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-black mb-2 transition-colors ${
              isDarkMode ? 'text-white' : 'text-tbank-black'
            }`}>Управление балансом</h2>
            <p className={`mb-6 transition-colors ${
              isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
            }`}>Установите баланс игрока вручную</p>
            
            <div className="space-y-4">
              <div>
                <label className={`text-sm font-medium block mb-2 transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
                }`}>
                  Баланс игрока (₽)
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000000"
                  value={localBalance}
                  onChange={(e) => setLocalBalance(Number(e.target.value))}
                  className={`w-full py-3 px-4 font-bold text-2xl rounded-xl border-2 border-transparent focus:border-tbank-yellow focus:outline-none transition-colors ${
                    isDarkMode ? 'bg-zinc-800 text-white' : 'bg-tbank-gray-50 text-tbank-black'
                  }`}
                />
              </div>

              <button
                onClick={handleSaveBalance}
                className="w-full py-3 bg-tbank-yellow text-tbank-black font-bold rounded-xl hover:bg-tbank-yellow/90 transition-colors"
              >
                Установить баланс
              </button>

              <div className={`p-4 rounded-xl transition-colors ${
                isDarkMode ? 'bg-zinc-800' : 'bg-tbank-gray-50'
              }`}>
                <h3 className={`font-bold text-sm mb-2 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-tbank-black'
                }`}>Текущий баланс игрока</h3>
                <p className={`text-2xl font-black transition-colors ${
                  isDarkMode ? 'text-white' : 'text-tbank-black'
                }`}>{balance.toLocaleString()} ₽</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={`rounded-tbank p-6 shadow-tbank-lg transition-colors ${
            isDarkMode ? 'bg-zinc-900' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-black mb-4 transition-colors ${
              isDarkMode ? 'text-white' : 'text-tbank-black'
            }`}>Статистика</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl transition-colors ${
                isDarkMode ? 'bg-zinc-800' : 'bg-tbank-gray-50'
              }`}>
                <p className={`text-sm mb-1 transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
                }`}>RTP (Return to Player)</p>
                <p className={`text-xl font-black transition-colors ${
                  isDarkMode ? 'text-white' : 'text-tbank-black'
                }`}>{winChance}%</p>
              </div>
              <div className={`p-4 rounded-xl transition-colors ${
                isDarkMode ? 'bg-zinc-800' : 'bg-tbank-gray-50'
              }`}>
                <p className={`text-sm mb-1 transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
                }`}>House Edge</p>
                <p className={`text-xl font-black transition-colors ${
                  isDarkMode ? 'text-white' : 'text-tbank-black'
                }`}>{100 - winChance}%</p>
              </div>
              <div className={`p-4 rounded-xl transition-colors ${
                isDarkMode ? 'bg-zinc-800' : 'bg-tbank-gray-50'
              }`}>
                <p className={`text-sm mb-1 transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
                }`}>Режим</p>
                <p className="text-xl font-black text-tbank-yellow">
                  {winChance > 50 ? 'Честный' : winChance > 20 ? 'Средний' : 'Жесткий'}
                </p>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className={`border-2 rounded-tbank p-4 transition-colors ${
            isDarkMode 
              ? 'bg-yellow-900/20 border-yellow-700' 
              : 'bg-yellow-50 border-yellow-200'
          }`}>
            <p className={`text-sm transition-colors ${
              isDarkMode ? 'text-yellow-300' : 'text-yellow-800'
            }`}>
              ⚠️ <strong>Внимание:</strong> Изменения применяются мгновенно и влияют на все последующие вращения барабанов.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

