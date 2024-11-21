import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Sparkles, RotateCcw, Trophy, CheckCircle } from 'lucide-react';
import { generateSudoku, isSolved, validateCell } from './utils/sudoku';
import SudokuGrid from './components/SudokuGrid';

function App() {
  const [puzzle, setPuzzle] = useState<number[][]>(Array(9).fill(Array(9).fill(0)));
  const [initialPuzzle, setInitialPuzzle] = useState<number[][]>(Array(9).fill(Array(9).fill(0)));
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [validCells, setValidCells] = useState<boolean[][]>(Array(9).fill(Array(9).fill(true)));
  const inputRef = useRef<HTMLInputElement>(null);

  const initializeGame = useCallback(() => {
    const newPuzzle = generateSudoku(0.4); // 40% cells removed for easier difficulty
    // Create deep copies to avoid reference issues
    setPuzzle(newPuzzle.map(row => [...row]));
    setInitialPuzzle(newPuzzle.map(row => [...row]));
    setSelectedCell(null);
    setIsComplete(false);
    setIsChecking(false);
    setValidCells(Array(9).fill(Array(9).fill(true)));
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleNumberInput = useCallback((number: number) => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    
    // Don't modify initial cells
    if (initialPuzzle[row][col] !== 0) return;

    // Create a deep copy of the puzzle
    const newPuzzle = puzzle.map(row => [...row]);
    newPuzzle[row][col] = number;
    setPuzzle(newPuzzle);

    // Check if puzzle is complete
    if (isSolved(newPuzzle)) {
      setIsComplete(true);
    }
  }, [selectedCell, puzzle, initialPuzzle]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!selectedCell) return;
    
    if (e.key >= '1' && e.key <= '9') {
      handleNumberInput(parseInt(e.key, 10));
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      handleNumberInput(0);
    }
  }, [selectedCell, handleNumberInput]);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
    inputRef.current?.focus();
  };

  const handleCheckProgress = () => {
    setIsChecking(true);
    
    // Initialize validation grid
    const newValidCells = Array(9).fill(null).map(() => Array(9).fill(true));
    
    // Check each 3x3 box
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
      for (let boxCol = 0; boxCol < 9; boxCol += 3) {
        // Get validation result for this box
        const isBoxValid = validateCell(puzzle, boxRow, boxCol);
        
        // Apply the result to all cells in this box
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            newValidCells[boxRow + i][boxCol + j] = isBoxValid;
          }
        }
      }
    }
    
    setValidCells(newValidCells);

    // Hide validation after 3 seconds
    setTimeout(() => {
      setIsChecking(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            Kid's Sudoku
            <Sparkles className="inline-block ml-2 h-8 w-8" />
          </h1>
          <p className="text-gray-600">Fill in the numbers 1-9 in each row, column, and box!</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="max-w-md mx-auto relative">
            <input
              ref={inputRef}
              type="text"
              className="opacity-0 absolute -z-10"
              onKeyDown={handleKeyDown}
              aria-hidden="true"
            />
            <SudokuGrid
              puzzle={puzzle}
              initialPuzzle={initialPuzzle}
              selectedCell={selectedCell}
              isChecking={isChecking}
              validCells={validCells}
              onCellClick={handleCellClick}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleCheckProgress}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <CheckCircle className="h-5 w-5" />
            Check Progress
          </button>
          <button
            onClick={initializeGame}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <RotateCcw className="h-5 w-5" />
            New Game
          </button>
        </div>

        {isComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 text-center animate-bounce">
              <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Congratulations! 🎉
              </h2>
              <p className="text-gray-600 mb-6">You solved the puzzle!</p>
              <button
                onClick={initializeGame}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
