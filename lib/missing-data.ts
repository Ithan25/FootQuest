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
      { nom: "Koundé", prenom: "Jules", poste: "DEF", numero: 5, posX: 85, posY: 72 },
      { nom: "Upamecano", prenom: "Dayot", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Saliba", prenom: "William", poste: "DEF", numero: 17, posX: 38, posY: 75 },
      { nom: "Hernández", prenom: "Theo", poste: "DEF", numero: 22, posX: 15, posY: 72 },
      { nom: "Tchouaméni", prenom: "Aurélien", poste: "MID", numero: 8, posX: 70, posY: 52 },
      { nom: "Camavinga", prenom: "Eduardo", poste: "MID", numero: 6, posX: 50, posY: 55 },
      { nom: "Rabiot", prenom: "Adrien", poste: "MID", numero: 14, posX: 30, posY: 52 },
      { nom: "Dembélé", prenom: "Ousmane", poste: "FWD", numero: 11, posX: 80, posY: 28 },
      { nom: "Mbappé", prenom: "Kylian", poste: "FWD", numero: 10, posX: 50, posY: 22 },
      { nom: "Barcola", prenom: "Bradley", poste: "FWD", numero: 20, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 9, // Mbappé
  },
  {
    pays: "Argentine",
    drapeau: "🇦🇷",
    formation: "4-3-3",
    joueurs: [
      { nom: "E. Martínez", prenom: "Emiliano", poste: "GK", numero: 23, posX: 50, posY: 90 },
      { nom: "Molina", prenom: "Nahuel", poste: "DEF", numero: 26, posX: 85, posY: 72 },
      { nom: "Romero", prenom: "Cristian", poste: "DEF", numero: 13, posX: 62, posY: 75 },
      { nom: "Otamendi", prenom: "Nicolás", poste: "DEF", numero: 19, posX: 38, posY: 75 },
      { nom: "Acuña", prenom: "Marcos", poste: "DEF", numero: 8, posX: 15, posY: 72 },
      { nom: "De Paul", prenom: "Rodrigo", poste: "MID", numero: 7, posX: 70, posY: 52 },
      { nom: "E. Fernández", prenom: "Enzo", poste: "MID", numero: 24, posX: 50, posY: 55 },
      { nom: "Mac Allister", prenom: "Alexis", poste: "MID", numero: 20, posX: 30, posY: 52 },
      { nom: "González", prenom: "Nicolás", poste: "FWD", numero: 15, posX: 80, posY: 28 },
      { nom: "Messi", prenom: "Lionel", poste: "FWD", numero: 10, posX: 50, posY: 22 },
      { nom: "J. Álvarez", prenom: "Julián", poste: "FWD", numero: 9, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 9, // Messi
  },
  {
    pays: "Brésil",
    drapeau: "🇧🇷",
    formation: "4-3-3",
    joueurs: [
      { nom: "Alisson", prenom: "", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Danilo", prenom: "", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Marquinhos", prenom: "", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Gabriel", prenom: "", poste: "DEF", numero: 3, posX: 38, posY: 75 },
      { nom: "Wendell", prenom: "", poste: "DEF", numero: 6, posX: 15, posY: 72 },
      { nom: "B. Guimarães", prenom: "Bruno", poste: "MID", numero: 5, posX: 70, posY: 52 },
      { nom: "Paquetá", prenom: "Lucas", poste: "MID", numero: 10, posX: 50, posY: 55 },
      { nom: "Rodrygo", prenom: "", poste: "MID", numero: 7, posX: 30, posY: 52 },
      { nom: "Raphinha", prenom: "", poste: "FWD", numero: 11, posX: 80, posY: 28 },
      { nom: "Vinícius Jr.", prenom: "", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Savinho", prenom: "", poste: "FWD", numero: 18, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 9, // Vinícius Jr.
  },
  {
    pays: "Angleterre",
    drapeau: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    formation: "4-3-3",
    joueurs: [
      { nom: "Pickford", prenom: "Jordan", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Alexander-Arnold", prenom: "Trent", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Stones", prenom: "John", poste: "DEF", numero: 5, posX: 62, posY: 75 },
      { nom: "Guehi", prenom: "Marc", poste: "DEF", numero: 6, posX: 38, posY: 75 },
      { nom: "Shaw", prenom: "Luke", poste: "DEF", numero: 3, posX: 15, posY: 72 },
      { nom: "Rice", prenom: "Declan", poste: "MID", numero: 4, posX: 70, posY: 52 },
      { nom: "Bellingham", prenom: "Jude", poste: "MID", numero: 10, posX: 50, posY: 55 },
      { nom: "Foden", prenom: "Phil", poste: "MID", numero: 11, posX: 30, posY: 52 },
      { nom: "Saka", prenom: "Bukayo", poste: "FWD", numero: 7, posX: 80, posY: 28 },
      { nom: "Kane", prenom: "Harry", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Palmer", prenom: "Cole", poste: "FWD", numero: 20, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 6, // Bellingham
  },
  {
    pays: "Espagne",
    drapeau: "🇪🇸",
    formation: "4-3-3",
    joueurs: [
      { nom: "Unai Simón", prenom: "", poste: "GK", numero: 23, posX: 50, posY: 90 },
      { nom: "Carvajal", prenom: "Dani", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Le Normand", prenom: "Robin", poste: "DEF", numero: 3, posX: 62, posY: 75 },
      { nom: "Laporte", prenom: "Aymeric", poste: "DEF", numero: 14, posX: 38, posY: 75 },
      { nom: "Cucurella", prenom: "Marc", poste: "DEF", numero: 24, posX: 15, posY: 72 },
      { nom: "Rodri", prenom: "", poste: "MID", numero: 16, posX: 70, posY: 52 },
      { nom: "Pedri", prenom: "", poste: "MID", numero: 8, posX: 50, posY: 55 },
      { nom: "Olmo", prenom: "Dani", poste: "MID", numero: 10, posX: 30, posY: 52 },
      { nom: "Yamal", prenom: "Lamine", poste: "FWD", numero: 19, posX: 80, posY: 28 },
      { nom: "Morata", prenom: "Álvaro", poste: "FWD", numero: 7, posX: 50, posY: 22 },
      { nom: "Nico Williams", prenom: "", poste: "FWD", numero: 17, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 8, // Yamal
  },
  {
    pays: "Portugal",
    drapeau: "🇵🇹",
    formation: "4-3-3",
    joueurs: [
      { nom: "D. Costa", prenom: "Diogo", poste: "GK", numero: 22, posX: 50, posY: 90 },
      { nom: "Cancelo", prenom: "João", poste: "DEF", numero: 20, posX: 85, posY: 72 },
      { nom: "R. Dias", prenom: "Rúben", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Inácio", prenom: "Gonçalo", poste: "DEF", numero: 14, posX: 38, posY: 75 },
      { nom: "N. Mendes", prenom: "Nuno", poste: "DEF", numero: 19, posX: 15, posY: 72 },
      { nom: "Vitinha", prenom: "Vítor", poste: "MID", numero: 23, posX: 70, posY: 52 },
      { nom: "Palhinha", prenom: "João", poste: "MID", numero: 6, posX: 50, posY: 55 },
      { nom: "B. Fernandes", prenom: "Bruno", poste: "MID", numero: 8, posX: 30, posY: 52 },
      { nom: "B. Silva", prenom: "Bernardo", poste: "FWD", numero: 10, posX: 80, posY: 28 },
      { nom: "Ronaldo", prenom: "Cristiano", poste: "FWD", numero: 7, posX: 50, posY: 22 },
      { nom: "R. Leão", prenom: "Rafael", poste: "FWD", numero: 17, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 9, // Ronaldo
  },
  {
    pays: "Allemagne",
    drapeau: "🇩🇪",
    formation: "4-2-3-1",
    joueurs: [
      { nom: "ter Stegen", prenom: "Marc-André", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Kimmich", prenom: "Joshua", poste: "DEF", numero: 6, posX: 85, posY: 72 },
      { nom: "Tah", prenom: "Jonathan", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Rüdiger", prenom: "Antonio", poste: "DEF", numero: 2, posX: 38, posY: 75 },
      { nom: "Schlotterbeck", prenom: "Nico", poste: "DEF", numero: 15, posX: 15, posY: 72 },
      { nom: "Pavlović", prenom: "Aleksandar", poste: "MID", numero: 23, posX: 62, posY: 55 },
      { nom: "Andrich", prenom: "Robert", poste: "MID", numero: 21, posX: 38, posY: 55 },
      { nom: "Sané", prenom: "Leroy", poste: "FWD", numero: 19, posX: 80, posY: 35 },
      { nom: "Musiala", prenom: "Jamal", poste: "FWD", numero: 10, posX: 50, posY: 38 },
      { nom: "Wirtz", prenom: "Florian", poste: "FWD", numero: 17, posX: 20, posY: 35 },
      { nom: "Havertz", prenom: "Kai", poste: "FWD", numero: 7, posX: 50, posY: 22 },
    ],
    joueurManquantIndex: 8, // Musiala
  },
  {
    pays: "Maroc",
    drapeau: "🇲🇦",
    formation: "4-3-3",
    joueurs: [
      { nom: "Bounou", prenom: "Yassine", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Hakimi", prenom: "Achraf", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Aguerd", prenom: "Nayef", poste: "DEF", numero: 5, posX: 62, posY: 75 },
      { nom: "Saïss", prenom: "Romain", poste: "DEF", numero: 6, posX: 38, posY: 75 },
      { nom: "Mazraoui", prenom: "Noussair", poste: "DEF", numero: 3, posX: 15, posY: 72 },
      { nom: "Amrabat", prenom: "Sofyan", poste: "MID", numero: 4, posX: 70, posY: 52 },
      { nom: "Ounahi", prenom: "Azzedine", poste: "MID", numero: 8, posX: 50, posY: 55 },
      { nom: "Ziyech", prenom: "Hakim", poste: "MID", numero: 7, posX: 30, posY: 52 },
      { nom: "Diaz", prenom: "Brahim", poste: "FWD", numero: 11, posX: 80, posY: 28 },
      { nom: "En-Nesyri", prenom: "Youssef", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Boufal", prenom: "Sofiane", poste: "FWD", numero: 17, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 1, // Hakimi
  },
  {
    pays: "Pays-Bas",
    drapeau: "🇳🇱",
    formation: "4-3-3",
    joueurs: [
      { nom: "Verbruggen", prenom: "Bart", poste: "GK", numero: 13, posX: 50, posY: 90 },
      { nom: "Dumfries", prenom: "Denzel", poste: "DEF", numero: 22, posX: 85, posY: 72 },
      { nom: "De Vrij", prenom: "Stefan", poste: "DEF", numero: 6, posX: 62, posY: 75 },
      { nom: "Van Dijk", prenom: "Virgil", poste: "DEF", numero: 4, posX: 38, posY: 75 },
      { nom: "Aké", prenom: "Nathan", poste: "DEF", numero: 5, posX: 15, posY: 72 },
      { nom: "F. De Jong", prenom: "Frenkie", poste: "MID", numero: 21, posX: 70, posY: 52 },
      { nom: "Reijnders", prenom: "Tijjani", poste: "MID", numero: 14, posX: 50, posY: 55 },
      { nom: "Simons", prenom: "Xavi", poste: "MID", numero: 10, posX: 30, posY: 52 },
      { nom: "Malen", prenom: "Donyell", poste: "FWD", numero: 18, posX: 80, posY: 28 },
      { nom: "Depay", prenom: "Memphis", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Gakpo", prenom: "Cody", poste: "FWD", numero: 11, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 3, // Van Dijk
  },
  {
    pays: "Belgique",
    drapeau: "🇧🇪",
    formation: "4-3-3",
    joueurs: [
      { nom: "Casteels", prenom: "Koen", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Castagne", prenom: "Timothy", poste: "DEF", numero: 21, posX: 85, posY: 72 },
      { nom: "Faes", prenom: "Wout", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Theate", prenom: "Arthur", poste: "DEF", numero: 3, posX: 38, posY: 75 },
      { nom: "Doku", prenom: "Jérémy", poste: "DEF", numero: 7, posX: 15, posY: 72 },
      { nom: "Tielemans", prenom: "Youri", poste: "MID", numero: 8, posX: 70, posY: 52 },
      { nom: "Onana", prenom: "Amadou", poste: "MID", numero: 18, posX: 50, posY: 55 },
      { nom: "De Bruyne", prenom: "Kevin", poste: "MID", numero: 10, posX: 30, posY: 52 },
      { nom: "Trossard", prenom: "Leandro", poste: "FWD", numero: 11, posX: 80, posY: 28 },
      { nom: "Lukaku", prenom: "Romelu", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Openda", prenom: "Loïs", poste: "FWD", numero: 14, posX: 20, posY: 28 },
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
    joueurManquantIndex: Math.floor(Math.random() * team.joueurs.length)
  }));
}
