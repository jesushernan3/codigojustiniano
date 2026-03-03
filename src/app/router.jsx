import { createBrowserRouter } from "react-router";
import RootLayout from "./ui/RootLayout";
import NotFound from "./ui/NotFound";
import Home from "../pages/Home";

import CategoryLayout from "../app/ui/CategoryLayout";
import CategoryIndex from "../app/ui/CategoryIndex";
import Book from "../pages/Book";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },

      // Categoría: /codex, /digesto, etc.
      {
        path: ":categorySlug",
        element: <CategoryLayout />,
        children: [
          { index: true, element: <CategoryIndex /> }, // /codex
          { path: ":bookId", element: <Book /> }, // /codex/1
          // { path: ":bookId/:articleId", element: <Article /> }, // futuro
        ],
      },
    ],
  },
]);
