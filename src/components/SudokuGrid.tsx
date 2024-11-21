import SudokuCell from './SudokuCell';
import CompletedBoxOverlay from './CompletedBoxOverlay';
import { isBoxComplete } from '../utils/sudoku';
import React from "react";

interface SudokuGridProps {
  puzzle: number[][];
  initialPuzzle: number[][];
  selectedCell: [number, number] | null;
  isChecking: boolean;
  validCells: boolean[][];
  onCellClick: (row: number, col: number) => void;
  onCellChange?: (row: number, col: number, value: number) => void;
}

const SudokuGrid: React.FC<SudokuGridProps> = ({
  puzzle,
  initialPuzzle,
  selectedCell,
  isChecking,
  validCells,
  onCellClick,
}) => {
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

          // Only show overlay for top-left cell of each 3x3 box
          const isBoxTopLeft = rowIndex % 3 === 0 && colIndex % 3 === 0;
          const currentBoxComplete = isBoxTopLeft && isBoxComplete(puzzle, rowIndex, colIndex);

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`aspect-square relative ${borderClasses}`}
            >
              {isBoxTopLeft && currentBoxComplete ? (
                <div className="absolute inset-0 w-[300%] h-[300%] z-10">
                  <CompletedBoxOverlay />
                </div>
              ) : (
                <SudokuCell
                  value={cell}
                  isInitial={isInitial}
                  isSelected={isSelected}
                  isChecking={isChecking}
                  isValid={validCells[rowIndex][colIndex]}
                  onClick={() => onCellClick(rowIndex, colIndex)}
                  onChange={(value) => onCellChange?.(rowIndex, colIndex, value)}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SudokuGrid;
