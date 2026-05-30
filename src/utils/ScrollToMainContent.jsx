// src/components/utils/ScrollToMainContent.jsx

import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToMainContent() {
  const location = useLocation();

  useEffect(() => {
    const article = document.getElementById("main-content");

    if (article) {
      article.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location.pathname]);

  return null;
}
