# CI/CD Setup

## GitHub Actions CI

The project uses GitHub Actions for continuous integration. The workflow runs on:
- Pushes to `main` or `develop` branches
- Pull requests to `main`

### CI Pipeline

The workflow performs the following checks:

1. **Lint** - ESLint checks for code quality
2. **Type Check** - TypeScript compiler validation
3. **Unit Tests** - All Vitest tests (22 tests)
4. **Build** - Production build verification

### Required Secrets

Add these secrets in GitHub repository settings (Settings → Secrets and variables → Actions):

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for server actions)

## Git Hooks (Husky)

### Pre-commit Hook

Runs automatically before each commit:
- `npm run lint` - ESLint
- `npm run typecheck` - TypeScript
- `npx lint-staged` - Format staged files

### Pre-push Hook

Runs automatically before pushing to remote:
- `npm test` - All unit tests must pass

## Local Testing

Run all CI checks locally before pushing:

```bash
# Full CI check
npm run lint && npm run typecheck && npm test && npm run build

# Individual checks
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm test            # Unit tests (Vitest)
npm run e2e         # E2E tests (Playwright)
npm run build       # Production build
```

## Workflow File

The CI configuration is in `.github/workflows/ci.yml`:
- Uses Node.js 20
- Runs on Ubuntu latest
- Caches npm dependencies for faster builds
- Fails fast on any check failure
