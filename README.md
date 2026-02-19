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

## 🚀 Setup Instructions

### Step 1: Firebase Project Setup

#### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name (e.g., `watchlist-app`)
4. Disable Google Analytics (optional, can enable later)
5. Click **"Create project"**

#### 1.2 Register Web App

1. In Firebase Console, click the **Web icon** (`</>`) or **"Add app"** > **Web**
2. Register your app:
   - App nickname: `Watchlist Web` (or any name)
   - **Do NOT** check "Also set up Firebase Hosting"
   - Click **"Register app"**
3. **Copy the Firebase configuration object** - you'll need these values:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

#### 1.3 Enable Authentication

1. In Firebase Console, go to **Build** > **Authentication**
2. Click **"Get started"**
3. Go to **Sign-in method** tab
4. Enable **Google**:
   - Click **Google**
   - Toggle **Enable**
   - Select a support email
   - Click **Save**
5. Enable **Email/Password**:
   - Click **Email/Password**
   - Toggle **Enable** (first option)
   - Click **Save**

#### 1.4 Create Firestore Database

1. In Firebase Console, go to **Build** > **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll add security rules next)
4. Select a location (choose closest to your users)
5. Click **"Enable"**

#### 1.5 Set Firestore Security Rules

1. In Firestore Database, go to **Rules** tab
2. Copy the contents of `firestore.rules` from this project
3. Paste into the rules editor
4. Click **"Publish"**

**Alternative**: Use Firebase CLI (if you have it installed):
```bash
firebase deploy --only firestore:rules
```

#### 1.6 Create Firestore Indexes (Optional but Recommended)

Firestore may prompt you to create indexes when you run queries. If you see an error link in the console, click it to create the index automatically.

Or manually create:
- Collection: `watchlist`
- Fields: `userId` (Ascending), `createdAt` (Descending)
- Query scope: Collection

---

### Step 2: Local Development Setup

#### 2.1 Install Dependencies

```bash
npm install
# or
yarn install
```

#### 2.2 Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and fill in your Firebase config values:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC... (from Step 1.2)
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

#### 2.3 Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### 2.4 Test Authentication

1. Go to `/login`
2. Try signing in with Google or creating an email account
3. After sign-in, you should be redirected to `/watchlist`

---

### Step 3: Deploy to Vercel

#### 3.1 Push to GitHub

1. Initialize git (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Watchlist app"
   ```

2. Create a new repository on GitHub:
   - Go to [GitHub](https://github.com/new)
   - Name it (e.g., `watchlist-app`)
   - **Do NOT** initialize with README (we already have one)
   - Click **"Create repository"**

3. Push to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/watchlist-app.git
   git branch -M main
   git push -u origin main
   ```

#### 3.2 Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repository (`watchlist-app`)
5. Configure project:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. **Add Environment Variables**:
   - Click **"Environment Variables"**
   - Add all 6 Firebase variables from `.env.local`:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - Make sure they're set for **Production**, **Preview**, and **Development**
7. Click **"Deploy"**

#### 3.3 Update Firebase Authorized Domains

After Vercel deployment, you need to allow your Vercel domain:

1. In Firebase Console, go to **Authentication** > **Settings** > **Authorized domains**
2. Click **"Add domain"**
3. Add your Vercel domain (e.g., `your-app.vercel.app`)
4. If you have a custom domain, add that too

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

## 🔧 Usage

### Adding Items

1. Click **"+ Add"** button in navbar
2. Fill in the form:
   - Title (required)
   - Type: Anime / Movie / Series
   - Status: Plan to Watch / Watching / Completed / Dropped
   - Optional: Rating, Notes, Poster URL, Genres, Episodes
3. Click **"Add to Watchlist"**

### Editing Items

- Click on any card to open edit modal
- Or use quick actions from the hero section

### Quick Status Updates

- Click status pills on cards to quickly change status
- Or use action buttons in the hero section

### Search & Filter

- Use the search bar to filter by title
- Use filter bar to filter by type/status
- Sort by: Recently Added, Title A-Z, Rating High-Low

---

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

All Firebase config must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser.

---

## 🔒 Security

- Firestore security rules ensure users can only access their own data
- Authentication is required for all operations
- User ID is automatically set on create/update operations

---

## 📝 License

Personal use only. This is a private project.

---

## 🐛 Troubleshooting

### "Missing Firebase config" error

- Make sure `.env.local` exists and has all required variables
- Restart the dev server after adding env variables
- Check that variable names start with `NEXT_PUBLIC_`

### Authentication not working

- Check Firebase Console > Authentication > Sign-in methods are enabled
- Verify authorized domains include your domain (localhost for dev, Vercel domain for prod)
- Check browser console for specific error messages

### Firestore permission denied

- Verify `firestore.rules` are published in Firebase Console
- Check that you're authenticated (user should be logged in)
- Ensure rules match the structure in `firestore.rules`

### Build errors on Vercel

- Make sure all environment variables are set in Vercel dashboard
- Check build logs for specific errors
- Verify `package.json` has correct dependencies

---

## 📸 Screenshots

_Add screenshots of your app here after deployment_

- Login screen
- Dashboard with watchlist items
- Add/Edit modal
- Mobile responsive view

---

## 🎨 Customization

- Colors: Edit `tailwind.config.ts` to change theme colors
- Fonts: Update `tailwind.config.ts` font family
- Logo: Replace logo in `AppNavbar.tsx`

---

**Built with ❤️ using Next.js, Firebase, and Tailwind CSS**
