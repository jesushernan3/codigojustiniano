import { useParams } from "react-router";

const content = {
  es: {
    title: "IUSTINIANI INSTITUTIONES",
    eyebrow: "( Corpus Iuris Civilis, vol. I )",
    body: " A medida que el Digesto se acercaba a su finalización, Triboniano y dos profesores, Teófilo y Doroteo, elaboraron un libro de texto para estudiantes,   llamado Institutiones o «Elementos». Dado que había cuatro elementos, el manual constaba de cuatro libros. Las Institutiones se basan principalmente en las Institutiones de Gayo. Dos tercios de las Institutiones de Justiniano consisten en citas literales de Gayo. Las nuevas Institutiones se utilizaron como manual para futuros juristas desde el 21 de noviembre de 533 y adquirieron autoridad legal el 30 de diciembre de 533 junto con el Digesto.",
  },

  en: {
    title: "IUSTINIANI INSTITUTIONES",
    eyebrow: "( Corpus Iuris Civilis, vol. I )",
    body: "As the Digest neared completion, Tribonian and two professors, Theophilus and Dorotheus, made a students' textbook, called the Institutiones or « Elements ». As there were four elements, the manual consisted of four books. The Institutiones are largely based on the Institutiones of Gaius. Two thirds of the Institutiones of Justinian consist of literal quotes from Gaius. The new Institutiones were used as a manual for would-be jurists since 21 November 533 and were given the authority of law on 30 December 533 along with the Digest.",
  },
};

export default function Codex() {
  const { lang = "es" } = useParams();

  const t = content[lang] || content.es;

  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
          {t.title}
        </h1>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          {t.eyebrow}
        </p>
      </header>

      <div className="space-y-8">
        <section className="space-y-3">
          <p className="text-lg leading-8 text-zinc-600">{t.body}</p>
        </section>
      </div>
    </article>
  );
}

<p className="mt-2 text-zinc-500">
  A medida que el Digesto se acercaba a su finalización, Triboniano y dos
  profesores, Teófilo y Doroteo, elaboraron un libro de texto para estudiantes,
  llamado Institutiones o «Elementos». Dado que había cuatro elementos, el
  manual constaba de cuatro libros. Las Institutiones se basan principalmente en
  las Institutiones de Gayo. Dos tercios de las Institutiones de Justiniano
  consisten en citas literales de Gayo. Las nuevas Institutiones se utilizaron
  como manual para futuros juristas desde el 21 de noviembre de 533 y
  adquirieron autoridad legal el 30 de diciembre de 533 junto con el Digesto.
</p>;
