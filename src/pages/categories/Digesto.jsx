export default function Digesto({ category, lang }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">
        {category.label?.[lang] ?? "Digesto"}
      </h2>

      <p className="mt-2 text-zinc-500">
        El Digesto (Digesta), o Pandectas (Pandectae), formaba parte de la gran
        colección de leyes romanas conocida como el Corpus Iuris Civilis. El
        Digesto se publicó en el año 533 d. C. bajo la dirección del cuestor
        imperial Triboniano. Recopilaba los escritos de los grandes juristas
        romanos, como Ulpiano, junto con los edictos vigentes. Constituyó tanto
        el derecho vigente de la época como un punto de inflexión en el Derecho
        romano: a partir de entonces, la jurisprudencia, a veces contradictoria,
        del pasado se integró en un sistema jurídico ordenado.
      </p>
    </div>
  );
}
