-- ============================================================
-- Gallery Print Shop — Database Migration
-- Run this entire script in your Supabase SQL Editor
-- (Dashboard → SQL Editor → New query → paste → Run)
-- ============================================================

-- 1. Extend the existing `prints` table with new columns
ALTER TABLE prints
  ADD COLUMN IF NOT EXISTS description    TEXT,
  ADD COLUMN IF NOT EXISTS alt_text       TEXT,
  ADD COLUMN IF NOT EXISTS category       TEXT,
  ADD COLUMN IF NOT EXISTS is_available   BOOLEAN DEFAULT true;

-- Back-fill is_available for any existing rows
UPDATE prints SET is_available = true WHERE is_available IS NULL;

-- 2. Create `print_sizes` table
--    Each photo can have multiple sizes (8x10, 16x20, 24x36, etc.) with individual prices.
CREATE TABLE IF NOT EXISTS print_sizes (
  id           UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  print_id     UUID    NOT NULL REFERENCES prints(id) ON DELETE CASCADE,
  size_label   TEXT    NOT NULL,          -- e.g. "8x10", "16x20", "24x36"
  price        NUMERIC(10, 2) NOT NULL,
  stock_status TEXT    DEFAULT 'available'
                       CHECK (stock_status IN ('available', 'sold_out')),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create `orders` table
--    One row per print/size purchased. Stripe payment_intent ties orders from one checkout together.
CREATE TABLE IF NOT EXISTS orders (
  id                        UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name             TEXT    NOT NULL,
  customer_email            TEXT    NOT NULL,
  print_id                  UUID    REFERENCES prints(id),
  print_size_id             UUID    REFERENCES print_sizes(id),
  shipping_address          JSONB   NOT NULL DEFAULT '{}',
  status                    TEXT    DEFAULT 'pending'
                                    CHECK (status IN ('pending', 'fulfilled')),
  stripe_payment_intent_id  TEXT,
  total_amount              NUMERIC(10, 2),
  created_at                TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security
ALTER TABLE print_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for print_sizes (anyone can read, only auth can write)
DROP POLICY IF EXISTS "Public read print_sizes" ON print_sizes;
CREATE POLICY "Public read print_sizes"
  ON print_sizes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated write print_sizes" ON print_sizes;
CREATE POLICY "Authenticated write print_sizes"
  ON print_sizes FOR ALL USING (auth.role() = 'authenticated');

-- 6. RLS Policies for orders
--    Webhook inserts via service role key (bypasses RLS).
--    Authenticated admin can read/update all orders.
DROP POLICY IF EXISTS "Authenticated read orders" ON orders;
CREATE POLICY "Authenticated read orders"
  ON orders FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated update orders" ON orders;
CREATE POLICY "Authenticated update orders"
  ON orders FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow service role inserts (used by Stripe webhook — bypasses RLS anyway,
-- but this keeps the intent explicit)
DROP POLICY IF EXISTS "Service insert orders" ON orders;
CREATE POLICY "Service insert orders"
  ON orders FOR INSERT WITH CHECK (true);
