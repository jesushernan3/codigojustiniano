import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "./layouts/RootLayout";
import NotFound from "./ui/NotFound";
import Home from "../pages/Home";

import Category from "../pages/Category";
import Book from "./components/Book";

import Terms from "../pages/legal/Terms";
import Privacy from "../pages/legal/Privacy";
import Licenses from "../pages/legal/Licenses";
import About from "../pages/About";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="/es" replace />,
      },
      {
        path: ":lang",
        element: <Home />,
      },

      {
        path: ":lang/terminos",
        element: <Terms />,
      },
      {
        path: ":lang/terms",
        element: <Terms />,
      },

      {
        path: ":lang/privacidad",
        element: <Privacy />,
      },
      {
        path: ":lang/privacy",
        element: <Privacy />,
      },

      {
        path: ":lang/licencias",
        element: <Licenses />,
      },
      {
        path: ":lang/licenses",
        element: <Licenses />,
      },
      {
        path: ":lang/acerca",
        element: <About />,
      },
      {
        path: ":lang/about",
        element: <About />,
      },
      {
        path: ":lang/a-propos",
        element: <About />,
      },

      {
        path: ":lang/contacto",
        element: <Contact />,
      },
      {
        path: ":lang/contact",
        element: <Contact />,
      },

      // Categoría: /codex, /digesto, etc.
      {
        path: ":lang/:categorySlug",
        element: <Category />,
      },
      {
        path: ":lang/:categorySlug/:bookId",
        element: <Book />,
      },
    ],
  },
]);
