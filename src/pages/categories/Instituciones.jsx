export default function Instituciones({ category, lang }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">
        {category.label?.[lang] ?? "Instituciones"}
      </h2>

      <p className="mt-2 text-zinc-500">
        A medida que el Digesto se acercaba a su finalización, Triboniano y dos
        profesores, Teófilo y Doroteo, elaboraron un libro de texto para
        estudiantes, llamado Institutiones o «Elementos». Dado que había cuatro
        elementos, el manual constaba de cuatro libros. Las Institutiones se
        basan principalmente en las Institutiones de Gayo. Dos tercios de las
        Institutiones de Justiniano consisten en citas literales de Gayo. Las
        nuevas Institutiones se utilizaron como manual para futuros juristas
        desde el 21 de noviembre de 533 y adquirieron autoridad legal el 30 de
        diciembre de 533 junto con el Digesto.
      </p>
    </div>
  );
}
