-- Migration: 0001_initial_schema
-- Description: Create initial tables for Omar Creates
-- Created: 2025-10-29

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLES
-- ============================================================================

-- Waitlist table
-- Stores email signups from landing page
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  source TEXT, -- Where the signup came from (e.g., 'hero', 'footer')
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Messages table
-- Stores contact form submissions
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  body TEXT NOT NULL CHECK (LENGTH(body) >= 20), -- Minimum 20 characters
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Experiments table
-- Stores experimental projects/features
CREATE TABLE IF NOT EXISTS public.experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  one_liner TEXT NOT NULL, -- Short description
  status TEXT NOT NULL CHECK (status IN ('ideating', 'testing', 'shipped', 'killed')),
  cta_url TEXT, -- Call-to-action URL (optional)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at DESC);

-- Index for messages ordering
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);

-- Index for experiments by status and date
CREATE INDEX IF NOT EXISTS idx_experiments_status ON public.experiments(status);
CREATE INDEX IF NOT EXISTS idx_experiments_created_at ON public.experiments(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;

-- Waitlist policies
-- Anonymous users can INSERT (sign up)
CREATE POLICY "Allow anonymous insert to waitlist"
  ON public.waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Anonymous users can SELECT their own email (optional)
CREATE POLICY "Allow anonymous select own waitlist entry"
  ON public.waitlist
  FOR SELECT
  TO anon
  USING (true);

-- Messages policies
-- Anonymous users can INSERT (send message)
CREATE POLICY "Allow anonymous insert to messages"
  ON public.messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Experiments policies
-- Anonymous users can SELECT experiments
CREATE POLICY "Allow anonymous select experiments"
  ON public.experiments
  FOR SELECT
  TO anon
  USING (true);

-- Only service_role can INSERT/UPDATE/DELETE experiments
-- (No policy needed - service_role bypasses RLS)

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for experiments.updated_at
CREATE TRIGGER update_experiments_updated_at
  BEFORE UPDATE ON public.experiments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Insert initial experiment
INSERT INTO public.experiments (title, one_liner, status, cta_url)
VALUES (
  'Ministry of Trivial Achievements',
  'Issue absurd certificates for tiny wins.',
  'testing',
  NULL
)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- GRANTS
-- ============================================================================

-- Grant necessary permissions to anon role
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.waitlist TO anon;
GRANT INSERT ON public.waitlist TO anon;
GRANT SELECT ON public.messages TO anon;
GRANT INSERT ON public.messages TO anon;
GRANT SELECT ON public.experiments TO anon;

-- Grant all permissions to authenticated users (if needed later)
GRANT ALL ON public.waitlist TO authenticated;
GRANT ALL ON public.messages TO authenticated;
GRANT ALL ON public.experiments TO authenticated;
