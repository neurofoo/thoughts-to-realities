import { getDb } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = getDb();
  const row = db.prepare("SELECT * FROM sessions WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    id: row.id,
    practiceId: row.practice_id,
    tradition: row.tradition,
    duration: row.duration,
    quality: row.quality,
    notes: row.notes,
    phenomenology: JSON.parse((row.phenomenology as string) || "[]"),
    timestamp: row.timestamp,
  });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = getDb();
  db.prepare("DELETE FROM sessions WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}
