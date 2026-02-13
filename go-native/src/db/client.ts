import Dexie, { type EntityTable } from "dexie";

export interface SessionRecord {
  id: string;
  practiceId: string;
  tradition: string;
  duration: number;
  quality: number;
  notes: string;
  phenomenology: string[];
  timestamp: string;
}

export interface CurriculumRecord {
  week: number;
  completed: boolean;
  completedAt: string | null;
}

const db = new Dexie("go-native") as Dexie & {
  sessions: EntityTable<SessionRecord, "id">;
  curriculum: EntityTable<CurriculumRecord, "week">;
};

db.version(1).stores({
  sessions: "id, practiceId, tradition, timestamp",
  curriculum: "week",
});

export { db };
