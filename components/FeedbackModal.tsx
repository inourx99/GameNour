
import React from 'react';

interface FeedbackModalProps {
  isCorrect: boolean;
  feedbackText: string;
  onNext: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isCorrect, feedbackText, onNext }) => {
  const bgColor = isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
  const textColor = isCorrect ? 'text-green-800' : 'text-red-800';
  const buttonColor = isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';
  const emoji = isCorrect ? '😊' : '🤔';
  const title = isCorrect ? 'أحسنت!' : 'حاول مرة أخرى!';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`relative w-full max-w-lg rounded-3xl p-8 border-4 shadow-2xl transform transition-all duration-300 scale-100 ${bgColor}`}>
        <div className="text-center">
          <div className="text-7xl mb-4">{emoji}</div>
          <h2 className={`text-4xl font-bold mb-3 ${textColor}`}>{title}</h2>
          <p className="text-xl text-gray-700 mb-8">{feedbackText}</p>
          <button
            onClick={onNext}
            className={`w-full text-white font-bold py-4 px-6 rounded-xl text-2xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${buttonColor} ${isCorrect ? 'focus:ring-green-300' : 'focus:ring-red-300'}`}
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
