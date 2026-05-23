import { useParams } from "react-router";

const content = {
  es: {
    title: "Contacto",
    subtitle:
      "Para consultas, correcciones o colaboraciones relacionadas con el proyecto.",
    intro:
      "Si encontrás errores, tenés sugerencias o querés colaborar con el desarrollo del sitio, podés escribirnos.",
    emailLabel: "Correo electrónico",
    note: "Este sitio tiene carácter académico e informativo. No respondemos consultas de asesoramiento legal.",
  },

  en: {
    title: "Contact",
    subtitle:
      "For inquiries, corrections or collaborations related to the project.",
    intro:
      "If you find errors, have suggestions or would like to collaborate with the development of the website, you can contact us.",
    emailLabel: "Email",
    note: "This website is academic and informational in nature. We do not answer requests for legal advice.",
  },

  fr: {
    title: "Contact",
    subtitle:
      "Pour les questions, corrections ou collaborations liées au projet.",
    intro:
      "Si vous trouvez des erreurs, avez des suggestions ou souhaitez collaborer au développement du site, vous pouvez nous écrire.",
    emailLabel: "Adresse e-mail",
    note: "Ce site a un caractère académique et informatif. Nous ne répondons pas aux demandes de conseil juridique.",
  },
};

export default function Contact() {
  const { lang = "es" } = useParams();
  const current = content[lang] || content.es;

  return (
    <section className="mx-auto max-w-4xl px-4 py-6">
      <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        Corpus Iuris Civilis
      </p>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
        {current.title}
      </h1>

      <p className="mt-4 text-lg leading-8 text-zinc-600">{current.subtitle}</p>

      <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6">
        <p className="text-base leading-8 text-zinc-700">{current.intro}</p>

        <div className="mt-6">
          <div className="text-sm font-medium text-zinc-500">
            {current.emailLabel}
          </div>

          <a
            href="mailto:contacto@crmode.com"
            className="mt-1 inline-block text-base font-medium text-zinc-950 underline underline-offset-4">
            contacto@crmode.com
          </a>
        </div>

        <p className="mt-6 text-sm leading-6 text-zinc-500">{current.note}</p>
      </div>
    </section>
  );
}
