import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/db/client";
import type { SessionStats } from "./types";

export function useSessions(filters?: { tradition?: string; practiceId?: string }) {
  return useQuery({
    queryKey: ["sessions", filters],
    queryFn: async () => {
      let collection = db.sessions.orderBy("timestamp");
      const all = await collection.reverse().toArray();
      return all.filter((s) => {
        if (filters?.tradition && s.tradition !== filters.tradition) return false;
        if (filters?.practiceId && s.practiceId !== filters.practiceId) return false;
        return true;
      });
    },
  });
}

export function useSessionStats() {
  return useQuery<SessionStats>({
    queryKey: ["session-stats"],
    queryFn: async () => {
      const rows = await db.sessions.toArray();

      const traditionMinutes: Record<string, number> = {};
      const practiceMinutes: Record<string, number> = {};
      const calendarData: Record<string, number> = {};
      let totalMinutes = 0;

      for (const row of rows) {
        totalMinutes += row.duration;
        traditionMinutes[row.tradition] = (traditionMinutes[row.tradition] ?? 0) + row.duration;
        practiceMinutes[row.practiceId] = (practiceMinutes[row.practiceId] ?? 0) + row.duration;
        const day = row.timestamp.split("T")[0];
        calendarData[day] = (calendarData[day] ?? 0) + row.duration;
      }

      // Streak
      const days = [...new Set(rows.map((r) => r.timestamp.split("T")[0]))].sort().reverse();
      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;
      const today = new Date().toISOString().split("T")[0];

      if (days.length > 0) {
        const checkDate = new Date(today);
        for (let i = 0; i < 365; i++) {
          const dateStr = checkDate.toISOString().split("T")[0];
          if (days.includes(dateStr)) {
            tempStreak++;
            if (i <= 1 || currentStreak > 0) currentStreak = tempStreak;
          } else if (i > 0) {
            longestStreak = Math.max(longestStreak, tempStreak);
            tempStreak = 0;
            if (currentStreak > 0 && i > 1) break;
          }
          checkDate.setDate(checkDate.getDate() - 1);
        }
        longestStreak = Math.max(longestStreak, tempStreak);
      }

      return {
        totalSessions: rows.length,
        totalMinutes,
        traditionMinutes,
        practiceMinutes,
        currentStreak,
        longestStreak,
        calendarData,
      };
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
      const id = crypto.randomUUID();
      const timestamp = new Date().toISOString();
      await db.sessions.add({
        id,
        practiceId: data.practiceId,
        tradition: data.tradition,
        duration: data.duration,
        quality: data.quality,
        notes: data.notes,
        phenomenology: data.phenomenology,
        timestamp,
      });
      return { id, timestamp };
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
      await db.sessions.delete(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["session-stats"] });
    },
  });
}

export function useCurriculumProgress() {
  return useQuery({
    queryKey: ["curriculum"],
    queryFn: async () => {
      const rows = await db.curriculum.orderBy("week").toArray();
      return rows.map((r) => ({
        week: r.week,
        completed: r.completed,
        completedAt: r.completedAt,
      }));
    },
  });
}

export function useToggleCurriculumWeek() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { week: number; completed: boolean }) => {
      await db.curriculum.put({
        week: data.week,
        completed: data.completed,
        completedAt: data.completed ? new Date().toISOString() : null,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["curriculum"] });
    },
  });
}
