function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Devuelve un string JSON con items:
 * [{ id: "contexto", text: "Contexto", level: "3" }, ...]
 * O sea: TODO string en la salida final.
 */
export function tocStringFromBody(body) {
  const items = Array.from(body.matchAll(/^(#{3,4})\s+(.+)$/gm)).map((m) => {
    const level = String(m[1].length); // "3" o "4"
    const text = String(m[2]).trim(); // heading text
    const id = slugify(text); // anchor id
    return { id, text, level }; // campos strings al serializar
  });

  return JSON.stringify(items);
}

/** Para renderizar el menú, parseamos el string */
export function parseTocString(tocStr) {
  try {
    const arr = JSON.parse(tocStr);
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch {
    return [];
  }
}
