import { NavLink, Link } from "react-router";

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
  return (
    <>
      {/* Bloque superior (normal) */}
      <header className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
          <Link to={"/"}>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
              CORPUS IURIS CIVILIS{" "}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">Cuerpo de derecho civi</p>
          </Link>
        </div>
      </header>

      {/* Nav sticky separado */}
      <div className="sticky top-0 z-50 border-b border-zinc-200 bg-white/98 backdrop-blur supports-[backdrop-filter]:bg-white/95">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <nav className="flex h-12 items-center gap-8">
            <NavItem to="/codex">Codex</NavItem>
            <NavItem to="/digesto">Digesto</NavItem>
            <NavItem to="/instituciones">Instituciones</NavItem>
            <NavItem to="/novelas">Novelas</NavItem>
          </nav>
        </div>
      </div>
    </>
  );
}
