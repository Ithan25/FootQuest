/**
 * FootQuest - Additional WC2026 Teams (36 teams)
 * Combined with the 12 in scout-data.ts = 48 total
 */
import type { ScoutTeamData } from "./scout-data";

const P = { GK: "GK", DEF: "DEF", MID: "MID", FWD: "FWD" } as const;
const pos = {
  gk: { posX: 50, posY: 90 },
  rb: { posX: 85, posY: 72 }, rcb: { posX: 62, posY: 75 }, lcb: { posX: 38, posY: 75 }, lb: { posX: 15, posY: 72 },
  rm: { posX: 70, posY: 52 }, cm: { posX: 50, posY: 55 }, lm: { posX: 30, posY: 52 },
  rw: { posX: 80, posY: 28 }, st: { posX: 50, posY: 22 }, lw: { posX: 20, posY: 28 },
  // 4-4-2
  rm442: { posX: 80, posY: 50 }, rcm442: { posX: 60, posY: 55 }, lcm442: { posX: 40, posY: 55 }, lm442: { posX: 20, posY: 50 }, rs: { posX: 60, posY: 25 }, ls: { posX: 40, posY: 25 },
  // 4-2-4
  rcm424: { posX: 65, posY: 55 }, lcm424: { posX: 35, posY: 55 }, rw424: { posX: 85, posY: 25 }, rs424: { posX: 60, posY: 22 }, ls424: { posX: 40, posY: 22 }, lw424: { posX: 15, posY: 25 },
  // 3-4-3
  rcb3: { posX: 75, posY: 75 }, cb3: { posX: 50, posY: 78 }, lcb3: { posX: 25, posY: 75 }, rm343: { posX: 85, posY: 52 }, rcm343: { posX: 65, posY: 55 }, lcm343: { posX: 35, posY: 55 }, lm343: { posX: 15, posY: 52 },
  // 3-3-4
  rcm334: { posX: 70, posY: 52 }, cm334: { posX: 50, posY: 55 }, lcm334: { posX: 30, posY: 52 }
};

export const EXTRA_TEAMS: ScoutTeamData[] = [
  // ═══ UEFA ═══
  {
    pays: "Croatie", drapeau: "🇭🇷", formation: "4-3-3", joueurs: [
      { nom: "Livaković", club: "Fenerbahçe", poste: P.GK, ...pos.gk }, { nom: "Stanišić", club: "Bayern Munich", poste: P.DEF, ...pos.rb }, { nom: "Šutalo", club: "Ajax Amsterdam", poste: P.DEF, ...pos.rcb }, { nom: "Gvardiol", club: "Manchester City", poste: P.DEF, ...pos.lcb }, { nom: "Sosa", club: "Torino FC", poste: P.DEF, ...pos.lb }, { nom: "Modrić", club: "Real Madrid", poste: P.MID, ...pos.rm }, { nom: "Kovačić", club: "Manchester City", poste: P.MID, ...pos.cm }, { nom: "Brozović", club: "Al-Nassr", poste: P.MID, ...pos.lm }, { nom: "Kramarić", club: "TSG Hoffenheim", poste: P.FWD, ...pos.rw }, { nom: "Budimir", club: "CA Osasuna", poste: P.FWD, ...pos.st }, { nom: "Perišić", club: "Hajduk Split", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Suisse", drapeau: "🇨🇭", formation: "3-4-3", joueurs: [
      { nom: "Kobel", club: "Borussia Dortmund", poste: P.GK, ...pos.gk }, { nom: "Akanji", club: "Inter Milan", poste: P.DEF, ...pos.rcb3 }, { nom: "Elvedi", club: "Borussia Mönchengladbach", poste: P.DEF, ...pos.cb3 }, { nom: "Rodríguez", club: "Torino FC", poste: P.DEF, ...pos.lcb3 }, { nom: "Ndoye", club: "Nottingham Forest", poste: P.MID, ...pos.rm343 }, { nom: "Xhaka", club: "Sunderland", poste: P.MID, ...pos.rcm343 }, { nom: "Freuler", club: "Bologna FC", poste: P.MID, ...pos.lcm343 }, { nom: "Aebischer", club: "Pisa", poste: P.MID, ...pos.lm343 }, { nom: "Vargas", club: "Séville FC", poste: P.FWD, ...pos.rw }, { nom: "Embolo", club: "Stade Rennais", poste: P.FWD, ...pos.st }, { nom: "Okafor", club: "Leeds United", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Écosse", drapeau: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", formation: "4-3-3", joueurs: [
      { nom: "Gunn", club: "Norwich City", poste: P.GK, ...pos.gk }, { nom: "Ralston", club: "Celtic FC", poste: P.DEF, ...pos.rb }, { nom: "Hendry", club: "Al-Ettifaq", poste: P.DEF, ...pos.rcb }, { nom: "Hanley", club: "Norwich City", poste: P.DEF, ...pos.lcb }, { nom: "Robertson", club: "Liverpool", poste: P.DEF, ...pos.lb }, { nom: "McTominay", club: "Napoli", poste: P.MID, ...pos.rm }, { nom: "Gilmour", club: "Napoli", poste: P.MID, ...pos.cm }, { nom: "McGinn", club: "Aston Villa", poste: P.MID, ...pos.lm }, { nom: "Christie", club: "AFC Bournemouth", poste: P.FWD, ...pos.rw }, { nom: "Ferguson", club: "Bologna FC", poste: P.FWD, ...pos.st }, { nom: "Adams", club: "Torino FC", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Autriche", drapeau: "🇦🇹", formation: "4-4-2", joueurs: [
      { nom: "Pentz", club: "Brøndby IF", poste: P.GK, ...pos.gk }, { nom: "Posch", club: "Como 1907", poste: P.DEF, ...pos.rb }, { nom: "Danso", club: "Tottenham Hotspur", poste: P.DEF, ...pos.rcb }, { nom: "Alaba", club: "Real Madrid", poste: P.DEF, ...pos.lcb }, { nom: "Mwene", club: "Mainz 05", poste: P.DEF, ...pos.lb }, { nom: "Seiwald", club: "RB Leipzig", poste: P.MID, ...pos.rm442 }, { nom: "Laimer", club: "Bayern Munich", poste: P.MID, ...pos.rcm442 }, { nom: "Sabitzer", club: "Borussia Dortmund", poste: P.MID, ...pos.lcm442 }, { nom: "Baumgartner", club: "RB Leipzig", poste: P.MID, ...pos.lm442 }, { nom: "Wimmer", club: "VfL Wolfsburg", poste: P.FWD, ...pos.rs }, { nom: "Arnautović", club: "Étoile Rouge de Belgrade", poste: P.FWD, ...pos.ls }]
  },

  {
    pays: "Norvège", drapeau: "🇳🇴", formation: "4-3-3", joueurs: [
      { nom: "Nyland", club: "Séville FC", poste: P.GK, ...pos.gk }, { nom: "Ryerson", club: "Borussia Dortmund", poste: P.DEF, ...pos.rb }, { nom: "Ajer", club: "Brentford", poste: P.DEF, ...pos.rcb }, { nom: "Østigård", club: "Stade Rennais", poste: P.DEF, ...pos.lcb }, { nom: "Wolfe", club: "AZ Alkmaar", poste: P.DEF, ...pos.lb }, { nom: "Berge", club: "Fulham", poste: P.MID, ...pos.rm }, { nom: "Thorstvedt", club: "Sassuolo", poste: P.MID, ...pos.cm }, { nom: "Ødegaard", club: "Arsenal", poste: P.MID, ...pos.lm }, { nom: "Bobb", club: "Manchester City", poste: P.FWD, ...pos.rw }, { nom: "Haaland", club: "Manchester City", poste: P.FWD, ...pos.st }, { nom: "Sørloth", club: "Atlético Madrid", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Bosnie-Herzégovine", drapeau: "🇧🇦", formation: "4-3-3", joueurs: [
      { nom: "Vasilj", club: "FC St. Pauli", poste: P.GK, ...pos.gk }, { nom: "Dedić", club: "RB Salzburg", poste: P.DEF, ...pos.rb }, { nom: "Kolašinac", club: "Atalanta", poste: P.DEF, ...pos.rcb }, { nom: "Radeljić", club: "HNK Rijeka", poste: P.DEF, ...pos.lcb }, { nom: "Mujakić", club: "Gaziantep", poste: P.DEF, ...pos.lb }, { nom: "Tahirović", club: "Brøndby", poste: P.MID, ...pos.rm }, { nom: "Gigović", club: "Young Boys", poste: P.MID, ...pos.cm }, { nom: "Hadžiahmetović", club: "Hull City", poste: P.MID, ...pos.lm }, { nom: "Bajraktarević", club: "PSV Eindhoven", poste: P.FWD, ...pos.rw }, { nom: "Džeko", club: "Schalke 04", poste: P.FWD, ...pos.st }, { nom: "Demirović", club: "VfB Stuttgart", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Suède", drapeau: "🇸🇪", formation: "4-3-3", joueurs: [
      { nom: "Ellborg", club: "Malmö FF", poste: P.GK, ...pos.gk }, { nom: "Krafth", club: "Newcastle United", poste: P.DEF, ...pos.rb }, { nom: "Hien", club: "Atalanta", poste: P.DEF, ...pos.rcb }, { nom: "Lindelöf", club: "Manchester United", poste: P.DEF, ...pos.lcb }, { nom: "Gudmundsson", club: "LOSC Lille", poste: P.DEF, ...pos.lb }, { nom: "Karlström", club: "Udinese", poste: P.MID, ...pos.rm }, { nom: "Bergvall", club: "Tottenham Hotspur", poste: P.MID, ...pos.cm }, { nom: "Larsson", club: "Eintracht Frankfurt", poste: P.MID, ...pos.lm }, { nom: "Swedberg", club: "Celta Vigo", poste: P.FWD, ...pos.rw }, { nom: "Isak", club: "Liverpool", poste: P.FWD, ...pos.st }, { nom: "Gyökeres", club: "Sporting CP", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Tchéquie", drapeau: "🇨🇿", formation: "4-3-3", joueurs: [
      { nom: "Kovář", club: "Bayer Leverkusen", poste: P.GK, ...pos.gk }, { nom: "Coufal", club: "West Ham United", poste: P.DEF, ...pos.rb }, { nom: "Krejčí", club: "Girona FC", poste: P.DEF, ...pos.rcb }, { nom: "Hranáč", club: "TSG Hoffenheim", poste: P.DEF, ...pos.lcb }, { nom: "Zelený", club: "Slavia Prague", poste: P.DEF, ...pos.lb }, { nom: "Souček", club: "West Ham United", poste: P.MID, ...pos.rm }, { nom: "Bucha", club: "FC Cincinnati", poste: P.MID, ...pos.cm }, { nom: "Černý", club: "VfL Wolfsburg", poste: P.MID, ...pos.lm }, { nom: "Hložek", club: "Bayer Leverkusen", poste: P.FWD, ...pos.rw }, { nom: "Schick", club: "Bayer Leverkusen", poste: P.FWD, ...pos.st }, { nom: "Chytil", club: "Slavia Prague", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Turquie", drapeau: "🇹🇷", formation: "4-3-3", joueurs: [
      { nom: "Günok", club: "Beşiktaş", poste: P.GK, ...pos.gk }, { nom: "Müldür", club: "AS Roma", poste: P.DEF, ...pos.rb }, { nom: "Demiral", club: "Al-Ahli", poste: P.DEF, ...pos.rcb }, { nom: "Bardakcı", club: "Galatasaray", poste: P.DEF, ...pos.lcb }, { nom: "Kadıoğlu", club: "Brighton & Hove Albion", poste: P.DEF, ...pos.lb }, { nom: "Çalhanoğlu", club: "Inter Milan", poste: P.MID, ...pos.rm }, { nom: "Kökçü", club: "Benfica", poste: P.MID, ...pos.cm }, { nom: "Güler", club: "Real Madrid", poste: P.MID, ...pos.lm }, { nom: "Yıldız", club: "Juventus", poste: P.FWD, ...pos.rw }, { nom: "Aktürkoğlu", club: "Benfica", poste: P.FWD, ...pos.st }, { nom: "Yılmaz", club: "Galatasaray", poste: P.FWD, ...pos.lw }]
  },

  // ═══ CONMEBOL ═══
  {
    pays: "Uruguay", drapeau: "🇺🇾", formation: "4-3-3", joueurs: [
      { nom: "Mele", club: "CF Monterrey", poste: P.GK, ...pos.gk }, { nom: "Varela", club: "Flamengo", poste: P.DEF, ...pos.rb }, { nom: "Araújo", club: "FC Barcelone", poste: P.DEF, ...pos.rcb }, { nom: "Giménez", club: "Atlético Madrid", poste: P.DEF, ...pos.lcb }, { nom: "Olivera", club: "Napoli", poste: P.DEF, ...pos.lb }, { nom: "Ugarte", club: "Manchester United", poste: P.MID, ...pos.rm }, { nom: "Valverde", club: "Real Madrid", poste: P.MID, ...pos.cm }, { nom: "Bentancur", club: "Tottenham Hotspur", poste: P.MID, ...pos.lm }, { nom: "Pellistri", club: "Panathinaikos", poste: P.FWD, ...pos.rw }, { nom: "Núñez", club: "(Championnat saoudien)", poste: P.FWD, ...pos.st }, { nom: "M. Araújo", club: "Sporting CP", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Colombie", drapeau: "🇨🇴", formation: "4-3-3", joueurs: [
      { nom: "Vargas", club: "Atlas FC", poste: P.GK, ...pos.gk }, { nom: "Muñoz", club: "Crystal Palace", poste: P.DEF, ...pos.rb }, { nom: "Sánchez", club: "Galatasaray", poste: P.DEF, ...pos.rcb }, { nom: "Lucumí", club: "Bologna FC", poste: P.DEF, ...pos.lcb }, { nom: "Mojica", club: "Villarreal CF", poste: P.DEF, ...pos.lb }, { nom: "Lerma", club: "Crystal Palace", poste: P.MID, ...pos.rm }, { nom: "Ríos", club: "Palmeiras", poste: P.MID, ...pos.cm }, { nom: "Arias", club: "Fluminense", poste: P.MID, ...pos.lm }, { nom: "Rodríguez", club: "São Paulo FC", poste: P.FWD, ...pos.rw }, { nom: "Díaz", club: "Liverpool", poste: P.FWD, ...pos.st }, { nom: "Córdoba", club: "FK Krasnodar", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Équateur", drapeau: "🇪🇨", formation: "4-3-3", joueurs: [
      { nom: "Domínguez", club: "Cerro Porteño", poste: P.GK, ...pos.gk }, { nom: "Preciado", club: "Sparta Prague", poste: P.DEF, ...pos.rb }, { nom: "Pacho", club: "Paris Saint-Germain", poste: P.DEF, ...pos.rcb }, { nom: "Hincapié", club: "Bayer Leverkusen", poste: P.DEF, ...pos.lcb }, { nom: "Estupiñán", club: "Brighton & Hove Albion", poste: P.DEF, ...pos.lb }, { nom: "Caicedo", club: "Chelsea", poste: P.MID, ...pos.rm }, { nom: "Alcívar", club: "Independiente del Valle", poste: P.MID, ...pos.cm }, { nom: "Páez", club: "Chelsea", poste: P.MID, ...pos.lm }, { nom: "Sarmiento", club: "Brighton & Hove Albion", poste: P.FWD, ...pos.rw }, { nom: "Plata", club: "Flamengo", poste: P.FWD, ...pos.st }, { nom: "Valencia", club: "SC Internacional", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Paraguay", drapeau: "🇵🇾", formation: "4-3-3", joueurs: [
      { nom: "Fernández", club: "Cerro Porteño", poste: P.GK, ...pos.gk }, { nom: "Velázquez", club: "Newell's Old Boys", poste: P.DEF, ...pos.rb }, { nom: "Gómez", club: "Palmeiras", poste: P.DEF, ...pos.rcb }, { nom: "Alderete", club: "Getafe CF", poste: P.DEF, ...pos.lcb }, { nom: "Alonso", club: "FK Krasnodar", poste: P.DEF, ...pos.lb }, { nom: "Cubas", club: "Vancouver Whitecaps", poste: P.MID, ...pos.rm }, { nom: "D. Gómez", club: "Brighton & Hove Albion", poste: P.MID, ...pos.cm }, { nom: "Almirón", club: "Newcastle United", poste: P.MID, ...pos.lm }, { nom: "Enciso", club: "RC Strasbourg", poste: P.FWD, ...pos.rw }, { nom: "Sosa", club: "Nottingham Forest", poste: P.FWD, ...pos.st }, { nom: "Sanabria", club: "Torino FC", poste: P.FWD, ...pos.lw }]
  },

  // ═══ CONCACAF ═══
  {
    pays: "Panama", drapeau: "🇵🇦", formation: "4-3-3", joueurs: [
      { nom: "Mosquera", club: "Maccabi Tel Aviv", poste: P.GK, ...pos.gk }, { nom: "Murillo", club: "RSC Anderlecht", poste: P.DEF, ...pos.rb }, { nom: "Córdoba", club: "Norwich City", poste: P.DEF, ...pos.rcb }, { nom: "Fariña", club: "Independiente", poste: P.DEF, ...pos.lcb }, { nom: "Davis", club: "Dunajská Streda", poste: P.DEF, ...pos.lb }, { nom: "Carrasquilla", club: "Pumas UNAM", poste: P.MID, ...pos.rm }, { nom: "Godoy", club: "San Diego FC", poste: P.MID, ...pos.cm }, { nom: "Ayarza", club: "Cienciano", poste: P.MID, ...pos.lm }, { nom: "Bárcenas", club: "Mazatlán FC", poste: P.FWD, ...pos.rw }, { nom: "Fajardo", club: "Universidad Católica", poste: P.FWD, ...pos.st }, { nom: "Waterman", club: "U. de Concepción", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Curaçao", drapeau: "🇨🇼", formation: "4-3-3", joueurs: [
      { nom: "Room", club: "Miami FC", poste: P.GK, ...pos.gk }, { nom: "Sambo", club: "Sparta Rotterdam", poste: P.DEF, ...pos.rb }, { nom: "Obispo", club: "PSV Eindhoven", poste: P.DEF, ...pos.rcb }, { nom: "Bazoer", club: "Konyaspor", poste: P.DEF, ...pos.lcb }, { nom: "Floranus", club: "PEC Zwolle", poste: P.DEF, ...pos.lb }, { nom: "Roemeratoe", club: "RKC Waalwijk", poste: P.MID, ...pos.rm }, { nom: "L. Bacuna", club: "Iğdır FK", poste: P.MID, ...pos.cm }, { nom: "J. Bacuna", club: "Gaziantep FK", poste: P.MID, ...pos.lm }, { nom: "Antonisse", club: "Kifisia", poste: P.FWD, ...pos.rw }, { nom: "Gorré", club: "Maccabi Haifa", poste: P.FWD, ...pos.st }, { nom: "Locadia", club: "Miami FC", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Haïti", drapeau: "🇭🇹", formation: "4-2-4", joueurs: [
      { nom: "Placide", club: "SC Bastia", poste: P.GK, ...pos.gk }, { nom: "Arcus", club: "Angers SCO", poste: P.DEF, ...pos.rb }, { nom: "Adé", club: "LDU Quito", poste: P.DEF, ...pos.rcb }, { nom: "Delcroix", club: "Burnley", poste: P.DEF, ...pos.lcb }, { nom: "Lacroix", club: "Colorado Rapids", poste: P.DEF, ...pos.lb }, { nom: "Bellegarde", club: "Wolverhampton", poste: P.MID, ...pos.rcm424 }, { nom: "Pierre", club: "US Avranches", poste: P.MID, ...pos.lcm424 }, { nom: "Deedson", club: "OB Odense", poste: P.FWD, ...pos.rw424 }, { nom: "Casimir", club: "RC Strasbourg", poste: P.FWD, ...pos.rs424 }, { nom: "Providence", club: "TSV Hartberg", poste: P.FWD, ...pos.ls424 }, { nom: "Isidor", club: "Sunderland", poste: P.FWD, ...pos.lw424 }]
  },

  {
    pays: "Mexique", drapeau: "🇲🇽", formation: "4-3-3", joueurs: [
      { nom: "Malagón", club: "Club América", poste: P.GK, ...pos.gk }, { nom: "Sánchez", club: "PAOK", poste: P.DEF, ...pos.rb }, { nom: "Montes", club: "Lokomotiv Moscou", poste: P.DEF, ...pos.rcb }, { nom: "Vásquez", club: "Genoa", poste: P.DEF, ...pos.lcb }, { nom: "Gallardo", club: "Toluca", poste: P.DEF, ...pos.lb }, { nom: "Álvarez", club: "West Ham United", poste: P.MID, ...pos.rm }, { nom: "Fidalgo", club: "Real Betis", poste: P.MID, ...pos.cm }, { nom: "Lira", club: "Cruz Azul", poste: P.MID, ...pos.lm }, { nom: "Quiñones", club: "Al-Qadsiah", poste: P.FWD, ...pos.rw }, { nom: "Jiménez", club: "Fulham", poste: P.FWD, ...pos.st }, { nom: "Vega", club: "Toluca", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Canada", drapeau: "🇨🇦", formation: "4-3-3", joueurs: [
      { nom: "Crépeau", club: "Portland Timbers", poste: P.GK, ...pos.gk }, { nom: "Laryea", club: "Toronto FC", poste: P.DEF, ...pos.rb }, { nom: "Cornelius", club: "Rangers", poste: P.DEF, ...pos.rcb }, { nom: "Miller", club: "Portland Timbers", poste: P.DEF, ...pos.lcb }, { nom: "Buchanan", club: "Villarreal CF", poste: P.DEF, ...pos.lb }, { nom: "Eustáquio", club: "Los Angeles FC", poste: P.MID, ...pos.rm }, { nom: "Koné", club: "Sassuolo", poste: P.MID, ...pos.cm }, { nom: "Osorio", club: "Toronto FC", poste: P.MID, ...pos.lm }, { nom: "Shaffelburg", club: "Los Angeles FC", poste: P.FWD, ...pos.rw }, { nom: "David", club: "Juventus", poste: P.FWD, ...pos.st }, { nom: "Larin", club: "Feyenoord", poste: P.FWD, ...pos.lw }]
  },

  // ═══ CAF - Afrique ═══
  {
    pays: "Sénégal", drapeau: "🇸🇳", formation: "4-3-3", joueurs: [
      { nom: "Mendy", club: "Al-Ahli", poste: P.GK, ...pos.gk }, { nom: "Diatta", club: "AS Monaco", poste: P.DEF, ...pos.rb }, { nom: "Koulibaly", club: "Al-Hilal", poste: P.DEF, ...pos.rcb }, { nom: "Niakhaté", club: "Olympique Lyonnais", poste: P.DEF, ...pos.lcb }, { nom: "Diouf", club: "West Ham United", poste: P.DEF, ...pos.lb }, { nom: "I. Gueye", club: "Everton", poste: P.MID, ...pos.rm }, { nom: "Sarr", club: "Tottenham Hotspur", poste: P.MID, ...pos.cm }, { nom: "Camara", club: "AS Monaco", poste: P.MID, ...pos.lm }, { nom: "I. Sarr", club: "Crystal Palace", poste: P.FWD, ...pos.rw }, { nom: "Jackson", club: "Bayern Munich", poste: P.FWD, ...pos.st }, { nom: "Mané", club: "Al-Nassr", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Égypte", drapeau: "🇪🇬", formation: "4-3-3", joueurs: [
      { nom: "El-Shenawy", club: "Al Ahly", poste: P.GK, ...pos.gk }, { nom: "Ashour", club: "Al Ahly", poste: P.DEF, ...pos.rb }, { nom: "Hegazi", club: "Al-Ittihad", poste: P.DEF, ...pos.rcb }, { nom: "Abdelmonem", club: "Beşiktaş", poste: P.DEF, ...pos.lcb }, { nom: "Fatouh", club: "Zamalek", poste: P.DEF, ...pos.lb }, { nom: "Elneny", club: "Al Jazira", poste: P.MID, ...pos.rm }, { nom: "Fathi", club: "Al Ahly", poste: P.MID, ...pos.cm }, { nom: "Trezeguet", club: "Trabzonspor", poste: P.MID, ...pos.lm }, { nom: "Salah", club: "Liverpool", poste: P.FWD, ...pos.rw }, { nom: "Marmoush", club: "Eintracht Frankfurt", poste: P.FWD, ...pos.st }, { nom: "Adel", club: "Pyramids FC", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Algérie", drapeau: "🇩🇿", formation: "4-3-3", joueurs: [
      { nom: "Mandréa", club: "RC Lens", poste: P.GK, ...pos.gk }, { nom: "Atal", club: "Al-Sadd", poste: P.DEF, ...pos.rb }, { nom: "Mandi", club: "Villarreal CF", poste: P.DEF, ...pos.rcb }, { nom: "Tougai", club: "Espérance de Tunis", poste: P.DEF, ...pos.lcb }, { nom: "Aït-Nouri", club: "Wolverhampton", poste: P.DEF, ...pos.lb }, { nom: "Bennacer", club: "AC Milan", poste: P.MID, ...pos.rm }, { nom: "Aouar", club: "Al-Ittihad", poste: P.MID, ...pos.cm }, { nom: "Chaïbi", club: "Eintracht Frankfurt", poste: P.MID, ...pos.lm }, { nom: "Mahrez", club: "Al-Ahli", poste: P.FWD, ...pos.rw }, { nom: "Gouiri", club: "Stade Rennais", poste: P.FWD, ...pos.st }, { nom: "Amoura", club: "VfL Wolfsburg", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Tunisie", drapeau: "🇹🇳", formation: "4-3-3", joueurs: [
      { nom: "Dahmen", club: "Montpellier HSC", poste: P.GK, ...pos.gk }, { nom: "Dräger", club: "FC Bâle", poste: P.DEF, ...pos.rb }, { nom: "Meriah", club: "Espérance de Tunis", poste: P.DEF, ...pos.rcb }, { nom: "Talbi", club: "FC Lorient", poste: P.DEF, ...pos.lcb }, { nom: "Abdi", club: "SM Caen", poste: P.DEF, ...pos.lb }, { nom: "Skhiri", club: "Eintracht Frankfurt", poste: P.MID, ...pos.rm }, { nom: "Laïdouni", club: "Union Berlin", poste: P.MID, ...pos.cm }, { nom: "Mejbri", club: "Burnley", poste: P.MID, ...pos.lm }, { nom: "Ayari", club: "Paris Saint-Germain", poste: P.FWD, ...pos.rw }, { nom: "Gharbi", club: "FC Augsburg", poste: P.FWD, ...pos.st }, { nom: "Msakni", club: "Al-Arabi", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Afrique du Sud", drapeau: "🇿🇦", formation: "4-3-3", joueurs: [
      { nom: "Williams", club: "Mamelodi Sundowns", poste: P.GK, ...pos.gk }, { nom: "Mudau", club: "Mamelodi Sundowns", poste: P.DEF, ...pos.rb }, { nom: "Sibisi", club: "Orlando Pirates", poste: P.DEF, ...pos.rcb }, { nom: "Longwayne", club: "(Championnat local)", poste: P.DEF, ...pos.lcb }, { nom: "Modiba", club: "Mamelodi Sundowns", poste: P.DEF, ...pos.lb }, { nom: "Mokoena", club: "Mamelodi Sundowns", poste: P.MID, ...pos.rm }, { nom: "Mbatha", club: "Orlando Pirates", poste: P.MID, ...pos.cm }, { nom: "Zwane", club: "Mamelodi Sundowns", poste: P.MID, ...pos.lm }, { nom: "Tau", club: "(Championnat vietnamien)", poste: P.FWD, ...pos.rw }, { nom: "Foster", club: "Burnley", poste: P.FWD, ...pos.st }, { nom: "Appollis", club: "Orlando Pirates", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Côte d'Ivoire", drapeau: "🇨🇮", formation: "4-3-3", joueurs: [
      { nom: "Fofana", club: "Çaykur Rizespor", poste: P.GK, ...pos.gk }, { nom: "Singo", club: "AS Monaco", poste: P.DEF, ...pos.rb }, { nom: "Kossounou", club: "Atalanta", poste: P.DEF, ...pos.rcb }, { nom: "Ndicka", club: "AS Roma", poste: P.DEF, ...pos.lcb }, { nom: "Konan", club: "Al-Nassr", poste: P.DEF, ...pos.lb }, { nom: "Kessié", club: "Al-Ahli", poste: P.MID, ...pos.rm }, { nom: "S. Fofana", club: "Al-Ettifaq", poste: P.MID, ...pos.cm }, { nom: "Sangaré", club: "Nottingham Forest", poste: P.MID, ...pos.lm }, { nom: "Diallo", club: "Manchester United", poste: P.FWD, ...pos.rw }, { nom: "Adingra", club: "AS Monaco", poste: P.FWD, ...pos.st }, { nom: "Guessand", club: "Aston Villa", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Cap-Vert", drapeau: "🇨🇻", formation: "4-3-3", joueurs: [
      { nom: "Vozinha", club: "GD Chaves", poste: P.GK, ...pos.gk }, { nom: "Stopira", club: "SC Torreense", poste: P.DEF, ...pos.rb }, { nom: "Borges", club: "Al Bataeh", poste: P.DEF, ...pos.rcb }, { nom: "Costa", club: "Toulouse FC", poste: P.DEF, ...pos.lcb }, { nom: "Jojo", club: "FC Vizela", poste: P.DEF, ...pos.lb }, { nom: "Pina", club: "FK Krasnodar", poste: P.MID, ...pos.rm }, { nom: "Monteiro", club: "PEC Zwolle", poste: P.MID, ...pos.cm }, { nom: "Duarte", club: "Puskás Akadémia", poste: P.MID, ...pos.lm }, { nom: "Mendes", club: "Iğdır FK", poste: P.FWD, ...pos.rw }, { nom: "Rodrigues", club: "Apollon Limassol", poste: P.FWD, ...pos.st }, { nom: "Bebé", club: "Rayo Vallecano", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Ghana", drapeau: "🇬🇭", formation: "4-3-3", joueurs: [
      { nom: "Ati-Zigi", club: "FC St. Gallen", poste: P.GK, ...pos.gk }, { nom: "Lamptey", club: "Brighton & Hove Albion", poste: P.DEF, ...pos.rb }, { nom: "Salisu", club: "AS Monaco", poste: P.DEF, ...pos.rcb }, { nom: "Amartey", club: "Beşiktaş", poste: P.DEF, ...pos.lcb }, { nom: "Mensah", club: "AJ Auxerre", poste: P.DEF, ...pos.lb }, { nom: "Partey", club: "Arsenal", poste: P.MID, ...pos.rm }, { nom: "Kudus", club: "Tottenham Hotspur", poste: P.MID, ...pos.cm }, { nom: "Abdul Samed", club: "RC Lens", poste: P.MID, ...pos.lm }, { nom: "Semenyo", club: "Manchester City", poste: P.FWD, ...pos.rw }, { nom: "Ayew", club: "Leicester City", poste: P.FWD, ...pos.st }, { nom: "Williams", club: "Athletic Bilbao", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "RD Congo", drapeau: "🇨🇩", formation: "4-3-3", joueurs: [
      { nom: "Mpasi", club: "Le Havre AC", poste: P.GK, ...pos.gk }, { nom: "Kalulu", club: "FC Lorient", poste: P.DEF, ...pos.rb }, { nom: "Mbemba", club: "LOSC Lille", poste: P.DEF, ...pos.rcb }, { nom: "Tuanzebe", club: "Burnley", poste: P.DEF, ...pos.lcb }, { nom: "Wan-Bissaka", club: "West Ham United", poste: P.DEF, ...pos.lb }, { nom: "Moutoussamy", club: "Atromitos", poste: P.MID, ...pos.rm }, { nom: "Pickel", club: "Espanyol Barcelone", poste: P.MID, ...pos.cm }, { nom: "Kakuta", club: "Amiens SC", poste: P.MID, ...pos.lm }, { nom: "Elia", club: "Alanyaspor", poste: P.FWD, ...pos.rw }, { nom: "Wissa", club: "Brentford", poste: P.FWD, ...pos.st }, { nom: "Bakambu", club: "Real Betis", poste: P.FWD, ...pos.lw }]
  },

  // ═══ AFC - Asie ═══
  {
    pays: "Iran", drapeau: "🇮🇷", formation: "4-3-3", joueurs: [
      { nom: "Beiranvand", club: "Persepolis", poste: P.GK, ...pos.gk }, { nom: "Moharrami", club: "Dinamo Zagreb", poste: P.DEF, ...pos.rb }, { nom: "Hosseini", club: "Kayserispor", poste: P.DEF, ...pos.rcb }, { nom: "Kanaani", club: "FC Copenhague", poste: P.DEF, ...pos.lcb }, { nom: "Mohammadi", club: "AEK Athènes", poste: P.DEF, ...pos.lb }, { nom: "Ezatolahi", club: "Vejle BK", poste: P.MID, ...pos.rm }, { nom: "Ghoddos", club: "Brentford", poste: P.MID, ...pos.cm }, { nom: "Jahanbakhsh", club: "Feyenoord", poste: P.MID, ...pos.lm }, { nom: "Taremi", club: "Inter Milan", poste: P.FWD, ...pos.rw }, { nom: "Azmoun", club: "AS Roma", poste: P.FWD, ...pos.st }, { nom: "Ghayedi", club: "Ittihad Kalba", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Corée du Sud", drapeau: "🇰🇷", formation: "4-4-2", joueurs: [
      { nom: "Jo", club: "Ulsan HD", poste: P.GK, ...pos.gk }, { nom: "Seol", club: "Étoile Rouge de Belgrade", poste: P.DEF, ...pos.rb }, { nom: "Kim M.", club: "Bayern Munich", poste: P.DEF, ...pos.rcb }, { nom: "Cho", club: "Sharjah", poste: P.DEF, ...pos.lcb }, { nom: "Kim M. H.", club: "Daejeon Hana Citizen", poste: P.DEF, ...pos.lb }, { nom: "Paik", club: "Birmingham City", poste: P.MID, ...pos.rm442 }, { nom: "Hwang", club: "Wolverhampton Wanderers", poste: P.MID, ...pos.rcm442 }, { nom: "Lee K.", club: "Paris Saint-Germain", poste: P.MID, ...pos.lcm442 }, { nom: "Lee J.", club: "Mainz 05", poste: P.MID, ...pos.lm442 }, { nom: "Son", club: "Los Angeles FC", poste: P.FWD, ...pos.rs }, { nom: "Cho G.", club: "FC Midtjylland", poste: P.FWD, ...pos.ls }]
  },

  {
    pays: "Australie", drapeau: "🇦🇺", formation: "4-3-3", joueurs: [
      { nom: "Ryan", club: "Levante UD", poste: P.GK, ...pos.gk }, { nom: "Geria", club: "Albirex Niigata", poste: P.DEF, ...pos.rb }, { nom: "Souttar", club: "Sheffield United", poste: P.DEF, ...pos.rcb }, { nom: "Rowles", club: "D.C. United", poste: P.DEF, ...pos.lcb }, { nom: "Bos", club: "Feyenoord", poste: P.DEF, ...pos.lb }, { nom: "O'Neill", club: "New York City FC", poste: P.MID, ...pos.rm }, { nom: "Irvine", club: "FC St. Pauli", poste: P.MID, ...pos.cm }, { nom: "Metcalfe", club: "FC St. Pauli", poste: P.MID, ...pos.lm }, { nom: "Boyle", club: "Hibernian", poste: P.FWD, ...pos.rw }, { nom: "Irankunda", club: "Watford", poste: P.FWD, ...pos.st }, { nom: "Yengi", club: "Aberdeen", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Arabie Saoudite", drapeau: "🇸🇦", formation: "4-3-3", joueurs: [
      { nom: "Al-Owais", club: "Al-Hilal", poste: P.GK, ...pos.gk }, { nom: "Abdulhamid", club: "AS Roma", poste: P.DEF, ...pos.rb }, { nom: "Al-Amri", club: "Al-Ahli", poste: P.DEF, ...pos.rcb }, { nom: "Al-Bulayhi", club: "Al-Hilal", poste: P.DEF, ...pos.lcb }, { nom: "Kadesh", club: "Al-Ittihad", poste: P.DEF, ...pos.lb }, { nom: "Kanno", club: "Al-Hilal", poste: P.MID, ...pos.rm }, { nom: "Al-Malki", club: "Al-Hilal", poste: P.MID, ...pos.cm }, { nom: "Al-Dawsari", club: "Al-Hilal", poste: P.MID, ...pos.lm }, { nom: "Al-Shehri", club: "Al-Hilal", poste: P.FWD, ...pos.rw }, { nom: "Al-Buraikan", club: "Al-Ahli", poste: P.FWD, ...pos.st }, { nom: "Ghareeb", club: "Al-Ittihad", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Ouzbékistan", drapeau: "🇺🇿", formation: "4-3-3", joueurs: [
      { nom: "Yusupov", club: "Navbahor", poste: P.GK, ...pos.gk }, { nom: "Alijonov", club: "Pakhtakor", poste: P.DEF, ...pos.rb }, { nom: "Khusanov", club: "Manchester City", poste: P.DEF, ...pos.rcb }, { nom: "Ashurmatov", club: "Esteghlal", poste: P.DEF, ...pos.lcb }, { nom: "Sayfiev", club: "Neftchi", poste: P.DEF, ...pos.lb }, { nom: "Shukurov", club: "Baniyas", poste: P.MID, ...pos.rm }, { nom: "Hamrobekov", club: "Tractor", poste: P.MID, ...pos.cm }, { nom: "Urunov", club: "Persepolis", poste: P.MID, ...pos.lm }, { nom: "Fayzullaev", club: "CSKA Moscou", poste: P.FWD, ...pos.rw }, { nom: "Masharipov", club: "Navbahor", poste: P.FWD, ...pos.st }, { nom: "Shomurodov", club: "Istanbul Başakşehir", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Jordanie", drapeau: "🇯🇴", formation: "4-3-3", joueurs: [
      { nom: "Abu Laila", club: "Al-Jabalain", poste: P.GK, ...pos.gk }, { nom: "Haddad", club: "Al-Faisaly", poste: P.DEF, ...pos.rb }, { nom: "Nasib", club: "Al-Hussein", poste: P.DEF, ...pos.rcb }, { nom: "Al-Arab", club: "Al-Shorta", poste: P.DEF, ...pos.lcb }, { nom: "Abu Hashish", club: "Al-Karma", poste: P.DEF, ...pos.lb }, { nom: "Al-Rawabdeh", club: "Selangor", poste: P.MID, ...pos.rm }, { nom: "Al-Rashdan", club: "Qatar SC", poste: P.MID, ...pos.cm }, { nom: "Sa'deh", club: "Al-Karma", poste: P.MID, ...pos.lm }, { nom: "Al-Taamari", club: "Stade Rennais", poste: P.FWD, ...pos.rw }, { nom: "Al-Mardi", club: "Al-Hussein", poste: P.FWD, ...pos.st }, { nom: "Al-Naimat", club: "Al-Ahli (Doha)", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Qatar", drapeau: "🇶🇦", formation: "4-3-3", joueurs: [
      { nom: "Barsham", club: "Al-Sadd", poste: P.GK, ...pos.gk }, { nom: "Pedro Miguel", club: "Al-Sadd", poste: P.DEF, ...pos.rb }, { nom: "Khoukhi", club: "Al-Duhail", poste: P.DEF, ...pos.rcb }, { nom: "Mendes", club: "Al-Wakrah", poste: P.DEF, ...pos.lcb }, { nom: "Ahmed", club: "Al-Sadd", poste: P.DEF, ...pos.lb }, { nom: "Hatem", club: "Al-Rayyan", poste: P.MID, ...pos.rm }, { nom: "Fatehi", club: "Al-Arabi", poste: P.MID, ...pos.cm }, { nom: "Al-Haydos", club: "Al-Sadd", poste: P.MID, ...pos.lm }, { nom: "Afif", club: "Al-Sadd", poste: P.FWD, ...pos.rw }, { nom: "Ali", club: "Al-Duhail", poste: P.FWD, ...pos.st }, { nom: "Abdurisag", club: "Al-Duhail", poste: P.FWD, ...pos.lw }]
  },

  {
    pays: "Irak", drapeau: "🇮🇶", formation: "3-3-4", joueurs: [
      { nom: "Al Ammari", club: "Al-Quwa Al-Jawiya", poste: P.GK, ...pos.gk }, { nom: "Nadhim", club: "Al-Quwa Al-Jawiya", poste: P.DEF, ...pos.rcb3 }, { nom: "Tahseen", club: "Al-Shorta", poste: P.DEF, ...pos.cb3 }, { nom: "Adnan", club: "Umeå FC", poste: P.DEF, ...pos.lcb3 }, { nom: "Attwan", club: "Al-Shorta", poste: P.MID, ...pos.rcm334 }, { nom: "Iqbal", club: "FC Utrecht", poste: P.MID, ...pos.cm334 }, { nom: "Amyn", club: "(Club chypriote)", poste: P.MID, ...pos.lcm334 }, { nom: "Jasim", club: "Como 1907", poste: P.FWD, ...pos.rw424 }, { nom: "Ali", club: "Al-Arabi", poste: P.FWD, ...pos.rs424 }, { nom: "Al Hamadi", club: "Luton Town", poste: P.FWD, ...pos.ls424 }, { nom: "Hussein", club: "Persepolis", poste: P.FWD, ...pos.lw424 }]
  },

  // ═══ OFC - Océanie ═══
  {
    pays: "Nouvelle-Zélande", drapeau: "🇳🇿", formation: "4-3-3", joueurs: [
      { nom: "Sail", club: "Orlando City", poste: P.GK, ...pos.gk }, { nom: "Payne", club: "Adelaide United", poste: P.DEF, ...pos.rb }, { nom: "Boxall", club: "Nashville SC", poste: P.DEF, ...pos.rcb }, { nom: "Surman", club: "Portland Timbers", poste: P.DEF, ...pos.lcb }, { nom: "Cacace", club: "Empoli", poste: P.DEF, ...pos.lb }, { nom: "Bell", club: "Viking FK", poste: P.MID, ...pos.rm }, { nom: "Stamenić", club: "Rapid Vienne", poste: P.MID, ...pos.cm }, { nom: "Singh", club: "PSV Eindhoven", poste: P.MID, ...pos.lm }, { nom: "Waine", club: "San Diego FC", poste: P.FWD, ...pos.rw }, { nom: "Wood", club: "Burnley", poste: P.FWD, ...pos.st }, { nom: "Thomas", club: "Auckland FC", poste: P.FWD, ...pos.lw }]
  },
];