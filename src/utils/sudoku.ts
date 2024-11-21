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

  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) {
      grid[row][col] = originalValue;
      return false;
    }
  }

  // Check column
  for (let y = 0; y < 9; y++) {
    if (grid[y][col] === num) {
      grid[row][col] = originalValue;
      return false;
    }
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
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
  const value = grid[row][col];
  if (value === 0) return true; // Empty cells are neither correct nor incorrect
  return isValid(grid, row, col, value);
};