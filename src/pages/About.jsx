import { useParams } from "react-router";

const content = {
  es: {
    title: "Acerca",
    subtitle: "Una edición digital para estudiar el Corpus Iuris Civilis.",
    paragraphs: [
      "Corpus Iuris Civilis es un proyecto de lectura, navegación y consulta académica del cuerpo jurídico romano atribuido a la compilación justinianea.",
      "El objetivo del sitio es facilitar el acceso al material con una estructura clara, navegable y orientada al estudio histórico, jurídico y cultural.",
      "El contenido se ofrece con fines informativos y educativos. No constituye asesoramiento legal ni interpretación jurídica profesional.",
    ],
  },

  en: {
    title: "About",
    subtitle: "A digital edition for studying the Corpus Iuris Civilis.",
    paragraphs: [
      "Corpus Iuris Civilis is a project for reading, browsing and academically consulting the Roman legal corpus associated with Justinian’s compilation.",
      "The purpose of this website is to make the material easier to access through a clear, navigable structure designed for historical, legal and cultural study.",
      "The content is provided for informational and educational purposes. It does not constitute legal advice or professional legal interpretation.",
    ],
  },

  fr: {
    title: "À propos",
    subtitle: "Une édition numérique pour l’étude du Corpus Iuris Civilis.",
    paragraphs: [
      "Corpus Iuris Civilis est un projet de lecture, de navigation et de consultation académique du corpus juridique romain associé à la compilation justinienne.",
      "L’objectif du site est de faciliter l’accès au matériel grâce à une structure claire, navigable et orientée vers l’étude historique, juridique et culturelle.",
      "Le contenu est proposé à des fins informatives et éducatives. Il ne constitue pas un conseil juridique ni une interprétation juridique professionnelle.",
    ],
  },
};

export default function About() {
  const { lang = "es" } = useParams();
  const current = content[lang] || content.es;

  return (
    <section className="bg-white rounded-2xl mx-auto max-w-4xl px-6 py-6">
      <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        Corpus Iuris Civilis
      </p>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
        {current.title}
      </h1>

      <p className="mt-4 text-lg leading-8 text-zinc-600">{current.subtitle}</p>

      <div className="mt-10 space-y-5 text-base leading-8 text-zinc-700">
        {current.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
