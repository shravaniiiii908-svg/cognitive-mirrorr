export enum SystemType {
  SYSTEM_1 = "System 1",
  SYSTEM_2 = "System 2"
}

export interface BrainRegion {
  id: string;
  name: string;
  description: string;
  activation: number; // 0 to 100
  color: string;
}

export interface CognitiveBias {
  id: string;
  name: string;
  description: string;
  frequency: number;
}

export interface DecisionPath {
  id: string;
  label: string;
  type: "doom" | "logic" | "growth";
  outcome: string;
}

export interface Session {
  id: string;
  userId: string;
  timestamp: number;
  rawDump: string;
  sys1Score: number;
  sys2Score: number;
  probes: string[];
  activeRegions: Record<string, number>;
  selectedPath: string;
  biases: string[];
  bodyEffects: {
    heartRate: string;
    adrenaline: string;
  };
}

export interface UserProfile {
  userId: string;
  email: string;
  therapistId?: string;
  createdAt: number;
  brainRegions: Record<string, number>;
  biasHistory: Record<string, number>;
}
