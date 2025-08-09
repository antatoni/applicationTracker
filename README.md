# ApplicationTracker (AppTracker)

Track and manage your job applications with a fast, clean, and privacy‑friendly web app. Add applications in seconds, sort and filter by stage or date, and jump straight to the original posting. Built with React + Vite, Supabase for auth/data, and Tailwind for a polished responsive UI.

## Highlights

- **Zero‑friction UX**: Quick add modal, inline editing, stage dropdowns, and external links open safely in a new tab.
- **Fast by default**: Local caching via `localStorage` for instant reloads and fewer network calls.
- **Secure data model**: Supabase Auth + Row‑Level Security policies to isolate each user’s data.
- **Responsive design**: Tailwind CSS 4 with clean, accessible layout and keyboard‑friendly controls.
- **Deploy‑ready**: Single‑page app rewrite via `vercel.json` for seamless Vercel hosting.

## Demo Screenshots

- Landing hero (light): `public/landing-lg-white.png`
- Landing small (mobile): `public/landing-small-white.jpg`

Add your own app screenshots for the dashboard and list view once deployed.

## Core Features

- **Authentication**: Register and login with Supabase Auth.
- **Create application**: Modal with company, stage, URL (optional), and applied date.
- **Sort & filter**: Sort by newest/oldest and company A→Z/Z→A; filter by stage.
- **Inline editing**: Edit company, stage, and URL directly in the list; Save applies changes.
- **Optimistic feel**: Updates persist to `localStorage` immediately and sync to Supabase.
- **Safe links**: External application URLs open with `rel="noopener noreferrer"`.

## Tech Stack

- React 19 + Vite 6
- React Router 7
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Supabase JS v2 (Auth + Postgres)
- Deployed to Vercel (SPA rewrite)

## Project Structure

- Routing & bootstrap: `src/main.jsx`
- Landing/home + header and session actions: `src/App.jsx`
- Auth screens: `src/components/Login.jsx`, `src/components/Register.jsx`
- Dashboard & list:
  - `src/components/Dashboard.jsx` – guards access, logout, create button, manages app state
  - `src/components/Applications.jsx` – loads, caches, sorts, and filters
  - `src/components/ApplicationBar.jsx` – sort/filter controls and column headers
  - `src/components/Application.jsx` – inline edit, stage/company/url updates
  - `src/components/PopUp.jsx` – modal for creating new applications
- Session context: `src/contexts/SessionStorage.jsx` – tracks auth state and redirects
- API layer:
  - `src/apiRequests/fetching.js` – list fetching (ordered, user‑scoped)
  - `src/apiRequests/updaters.js` – granular field updates + local cache helpers
- Supabase client: `src/database/supabase.js`
- Constants: `src/constants/stage.js`

## Environment Variables

Create a `.env` (or `.env.local`) in the project root with your Supabase credentials:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Vite exposes these as `import.meta.env.VITE_*` (see `src/database/supabase.js`).

## Getting Started (Local)

1. Install Node.js 18+.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure env vars as above.
4. Run the dev server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build && npm run preview
   ```

## How It Works (Key Design Choices)

- **Session‑aware routing**: `Dashboard` redirects unauthenticated users to login.
- **Local caching**: `Applications` stores the latest successful fetch into `localStorage` under `cachedApps` for instant subsequent loads.
- **Optimistic UI feel**: `updateLocalStorageField` mirrors edits immediately in cache; network updates run via `updaters.js`.
- **Separation of concerns**: API calls live under `src/apiRequests/`; the UI components are small, focused, and composable.
- **Safety**: External links use `target="_blank"` with `rel="noopener noreferrer"`.

## Strengths to Highlight

- **Speed and responsiveness** from Vite + local caching.
- **Simplicity** in the UI and code structure for easy maintenance.
- **Scalability** via Supabase’s managed Postgres and Auth.
- **Deployability** with one‑click hosting on Vercel and SPA rewrite included.
