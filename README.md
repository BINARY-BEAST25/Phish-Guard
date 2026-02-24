# 🛡️ PhishGuard — Advanced Phishing Awareness & Defense Platform

> **React 18 · Vite 7 · Firebase · Finn-AI Neural Engine · Cyber Carnival Hackathon**

PhishGuard is a high-fidelity, gamified phishing awareness and training platform. Built with a "Cyber-Tactical" aesthetic, it transforms traditional security training into an immersive experience featuring phishing simulations, adaptive learning flows, and an integrated AI advisor.

---

## 🌌 Core Intelligence Features

### 🤖 Finn-AI Neural Advisor
Integrated AI assistant in Neural Academy that explains phishing tactics, recommends response playbooks, and helps users learn verification workflows using Gemini models.

### 🎭 High-Fidelity Simulator
Interactive side-by-side phishing simulation where users detect suspicious sender details, urgency patterns, malicious links, and social-engineering signals.

### 🧠 Adaptive Quiz System
Difficulty-aware quiz flow (`easy` → `medium` → `hard`) based on user performance, with XP rewards and progress persistence.

### 📡 Global Hall of Defenders
Realtime leaderboard and profile-linked XP progression powered by Firestore.

### 👤 Agent Dossier & Badges
Profile system with XP, streak tracking, completion status, and progression visibility.

### 🖼️ Intelligence Gallery
Community-driven phishing example gallery and admin-managed content pipeline.

---

## 🛠️ Tech Stack

- **Frontend:** React 18 (Hooks, Context API)
- **Build System:** Vite 7
- **Routing:** React Router 6
- **Database:** Firebase Firestore (realtime sync)
- **Authentication:** Firebase Auth (Google, email/password, guest mode)
- **Storage:** Firebase Storage (avatars + gallery uploads)
- **AI Engine:** Google Gemini API (model fallback sequence)
- **PWA:** `vite-plugin-pwa` + Workbox
- **Styling:** custom design tokens (`src/styles`) + component-level styling

---

## 🚀 Deployment & Installation

### 1. Initialize Local Environment
```bash
git clone https://github.com/BINARY-BEAST25/Phish-Guard.git
cd Phish-Guard
npm install
```

### 2. Configure Frequencies (`.env`)
Create a `.env` file in the root directory (or copy from `.env.example`):

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_ADMIN_ACCESS_KEY=your_admin_access_key_here
```

### 3. Launch Platform
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

## 📂 Architecture Overview

```text
src/
├── components/         # Core UI units, overlays, canvas effects, home widgets
│   ├── canvas/         # Matrix, Hex-grid, Lightning, Particle effects
│   └── home/           # Home page cards, stats, feedback, red-flag widgets
├── constants/          # Quiz/simulator data, modules, badges, tips, gallery
│   └── trainingModules/
├── context/            # Auth and user profile state providers
├── firebase/           # Auth/DB/Storage wrappers + seed helpers
├── hooks/              # XP system, toast system, Finn tips
├── pages/              # Platform pages
│   ├── Home/
│   ├── AILearning/
│   ├── Simulator/
│   ├── Quiz/
│   ├── Leaderboard/
│   ├── Gallery/
│   ├── Progress/
│   ├── Profile/
│   ├── Information/
│   ├── Admin/
│   └── Login/
└── styles/             # Tokens + global style definitions
```

---

## 🍱 Design System

PhishGuard uses a custom "Tactical Readability" system:

- **Typography:** `Orbitron` for primary headings, `Share Tech Mono` for telemetry/system UI, `Rajdhani` for body text.
- **Palette:** neon cyan/red accents on deep dark backgrounds.
- **Motion:** scanline, glitch, pulse, and tactical reveal animations.

---

## 🛂 Admin Command Center

The platform includes a restricted admin portal for managing training and gallery content.

- **Portal URL:** `/admin` (redirects to `/admin-command-center`)
- **Access Key:** `VITE_ADMIN_ACCESS_KEY` in `.env`

---

## 🔐 Firestore Rules vs Storage Rules

Both files are required in the current app:

- **`firestore.rules`** secures database docs (users, progress, leaderboard, content metadata).
- **`storage.rules`** secures file uploads/downloads in Firebase Storage.

Storage is actively used by:

- `src/pages/Profile/index.jsx` (avatar upload)
- `src/pages/Admin/index.jsx` (gallery upload)
- `src/firebase/storage.js` (upload/delete helpers)

If you remove Storage features entirely, then remove Storage usage from code, remove the `storage` block in `firebase.json`, and only then remove `storage.rules`.

---

## 🧭 App Routes

- `/` Home
- `/quiz`
- `/simulator`
- `/leaderboard`
- `/gallery`
- `/progress`
- `/profile`
- `/neural-academy`
- `/ai-learning` (redirects to `/neural-academy`)
- `/admin` (redirects to `/admin-command-center`)
- `/admin-command-center`
- `/about`
- `/privacy`
- `/faq`
- `/checklist`

---

## 📜 Scripts

- `npm run dev` — start local dev server
- `npm run build` — create production build (`dist/`)
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint for `src`
- `npm run deploy` — build + full Firebase deploy
- `npm run deploy:hosting` — build + hosting deploy only
- `npm run deploy:rules` — deploy Firestore + Storage rules
- `npm run deploy:indexes` — deploy Firestore indexes
- `npm run firebase:emulate` — run Firebase emulators

---

## 🛡️ License & Mission

Built for cybersecurity awareness and phishing defense education.  
Goal: convert users from easy targets into informed, resilient defenders.
