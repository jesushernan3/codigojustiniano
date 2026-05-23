export function getText(value, lang = "es") {
  if (!value) return "";

  if (typeof value === "string") {
    return value;
  }

  return value[lang] || value.es || value.la || value.en || "";
}
