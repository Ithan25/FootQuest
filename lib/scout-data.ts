/**
 * FootQuest - Scout Master game data (CDM 2026 Edition)
 *
 * Concept : On affiche les LOGOS/NOMS des CLUBS des joueurs sur un terrain.
 * Le joueur doit deviner quelle ÉQUIPE NATIONALE c'est.
 *
 * 48 équipes qualifiées pour la CDM 2026
 */
import { EXTRA_TEAMS } from "./scout-data-extra";
import type { Difficulty } from "./constants";

export interface ScoutPlayer {
  nom: string;
  club: string;
  poste: "GK" | "DEF" | "MID" | "FWD";
  posX: number;
  posY: number;
}

export interface ScoutTeamData {
  pays: string;
  drapeau: string;
  formation: string;
  joueurs: ScoutPlayer[];
  difficulty?: Difficulty;
}

export const SCOUT_TEAMS: ScoutTeamData[] = [
  {
    pays: "France",
    drapeau: "🇫🇷",
    formation: "4-2-3-1",
    joueurs: [
      { nom: "Maignan", club: "AC Milan", poste: "GK", posX: 50, posY: 90 },
      { nom: "Koundé", club: "FC Barcelone", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Saliba", club: "Arsenal", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Upamecano", club: "Bayern Munich", poste: "DEF", posX: 38, posY: 75 },
      { nom: "T. Hernández", club: "Al-Hilal", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Tchouaméni", club: "Real Madrid", poste: "MID", posX: 60, posY: 55 },
      { nom: "Rabiot", club: "AC Milan", poste: "MID", posX: 40, posY: 55 },
      { nom: "Olise", club: "Bayern Munich", poste: "FWD", posX: 80, posY: 35 },
      { nom: "Dembélé", club: "Paris Saint-Germain", poste: "FWD", posX: 50, posY: 38 },
      { nom: "Doué", club: "Paris Saint-Germain", poste: "FWD", posX: 20, posY: 35 },
      { nom: "Mbappé", club: "Real Madrid", poste: "FWD", posX: 50, posY: 22 },
    ],
  },
  {
    pays: "Argentine",
    drapeau: "🇦🇷",
    formation: "4-3-3",
    joueurs: [
      { nom: "E. Martínez", club: "Aston Villa", poste: "GK", posX: 50, posY: 90 },
      { nom: "Molina", club: "Atlético Madrid", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Romero", club: "Tottenham Hotspur", poste: "DEF", posX: 62, posY: 75 },
      { nom: "L. Martínez", club: "Manchester United", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Tagliafico", club: "Olympique Lyonnais", poste: "DEF", posX: 15, posY: 72 },
      { nom: "De Paul", club: "Atlético Madrid", poste: "MID", posX: 70, posY: 52 },
      { nom: "E. Fernández", club: "Chelsea", poste: "MID", posX: 50, posY: 55 },
      { nom: "Mac Allister", club: "Liverpool", poste: "MID", posX: 30, posY: 52 },
      { nom: "Messi", club: "Inter Miami", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Álvarez", club: "Atlético Madrid", poste: "FWD", posX: 50, posY: 22 },
      { nom: "N. González", club: "Juventus", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Brésil",
    drapeau: "🇧🇷",
    formation: "4-2-3-1",
    joueurs: [
      { nom: "Alisson", club: "Liverpool", poste: "GK", posX: 50, posY: 90 },
      { nom: "Ibañez", club: "Al-Ahli", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Marquinhos", club: "Paris Saint-Germain", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Magalhães", club: "Arsenal", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Douglas Santos", club: "Zenit St Petersburg", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Casemiro", club: "Manchester United", poste: "MID", posX: 60, posY: 55 },
      { nom: "Guimarães", club: "Newcastle United", poste: "MID", posX: 40, posY: 55 },
      { nom: "Raphinha", club: "FC Barcelone", poste: "FWD", posX: 80, posY: 35 },
      { nom: "Paquetá", club: "Flamengo", poste: "FWD", posX: 50, posY: 38 },
      { nom: "Vinícius Jr.", club: "Real Madrid", poste: "FWD", posX: 20, posY: 35 },
      { nom: "Igor Thiago", club: "Brentford", poste: "FWD", posX: 50, posY: 22 },
    ],
  },
  {
    pays: "Angleterre",
    drapeau: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    formation: "4-2-3-1",
    joueurs: [
      { nom: "Pickford", club: "Everton", poste: "GK", posX: 50, posY: 90 },
      { nom: "James", club: "Chelsea", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Konsa", club: "Aston Villa", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Stones", club: "Manchester City", poste: "DEF", posX: 38, posY: 75 },
      { nom: "O'Reilly", club: "Leeds United", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Rice", club: "Arsenal", poste: "MID", posX: 60, posY: 55 },
      { nom: "Anderson", club: "Newcastle United", poste: "MID", posX: 40, posY: 55 },
      { nom: "Madueke", club: "Chelsea", poste: "FWD", posX: 80, posY: 35 },
      { nom: "Bellingham", club: "Real Madrid", poste: "FWD", posX: 50, posY: 38 },
      { nom: "Gordon", club: "Newcastle United", poste: "FWD", posX: 20, posY: 35 },
      { nom: "Kane", club: "Bayern Munich", poste: "FWD", posX: 50, posY: 22 },
    ],
  },
  {
    pays: "Espagne",
    drapeau: "🇪🇸",
    formation: "4-3-3",
    joueurs: [
      { nom: "Unai Simón", club: "Athletic Club", poste: "GK", posX: 50, posY: 90 },
      { nom: "Porro", club: "Tottenham Hotspur", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Laporte", club: "Athletic Club", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Cubarsí", club: "FC Barcelone", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Cucurella", club: "Chelsea", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Pedri", club: "FC Barcelone", poste: "MID", posX: 70, posY: 52 },
      { nom: "Rodri", club: "Manchester City", poste: "MID", posX: 50, posY: 55 },
      { nom: "Fabián Ruiz", club: "Paris Saint-Germain", poste: "MID", posX: 30, posY: 52 },
      { nom: "Ferran Torres", club: "FC Barcelone", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Dani Olmo", club: "FC Barcelone", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Oyarzabal", club: "Real Sociedad", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Portugal",
    drapeau: "🇵🇹",
    formation: "4-3-3",
    joueurs: [
      { nom: "Diogo Costa", club: "FC Porto", poste: "GK", posX: 50, posY: 90 },
      { nom: "Cancelo", club: "FC Barcelone", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Rúben Dias", club: "Manchester City", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Inácio", club: "Sporting CP", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Nuno Mendes", club: "Paris Saint-Germain", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Vitinha", club: "Paris Saint-Germain", poste: "MID", posX: 70, posY: 52 },
      { nom: "João Neves", club: "Paris Saint-Germain", poste: "MID", posX: 50, posY: 55 },
      { nom: "Bruno Fernandes", club: "Manchester United", poste: "MID", posX: 30, posY: 52 },
      { nom: "Bernardo Silva", club: "Manchester City", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Cristiano Ronaldo", club: "Al Nassr", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Rafael Leão", club: "AC Milan", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Allemagne",
    drapeau: "🇩🇪",
    formation: "4-2-3-1",
    joueurs: [
      { nom: "Neuer", club: "Bayern Munich", poste: "GK", posX: 50, posY: 90 },
      { nom: "Kimmich", club: "Bayern Munich", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Tah", club: "Bayern Munich", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Schlotterbeck", club: "Borussia Dortmund", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Brown", club: "Eintracht Francfort", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Nmecha", club: "Borussia Dortmund", poste: "MID", posX: 60, posY: 55 },
      { nom: "Pavlović", club: "Bayern Munich", poste: "MID", posX: 40, posY: 55 },
      { nom: "Musiala", club: "Bayern Munich", poste: "FWD", posX: 80, posY: 35 },
      { nom: "Wirtz", club: "Bayer Leverkusen", poste: "FWD", posX: 50, posY: 38 },
      { nom: "Sané", club: "Galatasaray", poste: "FWD", posX: 20, posY: 35 },
      { nom: "Havertz", club: "Arsenal", poste: "FWD", posX: 50, posY: 22 },
    ],
  },
  {
    pays: "Pays-Bas",
    drapeau: "🇳🇱",
    formation: "4-3-3",
    joueurs: [
      { nom: "Verbruggen", club: "Brighton & Hove Albion", poste: "GK", posX: 50, posY: 90 },
      { nom: "Dumfries", club: "Inter Milan", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Van Hecke", club: "Brighton & Hove Albion", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Van Dijk", club: "Liverpool", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Van de Ven", club: "Tottenham Hotspur", poste: "DEF", posX: 15, posY: 72 },
      { nom: "De Jong", club: "FC Barcelone", poste: "MID", posX: 70, posY: 52 },
      { nom: "Gravenberch", club: "Liverpool", poste: "MID", posX: 50, posY: 55 },
      { nom: "Reijnders", club: "AC Milan", poste: "MID", posX: 30, posY: 52 },
      { nom: "Summerville", club: "West Ham United", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Gakpo", club: "Liverpool", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Malen", club: "Aston Villa", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Belgique",
    drapeau: "🇧🇪",
    formation: "4-3-3",
    joueurs: [
      { nom: "Courtois", club: "Real Madrid", poste: "GK", posX: 50, posY: 90 },
      { nom: "Castagne", club: "Fulham", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Debast", club: "Sporting CP", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Theate", club: "Rennes", poste: "DEF", posX: 38, posY: 75 },
      { nom: "De Cuyper", club: "Club Brugge", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Tielemans", club: "Aston Villa", poste: "MID", posX: 70, posY: 52 },
      { nom: "Onana", club: "Aston Villa", poste: "MID", posX: 50, posY: 55 },
      { nom: "De Bruyne", club: "Manchester City", poste: "MID", posX: 30, posY: 52 },
      { nom: "Doku", club: "Manchester City", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Lukaku", club: "Napoli", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Fernandez-Pardo", club: "Bayer Leverkusen", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Maroc",
    drapeau: "🇲🇦",
    formation: "4-2-3-1",
    joueurs: [
      { nom: "Bounou", club: "Al-Hilal", poste: "GK", posX: 50, posY: 90 },
      { nom: "Hakimi", club: "Paris Saint-Germain", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Diop", club: "Al-Ittihad", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Chadi Riad", club: "Real Betis", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Mazraoui", club: "Manchester United", poste: "DEF", posX: 15, posY: 72 },
      { nom: "El Aynaoui", club: "Real Sociedad", poste: "MID", posX: 60, posY: 55 },
      { nom: "Bouaddi", club: "Lille", poste: "MID", posX: 40, posY: 55 },
      { nom: "Brahim Díaz", club: "Real Madrid", poste: "FWD", posX: 80, posY: 35 },
      { nom: "Ounahi", club: "Marseille", poste: "FWD", posX: 50, posY: 38 },
      { nom: "El Khannouss", club: "Leicester City", poste: "FWD", posX: 20, posY: 35 },
      { nom: "Saibari", club: "PSV Eindhoven", poste: "FWD", posX: 50, posY: 22 },
    ],
  },
  {
    pays: "États-Unis",
    drapeau: "🇺🇸",
    formation: "4-3-3",
    joueurs: [
      { nom: "Turner", club: "Crystal Palace", poste: "GK", posX: 50, posY: 90 },
      { nom: "Dest", club: "PSV Eindhoven", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Richards", club: "Crystal Palace", poste: "DEF", posX: 62, posY: 75 },
      { nom: "McKenzie", club: "Genk", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Robinson", club: "Fulham", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Adams", club: "Bournemouth", poste: "MID", posX: 70, posY: 52 },
      { nom: "McKennie", club: "Juventus", poste: "MID", posX: 50, posY: 55 },
      { nom: "Reyna", club: "Borussia Dortmund", poste: "MID", posX: 30, posY: 52 },
      { nom: "Weah", club: "Juventus", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Pulisic", club: "AC Milan", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Balogun", club: "Monaco", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Japon",
    drapeau: "🇯🇵",
    formation: "3-4-2-1",
    joueurs: [
      { nom: "Suzuki", club: "Parma Calcio", poste: "GK", posX: 50, posY: 90 },
      { nom: "Watanabe", club: "Porto", poste: "DEF", posX: 75, posY: 75 },
      { nom: "Taniguchi", club: "Leeds United", poste: "DEF", posX: 50, posY: 78 },
      { nom: "Itō", club: "Bayern Munich", poste: "DEF", posX: 25, posY: 75 },
      { nom: "Dōan", club: "Fribourg", poste: "MID", posX: 85, posY: 55 },
      { nom: "Sano", club: "Fribourg", poste: "MID", posX: 60, posY: 58 },
      { nom: "Kamada", club: "Crystal Palace", poste: "MID", posX: 40, posY: 58 },
      { nom: "Nakamura", club: "Reims", poste: "MID", posX: 15, posY: 55 },
      { nom: "Kubo", club: "Real Sociedad", poste: "FWD", posX: 70, posY: 35 },
      { nom: "Maeda", club: "Celtic", poste: "FWD", posX: 30, posY: 35 },
      { nom: "Ueda", club: "Feyenoord", poste: "FWD", posX: 50, posY: 22 },
    ],
  },
];

/** All 48 WC2026 teams */
const ALL_TEAMS = [...SCOUT_TEAMS, ...EXTRA_TEAMS];

/** Teams classified by difficulty (by international fame) */
const EASY_TEAMS = new Set([
  "France", "Argentine", "Brésil", "Angleterre", "Espagne",
  "Portugal", "Allemagne", "Pays-Bas", "Belgique", "Maroc",
  "Croatie", "Uruguay", "États-Unis", "Mexique",
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
 * Get shuffled teams for a game, optionally filtered by difficulty.
 */
export function getRandomScoutTeams(count: number, difficulty?: Difficulty): ScoutTeamData[] {
  let pool = ALL_TEAMS;
  if (difficulty) {
    pool = ALL_TEAMS.filter((t) => getTeamDifficulty(t.pays) === difficulty);
    if (pool.length < count) {
      pool = ALL_TEAMS;
    }
  }
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count).map(t => ({
    ...t,
    difficulty: getTeamDifficulty(t.pays)
  }));
}

/**
 * Get all country names for autocomplete.
 */
export function getAllTeamNames(): string[] {
  return ALL_TEAMS.map((t) => t.pays);
}