# Watchlist App

A personal Netflix-style watchlist web app for tracking anime, movies, and series. Built with Next.js, Firebase, and Tailwind CSS.

## Features

- 🔐 **Firebase Authentication** — Google sign-in and email/password
- 📝 **CRUD Operations** — Add, edit, delete, and organize your watchlist items
- 🎬 **Netflix-style UI** — Dark theme with smooth animations and responsive design
- 🔍 **Search & Filter** — Search by title, filter by type/status, sort by various criteria
- 🎥 **TMDB Integration** — Search movies and anime via The Movie Database API
- ⭐ **Rating System** — Rate items from 0–10
- 📊 **Status Tracking** — Plan to Watch, Watching, Completed, Dropped
- 📱 **Mobile-First** — Fully responsive design

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth + Firestore) + Firebase Admin SDK (server-side token verification)
- **Movie/Anime Data**: TMDB API
- **Deployment**: Vercel
- **Notifications**: react-hot-toast

## Prerequisites

- Node.js 18+ and npm
- Firebase account (free tier works)
- TMDB API key (free — [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))
- Vercel account (free tier works)

---

## Getting Started

1. **Clone the repo and install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   Copy `.env.local.example` to `.env.local` and fill in your values:

   ```bash
   cp .env.local.example .env.local
   ```

   | Variable | Where to get it |
   |---|---|
   | `NEXT_PUBLIC_FIREBASE_*` | Firebase Console → Project Settings → Your apps → Web app |
   | `TMDB_API_KEY` | [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api) |
   | `FIREBASE_ADMIN_PROJECT_ID` | Firebase Console → Project Settings → Service Accounts |
   | `FIREBASE_ADMIN_CLIENT_EMAIL` | Same — Generate new private key |
   | `FIREBASE_ADMIN_PRIVATE_KEY` | Same — copy `private_key` from the downloaded JSON, replace newlines with `\n` |

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx                  # Auth layout (centered card)
│   │   └── login/
│   │       └── page.tsx                # Login page
│   ├── (dashboard)/
│   │   ├── layout.tsx                  # Dashboard layout (navbar + auth guard)
│   │   └── watchlist/
│   │       └── page.tsx                # Main watchlist page
│   ├── api/
│   │   └── tmdb/
│   │       └── search/
│   │           └── route.ts            # Auth-gated TMDB search proxy
│   ├── globals.css                     # Global styles
│   └── layout.tsx                      # Root layout
├── components/
│   ├── auth/
│   │   └── AuthCard.tsx                # Login/signup card
│   ├── layout/
│   │   ├── AppNavbar.tsx               # Top navigation bar
│   │   └── AuthGuard.tsx               # Protected route wrapper
│   ├── ui/                             # Reusable UI components
│   │   ├── ConfirmDialog.tsx
│   │   ├── EmptyState.tsx
│   │   ├── FilterBar.tsx
│   │   ├── Modal.tsx
│   │   ├── RatingBadge.tsx
│   │   ├── SearchInput.tsx
│   │   ├── Spinner.tsx
│   │   └── StatusPill.tsx
│   ├── watchlist/                      # Watchlist-specific components
│   │   ├── AddItemButton.tsx
│   │   ├── HeroFeatured.tsx
│   │   ├── WatchCard.tsx
│   │   ├── WatchForm.tsx
│   │   └── WatchRow.tsx
│   └── TmdbSearchModal.tsx             # TMDB movie/anime search modal
├── hooks/
│   ├── useAuth.ts                      # Firebase auth hook
│   └── useWatchlist.tsx                # Firestore CRUD + context provider
├── lib/
│   ├── firebaseAdmin.ts                # Firebase Admin SDK (server-side)
│   └── firebaseClient.ts               # Firebase client SDK
├── types/
│   └── watchlist.ts                    # TypeScript types
├── firestore.rules                     # Firestore security rules
└── .env.local.example                  # Environment variables template
```

---

**Built with Next.js, Firebase, and Tailwind CSS**
