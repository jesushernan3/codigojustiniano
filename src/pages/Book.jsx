import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";

import { loadBookMarkdown } from "../lib/contentLoader.js";
import { stripFrontmatter, splitFirstH1 } from "../lib/mdUtils.js";
import BackToTopButton from "../app/components/BackToTopButton.jsx";
// fallback: "01.de_novo_codice_componendo.md" -> "De novo codice componendo"
function titleFromPath(filePath) {
  if (!filePath) return "";
  const base = filePath.split("/").pop() || "";
  const noExt = base.replace(/\.md$/i, "");
  const noPrefix = noExt.replace(/^\d+[._-]*/, "");
  const spaced = noPrefix.replace(/[_\-]+/g, " ").trim();
  return spaced ? spaced[0].toUpperCase() + spaced.slice(1) : "";
}

export default function Book() {
  const { categorySlug, bookId } = useParams();

  const [rawMd, setRawMd] = useState("");
  const [filePath, setFilePath] = useState("");
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;

    setErr(null);
    setRawMd("");
    setFilePath("");

    loadBookMarkdown(categorySlug, bookId)
      .then(({ raw, path }) => {
        if (!alive) return;
        setFilePath(path || "");
        setRawMd(stripFrontmatter(raw));
      })
      .catch((e) => alive && setErr(e));

    return () => {
      alive = false;
    };
  }, [categorySlug, bookId]);

  const { title: mdTitle, body } = useMemo(() => splitFirstH1(rawMd), [rawMd]);
  const finalTitle = mdTitle || titleFromPath(filePath) || `Libro ${bookId}`;

  if (err) {
    throw err instanceof Response
      ? err
      : new Response("Not found", { status: 404 });
  }

  if (!rawMd) {
    return <div className="text-sm text-zinc-500">Cargando…</div>;
  }

  return (
    <>
      <article className="min-w-0">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            {finalTitle}
          </h1>
        </div>

        <div className="prose prose-zinc max-w-none text-justify">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkSlug]}
            components={{
              // si aparece un H1 dentro del body, lo bajamos a H2
              h1: ({ children }) => (
                <h2 className="text-2xl font-semibold tracking-tight">
                  {children}
                </h2>
              ),
            }}>
            {body}
          </ReactMarkdown>
        </div>
      </article>

      <BackToTopButton showAfter={700} />
    </>
  );
}
