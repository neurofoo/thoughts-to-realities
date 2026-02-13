import { getDb } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM curriculum_progress ORDER BY week ASC").all() as Array<Record<string, unknown>>;
  return NextResponse.json(rows.map((r) => ({ week: r.week, completed: !!r.completed, completedAt: r.completed_at })));
}

export async function PUT(request: NextRequest) {
  const db = getDb();
  const { week, completed } = await request.json();
  db.prepare(
    `INSERT INTO curriculum_progress (week, completed, completed_at)
     VALUES (?, ?, ?)
     ON CONFLICT(week) DO UPDATE SET completed = excluded.completed, completed_at = excluded.completed_at`
  ).run(week, completed ? 1 : 0, completed ? new Date().toISOString() : null);
  return NextResponse.json({ ok: true });
}
