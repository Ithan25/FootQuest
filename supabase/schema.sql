-- ============================================================
-- FootQuest MVP - Schéma PostgreSQL complet pour Supabase
-- ============================================================
-- Exécuter ce script dans l'éditeur SQL de Supabase Dashboard
-- (https://supabase.com/dashboard → SQL Editor)
-- ============================================================

-- =====================
-- EXTENSIONS
-- =====================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- TYPES ENUM
-- =====================
CREATE TYPE role_utilisateur AS ENUM ('basic', 'golden_ball');
CREATE TYPE poste_joueur AS ENUM ('GK', 'DEF', 'MID', 'FWD');
CREATE TYPE type_jeu AS ENUM ('scout_master', 'missing_piece', 'foot_trivia');
CREATE TYPE difficulte_trivia AS ENUM ('facile', 'moyen', 'difficile');
CREATE TYPE type_indice AS ENUM ('drapeau', 'indice_texte', 'silhouette');
CREATE TYPE statut_recompense AS ENUM ('actif', 'utilise', 'expire');

-- ============================================================
-- 1. UTILISATEUR
-- Profil étendu lié à auth.users de Supabase
-- ============================================================
CREATE TABLE utilisateur (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email        TEXT UNIQUE NOT NULL,
  pseudo       TEXT UNIQUE NOT NULL,
  avatar_url   TEXT,
  role         role_utilisateur NOT NULL DEFAULT 'basic',
  foot_points  INTEGER NOT NULL DEFAULT 0 CHECK (foot_points >= 0),
  parties_jouees_aujourd_hui INTEGER NOT NULL DEFAULT 0 CHECK (parties_jouees_aujourd_hui >= 0),
  date_derniere_partie DATE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE utilisateur IS 'Profil utilisateur FootQuest lié à Supabase Auth';

-- ============================================================
-- 2. PARTENAIRE
-- Marques/sponsors proposant des récompenses
-- ============================================================
CREATE TABLE partenaire (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom        TEXT NOT NULL,
  logo_url   TEXT,
  site_web   TEXT,
  actif      BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE partenaire IS 'Partenaires commerciaux proposant des récompenses';

-- ============================================================
-- 3. RECOMPENSE
-- Lots échangeables contre des FootPoints
-- ============================================================
CREATE TABLE recompense (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partenaire_id  UUID NOT NULL REFERENCES partenaire(id) ON DELETE CASCADE,
  nom            TEXT NOT NULL,
  description    TEXT,
  image_url      TEXT,
  cout_points    INTEGER NOT NULL CHECK (cout_points > 0),
  stock          INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  actif          BOOLEAN NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_recompense_partenaire ON recompense(partenaire_id);
CREATE INDEX idx_recompense_actif ON recompense(actif) WHERE actif = true;

COMMENT ON TABLE recompense IS 'Récompenses échangeables via la boutique FootPoints';

-- ============================================================
-- 4. OBTENTION_RECOMPENSE
-- Historique des récompenses obtenues par les utilisateurs
-- ============================================================
CREATE TABLE obtention_recompense (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  utilisateur_id  UUID NOT NULL REFERENCES utilisateur(id) ON DELETE CASCADE,
  recompense_id   UUID NOT NULL REFERENCES recompense(id) ON DELETE CASCADE,
  date_obtention  TIMESTAMPTZ NOT NULL DEFAULT now(),
  code_unique     TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(8), 'hex'),
  statut          statut_recompense NOT NULL DEFAULT 'actif'
);

CREATE INDEX idx_obtention_utilisateur ON obtention_recompense(utilisateur_id);

COMMENT ON TABLE obtention_recompense IS 'Récompenses réclamées par les utilisateurs';

-- ============================================================
-- 5. EQUIPE
-- Équipes nationales / clubs
-- ============================================================
CREATE TABLE equipe (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom           TEXT NOT NULL,
  pays          TEXT NOT NULL,
  logo_url      TEXT,
  confederation TEXT
);

CREATE INDEX idx_equipe_pays ON equipe(pays);

COMMENT ON TABLE equipe IS 'Équipes de football (nationales et clubs)';

-- ============================================================
-- 6. JOUEUR
-- Joueurs liés à une équipe
-- ============================================================
CREATE TABLE joueur (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom             TEXT NOT NULL,
  prenom          TEXT NOT NULL,
  nationalite     TEXT NOT NULL,
  poste           poste_joueur NOT NULL,
  equipe_id       UUID NOT NULL REFERENCES equipe(id) ON DELETE CASCADE,
  photo_url       TEXT,
  numero_maillot  INTEGER CHECK (numero_maillot > 0 AND numero_maillot <= 99)
);

CREATE INDEX idx_joueur_equipe ON joueur(equipe_id);
CREATE INDEX idx_joueur_nationalite ON joueur(nationalite);

COMMENT ON TABLE joueur IS 'Joueurs de football avec poste et équipe';

-- ============================================================
-- 7. JEU
-- Définition des 3 mini-jeux
-- ============================================================
CREATE TABLE jeu (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nom         TEXT NOT NULL,
  type        type_jeu UNIQUE NOT NULL,
  description TEXT,
  icone       TEXT,
  actif       BOOLEAN NOT NULL DEFAULT true
);

COMMENT ON TABLE jeu IS 'Les 3 mini-jeux FootQuest';

-- Seed des 3 jeux
INSERT INTO jeu (nom, type, description, icone) VALUES
  ('Scout Master',     'scout_master',   'Trouvez l''équipe en fonction des nationalités de ses joueurs', '🔍'),
  ('The Missing Piece','missing_piece',  'Retrouvez le joueur manquant dans la composition',             '🧩'),
  ('Foot Trivia',      'foot_trivia',    'Quiz de culture football avec timer',                          '❓');

-- ============================================================
-- 8. SESSION_PARTIE
-- Historique de chaque partie jouée
-- ============================================================
CREATE TABLE session_partie (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  utilisateur_id   UUID NOT NULL REFERENCES utilisateur(id) ON DELETE CASCADE,
  jeu_id           UUID NOT NULL REFERENCES jeu(id) ON DELETE CASCADE,
  score            INTEGER NOT NULL DEFAULT 0 CHECK (score >= 0),
  points_gagnes    INTEGER NOT NULL DEFAULT 0 CHECK (points_gagnes >= 0),
  duree_secondes   INTEGER CHECK (duree_secondes >= 0),
  niveau_atteint   INTEGER NOT NULL DEFAULT 1 CHECK (niveau_atteint >= 1),
  complete         BOOLEAN NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_session_utilisateur ON session_partie(utilisateur_id);
CREATE INDEX idx_session_jeu ON session_partie(jeu_id);
CREATE INDEX idx_session_score ON session_partie(score DESC);
CREATE INDEX idx_session_created ON session_partie(created_at DESC);

COMMENT ON TABLE session_partie IS 'Historique des parties jouées par chaque utilisateur';

-- ============================================================
-- 9. QUESTION_TRIVIA
-- Banque de questions pour Foot Trivia
-- ============================================================
CREATE TABLE question_trivia (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question   TEXT NOT NULL,
  categorie  TEXT,
  difficulte difficulte_trivia NOT NULL DEFAULT 'moyen',
  points     INTEGER NOT NULL DEFAULT 10 CHECK (points > 0)
);

CREATE INDEX idx_trivia_difficulte ON question_trivia(difficulte);

COMMENT ON TABLE question_trivia IS 'Questions du quiz Foot Trivia';

-- ============================================================
-- 10. REPONSE_TRIVIA
-- Réponses (correctes et fausses) liées aux questions
-- ============================================================
CREATE TABLE reponse_trivia (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id   UUID NOT NULL REFERENCES question_trivia(id) ON DELETE CASCADE,
  reponse       TEXT NOT NULL,
  est_correcte  BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX idx_reponse_question ON reponse_trivia(question_id);

COMMENT ON TABLE reponse_trivia IS 'Réponses possibles pour chaque question trivia';

-- ============================================================
-- 11. NIVEAU_SCOUT_MASTER
-- Niveaux du jeu Scout Master
-- ============================================================
CREATE TABLE niveau_scout_master (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  niveau                INTEGER NOT NULL UNIQUE CHECK (niveau >= 1),
  equipe_id             UUID NOT NULL REFERENCES equipe(id) ON DELETE CASCADE,
  points                INTEGER NOT NULL DEFAULT 10 CHECK (points > 0),
  temps_limite_secondes INTEGER NOT NULL DEFAULT 60 CHECK (temps_limite_secondes > 0)
);

CREATE INDEX idx_nsm_niveau ON niveau_scout_master(niveau);

COMMENT ON TABLE niveau_scout_master IS 'Niveaux progressifs du jeu Scout Master';

-- ============================================================
-- 12. INDICE_SCOUT_MASTER
-- Indices révélés progressivement dans Scout Master
-- ============================================================
CREATE TABLE indice_scout_master (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  niveau_id UUID NOT NULL REFERENCES niveau_scout_master(id) ON DELETE CASCADE,
  ordre     INTEGER NOT NULL CHECK (ordre >= 1),
  type      type_indice NOT NULL,
  contenu   TEXT NOT NULL,
  UNIQUE(niveau_id, ordre)
);

CREATE INDEX idx_ism_niveau ON indice_scout_master(niveau_id);

COMMENT ON TABLE indice_scout_master IS 'Indices (drapeaux, texte, silhouettes) pour Scout Master';

-- ============================================================
-- 13. NIVEAU_MISSING_PIECE
-- Niveaux du jeu The Missing Piece
-- ============================================================
CREATE TABLE niveau_missing_piece (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  niveau                INTEGER NOT NULL UNIQUE CHECK (niveau >= 1),
  equipe_id             UUID NOT NULL REFERENCES equipe(id) ON DELETE CASCADE,
  joueur_manquant_id    UUID NOT NULL REFERENCES joueur(id) ON DELETE CASCADE,
  points                INTEGER NOT NULL DEFAULT 15 CHECK (points > 0),
  temps_limite_secondes INTEGER NOT NULL DEFAULT 45 CHECK (temps_limite_secondes > 0)
);

CREATE INDEX idx_nmp_niveau ON niveau_missing_piece(niveau);

COMMENT ON TABLE niveau_missing_piece IS 'Niveaux du jeu The Missing Piece';

-- ============================================================
-- 14. COMPOSITION_MISSING_PIECE
-- Joueurs visibles dans la composition d'un niveau
-- ============================================================
CREATE TABLE composition_missing_piece (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  niveau_id   UUID NOT NULL REFERENCES niveau_missing_piece(id) ON DELETE CASCADE,
  joueur_id   UUID NOT NULL REFERENCES joueur(id) ON DELETE CASCADE,
  position_x  REAL NOT NULL CHECK (position_x >= 0 AND position_x <= 100),
  position_y  REAL NOT NULL CHECK (position_y >= 0 AND position_y <= 100),
  est_visible BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(niveau_id, joueur_id)
);

CREATE INDEX idx_cmp_niveau ON composition_missing_piece(niveau_id);

COMMENT ON TABLE composition_missing_piece IS 'Disposition des joueurs sur le terrain pour Missing Piece';

-- ============================================================
-- FONCTION : Mise à jour automatique de updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_utilisateur_updated_at
  BEFORE UPDATE ON utilisateur
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- FONCTION : Créer automatiquement le profil utilisateur
-- après inscription via Supabase Auth
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO utilisateur (id, email, pseudo)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'pseudo', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- FONCTION : Incrémenter les FootPoints après une partie
-- ============================================================
CREATE OR REPLACE FUNCTION increment_foot_points()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.complete = true THEN
    UPDATE utilisateur
    SET
      foot_points = foot_points + NEW.points_gagnes,
      parties_jouees_aujourd_hui = CASE
        WHEN date_derniere_partie = CURRENT_DATE THEN parties_jouees_aujourd_hui + 1
        ELSE 1
      END,
      date_derniere_partie = CURRENT_DATE
    WHERE id = NEW.utilisateur_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER tr_session_increment_points
  AFTER INSERT ON session_partie
  FOR EACH ROW EXECUTE FUNCTION increment_foot_points();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Active RLS sur toutes les tables
ALTER TABLE utilisateur              ENABLE ROW LEVEL SECURITY;
ALTER TABLE partenaire               ENABLE ROW LEVEL SECURITY;
ALTER TABLE recompense               ENABLE ROW LEVEL SECURITY;
ALTER TABLE obtention_recompense     ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipe                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE joueur                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE jeu                      ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_partie           ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_trivia          ENABLE ROW LEVEL SECURITY;
ALTER TABLE reponse_trivia           ENABLE ROW LEVEL SECURITY;
ALTER TABLE niveau_scout_master      ENABLE ROW LEVEL SECURITY;
ALTER TABLE indice_scout_master      ENABLE ROW LEVEL SECURITY;
ALTER TABLE niveau_missing_piece     ENABLE ROW LEVEL SECURITY;
ALTER TABLE composition_missing_piece ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────
-- UTILISATEUR
-- ─────────────────────────────────────────────
-- Chaque utilisateur peut lire son propre profil
CREATE POLICY "utilisateur_select_own"
  ON utilisateur FOR SELECT
  USING (auth.uid() = id);

-- Chaque utilisateur peut modifier son profil (pseudo, avatar)
CREATE POLICY "utilisateur_update_own"
  ON utilisateur FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Permettre la lecture des pseudos/avatars pour le leaderboard
CREATE POLICY "utilisateur_select_public"
  ON utilisateur FOR SELECT
  USING (true);

-- ─────────────────────────────────────────────
-- PARTENAIRE (lecture publique)
-- ─────────────────────────────────────────────
CREATE POLICY "partenaire_select_all"
  ON partenaire FOR SELECT
  USING (true);

-- ─────────────────────────────────────────────
-- RECOMPENSE (lecture publique des récompenses actives)
-- ─────────────────────────────────────────────
CREATE POLICY "recompense_select_all"
  ON recompense FOR SELECT
  USING (true);

-- ─────────────────────────────────────────────
-- OBTENTION_RECOMPENSE
-- ─────────────────────────────────────────────
-- L'utilisateur voit uniquement ses récompenses
CREATE POLICY "obtention_select_own"
  ON obtention_recompense FOR SELECT
  USING (auth.uid() = utilisateur_id);

-- L'utilisateur peut réclamer une récompense (INSERT)
CREATE POLICY "obtention_insert_own"
  ON obtention_recompense FOR INSERT
  WITH CHECK (auth.uid() = utilisateur_id);

-- ─────────────────────────────────────────────
-- EQUIPE, JOUEUR (lecture publique - données de jeu)
-- ─────────────────────────────────────────────
CREATE POLICY "equipe_select_all"
  ON equipe FOR SELECT
  USING (true);

CREATE POLICY "joueur_select_all"
  ON joueur FOR SELECT
  USING (true);

-- ─────────────────────────────────────────────
-- JEU (lecture publique)
-- ─────────────────────────────────────────────
CREATE POLICY "jeu_select_all"
  ON jeu FOR SELECT
  USING (true);

-- ─────────────────────────────────────────────
-- SESSION_PARTIE
-- ─────────────────────────────────────────────
-- L'utilisateur voit ses propres sessions
CREATE POLICY "session_select_own"
  ON session_partie FOR SELECT
  USING (auth.uid() = utilisateur_id);

-- Permettre la lecture des scores pour le leaderboard
CREATE POLICY "session_select_leaderboard"
  ON session_partie FOR SELECT
  USING (true);

-- L'utilisateur peut créer ses sessions
CREATE POLICY "session_insert_own"
  ON session_partie FOR INSERT
  WITH CHECK (auth.uid() = utilisateur_id);

-- ─────────────────────────────────────────────
-- QUESTION_TRIVIA & REPONSE_TRIVIA (lecture publique)
-- ─────────────────────────────────────────────
CREATE POLICY "trivia_question_select_all"
  ON question_trivia FOR SELECT
  USING (true);

CREATE POLICY "trivia_reponse_select_all"
  ON reponse_trivia FOR SELECT
  USING (true);

-- ─────────────────────────────────────────────
-- NIVEAUX & INDICES (lecture publique - contenu de jeu)
-- ─────────────────────────────────────────────
CREATE POLICY "nsm_select_all"
  ON niveau_scout_master FOR SELECT
  USING (true);

CREATE POLICY "ism_select_all"
  ON indice_scout_master FOR SELECT
  USING (true);

CREATE POLICY "nmp_select_all"
  ON niveau_missing_piece FOR SELECT
  USING (true);

CREATE POLICY "cmp_select_all"
  ON composition_missing_piece FOR SELECT
  USING (true);
