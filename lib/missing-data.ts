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
    formation: "4-2-3-1",
    joueurs: [
      { nom: "Maignan", prenom: "Mike", poste: "GK", numero: 16, posX: 50, posY: 90 },
      { nom: "Koundé", prenom: "Jules", poste: "DEF", numero: 5, posX: 85, posY: 72 },
      { nom: "Saliba", prenom: "William", poste: "DEF", numero: 17, posX: 62, posY: 75 },
      { nom: "Upamecano", prenom: "Dayot", poste: "DEF", numero: 4, posX: 38, posY: 75 },
      { nom: "Hernández", prenom: "Théo", poste: "DEF", numero: 22, posX: 15, posY: 72 },
      { nom: "Tchouaméni", prenom: "Aurélien", poste: "MID", numero: 8, posX: 60, posY: 55 },
      { nom: "Rabiot", prenom: "Adrien", poste: "MID", numero: 14, posX: 40, posY: 55 },
      { nom: "Olise", prenom: "Michael", poste: "FWD", numero: 7, posX: 80, posY: 35 },
      { nom: "Dembélé", prenom: "Ousmane", poste: "FWD", numero: 11, posX: 50, posY: 38 },
      { nom: "Doué", prenom: "Désiré", poste: "FWD", numero: 15, posX: 20, posY: 35 },
      { nom: "Mbappé", prenom: "Kylian", poste: "FWD", numero: 10, posX: 50, posY: 22 },
    ],
    joueurManquantIndex: 10, // Mbappé
  },
  {
    pays: "Argentine",
    drapeau: "🇦🇷",
    formation: "4-3-3",
    joueurs: [
      { nom: "Martínez", prenom: "Emiliano", poste: "GK", numero: 23, posX: 50, posY: 90 },
      { nom: "Molina", prenom: "Nahuel", poste: "DEF", numero: 26, posX: 85, posY: 72 },
      { nom: "Romero", prenom: "Cristian", poste: "DEF", numero: 13, posX: 62, posY: 75 },
      { nom: "Martínez", prenom: "Lisandro", poste: "DEF", numero: 25, posX: 38, posY: 75 },
      { nom: "Tagliafico", prenom: "Nicolás", poste: "DEF", numero: 3, posX: 15, posY: 72 },
      { nom: "De Paul", prenom: "Rodrigo", poste: "MID", numero: 7, posX: 70, posY: 52 },
      { nom: "Fernández", prenom: "Enzo", poste: "MID", numero: 24, posX: 50, posY: 55 },
      { nom: "Mac Allister", prenom: "Alexis", poste: "MID", numero: 20, posX: 30, posY: 52 },
      { nom: "Messi", prenom: "Lionel", poste: "FWD", numero: 10, posX: 80, posY: 28 },
      { nom: "Álvarez", prenom: "Julián", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "González", prenom: "Nicolás", poste: "FWD", numero: 15, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 8, // Messi
  },
  {
    pays: "Brésil",
    drapeau: "🇧🇷",
    formation: "4-2-3-1",
    joueurs: [
      { nom: "Alisson", prenom: "", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Ibañez", prenom: "Roger", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Marquinhos", prenom: "", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Magalhães", prenom: "Gabriel", poste: "DEF", numero: 3, posX: 38, posY: 75 },
      { nom: "Douglas Santos", prenom: "", poste: "DEF", numero: 6, posX: 15, posY: 72 },
      { nom: "Casemiro", prenom: "", poste: "MID", numero: 5, posX: 60, posY: 55 },
      { nom: "Guimarães", prenom: "Bruno", poste: "MID", numero: 8, posX: 40, posY: 55 },
      { nom: "Raphinha", prenom: "", poste: "FWD", numero: 11, posX: 80, posY: 35 },
      { nom: "Paquetá", prenom: "Lucas", poste: "FWD", numero: 10, posX: 50, posY: 38 },
      { nom: "Vinícius Jr.", prenom: "", poste: "FWD", numero: 7, posX: 20, posY: 35 },
      { nom: "Igor Thiago", prenom: "", poste: "FWD", numero: 9, posX: 50, posY: 22 },
    ],
    joueurManquantIndex: 9, // Vinícius Jr.
  },
  {
    pays: "Angleterre",
    drapeau: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    formation: "4-2-3-1",
    joueurs: [
      { nom: "Pickford", prenom: "Jordan", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "James", prenom: "Reece", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Konsa", prenom: "Ezri", poste: "DEF", numero: 5, posX: 62, posY: 75 },
      { nom: "Stones", prenom: "John", poste: "DEF", numero: 6, posX: 38, posY: 75 },
      { nom: "O'Reilly", prenom: "Nico", poste: "DEF", numero: 3, posX: 15, posY: 72 },
      { nom: "Rice", prenom: "Declan", poste: "MID", numero: 4, posX: 60, posY: 55 },
      { nom: "Anderson", prenom: "Elliot", poste: "MID", numero: 16, posX: 40, posY: 55 },
      { nom: "Madueke", prenom: "Noni", poste: "FWD", numero: 7, posX: 80, posY: 35 },
      { nom: "Bellingham", prenom: "Jude", poste: "FWD", numero: 10, posX: 50, posY: 38 },
      { nom: "Gordon", prenom: "Anthony", poste: "FWD", numero: 11, posX: 20, posY: 35 },
      { nom: "Kane", prenom: "Harry", poste: "FWD", numero: 9, posX: 50, posY: 22 },
    ],
    joueurManquantIndex: 8, // Bellingham
  },
  {
    pays: "Espagne",
    drapeau: "🇪🇸",
    formation: "4-3-3",
    joueurs: [
      { nom: "Unai Simón", prenom: "", poste: "GK", numero: 23, posX: 50, posY: 90 },
      { nom: "Porro", prenom: "Pedro", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Laporte", prenom: "Aymeric", poste: "DEF", numero: 14, posX: 62, posY: 75 },
      { nom: "Cubarsí", prenom: "Pau", poste: "DEF", numero: 3, posX: 38, posY: 75 },
      { nom: "Cucurella", prenom: "Marc", poste: "DEF", numero: 24, posX: 15, posY: 72 },
      { nom: "Pedri", prenom: "", poste: "MID", numero: 8, posX: 70, posY: 52 },
      { nom: "Rodri", prenom: "", poste: "MID", numero: 16, posX: 50, posY: 55 },
      { nom: "Fabián Ruiz", prenom: "", poste: "MID", numero: 6, posX: 30, posY: 52 },
      { nom: "Ferran Torres", prenom: "", poste: "FWD", numero: 11, posX: 80, posY: 28 },
      { nom: "Dani Olmo", prenom: "", poste: "FWD", numero: 10, posX: 50, posY: 22 },
      { nom: "Oyarzabal", prenom: "Mikel", poste: "FWD", numero: 17, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 6, // Rodri
  },
  {
    pays: "Portugal",
    drapeau: "🇵🇹",
    formation: "4-3-3",
    joueurs: [
      { nom: "Diogo Costa", prenom: "", poste: "GK", numero: 22, posX: 50, posY: 90 },
      { nom: "Cancelo", prenom: "João", poste: "DEF", numero: 20, posX: 85, posY: 72 },
      { nom: "Rúben Dias", prenom: "", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Inácio", prenom: "Gonçalo", poste: "DEF", numero: 14, posX: 38, posY: 75 },
      { nom: "Nuno Mendes", prenom: "", poste: "DEF", numero: 19, posX: 15, posY: 72 },
      { nom: "Vitinha", prenom: "", poste: "MID", numero: 23, posX: 70, posY: 52 },
      { nom: "João Neves", prenom: "", poste: "MID", numero: 6, posX: 50, posY: 55 },
      { nom: "Bruno Fernandes", prenom: "", poste: "MID", numero: 8, posX: 30, posY: 52 },
      { nom: "Bernardo Silva", prenom: "", poste: "FWD", numero: 10, posX: 80, posY: 28 },
      { nom: "Cristiano Ronaldo", prenom: "", poste: "FWD", numero: 7, posX: 50, posY: 22 },
      { nom: "Rafael Leão", prenom: "", poste: "FWD", numero: 17, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 9, // Cristiano Ronaldo
  },
  {
    pays: "Allemagne",
    drapeau: "🇩🇪",
    formation: "4-2-3-1",
    joueurs: [
      { nom: "Neuer", prenom: "Manuel", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Kimmich", prenom: "Joshua", poste: "DEF", numero: 6, posX: 85, posY: 72 },
      { nom: "Tah", prenom: "Jonathan", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Schlotterbeck", prenom: "Nico", poste: "DEF", numero: 15, posX: 38, posY: 75 },
      { nom: "Brown", prenom: "Nathaniel", poste: "DEF", numero: 3, posX: 15, posY: 72 },
      { nom: "Nmecha", prenom: "Felix", poste: "MID", numero: 20, posX: 60, posY: 55 },
      { nom: "Pavlović", prenom: "Aleksandar", poste: "MID", numero: 25, posX: 40, posY: 55 },
      { nom: "Musiala", prenom: "Jamal", poste: "FWD", numero: 10, posX: 80, posY: 35 },
      { nom: "Wirtz", prenom: "Florian", poste: "FWD", numero: 17, posX: 50, posY: 38 },
      { nom: "Sané", prenom: "Leroy", poste: "FWD", numero: 19, posX: 20, posY: 35 },
      { nom: "Havertz", prenom: "Kai", poste: "FWD", numero: 7, posX: 50, posY: 22 },
    ],
    joueurManquantIndex: 7, // Musiala
  },
  {
    pays: "Maroc",
    drapeau: "🇲🇦",
    formation: "4-2-3-1",
    joueurs: [
      { nom: "Bounou", prenom: "Yassine", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Hakimi", prenom: "Achraf", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Diop", prenom: "Issa", poste: "DEF", numero: 5, posX: 62, posY: 75 },
      { nom: "Chadi Riad", prenom: "", poste: "DEF", numero: 15, posX: 38, posY: 75 },
      { nom: "Mazraoui", prenom: "Noussair", poste: "DEF", numero: 3, posX: 15, posY: 72 },
      { nom: "El Aynaoui", prenom: "Neil", poste: "MID", numero: 4, posX: 60, posY: 55 },
      { nom: "Bouaddi", prenom: "Ayyoub", poste: "MID", numero: 25, posX: 40, posY: 55 },
      { nom: "Brahim Díaz", prenom: "", poste: "FWD", numero: 11, posX: 80, posY: 35 },
      { nom: "Ounahi", prenom: "Azzedine", poste: "FWD", numero: 8, posX: 50, posY: 38 },
      { nom: "El Khannouss", prenom: "Bilal", poste: "FWD", numero: 10, posX: 20, posY: 35 },
      { nom: "Saibari", prenom: "Ismael", poste: "FWD", numero: 9, posX: 50, posY: 22 },
    ],
    joueurManquantIndex: 1, // Hakimi
  },
  {
    pays: "Pays-Bas",
    drapeau: "🇳🇱",
    formation: "4-3-3",
    joueurs: [
      { nom: "Verbruggen", prenom: "Bart", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Dumfries", prenom: "Denzel", poste: "DEF", numero: 22, posX: 85, posY: 72 },
      { nom: "Van Hecke", prenom: "Jan Paul", poste: "DEF", numero: 6, posX: 62, posY: 75 },
      { nom: "Van Dijk", prenom: "Virgil", poste: "DEF", numero: 4, posX: 38, posY: 75 },
      { nom: "Van de Ven", prenom: "Micky", poste: "DEF", numero: 5, posX: 15, posY: 72 },
      { nom: "De Jong", prenom: "Frenkie", poste: "MID", numero: 8, posX: 70, posY: 52 },
      { nom: "Gravenberch", prenom: "Ryan", poste: "MID", numero: 14, posX: 50, posY: 55 },
      { nom: "Reijnders", prenom: "Tijjani", poste: "MID", numero: 21, posX: 30, posY: 52 },
      { nom: "Summerville", prenom: "Crysencio", poste: "FWD", numero: 7, posX: 80, posY: 28 },
      { nom: "Gakpo", prenom: "Cody", poste: "FWD", numero: 11, posX: 50, posY: 22 },
      { nom: "Malen", prenom: "Donyell", poste: "FWD", numero: 9, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 3, // Van Dijk
  },
  {
    pays: "Belgique",
    drapeau: "🇧🇪",
    formation: "4-3-3",
    joueurs: [
      { nom: "Courtois", prenom: "Thibaut", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Castagne", prenom: "Timothy", poste: "DEF", numero: 21, posX: 85, posY: 72 },
      { nom: "Debast", prenom: "Zeno", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Theate", prenom: "Arthur", poste: "DEF", numero: 3, posX: 38, posY: 75 },
      { nom: "De Cuyper", prenom: "Maxim", poste: "DEF", numero: 5, posX: 15, posY: 72 },
      { nom: "Tielemans", prenom: "Youri", poste: "MID", numero: 8, posX: 70, posY: 52 },
      { nom: "Onana", prenom: "Amadou", poste: "MID", numero: 18, posX: 50, posY: 55 },
      { nom: "De Bruyne", prenom: "Kevin", poste: "MID", numero: 7, posX: 30, posY: 52 },
      { nom: "Doku", prenom: "Jérémy", poste: "FWD", numero: 11, posX: 80, posY: 28 },
      { nom: "Lukaku", prenom: "Romelu", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Fernandez-Pardo", prenom: "Matias", poste: "FWD", numero: 20, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 7, // De Bruyne
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