# Omar Creates

Production landing site built with Next.js 14 App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- ✅ Next.js 14 App Router + TypeScript
- ✅ Tailwind CSS with Apple-inspired design system
- ✅ shadcn/ui components
- ✅ PWA support (installable)
- ✅ Environment validation with Zod
- ✅ Health check endpoint
- ✅ Prettier + ESLint + Husky pre-commit hooks
- ✅ RTL support
- ✅ Accessibility (a11y) compliant
- ✅ Prefers-reduced-motion support
- ✅ Supabase integration (waitlist, messages, experiments)
- ✅ Comprehensive testing (Vitest + Playwright)
- ✅ GitHub Actions CI/CD

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your actual Supabase credentials.

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Start production server:**
   ```bash
   npm start
   ```

## Environment Variables

See `.env.example` for all required and optional environment variables.

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional:
- `RESEND_API_KEY`
- `SMTP_*` (if not using Resend)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run unit tests (Vitest)
- `npm run test:watch` - Run unit tests in watch mode
- `npm run e2e` - Run E2E tests (Playwright)
- `npm run e2e:ui` - Run E2E tests with UI
- `npm run admin:experiments` - Manage experiments (CLI)
- `npm run seed:experiments` - Seed sample experiments

## Testing

### Unit Tests (Vitest)
```bash
npm run test          # Run all unit tests
npm run test:watch    # Watch mode
```

22 unit tests covering:
- Environment validation
- Waitlist form validation
- Contact form validation

### E2E Tests (Playwright)
```bash
npm run e2e           # Run all E2E tests
npm run e2e:ui        # Interactive UI mode
```

7 E2E tests covering:
- Waitlist flow
- Experiments page
- Accessibility (axe-core)

See [CI.md](./CI.md) for CI/CD setup details.

## Admin Tools

See [ADMIN.md](./ADMIN.md) for instructions on:
- Managing experiments via Supabase Dashboard or CLI
- Viewing waitlist signups
- Viewing contact messages

## Health Check

The application includes a health check endpoint at `/health` that returns:
```json
{
  "ok": true,
  "timestamp": "2025-10-29T...",
  "environment": "production"
}
```

## PWA

The application is installable as a Progressive Web App. Service worker is automatically registered in production mode.

## Design System

The design follows Apple's Human Interface Guidelines:
- **Clarity**: Clean typography, ample spacing
- **Deference**: Focused content, subtle backgrounds
- **Depth**: Layered interfaces, realistic motion

### Typography
- System font stack: SF Pro, Inter, Cairo (for Arabic)
- Large titles for hero sections
- Restrained font weights

### Colors
- Minimal color palette
- Dark mode by default
- Semantic color tokens

### Accessibility
- Focus indicators
- Prefers-reduced-motion support
- RTL language support
- WCAG 2.1 AA compliant

## Code Quality

### Git Hooks (Husky)

**Pre-commit:**
- ESLint
- TypeScript type checking
- Prettier formatting (lint-staged)

**Pre-push:**
- Unit tests (22 tests must pass)

### CI/CD (GitHub Actions)

On push/PR to `main` or `develop`:
1. Lint
2. Type check
3. Unit tests
4. Production build

See [CI.md](./CI.md) for full CI setup and required secrets.

## License

Private - Omar Creates © 2025
