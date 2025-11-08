import { motion } from 'framer-motion';
import type { Symbol } from '../lib/rng';
import { useGameStore } from '../state/useGameStore';

interface ReelProps {
  symbols: Symbol[];
  isSpinning: boolean;
  delay: number;
}

export function Reel({ symbols, isSpinning, delay }: ReelProps) {
  const { isDarkMode } = useGameStore();
  
  return (
    <div className="flex flex-col gap-2">
      {symbols.map((symbol, index) => (
        <motion.div
          key={index}
          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl border shadow-tbank transition-colors ${
            isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-tbank-gray-50 border-tbank-gray-100'
          }`}
          animate={isSpinning ? {
            y: [0, -300],
            rotate: [0, 360],
          } : {
            y: 0,
            rotate: 0,
          }}
          transition={{
            duration: isSpinning ? 0.15 : 0.5,
            repeat: isSpinning ? Infinity : 0,
            ease: isSpinning ? 'linear' : 'easeOut',
            delay: isSpinning ? delay * 0.1 : delay * 0.2,
          }}
        >
          <span>{symbol}</span>
        </motion.div>
      ))}
    </div>
  );
}

