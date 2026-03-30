# Movie Explorer

A lightweight Movie Explorer application built with Next.js that allows users to search for movies, view details, and save favorites with personal ratings and notes. Written by Bilal Akhter as a take home assignment for a Software Engineer position at Ring Savvy. 


## Features

- Search movies by title
- View movie details (poster, overview, runtime, release year)
- Save/remove movies to a personal list
- Add a rating (1–5) and notes to favorited movies
- Persist saved movies using LocalStorage
- Server-side proxy for external API (TMDB)


## Tech Stack

- Frontend: Next.js (App Router), React (JavaScript)
- Backend: Next.js Route Handlers
- Persistence: LocalStorage (client-side)
- External API: TMDB


## Setup

1. Install dependencies:

npm install

2. Update the `.env` file in the root:

TMDB_API_TOKEN=your_tmdb_bearer_token_here

- Use the TMDB `API Read Access Token` found under User Profile Settings > API.

3. Start the development server:

npm run dev

4. Open:

http://localhost:3000


## Technical Decisions & Tradeoffs

### Next.js (Full-Stack Approach)

I used Next.js App Router to keep both frontend and backend logic in a single project. This simplifies development and deployment, while still allowing a clear separation of concerns.

Route handlers act as a lightweight backend layer, similar to controllers in a traditional .NET application.


### API Proxy for TMDB

The TMDB API is accessed through Next.js API routes instead of directly from the browser.

Why:
- Prevents exposing the API key to the client
- Centralizes external API logic
- Allows normalization of responses before they reach the UI


### Data Normalization Layer

TMDB responses are mapped into a simplified internal shape before being used in components.

Why:
- Prevents UI from depending on third-party field names
- Makes components easier to reason about


### State Management (React Hooks)

State is managed locally using React hooks and a custom useFavorites hook.

Why:
- Keeps the solution simple and easy to follow
- Avoids introducing unnecessary complexity
- Appropriate for the size and scope of the application


### LocalStorage for Persistence

Favorites (including rating and notes) are stored in LocalStorage.

Why:
- Meets persistence requirements without backend complexity
- Keeps the app self-contained for a short take-home
- Fast to implement and easy to reason about

Tradeoff:
- Data is not shared across devices or sessions beyond the browser


### UI Simplicity Over Polish

The UI is intentionally minimal, focusing on clarity and usability over visual design.

Why:
- Prioritized functionality within the time constraint and avoiding over-engineering
- Ensured a complete, working user flow instead of partial features


### Explicit Loading and Error States

The app explicitly handles:
- Empty search input
- No results found
- API/network failures
- Loading states for both search and details


## Known Limitations

- No server-side persistence (favorites are browser-only)
- No pagination or infinite scroll for search results
- Search is triggered on submit
- Minimal accessibility considerations
- Not mobile friendly
- No automated tests


## Potential Future Improvements

- Add server-side persistence
- Implement search debouncing and pagination
- Improve accessibility (keyboard navigation, ARIA roles)
- Introduce basic test coverage for API routes and hooks
- Enhance UI polish and responsiveness
- Mobile friendly UI

---

## Summary

This project focuses on delivering a complete, functional vertical slice within a constrained time frame. The architecture keeps concerns separated while remaining simple, with deliberate tradeoffs to avoid over-engineering.
