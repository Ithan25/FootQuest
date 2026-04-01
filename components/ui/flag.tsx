/**
 * Country flag component using flagcdn.com SVGs.
 * Works on all platforms (unlike flag emojis on Windows).
 */

/** ISO 3166-1 alpha-2 country codes */
const COUNTRY_CODES: Record<string, string> = {
  "France": "fr",
  "Argentine": "ar",
  "Brésil": "br",
  "Angleterre": "gb-eng",
  "Espagne": "es",
  "Portugal": "pt",
  "Allemagne": "de",
  "Pays-Bas": "nl",
  "Belgique": "be",
  "Maroc": "ma",
  "États-Unis": "us",
  "Japon": "jp",
  "Italie": "it",
  "Croatie": "hr",
  "Uruguay": "uy",
  "Colombie": "co",
  "Sénégal": "sn",
  "Mexique": "mx",
  "Suisse": "ch",
  "Nigeria": "ng",
  "Cameroun": "cm",
  "Ghana": "gh",
  "Corée du Sud": "kr",
  "Australie": "au",
  "Arabie Saoudite": "sa",
  "Iran": "ir",
  "Qatar": "qa",
  "Canada": "ca",
  "Équateur": "ec",
  "Pérou": "pe",
  "Chili": "cl",
  "Paraguay": "py",
  "Venezuela": "ve",
  "Bolivie": "bo",
  "Costa Rica": "cr",
  "Honduras": "hn",
  "Panama": "pa",
  "Jamaïque": "jm",
  "Tunisie": "tn",
  "Algérie": "dz",
  "Égypte": "eg",
  "Afrique du Sud": "za",
  "RD Congo": "cd",
  "Mali": "ml",
  "Côte d'Ivoire": "ci",
  "Tanzanie": "tz",
  "Ouganda": "ug",
  "Pologne": "pl",
  "Autriche": "at",
  "Danemark": "dk",
  "Suède": "se",
  "Norvège": "no",
  "Écosse": "gb-sct",
  "Pays de Galles": "gb-wls",
  "Irlande": "ie",
  "Serbie": "rs",
  "Turquie": "tr",
  "Grèce": "gr",
  "Roumanie": "ro",
  "Ukraine": "ua",
  "République tchèque": "cz",
  "Hongrie": "hu",
  "Slovaquie": "sk",
  "Slovénie": "si",
  "Albanie": "al",
  "Géorgie": "ge",
  "Israël": "il",
  "Ouzbékistan": "uz",
  "Irak": "iq",
  "Jordanie": "jo",
  "Chine": "cn",
  "Indonésie": "id",
  "Thaïlande": "th",
  "Vietnam": "vn",
  "Inde": "in",
  "Bahreïn": "bh",
  "Trinité-et-Tobago": "tt",
  "El Salvador": "sv",
  "Guatemala": "gt",
  "Haïti": "ht",
  "Cuba": "cu",
  "Nouvelle-Zélande": "nz",
  "Bosnie-Herzégovine": "ba",
  "Curaçao": "cw",
  "Cap-Vert": "cv",
};

function getCountryCode(country: string): string | null {
  return COUNTRY_CODES[country] || null;
}

function getFlagUrl(countryCode: string, size: number = 40): string {
  return `https://flagcdn.com/${size === 16 ? "16x12" : size === 24 ? "24x18" : "40x30"}/${countryCode}.png`;
}

interface FlagProps {
  country: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Flag({ country, size = "md", className = "" }: FlagProps) {
  const code = getCountryCode(country);
  const sizeMap = { sm: 16, md: 24, lg: 40 } as const;
  const px = sizeMap[size];
  const dimMap = { sm: "w-4 h-3", md: "w-6 h-[18px]", lg: "w-10 h-[30px]" } as const;

  if (!code) {
    return <span className={`inline-block text-center ${className}`}>{country.slice(0, 2).toUpperCase()}</span>;
  }

  return (
    <img
      src={getFlagUrl(code, px)}
      alt={`Drapeau ${country}`}
      className={`inline-block rounded-[2px] object-cover ${dimMap[size]} ${className}`}
      loading="lazy"
    />
  );
}

export { getCountryCode, getFlagUrl };
