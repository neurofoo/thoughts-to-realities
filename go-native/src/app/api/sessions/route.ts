import { getDb } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const db = getDb();
  const url = new URL(request.url);
  const tradition = url.searchParams.get("tradition");
  const practiceId = url.searchParams.get("practiceId");

  let query = "SELECT * FROM sessions";
  const conditions: string[] = [];
  const params: string[] = [];

  if (tradition) { conditions.push("tradition = ?"); params.push(tradition); }
  if (practiceId) { conditions.push("practice_id = ?"); params.push(practiceId); }

  if (conditions.length > 0) query += " WHERE " + conditions.join(" AND ");
  query += " ORDER BY timestamp DESC";

  const rows = db.prepare(query).all(...params) as Array<Record<string, unknown>>;

  const sessions = rows.map((row) => ({
    id: row.id,
    practiceId: row.practice_id,
    tradition: row.tradition,
    duration: row.duration,
    quality: row.quality,
    notes: row.notes,
    phenomenology: JSON.parse((row.phenomenology as string) || "[]"),
    timestamp: row.timestamp,
  }));

  return NextResponse.json(sessions);
}

export async function POST(request: NextRequest) {
  const db = getDb();
  const body = await request.json();
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();

  db.prepare(
    `INSERT INTO sessions (id, practice_id, tradition, duration, quality, notes, phenomenology, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    body.practiceId,
    body.tradition,
    body.duration,
    body.quality ?? 3,
    body.notes ?? "",
    JSON.stringify(body.phenomenology ?? []),
    timestamp
  );

  return NextResponse.json({ id, timestamp }, { status: 201 });
}
