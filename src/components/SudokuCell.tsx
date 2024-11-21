import React from 'react';

interface SudokuCellProps {
  value: number;
  isInitial: boolean;
  isSelected: boolean;
  isChecking: boolean;
  isValid: boolean;
  onClick: () => void;
}

const SudokuCell: React.FC<SudokuCellProps> = ({
  value,
  isInitial,
  isSelected,
  isChecking,
  isValid,
  onClick,
}) => {
  const getBackgroundColor = () => {
    if (isChecking && value !== 0) {
      return isValid ? 'bg-green-100' : 'bg-red-100';
    }
    return isSelected ? 'bg-blue-100' : 'hover:bg-gray-50';
  };

  return (
    <div
      className={`
        w-full h-full flex items-center justify-center
        border border-gray-200 cursor-pointer select-none
        transition-colors duration-200 text-2xl
        ${isInitial ? 'font-bold text-blue-600' : 'text-gray-700'}
        ${getBackgroundColor()}
      `}
      onClick={onClick}
      role="button"
    >
      {value !== 0 && value}
    </div>
  );
};

export default SudokuCell;
