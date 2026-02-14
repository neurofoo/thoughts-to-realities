"use client";

import { useState, useMemo } from "react";
import { useSessions, useDeleteSession, useSessionStats } from "@/lib/queries";
import { getPracticeById } from "@/lib/practices";
import { TRADITION_COLORS, type Tradition } from "@/lib/types";

/**
 * MISSION LOG — 90-day heatmap fills the screen.
 * Click a day to see sessions below.
 * Export button top-right.
 */

export default function MissionLog() {
  const { data: sessions } = useSessions();
  const { data: stats } = useSessionStats();
  const deleteSession = useDeleteSession();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const calendar = useMemo(() => {
    const days: { date: string; minutes: number; dow: number }[] = [];
    const today = new Date();
    for (let i = 89; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      days.push({
        date: dateStr,
        minutes: stats?.calendarData?.[dateStr] ?? 0,
        dow: d.getDay(),
      });
    }
    return days;
  }, [stats]);

  const weeks = useMemo(() => {
    const w: typeof calendar[] = [];
    let current: typeof calendar = [];
    if (calendar.length > 0) {
      for (let i = 0; i < calendar[0].dow; i++) {
        current.push({ date: "", minutes: 0, dow: i });
      }
    }
    for (const day of calendar) {
      current.push(day);
      if (current.length === 7) {
        w.push(current);
        current = [];
      }
    }
    if (current.length > 0) w.push(current);
    return w;
  }, [calendar]);

  const maxMinutes = Math.max(1, ...calendar.map((d) => d.minutes));

  const daySessions = selectedDate
    ? sessions?.filter((s) => s.timestamp.startsWith(selectedDate)) ?? []
    : [];

  return (
    <div className="screen !overflow-y-auto">
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-8 pt-8 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-white">Mission Log</h1>
          <p className="font-mono text-xs text-zinc-500 mt-1">
            {sessions?.length ?? 0} sessions &middot; last 90 days
          </p>
        </div>
        {sessions && sessions.length > 0 && (
          <button
            onClick={() => {
              const blob = new Blob([JSON.stringify(sessions, null, 2)], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `thought-protocols-${new Date().toISOString().split("T")[0]}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            export
          </button>
        )}
      </div>

      {/* Heatmap centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8">
        <div className="flex gap-1 animate-fade-in-up">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => {
                if (!day.date) {
                  return <div key={di} className="w-4 h-4 sm:w-5 sm:h-5" />;
                }
                const intensity = day.minutes > 0 ? Math.max(0.2, day.minutes / maxMinutes) : 0;
                const isSelected = selectedDate === day.date;
                return (
                  <button
                    key={di}
                    onClick={() => setSelectedDate(isSelected ? null : day.date)}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm transition-all hover:scale-125"
                    style={{
                      backgroundColor: day.minutes > 0
                        ? `rgba(245,158,11,${intensity})`
                        : "rgba(255,255,255,0.04)",
                      boxShadow: isSelected
                        ? "0 0 0 2px rgba(245,158,11,0.6)"
                        : day.minutes > 0
                          ? `0 0 ${intensity * 6}px rgba(245,158,11,${intensity * 0.4})`
                          : "none",
                    }}
                    title={`${day.date}: ${day.minutes}m`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Day detail */}
        {selectedDate && (
          <div className="animate-fade-in text-center max-w-sm">
            <p className="font-mono text-sm text-zinc-400 mb-4">
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </p>
            {daySessions.length === 0 ? (
              <p className="font-mono text-xs text-zinc-500">No sessions</p>
            ) : (
              <div className="space-y-3">
                {daySessions.map((s) => {
                  const p = getPracticeById(s.practiceId);
                  const c = TRADITION_COLORS[s.tradition as Tradition];
                  return (
                    <div key={s.id} className="flex items-center gap-3 font-mono text-xs">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                      <span className="text-zinc-300">{p?.name ?? s.practiceId}</span>
                      <span className="text-zinc-500">{s.duration}m</span>
                      <span className="text-zinc-500">Q{s.quality}</span>
                      <span style={{ color: c }}>+{s.duration}</span>
                      <button
                        onClick={() => { if (confirm("Delete?")) deleteSession.mutate(s.id); }}
                        className="text-zinc-600 hover:text-red-400 transition-colors ml-auto"
                      >
                        &times;
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
