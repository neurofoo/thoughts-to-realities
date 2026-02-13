"use client";

import { useSessionStats } from "@/lib/queries";
import { practices } from "@/lib/practices";
import { LAYER_LABELS, TRADITION_COLORS, type Layer } from "@/lib/types";
import { getLevel, getLevelDiamonds } from "@/lib/xp";
import Link from "next/link";

/**
 * OPERATIONAL STACK — Four layers as full-width bands.
 *
 * Each layer spans the viewport width. Active layers glow.
 * Flow arrows between them. The system IS the page.
 */

const LAYERS: Layer[] = ["dissolution", "reconfiguration", "integration", "shutdown"];

const LAYER_DESC: Record<Layer, string> = {
  dissolution: "Dissolve fixed patterns and identity structures",
  reconfiguration: "Restructure consciousness and perception",
  integration: "Integrate insights into embodied experience",
  shutdown: "Stop the conceptual mind entirely",
};

const LAYER_COLORS: Record<Layer, string> = {
  dissolution: "#a855f7",
  reconfiguration: "#3b82f6",
  integration: "#22c55e",
  shutdown: "#ef4444",
};

export default function OperationalStack() {
  const { data: stats } = useSessionStats();

  return (
    <div className="screen !overflow-y-auto">
      {/* Header */}
      <div className="px-8 pt-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-white">Operational Stack</h1>
        <p className="font-mono text-xs text-zinc-500 mt-1">
          Four-layer system diagram
        </p>
      </div>

      {/* Layers */}
      <div className="flex-1 flex flex-col justify-center px-8 py-8 gap-3 stagger max-w-3xl">
        {LAYERS.map((layer, i) => {
          const layerPractices = practices.filter((p) => p.layer === layer);
          const totalXp = layerPractices.reduce(
            (sum, p) => sum + (stats?.practiceMinutes?.[p.id] ?? 0), 0
          );
          const level = getLevel(totalXp);
          const active = totalXp > 0;
          const layerColor = LAYER_COLORS[layer];

          return (
            <div key={layer}>
              {/* Flow arrow */}
              {i > 0 && (
                <div className="flex justify-center py-1">
                  <span className="font-mono text-sm text-zinc-500">↓</span>
                </div>
              )}

              {/* Layer band */}
              <div
                className="rounded-lg px-6 py-5 transition-all"
                style={{
                  background: active
                    ? `linear-gradient(135deg, ${layerColor}08 0%, transparent 60%)`
                    : "rgba(255,255,255,0.02)",
                  border: `1px solid ${active ? `${layerColor}30` : "rgba(255,255,255,0.04)"}`,
                }}
              >
                <div className="flex items-start gap-5">
                  {/* Number */}
                  <span
                    className="font-mono text-2xl font-bold"
                    style={{ color: active ? layerColor : "#3f3f46" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <h3
                        className="text-base font-bold uppercase tracking-wider"
                        style={{ color: active ? layerColor : "#71717a" }}
                      >
                        {LAYER_LABELS[layer]}
                      </h3>
                      <span className="font-mono text-xs text-zinc-500">
                        {totalXp} xp &middot; {getLevelDiamonds(level)}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      {LAYER_DESC[layer]}
                    </p>

                    {/* Practice nodes */}
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                      {layerPractices.map((p) => {
                        const pXp = stats?.practiceMinutes?.[p.id] ?? 0;
                        return (
                          <Link key={p.id} href={`/practice/${p.id}`} className="flex items-center gap-1.5 font-mono text-xs hover:text-white transition-colors">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: TRADITION_COLORS[p.tradition],
                                opacity: pXp > 0 ? 1 : 0.3,
                              }}
                            />
                            <span className={pXp > 0 ? "text-zinc-300" : "text-zinc-500"}>
                              {p.name}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
