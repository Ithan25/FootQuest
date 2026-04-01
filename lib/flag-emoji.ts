/**
 * Map of country names (in French) to their ISO 3166-1 alpha-2 codes.
 * Used across Scout Master and Missing Piece games.
 */
const COUNTRY_CODES: Record<string, string> = {
  // Major football nations
  France: "FR",
  Brésil: "BR",
  Argentine: "AR",
  Allemagne: "DE",
  Angleterre: "GB-ENG", // special case
  Espagne: "ES",
  Portugal: "PT",
  Italie: "IT",
  "Pays-Bas": "NL",
  Belgique: "BE",
  Croatie: "HR",
  Uruguay: "UY",
  Colombie: "CO",
  Sénégal: "SN",
  Japon: "JP",
  "États-Unis": "US",
  Maroc: "MA",
  Cameroun: "CM",
  Ghana: "GH",
  Nigeria: "NG",
  Mexique: "MX",
  "Corée du Sud": "KR",
  Australie: "AU",
  Suisse: "CH",
  Danemark: "DK",
  Pologne: "PL",
  Turquie: "TR",
  Autriche: "AT",
  Serbie: "RS",
  Écosse: "GB-SCT",
  "Pays de Galles": "GB-WLS",
  Norvège: "NO",
  Suède: "SE",
};

/**
 * Convert an ISO 3166-1 alpha-2 country code to its flag emoji.
 * Works by converting each letter to a Regional Indicator Symbol.
 */
export function codeToFlag(code: string): string {
  // Handle UK constituent countries
  if (code === "GB-ENG") return "🏴󠁧󠁢󠁥󠁮󠁧󠁿";
  if (code === "GB-SCT") return "🏴󠁧󠁢󠁳󠁣󠁴󠁿";
  if (code === "GB-WLS") return "🏴󠁧󠁢󠁷󠁬󠁳󠁿";

  const base = code
    .toUpperCase()
    .split("")
    .map((c) => 0x1f1e6 + c.charCodeAt(0) - 65);
  return String.fromCodePoint(...base);
}

/**
 * Get a flag emoji from a country name (French).
 * Falls back to 🏳️ if country is not found.
 */
export function countryToFlag(countryName: string): string {
  const code = COUNTRY_CODES[countryName];
  if (!code) return "🏳️";
  return codeToFlag(code);
}

/**
 * Get all available country names (for autocomple / search).
 */
export function getCountryNames(): string[] {
  return Object.keys(COUNTRY_CODES);
}
