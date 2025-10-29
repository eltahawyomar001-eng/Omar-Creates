# Git Commands to Push to GitHub

## Prerequisites

Ensure you have:
- Git installed
- GitHub account configured
- Repository created at: https://github.com/eltahawyomar001-eng/Omar-Creates.git

## Option 1: Standard Git Commands

```bash
# Initialize git repository (if not already done)
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "feat: initial production-ready landing site

- Next.js 14 App Router with TypeScript
- Supabase integration (waitlist, messages, experiments)
- Full test coverage (Vitest + Playwright)
- CI/CD with GitHub Actions
- SEO optimized with OG images
- WCAG AA accessibility compliant
- PWA support"

# Set default branch to main
git branch -M main

# Add remote repository
git remote add origin https://github.com/eltahawyomar001-eng/Omar-Creates.git

# Push to GitHub
git push -u origin main
```

## Option 2: Using GitHub CLI (if installed)

```bash
# Check if gh CLI is installed
which gh

# If installed, create repository and push in one go
gh repo create Omar-Creates --public --source=. --remote=origin --push

# Or if repository already exists
gh repo set-default eltahawyomar001-eng/Omar-Creates
git add .
git commit -m "feat: initial production-ready landing site"
git push -u origin main
```

## Option 3: Using SSH (if SSH key configured)

```bash
# Initialize and commit (if not done)
git init
git add .
git commit -m "feat: initial production-ready landing site"

# Add SSH remote
git remote add origin git@github.com:eltahawyomar001-eng/Omar-Creates.git

# Push to GitHub
git push -u origin main
```

## After Pushing - GitHub Setup

### 1. Add Repository Secrets for CI

Go to: https://github.com/eltahawyomar001-eng/Omar-Creates/settings/secrets/actions

Add these secrets:
```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

### 2. Enable GitHub Actions

- Navigate to **Actions** tab
- Click "I understand my workflows, go ahead and enable them"
- CI will run automatically on next push

### 3. Verify CI Status

```bash
# View CI status (with gh CLI)
gh run list

# Or visit:
# https://github.com/eltahawyomar001-eng/Omar-Creates/actions
```

## Subsequent Commits

```bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push

# Or for specific files
git add path/to/file
git commit -m "fix: resolve issue"
git push
```

## Conventional Commits

Use these prefixes for commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements

## Branch Strategy

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "feat: implement my feature"

# Push feature branch
git push -u origin feature/my-feature

# Create pull request (with gh CLI)
gh pr create --title "Add my feature" --body "Description of changes"

# Or visit:
# https://github.com/eltahawyomar001-eng/Omar-Creates/compare
```

## Troubleshooting

### If remote already exists
```bash
git remote remove origin
git remote add origin https://github.com/eltahawyomar001-eng/Omar-Creates.git
```

### If push fails due to history mismatch
```bash
# Force push (use with caution!)
git push -u origin main --force
```

### If you need to update .gitignore after initial commit
```bash
# Remove cached files
git rm -r --cached .
git add .
git commit -m "chore: update .gitignore"
git push
```

## Next Steps After Push

1. ✅ Push code to GitHub
2. ✅ Add GitHub secrets for CI
3. ✅ Verify CI passes
4. ✅ Deploy to Vercel (see README.md)
5. ✅ Configure custom domain
6. ✅ Run Supabase migrations
7. ✅ Seed initial experiments data

---

**Ready to push?** Copy the commands from Option 1 above!
