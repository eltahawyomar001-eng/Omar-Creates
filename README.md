# Omar Creates# Omar Creates



> A production-ready Next.js landing site for showcasing micro-SaaS experiments. Built with TypeScript, Tailwind CSS, and Supabase.Production landing site built with Next.js 14 App Router, TypeScript, Tailwind CSS, and shadcn/ui.



[![CI](https://github.com/eltahawyomar001-eng/Omar-Creates/workflows/CI/badge.svg)](https://github.com/eltahawyomar001-eng/Omar-Creates/actions)## Features



## Stack- ✅ Next.js 14 App Router + TypeScript

- ✅ Tailwind CSS with Apple-inspired design system

- **Framework:** Next.js 14 (App Router)- ✅ shadcn/ui components

- **Language:** TypeScript 5.3- ✅ PWA support (installable)

- **Styling:** Tailwind CSS 3.4- ✅ Environment validation with Zod

- **UI Components:** shadcn/ui (Radix UI primitives)- ✅ Health check endpoint

- **Database:** Supabase (PostgreSQL)- ✅ Prettier + ESLint + Husky pre-commit hooks

- **Email:** Resend (optional)- ✅ RTL support

- **OG Images:** @vercel/og- ✅ Accessibility (a11y) compliant

- **PWA:** next-pwa- ✅ Prefers-reduced-motion support

- **Testing:** Vitest (unit) + Playwright (E2E)

- **Linting:** ESLint + Prettier## Getting Started

- **Git Hooks:** Husky + lint-staged

1. **Install dependencies:**

## Features   ```bash

   npm install

✅ Waitlist signup with email confirmation     ```

✅ Contact form with optional fields  

✅ Experiments listing with filtering  2. **Configure environment variables:**

✅ Dynamic OG image generation     ```bash

✅ SEO optimized (sitemap, robots.txt, structured data)     cp .env.example .env.local

✅ Accessibility compliant (WCAG AA)     ```

✅ PWA support with service worker     

✅ Full test coverage (unit + E2E + a11y)     Update `.env.local` with your actual Supabase credentials.

✅ CI/CD with GitHub Actions  

✅ Type-safe environment validation3. **Run development server:**

   ```bash

## Getting Started   npm run dev

   ```

### Prerequisites

4. **Build for production:**

- Node.js 20.x or higher   ```bash

- npm or pnpm   npm run build

- Supabase account   ```

- Resend account (optional, for emails)

5. **Start production server:**

### Environment Variables   ```bash

   npm start

Create a `.env.local` file in the root directory:   ```



```bash## Environment Variables

# Node Environment

NODE_ENV=developmentSee `.env.example` for all required and optional environment variables.



# Site ConfigurationRequired:

NEXT_PUBLIC_SITE_URL=http://localhost:3000- `NEXT_PUBLIC_SUPABASE_URL`

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

# Supabase (get from https://app.supabase.com/project/_/settings/api)- `SUPABASE_SERVICE_ROLE_KEY`

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-keyOptional:

SUPABASE_SERVICE_ROLE_KEY=your-service-role-key- `RESEND_API_KEY`

- `SMTP_*` (if not using Resend)

# Resend (optional - for email confirmations)

RESEND_API_KEY=re_your_api_key## Scripts

RESEND_FROM_EMAIL=noreply@yourdomain.com

```- `npm run dev` - Start development server

- `npm run build` - Build for production

**Where to find Supabase keys:**- `npm run start` - Start production server

1. Go to [Supabase Dashboard](https://app.supabase.com)- `npm run lint` - Run ESLint

2. Select your project- `npm run typecheck` - Run TypeScript type checking

3. Navigate to **Settings** → **API**- `npm run format` - Format code with Prettier

4. Copy:- `npm run format:check` - Check code formatting

   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`

   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`## Health Check

   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

The application includes a health check endpoint at `/health` that returns:

### Database Setup (Supabase Migrations)```json

{

1. **Run migrations** in Supabase SQL Editor:  "ok": true,

  "timestamp": "2025-10-29T...",

```bash  "environment": "production"

# Print migration SQL to run manually}

npm run print-sql```

```

## PWA

Or run migrations directly in [Supabase SQL Editor](https://app.supabase.com/project/_/sql/new):

The application is installable as a Progressive Web App. Service worker is automatically registered in production mode.

```sql

-- Copy contents from supabase/migrations/0001_initial_schema.sql## Design System

-- Then run 0002_update_messages_table.sql

```The design follows Apple's Human Interface Guidelines:

- **Clarity**: Clean typography, ample spacing

2. **Seed experiments** (optional):- **Deference**: Focused content, subtle backgrounds

- **Depth**: Layered interfaces, realistic motion

```bash

npm run seed:experiments### Typography

```- System font stack: SF Pro, Inter, Cairo (for Arabic)

- Large titles for hero sections

Or use the SQL script in `scripts/seed-experiments.sql` in the SQL Editor.- Restrained font weights



### Installation### Colors

- Minimal color palette

```bash- Dark mode by default

# Install dependencies- Semantic color tokens

npm install

### Accessibility

# Run development server- Focus indicators

npm run dev- Prefers-reduced-motion support

```- RTL language support

- WCAG 2.1 AA compliant

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Code Quality

## Development Scripts

Git hooks (via Husky) run on every commit:

```bash- ESLint

# Development- TypeScript type checking

npm run dev              # Start dev server (localhost:3000)- Prettier formatting

npm run build            # Production build

npm start                # Start production server## License



# Code QualityPrivate - Omar Creates © 2025

npm run lint             # Run ESLint
npm run typecheck        # TypeScript type checking
npm run format           # Format with Prettier
npm run format:check     # Check formatting

# Testing
npm test                 # Run unit tests (Vitest)
npm run test:watch       # Watch mode for unit tests
npm run e2e              # Run E2E tests (Playwright)
npm run e2e:ui           # Playwright UI mode

# Database
npm run print-sql        # Print migrations to run manually

# Admin Tools
npm run admin:experiments list           # List all experiments
npm run admin:experiments add            # Add new experiment (interactive)
npm run admin:experiments delete <id>    # Delete experiment by ID
npm run seed:experiments                 # Seed sample experiments
```

## Project Structure

```
├── app/                          # Next.js app directory
│   ├── (home)/                   # Home page group
│   ├── (seo)/                    # SEO utilities (metadata, OG)
│   ├── actions/                  # Server actions
│   ├── api/                      # API routes
│   ├── experiments/              # Experiments page
│   ├── privacy/                  # Privacy policy page
│   ├── terms/                    # Terms of service page
│   └── layout.tsx                # Root layout
├── components/                   # Reusable components
├── lib/                          # Utilities
│   ├── env.ts                    # Environment validation
│   └── supabase/                 # Supabase clients
├── supabase/                     # Database
│   └── migrations/               # SQL migrations
├── scripts/                      # Admin scripts
├── __tests__/                    # Unit tests
├── tests/e2e/                    # E2E tests
├── .github/workflows/            # CI/CD
└── public/                       # Static assets
```

## Deployment

### Deploy to Vercel

1. **Push to GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/eltahawyomar001-eng/Omar-Creates.git
git push -u origin main
```

2. **Deploy to Vercel:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/eltahawyomar001-eng/Omar-Creates)

Or via Vercel CLI:

```bash
npm i -g vercel
vercel
```

3. **Add Environment Variables** in Vercel Dashboard:
   - Go to **Settings** → **Environment Variables**
   - Add all variables from `.env.local`
   - Deploy will automatically redeploy

4. **Configure Custom Domain** (optional):
   - Go to **Settings** → **Domains**
   - Add your domain (e.g., `omarcreates.com`)
   - Update `NEXT_PUBLIC_SITE_URL` environment variable

### Post-Deployment Checklist

- [ ] Environment variables configured in Vercel
- [ ] Supabase migrations run
- [ ] Custom domain configured (if applicable)
- [ ] GitHub secrets added for CI (see `CI.md`)
- [ ] Test production deployment
- [ ] Seed initial experiments data

## Testing

### Unit Tests (Vitest)

```bash
npm test                 # Run all unit tests
npm run test:watch       # Watch mode
```

Tests cover:
- Environment variable validation
- Waitlist email validation  
- Contact form validation (body length ≥20 chars)

### E2E Tests (Playwright)

```bash
npm run e2e              # Run E2E tests
npm run e2e:ui           # Interactive UI mode
```

E2E tests cover:
- Waitlist signup flow
- Experiments page display
- Accessibility (WCAG AA compliance)
- Contact form submission

## CI/CD

GitHub Actions workflow runs on every push and PR:
- Linting (ESLint)
- Type checking (TypeScript)
- Unit tests (Vitest)
- Build verification

See `CI.md` for detailed CI setup instructions.

## Admin Management

### Managing Experiments

**Option 1: Supabase Dashboard**
1. Go to [Table Editor](https://app.supabase.com/project/dqrypkhdiyqgmbsnklek/editor)
2. Select `experiments` table
3. Insert/edit/delete rows directly

**Option 2: CLI Tool**
```bash
npm run admin:experiments list
npm run admin:experiments add
npm run admin:experiments delete <id>
```

**Option 3: SQL Editor**
See `ADMIN.md` for SQL examples.

## Environment Validation

The app validates required environment variables at runtime using Zod schemas. Missing or invalid variables will cause a clear error message on startup.

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional variables:
- `NODE_ENV` (defaults to `development`)
- `NEXT_PUBLIC_SITE_URL` (defaults to `http://localhost:3000`)
- `RESEND_API_KEY` (optional)
- `RESEND_FROM_EMAIL` (optional)

## Database Schema

### Tables

**`waitlist`**
- `id` (uuid, primary key)
- `email` (text, unique)
- `created_at` (timestamp)

**`messages`**
- `id` (uuid, primary key)
- `name` (text, nullable)
- `email` (text, nullable)
- `body` (text, required)
- `source` (text, default: 'contact_form')
- `created_at` (timestamp)

**`experiments`**
- `id` (uuid, primary key)
- `title` (text, required)
- `description` (text, required)
- `status` (enum: testing, ideating, shipped, killed)
- `demo_url` (text, nullable)
- `github_url` (text, nullable)
- `stack` (text array, nullable)
- `created_at` (timestamp)

See `supabase/migrations/` for detailed schema.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test && npm run e2e`
4. Run linting: `npm run lint && npm run typecheck`
5. Commit with conventional commits
6. Open a pull request

## License

All rights reserved © 2025 Omar Creates

## Links

- **Live Site:** [omarcreates.com](https://omarcreates.com)
- **GitHub:** [@eltahawyomar001-eng](https://github.com/eltahawyomar001-eng)
- **X (Twitter):** [@omar_create](https://x.com/omar_create)

---

Built with ❤️ by [Omar](https://github.com/eltahawyomar001-eng)
