/**
 * Cryptographically secure random number generator
 */
export function getRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  const bytes = Math.ceil(Math.log2(range) / 8);
  const maxValue = Math.pow(256, bytes);
  const randomValues = new Uint8Array(bytes);
  
  let randomNumber: number;
  do {
    crypto.getRandomValues(randomValues);
    randomNumber = 0;
    for (let i = 0; i < bytes; i++) {
      randomNumber = randomNumber * 256 + randomValues[i];
    }
  } while (randomNumber >= maxValue - (maxValue % range));
  
  return min + (randomNumber % range);
}

export type Symbol = '🍒' | '🍋' | '💎' | '⭐️' | '🔔' | '7️⃣';

export const SYMBOLS: Symbol[] = ['🍒', '🍋', '💎', '⭐️', '🔔', '7️⃣'];

/**
 * Get a random symbol from the symbols array
 */
export function getRandomSymbol(): Symbol {
  const index = getRandomInt(0, SYMBOLS.length - 1);
  return SYMBOLS[index];
}

/**
 * Generate a random reel column (3 symbols)
 */
export function generateReel(): Symbol[] {
  return [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
}

/**
 * Generate all 3 reels (3x3 grid)
 */
export function generateReels(): Symbol[][] {
  return [generateReel(), generateReel(), generateReel()];
}

