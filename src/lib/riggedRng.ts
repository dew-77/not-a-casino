import { getRandomInt, SYMBOLS, type Symbol } from './rng';

/**
 * Generate rigged reels based on win chance
 */
export function generateRiggedReels(winChance: number): Symbol[][] {
  const shouldWin = Math.random() * 100 < winChance;
  
  if (shouldWin) {
    // Генерируем выигрышную комбинацию
    const winningSymbol = SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)];
    const winType = getRandomInt(0, 4); // 0-4 для разных типов выигрышей
    
    switch (winType) {
      case 0: // Средний ряд
        return [
          [SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], winningSymbol, SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)]],
          [SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], winningSymbol, SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)]],
          [SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], winningSymbol, SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)]],
        ];
      case 1: // Верхний ряд
        return [
          [winningSymbol, SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)]],
          [winningSymbol, SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)]],
          [winningSymbol, SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)]],
        ];
      case 2: // Нижний ряд
        return [
          [SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], winningSymbol],
          [SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], winningSymbol],
          [SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], winningSymbol],
        ];
      case 3: // Диагональ 1
        return [
          [winningSymbol, SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)]],
          [SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], winningSymbol, SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)]],
          [SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], winningSymbol],
        ];
      case 4: // Диагональ 2
        return [
          [SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], winningSymbol],
          [SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], winningSymbol, SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)]],
          [winningSymbol, SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)], SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)]],
        ];
      default:
        return generateRandomReels();
    }
  } else {
    // Генерируем проигрышную комбинацию
    return generateRandomReels();
  }
}

function generateRandomReels(): Symbol[][] {
  return [
    [
      SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)],
      SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)],
      SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)],
    ],
    [
      SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)],
      SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)],
      SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)],
    ],
    [
      SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)],
      SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)],
      SYMBOLS[getRandomInt(0, SYMBOLS.length - 1)],
    ],
  ];
}

