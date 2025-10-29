-- Migration: 0002_update_messages_table
-- Description: Make name and email optional, add source column
-- Created: 2025-10-29

-- Make name and email nullable
ALTER TABLE public.messages 
  ALTER COLUMN name DROP NOT NULL,
  ALTER COLUMN email DROP NOT NULL;

-- Add source column
ALTER TABLE public.messages 
  ADD COLUMN IF NOT EXISTS source TEXT;

-- Create index for source
CREATE INDEX IF NOT EXISTS idx_messages_source ON public.messages(source);
