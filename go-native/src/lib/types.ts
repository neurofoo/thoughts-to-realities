export type Tradition = "dzogchen" | "kashmir-shaivism" | "vajrayana" | "zen" | "yoga" | "hesychasm" | "synthesis";
export type Layer = "dissolution" | "reconfiguration" | "integration" | "shutdown";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export const TRADITIONS: Tradition[] = ["dzogchen", "kashmir-shaivism", "vajrayana", "zen", "yoga", "hesychasm", "synthesis"];

export const TRADITION_LABELS: Record<Tradition, string> = {
  dzogchen: "Dzogchen",
  "kashmir-shaivism": "Kashmir Shaivism",
  vajrayana: "Vajrayana",
  zen: "Zen",
  yoga: "Yoga",
  hesychasm: "Hesychasm",
  synthesis: "Synthesis",
};

export const TRADITION_COLORS: Record<Tradition, string> = {
  dzogchen: "#6366f1",
  "kashmir-shaivism": "#a855f7",
  vajrayana: "#ef4444",
  zen: "#22c55e",
  yoga: "#f97316",
  hesychasm: "#3b82f6",
  synthesis: "#eab308",
};

export const LAYER_LABELS: Record<Layer, string> = {
  dissolution: "Dissolution",
  reconfiguration: "Reconfiguration",
  integration: "Integration",
  shutdown: "Shutdown",
};

export const PHENOMENOLOGY_OPTIONS = [
  "stillness", "clarity", "warmth", "spaciousness",
  "energy", "bliss", "emptiness", "resistance",
  "sleepiness", "agitation", "insight", "unity",
];

export interface Practice {
  id: string;
  name: string;
  tradition: Tradition;
  layer: Layer;
  difficulty: Difficulty;
  duration: { min: number; max: number };
  instructions: string[];
  cyberpunkContext: string;
  warning?: string;
}

export interface Session {
  id: string;
  practiceId: string;
  tradition: string;
  duration: number;
  quality: number;
  notes: string;
  phenomenology: string[];
  timestamp: string;
}

export interface SessionStats {
  totalSessions: number;
  totalMinutes: number;
  traditionMinutes: Record<string, number>;
  practiceMinutes: Record<string, number>;
  currentStreak: number;
  longestStreak: number;
  calendarData: Record<string, number>;
}

export interface CurriculumWeek {
  week: number;
  title: string;
  focus: string;
  practices: string[];
}
