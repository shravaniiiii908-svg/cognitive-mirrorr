import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export interface AnalysisResult {
  sys1: {
    label: string;
    description: string;
    score: number;
    questions: string[]; // 2 questions for System 1
  };
  sys2: {
    label: string;
    description: string;
    score: number;
    questions: string[]; // 2 questions for System 2
  };
  brainRegions: {
    amygdala: number;
    prefrontalCortex: number;
    hippocampus: number;
    insula: number;
    anteriorCingulate: number;
    nucleusAccumbens: number;
  };
  decisionPaths: {
    label: string;
    type: "doom" | "logic" | "growth";
    outcome: string;
  }[];
  biases: string[];
  bodyEffects: {
    heartRate: string;
    adrenaline: string;
  };
}

export async function analyzeMindDump(dump: string): Promise<AnalysisResult> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: [
        {
          text: `Analyze the following mind dump and provide a structured cognitive analysis.
          
          Mind Dump:
          """
          ${dump}
          """
          
          Tasks:
          1. Identify System 1 (instinctive/emotional) and System 2 (deliberative/logical) components.
          2. Generate 2 specific questions for System 1 (emotional/gut-check) and 2 specific questions for System 2 (logical/analytical) to help the user reframe.
          3. Predict brain region activation levels (0-100) based on the emotional intensity and logical complexity.
          4. Create 3 predictive decision paths: 
             - "doom": the worst-case emotional spiral
             - "logic": a balanced, rational approach
             - "growth": the best-case transformative outcome
          5. Detect common cognitive biases (e.g., catastrophizing, overgeneralization).
          6. Predict somatic/body effects (heart rate, adrenaline).`
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sys1: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                description: { type: Type.STRING },
                score: { type: Type.NUMBER },
                questions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Exactly 2 questions targeting System 1 emotions"
                }
              },
              required: ["label", "description", "score", "questions"]
            },
            sys2: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                description: { type: Type.STRING },
                score: { type: Type.NUMBER },
                questions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Exactly 2 questions targeting System 2 logic"
                }
              },
              required: ["label", "description", "score", "questions"]
            },
            brainRegions: {
              type: Type.OBJECT,
              properties: {
                amygdala: { type: Type.NUMBER },
                prefrontalCortex: { type: Type.NUMBER },
                hippocampus: { type: Type.NUMBER },
                insula: { type: Type.NUMBER },
                anteriorCingulate: { type: Type.NUMBER },
                nucleusAccumbens: { type: Type.NUMBER }
              },
              required: ["amygdala", "prefrontalCortex", "hippocampus", "insula", "anteriorCingulate", "nucleusAccumbens"]
            },
            decisionPaths: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ["doom", "logic", "growth"] },
                  outcome: { type: Type.STRING }
                },
                required: ["label", "type", "outcome"]
              }
            },
            biases: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            bodyEffects: {
              type: Type.OBJECT,
              properties: {
                heartRate: { type: Type.STRING },
                adrenaline: { type: Type.STRING }
              },
              required: ["heartRate", "adrenaline"]
            }
          },
          required: ["sys1", "sys2", "brainRegions", "decisionPaths", "biases", "bodyEffects"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI model");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}
