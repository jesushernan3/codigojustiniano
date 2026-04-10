import { useEffect, useState } from "react";

function ChevronUpIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none">
      <path
        d="M6 14l6-6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BackToTopButton({ showAfter = 700 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > showAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  const goTop = () => {
    // fallback smooth (algunos browsers ignoran CSS en scrollTo)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Volver arriba"
      className={[
        "fixed bottom-6 right-6 z-50",
        "inline-flex items-center justify-center",
        "h-11 w-11 rounded-full",
        "border border-zinc-200 bg-white/95 backdrop-blur",
        "shadow-sm",
        "text-zinc-700 hover:text-zinc-900 hover:bg-white",
        "transition",
      ].join(" ")}>
      <ChevronUpIcon className="h-5 w-5" />
    </button>
  );
}
