import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../state/useGameStore';
import { Header } from '../components/Header';

export function PersonalAccount() {
  const { balance, setBalance, isDarkMode } = useGameStore();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleDeposit = async () => {
    if (!depositAmount || !cardNumber || !cardExpiry || !cardCVV) {
      alert('Заполните все поля');
      return;
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      alert('Неверный номер карты');
      return;
    }

    setIsProcessing(true);

    // Имитация обработки платежа
    setTimeout(() => {
      const amount = parseInt(depositAmount);
      setBalance(balance + amount);
      setIsProcessing(false);
      setShowDepositModal(false);
      setDepositAmount('');
      setCardNumber('');
      setCardExpiry('');
      setCardCVV('');
      alert(`Успешно пополнено на ${amount} ₽!`);
    }, 2000);
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'bg-black' : 'bg-tbank-gray-50'}`}>
      <Header />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`text-4xl font-black mb-8 transition-colors ${
          isDarkMode ? 'text-white' : 'text-tbank-black'
        }`}>Личный кабинет</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Balance Card */}
          <div className={`rounded-tbank p-8 shadow-tbank-lg transition-colors ${
            isDarkMode ? 'bg-zinc-900' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-tbank-black'}`}>
                Игровой баланс
              </h2>
              <span className="text-4xl">💰</span>
            </div>
            
            <div className="mb-6">
              <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                Доступно для игры
              </p>
              <p className="text-5xl font-black text-tbank-yellow">
                {balance.toLocaleString()} ₽
              </p>
            </div>

            <button
              onClick={() => setShowDepositModal(true)}
              className="w-full py-4 bg-tbank-yellow text-tbank-black font-bold rounded-xl hover:bg-tbank-yellow/90 transition-colors"
            >
              Пополнить баланс
            </button>
          </div>

          {/* Quick Actions */}
          <div className={`rounded-tbank p-8 shadow-tbank-lg transition-colors ${
            isDarkMode ? 'bg-zinc-900' : 'bg-white'
          }`}>
            <h2 className={`text-2xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-tbank-black'}`}>
              Быстрые действия
            </h2>
            
            <div className="space-y-4">
              <Link
                to="/slots"
                className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                  isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-tbank-gray-50 hover:bg-tbank-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎰</span>
                  <div>
                    <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-tbank-black'}`}>Слоты</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                      Классические слоты
                    </p>
                  </div>
                </div>
                <span className={isDarkMode ? 'text-gray-500' : 'text-tbank-gray-400'}>→</span>
              </Link>

              <Link
                to="/aviator"
                className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                  isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-tbank-gray-50 hover:bg-tbank-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✈️</span>
                  <div>
                    <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-tbank-black'}`}>Авиатор</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                      Поймай множитель
                    </p>
                  </div>
                </div>
                <span className={isDarkMode ? 'text-gray-500' : 'text-tbank-gray-400'}>→</span>
              </Link>

              <button
                onClick={() => setShowDepositModal(true)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors ${
                  isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-tbank-gray-50 hover:bg-tbank-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💳</span>
                  <div className="text-left">
                    <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-tbank-black'}`}>Пополнить</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                      Добавить средства
                    </p>
                  </div>
                </div>
                <span className={isDarkMode ? 'text-gray-500' : 'text-tbank-gray-400'}>→</span>
              </button>

              <div className={`flex items-center justify-between p-4 rounded-xl ${
                isDarkMode ? 'bg-zinc-800' : 'bg-tbank-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-tbank-black'}`}>
                      История игр
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                      Скоро появится
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`mt-6 rounded-tbank p-8 shadow-tbank-lg transition-colors ${
          isDarkMode ? 'bg-zinc-900' : 'bg-white'
        }`}>
          <h2 className={`text-2xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-tbank-black'}`}>
            Статистика
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className={`text-center p-4 rounded-xl ${isDarkMode ? 'bg-zinc-800' : 'bg-tbank-gray-50'}`}>
              <p className={`text-3xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-tbank-black'}`}>
                {balance.toLocaleString()} ₽
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                Текущий баланс
              </p>
            </div>
            <div className={`text-center p-4 rounded-xl ${isDarkMode ? 'bg-zinc-800' : 'bg-tbank-gray-50'}`}>
              <p className="text-3xl font-black text-tbank-yellow">0</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                Игр сыграно
              </p>
            </div>
            <div className={`text-center p-4 rounded-xl ${isDarkMode ? 'bg-zinc-800' : 'bg-tbank-gray-50'}`}>
              <p className="text-3xl font-black text-tbank-yellow">0 ₽</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                Общий выигрыш
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      <AnimatePresence>
        {showDepositModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isProcessing && setShowDepositModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-tbank-black">Пополнение баланса</h2>
                <button
                  onClick={() => !isProcessing && setShowDepositModal(false)}
                  className="w-10 h-10 bg-tbank-gray-100 hover:bg-tbank-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="text-xl text-tbank-black">✕</span>
                </button>
              </div>

              <div className="space-y-4">
                {/* Amount */}
                <div>
                  <label className="text-sm font-medium text-tbank-gray-400 block mb-2">
                    Сумма пополнения
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0"
                    className="w-full py-3 px-4 bg-tbank-gray-50 text-tbank-black font-bold text-2xl rounded-xl border-2 border-transparent focus:border-tbank-yellow focus:outline-none"
                  />
                  <div className="flex gap-2 mt-2">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDepositAmount(amount.toString())}
                        className="flex-1 py-2 bg-tbank-gray-50 text-tbank-black font-medium rounded-lg hover:bg-tbank-gray-100 transition-colors text-sm"
                      >
                        {amount} ₽
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Number */}
                <div>
                  <label className="text-sm font-medium text-tbank-gray-400 block mb-2">
                    Номер карты
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    className="w-full py-3 px-4 bg-tbank-gray-50 text-tbank-black font-medium rounded-xl border-2 border-transparent focus:border-tbank-yellow focus:outline-none"
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-tbank-gray-400 block mb-2">
                      Срок
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full py-3 px-4 bg-tbank-gray-50 text-tbank-black font-medium rounded-xl border-2 border-transparent focus:border-tbank-yellow focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-tbank-gray-400 block mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      placeholder="000"
                      maxLength={3}
                      className="w-full py-3 px-4 bg-tbank-gray-50 text-tbank-black font-medium rounded-xl border-2 border-transparent focus:border-tbank-yellow focus:outline-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleDeposit}
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-xl font-bold transition-colors ${
                    isProcessing
                      ? 'bg-tbank-gray-100 text-tbank-gray-400 cursor-not-allowed'
                      : 'bg-tbank-yellow text-tbank-black hover:bg-tbank-yellow/90'
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⚡</span>
                      Обработка...
                    </span>
                  ) : (
                    `Пополнить на ${depositAmount || '0'} ₽`
                  )}
                </button>

                <p className="text-xs text-tbank-gray-400 text-center mt-4">
                  🔒 Платеж защищен. Данные карты не сохраняются
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

