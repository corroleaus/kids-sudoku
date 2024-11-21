// Sudoku generator and solver utilities
export const generateSudoku = (difficulty: number = 0.4): number[][] => {
  const grid = Array(9).fill(null).map(() => Array(9).fill(0));
  fillGrid(grid);
  removeNumbers(grid, difficulty);
  return grid;
};

const fillGrid = (grid: number[][]): boolean => {
  const emptyCell = findEmptyCell(grid);
  if (!emptyCell) return true;

  const [row, col] = emptyCell;
  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (const num of numbers) {
    if (isValid(grid, row, col, num)) {
      grid[row][col] = num;
      if (fillGrid(grid)) return true;
      grid[row][col] = 0;
    }
  }

  return false;
};

const findEmptyCell = (grid: number[][]): [number, number] | null => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) return [row, col];
    }
  }
  return null;
};

export const isValid = (grid: number[][], row: number, col: number, num: number): boolean => {
  // Temporarily remove the number we're checking to avoid self-comparison
  const originalValue = grid[row][col];
  grid[row][col] = 0;

  // Only check within the current 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  // Check if number exists in current 3x3 box
  for (let y = boxRow; y < boxRow + 3; y++) {
    for (let x = boxCol; x < boxCol + 3; x++) {
      if (grid[y][x] === num) {
        grid[row][col] = originalValue;
        return false;
      }
    }
  }

  // Restore the original value and return true if all checks passed
  grid[row][col] = originalValue;
  return true;
};

const removeNumbers = (grid: number[][], difficulty: number) => {
  const cellsToRemove = Math.floor(81 * difficulty);
  let removed = 0;

  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (grid[row][col] !== 0) {
      grid[row][col] = 0;
      removed++;
    }
  }
};

const shuffle = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const isSolved = (grid: number[][]): boolean => {
  // Check if all cells are filled and valid
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = grid[row][col];
      if (value === 0) return false;
      
      // Temporarily remove the current number to check if it's valid
      const temp = grid[row][col];
      grid[row][col] = 0;
      const valid = isValid(grid, row, col, temp);
      grid[row][col] = temp;
      
      if (!valid) return false;
    }
  }
  return true;
};

export const validateCell = (grid: number[][], row: number, col: number): boolean => {
  // Get the top-left position of the 3x3 box containing this cell
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  // Check if any number appears more than once in the 3x3 box
  const numbers = new Set<number>();
  const nonZeroCount = new Set<number>();
  
  for (let y = boxRow; y < boxRow + 3; y++) {
    for (let x = boxCol; x < boxCol + 3; x++) {
      const value = grid[y][x];
      if (value !== 0) {
        if (numbers.has(value)) {
          // If we find a duplicate, the entire box is invalid
          return false;
        }
        numbers.add(value);
        nonZeroCount.add(value);
      }
    }
  }
  
  // The box is valid if we haven't found any duplicates
  return true;
};
