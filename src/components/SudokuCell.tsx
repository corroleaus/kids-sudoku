import React from 'react';

interface SudokuCellProps {
  value: number;
  isInitial: boolean;
  isSelected: boolean;
  isChecking: boolean;
  isValid: boolean;
  onClick: () => void;
  onChange?: (value: number) => void;
}

const SudokuCell: React.FC<SudokuCellProps> = ({
  value,
  isInitial,
  isSelected,
  isChecking,
  isValid,
  onClick,
  onChange,
}) => {
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? 0 : parseInt(e.target.value.slice(-1), 10);
    if (onChange && (newValue >= 0 && newValue <= 9)) {
      onChange(newValue);
    }
  };
  const getBackgroundColor = () => {
    if (isChecking && value !== 0) {
      return isValid ? 'bg-green-100' : 'bg-red-100';
    }
    return isSelected ? 'bg-blue-100' : 'hover:bg-gray-50';
  };

  return (
    <>
      {isInitial || !isTouchDevice ? (
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
      ) : (
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          min="1"
          max="9"
          value={value === 0 ? '' : value}
          onChange={handleChange}
          className={`
            w-full h-full text-center text-2xl
            border border-gray-200 select-none
            transition-colors duration-200
            ${getBackgroundColor()}
            ${isInitial ? 'font-bold text-blue-600' : 'text-gray-700'}
          `}
        />
      )}
    </>
  );
};

export default SudokuCell;
