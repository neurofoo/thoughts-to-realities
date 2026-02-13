"use client";

import { use, useState, useEffect } from "react";
import { getPracticeById } from "@/lib/practices";
import { useSessionStats } from "@/lib/queries";
import { TRADITION_COLORS, TRADITION_LABELS } from "@/lib/types";
import { getLevel, getLevelDiamonds } from "@/lib/xp";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * PROTOCOL — Step through instructions one at a time.
 *
 * Two modes:
 * 1. Briefing: name, context, cyberpunk lore
 * 2. Protocol: one instruction per screen, arrow keys to navigate
 *
 * The tradition color dominates. Full screen. No chrome.
 */

export default function Protocol({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const practice = getPracticeById(id);
  const { data: stats } = useSessionStats();
  const [mode, setMode] = useState<"briefing" | "protocol">("briefing");
  const [step, setStep] = useState(0);

  if (!practice) return notFound();

  const color = TRADITION_COLORS[practice.tradition];
  const xp = stats?.practiceMinutes?.[id] ?? 0;
  const level = getLevel(xp);
  const total = practice.instructions.length;

  // Keyboard navigation in protocol mode
  useEffect(() => {
    if (mode !== "protocol") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setStep((s) => Math.min(s + 1, total - 1));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setStep((s) => Math.max(s - 1, 0));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode, total]);

  return (
    <div className="screen" style={{ ["--tradition-color" as string]: color }}>
      <div className="tradition-wash" />

      {mode === "briefing" ? (
        <>
          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-8 pt-8 animate-fade-in">
            <Link
              href="/practices"
              className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              &larr; codex
            </Link>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs" style={{ color }}>
                {getLevelDiamonds(level)}
              </span>
              <span className="font-mono text-xs text-zinc-500">{xp} xp</span>
            </div>
          </div>

          {/* Center — briefing */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 stagger">
            {/* Tradition */}
            <div className="flex items-center gap-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
              />
              <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color }}>
                {TRADITION_LABELS[practice.tradition]}
              </span>
            </div>

            {/* Name */}
            <h1 className="mt-5 text-4xl sm:text-6xl font-bold text-white text-center leading-[1.1] max-w-xl">
              {practice.name}
            </h1>

            {/* Meta */}
            <p className="mt-4 font-mono text-sm text-zinc-400">
              {practice.layer} &middot; {practice.difficulty} &middot; {practice.duration.min}&ndash;{practice.duration.max} min
            </p>

            {/* Cyberpunk context */}
            <p className="mt-6 text-sm text-zinc-400 leading-relaxed max-w-md text-center italic">
              {practice.cyberpunkContext.length > 250
                ? practice.cyberpunkContext.slice(0, 250) + "..."
                : practice.cyberpunkContext}
            </p>

            {/* Warning */}
            {practice.warning && (
              <p className="mt-4 font-mono text-xs text-red-400/70 max-w-sm text-center">
                ⚠ {practice.warning.length > 120 ? practice.warning.slice(0, 120) + "..." : practice.warning}
              </p>
            )}

            {/* Actions */}
            <div className="mt-8 flex items-center gap-6">
              <button
                onClick={() => { setMode("protocol"); setStep(0); }}
                className="font-mono text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                protocol ({total} steps)
              </button>
              <Link
                href={`/session/${practice.id}`}
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
        </>
      ) : (
        <>
          {/* Protocol mode — one instruction per screen */}
          <div className="relative z-10 flex items-center justify-between px-8 pt-8 animate-fade-in">
            <button
              onClick={() => setMode("briefing")}
              className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              &larr; briefing
            </button>
            <span className="font-mono text-xs text-zinc-500">
              {practice.name}
            </span>
          </div>

          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8" key={step}>
            {/* Step progress dots */}
            <div className="flex items-center gap-2 mb-10 animate-fade-in">
              {Array.from({ length: total }, (_, i) => (
                <span
                  key={i}
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === step ? 24 : 6,
                    height: 6,
                    backgroundColor: i === step ? color : i < step ? `${color}80` : "rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </div>

            {/* Instruction text — large and readable */}
            <p className="text-xl sm:text-2xl text-zinc-200 leading-relaxed max-w-lg text-center animate-fade-in-up">
              {practice.instructions[step]}
            </p>

            {/* Step number */}
            <p className="mt-8 font-mono text-sm text-zinc-500 animate-fade-in" style={{ animationDelay: "200ms" }}>
              {step + 1} / {total}
            </p>
          </div>

          {/* Bottom nav */}
          <div className="relative z-10 flex items-center justify-between px-8 pb-8">
            <button
              onClick={() => step > 0 ? setStep(step - 1) : setMode("briefing")}
              className="font-mono text-sm text-zinc-500 hover:text-white transition-colors px-4 py-2"
            >
              &larr;
            </button>

            {step < total - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="font-mono text-sm hover:scale-105 transition-all px-4 py-2"
                style={{ color }}
              >
                &rarr;
              </button>
            ) : (
              <Link
                href={`/session/${practice.id}`}
                className="px-6 py-2 font-mono text-sm uppercase tracking-[0.15em] font-bold rounded-full transition-all hover:scale-105"
                style={{
                  color: "#08080c",
                  backgroundColor: color,
                }}
              >
                Begin
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
