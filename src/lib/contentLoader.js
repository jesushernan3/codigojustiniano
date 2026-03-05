// Carga todos los markdown dentro de src/content como string
const MD_MODULES = import.meta.glob("../content/**/*.md", { as: "raw" });

function parseKey(key) {
  // key: "../content/codex/01.de_novo_codice_componendo.md"
  const m = key.match(/^\.\.\/content\/([^/]+)\/(\d+)[^/]*\.md$/i);
  if (!m) return null;

  const category = m[1];
  const numStr = m[2]; // "01" o "1" o "004"
  const bookNum = Number(numStr);
  if (!Number.isFinite(bookNum)) return null;

  return { category, bookNum };
}

// Índice: { codex: { 1: { key, loader }, 2: { key, loader } ... } ... }
const INDEX = (() => {
  const idx = {};
  for (const key of Object.keys(MD_MODULES)) {
    const parsed = parseKey(key);
    if (!parsed) continue;

    const { category, bookNum } = parsed;
    idx[category] ||= {};

    // Si hay duplicado (dos archivos con 01...), el primero gana
    if (!idx[category][bookNum]) {
      idx[category][bookNum] = { key, loader: MD_MODULES[key] };
    }
  }
  return idx;
})();

/**
 * Devuelve SIEMPRE { raw, path }
 */
export async function loadBookMarkdown(categorySlug, bookId) {
  const bookNum = Number(bookId);
  if (!Number.isFinite(bookNum)) {
    throw new Response("Invalid book id", { status: 400 });
  }

  // 1) ruta por índice (rápida)
  const hit = INDEX?.[categorySlug]?.[bookNum];
  if (hit) {
    const raw = await hit.loader();
    return { raw: String(raw), path: hit.key };
  }

  // 2) fallback: buscar por prefijo numérico en esa carpeta (por si el regex falló)
  const prefix = String(bookNum).padStart(2, "0");
  const candidates = Object.keys(MD_MODULES).filter((k) =>
    k.startsWith(`../content/${categorySlug}/${prefix}`),
  );

  if (candidates.length) {
    const key = candidates[0];
    const raw = await MD_MODULES[key]();
    return { raw: String(raw), path: key };
  }

  throw new Response(`Markdown not found for ${categorySlug}/${bookId}`, {
    status: 404,
  });
}

// Debug opcional: qué libros detectó el loader para una categoría
export function listBooks(categorySlug) {
  return Object.keys(INDEX?.[categorySlug] || {})
    .map(Number)
    .sort((a, b) => a - b);
}
