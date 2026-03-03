import { Outlet, useParams, useLocation } from "react-router";
import toc from "../../content/toc.json";
import BookMenu from "../components/BookMenu.jsx";

function getCategory(categorySlug) {
  return toc.sections.find((s) => s.id === categorySlug) || null;
}

export default function CategoryLayout() {
  const { categorySlug } = useParams();
  const location = useLocation();

  const category = getCategory(categorySlug);

  if (!category) {
    throw new Response("Category not found", { status: 404 });
  }

  const lang = "es";

  // Detecta si estás dentro de un libro: /codex/1
  const parts = location.pathname.split("/").filter(Boolean);
  const bookId = parts.length >= 2 ? parts[1] : null;
  const currentBook = bookId
    ? category.books.find((b) => b.id === bookId) || null
    : null;

  return (
    <section className="min-h-[calc(100vh-56px)] bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          {/* ASIDE: estilo docs */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                {currentBook ? "Libro" : "Categoría"}
              </div>

              <div className="mt-2 text-base font-semibold tracking-tight text-zinc-900">
                {currentBook
                  ? (currentBook.title?.[lang] ?? `Libro ${currentBook.id}`)
                  : (category.label?.[lang] ?? categorySlug)}
              </div>

              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {currentBook
                  ? "Estás navegando este libro. Elegí otro desde el menú."
                  : "Elegí un libro para comenzar a leer."}
              </p>

              <div className="mt-5 border-t border-zinc-200 pt-5">
                <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Libros
                </div>

                <div className="mt-3">
                  <BookMenu
                    categorySlug={categorySlug}
                    books={category.books}
                    currentBookId={bookId}
                    lang={lang}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* CONTENIDO */}
          <main className="min-w-0">
            <div className="rounded-xl border border-zinc-200 bg-white px-6 py-7 md:px-10 md:py-10">
              <div className="mx-auto max-w-3xl">
                <Outlet context={{ category, lang, currentBook }} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
