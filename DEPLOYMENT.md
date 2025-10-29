# Deployment Guide

Complete guide to deploying **Omar Creates** to Vercel.

---

## Prerequisites

- GitHub repository pushed to https://github.com/eltahawyomar001-eng/Omar-Creates
- Supabase project created with migrations run
- Vercel account (free tier works)

---

## 1. Import Repository to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select your GitHub repository: `eltahawyomar001-eng/Omar-Creates`
4. Configure project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave default)
   - **Build Command:** `next build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm ci` (auto-detected)

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? omar-creates (or custom)
# - Directory? ./
# - Override settings? No
```

---

## 2. Configure Environment Variables

### Required Variables

Add these in **Project Settings → Environment Variables** (or during import):

| Variable | Value | Where to Find |
|----------|-------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://dqrypkhdiyqgmbsnklek.supabase.co` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | Supabase Dashboard → Settings → API → anon/public |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` | Supabase Dashboard → Settings → API → service_role (⚠️ Secret) |
| `NEXT_PUBLIC_SITE_URL` | `https://omar-creates.vercel.app` | Your Vercel deployment URL |

### Optional Variables (Email)

| Variable | Value | Where to Find |
|----------|-------|---------------|
| `RESEND_API_KEY` | `re_...` | Resend Dashboard → API Keys |
| `RESEND_FROM_EMAIL` | `hello@omar-creates.com` | Verified domain in Resend |

### Important Notes

- **Production environment:** Set all variables for `Production` environment
- **Preview/Development:** Optionally set for `Preview` and `Development` too
- **NEXT_PUBLIC_SITE_URL:** Update after first deployment with actual URL (e.g., `https://omar-creates.vercel.app` or custom domain)
- **Service Role Key:** Never expose in client-side code; used only in server actions

---

## 3. Production Branch Configuration

In **Project Settings → Git**:

- **Production Branch:** `main`
- **Preview Branches:** All branches (or specify `develop`, `staging`, etc.)
- **Build & Development Settings:**
  - Build Command: `next build`
  - Output Directory: `.next`
  - Install Command: `npm ci`
  - Development Command: `npm run dev`

---

## 4. Build Configuration

Your `vercel.json` is already configured:

```json
{
  "buildCommand": "next build",
  "devCommand": "next dev",
  "installCommand": "npm ci",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/og/route.tsx": {
      "runtime": "edge"
    }
  }
}
```

- **Edge Runtime:** OG image generation runs on Vercel Edge Network for fast global delivery
- **Region:** `iad1` (US East) for optimal Supabase connection (adjust if your Supabase region differs)

---

## 5. Deploy

### First Deployment

1. Click **Deploy** in Vercel dashboard
2. Wait for build to complete (~2-3 minutes)
3. Vercel will assign a URL: `https://omar-creates.vercel.app` (or similar)

### Update NEXT_PUBLIC_SITE_URL

After first deployment:

1. Copy your production URL from Vercel dashboard
2. Go to **Project Settings → Environment Variables**
3. Update `NEXT_PUBLIC_SITE_URL` to your production URL
4. Click **Redeploy** to apply changes

---

## 6. Verification Steps

### Health Check

Visit: `https://your-domain.vercel.app/health`

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2025-10-30T12:00:00.000Z",
  "supabase": "connected"
}
```

### Waitlist Insert Test

1. Visit homepage: `https://your-domain.vercel.app`
2. Click **Join Waitlist**
3. Enter email and submit
4. Verify toast: "Thanks for joining! We'll be in touch soon."
5. Check Supabase Dashboard → Table Editor → `waitlist` table for new row

### OG Image Generation

Visit: `https://your-domain.vercel.app/api/og?t=Test`

- Should return a 1200x630 PNG image
- Headers should show `content-type: image/png`
- Cache header: `max-age=86400` (1 day)

### SEO Routes

- Robots: `https://your-domain.vercel.app/robots.txt`
- Sitemap: `https://your-domain.vercel.app/sitemap.xml`

### Run E2E Tests (Optional)

Update `playwright.config.ts` base URL to production:

```typescript
use: {
  baseURL: 'https://your-domain.vercel.app',
},
```

Then run:
```bash
npm run e2e
```

---

## 7. Custom Domain (Optional)

### Add Domain in Vercel

1. Go to **Project Settings → Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `omar-creates.com`)
4. Follow DNS configuration instructions

### Update DNS Records

Add these records in your domain registrar:

**For root domain (omar-creates.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Update Environment Variables

After domain is verified:

1. Update `NEXT_PUBLIC_SITE_URL` to `https://omar-creates.com`
2. Redeploy

---

## 8. Monitoring & Logs

### Vercel Dashboard

- **Deployments:** View build logs, deployment history
- **Analytics:** Page views, performance metrics (requires Pro plan)
- **Logs:** Runtime logs, function executions

### Supabase Dashboard

- **Table Editor:** Verify data inserts (waitlist, messages, experiments)
- **Database → Logs:** Query performance, connection issues
- **Auth → Logs:** If you add authentication later

---

## 9. CI/CD Integration

Your GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push:

1. **On Push to `main`:** Triggers Vercel deployment automatically
2. **On Pull Requests:** Runs tests and linting (Vercel creates preview deployments)

### GitHub Secrets (Already Set)

Ensure these are added in **GitHub → Settings → Secrets → Actions**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 10. Post-Deployment Checklist

- [ ] Health endpoint returns `200 OK`
- [ ] Waitlist form successfully inserts to Supabase
- [ ] Contact form successfully inserts to `messages` table
- [ ] OG images generate correctly (`/api/og?t=Test`)
- [ ] Robots.txt accessible
- [ ] Sitemap.xml accessible
- [ ] All environment variables set in Vercel
- [ ] `NEXT_PUBLIC_SITE_URL` points to production domain
- [ ] Custom domain configured (if applicable)
- [ ] SEO meta tags show correct production URLs (view page source)
- [ ] PWA manifest loads correctly (`/manifest.json`)
- [ ] No console errors in browser DevTools

---

## 11. Troubleshooting

### Build Fails

**Error:** `Module not found` or `Cannot find module`
- **Fix:** Ensure all dependencies in `package.json`, run `npm ci` locally to verify

**Error:** `Environment variable not found`
- **Fix:** Add missing env vars in Vercel dashboard → Environment Variables

### Runtime Errors

**Error:** `fetch failed` or `ECONNREFUSED` to Supabase
- **Fix:** Verify `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
- **Fix:** Check Supabase project is not paused (free tier pauses after inactivity)

**Error:** `Invalid API key` for Supabase
- **Fix:** Regenerate keys in Supabase Dashboard → Settings → API
- **Fix:** Update keys in Vercel and redeploy

### OG Images Not Generating

**Error:** `500 Internal Server Error` on `/api/og`
- **Fix:** Ensure `vercel.json` specifies `"runtime": "edge"` for OG route
- **Fix:** Check Vercel Function Logs for errors

### Waitlist Submissions Failing

**Error:** `Row-level security policy violation`
- **Fix:** Verify RLS policies in Supabase allow inserts:
  ```sql
  -- In Supabase SQL Editor
  SELECT * FROM pg_policies WHERE tablename = 'waitlist';
  ```
- **Fix:** Ensure policy allows `anon` role to INSERT

---

## 12. Rollback

If deployment has issues:

1. Go to **Deployments** in Vercel dashboard
2. Find last known good deployment
3. Click **⋯ → Promote to Production**

---

## 13. Scaling Considerations

### Free Tier Limits (Vercel)

- **Bandwidth:** 100 GB/month
- **Function Executions:** 100 GB-hours/month
- **Edge Requests:** 1M/month
- **Deployments:** Unlimited

### Free Tier Limits (Supabase)

- **Database:** 500 MB storage
- **Bandwidth:** 5 GB egress/month
- **API Requests:** Unlimited (rate-limited)

### Upgrade Triggers

- **High traffic:** Upgrade Vercel to Pro ($20/month) for analytics and more bandwidth
- **Large database:** Upgrade Supabase to Pro ($25/month) for 8 GB storage
- **Email volume:** Resend free tier is 100 emails/day, upgrade to Starter ($20/month) for 50k/month

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Supabase Docs:** https://supabase.com/docs

---

**Ready to deploy!** 🚀
