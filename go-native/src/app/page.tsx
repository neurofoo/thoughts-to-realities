"use client";

import { useState } from "react";
import { useSessionStats } from "@/lib/queries";
import { practices } from "@/lib/practices";
import { TRADITION_COLORS, TRADITION_LABELS, TRADITIONS, type Tradition } from "@/lib/types";
import { getLevel, getLevelDiamonds, getLevelProgress } from "@/lib/xp";
import Link from "next/link";

export default function Today() {
  const { data: stats } = useSessionStats();
  const [phase, setPhase] = useState<"splash" | "pick">("splash");
  const [filter, setFilter] = useState<Tradition | null>(null);

  const totalXp = stats?.totalMinutes ?? 0;
  const level = getLevel(totalXp);
  const progress = getLevelProgress(totalXp);

  const filtered = filter
    ? practices.filter((p) => p.tradition === filter)
    : practices;

  return (
    <div className="screen !overflow-y-auto">
      {/* ═══ SPLASH ═══ */}
      {phase === "splash" && (
        <div className="h-full flex flex-col">
          <div className="tradition-wash" />

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-8 pt-8 animate-fade-in">
            <span className="font-mono text-sm tracking-wider text-amber-500">
              {getLevelDiamonds(level)}
            </span>
            <span className="font-mono text-xs text-zinc-500">
              {stats?.currentStreak ?? 0}d streak
            </span>
          </div>

          {/* Center */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 stagger">
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-[0.3em]">
              Go Native
            </p>

            <h1 className="mt-4 text-5xl sm:text-7xl font-bold text-center leading-[1.1] text-white">
              What are you<br />training today?
            </h1>

            <p className="mt-6 font-mono text-sm text-zinc-400">
              {stats?.totalSessions ?? 0} sessions &middot; {totalXp} minutes logged
            </p>

            {/* Quick actions */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <button
                onClick={() => setPhase("pick")}
                className="px-12 py-4 font-mono text-lg uppercase tracking-[0.3em] font-bold rounded-full transition-all hover:scale-105"
                style={{
                  color: "#08080c",
                  backgroundColor: "#f59e0b",
                  boxShadow: "0 0 30px rgba(245,158,11,0.3), 0 4px 20px rgba(245,158,11,0.15)",
                }}
              >
                Choose
              </button>

              <Link
                href={`/session/${practices[Math.floor(Math.random() * practices.length)].id}`}
                className="font-mono text-xs text-zinc-400 hover:text-white transition-colors py-2"
              >
                random practice &rarr;
              </Link>
            </div>

            {/* Quick start suggestions */}
            <div className="mt-10 flex flex-col items-center gap-4 w-full max-w-md">
              {(() => {
                const suggestions: { label: string; description: string; practices: typeof practices }[] = [];

                // Least practiced
                const sorted = [...practices].sort(
                  (a, b) => (stats?.practiceMinutes?.[a.id] ?? 0) - (stats?.practiceMinutes?.[b.id] ?? 0)
                );
                const least = sorted[0];
                if (least) {
                  suggestions.push({
                    label: "Least practiced",
                    description: least.name,
                    practices: [least],
                  });
                }

                // Beginner friendly
                const beginner = practices.filter((p) => p.difficulty === "beginner");
                if (beginner.length > 0) {
                  const pick = beginner[Math.floor(Math.random() * beginner.length)];
                  suggestions.push({
                    label: "Beginner friendly",
                    description: pick.name,
                    practices: [pick],
                  });
                }

                // Quick session (shortest duration)
                const quick = [...practices].sort((a, b) => a.duration.min - b.duration.min)[0];
                if (quick) {
                  suggestions.push({
                    label: "Quick session",
                    description: `${quick.name} · ${quick.duration.min}m`,
                    practices: [quick],
                  });
                }

                return suggestions.map((s, i) => (
                  <Link
                    key={i}
                    href={`/session/${s.practices[0].id}`}
                    className="group w-full flex items-center justify-between px-5 py-3 rounded-lg transition-all hover:bg-white/[0.04]"
                    style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div>
                      <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                        {s.label}
                      </span>
                      <p className="text-sm text-zinc-300 group-hover:text-white transition-colors mt-0.5">
                        {s.description}
                      </p>
                    </div>
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: TRADITION_COLORS[s.practices[0].tradition],
                        boxShadow: `0 0 6px ${TRADITION_COLORS[s.practices[0].tradition]}60`,
                      }}
                    />
                  </Link>
                ));
              })()}
            </div>
          </div>

          {/* Bottom XP bar */}
          <div className="relative z-10 px-8 pb-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-zinc-500">Level {level}</span>
              <span className="font-mono text-xs text-zinc-500">{progress.current} / {progress.needed} XP</span>
            </div>
            <div className="h-1 w-full rounded-full overflow-hidden bg-white/[0.06]">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.max(progress.progress * 100, 1)}%`,
                  backgroundColor: "#f59e0b",
                  boxShadow: "0 0 8px rgba(245,158,11,0.5)",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ═══ PICK ═══ */}
      {phase === "pick" && (
        <div className="animate-fade-in">
          {/* Header */}
          <div className="px-8 pt-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <button
                  onClick={() => setPhase("splash")}
                  className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  &larr; back
                </button>
                <h1 className="text-2xl font-bold text-white mt-2">Pick a Practice</h1>
              </div>
            </div>

            {/* Tradition filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter(null)}
                className={`font-mono text-xs px-3 py-1 rounded-full transition-all ${
                  !filter ? "text-white bg-white/[0.1]" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                All
              </button>
              {TRADITIONS.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(filter === t ? null : t)}
                  className="font-mono text-xs px-3 py-1 rounded-full transition-all"
                  style={{
                    color: filter === t ? TRADITION_COLORS[t] : "#71717a",
                    background: filter === t ? `${TRADITION_COLORS[t]}15` : "transparent",
                  }}
                >
                  {TRADITION_LABELS[t]}
                </button>
              ))}
            </div>
          </div>

          {/* Practice grid */}
          <div className="px-8 py-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 stagger">
            {filtered.map((p) => {
              const pXp = stats?.practiceMinutes?.[p.id] ?? 0;
              const pLevel = getLevel(pXp);
              const pColor = TRADITION_COLORS[p.tradition];
              return (
                <Link
                  key={p.id}
                  href={`/session/${p.id}`}
                  className="group rounded-xl p-3.5 flex flex-col justify-between aspect-square transition-all hover:scale-[1.03]"
                  style={{
                    background: pXp > 0
                      ? `linear-gradient(160deg, ${pColor}12 0%, ${pColor}04 40%, rgba(255,255,255,0.02) 100%)`
                      : "rgba(255,255,255,0.025)",
                    border: `1px solid ${pXp > 0 ? `${pColor}30` : "rgba(255,255,255,0.06)"}`,
                    boxShadow: pXp > 0 ? `0 0 20px ${pColor}08` : "none",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: pColor,
                          opacity: pXp > 0 ? 1 : 0.4,
                          boxShadow: pXp > 0 ? `0 0 8px ${pColor}60` : "none",
                        }}
                      />
                      <span className="font-mono text-xs" style={{ color: pColor, opacity: 0.7 }}>
                        {TRADITION_LABELS[p.tradition]}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-zinc-600">{p.difficulty}</span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors leading-tight">
                      {p.name}
                    </h3>
                    <p className="font-mono text-xs text-zinc-500 mt-1.5">
                      {p.layer} &middot; {p.duration.min}&ndash;{p.duration.max}m
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs" style={{ color: pColor, opacity: 0.7 }}>
                      {getLevelDiamonds(pLevel)}
                    </span>
                    <span className="font-mono text-xs text-zinc-600">{pXp} xp</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
