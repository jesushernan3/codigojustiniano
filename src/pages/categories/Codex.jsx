import { useParams } from "react-router";

const content = {
  es: {
    title: "CODEX IUSTINIANUS",
    eyebrow: "( Corpus Iuris Civilis, vol. II )",
    body: "El Corpus Iuris Civilis se publicó en tres partes, en latín, bajo la dirección del cuestor imperial Triboniano a petición del emperador Justiniano en 529-534. La primera parte fue el Codex Justinianus, que compiló todas las constituciones imperiales existentes desde la época de Adriano. Utilizó tanto el Codex Theodosianus como colecciones privadas como el Codex Gregorianus y el Codex Hermogenianus. La segunda parte, el Digesto (Digesta) o Pandectas (Pandectae), se publicó en 533: recopiló los escritos de los grandes juristas romanos como Ulpiano junto con los edictos vigentes. La tercera parte, las Instituciones (Institutiones), fue concebida como una especie de libro de texto legal para las escuelas de derecho. Más tarde, Justiniano publicó una serie de otras leyes, principalmente en griego, que se llamaron Novelas (Novellae).",
  },

  en: {
    title: "CODEX IUSTINIANUS",
    eyebrow: "( Corpus Iuris Civilis, vol. II )",
    body: "The Corpus Iuris Civilis was published in three parts, in Latin, under the direction of the imperial quaestor Tribonian at the request of the emperor Justinian in 529-534. The first part was the Codex Justinianus, which compiled all existing imperial constitutions from the time of Hadrian. It used both the Codex Theodosianus and private collections such as the Codex Gregorianus and the Codex Hermogenianus. The second part, the Digest (Digesta) or Pandects (Pandectae), was published in 533: it compiled the writings of great Roman jurists such as Ulpian along with the edicts in force. The third part, the Institutes (Institutiones), was intended as a kind of legal textbook for law schools. Later, Justinian published a series of other laws, mainly in Greek, which were called Novels (Novellae).",
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
