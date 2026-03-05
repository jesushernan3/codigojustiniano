export function resolveTitle({ mdTitle, tocTitle, filePath }) {
  if (mdTitle) return mdTitle;

  if (tocTitle) return tocTitle;

  if (!filePath) return "";

  // ejemplo: 01.de_novo_codice_componendo.md
  const name = filePath
    .split("/")
    .pop()
    .replace(/^\d+\./, "") // quita 01.
    .replace(".md", "")
    .replace(/[_\-]/g, " ");

  return name.charAt(0).toUpperCase() + name.slice(1);
}
