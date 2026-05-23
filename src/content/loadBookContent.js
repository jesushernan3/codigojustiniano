const modules = import.meta.glob("../**/*.js", {
  eager: true,
});

export function getBookContent(categorySlug, file) {
  const path = `./${categorySlug}/${file}.js`;

  const module = modules[path];

  if (!module) {
    console.warn(`No se encontró contenido para: ${path}`);
    return null;
  }

  return module.default;
}
