# Supabase Setup Instructions

## Quick Start

1. **Run the SQL migration:**
   ```bash
   npm run print-sql
   ```

2. **Copy the output and paste into Supabase SQL Editor:**
   - Go to: https://app.supabase.com/project/_/sql/new
   - Paste the SQL and click "Run"

3. **Update your `.env.local` with actual Supabase credentials:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

## Database Schema

### Tables

#### `waitlist`
Stores email signups from the landing page.
- `id` (UUID, PK)
- `email` (TEXT, UNIQUE)
- `source` (TEXT, nullable)
- `created_at` (TIMESTAMP)

**RLS:** Anonymous users can INSERT and SELECT.

#### `messages`
Stores contact form submissions.
- `id` (UUID, PK)
- `name` (TEXT)
- `email` (TEXT)
- `body` (TEXT, min 20 chars)
- `created_at` (TIMESTAMP)

**RLS:** Anonymous users can INSERT only.

#### `experiments`
Stores experimental projects/features.
- `id` (UUID, PK)
- `title` (TEXT)
- `one_liner` (TEXT)
- `status` (ENUM: ideating, testing, shipped, killed)
- `cta_url` (TEXT, nullable)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP, auto-updated)

**RLS:** Anonymous users can SELECT. Only service_role can write.

### Seed Data

The migration includes one initial experiment:
- **Title:** Ministry of Trivial Achievements
- **One-liner:** Issue absurd certificates for tiny wins.
- **Status:** testing

## Type Safety

All database operations are fully typed using the `Database` type from `types/db.ts`.

### Client Usage (Browser)
```typescript
import { supabase } from '@/lib/supabase/client';

// Type-safe insert
const { data, error } = await supabase
  .from('waitlist')
  .insert({ email: 'user@example.com', source: 'hero' });
```

### Server Usage (API/Server Components)
```typescript
import { supabaseServer } from '@/lib/supabase/server';

// Type-safe query
const { data, error } = await supabaseServer
  .from('experiments')
  .select('*')
  .eq('status', 'testing');
```

## Security

- **RLS enabled** on all tables
- **Anonymous users** can:
  - INSERT to `waitlist` and `messages`
  - SELECT from `waitlist` and `experiments`
- **Service role** (server-side only) can:
  - Full CRUD on all tables
- **Body validation:** Messages require minimum 20 characters

## Next Steps

After running the migration:
1. Verify tables exist in Supabase Table Editor
2. Check the seed data is present in `experiments` table
3. Test the type-safe clients work correctly
