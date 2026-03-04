import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Fila 1: 3 columnas */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-3">
          {/* Col 1 */}
          <div>
            <div className="text-sm font-semibold text-zinc-900">
              Corpus Iuris Civilis
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Edición digital para lectura y navegación del corpus jurídico.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Secciones
            </div>
            <nav className="mt-4 space-y-2 text-sm">
              <FooterLink to="/codex">Codex</FooterLink>
              <FooterLink to="/digesto">Digesto</FooterLink>
              <FooterLink to="/instituciones">Instituciones</FooterLink>
              <FooterLink to="/novelas">Novelas</FooterLink>
            </nav>
          </div>

          {/* Col 3 */}
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Recursos
            </div>
            <nav className="mt-4 space-y-2 text-sm">
              <a
                className="text-zinc-600 hover:text-zinc-900"
                href="https://droitromain.univ-grenoble-alpes.fr/corpjurciv.htm"
                target="_blank"
                rel="noreferrer"
              >
                Fuente / Referencia
              </a>
              <FooterLink to="/acerca">Acerca</FooterLink>
              <FooterLink to="/contacto">Contacto</FooterLink>
            </nav>
          </div>
        </div>

        {/* Fila 2: barra baja (bajita) */}
        <div className="flex flex-col gap-3 border-t border-zinc-200 py-4 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} Corpus Iuris Civilis. Todos los
            derechos reservados.
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <FooterLink to="/terminos">Términos</FooterLink>
            <FooterLink to="/privacidad">Privacidad</FooterLink>
            <FooterLink to="/licencias">Licencias</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link className="text-zinc-600 hover:text-zinc-900" to={to}>
      {children}
    </Link>
  );
}
