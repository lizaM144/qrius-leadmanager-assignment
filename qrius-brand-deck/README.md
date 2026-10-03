# Qrius Lead Manager

A small training application for the Qrius Playwright automation assignment. A sales
lead manager with sign-in, a leads list, search, and create / edit / delete.

- **backend/** : Node + Express + TypeScript API, backed by PostgreSQL.
- **frontend/** : React + Vite + TypeScript web app, in Qrius brand colours.
- **ASSIGNMENT_BRIEF.md** : the student brief. Start here.
- **INSTRUCTOR_BUG_KEY.md** : instructor only. Do not give this to students.

## Quick start

Full step-by-step instructions, including pgAdmin from opening it to refreshing the
data, are in `ASSIGNMENT_BRIEF.md` section 5. In short:

1. Create a PostgreSQL database `qrius_leads` in pgAdmin, then run
   `backend/sql/02_schema_and_seed.sql` in its Query Tool.
2. Backend: `cd backend`, `cp .env.example .env` (set `PGPASSWORD`), `npm install`,
   `npm run dev`. Runs on port 3000.
3. Frontend: `cd frontend`, `npm install`, `npm run dev`. Runs on port 5173.
4. Open `http://localhost:5173/login` and sign in as `admin.qrius` / `Admin@123`.

## Seeded users

| Username | Password | Role |
|----------|----------|------|
| admin.qrius | Admin@123 | ADMIN |
| agent.qrius | Agent@123 | AGENT |

The database seeds 12 leads.
