export default function Instituciones({ category, lang }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-zinc-100">
        {category.label?.[lang] ?? "Instituciones"}
      </h2>

      <p className="mt-2 text-zinc-300">
        Acá va el contenido exclusivo del Instituciones (introducción, notas
        editoriales, etc.).
      </p>

      {/* Podés meter componentes propios */}
      <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-200">
        Componente especial solo para Instituciones
      </div>
    </div>
  );
}
