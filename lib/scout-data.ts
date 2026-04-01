/**
 * FootQuest - Scout Master game data (Club Teams version)
 * Club teams with their players' nationalities for the guessing game.
 * The challenge: guess the CLUB based on the mix of nationalities revealed one by one.
 */

export interface ScoutTeamData {
  nom: string;
  pays: string;
  ligue: string;
  logoEmoji: string;
  /** Player nationalities — the mix makes it a puzzle! */
  joueurNationalites: string[];
}

export const SCOUT_TEAMS: ScoutTeamData[] = [
  {
    nom: "Real Madrid",
    pays: "Espagne",
    ligue: "La Liga",
    logoEmoji: "⚪",
    joueurNationalites: [
      "Belgique", "France", "Brésil", "Allemagne", "Espagne",
      "Autriche", "Uruguay", "France", "Angleterre", "Turquie", "Espagne",
    ],
  },
  {
    nom: "FC Barcelone",
    pays: "Espagne",
    ligue: "La Liga",
    logoEmoji: "🔵🔴",
    joueurNationalites: [
      "Allemagne", "Espagne", "Espagne", "France", "Brésil",
      "Pologne", "Espagne", "Espagne", "Danemark", "Espagne", "Espagne",
    ],
  },
  {
    nom: "Manchester City",
    pays: "Angleterre",
    ligue: "Premier League",
    logoEmoji: "🩵",
    joueurNationalites: [
      "Brésil", "Angleterre", "Portugal", "Croatie", "Belgique",
      "Norvège", "Angleterre", "Suisse", "Espagne", "Angleterre", "Brésil",
    ],
  },
  {
    nom: "Liverpool",
    pays: "Angleterre",
    ligue: "Premier League",
    logoEmoji: "🔴",
    joueurNationalites: [
      "Brésil", "Angleterre", "Pays-Bas", "Angleterre", "Colombie",
      "Écosse", "Hongrie", "Égypte", "Uruguay", "Angleterre", "Japon",
    ],
  },
  {
    nom: "PSG",
    pays: "France",
    ligue: "Ligue 1",
    logoEmoji: "🔵🔴",
    joueurNationalites: [
      "Italie", "France", "Portugal", "Maroc", "Espagne",
      "France", "France", "Corée du Sud", "France", "Espagne", "France",
    ],
  },
  {
    nom: "Bayern Munich",
    pays: "Allemagne",
    ligue: "Bundesliga",
    logoEmoji: "🔴⚪",
    joueurNationalites: [
      "Allemagne", "Pays-Bas", "Corée du Sud", "Angleterre",
      "France", "Autriche", "Allemagne", "Allemagne", "France", "Croatie", "Allemagne",
    ],
  },
  {
    nom: "Juventus",
    pays: "Italie",
    ligue: "Serie A",
    logoEmoji: "⚫⚪",
    joueurNationalites: [
      "Italie", "Brésil", "Turquie", "Italie", "Colombie",
      "États-Unis", "Pologne", "Argentine", "Serbie", "Italie", "Italie",
    ],
  },
  {
    nom: "AC Milan",
    pays: "Italie",
    ligue: "Serie A",
    logoEmoji: "🔴⚫",
    joueurNationalites: [
      "France", "Angleterre", "Espagne", "Portugal", "Pays-Bas",
      "États-Unis", "Serbie", "Italie", "France", "Allemagne", "Italie",
    ],
  },
  {
    nom: "Inter Milan",
    pays: "Italie",
    ligue: "Serie A",
    logoEmoji: "🔵⚫",
    joueurNationalites: [
      "Cameroun", "France", "Argentine", "Italie", "Turquie",
      "Italie", "Pays-Bas", "Argentine", "Iran", "Italie", "Italie",
    ],
  },
  {
    nom: "Arsenal",
    pays: "Angleterre",
    ligue: "Premier League",
    logoEmoji: "🔴⚪",
    joueurNationalites: [
      "Espagne", "Brésil", "Angleterre", "France", "Norvège",
      "Ghana", "Angleterre", "Italie", "Allemagne", "Angleterre", "Angleterre",
    ],
  },
  {
    nom: "Chelsea",
    pays: "Angleterre",
    ligue: "Premier League",
    logoEmoji: "🔵",
    joueurNationalites: [
      "Ukraine", "Angleterre", "Sénégal", "France", "Equateur",
      "France", "Angleterre", "Argentine", "Angleterre", "Angleterre", "Portugal",
    ],
  },
  {
    nom: "Atlético Madrid",
    pays: "Espagne",
    ligue: "La Liga",
    logoEmoji: "🔴⚪",
    joueurNationalites: [
      "Slovénie", "Brésil", "Espagne", "Argentine", "France",
      "Espagne", "Argentine", "Norvège", "Espagne", "Espagne", "Argentine",
    ],
  },
  {
    nom: "Borussia Dortmund",
    pays: "Allemagne",
    ligue: "Bundesliga",
    logoEmoji: "🟡⚫",
    joueurNationalites: [
      "Suisse", "Allemagne", "Allemagne", "Turquie", "Angleterre",
      "Guinée", "Allemagne", "Belgique", "Allemagne", "Mali", "Allemagne",
    ],
  },
  {
    nom: "Napoli",
    pays: "Italie",
    ligue: "Serie A",
    logoEmoji: "🔵",
    joueurNationalites: [
      "Italie", "Brésil", "Uruguay", "Géorgie", "Écosse",
      "Italie", "Cameroun", "Italie", "Argentine", "Belgique", "Italie",
    ],
  },
  {
    nom: "Benfica",
    pays: "Portugal",
    ligue: "Liga Portugal",
    logoEmoji: "🔴",
    joueurNationalites: [
      "Grèce", "Argentine", "Portugal", "Brésil", "Turquie",
      "Portugal", "Allemagne", "Portugal", "Brésil", "Danemark", "Portugal",
    ],
  },
  {
    nom: "Ajax Amsterdam",
    pays: "Pays-Bas",
    ligue: "Eredivisie",
    logoEmoji: "🔴⚪",
    joueurNationalites: [
      "Pays-Bas", "Argentine", "Pays-Bas", "Danemark", "Ghana",
      "Pays-Bas", "Pays-Bas", "Burkina Faso", "Pays-Bas", "Pays-Bas", "Croatie",
    ],
  },
  {
    nom: "Tottenham",
    pays: "Angleterre",
    ligue: "Premier League",
    logoEmoji: "⚪",
    joueurNationalites: [
      "Angleterre", "Pays-Bas", "Corée du Sud", "Angleterre", "Suède",
      "Argentine", "Brésil", "Uruguay", "Angleterre", "France", "Angleterre",
    ],
  },
  {
    nom: "Manchester United",
    pays: "Angleterre",
    ligue: "Premier League",
    logoEmoji: "🔴",
    joueurNationalites: [
      "Angleterre", "Portugal", "Danemark", "Argentine",
      "Pays-Bas", "Angleterre", "Brésil", "Uruguay", "Angleterre", "Maroc", "France",
    ],
  },
  {
    nom: "OM",
    pays: "France",
    ligue: "Ligue 1",
    logoEmoji: "⚪🔵",
    joueurNationalites: [
      "Espagne", "Argentine", "Côte d'Ivoire", "France", "Angleterre",
      "Colombie", "Sénégal", "France", "Danemark", "Brésil", "France",
    ],
  },
  {
    nom: "OL",
    pays: "France",
    ligue: "Ligue 1",
    logoEmoji: "🔵🔴",
    joueurNationalites: [
      "France", "Brésil", "Argentine", "France", "Belgique",
      "Cameroun", "France", "France", "Côte d'Ivoire", "Angleterre", "France",
    ],
  },
];

/**
 * Get a shuffled subset of teams for a game.
 * Returns teams in random order.
 */
export function getRandomScoutTeams(count: number): ScoutTeamData[] {
  return [...SCOUT_TEAMS].sort(() => Math.random() - 0.5).slice(0, count);
}

/**
 * Get all team names for autocomplete.
 */
export function getAllTeamNames(): string[] {
  return SCOUT_TEAMS.map((t) => t.nom);
}
