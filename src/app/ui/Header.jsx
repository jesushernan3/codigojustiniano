import { NavLink, Link, useParams } from "react-router";
import { getSafeLang } from "../../data/languages";
import LanguageSwitcher from "../components/LanguageSwitcher";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "text-sm transition-colors",
          isActive
            ? "text-zinc-900 font-medium"
            : "text-zinc-600 hover:text-zinc-900",
        ].join(" ")
      }>
      {children}
    </NavLink>
  );
}

export default function Header() {
  const { lang } = useParams();
  const safeLang = getSafeLang(lang);

  return (
    <>
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <Link to={`/${safeLang}`}>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
              CORPUS IURIS CIVILIS
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Cuerpo de derecho civil
            </p>
          </Link>
        </div>
      </header>

      <div className="sticky top-0 z-50 border-b border-zinc-200 bg-white/98 backdrop-blur supports-[backdrop-filter]:bg-white/95">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mx-auto max-w-7xl px-4 md:px-6">
          {" "}
          <nav className="flex h-12 justify-center items-center gap-5 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {" "}
            <NavItem to={`/${safeLang}/codex`}>Codex</NavItem>
            <NavItem to={`/${safeLang}/digesto`}>Digesto</NavItem>
            <NavItem to={`/${safeLang}/instituciones`}>Instituciones</NavItem>
            <NavItem to={`/${safeLang}/novelas`}>Novelas</NavItem>
          </nav>
          <LanguageSwitcher lang={safeLang} />
        </div>
      </div>
    </>
  );
}
