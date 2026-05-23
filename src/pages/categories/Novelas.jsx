import { useParams } from "react-router";

const content = {
  es: {
    title: "IUSTINIANI NOVELLAE",
    eyebrow: "( Corpus Iuris Civilis, vol. III )",
    body: "Las Novelas de Justiniano (Novelas) forman parte del Corpus Iuris Civilis. La mayoría se publicaron en griego. Las primeras datan del año 535 d. C. y las últimas del año 565, pero la mayoría se publicaron entre 535 y 539. Sin embargo, no parece que existiera una compilación oficial de estas nuevas constituciones durante el reinado de Justiniano. El texto griego consta de 168 novelas: 159 fueron compuestas durante su reinado y el resto pertenecen a Justino II y a Tiberio.",
  },

  en: {
    title: "IUSTINIANI NOVELLAE",
    eyebrow: "( Corpus Iuris Civilis, vol. III )",
    body: "The Novels of Justinian (Novellae) form part of the Corpus Iuris Civilis. Most of them were published in Greek. The former belong to the year 535 AD and the latter to the year 565, but most of them were published between 535 and 539. It does not seem, however, that any official compilation of these new constitutions appeared in Justinian’s time. The Greek text consists of 168 Novels : 159 of them were composed during Justinian’s reign and the rest belongs to Justin the Second and to Tiberius.",
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
