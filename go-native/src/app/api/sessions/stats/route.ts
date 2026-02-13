import { getDb } from "@/db/index";
import { NextResponse } from "next/server";

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM sessions ORDER BY timestamp DESC").all() as Array<Record<string, unknown>>;

  const traditionMinutes: Record<string, number> = {};
  const practiceMinutes: Record<string, number> = {};
  const calendarData: Record<string, number> = {};
  let totalMinutes = 0;

  for (const row of rows) {
    const dur = row.duration as number;
    const tradition = row.tradition as string;
    const practiceId = row.practice_id as string;
    const day = (row.timestamp as string).split("T")[0];

    totalMinutes += dur;
    traditionMinutes[tradition] = (traditionMinutes[tradition] ?? 0) + dur;
    practiceMinutes[practiceId] = (practiceMinutes[practiceId] ?? 0) + dur;
    calendarData[day] = (calendarData[day] ?? 0) + dur;
  }

  // Streak calculation
  const days = [...new Set(rows.map((r) => (r.timestamp as string).split("T")[0]))].sort().reverse();
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  const today = new Date().toISOString().split("T")[0];

  if (days.length > 0) {
    const checkDate = new Date(today);
    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split("T")[0];
      if (days.includes(dateStr)) {
        tempStreak++;
        if (i <= 1 || currentStreak > 0) currentStreak = tempStreak;
      } else if (i > 0) {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 0;
        if (currentStreak > 0 && i > 1) break;
      }
      checkDate.setDate(checkDate.getDate() - 1);
    }
    longestStreak = Math.max(longestStreak, tempStreak);
  }

  return NextResponse.json({
    totalSessions: rows.length,
    totalMinutes,
    traditionMinutes,
    practiceMinutes,
    currentStreak,
    longestStreak,
    calendarData,
  });
}
