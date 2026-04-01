-- FootQuest: Profile images setup
-- Run this in the Supabase SQL Editor

-- 1. Add banner_url column to utilisateur table
ALTER TABLE utilisateur ADD COLUMN IF NOT EXISTS banner_url TEXT DEFAULT NULL;

-- 2. Create storage bucket for profile images (avatars + banners)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profiles',
  'profiles',
  true,
  5242880, -- 5MB max
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage policies: users can upload their own images
CREATE POLICY "Users can upload profile images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profiles'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update their own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profiles'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profiles'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Profile images are publicly viewable"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profiles');
