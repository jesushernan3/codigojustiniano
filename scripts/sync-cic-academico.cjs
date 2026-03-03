const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const BASE = "https://droitromain.univ-grenoble-alpes.fr";

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

async function getHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (sync script)" },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return await res.text();
}

// Convierte texto a slug simple para anchors (si luego querés TOC interno)
function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// Extrae texto del body preservando saltos de línea (lo más posible)
function bodyTextLines(html) {
  const $ = cheerio.load(html);
  $("script, style, noscript").remove();

  // Insertamos saltos de línea donde normalmente hay cortes
  $("br").replaceWith("\n");
  $("p").prepend("\n").append("\n");
  $("li").prepend("\n* ").append("\n");
  $("h1,h2,h3,h4,pre,blockquote,hr").prepend("\n").append("\n");

  const raw = $("body").text();

  return raw
    .replace(/\r/g, "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

// Detectores de patrones (Codex)
const reIndexItem = /^\*\s*(\d+\.\d+\.\d+)\.\s*(.+)$/; // * 1.1.0. Título
const reMainTitle = /^(\d+\.\d+\.\d+)\.\s*(.+)$/; // 1.1.0. Título
const reSubNumber = /^(\d+\.\d+\.\d+)$/; // 1.1.1
const reStars = /^\*\s*\*\s*\*$/; // * * *

function looksLikeBoilerplate(line) {
  // Filtra ruido típico (ajustable)
  if (line.startsWith("(") && line.toLowerCase().includes("krueger"))
    return true;
  if (line.toLowerCase().includes("the roman law library")) return true;
  return false;
}

function convertLinesToAcademicMarkdown(
  lines,
  { sectionId, bookLabel, sourceUrl },
) {
  let md = [];
  let inIndex = false;
  let indexItems = [];

  // 1) Recortar “cabecera” hasta que empiece el índice (primer * 1.?.?.)
  let startAt = 0;
  for (let i = 0; i < lines.length; i++) {
    if (reIndexItem.test(lines[i])) {
      startAt = i;
      break;
    }
  }
  const sliced = lines.slice(startAt);

  // 2) Primer bloque: índice (bullets * 1.1.0....)
  for (let i = 0; i < sliced.length; i++) {
    const line = sliced[i];

    if (reIndexItem.test(line)) {
      inIndex = true;
      const [, num, title] = line.match(reIndexItem);
      indexItems.push({ num, title });
      continue;
    }

    // termina el índice cuando aparece el separador o el primer main title
    if (inIndex && (reStars.test(line) || reMainTitle.test(line))) {
      break;
    }
  }

  // Frontmatter mínimo
  md.push(
    `---`,
    `source: "${sourceUrl}"`,
    `section: "${sectionId}"`,
    `book: "${bookLabel}"`,
    `---`,
    ``,
    `# ${bookLabel}`,
    ``,
  );

  if (indexItems.length) {
    md.push(`## Índice`, ``);
    for (const it of indexItems) {
      // Anchor sugerido (opcional)
      const id = slugify(`${it.num}-${it.title}`);
      md.push(`- [${it.num} — ${it.title}](#${id})`);
    }
    md.push(``);
  }

  // 3) Cuerpo: recorrer todo y convertir a headings
  for (let i = 0; i < sliced.length; i++) {
    const line = sliced[i];

    if (looksLikeBoilerplate(line)) continue;

    // ignora separadores
    if (reStars.test(line)) {
      md.push(`---`, ``);
      continue;
    }

    // saltar el índice duplicado (las mismas líneas que ya usamos)
    if (reIndexItem.test(line)) continue;

    // main title: 1.1.0. ...
    if (reMainTitle.test(line)) {
      const [, num, title] = line.match(reMainTitle);
      const id = slugify(`${num}-${title}`);
      md.push(`### ${num} — ${title}`, `{#${id}}`, ``); // {#id} estilo “opcional”
      continue;
    }

    // sub number: 1.1.1
    if (reSubNumber.test(line)) {
      md.push(`#### ${line}`, ``);
      continue;
    }

    // resto: párrafos (mantenemos tal cual)
    md.push(line, ``);
  }

  // Limpieza final: quita exceso de líneas
  return (
    md
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim() + "\n"
  );
}

async function getLinksFromIndex(indexUrl) {
  const html = await getHtml(indexUrl);
  const $ = cheerio.load(html);

  const links = [];
  $("a[href]").each((_, a) => {
    const href = $(a).attr("href");
    if (!href) return;
    if (!/\.(htm|html)$/i.test(href)) return;

    const abs = href.startsWith("http")
      ? href
      : new URL(href, indexUrl).toString();

    if (!abs.startsWith(BASE)) return;
    links.push(abs);
  });

  // dedupe manteniendo orden
  const seen = new Set();
  const uniq = [];
  for (const u of links) {
    if (!seen.has(u)) {
      seen.add(u);
      uniq.push(u);
    }
  }
  return uniq;
}

function filenameFor(i, pad) {
  return String(i).padStart(pad, "0") + ".md";
}

async function run() {
  console.log("🚀 Sync académico CIC");

  const sections = [
    { id: "codex", index: `${BASE}/Corpus/codjust.htm`, pad: 2 },
    { id: "digesto", index: `${BASE}/Corpus/digest.htm`, pad: 2 },
    { id: "instituciones", index: `${BASE}/Corpus/iust_institut.html`, pad: 2 },
    { id: "novelas", index: `${BASE}/Corpus/Novellae.htm`, pad: 3 },
  ];

  ensureDir("content");

  for (const s of sections) {
    console.log(`\n📚 Sección: ${s.id}`);
    const outDir = path.join("content", s.id);
    ensureDir(outDir);

    const links = await getLinksFromIndex(s.index);
    console.log(`🔗 Links encontrados: ${links.length}`);

    let i = 1;
    for (const url of links) {
      const html = await getHtml(url);
      const lines = bodyTextLines(html);

      // etiqueta simple de “Libro i”
      const bookLabel = s.id === "novelas" ? `Novela ${i}` : `Libro ${i}`;

      const md = convertLinesToAcademicMarkdown(lines, {
        sectionId: s.id,
        bookLabel,
        sourceUrl: url,
      });

      const outFile = filenameFor(i, s.pad);
      fs.writeFileSync(path.join(outDir, outFile), md, "utf8");
      console.log("✅", s.id, outFile);

      i++;
    }
  }

  console.log("\n✅ Listo. Revisa /content/*/*.md");
}

run().catch((e) => {
  console.error("❌ Error:", e?.stack || e);
  process.exit(1);
});
