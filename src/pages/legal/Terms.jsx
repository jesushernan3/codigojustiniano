import { useParams } from "react-router";

const content = {
  es: {
    title: "Términos y Condiciones",
    text: `
Este sitio tiene fines exclusivamente académicos, históricos e informativos.

El contenido disponible en Corpus Iuris Civilis no constituye asesoramiento legal profesional ni reemplaza la consulta con especialistas.

El uso del material queda bajo responsabilidad exclusiva del usuario.
    `,
  },

  en: {
    title: "Terms and Conditions",
    text: `
This website is intended exclusively for academic, historical and informational purposes.

The content available on Corpus Iuris Civilis does not constitute professional legal advice and does not replace consultation with specialists.

Use of the material is the sole responsibility of the user.
    `,
  },

  fr: {
    title: "Conditions Générales",
    text: `
Ce site est destiné exclusivement à des fins académiques, historiques et informatives.

Le contenu disponible sur Corpus Iuris Civilis ne constitue pas un conseil juridique professionnel.

L’utilisation du matériel relève de la seule responsabilité de l’utilisateur.
    `,
  },
};

export default function Terms() {
  const { lang = "es" } = useParams();

  const current = content[lang] || content.es;

  return (
    <section className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="text-3xl font-semibold tracking-tight">{current.title}</h1>

      <div className="prose prose-zinc mt-8 whitespace-pre-line">
        {current.text}
      </div>
    </section>
  );
}
