import React, { useMemo } from 'react';
import SudokuCell from './SudokuCell';
import { isBoxComplete } from '../utils/sudoku';

interface SudokuGridProps {
  puzzle: number[][];
  initialPuzzle: number[][];
  selectedCell: [number, number] | null;
  isChecking: boolean;
  validCells: boolean[][];
  onCellClick: (row: number, col: number) => void;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({
  puzzle,
  initialPuzzle,
  selectedCell,
  isChecking,
  validCells,
  onCellClick,
}) => {
  const completedBoxes = useMemo(() => {
    const completed = Array(9).fill(null).map(() => Array(9).fill(false));
    
    // Check each 3x3 box
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
      for (let boxCol = 0; boxCol < 9; boxCol += 3) {
        const isComplete = isBoxComplete(puzzle, boxRow, boxCol);
        // Mark all cells in this box
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            completed[boxRow + i][boxCol + j] = isComplete;
          }
        }
      }
    }
    return completed;
  }, [puzzle]);

  return (
    <div className="grid grid-cols-9 gap-0 border-2 border-gray-800">
      {puzzle.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
          const isInitial = initialPuzzle[rowIndex][colIndex] !== 0;
          
          // Add borders for 3x3 boxes
          const borderClasses = [
            colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2 border-r-gray-800' : '',
            rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2 border-b-gray-800' : '',
          ].join(' ');

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`aspect-square ${borderClasses}`}
            >
              <SudokuCell
                value={cell}
                isInitial={isInitial}
                isSelected={isSelected}
                isChecking={isChecking}
                isValid={validCells[rowIndex][colIndex]}
                isBoxComplete={completedBoxes[rowIndex][colIndex]}
                onClick={() => onCellClick(rowIndex, colIndex)}
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default SudokuGrid;
