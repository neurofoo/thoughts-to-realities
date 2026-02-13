"use client";

import { curriculum } from "@/lib/curriculum";
import { useCurriculumProgress, useToggleCurriculumWeek } from "@/lib/queries";
import { getPracticeById } from "@/lib/practices";
import { TRADITION_COLORS } from "@/lib/types";
import { useState } from "react";
import Link from "next/link";

/**
 * QUEST LINE — 13 weeks as a vertical sequence.
 *
 * Current week is highlighted and expanded.
 * Completed weeks are dimmed. Future weeks are locked.
 * Click to expand any week.
 */

export default function QuestLine() {
  const { data: progress } = useCurriculumProgress();
  const toggleWeek = useToggleCurriculumWeek();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const completedWeeks = new Set(
    progress?.filter((p) => p.completed).map((p) => p.week) ?? []
  );
  const currentWeek =
    curriculum.find((w) => !completedWeeks.has(w.week))?.week ?? curriculum.length + 1;

  return (
    <div className="screen !overflow-y-auto">
      {/* Header */}
      <div className="px-8 pt-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-white">Training Path</h1>
        <p className="font-mono text-xs text-zinc-500 mt-1">
          13-week curriculum &middot; Week {Math.min(currentWeek, 13)}
        </p>
        <p className="text-sm text-zinc-400 mt-2 max-w-md">
          Each week focuses on a specific skill. Complete the practices to progress. Click a week to see its practices.
        </p>
      </div>

      {/* Weeks */}
      <div className="px-8 py-8 space-y-2 stagger max-w-2xl">
        {curriculum.map((week) => {
          const isCompleted = completedWeeks.has(week.week);
          const isCurrent = week.week === currentWeek;
          const isExpanded = expandedWeek === week.week || isCurrent;
          const isFuture = week.week > currentWeek;

          return (
            <button
              key={week.week}
              onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
              className="w-full text-left transition-all rounded-lg px-5 py-4"
              style={{
                background: isCurrent
                  ? "rgba(245,158,11,0.06)"
                  : isCompleted
                    ? "rgba(255,255,255,0.02)"
                    : "transparent",
                border: `1px solid ${
                  isCurrent
                    ? "rgba(245,158,11,0.2)"
                    : isCompleted
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(255,255,255,0.03)"
                }`,
                opacity: isFuture ? 0.4 : 1,
              }}
            >
              <div className="flex items-center gap-4">
                {/* Week number */}
                <span
                  className="font-mono text-lg font-bold w-8 text-center"
                  style={{
                    color: isCompleted ? "#f59e0b" : isCurrent ? "#f59e0b" : "#52525b",
                  }}
                >
                  {isCompleted ? "✓" : String(week.week).padStart(2, "0")}
                </span>

                <div className="flex-1">
                  <p className={`text-sm font-medium ${isCurrent || isCompleted ? "text-white" : "text-zinc-500"}`}>
                    {week.title}
                  </p>
                  <p className="font-mono text-xs text-zinc-500 mt-0.5">
                    {week.focus}
                  </p>
                </div>

                {isCurrent && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse-soft" />
                )}
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="mt-4 pl-12 space-y-3">
                  <div className="space-y-2">
                    {week.practices.map((pid) => {
                      const p = getPracticeById(pid);
                      if (!p) return null;
                      const pColor = TRADITION_COLORS[p.tradition];
                      return (
                        <div
                          key={pid}
                          className="flex items-center gap-3 group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: pColor }}
                          />
                          <Link
                            href={`/practice/${pid}`}
                            className="font-mono text-xs text-zinc-400 hover:text-white transition-colors flex-1"
                          >
                            {p.name}
                          </Link>
                          <Link
                            href={`/session/${pid}`}
                            className="font-mono text-xs px-2.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                            style={{ color: "#08080c", backgroundColor: pColor }}
                          >
                            Begin
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWeek.mutate({
                        week: week.week,
                        completed: !isCompleted,
                      });
                    }}
                    className="font-mono text-xs text-zinc-500 hover:text-amber-500 transition-colors cursor-pointer inline-block"
                  >
                    {isCompleted ? "Mark Incomplete" : "Mark Complete"}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
