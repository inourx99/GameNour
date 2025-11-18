
export interface Choice {
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface Scenario {
  scenarioText: string;
  characterA: {
    name: string;
    emoji: string;
  };
  characterB: {
    name: string;
    emoji: string;
  };
  choices: [Choice, Choice];
}

export type GameState = 'start' | 'loading' | 'playing' | 'feedback' | 'end' | 'error';
