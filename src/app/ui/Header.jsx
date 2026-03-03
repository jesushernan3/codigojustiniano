import { Link } from "react-router";
import toc from "../../content/toc.json";

export default function Header() {
  return (
    <header className="sticky top-0 z-30  bg-zinc-950/85 backdrop-blur flex flex-col border-b border-zinc-200">
      <div className="mx-auto max-w-7xl p-14 mb-10 md:px-6 h-14 flex items-center  flex-col">
        {/* Logo / Título */}
        <Link
          to="/"
          className="font-semibold tracking-tight text-zinc-100 text-5xl"
        >
          Corpus Iuris Civilis
        </Link>
        <p
          className="text-teal-100
"
        >
          cuerpo de derecho civil
        </p>
      </div>

      {/* Navegación */}
      <nav className="bg-white hidden md:flex justify-center items-center gap-6 text-sm">
        {toc.sections.map((section) => (
          <Link
            key={section.id}
            to={`/${section.id}`}
            className="text-gray-950 hover:text-zinc-100 transition-colors"
          >
            {section.id}
          </Link>
        ))}
      </nav>
    </header>
  );
}
