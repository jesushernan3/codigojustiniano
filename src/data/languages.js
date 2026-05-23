export const languages = [
  {
    id: "es",
    label: "Español",
    shortLabel: "ES",
  },
  {
    id: "la",
    label: "Latín",
    shortLabel: "LA",
  },
  {
    id: "en",
    label: "English",
    shortLabel: "EN",
  },
];

export const defaultLang = "es";

export function isValidLang(lang) {
  return languages.some((item) => item.id === lang);
}

export function getSafeLang(lang) {
  return isValidLang(lang) ? lang : defaultLang;
}
