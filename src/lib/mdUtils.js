// Quita el frontmatter SI está al inicio del archivo:
// ---
// lo que sea: "string"
// ---
export function stripFrontmatter(md) {
  const s = String(md ?? "");

  // Solo si arranca con --- en la primera línea
  if (!s.startsWith("---")) return s;

  // Captura el primer bloque de frontmatter al inicio
  // (---\n ... \n---\n)
  const cleaned = s.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, "");
  return cleaned;
}

// Extrae el primer H1 "# ..." (si existe) y devuelve { title, body }
export function splitFirstH1(md) {
  const lines = String(md ?? "").split("\n");

  // Saltar líneas vacías iniciales
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i++;

  // Si la primera línea no es H1, devolvemos sin title
  if (i >= lines.length || !lines[i].startsWith("# ")) {
    return { title: "", body: String(md ?? "") };
  }

  const title = lines[i].slice(2).trim(); // quita "# "
  // cuerpo = todo lo que sigue
  const body = lines
    .slice(i + 1)
    .join("\n")
    .replace(/^\n+/, "");
  return { title, body };
}
