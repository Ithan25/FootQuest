-- ============================================================
-- FootQuest — Seed des partenaires et récompenses
-- ============================================================
-- Exécuter ce script dans le SQL Editor de Supabase Dashboard
-- (https://supabase.com/dashboard → SQL Editor)
-- ============================================================

-- ─── PARTENAIRES ───

INSERT INTO partenaire (id, nom, logo_url, site_web, actif) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'FootQuest Official', NULL, 'https://footquest.fr', true),
  ('a1000000-0000-0000-0000-000000000002', 'FIFA Store', NULL, 'https://store.fifa.com', true),
  ('a1000000-0000-0000-0000-000000000003', 'Panini', NULL, 'https://www.panini.fr', true)
ON CONFLICT (id) DO NOTHING;

-- ─── RÉCOMPENSES ───

INSERT INTO recompense (partenaire_id, nom, description, image_url, cout_points, stock, actif) VALUES

  -- FootQuest Official rewards (Original prices)
  ('a1000000-0000-0000-0000-000000000001',
   '🏅 Badge "Légende"',
   'Débloque le badge exclusif Légende sur ton profil FootQuest. Montre à tous que tu es un vrai connaisseur du football !',
   NULL, 500, 100, true),

  ('a1000000-0000-0000-0000-000000000001',
   '🎨 Bannière Premium',
   'Débloque une bannière de profil animée aux couleurs officielles de la CDM 2026.',
   NULL, 750, 50, true),

  ('a1000000-0000-0000-0000-000000000001',
   '🔥 Titre "El Clásico"',
   'Un titre rare affiché à côté de ton pseudo. Réservé aux meilleurs joueurs de FootQuest.',
   NULL, 1500, 25, true),

  -- FIFA Store rewards (x10)
  ('a1000000-0000-0000-0000-000000000002',
   '🎽 -10% FIFA Store',
   'Code promo de -10% valable sur tout le FIFA Store officiel (maillots, accessoires, etc.).',
   NULL, 20000, 30, true),

  ('a1000000-0000-0000-0000-000000000002',
   '🏆 Mini Trophée CDM',
   'Réplique miniature (10cm) du trophée de la Coupe du Monde. Livraison offerte en France.',
   NULL, 50000, 10, true),

  -- Panini rewards (x10)
  ('a1000000-0000-0000-0000-000000000003',
   '📦 Pack Panini CDM 2026',
   '5 pochettes de stickers Panini Coupe du Monde 2026. Code à utiliser sur panini.fr.',
   NULL, 10000, 50, true),

  ('a1000000-0000-0000-0000-000000000003',
   '📚 Album Panini Collector',
   'L''album collector Panini CDM 2026 édition limitée. Livraison offerte en France métropolitaine.',
   NULL, 30000, 15, true);
