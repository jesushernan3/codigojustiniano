import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop({ lang = "es", showAfter = 400 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > showAfter);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAfter]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label={lang === "en" ? "Back to top" : "Volver arriba"}
      className={[
        "fixed bottom-6 right-6 z-50",
        "flex items-center gap-2",
        "rounded-full border border-zinc-200",
        "bg-white/90 backdrop-blur",
        "px-4 py-3",
        "text-sm font-medium text-zinc-700",
        "shadow-lg shadow-black/5",
        "transition-all duration-300",
        "hover:-translate-y-0.5",
        "hover:bg-zinc-100",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}>
      <ChevronUp size={16} />

      <span className="hidden sm:inline">
        {lang === "en" ? "Back to top" : "Volver arriba"}
      </span>
    </button>
  );
}
