
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-6xl animate-spin">☀️</div>
      <p className="text-xl text-yellow-700 font-bold">لحظة من فضلك، نُحضر لك سؤالاً جديداً...</p>
    </div>
  );
};

export default LoadingSpinner;
