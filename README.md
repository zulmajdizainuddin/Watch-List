# Watchlist App

A personal Netflix-style watchlist web app for tracking anime, movies, and series. Built with Next.js, Firebase, and Tailwind CSS.

![Watchlist App](https://via.placeholder.com/800x400/111827/FFFFFF?text=Watchlist+App+Screenshot)

## Features

- 🔐 **Firebase Authentication** - Google sign-in and email/password
- 📝 **CRUD Operations** - Add, edit, delete, and organize your watchlist items
- 🎬 **Netflix-style UI** - Dark theme with smooth animations and responsive design
- 🔍 **Search & Filter** - Search by title, filter by type/status, sort by various criteria
- ⭐ **Rating System** - Rate items from 0-10
- 📊 **Status Tracking** - Plan to Watch, Watching, Completed, Dropped
- 📱 **Mobile-First** - Fully responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth + Firestore)
- **Deployment**: Vercel
- **Notifications**: react-hot-toast

## Prerequisites

- Node.js 18+ and npm/yarn
- Firebase account (free tier works)
- GitHub account (for deployment)
- Vercel account (free tier works)

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx          # Auth layout
│   │   └── login/
│   │       └── page.tsx        # Login page
│   ├── (dashboard)/
│   │   ├── layout.tsx          # Dashboard layout with navbar
│   │   └── watchlist/
│   │       └── page.tsx        # Main watchlist page
│   ├── globals.css             # Global styles
│   └── layout.tsx               # Root layout
├── components/
│   ├── auth/
│   │   └── AuthCard.tsx        # Login/signup card
│   ├── layout/
│   │   ├── AppNavbar.tsx       # Top navigation
│   │   └── AuthGuard.tsx       # Protected route wrapper
│   ├── ui/                     # Reusable UI components
│   └── watchlist/              # Watchlist-specific components
├── hooks/
│   ├── useAuth.ts              # Firebase auth hook
│   └── useWatchlist.ts         # Firestore CRUD hook
├── lib/
│   └── firebaseClient.ts       # Firebase initialization
├── types/
│   └── watchlist.ts            # TypeScript types
├── firestore.rules             # Firestore security rules
└── .env.local.example          # Environment variables template
```

---

**Built with ❤️ using Next.js, Firebase, and Tailwind CSS**
