
import React from 'react';
import type { Choice } from '../types';

interface ChoiceButtonProps {
  choice: Choice;
  onClick: (choice: Choice) => void;
  disabled: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice, onClick, disabled }) => {
  return (
    <button
      onClick={() => onClick(choice)}
      disabled={disabled}
      className="w-full md:w-2/5 bg-white border-4 border-blue-400 rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 hover:bg-blue-50 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <p className="text-xl md:text-2xl font-semibold text-gray-800">{choice.text}</p>
    </button>
  );
};

export default ChoiceButton;
