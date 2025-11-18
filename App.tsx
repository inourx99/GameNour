
import React, { useState, useCallback } from 'react';
import type { Scenario, Choice, GameState } from './types';
import { generateScenario } from './services/geminiService';
import ScenarioCard from './components/ScenarioCard';
import ChoiceButton from './components/ChoiceButton';
import FeedbackModal from './components/FeedbackModal';
import LoadingSpinner from './components/LoadingSpinner';

const TOTAL_LEVELS = 5;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNewScenario = useCallback(async () => {
    setGameState('loading');
    setError(null);
    try {
      const scenario = await generateScenario();
      setCurrentScenario(scenario);
      setGameState('playing');
    } catch (err) {
      setError((err as Error).message || 'An unknown error occurred.');
      setGameState('error');
    }
  }, []);

  const handleStartGame = () => {
    setScore(0);
    setLevel(1);
    fetchNewScenario();
  };
  
  const handleChoice = (choice: Choice) => {
    if (choice.isCorrect) {
      setScore(prev => prev + 1);
    }
    setFeedback({ text: choice.feedback, isCorrect: choice.isCorrect });
    setGameState('feedback');
  };

  const handleNext = () => {
    setFeedback(null);
    if (level < TOTAL_LEVELS) {
      setLevel(prev => prev + 1);
      fetchNewScenario();
    } else {
      setGameState('end');
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case 'start':
        return (
          <div className="text-center bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border-2 border-white">
            <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-4">رحلة التسامح</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">مرحباً بك في مغامرة لتعلم التسامح واللطف! هل أنت مستعد لمساعدة أصدقائنا على اتخاذ الخيارات الصحيحة؟</p>
            <button
              onClick={handleStartGame}
              className="bg-yellow-400 text-yellow-900 font-bold text-3xl py-4 px-12 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              ابدأ اللعبة!
            </button>
          </div>
        );
      case 'loading':
        return <LoadingSpinner />;
      case 'playing':
        return currentScenario && (
          <div className="w-full flex flex-col items-center space-y-10">
            <div className="text-2xl font-bold bg-white px-6 py-2 rounded-full shadow-md text-blue-700">السؤال {level} / {TOTAL_LEVELS}</div>
            <ScenarioCard scenario={currentScenario} />
            <div className="w-full max-w-4xl flex flex-col md:flex-row justify-around items-center gap-6 pt-6">
              {currentScenario.choices.map((choice, index) => (
                <ChoiceButton key={index} choice={choice} onClick={handleChoice} disabled={false} />
              ))}
            </div>
          </div>
        );
      case 'feedback':
        return feedback && (
          <>
            {/* Keep the playing screen in the background for context */}
            {currentScenario && (
             <div className="w-full flex flex-col items-center space-y-10 opacity-30">
                <div className="text-2xl font-bold bg-white px-6 py-2 rounded-full shadow-md text-blue-700">السؤال {level} / {TOTAL_LEVELS}</div>
                <ScenarioCard scenario={currentScenario} />
                 <div className="w-full max-w-4xl flex flex-col md:flex-row justify-around items-center gap-6 pt-6">
                   {currentScenario.choices.map((choice, index) => (
                    <ChoiceButton key={index} choice={choice} onClick={() => {}} disabled={true} />
                  ))}
                </div>
              </div>
            )}
            <FeedbackModal
              isCorrect={feedback.isCorrect}
              feedbackText={feedback.text}
              onNext={handleNext}
            />
          </>
        );
      case 'end':
        return (
          <div className="text-center bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border-2 border-white">
            <h1 className="text-5xl font-bold text-green-600 mb-4">🎉 رائع! 🎉</h1>
            <p className="text-3xl text-gray-800 mb-6">لقد أكملت رحلة التسامح!</p>
            <p className="text-4xl font-bold bg-yellow-200 text-yellow-800 rounded-full py-4 px-8 mb-8 inline-block">
              نتيجتك: {score} من {TOTAL_LEVELS}
            </p>
            <p className="text-xl text-gray-600 mb-8">
              {score > 3 ? "أنت بطل في التسامح! استمر في نشر اللطف." : "لقد تعلمت الكثير! كل خطوة هي بداية جديدة."}
            </p>
            <button
              onClick={handleStartGame}
              className="bg-blue-500 text-white font-bold text-2xl py-4 px-10 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              العب مرة أخرى
            </button>
          </div>
        );
       case 'error':
        return (
           <div className="text-center bg-red-100 p-10 rounded-3xl shadow-xl border-2 border-red-300">
            <h1 className="text-5xl font-bold text-red-600 mb-4">حدث خطأ ما</h1>
            <p className="text-xl text-red-800 mb-8">{error}</p>
            <button
              onClick={handleStartGame}
              className="bg-red-500 text-white font-bold text-2xl py-4 px-10 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              حاول مجدداً
            </button>
          </div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-200 to-indigo-300 w-full flex items-center justify-center p-4">
      {renderContent()}
    </main>
  );
};

export default App;
