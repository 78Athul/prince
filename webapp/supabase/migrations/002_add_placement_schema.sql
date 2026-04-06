-- ============================================================
-- Add Placement Settings for Prints
-- Run this script in your Supabase SQL Editor
-- (Dashboard → SQL Editor → New query → paste → Run)
-- ============================================================

ALTER TABLE prints 
  ADD COLUMN IF NOT EXISTS placement TEXT DEFAULT 'gallery' CHECK (
    placement IN (
      'gallery', 
      'showcase_1', 
      'showcase_2', 
      'showcase_3', 
      'showcase_4'
    )
  );

-- Back-fill placement to gallery for any existing rows if they are null
UPDATE prints SET placement = 'gallery' WHERE placement IS NULL;
