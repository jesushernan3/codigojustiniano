import { useParams, useOutletContext, Link } from "react-router";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { BOOKS_DB } from "../content/bookDb";
import { tocStringFromBody, parseTocString } from "../lib/bookToc";

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function Book() {
  const { categorySlug, bookId } = useParams();

  const key = `${categorySlug}/${bookId}`;
  const record = BOOKS_DB[key];

  if (!record) throw new Response("Book not found", { status: 404 });

  // 4 partes, todas strings
  const title = String(record.title);
  const date = String(record.date);
  const body = String(record.body);

  // Links string (JSON string)
  const links = useMemo(() => tocStringFromBody(body), [body]);

  // Para renderizar el menú, lo parseamos (esto ya no es “DB”; es UI)
  const tocItems = useMemo(() => parseTocString(links), [links]);

  return (
    <section className="bg-white text-zinc-800">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          {/* CONTENIDO PRINCIPAL */}
          <main className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-8">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              {title}
            </h1>

            <div className="mt-2 text-sm text-zinc-500">Fecha: {date}</div>

            <div className="mt-8 prose max-w-none prose-headings:text-zinc-900 prose-p:text-zinc-700 prose-li:text-zinc-700">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h3: ({ children }) => {
                    const text = String(children);
                    const id = slugify(text);
                    return <h3 id={id}>{children}</h3>;
                  },
                  h4: ({ children }) => {
                    const text = String(children);
                    const id = slugify(text);
                    return <h4 id={id}>{children}</h4>;
                  },
                }}
              >
                {body}
              </ReactMarkdown>
            </div>
          </main>

          {/* ASIDE DERECHO (BookMenu / TOC) */}
          <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="text-xs uppercase tracking-wider text-zinc-500">
              Navegación
            </div>

            <div className="mt-4 space-y-2">
              {tocItems.length === 0 ? (
                <div className="text-sm text-zinc-400">—</div>
              ) : (
                tocItems.map((it) => (
                  <a
                    key={it.id}
                    href={`#${it.id}`}
                    className={[
                      "block rounded-xl px-3 py-2 text-sm border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 transition-colors",
                      it.level === "4" ? "ml-4 text-zinc-600" : "",
                    ].join(" ")}
                  >
                    {it.text}
                  </a>
                ))
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
