-- ============================================
-- APEX Theme - Orders Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('vodafone_cash', 'instapay', 'telda')),
  screenshot_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  download_count INTEGER NOT NULL DEFAULT 0,
  max_downloads INTEGER NOT NULL DEFAULT 3,
  download_token UUID,
  download_expires_at TIMESTAMPTZ,
  watermarked_file_url TEXT,
  approved_at TIMESTAMPTZ,
  approved_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_download_token ON orders(download_token);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access (for API routes)
CREATE POLICY "Service role can do everything" ON orders
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policy: Allow anon to insert (for creating orders)
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Storage Bucket (Run in Supabase Dashboard)
-- ============================================
-- 1. Go to Storage in Supabase Dashboard
-- 2. Create a new bucket called "screenshots"
-- 3. Set it to public
-- 4. Or use Vercel Blob as configured in the app
