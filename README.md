# ⚽ FootQuest

FootQuest is a modern web application built with Next.js 16. It serves as a gaming and community platform for football (soccer) enthusiasts, featuring games, leaderboards, user profiles, a central hub, and premium functionalities.

## ✨ Features

- **User Authentication**: Secure login and registration powered by Supabase.
- **Games Hub**: Engage with various football-related minigames.
- **Global Leaderboard**: Compete with other players and track your rankings.
- **User Profiles**: Manage your personal information, stats, and preferences.
- **Premium Shop**: Access premium features, digital items, and an ad-free experience.
- **PWA Support**: Installable as a Progressive Web App for a native-like experience.
- **Dark/Light Mode**: Full theme customization using `next-themes`.
- **Monetization**: Google AdSense integration with built-in cookie consent management.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [HugeIcons](https://hugeicons.com/)
- **Testing**: [Vitest](https://vitest.dev/) & React Testing Library
- **Linting & Formatting**: ESLint & Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm
- A Supabase project (for Database and Auth)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/FootQuest.git
cd FootQuest
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Supabase credentials and other required variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Add any other required env variables (e.g., AdSense client ID)
```

### Running Locally

Start the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

- `npm run dev`: Starts the development server using Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to catch issues.
- `npm run format`: Formats code using Prettier.
- `npm run typecheck`: Runs TypeScript type checking without emitting files.
- `npm run test`: Runs the Vitest test suite.
- `npm run test:watch`: Runs tests in watch mode.
- `npm run test:coverage`: Runs tests and generates a coverage report.

## 📁 Project Structure

```
FootQuest/
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
│   ├── (auth)/           # Authentication pages
│   ├── (dashboard)/      # Main app features (Hub, Games, Leaderboard, Profile, Shop)
│   ├── (legal)/          # Privacy Policy, Terms of Service, etc.
│   └── (public)/         # Publicly accessible pages
├── components/           # Reusable React components
│   ├── games/            # Game-specific components
│   ├── layout/           # Global layout components (Navbar, Footer, etc.)
│   ├── shared/           # Shared generic components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks (e.g., use-timer)
├── lib/                  # Utility functions and library configurations
├── public/               # Static assets (images, fonts, robots.txt)
├── supabase/             # Supabase configuration and migrations
└── tests/                # Vitest test files
```

## 🧪 Testing

This project uses Vitest for unit and integration testing. Tests are located in the `tests/` directory.

To run tests once:
```bash
npm run test
```

To run tests with coverage:
```bash
npm run test:coverage
```
