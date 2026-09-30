# Event Tracker

Full-stack event tracking app. See docs/design.md for the data model and decisions.

## Structure
- backend/  Express + TypeScript API
- frontend/ React (Vite)
- docs/     design and task notes

## Rules
- Work on ONE task at a time; ask before changing anything outside the task.
- Never commit secrets. Config goes in .env (gitignored).
- Validate all request input on the server.
- Every new endpoint needs at least one test.
- Show me a plan before writing code for anything non-trivial.
- Do not add dependencies without telling me why.

## Commands
- DB: Postgres 16 in Docker (container: event-tracker-db, db: event_tracker). Start with: docker start event-tracker-db
- Migrations: SQL files in backend/migrations, run in numeric order