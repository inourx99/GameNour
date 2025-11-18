
import React from 'react';
import type { Scenario } from '../types';

interface ScenarioCardProps {
  scenario: Scenario;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 w-full max-w-4xl border-2 border-white">
      <div className="flex justify-around items-center mb-6 text-5xl md:text-7xl">
        <div className="flex flex-col items-center">
          <span className="mb-2">{scenario.characterA.emoji}</span>
          <p className="text-lg font-bold text-gray-700">{scenario.characterA.name}</p>
        </div>
        <div className="text-4xl text-gray-500">&</div>
        <div className="flex flex-col items-center">
          <span className="mb-2">{scenario.characterB.emoji}</span>
          <p className="text-lg font-bold text-gray-700">{scenario.characterB.name}</p>
        </div>
      </div>
      <p className="text-2xl md:text-3xl text-center text-gray-800 leading-relaxed">
        {scenario.scenarioText}
      </p>
    </div>
  );
};

export default ScenarioCard;
