-- ============================================================
-- Seed Dummy Data -> Production Migration
-- Run this script in your Supabase SQL Editor to import the static photos into your DB
-- ============================================================

INSERT INTO prints (title, description, alt_text, base_price, cloudinary_url, is_limited_edition)
VALUES
  ('Ethereal Highlands', 'A breathtaking capture of mist-rolling hills at dawn.', 'Ethereal Highlands', 350.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.15 AM (1).jpeg', true),
  ('Monolithic Shadows', 'Architectural purity wrapped in deep shadows.', 'Monolithic Shadows', 275.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.15 AM (2).jpeg', false),
  ('The Silent Forest', 'Ancient trees standing tall in the morning mist.', 'The Silent Forest', 420.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.15 AM.jpeg', true),
  ('Urban Geometry', 'Sharp lines and brutalist structures reaching towards the sky.', 'Urban Geometry', 310.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.16 AM (1).jpeg', false),
  ('Coastal Whispers', 'The gentle waves crashing against rugged cliffs.', 'Coastal Whispers', 380.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.16 AM (2).jpeg', true),
  ('Desert At Noon', 'Sun-drenched sands reflecting golden light.', 'Desert At Noon', 290.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.16 AM (3).jpeg', false),
  ('The Yellow Studio', 'Our monthly curated selection featuring vibrant architectural contrasts. Only 50 signed and numbered 24x36 prints available globally.', 'The Yellow Studio', 450.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.16 AM.jpeg', true),
  ('Midnight Reflections', 'A tranquil lake beneath a star-studded sky.', 'Midnight Reflections', 500.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.17 AM (1).jpeg', true),
  ('Concrete Jungle', 'The bustling heart of the metropolis in monochrome.', 'Concrete Jungle', 240.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.17 AM (2).jpeg', false),
  ('Golden Hour', 'The fleeting moment when daylight turns to gold.', 'Golden Hour', 330.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.17 AM.jpeg', false),
  ('Abstract Tides', 'A surreal interpretation of ocean currents.', 'Abstract Tides', 410.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.18 AM (1).jpeg', true),
  ('Vertical Symmetry', 'Perfect natural reflections on a still pond.', 'Vertical Symmetry', 280.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.18 AM (2).jpeg', false),
  ('Alpine Silence', 'Snow-capped peaks dominating the horizon.', 'Alpine Silence', 360.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.18 AM.jpeg', false),
  ('Industrial Echoes', 'Abandoned machinery telling forgotten stories.', 'Industrial Echoes', 310.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.19 AM (1).jpeg', false),
  ('The Long Road', 'An isolated strip of asphalt disappearing into the horizon.', 'The Long Road', 295.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.19 AM (2).jpeg', false),
  ('Neon Nights', 'Vivid city lights piercing through the midnight fog.', 'Neon Nights', 390.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.19 AM.jpeg', true),
  ('Autumn Canopy', 'A kaleidoscope of falling leaves in an old-growth forest.', 'Autumn Canopy', 340.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.44 AM (1).jpeg', false),
  ('Morning Dew', 'Macroscopic perfection captured on a single blade of grass.', 'Morning Dew', 260.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.44 AM (2).jpeg', false),
  ('Crystal Ice', 'Frozen formations glistening in the winter sun.', 'Crystal Ice', 325.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.44 AM (3).jpeg', false),
  ('Solar Flare', 'Dynamic streaks of light across a clouded sky.', 'Solar Flare', 480.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.44 AM (4).jpeg', true),
  ('Serengeti Migration', 'A powerful moment frozen in the vast plains.', 'Serengeti Migration', 550.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.44 AM (5).jpeg', true),
  ('Volcanic Ash', 'Textured landscapes carved by ancient eruptions.', 'Volcanic Ash', 310.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.44 AM (6).jpeg', false),
  ('The Obelisk', 'A striking minimalist composition of a lone monument.', 'The Obelisk', 290.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.44 AM (7).jpeg', false),
  ('Cinematic Gallery Wall', 'A curated aesthetic defining the modern spatial experience.', 'Cinematic Gallery Wall', 490.00, '/assets/photos/WhatsApp Image 2026-03-30 at 10.14.44 AM.jpeg', true);
