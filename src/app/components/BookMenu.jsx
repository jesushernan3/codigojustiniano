import { NavLink } from "react-router";
import { getText } from "../../utils/getText";

export default function BookMenu({
  lang = "es",
  categorySlug,
  books = [],
  currentBookId = null,
}) {
  const base = "flex items-start rounded-md px-3 py-2 text-sm transition";

  const active = "bg-zinc-100 text-zinc-900 font-medium";
  const inactive = "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900";

  const getTitle = (book) => getText(book.title, lang) || `Libro ${book.id}`;
  const isShort = (title) => title.length < 15;
  const longBooks = books.filter((book) => !isShort(getTitle(book)));
  const shortBooks = books.filter((book) => isShort(getTitle(book)));

  return (
    <nav className="mt-3 space-y-4">
      {/* INTRO */}
      <NavLink
        to={`/${lang}/${categorySlug}`}
        end
        className={({ isActive }) =>
          [base, "w-full justify-between", isActive ? active : inactive].join(
            " ",
          )
        }>
        {lang === "en"
          ? "Introduction"
          : lang === "la"
            ? "Introductio"
            : "Introducción"}
      </NavLink>

      {/* LIBROS LARGOS (vertical) */}
      {longBooks.length > 0 && (
        <div className="space-y-1">
          {longBooks.map((book) => (
            <NavLink
              key={book.id}
              to={`/${lang}/${categorySlug}/${book.id}`}
              className={({ isActive }) =>
                [
                  base,
                  "w-full justify-between",
                  isActive ? active : inactive,
                ].join(" ")
              }>
              <span className="whitespace-normal break-words leading-relaxed">
                {getTitle(book)}
              </span>

              {String(book.id) === String(currentBookId) && (
                <span className="text-xs text-zinc-400">•</span>
              )}
            </NavLink>
          ))}
        </div>
      )}

      {/* LIBROS CORTOS (chips) */}
      {shortBooks.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-200">
          {shortBooks.map((book) => (
            <NavLink
              key={book.id}
              to={`/${lang}/${categorySlug}/${book.id}`}
              className={({ isActive }) =>
                [base, "w-fit", isActive ? active : inactive].join(" ")
              }>
              {getTitle(book)}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
