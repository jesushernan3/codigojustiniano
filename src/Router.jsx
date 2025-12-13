import PlantillaCategorias from "./components/layout/PlantillaCategorias";
import PlantillaPrincipal from "./components/layout/PlantillaPrincipal";
import Inicio from "./pages/Inicio";
import Codex from "./pages/Codex/Codex";
import Digesto from "./pages/Digesto/Digesto";
import Instituciones from "./pages/Instituciones/Instituciones";
import Novelas from "./pages/Novelas/Novelas";

import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    Component: PlantillaPrincipal,
    children: [
      {
        path: "/",
        Component: Inicio,
        index: true,
      },
    ],
  },
  {
    Component: PlantillaCategorias,
    children: [
      {
        path: "codex",
        Component: Codex,
      },
      {
        path: "digesto",
        Component: Digesto,
      },
      {
        path: "instituciones",
        Component: Instituciones,
      },
      {
        path: "novelas",
        Component: Novelas,
      },
    ],
  },

  // {
  //   path: "/categoria",
  //   Component: PlantillaCategorias,
  //   children: [
  //     {
  //       path: "/codex",
  //       Component: Codex,
  //     },
  //   ],
  // },
]);
export default router;

// <Route element={<PlantillaPrincipal />}>
//       <Route path="/" element={<Inicio />} />
//     </Route>
//     <Route element={<PlantillaSecundaria />}>
//       <Route path="codex" element={<Codex />} />
//       <Route path="denovocodice" element={<DeNovoCodice />} />

//       <Route path="digesto" element={<Digesto />} />
//       <Route path="instituciones" element={<Instituciones />} />
//       <Route path="novelas" element={<Novelas />} />
//     </Route>
