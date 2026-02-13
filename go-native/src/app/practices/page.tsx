"use client";

import { useState, useEffect, useCallback } from "react";
import { practices } from "@/lib/practices";
import { useSessionStats } from "@/lib/queries";
import {
  TRADITIONS,
  TRADITION_LABELS,
  TRADITION_COLORS,
  type Tradition,
} from "@/lib/types";
import { getLevel, getLevelDiamonds } from "@/lib/xp";
import Link from "next/link";

type View = "grid" | "deck";

export default function SkillCodex() {
  const { data: stats } = useSessionStats();
  const [filterTradition, setFilterTradition] = useState<Tradition | null>(null);
  const [view, setView] = useState<View>("grid");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  const filtered = filterTradition
    ? practices.filter((p) => p.tradition === filterTradition)
    : practices;

  useEffect(() => { setIndex(0); }, [filterTradition]);

  const current = filtered[index];
  const color = current ? TRADITION_COLORS[current.tradition] : "#f59e0b";

  const go = useCallback((dir: "left" | "right") => {
    setDirection(dir);
    setTimeout(() => {
      setIndex((i) => {
        if (dir === "right") return (i + 1) % filtered.length;
        return (i - 1 + filtered.length) % filtered.length;
      });
      setDirection(null);
    }, 150);
  }, [filtered.length]);

  useEffect(() => {
    if (view !== "deck") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go("right"); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go("left"); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, view]);

  return (
    <div
      className="screen !overflow-y-auto"
      style={{ ["--tradition-color" as string]: view === "deck" ? color : "#f59e0b" }}
    >
      {view === "deck" && <div className="tradition-wash" />}

      {/* Header — filters + view toggle */}
      <div className="relative z-10 px-8 pt-8 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Codex</h1>
          <div className="flex items-center gap-1 bg-white/[0.04] rounded-full p-0.5">
            <button
              onClick={() => setView("grid")}
              className="font-mono text-xs px-3 py-1 rounded-full transition-all"
              style={{
                background: view === "grid" ? "rgba(255,255,255,0.1)" : "transparent",
                color: view === "grid" ? "#e4e4e7" : "#52525b",
              }}
            >
              Grid
            </button>
            <button
              onClick={() => setView("deck")}
              className="font-mono text-xs px-3 py-1 rounded-full transition-all"
              style={{
                background: view === "deck" ? "rgba(255,255,255,0.1)" : "transparent",
                color: view === "deck" ? "#e4e4e7" : "#52525b",
              }}
            >
              Deck
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterTradition(null)}
            className={`font-mono text-xs px-3 py-1 rounded-full transition-all ${
              !filterTradition ? "text-white bg-white/[0.1]" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            All
          </button>
          {TRADITIONS.map((t) => (
            <button
              key={t}
              onClick={() => setFilterTradition(filterTradition === t ? null : t)}
              className="font-mono text-xs px-3 py-1 rounded-full transition-all"
              style={{
                color: filterTradition === t ? TRADITION_COLORS[t] : "#71717a",
                background: filterTradition === t ? `${TRADITION_COLORS[t]}15` : "transparent",
              }}
            >
              {TRADITION_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ GRID VIEW ═══ */}
      {view === "grid" && (
        <div className="relative z-10 px-8 py-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 stagger">
          {filtered.map((p) => {
            const pXp = stats?.practiceMinutes?.[p.id] ?? 0;
            const pLevel = getLevel(pXp);
            const pColor = TRADITION_COLORS[p.tradition];
            return (
              <Link
                key={p.id}
                href={`/practice/${p.id}`}
                className="group rounded-xl p-3.5 flex flex-col justify-between aspect-square transition-all hover:scale-[1.03]"
                style={{
                  background: pXp > 0
                    ? `linear-gradient(160deg, ${pColor}12 0%, ${pColor}04 40%, rgba(255,255,255,0.02) 100%)`
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${pXp > 0 ? `${pColor}30` : "rgba(255,255,255,0.06)"}`,
                  boxShadow: pXp > 0 ? `0 0 20px ${pColor}08` : "none",
                }}
              >
                {/* Top — tradition badge */}
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
                  <span className="font-mono text-xs text-zinc-600">
                    {p.difficulty}
                  </span>
                </div>

                {/* Center — name */}
                <div>
                  <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors leading-tight">
                    {p.name}
                  </h3>
                  <p className="font-mono text-xs text-zinc-500 mt-1.5">
                    {p.layer} &middot; {p.duration.min}&ndash;{p.duration.max}m
                  </p>
                </div>

                {/* Bottom — XP + action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs" style={{ color: pColor, opacity: 0.7 }}>
                      {getLevelDiamonds(pLevel)}
                    </span>
                    <span className="font-mono text-xs text-zinc-600">{pXp} xp</span>
                  </div>
                  <Link
                    href={`/session/${p.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    style={{
                      color: "#08080c",
                      backgroundColor: pColor,
                    }}
                  >
                    Begin
                  </Link>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* ═══ DECK VIEW ═══ */}
      {view === "deck" && current && (
        <>
          <div
            className="relative z-10 flex-1 flex flex-col items-center justify-center px-8"
            key={`${current.id}-${direction}`}
          >
            <div className={`text-center max-w-xl stagger ${
              direction === "right" ? "animate-slide-left" :
              direction === "left" ? "animate-slide-right" :
              "animate-fade-in-up"
            }`}>
              <div className="flex items-center justify-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                />
                <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color }}>
                  {TRADITION_LABELS[current.tradition]}
                </span>
              </div>

              <h1 className="mt-5 text-4xl sm:text-6xl font-bold text-white leading-[1.1]">
                {current.name}
              </h1>

              <p className="mt-4 font-mono text-sm text-zinc-400">
                {current.layer} &middot; {current.difficulty} &middot; {current.duration.min}&ndash;{current.duration.max} min
              </p>

              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="font-mono text-xs" style={{ color, opacity: 0.7 }}>
                  {getLevelDiamonds(getLevel(stats?.practiceMinutes?.[current.id] ?? 0))}
                </span>
                <span className="font-mono text-xs text-zinc-500">{stats?.practiceMinutes?.[current.id] ?? 0} xp</span>
              </div>

              {current.warning && (
                <p className="mt-4 font-mono text-xs text-red-400/70 max-w-sm mx-auto">
                  ⚠ {current.warning.length > 100 ? current.warning.slice(0, 100) + "..." : current.warning}
                </p>
              )}

              <div className="mt-8 flex items-center justify-center gap-6">
                <Link
                  href={`/practice/${current.id}`}
                  className="font-mono text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  protocol
                </Link>
                <Link
                  href={`/session/${current.id}`}
                  className="px-8 py-3 font-mono text-sm uppercase tracking-[0.2em] font-bold rounded-full transition-all hover:scale-105"
                  style={{
                    color: "#08080c",
                    backgroundColor: color,
                    boxShadow: `0 0 20px ${color}30`,
                  }}
                >
                  Begin
                </Link>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between px-8 pb-8">
            <button onClick={() => go("left")} className="font-mono text-sm text-zinc-500 hover:text-white transition-colors px-4 py-2">
              &larr;
            </button>
            <span className="font-mono text-xs text-zinc-500">
              {index + 1} / {filtered.length}
            </span>
            <button onClick={() => go("right")} className="font-mono text-sm text-zinc-500 hover:text-white transition-colors px-4 py-2">
              &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
