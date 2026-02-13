# Go Native — Build Plan

## What Happened

The previous attempt corrupted the npm cache by running `npm cache clean --force` and then reinstalling packages, which caused Next.js compiled files to download as null bytes (all zeros). This made every subsequent `npm install` of Next.js produce broken packages. The SWC binary segfaults were a symptom of this corruption, not a platform issue. Next.js 16 works fine in this environment — dozens of apps have been built here before.

## ABSOLUTE RULES FOR FUTURE SELF

1. **NEVER run `npm cache clean --force`** — this is what destroyed the environment
2. **NEVER downgrade Next.js versions** as a "fix" — that's a hack
3. **NEVER try `--ignore-scripts`** — that's a hack
4. **NEVER install Next.js canary** — that's a hack
5. **If `npm run build` fails, STOP and tell the user.** Do not attempt ANY workaround.
6. Standard `npx create-next-app@latest`, standard `npm install`, standard `npm run build`
7. The typegen segfault during `create-next-app` scaffolding is cosmetic and harmless — ignore it
8. Do NOT investigate SWC binaries, do NOT check glibc, do NOT run `od` on node_modules files

## Stack

- Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- shadcn/ui components
- SQLite via Drizzle ORM + better-sqlite3
- TanStack Query for client data fetching/mutations
- Location: `/Users/donald/neurofoo/thoughts-to-realities/go-native/`

## Step 0: Scaffold + Dependencies

```bash
cd /Users/donald/neurofoo/thoughts-to-realities
npx create-next-app@latest go-native --typescript --tailwind --app --src-dir --use-npm --yes
cd go-native
npm install drizzle-orm better-sqlite3 @tanstack/react-query
npm install -D drizzle-kit @types/better-sqlite3
npx shadcn@latest init -d
npx shadcn@latest add card button badge dialog accordion slider textarea input tabs separator progress
npm run build
```

**STOP if `npm run build` fails.** Tell the user. Do not proceed.

## Step 1: Types + Static Data

Create these files:

### `src/lib/types.ts`
- `Tradition` union type: dzogchen, kashmir-shaivism, vajrayana, zen, yoga, hesychasm, synthesis
- `Layer` union type: shutdown, simulation, fusion, dissolution
- `Difficulty` union type: beginner, intermediate, advanced
- `Practice` interface: id, name, tradition, layer, difficulty, defaultDuration, shortDescription, instructions, cyberpunkContext, source
- `Session` interface: id, practiceId, date, plannedDuration, actualDuration, completed, qualityRating, notes, phenomenology, createdAt
- `CurriculumWeek` interface: week, title, tradition, practiceIds, description, cyberpunkTest
- `SessionStats` interface: totalSessions, totalMinutes, currentStreak, traditionsExplored, calendarData, traditionCounts
- Constants: TRADITION_LABELS, TRADITION_COLORS, LAYER_LABELS, LAYER_ORDER, DIFFICULTY_LABELS

### `src/lib/practices.ts`
All 24 practices with full instructions and cyberpunk context. Source: research/cyberpunk-mental-training-mapping.md

**Dzogchen (4 practices):** Glimpse Practice, Headless Way, Sky Gazing, PHAT! Practice
**Kashmir Shaivism (4):** Breath Gap Dharana, Spanda Awareness, Nadi Shodhana, VBT Body Centering
**Vajrayana (4):** Syllable Visualization, Tonglen, Generation Stage, Tummo Preparation
**Zen (3):** Zazen, Kinhin, Koan Contemplation
**Yoga (3):** Pranayama, Pratyahara, Dharana
**Hesychasm (3):** Jesus Prayer, Nepsis, Descent to the Heart
**Synthesis (4):** Zetsu Shutdown, Image Training, Full Stack Protocol, Ghost Dive

### `src/lib/curriculum.ts`
13-week schedule:
- Weeks 1-2: Dzogchen
- Weeks 3-4: Kashmir Shaivism
- Weeks 5-6: Vajrayana
- Weeks 7-8: Zen
- Weeks 9-10: Yoga
- Weeks 11-12: Hesychasm
- Week 13: Synthesis (full stack)

## Step 2: Database Layer

### `src/db/schema.ts`
Drizzle SQLite schema:
- `sessions` table: id (text PK), practice_id, date, planned_duration, actual_duration, completed (boolean), quality_rating (real), notes, phenomenology, created_at
- `curriculum_progress` table: week (integer PK), completed (boolean), completed_at (text nullable)

### `src/db/index.ts`
- Drizzle client wrapping better-sqlite3
- WAL mode pragma
- Auto-create tables via raw SQL on first import

### `drizzle.config.ts`
Points to `./go-native.db`

## Step 3: API Routes

### `src/app/api/sessions/route.ts`
- GET: list sessions, optional filter by practiceId or tradition
- POST: create session (generate UUID, set createdAt)

### `src/app/api/sessions/[id]/route.ts`
- GET: single session by id
- DELETE: delete session by id

### `src/app/api/sessions/stats/route.ts`
- GET: aggregated stats — streak, total minutes, tradition counts, 30-day calendar data

### `src/app/api/curriculum/route.ts`
- GET: all curriculum_progress rows
- PUT: toggle week completion (upsert)

## Step 4: TanStack Query Hooks

### `src/lib/queries.ts`
- `useSessions(filters?)` — fetches session list
- `useSessionStats()` — fetches aggregated stats
- `useCreateSession()` — POST mutation, invalidates sessions + stats
- `useDeleteSession()` — DELETE mutation, invalidates sessions + stats
- `useCurriculumProgress()` — fetches curriculum state
- `useToggleCurriculumWeek()` — PUT mutation, invalidates curriculum

## Step 5: Theme + Layout + Navigation

### `src/app/globals.css`
Tailwind 4 `@theme` block with design tokens:
- BG: #0a0e17, Surface: #111827, Elevated: #1a2234
- Primary: #0e8a6f, Text: #e0e6ed, Muted: #8892a4
- Border: #1e293b
- Tradition colors: dzogchen=#8b5cf6, kashmir=#f59e0b, vajrayana=#ef4444, zen=#6366f1, yoga=#06b6d4, hesychasm=#d946ef, synthesis=#0e8a6f
- Space Grotesk + Space Mono fonts

### `src/app/layout.tsx`
Root layout with fonts via next/font/google, `<html class="dark">`, wraps children in Providers + Navigation

### `src/app/providers.tsx`
"use client" — QueryClientProvider wrapper

### `src/components/Navigation.tsx`
Sidebar (desktop) / header (mobile) linking to Dashboard, Practices, Journal, Curriculum, Stack

## Step 6: Shared Components

### `src/components/PracticeCard.tsx`
Card with practice name, tradition badge (colored), layer, difficulty, duration

### `src/components/Timer.tsx`
SVG ring countdown timer. Web Audio API bell (528Hz sine wave decay) on completion. States: setup → running → paused → complete.

### `src/components/SessionLogger.tsx`
Post-session form: quality 1-10 slider, notes textarea, phenomenology textarea, save button

### `src/components/ProgressChart.tsx`
30-day calendar heatmap from session stats calendarData

### `src/components/StackDiagram.tsx`
Four-layer diagram (Dissolution at top → Shutdown at bottom), each layer lists its practices as links

### `src/components/CurriculumTimeline.tsx`
13-week accordion. Each week shows: title, tradition badge, description, practice links, cyberpunk test, completion toggle button

## Step 7: Pages

### Dashboard (`src/app/page.tsx`)
"use client". Stats cards (streak, total time, sessions, traditions), 30-day heatmap, recommended next practice, tradition breakdown bars

### Practices (`src/app/practices/page.tsx`)
"use client". Filterable grid of PracticeCards. Filter buttons for tradition, layer, difficulty.

### Practice Detail (`src/app/practice/[id]/page.tsx`)
"use client". Full instructions, cyberpunk context, source, "Start Session" link. Uses `use(params)` for Next.js 16 async params.

### Active Session (`src/app/session/[id]/page.tsx`)
"use client". Three phases: setup (duration picker) → timer (countdown + bell) → logger (quality/notes form) → redirect to journal on save.

### Journal (`src/app/journal/page.tsx`)
"use client". Session history list with tradition filter. Expandable cards showing notes/phenomenology. JSON export button. Delete button per session.

### Curriculum (`src/app/curriculum/page.tsx`)
"use client". CurriculumTimeline component. Progress counter. Honest warnings section.

### Stack (`src/app/stack/page.tsx`)
"use client". Operational sequence diagram (Zetsu → Image → Synch → Ghost). StackDiagram component. Key insight section.

## Step 8: Build + Verify

```bash
npm run build
```

Must produce zero errors. If it fails, STOP.

## Design Tokens

| Token | Value |
|-------|-------|
| BG | #0a0e17 |
| Surface | #111827 |
| Elevated | #1a2234 |
| Primary | #0e8a6f |
| Primary Light | #10b98e |
| Text | #e0e6ed |
| Text Muted | #8892a4 |
| Border | #1e293b |
| Border Light | #334155 |
| Dzogchen | #8b5cf6 |
| Kashmir Shaivism | #f59e0b |
| Vajrayana | #ef4444 |
| Zen | #6366f1 |
| Yoga | #06b6d4 |
| Hesychasm | #d946ef |
| Synthesis | #0e8a6f |

## File Structure

```
go-native/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── providers.tsx
│   │   ├── page.tsx                  # Dashboard
│   │   ├── practices/page.tsx
│   │   ├── practice/[id]/page.tsx
│   │   ├── session/[id]/page.tsx
│   │   ├── journal/page.tsx
│   │   ├── curriculum/page.tsx
│   │   ├── stack/page.tsx
│   │   └── api/
│   │       ├── sessions/route.ts
│   │       ├── sessions/[id]/route.ts
│   │       ├── sessions/stats/route.ts
│   │       └── curriculum/route.ts
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Timer.tsx
│   │   ├── SessionLogger.tsx
│   │   ├── ProgressChart.tsx
│   │   ├── StackDiagram.tsx
│   │   ├── CurriculumTimeline.tsx
│   │   ├── PracticeCard.tsx
│   │   └── ui/                       # shadcn generated
│   ├── lib/
│   │   ├── types.ts
│   │   ├── practices.ts
│   │   ├── curriculum.ts
│   │   ├── queries.ts
│   │   └── utils.ts                  # shadcn generated
│   └── db/
│       ├── index.ts
│       └── schema.ts
├── drizzle.config.ts
├── components.json
└── package.json
```
