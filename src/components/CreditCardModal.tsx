import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

export function CreditCardModal({ isOpen, onClose, onReset }: CreditCardModalProps) {
  const [closeAttempts, setCloseAttempts] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ top: 20, right: 20 });

  const handleCloseAttempt = () => {
    if (closeAttempts < 5) {
      // Генерируем случайную позицию для кнопки
      const positions = [
        { top: 20, right: 20 },
        { top: 20, left: 20 },
        { bottom: 20, right: 20 },
        { bottom: 20, left: 20 },
        { top: '50%', left: 20 },
        { top: '50%', right: 20 },
      ];
      const randomPos = positions[Math.floor(Math.random() * positions.length)];
      setButtonPosition(randomPos as any);
      setCloseAttempts(closeAttempts + 1);
    } else {
      // После 5 попыток позволяем закрыть
      onClose();
      setCloseAttempts(0);
      setButtonPosition({ top: 20, right: 20 });
    }
  };

  const handleReset = () => {
    onReset();
    onClose();
    setCloseAttempts(0);
    setButtonPosition({ top: 20, right: 20 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseAttempt();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              animate={buttonPosition}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={handleCloseAttempt}
              className="absolute z-10 w-10 h-10 bg-tbank-gray-100 hover:bg-tbank-gray-200 rounded-full flex items-center justify-center transition-colors"
              style={{ position: 'absolute' }}
            >
              <span className="text-xl text-tbank-black">✕</span>
            </motion.button>

            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left Content */}
              <div className="flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-black text-tbank-black mb-4">
                  Деппнул в казик всю свою зп?
                </h2>
                <h3 className="text-2xl font-bold text-tbank-black mb-6">
                  Оформи карту «Na zavod platinum»
                </h3>
                <p className="text-tbank-gray-400 text-lg mb-8">
                  Наша лучшая кредитная карта в редком дизайне. Решение за 2 минуты, доставим бесплатно
                </p>

                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div>
                    <p className="text-2xl font-black text-tbank-black mb-1">До 1 000 000 ₽</p>
                    <p className="text-sm text-tbank-gray-400">Кредитный лимит</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-tbank-black mb-1">До 55 дней</p>
                    <p className="text-sm text-tbank-gray-400">Беспроцентный период</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-tbank-black mb-1">До 1 490 ₽</p>
                    <p className="text-sm text-tbank-gray-400">Стоимость в год</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => window.open('https://www.tbank.ru/cards/credit-cards/', '_blank')}
                    className="px-8 py-4 bg-tbank-yellow text-tbank-black font-bold rounded-xl hover:bg-tbank-yellow/90 transition-colors"
                  >
                    Оформить карту
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-8 py-4 bg-tbank-gray-50 text-tbank-black font-medium rounded-xl hover:bg-tbank-gray-100 transition-colors"
                  >
                    Нет, я продолжу
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex items-center justify-center relative">
                <img 
                  src="/credit-card.jpg" 
                  alt="Т-Банк Platinum карта" 
                  className="w-full max-w-lg h-auto"
                />
              </div>
            </div>

            {/* Attempts Counter (for fun) */}
            {closeAttempts > 0 && closeAttempts < 5 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-tbank-yellow text-tbank-black px-4 py-2 rounded-full font-bold text-sm">
                Попытка закрыть: {closeAttempts}/5 😏
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

