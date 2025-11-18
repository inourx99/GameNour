
import { GoogleGenAI, Type } from "@google/genai";
import { Scenario } from '../types';

const GEMINI_MODEL_NAME = "gemini-2.5-flash";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const schema = {
  type: Type.OBJECT,
  properties: {
    scenarioText: {
      type: Type.STRING,
      description: "A short, simple scenario in Arabic about a conflict or misunderstanding between two characters, suitable for a 6-8 year old child."
    },
    characterA: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "The name of the first character in Arabic (e.g., 'الأرنب السريع')." },
        emoji: { type: Type.STRING, description: "A single emoji representing the character (e.g., '🐰')." }
      },
      required: ['name', 'emoji']
    },
    characterB: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "The name of the second character in Arabic (e.g., 'السلحفاة الحكيمة')." },
        emoji: { type: Type.STRING, description: "A single emoji representing the character (e.g., '🐢')." }
      },
      required: ['name', 'emoji']
    },
    choices: {
      type: Type.ARRAY,
      description: "An array of exactly two choices for the player. One choice must be correct (tolerant/kind) and the other incorrect (intolerant/unkind).",
      items: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "The choice text in simple Arabic." },
          isCorrect: { type: Type.BOOLEAN, description: "Whether this choice represents the tolerant and correct action." },
          feedback: { type: Type.STRING, description: "A short feedback message in Arabic explaining the outcome of this choice." }
        },
        required: ['text', 'isCorrect', 'feedback']
      }
    }
  },
  required: ['scenarioText', 'characterA', 'characterB', 'choices']
};


export const generateScenario = async (): Promise<Scenario> => {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: "Generate a scenario for a children's game about tolerance. The target audience is 6-8 years old. The language must be simple Arabic. The scenario should involve a simple conflict or misunderstanding. Provide two clear choices: one that shows tolerance and kindness, and one that does not. Also provide feedback for each choice.",
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 1,
        topP: 0.95,
      },
    });

    const jsonText = response.text.trim();
    const scenarioData = JSON.parse(jsonText) as Scenario;

    // Ensure there is one correct and one incorrect choice
    const correctChoices = scenarioData.choices.filter(c => c.isCorrect).length;
    if (correctChoices !== 1 || scenarioData.choices.length !== 2) {
        console.error("Generated data does not have exactly one correct choice.", scenarioData);
        throw new Error("Invalid scenario structure from API.");
    }
    
    return scenarioData;
  } catch (error) {
    console.error("Error generating scenario with Gemini:", error);
    throw new Error("Failed to fetch a new scenario. Please try again.");
  }
};
