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
    formation: "4-3-3",
    joueurs: [
      { nom: "Maignan", club: "AC Milan", poste: "GK", posX: 50, posY: 90 },
      { nom: "Gusto", club: "Chelsea", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Upamecano", club: "Bayern Munich", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Saliba", club: "Arsenal", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Hernández", club: "Al-Hilal", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Tchouaméni", club: "Real Madrid", poste: "MID", posX: 70, posY: 52 },
      { nom: "Camavinga", club: "Real Madrid", poste: "MID", posX: 50, posY: 55 },
      { nom: "Rabiot", club: "AC Milan", poste: "MID", posX: 30, posY: 52 },
      { nom: "Dembélé", club: "Paris Saint-Germain", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Mbappé", club: "Real Madrid", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Olise", club: "Bayern Munich", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Argentine",
    drapeau: "🇦🇷",
    formation: "4-3-3",
    joueurs: [
      { nom: "Martínez", club: "Aston Villa", poste: "GK", posX: 50, posY: 90 },
      { nom: "Molina", club: "Atlético Madrid", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Romero", club: "Tottenham Hotspur", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Otamendi", club: "Benfica", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Tagliafico", club: "Olympique Lyonnais", poste: "DEF", posX: 15, posY: 72 },
      { nom: "De Paul", club: "Inter Miami", poste: "MID", posX: 70, posY: 52 },
      { nom: "Fernández", club: "Chelsea", poste: "MID", posX: 50, posY: 55 },
      { nom: "Mac Allister", club: "Liverpool", poste: "MID", posX: 30, posY: 52 },
      { nom: "Messi", club: "Inter Miami", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Álvarez", club: "Atlético Madrid", poste: "FWD", posX: 50, posY: 22 },
      { nom: "L. Martínez", club: "Inter Milan", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Brésil",
    drapeau: "🇧🇷",
    formation: "4-3-3",
    joueurs: [
      { nom: "Alisson", club: "Liverpool", poste: "GK", posX: 50, posY: 90 },
      { nom: "Wesley", club: "AS Roma", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Marquinhos", club: "Paris Saint-Germain", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Magalhães", club: "Arsenal", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Henrique", club: "AS Monaco", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Casemiro", club: "Manchester United", poste: "MID", posX: 70, posY: 52 },
      { nom: "Guimarães", club: "Newcastle United", poste: "MID", posX: 50, posY: 55 },
      { nom: "Raphinha", club: "FC Barcelone", poste: "MID", posX: 30, posY: 52 },
      { nom: "João Pedro", club: "Chelsea", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Vinícius Jr.", club: "Real Madrid", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Endrick", club: "Olympique Lyonnais", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Angleterre",
    drapeau: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    formation: "4-2-4",
    joueurs: [
      { nom: "Pickford", club: "Everton", poste: "GK", posX: 50, posY: 90 },
      { nom: "James", club: "Chelsea", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Stones", club: "Manchester City", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Guéhi", club: "Manchester City", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Burn", club: "Newcastle United", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Rice", club: "Arsenal", poste: "MID", posX: 65, posY: 55 },
      { nom: "Wharton", club: "Crystal Palace", poste: "MID", posX: 35, posY: 55 },
      { nom: "Saka", club: "Arsenal", poste: "FWD", posX: 85, posY: 25 },
      { nom: "Bellingham", club: "Real Madrid", poste: "FWD", posX: 60, posY: 22 },
      { nom: "Gordon", club: "Newcastle United", poste: "FWD", posX: 40, posY: 22 },
      { nom: "Kane", club: "Bayern Munich", poste: "FWD", posX: 15, posY: 25 },
    ],
  },
  {
    pays: "Espagne",
    drapeau: "🇪🇸",
    formation: "4-3-3",
    joueurs: [
      { nom: "Raya", club: "Arsenal", poste: "GK", posX: 50, posY: 90 },
      { nom: "Porro", club: "Tottenham Hotspur", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Cubarsí", club: "FC Barcelone", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Laporte", club: "Athletic Bilbao", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Cucurella", club: "Chelsea", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Rodri", club: "Manchester City", poste: "MID", posX: 70, posY: 52 },
      { nom: "Zubimendi", club: "Arsenal", poste: "MID", posX: 50, posY: 55 },
      { nom: "Pedri", club: "FC Barcelone", poste: "MID", posX: 30, posY: 52 },
      { nom: "Yamal", club: "FC Barcelone", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Olmo", club: "FC Barcelone", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Nico Williams", club: "Athletic Bilbao", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Portugal",
    drapeau: "🇵🇹",
    formation: "4-3-3",
    joueurs: [
      { nom: "Costa", club: "FC Porto", poste: "GK", posX: 50, posY: 90 },
      { nom: "Dalot", club: "Manchester United", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Dias", club: "Manchester City", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Inácio", club: "Sporting CP", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Mendes", club: "Paris Saint-Germain", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Palhinha", club: "Tottenham Hotspur", poste: "MID", posX: 70, posY: 52 },
      { nom: "Vitinha", club: "Paris Saint-Germain", poste: "MID", posX: 50, posY: 55 },
      { nom: "Fernandes", club: "Manchester United", poste: "MID", posX: 30, posY: 52 },
      { nom: "Silva", club: "Manchester City", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Leão", club: "AC Milan", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Ronaldo", club: "Al-Nassr", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Allemagne",
    drapeau: "🇩🇪",
    formation: "4-3-3",
    joueurs: [
      { nom: "ter Stegen", club: "Girona FC", poste: "GK", posX: 50, posY: 90 },
      { nom: "Kimmich", club: "Bayern Munich", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Tah", club: "Bayern Munich", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Rüdiger", club: "Real Madrid", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Raum", club: "RB Leipzig", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Andrich", club: "Bayer Leverkusen", poste: "MID", posX: 70, posY: 52 },
      { nom: "Wirtz", club: "Liverpool", poste: "MID", posX: 50, posY: 55 },
      { nom: "Musiala", club: "Bayern Munich", poste: "MID", posX: 30, posY: 52 },
      { nom: "Sané", club: "Galatasaray", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Havertz", club: "Arsenal", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Undav", club: "VfB Stuttgart", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Pays-Bas",
    drapeau: "🇳🇱",
    formation: "4-4-2",
    joueurs: [
      { nom: "Flekken", club: "Brentford", poste: "GK", posX: 50, posY: 90 },
      { nom: "Dumfries", club: "Inter Milan", poste: "DEF", posX: 85, posY: 72 },
      { nom: "de Vrij", club: "Inter Milan", poste: "DEF", posX: 62, posY: 75 },
      { nom: "van Dijk", club: "Liverpool", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Aké", club: "Manchester City", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Schouten", club: "PSV Eindhoven", poste: "MID", posX: 80, posY: 50 },
      { nom: "Reijnders", club: "Manchester City", poste: "MID", posX: 60, posY: 55 },
      { nom: "de Jong", club: "FC Barcelone", poste: "MID", posX: 40, posY: 55 },
      { nom: "Simons", club: "Tottenham Hotspur", poste: "MID", posX: 20, posY: 50 },
      { nom: "Gakpo", club: "Liverpool", poste: "FWD", posX: 60, posY: 25 },
      { nom: "Depay", club: "Corinthians", poste: "FWD", posX: 40, posY: 25 },
    ],
  },
  {
    pays: "Belgique",
    drapeau: "🇧🇪",
    formation: "4-3-3",
    joueurs: [
      { nom: "Sels", club: "Nottingham Forest", poste: "GK", posX: 50, posY: 90 },
      { nom: "Castagne", club: "Fulham", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Faes", club: "AS Monaco", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Theate", club: "Eintracht Frankfurt", poste: "DEF", posX: 38, posY: 75 },
      { nom: "De Cuyper", club: "Brighton & Hove Albion", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Witsel", club: "Girona FC", poste: "MID", posX: 70, posY: 52 },
      { nom: "Tielemans", club: "Aston Villa", poste: "MID", posX: 50, posY: 55 },
      { nom: "Vanaken", club: "Club Brugge", poste: "MID", posX: 30, posY: 52 },
      { nom: "Doku", club: "Manchester City", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Openda", club: "Juventus", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Trossard", club: "Arsenal", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Maroc",
    drapeau: "🇲🇦",
    formation: "4-3-3",
    joueurs: [
      { nom: "Bounou", club: "Al-Hilal", poste: "GK", posX: 50, posY: 90 },
      { nom: "Hakimi", club: "Paris Saint-Germain", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Aguerd", club: "Real Sociedad", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Diop", club: "OGC Nice", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Mazraoui", club: "Manchester United", poste: "DEF", posX: 15, posY: 72 },
      { nom: "El Aynaoui", club: "RC Lens", poste: "MID", posX: 70, posY: 52 },
      { nom: "Saibari", club: "PSV Eindhoven", poste: "MID", posX: 50, posY: 55 },
      { nom: "El Khannouss", club: "Leicester City", poste: "MID", posX: 30, posY: 52 },
      { nom: "Diaz", club: "Real Madrid", poste: "FWD", posX: 80, posY: 28 },
      { nom: "El Kaabi", club: "Olympiacos", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Ezzalzouli", club: "Real Betis", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "États-Unis",
    drapeau: "🇺🇸",
    formation: "4-3-3",
    joueurs: [
      { nom: "Freese", club: "New York City FC", poste: "GK", posX: 50, posY: 90 },
      { nom: "Scally", club: "Borussia Mönchengladbach", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Richards", club: "Crystal Palace", poste: "DEF", posX: 62, posY: 75 },
      { nom: "M. Robinson", club: "FC Cincinnati", poste: "DEF", posX: 38, posY: 75 },
      { nom: "A. Robinson", club: "Fulham", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Adams", club: "AFC Bournemouth", poste: "MID", posX: 70, posY: 52 },
      { nom: "McKennie", club: "Juventus", poste: "MID", posX: 50, posY: 55 },
      { nom: "Tillman", club: "PSV Eindhoven", poste: "MID", posX: 30, posY: 52 },
      { nom: "Weah", club: "Olympique de Marseille", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Pulisic", club: "AC Milan", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Balogun", club: "AS Monaco", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Japon",
    drapeau: "🇯🇵",
    formation: "4-3-3",
    joueurs: [
      { nom: "Suzuki", club: "Parma Calcio", poste: "GK", posX: 50, posY: 90 },
      { nom: "Sugawara", club: "Werder Bremen", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Itakura", club: "Borussia Mönchengladbach", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Ito", club: "Bayern Munich", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Hashioka", club: "Slavia Prague", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Endo", club: "Liverpool", poste: "MID", posX: 70, posY: 52 },
      { nom: "Morita", club: "Sporting CP", poste: "MID", posX: 50, posY: 55 },
      { nom: "Kamada", club: "Crystal Palace", poste: "MID", posX: 30, posY: 52 },
      { nom: "Kubo", club: "Real Sociedad", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Ueda", club: "Feyenoord", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Mitoma", club: "Brighton & Hove Albion", poste: "FWD", posX: 20, posY: 28 },
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