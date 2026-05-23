import { Link, useParams } from "react-router";

const translations = {
  es: {
    description:
      "Edición digital para lectura y navegación del corpus jurídico.",
    sections: "Secciones",
    resources: "Recursos",
    about: "Acerca",
    contact: "Contacto",
    terms: "Términos",
    privacy: "Privacidad",
    licenses: "Licencias",
    rights:
      "Se permite compartir y reutilizar este contenido con fines educativos y de estudio.",
  },

  en: {
    description: "Digital edition for reading and navigating the legal corpus.",
    sections: "Sections",
    resources: "Resources",
    about: "About",
    contact: "Contact",
    terms: "Terms",
    privacy: "Privacy",
    licenses: "Licenses",
    rights:
      "Sharing and reuse of this content for educational and study purposes is permitted.",
  },

  fr: {
    description:
      "Édition numérique pour la lecture et la navigation du corpus juridique.",
    sections: "Sections",
    resources: "Ressources",
    about: "À propos",
    contact: "Contact",
    terms: "Conditions",
    privacy: "Confidentialité",
    licenses: "Licences",
    rights:
      "Le partage et la réutilisation de ce contenu à des fins éducatives et d'étude sont autorisés.",
  },
};

export default function Footer() {
  const { lang = "es" } = useParams();

  const t = translations[lang] || translations.es;

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold text-zinc-900">
              Corpus Iuris Civilis
            </div>

            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {t.description}
            </p>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {t.sections}
            </div>

            <nav className="mt-4 flex flex-col gap-2 text-sm">
              <Link to={`/${lang}/codex`}>Codex</Link>
              <Link to={`/${lang}/digesto`}>Digesto</Link>
              <Link to={`/${lang}/instituciones`}>Instituciones</Link>
              <Link to={`/${lang}/novelas`}>Novelas</Link>
            </nav>
          </div>

          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {t.resources}
            </div>

            <nav className="mt-4 flex flex-col space-y-2 text-sm">
              <a
                className="text-zinc-600 hover:text-zinc-900"
                href="https://droitromain.univ-grenoble-alpes.fr/corpjurciv.htm"
                target="_blank"
                rel="noreferrer">
                Fuente / Referencia
              </a>

              <Link to={`/${lang}/acerca`}>{t.about}</Link>

              <Link to={`/${lang}/contacto`}>{t.contact}</Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-zinc-200 py-4 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <div>
            ℄ Copyleft {new Date().getFullYear()} Corpus Iuris Civilis.{" "}
            {t.rights}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link to={`/${lang}/${lang === "en" ? "terms" : "terminos"}`}>
              {t.terms}
            </Link>

            <Link to={`/${lang}/${lang === "en" ? "privacy" : "privacidad"}`}>
              {t.privacy}
            </Link>

            <Link to={`/${lang}/${lang === "en" ? "licenses" : "licencias"}`}>
              {t.licenses}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
