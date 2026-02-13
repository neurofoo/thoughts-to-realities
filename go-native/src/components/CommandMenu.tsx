"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crosshair, BookOpen, ScrollText, Route, Layers } from "lucide-react";

/**
 * Persistent bottom nav — always visible except during sessions.
 * Simple, clear, clickable. No hidden menus.
 */

const NAV = [
  { href: "/", icon: Crosshair, label: "Train" },
  { href: "/practices", icon: BookOpen, label: "Codex" },
  { href: "/journal", icon: ScrollText, label: "Log" },
  { href: "/curriculum", icon: Route, label: "Path" },
  { href: "/stack", icon: Layers, label: "Stack" },
];

export function CommandMenu() {
  const pathname = usePathname();

  // Hide during active sessions
  if (pathname.startsWith("/session/")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around py-3 px-4"
      style={{
        background: "linear-gradient(to top, rgba(8,8,12,0.98) 0%, rgba(8,8,12,0.9) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
      }}
    >
      {NAV.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-4 py-1 transition-colors ${
              active ? "text-amber-500" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-mono text-[10px] uppercase tracking-wider">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
