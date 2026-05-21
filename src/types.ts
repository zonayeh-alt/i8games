export interface Character {
  id: string;
  name: string;
  title: string;
  gameName: string;
  avatarSeed: string; // Used for customized initials/styling fallback
  avatarUrl?: string; // Loaded dynamically or generated via Imagen/Gemini 2.5
  bio: string;
  voiceName: "Zephyr" | "Kore" | "Fenrir" | "Puck" | "Charon";
  personalityTraits: string[];
  systemPromptTemplate: string;
  stats: {
    combat: number;
    wisdom: number;
    intellect: number;
    stealth: number;
  };
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  loreContext: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  audioUrl?: string; // Playable blob URL
  latencyMs?: number; // Response telemetry
  simulated?: boolean; // Label whether fallback was triggered
}

export interface OrchestrationSettings {
  temperature: number;
  safetyLevel: "low" | "medium" | "high";
  showPromptEditor: boolean;
  activeScenarioId: string;
  autoSpeak: boolean;
  systemPromptOverride: string;
}

export interface LogEntry {
  timestamp: string;
  type: "info" | "api" | "error" | "voice";
  message: string;
}
