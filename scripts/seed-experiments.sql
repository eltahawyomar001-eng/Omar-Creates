-- Run this in Supabase SQL Editor to add sample experiments
-- Navigate to: https://app.supabase.com/project/dqrypkhdiyqgmbsnklek/sql/new

INSERT INTO experiments (title, description, status, demo_url, github_url, stack)
VALUES
  (
    'Ministry of Trivial Achievements',
    'Issue absurd certificates for tiny wins.',
    'testing',
    NULL,
    NULL,
    ARRAY['Next.js', 'TypeScript', 'Supabase']
  ),
  (
    'Micro Feedback Widget',
    'One-click feedback for any website.',
    'ideating',
    NULL,
    NULL,
    ARRAY['React', 'WebComponents']
  ),
  (
    'Quick Poll Creator',
    'Create and share polls in seconds.',
    'shipped',
    NULL,
    NULL,
    ARRAY['Next.js', 'Redis']
  )
ON CONFLICT DO NOTHING;

-- Verify the insert
SELECT id, title, status FROM experiments ORDER BY created_at DESC;
