import { useParams } from "react-router";

const content = {
  es: {
    title: "IUSTINIANI DIGESTA",
    eyebrow: "( Corpus Iuris Civilis, vol. I )",
    body: "El Digesto (Digesta), o Pandectas (Pandectae), formaba parte de la gran colección de leyes romanas conocida como el Corpus Iuris Civilis. El Digesto se publicó en el año 533 d. C. bajo la dirección del cuestor imperial Triboniano. Recopilaba los escritos de los grandes juristas romanos, como Ulpiano, junto con los edictos vigentes. Constituyó tanto el derecho vigente de la época como un punto de inflexión en el Derecho romano: a partir de entonces, la jurisprudencia, a veces contradictoria, del pasado se integró en un sistema jurídico ordenado.",
  },

  en: {
    title: "IUSTINIANI DIGESTA",
    eyebrow: "( Corpus Iuris Civilis, vol. I )",
    body: "The Digest (Digesta), or Pandects (Pandectae), was a part of the great collection of Roman laws known as the Corpus Iuris Civilis. The Digest was issued in AD 533 under the direction of the imperial quaestor Tribonian. It compiled the writings of the great Roman jurists such as Ulpian along with current edicts. It constituted both the current law of the time, and a turning point in Roman Law : from then on the sometimes contradictory case law of the past was subsumed into an ordered legal system.",
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
