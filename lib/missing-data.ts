/**
 * FootQuest - The Missing Piece game data (CDM 2026 Edition)
 *
 * Sélections nationales qualifiées pour la CDM 2026.
 * Un joueur est masqué dans chaque formation.
 */

export interface MissingPieceTeamData {
  pays: string;
  drapeau: string;
  formation: string;
  joueurs: {
    nom: string;
    prenom: string;
    poste: "GK" | "DEF" | "MID" | "FWD";
    numero: number;
    posX: number;
    posY: number;
  }[];
  joueurManquantIndex: number;
  difficulty?: Difficulty;
}

import { MISSING_PIECE_EXPANSION_1 } from "./missing-expansion1";
import { MISSING_PIECE_EXPANSION_2 } from "./missing-expansion2";
import type { Difficulty } from "./constants";

const BASE_TEAMS: MissingPieceTeamData[] = [
  {
    pays: "France",
    drapeau: "🇫🇷",
    formation: "4-3-3",
    joueurs: [
      { nom: "Maignan", prenom: "Mike", poste: "GK", numero: 16, posX: 50, posY: 90 },
      { nom: "Gusto", prenom: "Malo", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Upamecano", prenom: "Dayot", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Saliba", prenom: "William", poste: "DEF", numero: 17, posX: 38, posY: 75 },
      { nom: "Hernández", prenom: "Théo", poste: "DEF", numero: 22, posX: 15, posY: 72 },
      { nom: "Tchouaméni", prenom: "Aurélien", poste: "MID", numero: 8, posX: 70, posY: 52 },
      { nom: "Camavinga", prenom: "Eduardo", poste: "MID", numero: 6, posX: 50, posY: 55 },
      { nom: "Rabiot", prenom: "Adrien", poste: "MID", numero: 14, posX: 30, posY: 52 },
      { nom: "Dembélé", prenom: "Ousmane", poste: "FWD", numero: 11, posX: 80, posY: 28 },
      { nom: "Mbappé", prenom: "Kylian", poste: "FWD", numero: 10, posX: 50, posY: 22 },
      { nom: "Olise", prenom: "Michael", poste: "FWD", numero: 7, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 9, // Mbappé
  },
  {
    pays: "Argentine",
    drapeau: "🇦🇷",
    formation: "4-3-3",
    joueurs: [
      { nom: "Martínez", prenom: "Emiliano", poste: "GK", numero: 23, posX: 50, posY: 90 },
      { nom: "Molina", prenom: "Nahuel", poste: "DEF", numero: 26, posX: 85, posY: 72 },
      { nom: "Romero", prenom: "Cristian", poste: "DEF", numero: 13, posX: 62, posY: 75 },
      { nom: "Otamendi", prenom: "Nicolás", poste: "DEF", numero: 19, posX: 38, posY: 75 },
      { nom: "Tagliafico", prenom: "Nicolás", poste: "DEF", numero: 3, posX: 15, posY: 72 },
      { nom: "De Paul", prenom: "Rodrigo", poste: "MID", numero: 7, posX: 70, posY: 52 },
      { nom: "Fernández", prenom: "Enzo", poste: "MID", numero: 24, posX: 50, posY: 55 },
      { nom: "Mac Allister", prenom: "Alexis", poste: "MID", numero: 20, posX: 30, posY: 52 },
      { nom: "Messi", prenom: "Lionel", poste: "FWD", numero: 10, posX: 80, posY: 28 },
      { nom: "Álvarez", prenom: "Julián", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Martínez", prenom: "Lautaro", poste: "FWD", numero: 22, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 8, // Messi
  },
  {
    pays: "Brésil",
    drapeau: "🇧🇷",
    formation: "4-3-3",
    joueurs: [
      { nom: "Alisson", prenom: "", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Wesley", prenom: "", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Marquinhos", prenom: "", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Magalhães", prenom: "Gabriel", poste: "DEF", numero: 3, posX: 38, posY: 75 },
      { nom: "Henrique", prenom: "Caio", poste: "DEF", numero: 6, posX: 15, posY: 72 },
      { nom: "Casemiro", prenom: "", poste: "MID", numero: 5, posX: 70, posY: 52 },
      { nom: "Guimarães", prenom: "Bruno", poste: "MID", numero: 8, posX: 50, posY: 55 },
      { nom: "Raphinha", prenom: "", poste: "MID", numero: 11, posX: 30, posY: 52 },
      { nom: "Pedro", prenom: "João", poste: "FWD", numero: 9, posX: 80, posY: 28 },
      { nom: "Vinícius Jr.", prenom: "", poste: "FWD", numero: 7, posX: 50, posY: 22 },
      { nom: "Endrick", prenom: "", poste: "FWD", numero: 21, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 9, // Vinícius Jr.
  },
  {
    pays: "Angleterre",
    drapeau: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    formation: "4-2-4",
    joueurs: [
      { nom: "Pickford", prenom: "Jordan", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "James", prenom: "Reece", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Stones", prenom: "John", poste: "DEF", numero: 5, posX: 62, posY: 75 },
      { nom: "Guéhi", prenom: "Marc", poste: "DEF", numero: 6, posX: 38, posY: 75 },
      { nom: "Burn", prenom: "Dan", poste: "DEF", numero: 3, posX: 15, posY: 72 },
      { nom: "Rice", prenom: "Declan", poste: "MID", numero: 4, posX: 65, posY: 55 },
      { nom: "Wharton", prenom: "Adam", poste: "MID", numero: 16, posX: 35, posY: 55 },
      { nom: "Saka", prenom: "Bukayo", poste: "FWD", numero: 7, posX: 85, posY: 25 },
      { nom: "Bellingham", prenom: "Jude", poste: "FWD", numero: 10, posX: 60, posY: 22 },
      { nom: "Gordon", prenom: "Anthony", poste: "FWD", numero: 11, posX: 40, posY: 22 },
      { nom: "Kane", prenom: "Harry", poste: "FWD", numero: 9, posX: 15, posY: 25 },
    ],
    joueurManquantIndex: 8, // Bellingham
  },
  {
    pays: "Espagne",
    drapeau: "🇪🇸",
    formation: "4-3-3",
    joueurs: [
      { nom: "Raya", prenom: "David", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Porro", prenom: "Pedro", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Cubarsí", prenom: "Pau", poste: "DEF", numero: 3, posX: 62, posY: 75 },
      { nom: "Laporte", prenom: "Aymeric", poste: "DEF", numero: 14, posX: 38, posY: 75 },
      { nom: "Cucurella", prenom: "Marc", poste: "DEF", numero: 24, posX: 15, posY: 72 },
      { nom: "Rodri", prenom: "", poste: "MID", numero: 16, posX: 70, posY: 52 },
      { nom: "Zubimendi", prenom: "Martín", poste: "MID", numero: 4, posX: 50, posY: 55 },
      { nom: "Pedri", prenom: "", poste: "MID", numero: 8, posX: 30, posY: 52 },
      { nom: "Yamal", prenom: "Lamine", poste: "FWD", numero: 19, posX: 80, posY: 28 },
      { nom: "Olmo", prenom: "Dani", poste: "FWD", numero: 10, posX: 50, posY: 22 },
      { nom: "Williams", prenom: "Nico", poste: "FWD", numero: 17, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 8, // Yamal
  },
  {
    pays: "Portugal",
    drapeau: "🇵🇹",
    formation: "4-3-3",
    joueurs: [
      { nom: "Costa", prenom: "Diogo", poste: "GK", numero: 22, posX: 50, posY: 90 },
      { nom: "Dalot", prenom: "Diogo", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Dias", prenom: "Rúben", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Inácio", prenom: "Gonçalo", poste: "DEF", numero: 14, posX: 38, posY: 75 },
      { nom: "Mendes", prenom: "Nuno", poste: "DEF", numero: 19, posX: 15, posY: 72 },
      { nom: "Palhinha", prenom: "João", poste: "MID", numero: 6, posX: 70, posY: 52 },
      { nom: "Vitinha", prenom: "", poste: "MID", numero: 23, posX: 50, posY: 55 },
      { nom: "Fernandes", prenom: "Bruno", poste: "MID", numero: 8, posX: 30, posY: 52 },
      { nom: "Silva", prenom: "Bernardo", poste: "FWD", numero: 10, posX: 80, posY: 28 },
      { nom: "Leão", prenom: "Rafael", poste: "FWD", numero: 17, posX: 50, posY: 22 },
      { nom: "Ronaldo", prenom: "Cristiano", poste: "FWD", numero: 7, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 10, // Ronaldo
  },
  {
    pays: "Allemagne",
    drapeau: "🇩🇪",
    formation: "4-3-3",
    joueurs: [
      { nom: "ter Stegen", prenom: "Marc-André", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Kimmich", prenom: "Joshua", poste: "DEF", numero: 6, posX: 85, posY: 72 },
      { nom: "Tah", prenom: "Jonathan", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Rüdiger", prenom: "Antonio", poste: "DEF", numero: 2, posX: 38, posY: 75 },
      { nom: "Raum", prenom: "David", poste: "DEF", numero: 3, posX: 15, posY: 72 },
      { nom: "Andrich", prenom: "Robert", poste: "MID", numero: 21, posX: 70, posY: 52 },
      { nom: "Wirtz", prenom: "Florian", poste: "MID", numero: 17, posX: 50, posY: 55 },
      { nom: "Musiala", prenom: "Jamal", poste: "MID", numero: 10, posX: 30, posY: 52 },
      { nom: "Sané", prenom: "Leroy", poste: "FWD", numero: 19, posX: 80, posY: 28 },
      { nom: "Havertz", prenom: "Kai", poste: "FWD", numero: 7, posX: 50, posY: 22 },
      { nom: "Undav", prenom: "Deniz", poste: "FWD", numero: 9, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 7, // Musiala
  },
  {
    pays: "Maroc",
    drapeau: "🇲🇦",
    formation: "4-3-3",
    joueurs: [
      { nom: "Bounou", prenom: "Yassine", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Hakimi", prenom: "Achraf", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Aguerd", prenom: "Nayef", poste: "DEF", numero: 6, posX: 62, posY: 75 },
      { nom: "Diop", prenom: "Issa", poste: "DEF", numero: 5, posX: 38, posY: 75 },
      { nom: "Mazraoui", prenom: "Noussair", poste: "DEF", numero: 3, posX: 15, posY: 72 },
      { nom: "El Aynaoui", prenom: "Neil", poste: "MID", numero: 4, posX: 70, posY: 52 },
      { nom: "Saibari", prenom: "Ismael", poste: "MID", numero: 8, posX: 50, posY: 55 },
      { nom: "El Khannouss", prenom: "Bilal", poste: "MID", numero: 10, posX: 30, posY: 52 },
      { nom: "Diaz", prenom: "Brahim", poste: "FWD", numero: 11, posX: 80, posY: 28 },
      { nom: "El Kaabi", prenom: "Ayoub", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Ezzalzouli", prenom: "Abde", poste: "FWD", numero: 7, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 1, // Hakimi
  },
  {
    pays: "Pays-Bas",
    drapeau: "🇳🇱",
    formation: "4-4-2",
    joueurs: [
      { nom: "Flekken", prenom: "Mark", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Dumfries", prenom: "Denzel", poste: "DEF", numero: 22, posX: 85, posY: 72 },
      { nom: "de Vrij", prenom: "Stefan", poste: "DEF", numero: 6, posX: 62, posY: 75 },
      { nom: "van Dijk", prenom: "Virgil", poste: "DEF", numero: 4, posX: 38, posY: 75 },
      { nom: "Aké", prenom: "Nathan", poste: "DEF", numero: 5, posX: 15, posY: 72 },
      { nom: "Schouten", prenom: "Jerdy", poste: "MID", numero: 21, posX: 80, posY: 50 },
      { nom: "Reijnders", prenom: "Tijjani", poste: "MID", numero: 14, posX: 60, posY: 55 },
      { nom: "de Jong", prenom: "Frenkie", poste: "MID", numero: 8, posX: 40, posY: 55 },
      { nom: "Simons", prenom: "Xavi", poste: "MID", numero: 10, posX: 20, posY: 50 },
      { nom: "Gakpo", prenom: "Cody", poste: "FWD", numero: 11, posX: 60, posY: 25 },
      { nom: "Depay", prenom: "Memphis", poste: "FWD", numero: 9, posX: 40, posY: 25 },
    ],
    joueurManquantIndex: 3, // van Dijk
  },
  {
    pays: "Belgique",
    drapeau: "🇧🇪",
    formation: "4-3-3",
    joueurs: [
      { nom: "Sels", prenom: "Matz", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Castagne", prenom: "Timothy", poste: "DEF", numero: 21, posX: 85, posY: 72 },
      { nom: "Faes", prenom: "Wout", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Theate", prenom: "Arthur", poste: "DEF", numero: 3, posX: 38, posY: 75 },
      { nom: "De Cuyper", prenom: "Maxim", poste: "DEF", numero: 5, posX: 15, posY: 72 },
      { nom: "Witsel", prenom: "Axel", poste: "MID", numero: 6, posX: 70, posY: 52 },
      { nom: "Tielemans", prenom: "Youri", poste: "MID", numero: 8, posX: 50, posY: 55 },
      { nom: "Vanaken", prenom: "Hans", poste: "MID", numero: 20, posX: 30, posY: 52 },
      { nom: "Doku", prenom: "Jérémy", poste: "FWD", numero: 7, posX: 80, posY: 28 },
      { nom: "Openda", prenom: "Loïs", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Trossard", prenom: "Leandro", poste: "FWD", numero: 11, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 8, // Doku
  },
];

export const MISSING_PIECE_TEAMS: MissingPieceTeamData[] = [
  ...BASE_TEAMS,
  ...MISSING_PIECE_EXPANSION_1,
  ...MISSING_PIECE_EXPANSION_2,
];

/**
 * Get all player names from all teams (for autocomplete).
 */
export function getAllPlayerNames(): string[] {
  const names = new Set<string>();
  for (const team of MISSING_PIECE_TEAMS) {
    for (const joueur of team.joueurs) {
      names.add(joueur.nom);
    }
  }
  return Array.from(names).sort();
}

/** Teams classified by difficulty (same as scout-data) */
const EASY_TEAMS = new Set([
  "France", "Argentine", "Brésil", "Angleterre", "Espagne",
  "Portugal", "Allemagne", "Pays-Bas", "Belgique", "Maroc",
  "Croatie", "Uruguay",
]);
const MEDIUM_TEAMS = new Set([
  "Japon", "Sénégal", "Suisse", "Canada", "Colombie",
  "Corée du Sud", "Égypte", "Algérie", "Turquie", "Norvège",
  "Suède", "Côte d'Ivoire", "Iran", "Autriche", "Écosse",
  "Ghana",
]);

function getTeamDifficulty(pays: string): Difficulty {
  if (EASY_TEAMS.has(pays)) return "facile";
  if (MEDIUM_TEAMS.has(pays)) return "moyen";
  return "difficile";
}

/**
 * Get random Missing Piece levels, optionally filtered by difficulty.
 */
export function getRandomMissingPieceLevels(count: number, difficulty?: Difficulty): MissingPieceTeamData[] {
  let pool = MISSING_PIECE_TEAMS;
  if (difficulty) {
    pool = MISSING_PIECE_TEAMS.filter((t) => getTeamDifficulty(t.pays) === difficulty);
    if (pool.length < count) {
      pool = MISSING_PIECE_TEAMS;
    }
  }
  const selected = [...pool].sort(() => Math.random() - 0.5).slice(0, count);
  return selected.map(team => ({
    ...team,
    difficulty: getTeamDifficulty(team.pays),
    joueurManquantIndex: Math.floor(Math.random() * team.joueurs.length)
  }));
}