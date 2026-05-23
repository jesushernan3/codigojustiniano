import { useParams } from "react-router";

const content = {
  es: {
    title: "Privacidad",
    text: "No recopilamos información sensible ni compartimos datos personales con terceros.",
  },

  en: {
    title: "Privacy",
    text: "We do not collect sensitive information nor share personal data with third parties.",
  },

  fr: {
    title: "Confidentialité",
    text: "Nous ne collectons pas d’informations sensibles et ne partageons pas les données personnelles.",
  },
};

export default function Privacy() {
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
