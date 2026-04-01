// FootQuest - Database type definitions
// These types mirror the Supabase PostgreSQL schema

export type UserRole = "basic" | "golden_ball";

export interface User {
  id: string;
  email: string;
  pseudo: string;
  avatar_url: string | null;
  banner_url: string | null;
  role: UserRole;
  foot_points: number;
  parties_jouees_aujourd_hui: number;
  date_derniere_partie: string | null;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: string;
  nom: string;
  logo_url: string | null;
  site_web: string | null;
  actif: boolean;
  created_at: string;
}

export interface Reward {
  id: string;
  partenaire_id: string;
  nom: string;
  description: string | null;
  image_url: string | null;
  cout_points: number;
  stock: number;
  actif: boolean;
  created_at: string;
}

export interface RewardObtained {
  id: string;
  utilisateur_id: string;
  recompense_id: string;
  date_obtention: string;
  code_unique: string;
  statut: "actif" | "utilise" | "expire";
}

export interface Team {
  id: string;
  nom: string;
  pays: string;
  logo_url: string | null;
  confederation: string | null;
}

export interface Player {
  id: string;
  nom: string;
  prenom: string;
  nationalite: string;
  poste: "GK" | "DEF" | "MID" | "FWD";
  equipe_id: string;
  photo_url: string | null;
  numero_maillot: number | null;
}

export type GameType = "scout_master" | "missing_piece" | "foot_trivia";

export interface Game {
  id: string;
  nom: string;
  type: GameType;
  description: string | null;
  icone: string | null;
  actif: boolean;
}

export interface GameSession {
  id: string;
  utilisateur_id: string;
  jeu_id: string;
  score: number;
  points_gagnes: number;
  duree_secondes: number | null;
  niveau_atteint: number;
  complete: boolean;
  created_at: string;
}

export interface TriviaQuestion {
  id: string;
  question: string;
  categorie: string | null;
  difficulte: "facile" | "moyen" | "difficile";
  points: number;
}

export interface TriviaAnswer {
  id: string;
  question_id: string;
  reponse: string;
  est_correcte: boolean;
}

export interface ScoutMasterLevel {
  id: string;
  niveau: number;
  equipe_id: string;
  points: number;
  temps_limite_secondes: number;
}

export interface ScoutMasterClue {
  id: string;
  niveau_id: string;
  ordre: number;
  type: "drapeau" | "indice_texte" | "silhouette";
  contenu: string;
}

export interface MissingPieceLevel {
  id: string;
  niveau: number;
  equipe_id: string;
  joueur_manquant_id: string;
  points: number;
  temps_limite_secondes: number;
}

export interface CompositionMissingPiece {
  id: string;
  niveau_id: string;
  joueur_id: string;
  position_x: number;
  position_y: number;
  est_visible: boolean;
}
