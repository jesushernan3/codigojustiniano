import { NavLink, useLocation, useParams } from "react-router";
import { languages } from "../../data/languages";

const slugMap = {
  terminos: { es: "terminos", en: "terms", fr: "conditions" },
  terms: { es: "terminos", en: "terms", fr: "conditions" },
  conditions: { es: "terminos", en: "terms", fr: "conditions" },

  privacidad: { es: "privacidad", en: "privacy", fr: "confidentialite" },
  privacy: { es: "privacidad", en: "privacy", fr: "confidentialite" },
  confidentialite: { es: "privacidad", en: "privacy", fr: "confidentialite" },

  licencias: { es: "licencias", en: "licenses", fr: "licences" },
  licenses: { es: "licencias", en: "licenses", fr: "licences" },
  licences: { es: "licencias", en: "licenses", fr: "licences" },

  acerca: { es: "acerca", en: "about", fr: "a-propos" },
  about: { es: "acerca", en: "about", fr: "a-propos" },
  "a-propos": { es: "acerca", en: "about", fr: "a-propos" },

  contacto: { es: "contacto", en: "contact", fr: "contact" },
  contact: { es: "contacto", en: "contact", fr: "contact" },
};

export default function LanguageSwitcher() {
  const { lang = "es" } = useParams();
  const location = useLocation();

  function getPath(nextLang) {
    const segments = location.pathname.split("/").filter(Boolean);

    // Home: /es → /en
    if (segments.length === 1) {
      return `/${nextLang}`;
    }

    const currentSlug = segments[1];

    // Si es una página legal/info traducible
    if (slugMap[currentSlug]) {
      segments[0] = nextLang;
      segments[1] = slugMap[currentSlug][nextLang];
      return `/${segments.join("/")}`;
    }

    // Categorías y libros: /es/codex/01 → /en/codex/01
    segments[0] = nextLang;
    return `/${segments.join("/")}`;
  }

  return (
    <div className="flex shrink-0 items-center justify-center gap-1 border-t border-zinc-200 bg-white px-2 py-2 sm:ml-auto sm:border-l sm:border-t-0 sm:py-0">
      {languages.map((item) => (
        <NavLink
          key={item.id}
          to={getPath(item.id)}
          className={[
            "rounded-lg px-2.5 py-1.5 text-xs font-medium transition",
            item.id === lang
              ? "bg-zinc-900 text-white"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
          ].join(" ")}>
          {item.shortLabel}
        </NavLink>
      ))}
    </div>
  );
}
