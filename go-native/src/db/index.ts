import Database from "better-sqlite3";
import path from "path";

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (_db) return _db;

  const dbPath = path.join(process.cwd(), "go-native.db");
  _db = new Database(dbPath);
  _db.pragma("journal_mode = WAL");

  _db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      practice_id TEXT NOT NULL,
      tradition TEXT NOT NULL,
      duration INTEGER NOT NULL,
      quality INTEGER NOT NULL DEFAULT 3,
      notes TEXT DEFAULT '',
      phenomenology TEXT DEFAULT '[]',
      timestamp TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  _db.exec(`
    CREATE TABLE IF NOT EXISTS curriculum_progress (
      week INTEGER PRIMARY KEY,
      completed INTEGER NOT NULL DEFAULT 0,
      completed_at TEXT
    )
  `);

  return _db;
}
