import { Navigate, useParams } from "react-router";

import BookMenu from "./BookMenu";
import BookContent from "./BookContent";
import BackToTop from "../components/BackToTop";

import { toc } from "../../data/toc";
import { getBookContent } from "../../content/loadBookContent";
import { getSafeLang, isValidLang } from "../../data/languages";

export default function Book() {
  const { lang, categorySlug, bookId } = useParams();

  const category = toc.find((item) => item.id === categorySlug);

  if (!isValidLang(lang)) {
    return <Navigate to={`/es/${categorySlug}/${bookId}`} replace />;
  }

  const safeLang = getSafeLang(lang);

  if (!category) {
    return <p>Ruta o categoría no encontrada.</p>;
  }

  const book = category.books.find((item) => item.id === bookId);

  if (!book) {
    return <p>No se encontró el libro.</p>;
  }

  const content = getBookContent(categorySlug, book.file);

  if (!content) {
    return (
      <p className="block text-center">
        No se encontró el contenido del libro.
      </p>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="bg-white p-5 rounded-md">
        <BookMenu
          lang={safeLang}
          categorySlug={categorySlug}
          books={category.books || []}
          currentBookId={bookId}
        />
      </aside>

      <main className="min-w-0 bg-white p-5 rounded-md scroll-smooth">
        <BookContent content={content} lang={safeLang} />
      </main>

      <BackToTop lang={lang} />
    </div>
  );
}
