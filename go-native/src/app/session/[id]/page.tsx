"use client";

import { use, useState, useCallback, useEffect, useRef, useMemo } from "react";
import { getPracticeById } from "@/lib/practices";
import { useCreateSession, useSessionStats } from "@/lib/queries";
import { TRADITION_COLORS, TRADITION_LABELS, PHENOMENOLOGY_OPTIONS } from "@/lib/types";
import { getLevel, getLevelDiamonds } from "@/lib/xp";
import Link from "next/link";
import { notFound } from "next/navigation";

/** Physics-based ambient orbs that bounce off walls and each other */
function AmbientOrbs({ color }: { color: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<{
    x: number; y: number; vx: number; vy: number;
    radius: number; opacity: number; opacityDir: number;
  }[]>([]);
  const rafRef = useRef<number>(0);
  const [positions, setPositions] = useState<{ x: number; y: number; opacity: number }[]>([]);

  // Parse hex to RGB once
  const rgb = useMemo(() => ({
    r: parseInt(color.slice(1, 3), 16),
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16),
  }), [color]);

  const orbConfigs = useMemo(() => [
    { size: 700, baseOpacity: 0.53, blur: 8 },
    { size: 600, baseOpacity: 0.45, blur: 10 },
    { size: 500, baseOpacity: 0.4, blur: 8 },
  ], []);

  useEffect(() => {
    const getSize = () => {
      const el = containerRef.current;
      return {
        W: el?.clientWidth || window.innerWidth,
        H: el?.clientHeight || window.innerHeight,
      };
    };

    const { W, H } = getSize();

    // Initialize orbs with positions firmly inside the viewport
    if (orbsRef.current.length === 0) {
      orbsRef.current = orbConfigs.map((cfg) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.4;
        return {
          x: W * 0.2 + Math.random() * W * 0.6,
          y: H * 0.2 + Math.random() * H * 0.6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: cfg.size / 2,
          opacity: cfg.baseOpacity,
          opacityDir: (Math.random() > 0.5 ? 1 : -1) * (0.001 + Math.random() * 0.002),
        };
      });
    }

    let frameCount = 0;
    const tick = () => {
      const { W, H } = getSize();
      const orbs = orbsRef.current;

      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];

        // Move
        o.x += o.vx;
        o.y += o.vy;

        // Breathe
        o.opacity += o.opacityDir;
        if (o.opacity > 0.95) { o.opacity = 0.95; o.opacityDir = -Math.abs(o.opacityDir); }
        if (o.opacity < 0.35) { o.opacity = 0.35; o.opacityDir = Math.abs(o.opacityDir); }

        // Bounce off walls — keep center within viewport
        if (o.x < 0) { o.x = 1; o.vx = Math.abs(o.vx); }
        if (o.x > W) { o.x = W - 1; o.vx = -Math.abs(o.vx); }
        if (o.y < 0) { o.y = 1; o.vy = Math.abs(o.vy); }
        if (o.y > H) { o.y = H - 1; o.vy = -Math.abs(o.vy); }

        // Bounce off other orbs
        for (let j = i + 1; j < orbs.length; j++) {
          const o2 = orbs[j];
          const dx = o2.x - o.x;
          const dy = o2.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = (o.radius + o2.radius) * 0.4;
          if (dist < minDist && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const dvx = o.vx - o2.vx;
            const dvy = o.vy - o2.vy;
            const dot = dvx * nx + dvy * ny;
            if (dot > 0) {
              o.vx -= dot * nx;
              o.vy -= dot * ny;
              o2.vx += dot * nx;
              o2.vy += dot * ny;
            }
            const overlap = minDist - dist;
            o.x -= nx * overlap * 0.5;
            o.y -= ny * overlap * 0.5;
            o2.x += nx * overlap * 0.5;
            o2.y += ny * overlap * 0.5;
          }
        }

        // Enforce constant speed — prevents energy loss from collisions
        const targetSpeed = 0.5;
        const speed = Math.sqrt(o.vx * o.vx + o.vy * o.vy);
        if (speed < 0.01) {
          // Kick if stalled
          const a = Math.random() * Math.PI * 2;
          o.vx = Math.cos(a) * targetSpeed;
          o.vy = Math.sin(a) * targetSpeed;
        } else {
          o.vx = (o.vx / speed) * targetSpeed;
          o.vy = (o.vy / speed) * targetSpeed;
        }
      }

      frameCount++;
      if (frameCount % 2 === 0) {
        setPositions(orbs.map((o) => ({ x: o.x, y: o.y, opacity: o.opacity })));
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [orbConfigs]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbConfigs.map((cfg, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: cfg.size,
            height: cfg.size,
            transform: positions[i]
              ? `translate(${positions[i].x - cfg.size / 2}px, ${positions[i].y - cfg.size / 2}px)`
              : "translate(-50%, -50%)",
            opacity: positions[i]?.opacity ?? cfg.baseOpacity,
            background: `radial-gradient(circle, rgba(${rgb.r},${rgb.g},${rgb.b},${cfg.baseOpacity}) 0%, rgba(${rgb.r},${rgb.g},${rgb.b},${cfg.baseOpacity * 0.4}) 30%, rgba(${rgb.r},${rgb.g},${rgb.b},${cfg.baseOpacity * 0.1}) 60%, transparent 80%)`,
            filter: `blur(${cfg.blur}px)`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}

/**
 * ACTIVE SESSION — Five phases:
 *
 * 1. Setup — choose duration
 * 2. Protocol — step through instructions BEFORE timer starts (skippable)
 * 3. Active — split layout: timer left, current instruction right
 * 4. Logging — quality, phenomenology, notes
 * 5. Complete — XP earned, level up
 */

type Phase = "setup" | "protocol" | "active" | "logging" | "complete";

export default function ActiveSession({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const practice = getPracticeById(id);
  const createSession = useCreateSession();
  const { data: stats } = useSessionStats();
  const [phase, setPhase] = useState<Phase>("setup");
  const [duration, setDuration] = useState(practice?.duration.min ?? 10);
  const [earnedXp, setEarnedXp] = useState(0);

  // Protocol step (used in both protocol and active phases)
  const [step, setStep] = useState(0);

  // Timer
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  // Logger
  const [quality, setQuality] = useState(3);
  const [notes, setNotes] = useState("");
  const [phenomenology, setPhenomenology] = useState<string[]>([]);

  const playBell = useCallback(() => {
    try {
      const ctx = new AudioContext();
      audioRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 528;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);
      osc.start();
      osc.stop(ctx.currentTime + 3);
    } catch { /* Audio not available */ }
  }, []);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            playBell();
            setTimeout(() => setPhase("logging"), 2000);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, remaining, playBell]);

  useEffect(() => {
    return () => { if (audioRef.current) audioRef.current.close(); };
  }, []);

  // Arrow key nav for protocol step
  useEffect(() => {
    if (phase !== "protocol") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setStep((s) => Math.min(s + 1, (practice?.instructions.length ?? 1) - 1));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setStep((s) => Math.max(s - 1, 0));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, practice?.instructions.length]);

  if (!practice) return notFound();

  const color = TRADITION_COLORS[practice.tradition];
  const totalSteps = practice.instructions.length;
  const totalSeconds = duration * 60;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = totalSeconds > 0 ? 1 - remaining / totalSeconds : 0;
  const R = 120;
  const circumference = 2 * Math.PI * R;
  const offset = circumference * (1 - progress);

  const startTimer = () => {
    setRemaining(duration * 60);
    setRunning(true);
    setStep(0);
    setPhase("active");
  };

  const handleLog = async () => {
    await createSession.mutateAsync({
      practiceId: practice.id,
      tradition: practice.tradition,
      duration,
      quality,
      notes,
      phenomenology,
    });
    setEarnedXp(duration);
    setPhase("complete");
  };

  const prevXp = stats?.practiceMinutes?.[id] ?? 0;
  const newXp = prevXp + earnedXp;
  const prevLevel = getLevel(prevXp);
  const newLevel = getLevel(newXp);
  const leveledUp = newLevel > prevLevel;

  return (
    <div
      className="fixed inset-0 z-[60]"
      style={{
        background: `radial-gradient(ellipse at 50% 40%, color-mix(in srgb, ${color} 6%, #08080c) 0%, #08080c 70%)`,
      }}
    >
      {/* ════════ SETUP ════════ */}
      {phase === "setup" && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center stagger px-8">
            <div className="flex items-center justify-center gap-2.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color }}>
                {TRADITION_LABELS[practice.tradition]}
              </span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-5xl font-bold text-white">
              {practice.name}
            </h1>

            <div className="mt-10 flex items-center justify-center gap-10">
              <button
                onClick={() => setDuration((d) => Math.max(1, d - 5))}
                className="text-2xl text-zinc-500 hover:text-white transition-colors w-12 h-12 flex items-center justify-center"
              >
                −
              </button>
              <div>
                <span className="font-mono text-7xl font-bold text-white tabular-nums">
                  {duration}
                </span>
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-[0.3em] mt-1">
                  minutes
                </p>
              </div>
              <button
                onClick={() => setDuration((d) => Math.min(120, d + 5))}
                className="text-2xl text-zinc-500 hover:text-white transition-colors w-12 h-12 flex items-center justify-center"
              >
                +
              </button>
            </div>

            <p className="mt-6 font-mono text-lg font-bold" style={{ color, textShadow: `0 0 12px ${color}40` }}>
              +{duration} XP
            </p>

            <button
              onClick={() => { setStep(0); setPhase("protocol"); }}
              className="mt-8 px-10 py-3 font-mono text-sm uppercase tracking-[0.2em] font-bold rounded-full transition-all hover:scale-105"
              style={{
                color: "#08080c",
                backgroundColor: color,
                boxShadow: `0 0 30px ${color}30`,
              }}
            >
              Review Protocol
            </button>

            <div className="mt-3">
              <button
                onClick={startTimer}
                className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                skip &mdash; I know this &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════ PROTOCOL (pre-timer walkthrough) ════════ */}
      {phase === "protocol" && (
        <div className="h-full flex flex-col animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between px-8 pt-8">
            <button
              onClick={() => setPhase("setup")}
              className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              &larr; setup
            </button>
            <span className="font-mono text-xs text-zinc-500">{practice.name}</span>
          </div>

          {/* Center — instruction */}
          <div className="flex-1 flex flex-col items-center justify-center px-8" key={`proto-${step}`}>
            {/* Step dots */}
            <div className="flex items-center gap-2 mb-10">
              {Array.from({ length: totalSteps }, (_, i) => (
                <span
                  key={i}
                  className="block rounded-full transition-all duration-300 cursor-pointer"
                  onClick={() => setStep(i)}
                  style={{
                    width: i === step ? 28 : 8,
                    height: 8,
                    backgroundColor: i === step ? color : i < step ? `${color}60` : "rgba(255,255,255,0.08)",
                  }}
                />
              ))}
            </div>

            <p className="text-xl sm:text-2xl text-zinc-200 leading-relaxed max-w-lg text-center animate-fade-in-up">
              {practice.instructions[step]}
            </p>

            <p className="mt-6 font-mono text-xs text-zinc-500">
              Step {step + 1} of {totalSteps}
            </p>
          </div>

          {/* Bottom nav */}
          <div className="flex items-center justify-between px-8 pb-8">
            <button
              onClick={() => setStep((s) => Math.max(s - 1, 0))}
              className="font-mono text-sm text-zinc-500 hover:text-white transition-colors px-4 py-2"
              style={{ visibility: step > 0 ? "visible" : "hidden" }}
            >
              &larr;
            </button>

            {step < totalSteps - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="font-mono text-sm px-4 py-2 transition-all"
                style={{ color }}
              >
                &rarr;
              </button>
            ) : (
              <button
                onClick={startTimer}
                className="px-8 py-3 font-mono text-sm uppercase tracking-[0.15em] font-bold rounded-full transition-all hover:scale-105"
                style={{
                  color: "#08080c",
                  backgroundColor: color,
                  boxShadow: `0 0 20px ${color}30`,
                }}
              >
                Begin Training
              </button>
            )}
          </div>
        </div>
      )}

      {/* ════════ ACTIVE (timer + scrollable instructions + ambient bg) ════════ */}
      {phase === "active" && (
        <div className="h-full flex flex-col animate-fade-in">
          {/* Ambient background orbs — physics-based */}
          <AmbientOrbs color={color} />

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-8 pt-6">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
                onClick={() => { setRunning(false); if (intervalRef.current) clearInterval(intervalRef.current); }}
              >
                &times; exit
              </Link>
              <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color }}>
                {practice.name}
              </span>
            </div>
            <div>
              {!running && remaining > 0 ? (
                <div className="flex gap-4">
                  <button onClick={() => setRunning(true)} className="font-mono text-xs uppercase tracking-[0.15em]" style={{ color }}>Resume</button>
                  <button onClick={() => setRemaining(totalSeconds)} className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">Reset</button>
                </div>
              ) : running ? (
                <button
                  onClick={() => { setRunning(false); if (intervalRef.current) clearInterval(intervalRef.current); }}
                  className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Pause
                </button>
              ) : remaining === 0 ? (
                <span className="font-mono text-xs uppercase tracking-[0.2em] animate-pulse-soft" style={{ color }}>
                  Complete
                </span>
              ) : null}
            </div>
          </div>

          {/* Split layout */}
          <div className="relative z-10 flex-1 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 px-8 py-6">
            {/* Left: Timer */}
            <div className="relative flex-shrink-0">
              <svg width="280" height="280" className="-rotate-90">
                {Array.from({ length: 60 }, (_, i) => {
                  const a = (2 * Math.PI * i) / 60 - Math.PI / 2;
                  const major = i % 5 === 0;
                  const r1 = major ? 108 : 112;
                  const r2 = 118;
                  return (
                    <line
                      key={i}
                      x1={140 + r1 * Math.cos(a)} y1={140 + r1 * Math.sin(a)}
                      x2={140 + r2 * Math.cos(a)} y2={140 + r2 * Math.sin(a)}
                      stroke={major ? "#3f3f46" : "#27272a"}
                      strokeWidth={major ? "1.5" : "0.75"}
                    />
                  );
                })}
                <circle cx="140" cy="140" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                <circle
                  cx="140" cy="140" r={R}
                  fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={circumference} strokeDashoffset={offset}
                  className="transition-all duration-1000 ease-linear"
                  style={{ filter: `drop-shadow(0 0 10px ${color}80)` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-5xl font-bold text-white tabular-nums">
                  {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Right: Scrollable instructions */}
            <div className="flex flex-col max-w-sm sm:max-h-[60vh] overflow-y-auto pr-2">
              <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-4">
                {TRADITION_LABELS[practice.tradition]} Protocol
              </p>
              <div className="space-y-4">
                {practice.instructions.map((instruction, i) => (
                  <div key={i} className="flex gap-3">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold mt-0.5"
                      style={{
                        backgroundColor: `${color}15`,
                        color,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════ LOGGING ════════ */}
      {phase === "logging" && (
        <div className="h-full flex items-center justify-center">
          <div className="w-full max-w-sm px-8 animate-fade-in-up space-y-6">
            <div className="text-center">
              <p className="font-mono text-xs text-zinc-400 uppercase tracking-[0.3em]">Session Complete</p>
              <p className="mt-3 font-mono text-4xl font-bold" style={{ color, textShadow: `0 0 16px ${color}30` }}>
                +{duration} XP
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">Quality</span>
                <span className="font-mono text-lg font-bold text-white">{quality}</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setQuality(n)}
                    className="flex-1 h-2 rounded-full transition-all"
                    style={{
                      backgroundColor: n <= quality ? color : "rgba(255,255,255,0.06)",
                      boxShadow: n <= quality ? `0 0 6px ${color}40` : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">Phenomenology</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {PHENOMENOLOGY_OPTIONS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPhenomenology((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p])}
                    className="font-mono text-xs px-3 py-1 rounded-full border transition-all"
                    style={{
                      borderColor: phenomenology.includes(p) ? color : "rgba(255,255,255,0.1)",
                      color: phenomenology.includes(p) ? color : "#71717a",
                      background: phenomenology.includes(p) ? `${color}10` : "transparent",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full bg-transparent border border-white/[0.08] px-4 py-3 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none font-mono rounded-lg"
              placeholder="notes..."
            />

            <button
              onClick={handleLog}
              className="w-full py-3 font-mono text-sm uppercase tracking-[0.2em] font-bold rounded-full transition-all hover:scale-[1.02]"
              style={{
                color: "#08080c",
                backgroundColor: color,
                boxShadow: `0 0 20px ${color}30`,
              }}
            >
              Log Session
            </button>
          </div>
        </div>
      )}

      {/* ════════ COMPLETE ════════ */}
      {phase === "complete" && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center animate-fade-in-up stagger px-8">
            <p
              className="text-6xl sm:text-8xl font-bold"
              style={{ color, textShadow: `0 0 40px ${color}40` }}
            >
              +{earnedXp}
            </p>
            <p className="font-mono text-sm text-zinc-400 uppercase tracking-[0.3em]">
              Experience Acquired
            </p>

            {leveledUp && (
              <div className="mt-6 space-y-2">
                <p className="font-mono text-xl font-bold" style={{ color }}>LEVEL UP</p>
                <p className="font-mono text-sm text-zinc-400">
                  {getLevelDiamonds(prevLevel)} &rarr; {getLevelDiamonds(newLevel)}
                </p>
              </div>
            )}

            <div className="mt-10 flex gap-8 justify-center">
              <Link href={`/practice/${practice.id}`} className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                View Skill
              </Link>
              <Link
                href="/"
                className="px-8 py-3 font-mono text-sm uppercase tracking-[0.15em] font-bold rounded-full transition-all hover:scale-105"
                style={{
                  color: "#08080c",
                  backgroundColor: color,
                }}
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
