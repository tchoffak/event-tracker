# Event Tracker: Design

## Goal
Users sign up, create events, and RSVP to other people's events.

## MVP scope
- Sign up / log in
- Create, view, edit, delete events (organizer only for edit/delete)
- RSVP to an event (one RSVP per user per event)
- Deployed at a public URL

## Out of scope (later)
Reminders, search/filters, calendar export, waitlists, email verification, password reset.

## Stack
Node + TypeScript + Express, PostgreSQL, React (Vite). Monolith.

## Data model
- users(id, name, email UNIQUE, password_hash, created_at)
- events(id, organizer_id -> users, title, description, starts_at, ends_at, location, capacity, created_at)
- rsvps(id, event_id -> events, user_id -> users, status, created_at)
  - UNIQUE(event_id, user_id)

## Key decisions
- All timestamps stored in UTC; converted to local time in the UI only.
- Passwords hashed (bcrypt/argon2); never stored or logged in plain text.
- Only an event's organizer can edit or delete it.
- Server validates all input; the client is never trusted.