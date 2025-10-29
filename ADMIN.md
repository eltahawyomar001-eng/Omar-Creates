# Admin Guide

## Managing Experiments

### Option 1: Supabase Dashboard (Recommended)

1. Go to [Supabase Dashboard](https://app.supabase.com/project/dqrypkhdiyqgmbsnklek)
2. Navigate to **Table Editor** → **experiments**
3. Click **Insert** → **Insert row** to add a new experiment
4. Fill in the fields:
   - `title`: Name of the experiment
   - `description`: Short description
   - `status`: One of: `testing`, `ideating`, `shipped`, `killed`
   - `demo_url`: (optional) URL to live demo
   - `github_url`: (optional) GitHub repository URL
   - `stack`: (optional) Array of tech stack items, e.g., `["Next.js", "TypeScript"]`

### Option 2: CLI Admin Tool

```bash
# List all experiments
npm run admin:experiments list

# Add a new experiment (interactive)
npm run admin:experiments add

# Delete an experiment by ID
npm run admin:experiments delete <experiment-id>
```

### Option 3: SQL Editor

Go to **SQL Editor** in Supabase Dashboard and run:

```sql
-- List experiments
SELECT * FROM experiments ORDER BY created_at DESC;

-- Add experiment
INSERT INTO experiments (title, description, status, demo_url, github_url, stack)
VALUES (
  'My Experiment',
  'Description here',
  'testing',
  'https://demo.example.com',
  'https://github.com/user/repo',
  ARRAY['Next.js', 'TypeScript']
);

-- Update experiment
UPDATE experiments 
SET status = 'shipped' 
WHERE id = 'experiment-id-here';

-- Delete experiment
DELETE FROM experiments WHERE id = 'experiment-id-here';
```

## Seeding Test Data

To add sample experiments for testing:

```bash
npm run seed:experiments
```

This will add 3 sample experiments if the table is empty.

## Managing Waitlist

View waitlist signups in Supabase Dashboard:
1. Go to **Table Editor** → **waitlist**
2. View all email signups with timestamps

## Managing Contact Messages

View contact form submissions:
1. Go to **Table Editor** → **messages**
2. View all messages with optional name/email and message body

## Environment Variables

Make sure `.env.local` contains:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
