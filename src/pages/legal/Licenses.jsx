import { useParams } from "react-router";

const content = {
  es: {
    title: "Licencias",
    text: "Los textos originales pertenecen a sus respectivas fuentes y autores históricos.",
  },

  en: {
    title: "Licenses",
    text: "Original texts belong to their respective historical sources and authors.",
  },

  fr: {
    title: "Licences",
    text: "Les textes originaux appartiennent à leurs sources et auteurs historiques respectifs.",
  },
};

export default function Licenses() {
  const { lang = "es" } = useParams();

  const current = content[lang] || content.es;

  return (
    <section className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="text-3xl font-semibold tracking-tight">{current.title}</h1>

      <div className="prose prose-zinc mt-8">
        <p>{current.text}</p>
      </div>
    </section>
  );
}
