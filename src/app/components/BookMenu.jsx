import { NavLink } from "react-router";

export default function BookMenu({ categorySlug, books, currentBookId, lang }) {
  const base = "block rounded-md px-2.5 py-2 text-sm transition-colors";

  const active = "bg-zinc-100 text-zinc-900 font-medium";

  const inactive = "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900";

  return (
    <nav className="mt-3 space-y-1">
      <NavLink
        to={`/${categorySlug}`}
        end
        className={({ isActive }) =>
          [base, isActive ? active : inactive].join(" ")
        }
      >
        Introducción
      </NavLink>

      {books.map((book) => (
        <NavLink
          key={book.id}
          to={`/${categorySlug}/${book.id}`}
          className={({ isActive }) =>
            [base, isActive ? active : inactive].join(" ")
          }
        >
          <div className="flex items-center justify-between gap-3">
            <span className="truncate">
              {book.title?.[lang] ?? `Libro ${book.id}`}
            </span>

            {String(book.id) === String(currentBookId) ? (
              <span className="text-xs text-zinc-400">•</span>
            ) : null}
          </div>
        </NavLink>
      ))}
    </nav>
  );
}
