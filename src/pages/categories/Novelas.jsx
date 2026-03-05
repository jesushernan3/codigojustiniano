export default function Novelas({ category, lang }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">
        {category.label?.[lang] ?? "Novelas"}
      </h2>

      <p className="mt-2 text-zinc-500">
        Las Novelas de Justiniano (Novellae) forman parte del Corpus Iuris
        Civilis. La mayoría se publicaron en griego. Las primeras datan del año
        535 d. C. y las segundas del 565, pero la mayoría se publicaron entre
        535 y 539. Sin embargo, no parece que apareciera ninguna compilación
        oficial de estas nuevas constituciones en la época de Justiniano. El
        texto griego consta de 168 novelas: 159 fueron compuestas durante el
        reinado de Justiniano y el resto pertenece a Justino II y a Tiberio.
      </p>
    </div>
  );
}
