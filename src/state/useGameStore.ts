import { create } from 'zustand';
import type { Symbol } from '../lib/rng';

export interface GameState {
  balance: number;
  bet: number;
  isSpinning: boolean;
  reels: Symbol[][];
  lastResult: {
    won: boolean;
    amount: number;
    message: string;
  } | null;
  winChance: number; // 0-100, шанс выигрыша в процентах
  isDarkMode: boolean;
  
  // Actions
  setBet: (bet: number) => void;
  setBalance: (balance: number) => void;
  setIsSpinning: (isSpinning: boolean) => void;
  setReels: (reels: Symbol[][]) => void;
  setLastResult: (result: GameState['lastResult']) => void;
  setWinChance: (chance: number) => void;
  setDarkMode: (isDark: boolean) => void;
  toggleDarkMode: () => void;
  deductBet: () => boolean;
  addWinnings: (amount: number) => void;
  reset: () => void;
}

const INITIAL_BALANCE = 1000;
const DEFAULT_BET = 10;

export const useGameStore = create<GameState>((set, get) => ({
  balance: INITIAL_BALANCE,
  bet: DEFAULT_BET,
  isSpinning: false,
  reels: [['🍒', '🍋', '💎'], ['⭐️', '🔔', '7️⃣'], ['🍒', '🍋', '💎']],
  lastResult: null,
  winChance: 15, // По умолчанию 15% шанс выигрыша
  isDarkMode: false,

  setBet: (bet) => set({ bet }),
  
  setBalance: (balance) => set({ balance }),
  
  setIsSpinning: (isSpinning) => set({ isSpinning }),
  
  setReels: (reels) => set({ reels }),
  
  setLastResult: (result) => set({ lastResult: result }),
  
  setWinChance: (chance) => set({ winChance: Math.max(0, Math.min(100, chance)) }),
  
  setDarkMode: (isDark) => set({ isDarkMode: isDark }),
  
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  deductBet: () => {
    const { balance, bet } = get();
    if (balance >= bet) {
      set({ balance: balance - bet });
      return true;
    }
    return false;
  },
  
  addWinnings: (amount) => {
    const { balance } = get();
    set({ balance: balance + amount });
  },
  
  reset: () => set({
    balance: INITIAL_BALANCE,
    bet: DEFAULT_BET,
    isSpinning: false,
    lastResult: null,
  }),
}));

