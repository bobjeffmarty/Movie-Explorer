# Movie Explorer (JavaScript)

A simple Movie Explorer prototype built with **Next.js** and **plain JavaScript**.

## Features

- Search movies by title
- View movie details in a modal
- Add/remove favorites
- Save a personal rating (1–5) and note for each favorite
- Persist favorites in LocalStorage
- Keep the TMDB API token server-side through Next.js route handlers
- Handle empty states and API errors

## Tech Decisions & Tradeoffs

- **Next.js App Router** keeps the frontend and backend proxy in one project.
- **Route handlers** protect the TMDB token so it never reaches browser code.
- **Plain JavaScript instead of TypeScript** was chosen to move faster and keep the solution easy to explain in a short take-home window.
- **LocalStorage** was chosen over a database to satisfy persistence with minimal complexity.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root:

```bash
TMDB_API_TOKEN=your_tmdb_bearer_token_here
```

3. Start the app:

```bash
npm run dev
```

4. Open:

```text
http://localhost:3000
```

## Getting a TMDB Token

1. Create a TMDB account
2. Generate a Bearer Token
3. Put it in `.env.local` as `TMDB_API_TOKEN`

## Deployment

This app is ready to deploy to Vercel.

- Add the same `TMDB_API_TOKEN` environment variable in your hosting provider
- Deploy the repo or folder
- Add the hosted link below after deployment

Hosted app link: `ADD_YOUR_LINK_HERE`

## Known Limitations

- No server-side favorites persistence
- No pagination
- No debounced search
- Minimal styling
- No automated tests

## What I’d Improve With More Time

- Add search debouncing and pagination
- Add server-side persistence with SQLite or Postgres
- Improve accessibility and keyboard support
- Add tests for API routes and LocalStorage behavior
- Add loading skeletons and more refined UI polish
