"use client";

import { useSessionStats } from "@/lib/queries";
import { practices } from "@/lib/practices";
import { TRADITION_COLORS, TRADITION_LABELS } from "@/lib/types";
import { getLevel, getLevelDiamonds, getLevelProgress } from "@/lib/xp";
import Link from "next/link";

/**
 * TODAY — The app IS this screen.
 *
 * One practice. Full screen. Tradition color washing the background.
 * The only question: "What are you training today?"
 * One button: BEGIN.
 */

export default function Today() {
  const { data: stats } = useSessionStats();

  // Deterministic daily practice
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
  const daily = practices[dayOfYear % practices.length];

  const totalXp = stats?.totalMinutes ?? 0;
  const level = getLevel(totalXp);
  const progress = getLevelProgress(totalXp);
  const practiceXp = stats?.practiceMinutes?.[daily.id] ?? 0;
  const practiceLevel = getLevel(practiceXp);
  const color = TRADITION_COLORS[daily.tradition];

  return (
    <div className="screen" style={{ ["--tradition-color" as string]: color }}>
      {/* Background wash */}
      <div className="tradition-wash" />

      {/* Top bar — minimal status */}
      <div className="relative z-10 flex items-center justify-between px-8 pt-8">
        <div className="animate-fade-in">
          <span className="font-mono text-sm tracking-wider" style={{ color }}>
            {getLevelDiamonds(level)}
          </span>
        </div>
        <div className="animate-fade-in text-right" style={{ animationDelay: "100ms" }}>
          <span className="font-mono text-xs text-zinc-500">
            {stats?.currentStreak ?? 0}d streak
          </span>
        </div>
      </div>

      {/* Center — THE practice */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 stagger">
        {/* Tradition badge */}
        <div className="flex items-center gap-2.5">
          <span
            className="w-2.5 h-2.5 rounded-full animate-breathe"
            style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}` }}
          />
          <span
            className="font-mono text-xs uppercase tracking-[0.25em]"
            style={{ color }}
          >
            {TRADITION_LABELS[daily.tradition]}
          </span>
        </div>

        {/* Practice name — HUGE */}
        <h1
          className="mt-6 text-5xl sm:text-7xl font-bold text-center leading-[1.1] text-white max-w-2xl"
        >
          {daily.name}
        </h1>

        {/* Metadata */}
        <p className="mt-4 font-mono text-sm text-zinc-400 text-center">
          {daily.duration.min}&ndash;{daily.duration.max} min &middot; {daily.layer} &middot; {daily.difficulty}
        </p>

        {/* Practice level */}
        <div className="mt-3 flex items-center gap-2">
          <span className="font-mono text-xs" style={{ color, opacity: 0.7 }}>
            {getLevelDiamonds(practiceLevel)}
          </span>
          <span className="font-mono text-xs text-zinc-500">
            {practiceXp} xp
          </span>
        </div>

        {/* BEGIN button — the primary action */}
        <Link
          href={`/session/${daily.id}`}
          className="mt-10 group relative"
        >
          <span
            className="block px-12 py-4 font-mono text-lg uppercase tracking-[0.3em] font-bold rounded-full transition-all duration-300 group-hover:scale-105"
            style={{
              color: "#08080c",
              backgroundColor: color,
              boxShadow: `0 0 30px ${color}40, 0 4px 20px ${color}20`,
            }}
          >
            Begin
          </span>
        </Link>

        {/* Or view protocol */}
        <Link
          href={`/practice/${daily.id}`}
          className="mt-4 font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          view protocol &rarr;
        </Link>
      </div>

      {/* Bottom — XP bar spanning full width */}
      <div className="relative z-10 px-8 pb-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-zinc-500">
            Level {level}
          </span>
          <span className="font-mono text-xs text-zinc-500">
            {progress.current} / {progress.needed} XP
          </span>
        </div>
        <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${Math.max(progress.progress * 100, 1)}%`,
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}60`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
