import { NavLink } from "react-router";

export default function BookMenu({ categorySlug, books, currentBookId, lang }) {
  const base =
    "inline-flex items-center rounded-md px-3 py-2 text-sm transition";

  const active = "bg-zinc-100 text-zinc-900 font-medium";
  const inactive = "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900";

  const getTitle = (book) => book.title?.[lang] ?? `Libro ${book.id}`;

  const isShort = (title) => title.length < 20;

  const longBooks = books.filter((b) => !isShort(getTitle(b)));
  const shortBooks = books.filter((b) => isShort(getTitle(b)));

  return (
    <nav className="mt-3 space-y-4">
      {/* INTRO */}
      <NavLink
        to={`/${categorySlug}`}
        end
        className={({ isActive }) =>
          [base, "w-full justify-between", isActive ? active : inactive].join(
            " ",
          )
        }>
        Introducción
      </NavLink>

      {/* LIBROS LARGOS (vertical) */}
      {longBooks.length > 0 && (
        <div className="space-y-1">
          {longBooks.map((book) => (
            <NavLink
              key={book.id}
              to={`/${categorySlug}/${book.id}`}
              className={({ isActive }) =>
                [
                  base,
                  "w-full justify-between",
                  isActive ? active : inactive,
                ].join(" ")
              }>
              <span className="truncate">{getTitle(book)}</span>

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
              to={`/${categorySlug}/${book.id}`}
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
