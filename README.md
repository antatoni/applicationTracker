# AppTracker

A simple job application tracker. Add applications, organize by stage, sort by date or company name, never lose track of where you applied.

## Features

- Quick modal to log new applications with company name, stage, URL, and date applied
- Inline editing for everything
- Sort by newest/oldest or company A-Z
- Filter by application stage
- Caches data locally for fast reloads
- Mobile-friendly

## Setup

### Frontend

You'll need Node.js 18+ installed.

```bash
npm install
npm run dev
```

Then create a `.env.local` file with your backend URL:

```
VITE_API_URL=http://localhost:YOUR_BACKEND_PORT
```

### Backend

You'll need .NET 10 SDK and PostgreSQL.

1. Navigate to `backend/ApplicationTracker.Api/`
2. Copy `appsettings.Example.json` to `appsettings.json` and fill in your values:
   - PostgreSQL connection string
   - JWT secret key (minimum 32 characters)
   - JWT issuer/audience URLs

3. Run migrations:

   ```bash
   dotnet ef database update
   ```

4. Start the API:
   ```bash
   dotnet run
   ```

The backend will run on `http://localhost:8080` by default (or use the PORT environment variable).

## Tech

- React + Vite (frontend)
- ASP.NET Core + custom JWT auth (backend)
- PostgreSQL (database)
- Tailwind CSS (styling)
- Hosted on Vercel (frontend), Railway (backend), Aiven (database)

## Project layout

- `src/components/` - React components for login, dashboard, app list
- `src/services/` - API service calls
- `src/contexts/` - Session/auth state management
- `backend/ApplicationTracker.Api/` - ASP.NET Core API
- `backend/ApplicationTracker.Api/Models/` - Database models
- `backend/ApplicationTracker.Api/Controllers/` - API endpoints
