import { Link, useParams, useOutletContext } from "react-router";
import Codex from "../../pages/categories/Codex";
import Digesto from "../../pages/categories/Digesto";
import Instituciones from "../../pages/categories/Instituciones";
import Novelas from "../../pages/categories/Novelas";

const CATEGORY_PAGES = {
  codex: Codex,
  digesto: Digesto,
  instituciones: Instituciones,
  novelas: Novelas,
};

export default function CategoryIndex() {
  const { categorySlug } = useParams();
  const { category, lang } = useOutletContext();

  const Page = CATEGORY_PAGES[categorySlug];

  return (
    <div>
      {/* Si existe una página custom, la renderizás */}
      {Page ? (
        <Page category={category} lang={lang} />
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-zinc-500">
            {category.label?.[lang] ?? categorySlug}
          </h2>
          <p className="mt-2 text-zinc-300">Página genérica de categoría.</p>
        </div>
      )}

      {/* Igual podés listar libros abajo (común para todas) DESACTIVADO POR AHORA */}
      {/* <h3 className="mt-8 text-sm uppercase tracking-wider text-zinc-400">
        Libros
      </h3> */}
      {/* <div className="mt-3 grid gap-2">
        {category.books.map((book) => (
          <Link
            key={book.id}
            to={book.id} 
            className="rounded-xl border border-zinc-200  px-4 py-3 text-zinc-400 hover:bg-zinc-900"
          >
            {book.title?.[lang] ?? `Libro ${book.id}`}
          </Link>
        ))}
      </div> */}
    </div>
  );
}
