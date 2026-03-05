export function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function tocFromMarkdown(md) {
  // acepta espacios al inicio
  return Array.from(md.matchAll(/^\s*(#{3,4})\s+(.+)\s*$/gm)).map((m) => ({
    level: m[1].length,
    text: m[2].trim(),
    id: slugify(m[2]),
  }));
}
