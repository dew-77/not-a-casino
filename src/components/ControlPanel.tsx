import { useState } from 'react';
import { useGameStore } from '../state/useGameStore';
import { CreditCardModal } from './CreditCardModal';

interface ControlPanelProps {
  onSpin: () => void;
}

const BET_OPTIONS = [10, 20, 50, 100];

export function ControlPanel({ onSpin }: ControlPanelProps) {
  const { balance, bet, isSpinning, isDarkMode, setBet, reset } = useGameStore();
  const [showModal, setShowModal] = useState(false);
  const [customBet, setCustomBet] = useState('');
  
  const canSpin = balance >= bet && !isSpinning && bet > 0;

  const handleCustomBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (value === '' || /^\d+$/.test(value)) {
      setCustomBet(value);
      const numValue = parseInt(value);
      if (numValue >= 1 && numValue <= balance) {
        setBet(numValue);
      }
    }
  };

  const handleCustomBetBlur = () => {
    if (customBet === '') {
      return;
    }
    const numValue = parseInt(customBet);
    if (numValue < 1) {
      setCustomBet('1');
      setBet(1);
    } else if (numValue > balance) {
      setCustomBet(balance.toString());
      setBet(balance);
    }
  };

  const handlePresetClick = (amount: number) => {
    setBet(amount);
    setCustomBet('');
  };

  return (
    <div className={`w-full rounded-tbank p-6 shadow-tbank-lg transition-colors ${
      isDarkMode ? 'bg-zinc-900' : 'bg-white'
    }`}>
      {/* Balance Display */}
      <div className={`mb-6 pb-6 border-b transition-colors ${
        isDarkMode ? 'border-zinc-800' : 'border-tbank-gray-100'
      }`}>
        <div className={`text-sm mb-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
          Ваш баланс
        </div>
        <div className={`text-4xl font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-tbank-black'}`}>
          <span>
            {balance.toLocaleString()}
          </span>
          <span className="text-2xl font-bold">₽</span>
        </div>
      </div>

      {/* Bet Selection */}
      <div className="mb-6">
        <div className="text-tbank-gray-400 text-sm mb-3 font-medium">Сумма ставки</div>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {BET_OPTIONS.map((amount) => (
            <button
              key={amount}
              onClick={() => handlePresetClick(amount)}
              disabled={isSpinning || balance < amount}
              className={`
                py-3 px-4 rounded-xl font-bold transition-all duration-200
                ${bet === amount && !customBet
                  ? 'bg-tbank-yellow text-tbank-black shadow-tbank'
                  : isDarkMode
                    ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                    : 'bg-tbank-gray-50 text-tbank-black hover:bg-tbank-gray-100'
                }
                ${(isSpinning || balance < amount) ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {amount} ₽
            </button>
          ))}
        </div>
        
        {/* Custom Bet Input */}
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={customBet}
            onChange={handleCustomBetChange}
            onBlur={handleCustomBetBlur}
            disabled={isSpinning}
            placeholder="Или укажите свою сумму"
            className={`
              w-full py-3 px-4 rounded-xl font-medium transition-all duration-200
              bg-tbank-gray-50 text-tbank-black placeholder-tbank-gray-300
              border-2 focus:outline-none
              ${customBet
                ? 'border-tbank-yellow'
                : 'border-transparent focus:border-tbank-yellow/50'
              }
              ${isSpinning ? 'opacity-40 cursor-not-allowed' : ''}
            `}
          />
          {customBet && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-tbank-gray-400 text-xs font-medium">
              до {balance} ₽
            </div>
          )}
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={onSpin}
        disabled={!canSpin}
        className={`
          w-full py-4 rounded-xl font-bold text-lg transition-all duration-200
          ${canSpin
            ? 'bg-tbank-yellow text-tbank-black hover:bg-tbank-yellow/90 active:scale-[0.98]'
            : 'bg-tbank-gray-100 text-tbank-gray-300 cursor-not-allowed'
          }
        `}
      >
        {isSpinning ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚡</span>
            Крутим барабаны...
          </span>
        ) : (
          <span>Крутить — {bet} ₽</span>
        )}
      </button>

      {/* Reset Button */}
      {balance < Math.min(...BET_OPTIONS) && (
        <button
          onClick={() => setShowModal(true)}
          className="w-full mt-3 py-3 rounded-xl bg-tbank-gray-50 text-tbank-black hover:bg-tbank-gray-100 transition-all font-medium"
        >
          Начать заново
        </button>
      )}

      {/* Credit Card Modal */}
      <CreditCardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onReset={reset}
      />
    </div>
  );
}

