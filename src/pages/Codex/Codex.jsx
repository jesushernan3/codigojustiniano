import React from "react";
import MenuCodex from "../../components/ui/MenuCodex";

const Codex = () => {
  return (
    <>
      <div className="col-span-3 pr-5">
        <h2 className="text-3xl mb-1">CODEX IUSTINIANO</h2>
        <p className="text-2xl text-gray-600 mb-5 font-semibold">
          Reconocidovía y retractavit Paulus Krueger
        </p>
        <p>
          El Código de Justiniano (Codex Iustinianus) forma parte del Corpus
          Iuris Civilis. Recoge las constituciones de los emperadores romanos.
          El estatuto más antiguo conservado en el código fue promulgado por el
          emperador Adriano; los últimos provienen del propio Justiniano. Los
          compiladores del código pudieron basarse en obras anteriores como el
          Codex Theodosianus oficial y colecciones privadas como el Codex
          Gregorianus y el Codex Hermogenianus. Debido a reformas legales del
          propio Justiniano, esta obra necesitó ser actualizada posteriormente,
          por lo que se publicó una segunda edición del Códice en el año 534,
          después del Digesto.{" "}
        </p>
      </div>
      <aside className="pl-5 col-span-1">
        <MenuCodex />
      </aside>
    </>
  );
};

export default Codex;
