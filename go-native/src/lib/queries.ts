import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Session, SessionStats } from "./types";

export function useSessions(filters?: { tradition?: string; practiceId?: string }) {
  return useQuery<Session[]>({
    queryKey: ["sessions", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.tradition) params.set("tradition", filters.tradition);
      if (filters?.practiceId) params.set("practiceId", filters.practiceId);
      const res = await fetch(`/api/sessions?${params}`);
      return res.json();
    },
  });
}

export function useSessionStats() {
  return useQuery<SessionStats>({
    queryKey: ["session-stats"],
    queryFn: async () => {
      const res = await fetch("/api/sessions/stats");
      return res.json();
    },
  });
}

export function useCreateSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      practiceId: string;
      tradition: string;
      duration: number;
      quality: number;
      notes: string;
      phenomenology: string[];
    }) => {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["session-stats"] });
    },
  });
}

export function useDeleteSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["session-stats"] });
    },
  });
}

export function useCurriculumProgress() {
  return useQuery<{ week: number; completed: boolean; completedAt: string | null }[]>({
    queryKey: ["curriculum"],
    queryFn: async () => {
      const res = await fetch("/api/curriculum");
      return res.json();
    },
  });
}

export function useToggleCurriculumWeek() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { week: number; completed: boolean }) => {
      await fetch("/api/curriculum", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["curriculum"] });
    },
  });
}
