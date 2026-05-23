import { NavLink, useParams } from "react-router";
import { toc } from "../../data/toc";
import { getSafeLang } from "../../data/languages";
import { getText } from "../../utils/getText";

export default function MainNav() {
  const { lang } = useParams();
  const safeLang = getSafeLang(lang);

  return (
    <nav className="flex items-center gap-6">
      {toc.map((category) => (
        <NavLink
          key={category.id}
          to={`/${safeLang}/${category.id}`}
          className={({ isActive }) =>
            [
              "text-sm transition",
              isActive
                ? "text-zinc-950 font-medium"
                : "text-zinc-600 hover:text-zinc-950",
            ].join(" ")
          }>
          {getText(category.label, safeLang)}
        </NavLink>
      ))}
    </nav>
  );
}
