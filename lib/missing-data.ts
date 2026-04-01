/**
 * FootQuest - The Missing Piece game data
 * Club team formations with one player removed for guessing.
 */

export interface MissingPieceTeamData {
  nom: string;
  pays: string;
  formation: string; // e.g. "4-3-3"
  joueurs: {
    nom: string;
    prenom: string;
    poste: "GK" | "DEF" | "MID" | "FWD";
    numero: number;
    /** Position on pitch (percentage x, y) */
    posX: number;
    posY: number;
  }[];
  /** Index of the player to hide (0-based) */
  joueurManquantIndex: number;
}

export const MISSING_PIECE_TEAMS: MissingPieceTeamData[] = [
  {
    nom: "Real Madrid",
    pays: "Espagne",
    formation: "4-3-3",
    joueurs: [
      { nom: "Courtois", prenom: "Thibaut", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Carvajal", prenom: "Dani", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Rüdiger", prenom: "Antonio", poste: "DEF", numero: 22, posX: 62, posY: 75 },
      { nom: "Alaba", prenom: "David", poste: "DEF", numero: 4, posX: 38, posY: 75 },
      { nom: "Mendy", prenom: "Ferland", poste: "DEF", numero: 23, posX: 15, posY: 72 },
      { nom: "Valverde", prenom: "Federico", poste: "MID", numero: 15, posX: 70, posY: 52 },
      { nom: "Tchouaméni", prenom: "Aurélien", poste: "MID", numero: 18, posX: 50, posY: 55 },
      { nom: "Bellingham", prenom: "Jude", poste: "MID", numero: 5, posX: 30, posY: 52 },
      { nom: "Rodrygo", prenom: "", poste: "FWD", numero: 11, posX: 80, posY: 28 },
      { nom: "Mbappé", prenom: "Kylian", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Vinícius Jr.", prenom: "", poste: "FWD", numero: 7, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 9, // Mbappé
  },
  {
    nom: "FC Barcelone",
    pays: "Espagne",
    formation: "4-3-3",
    joueurs: [
      { nom: "Ter Stegen", prenom: "Marc-André", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Koundé", prenom: "Jules", poste: "DEF", numero: 23, posX: 85, posY: 72 },
      { nom: "Araújo", prenom: "Ronald", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Cubarsí", prenom: "Pau", poste: "DEF", numero: 2, posX: 38, posY: 75 },
      { nom: "Baldé", prenom: "Alejandro", poste: "DEF", numero: 3, posX: 15, posY: 72 },
      { nom: "Pedri", prenom: "", poste: "MID", numero: 8, posX: 70, posY: 52 },
      { nom: "De Jong", prenom: "Frenkie", poste: "MID", numero: 21, posX: 50, posY: 55 },
      { nom: "Gavi", prenom: "", poste: "MID", numero: 6, posX: 30, posY: 52 },
      { nom: "Raphinha", prenom: "", poste: "FWD", numero: 11, posX: 80, posY: 28 },
      { nom: "Lewandowski", prenom: "Robert", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Yamal", prenom: "Lamine", poste: "FWD", numero: 19, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 10, // Yamal
  },
  {
    nom: "Manchester City",
    pays: "Angleterre",
    formation: "4-3-3",
    joueurs: [
      { nom: "Ederson", prenom: "", poste: "GK", numero: 31, posX: 50, posY: 90 },
      { nom: "Walker", prenom: "Kyle", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Dias", prenom: "Rúben", poste: "DEF", numero: 3, posX: 62, posY: 75 },
      { nom: "Akanji", prenom: "Manuel", poste: "DEF", numero: 25, posX: 38, posY: 75 },
      { nom: "Gvardiol", prenom: "Joško", poste: "DEF", numero: 24, posX: 15, posY: 72 },
      { nom: "De Bruyne", prenom: "Kevin", poste: "MID", numero: 17, posX: 70, posY: 52 },
      { nom: "Rodri", prenom: "", poste: "MID", numero: 16, posX: 50, posY: 55 },
      { nom: "Bernardo Silva", prenom: "", poste: "MID", numero: 20, posX: 30, posY: 52 },
      { nom: "Foden", prenom: "Phil", poste: "FWD", numero: 47, posX: 80, posY: 28 },
      { nom: "Haaland", prenom: "Erling", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Grealish", prenom: "Jack", poste: "FWD", numero: 10, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 5, // De Bruyne
  },
  {
    nom: "PSG",
    pays: "France",
    formation: "4-3-3",
    joueurs: [
      { nom: "Donnarumma", prenom: "Gianluigi", poste: "GK", numero: 99, posX: 50, posY: 90 },
      { nom: "Hakimi", prenom: "Achraf", poste: "DEF", numero: 2, posX: 85, posY: 72 },
      { nom: "Marquinhos", prenom: "", poste: "DEF", numero: 5, posX: 62, posY: 75 },
      { nom: "Skriniar", prenom: "Milan", poste: "DEF", numero: 37, posX: 38, posY: 75 },
      { nom: "Hernández", prenom: "Lucas", poste: "DEF", numero: 21, posX: 15, posY: 72 },
      { nom: "Vitinha", prenom: "", poste: "MID", numero: 17, posX: 70, posY: 52 },
      { nom: "Zaïre-Emery", prenom: "Warren", poste: "MID", numero: 33, posX: 50, posY: 55 },
      { nom: "Ruiz", prenom: "Fabián", poste: "MID", numero: 8, posX: 30, posY: 52 },
      { nom: "Dembélé", prenom: "Ousmane", poste: "FWD", numero: 10, posX: 80, posY: 28 },
      { nom: "Kolo Muani", prenom: "Randal", poste: "FWD", numero: 23, posX: 50, posY: 22 },
      { nom: "Barcola", prenom: "Bradley", poste: "FWD", numero: 29, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 8, // Dembélé
  },
  {
    nom: "Liverpool",
    pays: "Angleterre",
    formation: "4-3-3",
    joueurs: [
      { nom: "Alisson", prenom: "", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Alexander-Arnold", prenom: "Trent", poste: "DEF", numero: 66, posX: 85, posY: 72 },
      { nom: "Van Dijk", prenom: "Virgil", poste: "DEF", numero: 4, posX: 62, posY: 75 },
      { nom: "Konaté", prenom: "Ibrahima", poste: "DEF", numero: 5, posX: 38, posY: 75 },
      { nom: "Robertson", prenom: "Andrew", poste: "DEF", numero: 26, posX: 15, posY: 72 },
      { nom: "Szoboszlai", prenom: "Dominik", poste: "MID", numero: 8, posX: 70, posY: 52 },
      { nom: "Mac Allister", prenom: "Alexis", poste: "MID", numero: 10, posX: 50, posY: 55 },
      { nom: "Gravenberch", prenom: "Ryan", poste: "MID", numero: 38, posX: 30, posY: 52 },
      { nom: "Salah", prenom: "Mohamed", poste: "FWD", numero: 11, posX: 80, posY: 28 },
      { nom: "Núñez", prenom: "Darwin", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Díaz", prenom: "Luis", poste: "FWD", numero: 7, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 8, // Salah
  },
  {
    nom: "Bayern Munich",
    pays: "Allemagne",
    formation: "4-2-3-1",
    joueurs: [
      { nom: "Neuer", prenom: "Manuel", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Kimmich", prenom: "Joshua", poste: "DEF", numero: 6, posX: 85, posY: 72 },
      { nom: "Upamecano", prenom: "Dayot", poste: "DEF", numero: 2, posX: 62, posY: 75 },
      { nom: "Kim", prenom: "Min-Jae", poste: "DEF", numero: 3, posX: 38, posY: 75 },
      { nom: "Davies", prenom: "Alphonso", poste: "DEF", numero: 19, posX: 15, posY: 72 },
      { nom: "Goretzka", prenom: "Leon", poste: "MID", numero: 8, posX: 62, posY: 55 },
      { nom: "Müller", prenom: "Thomas", poste: "MID", numero: 25, posX: 38, posY: 55 },
      { nom: "Sané", prenom: "Leroy", poste: "FWD", numero: 10, posX: 80, posY: 35 },
      { nom: "Musiala", prenom: "Jamal", poste: "FWD", numero: 42, posX: 50, posY: 38 },
      { nom: "Coman", prenom: "Kingsley", poste: "FWD", numero: 11, posX: 20, posY: 35 },
      { nom: "Kane", prenom: "Harry", poste: "FWD", numero: 9, posX: 50, posY: 22 },
    ],
    joueurManquantIndex: 10, // Kane
  },
  {
    nom: "Arsenal",
    pays: "Angleterre",
    formation: "4-3-3",
    joueurs: [
      { nom: "Raya", prenom: "David", poste: "GK", numero: 22, posX: 50, posY: 90 },
      { nom: "White", prenom: "Ben", poste: "DEF", numero: 4, posX: 85, posY: 72 },
      { nom: "Saliba", prenom: "William", poste: "DEF", numero: 2, posX: 62, posY: 75 },
      { nom: "Gabriel", prenom: "", poste: "DEF", numero: 6, posX: 38, posY: 75 },
      { nom: "Zinchenko", prenom: "Oleksandr", poste: "DEF", numero: 35, posX: 15, posY: 72 },
      { nom: "Ødegaard", prenom: "Martin", poste: "MID", numero: 8, posX: 70, posY: 52 },
      { nom: "Rice", prenom: "Declan", poste: "MID", numero: 41, posX: 50, posY: 55 },
      { nom: "Havertz", prenom: "Kai", poste: "MID", numero: 29, posX: 30, posY: 52 },
      { nom: "Saka", prenom: "Bukayo", poste: "FWD", numero: 7, posX: 80, posY: 28 },
      { nom: "Jesus", prenom: "Gabriel", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Martinelli", prenom: "Gabriel", poste: "FWD", numero: 11, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 8, // Saka
  },
  {
    nom: "Juventus",
    pays: "Italie",
    formation: "4-3-3",
    joueurs: [
      { nom: "Szczesny", prenom: "Wojciech", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Danilo", prenom: "", poste: "DEF", numero: 6, posX: 85, posY: 72 },
      { nom: "Bremer", prenom: "", poste: "DEF", numero: 3, posX: 62, posY: 75 },
      { nom: "Gatti", prenom: "Federico", poste: "DEF", numero: 4, posX: 38, posY: 75 },
      { nom: "Cambiaso", prenom: "Andrea", poste: "DEF", numero: 27, posX: 15, posY: 72 },
      { nom: "Locatelli", prenom: "Manuel", poste: "MID", numero: 5, posX: 70, posY: 52 },
      { nom: "Rabiot", prenom: "Adrien", poste: "MID", numero: 25, posX: 50, posY: 55 },
      { nom: "McKennie", prenom: "Weston", poste: "MID", numero: 8, posX: 30, posY: 52 },
      { nom: "Chiesa", prenom: "Federico", poste: "FWD", numero: 7, posX: 80, posY: 28 },
      { nom: "Vlahović", prenom: "Dušan", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Yıldız", prenom: "Kenan", poste: "FWD", numero: 10, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 9, // Vlahović
  },
  {
    nom: "Napoli",
    pays: "Italie",
    formation: "4-3-3",
    joueurs: [
      { nom: "Meret", prenom: "Alex", poste: "GK", numero: 1, posX: 50, posY: 90 },
      { nom: "Di Lorenzo", prenom: "Giovanni", poste: "DEF", numero: 22, posX: 85, posY: 72 },
      { nom: "Rrahmani", prenom: "Amir", poste: "DEF", numero: 13, posX: 62, posY: 75 },
      { nom: "Juan Jesus", prenom: "", poste: "DEF", numero: 5, posX: 38, posY: 75 },
      { nom: "Olivera", prenom: "Mathías", poste: "DEF", numero: 17, posX: 15, posY: 72 },
      { nom: "Anguissa", prenom: "Zambo", poste: "MID", numero: 99, posX: 70, posY: 52 },
      { nom: "Lobotka", prenom: "Stanislav", poste: "MID", numero: 68, posX: 50, posY: 55 },
      { nom: "Zieliński", prenom: "Piotr", poste: "MID", numero: 20, posX: 30, posY: 52 },
      { nom: "Politano", prenom: "Matteo", poste: "FWD", numero: 21, posX: 80, posY: 28 },
      { nom: "Osimhen", prenom: "Victor", poste: "FWD", numero: 9, posX: 50, posY: 22 },
      { nom: "Kvaratskhelia", prenom: "Khvicha", poste: "FWD", numero: 77, posX: 20, posY: 28 },
    ],
    joueurManquantIndex: 10, // Kvaratskhelia
  },
  {
    nom: "Atlético Madrid",
    pays: "Espagne",
    formation: "4-4-2",
    joueurs: [
      { nom: "Oblak", prenom: "Jan", poste: "GK", numero: 13, posX: 50, posY: 90 },
      { nom: "Molina", prenom: "Nahuel", poste: "DEF", numero: 16, posX: 85, posY: 72 },
      { nom: "Giménez", prenom: "José", poste: "DEF", numero: 2, posX: 62, posY: 75 },
      { nom: "Witsel", prenom: "Axel", poste: "DEF", numero: 20, posX: 38, posY: 75 },
      { nom: "Hermoso", prenom: "Mario", poste: "DEF", numero: 22, posX: 15, posY: 72 },
      { nom: "Llorente", prenom: "Marcos", poste: "MID", numero: 14, posX: 80, posY: 52 },
      { nom: "Koke", prenom: "", poste: "MID", numero: 6, posX: 60, posY: 55 },
      { nom: "De Paul", prenom: "Rodrigo", poste: "MID", numero: 5, posX: 40, posY: 55 },
      { nom: "Carrasco", prenom: "Yannick", poste: "MID", numero: 21, posX: 20, posY: 52 },
      { nom: "Griezmann", prenom: "Antoine", poste: "FWD", numero: 7, posX: 60, posY: 25 },
      { nom: "Morata", prenom: "Álvaro", poste: "FWD", numero: 19, posX: 40, posY: 25 },
    ],
    joueurManquantIndex: 9, // Griezmann
  },
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

/**
 * Get random Missing Piece levels.
 */
export function getRandomMissingPieceLevels(count: number): MissingPieceTeamData[] {
  return [...MISSING_PIECE_TEAMS].sort(() => Math.random() - 0.5).slice(0, count);
}
