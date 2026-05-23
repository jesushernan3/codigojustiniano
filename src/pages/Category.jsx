import { Navigate, useParams } from "react-router";

import BookMenu from "../app/components/BookMenu";

import { toc } from "../data/toc";
import { getSafeLang, isValidLang } from "../data/languages";
// import { getText } from "../utils/getText";

import Codex from "./categories/Codex";
import Digesto from "./categories/Digesto";
import Instituciones from "./categories/Instituciones";
import Novelas from "./categories/Novelas";

const categoryComponents = {
  codex: Codex,
  digesto: Digesto,
  instituciones: Instituciones,
  novelas: Novelas,
};

export default function Category() {
  const { lang, categorySlug } = useParams();

  if (!isValidLang(lang)) {
    return <Navigate to={`/es/${categorySlug}`} replace />;
  }

  const safeLang = getSafeLang(lang);

  const category = toc.find((item) => item.id === categorySlug);

  console.log("lang:", lang);
  console.log("categorySlug:", categorySlug);
  console.log(
    "ids disponibles:",
    toc.map((item) => item.id),
  );

  if (!category) {
    return <p>Ruta o contenido no encontrado. (404)</p>;
  }

  const CategoryContent = categoryComponents[category.id];

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="bg-white p-5 rounded-md">
        <BookMenu
          lang={safeLang}
          categorySlug={category.id}
          books={category.books || []}
          currentBookId={null}
        />
      </aside>

      <main className="min-w-0 bg-white p-5 rounded-md">
        {/* <h1 className="mb-6 text-3xl font-semibold tracking-tight">
          {getText(category.label, safeLang)}
        </h1> */}

        <article>
          {CategoryContent ? (
            <CategoryContent category={category} lang={safeLang} />
          ) : (
            <p>No hay contenido cargado para esta categoría.</p>
          )}
        </article>
      </main>
    </div>
  );
}
