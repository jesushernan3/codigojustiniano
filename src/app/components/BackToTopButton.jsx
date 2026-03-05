import { useEffect, useState } from "react";

export default function BackToTopButton({ showAfter = 600 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > showAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Volver arriba"
      className={[
        "fixed bottom-6 right-6 z-50",
        "rounded-full border border-zinc-200 bg-white/95 backdrop-blur",
        "px-3 py-3 shadow-sm",
        "text-zinc-700 hover:text-zinc-900 hover:bg-white",
        "transition",
      ].join(" ")}>
      <span className="block text-lg leading-none">↑</span>
    </button>
  );
}
