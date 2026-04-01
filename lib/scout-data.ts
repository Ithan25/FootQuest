/**
 * FootQuest - Scout Master game data (CDM 2026 Edition)
 *
 * Concept : On affiche les LOGOS/NOMS des CLUBS des joueurs sur un terrain.
 * Le joueur doit deviner quelle ÉQUIPE NATIONALE c'est.
 *
 * 48 équipes qualifiées pour la CDM 2026
 */
import { EXTRA_TEAMS } from "./scout-data-extra";

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
}

export const SCOUT_TEAMS: ScoutTeamData[] = [
  {
    pays: "France",
    drapeau: "🇫🇷",
    formation: "4-3-3",
    joueurs: [
      { nom: "Maignan", club: "AC Milan", poste: "GK", posX: 50, posY: 90 },
      { nom: "Koundé", club: "FC Barcelone", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Upamecano", club: "Bayern Munich", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Saliba", club: "Arsenal", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Hernández", club: "PSG", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Tchouaméni", club: "Real Madrid", poste: "MID", posX: 70, posY: 52 },
      { nom: "Kanté", club: "Al-Ittihad", poste: "MID", posX: 50, posY: 55 },
      { nom: "Griezmann", club: "Atlético Madrid", poste: "MID", posX: 30, posY: 52 },
      { nom: "Dembélé", club: "PSG", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Mbappé", club: "Real Madrid", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Barcola", club: "PSG", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Argentine",
    drapeau: "🇦🇷",
    formation: "4-3-3",
    joueurs: [
      { nom: "E. Martínez", club: "Aston Villa", poste: "GK", posX: 50, posY: 90 },
      { nom: "Molina", club: "Atlético Madrid", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Romero", club: "Tottenham", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Otamendi", club: "Benfica", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Acuña", club: "Séville FC", poste: "DEF", posX: 15, posY: 72 },
      { nom: "De Paul", club: "Atlético Madrid", poste: "MID", posX: 70, posY: 52 },
      { nom: "E. Fernández", club: "Chelsea", poste: "MID", posX: 50, posY: 55 },
      { nom: "Mac Allister", club: "Liverpool", poste: "MID", posX: 30, posY: 52 },
      { nom: "Messi", club: "Inter Miami", poste: "FWD", posX: 80, posY: 28 },
      { nom: "J. Álvarez", club: "Atlético Madrid", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Garnacho", club: "Chelsea", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Brésil",
    drapeau: "🇧🇷",
    formation: "4-3-3",
    joueurs: [
      { nom: "Alisson", club: "Liverpool", poste: "GK", posX: 50, posY: 90 },
      { nom: "Danilo", club: "Flamengo", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Marquinhos", club: "PSG", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Gabriel", club: "Arsenal", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Wendell", club: "Porto", poste: "DEF", posX: 15, posY: 72 },
      { nom: "B. Guimarães", club: "Newcastle", poste: "MID", posX: 70, posY: 52 },
      { nom: "Paquetá", club: "West Ham", poste: "MID", posX: 50, posY: 55 },
      { nom: "Rodrygo", club: "Real Madrid", poste: "MID", posX: 30, posY: 52 },
      { nom: "Raphinha", club: "FC Barcelone", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Vinícius Jr.", club: "Real Madrid", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Savinho", club: "Manchester City", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Angleterre",
    drapeau: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    formation: "4-3-3",
    joueurs: [
      { nom: "Pickford", club: "Everton", poste: "GK", posX: 50, posY: 90 },
      { nom: "Alexander-Arnold", club: "Real Madrid", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Stones", club: "Manchester City", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Guehi", club: "Crystal Palace", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Shaw", club: "Manchester United", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Rice", club: "Arsenal", poste: "MID", posX: 70, posY: 52 },
      { nom: "Bellingham", club: "Real Madrid", poste: "MID", posX: 50, posY: 55 },
      { nom: "Foden", club: "Manchester City", poste: "MID", posX: 30, posY: 52 },
      { nom: "Saka", club: "Arsenal", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Kane", club: "Bayern Munich", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Palmer", club: "Chelsea", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Espagne",
    drapeau: "🇪🇸",
    formation: "4-3-3",
    joueurs: [
      { nom: "Unai Simón", club: "Athletic Bilbao", poste: "GK", posX: 50, posY: 90 },
      { nom: "Carvajal", club: "Real Madrid", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Le Normand", club: "Atlético Madrid", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Laporte", club: "Al-Nassr", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Cucurella", club: "Chelsea", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Rodri", club: "Manchester City", poste: "MID", posX: 70, posY: 52 },
      { nom: "Pedri", club: "FC Barcelone", poste: "MID", posX: 50, posY: 55 },
      { nom: "Olmo", club: "FC Barcelone", poste: "MID", posX: 30, posY: 52 },
      { nom: "Yamal", club: "FC Barcelone", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Morata", club: "AC Milan", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Nico Williams", club: "Athletic Bilbao", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Portugal",
    drapeau: "🇵🇹",
    formation: "4-3-3",
    joueurs: [
      { nom: "D. Costa", club: "Wolverhampton", poste: "GK", posX: 50, posY: 90 },
      { nom: "Cancelo", club: "Al-Hilal", poste: "DEF", posX: 85, posY: 72 },
      { nom: "R. Dias", club: "Manchester City", poste: "DEF", posX: 62, posY: 75 },
      { nom: "A. Silva", club: "Juventus", poste: "DEF", posX: 38, posY: 75 },
      { nom: "N. Mendes", club: "PSG", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Vitinha", club: "PSG", poste: "MID", posX: 70, posY: 52 },
      { nom: "B. Silva", club: "Manchester City", poste: "MID", posX: 50, posY: 55 },
      { nom: "B. Fernandes", club: "Manchester United", poste: "MID", posX: 30, posY: 52 },
      { nom: "R. Leão", club: "AC Milan", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Ronaldo", club: "Al-Nassr", poste: "FWD", posX: 50, posY: 22 },
      { nom: "F. Conceição", club: "Juventus", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Allemagne",
    drapeau: "🇩🇪",
    formation: "4-2-3-1",
    joueurs: [
      { nom: "Neuer", club: "Bayern Munich", poste: "GK", posX: 50, posY: 90 },
      { nom: "Kimmich", club: "Bayern Munich", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Tah", club: "Bayer Leverkusen", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Rüdiger", club: "Real Madrid", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Raum", club: "RB Leipzig", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Kroos", club: "Real Madrid", poste: "MID", posX: 62, posY: 55 },
      { nom: "Andrich", club: "Bayer Leverkusen", poste: "MID", posX: 38, posY: 55 },
      { nom: "Sané", club: "Bayern Munich", poste: "FWD", posX: 80, posY: 35 },
      { nom: "Musiala", club: "Bayern Munich", poste: "FWD", posX: 50, posY: 38 },
      { nom: "Wirtz", club: "Bayer Leverkusen", poste: "FWD", posX: 20, posY: 35 },
      { nom: "Havertz", club: "Arsenal", poste: "FWD", posX: 50, posY: 22 },
    ],
  },
  {
    pays: "Pays-Bas",
    drapeau: "🇳🇱",
    formation: "4-3-3",
    joueurs: [
      { nom: "Verbruggen", club: "Brighton", poste: "GK", posX: 50, posY: 90 },
      { nom: "Dumfries", club: "Inter Milan", poste: "DEF", posX: 85, posY: 72 },
      { nom: "De Vrij", club: "Inter Milan", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Van Dijk", club: "Liverpool", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Aké", club: "Manchester City", poste: "DEF", posX: 15, posY: 72 },
      { nom: "F. De Jong", club: "FC Barcelone", poste: "MID", posX: 70, posY: 52 },
      { nom: "Reijnders", club: "AC Milan", poste: "MID", posX: 50, posY: 55 },
      { nom: "Simons", club: "RB Leipzig", poste: "MID", posX: 30, posY: 52 },
      { nom: "Malen", club: "Aston Villa", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Depay", club: "FC Barcelone", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Gakpo", club: "Liverpool", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Belgique",
    drapeau: "🇧🇪",
    formation: "4-3-3",
    joueurs: [
      { nom: "Casteels", club: "Wolfsburg", poste: "GK", posX: 50, posY: 90 },
      { nom: "Castagne", club: "Fulham", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Faes", club: "Leicester", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Theate", club: "Rennes", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Doku", club: "Manchester City", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Tielemans", club: "Aston Villa", poste: "MID", posX: 70, posY: 52 },
      { nom: "Onana", club: "Aston Villa", poste: "MID", posX: 50, posY: 55 },
      { nom: "De Bruyne", club: "Manchester City", poste: "MID", posX: 30, posY: 52 },
      { nom: "Trossard", club: "Arsenal", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Lukaku", club: "Napoli", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Openda", club: "RB Leipzig", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Maroc",
    drapeau: "🇲🇦",
    formation: "4-3-3",
    joueurs: [
      { nom: "Bounou", club: "Al-Hilal", poste: "GK", posX: 50, posY: 90 },
      { nom: "Hakimi", club: "PSG", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Aguerd", club: "Real Sociedad", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Saïss", club: "Shabab Al-Ahli", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Mazraoui", club: "Manchester United", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Amrabat", club: "Fenerbahçe", poste: "MID", posX: 70, posY: 52 },
      { nom: "Ounahi", club: "OM", poste: "MID", posX: 50, posY: 55 },
      { nom: "Ziyech", club: "Galatasaray", poste: "MID", posX: 30, posY: 52 },
      { nom: "Diaz", club: "Real Madrid", poste: "FWD", posX: 80, posY: 28 },
      { nom: "En-Nesyri", club: "Fenerbahçe", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Boufal", club: "Al-Rayyan", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "États-Unis",
    drapeau: "🇺🇸",
    formation: "4-3-3",
    joueurs: [
      { nom: "Turner", club: "Nottingham Forest", poste: "GK", posX: 50, posY: 90 },
      { nom: "Dest", club: "PSV Eindhoven", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Richards", club: "Crystal Palace", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Ream", club: "Charlotte FC", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Robinson", club: "Fulham", poste: "DEF", posX: 15, posY: 72 },
      { nom: "McKennie", club: "Juventus", poste: "MID", posX: 70, posY: 52 },
      { nom: "Adams", club: "Bournemouth", poste: "MID", posX: 50, posY: 55 },
      { nom: "Musah", club: "AC Milan", poste: "MID", posX: 30, posY: 52 },
      { nom: "Weah", club: "Juventus", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Pulisic", club: "AC Milan", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Reyna", club: "Borussia Dortmund", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
  {
    pays: "Japon",
    drapeau: "🇯🇵",
    formation: "4-3-3",
    joueurs: [
      { nom: "Suzuki", club: "Palmeiras", poste: "GK", posX: 50, posY: 90 },
      { nom: "Sugawara", club: "Southampton", poste: "DEF", posX: 85, posY: 72 },
      { nom: "Tomiyasu", club: "Arsenal", poste: "DEF", posX: 62, posY: 75 },
      { nom: "Itakura", club: "B. Mönchengladbach", poste: "DEF", posX: 38, posY: 75 },
      { nom: "Mitoma", club: "Brighton", poste: "DEF", posX: 15, posY: 72 },
      { nom: "Endo", club: "Liverpool", poste: "MID", posX: 70, posY: 52 },
      { nom: "Kamada", club: "Crystal Palace", poste: "MID", posX: 50, posY: 55 },
      { nom: "Kubo", club: "Real Sociedad", poste: "MID", posX: 30, posY: 52 },
      { nom: "Doan", club: "Fribourg", poste: "FWD", posX: 80, posY: 28 },
      { nom: "Ueda", club: "Feyenoord", poste: "FWD", posX: 50, posY: 22 },
      { nom: "Minamino", club: "AS Monaco", poste: "FWD", posX: 20, posY: 28 },
    ],
  },
];

/** All 48 WC2026 teams */
const ALL_TEAMS = [...SCOUT_TEAMS, ...EXTRA_TEAMS];

/**
 * Get shuffled teams for a game.
 */
export function getRandomScoutTeams(count: number): ScoutTeamData[] {
  return [...ALL_TEAMS].sort(() => Math.random() - 0.5).slice(0, count);
}

/**
 * Get all country names for autocomplete.
 */
export function getAllTeamNames(): string[] {
  return ALL_TEAMS.map((t) => t.pays);
}
