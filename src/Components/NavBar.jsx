import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

const NavBar = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [activeId, setActiveId] = useState(ITEMS[0].id);
  const [dark, setDark] = useState(() => {
    const hasClass = document.documentElement.classList.contains("dark");
    return hasClass || getInitialTheme();
  });

  const linkRefs = useRef(new Map());
  const trackRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  const setRef = (id) => (el) => {
    if (!el) linkRefs.current.delete(id);
    else linkRefs.current.set(id, el);
  };

  const measure = () => {
    const el = linkRefs.current.get(activeId);
    const track = trackRef.current;
    if (!el || !track) return;
    const parentRect = track.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    setIndicator({
      left: rect.left - parentRect.left,
      width: rect.width,
      ready: true,
    });
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const onItemClick = (id) => (e) => {
    e.preventDefault();
    setActiveId(id);

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    } else {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  const navItems = useMemo(() => ITEMS, []);

  return (
    <header className="sticky top-0 z-50">
      {/* subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-white/70 to-transparent dark:from-slate-950/80" />

      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-4">
        <nav className="relative flex items-center gap-3 rounded-full border border-black/10 bg-white/60 px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.10)] backdrop-blur-md dark:border-white/10 dark:bg-slate-950/40 dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
          {/* animated active pill underline */}
          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute bottom-1.5 left-0 h-9 rounded-full",
              "bg-black/5 ring-1 ring-black/10 dark:bg-white/8 dark:ring-white/10",
              prefersReducedMotion ? "" : "transition-[transform,width] duration-300 ease-out",
              indicator.ready ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{
              width: indicator.width,
              transform: `translateX(${indicator.left}px)`,
            }}
          />

          <ul ref={trackRef} className="relative flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    ref={setRef(item.id)}
                    href={`#${item.id}`}
                    onClick={onItemClick(item.id)}
                    className={[
                      "group relative inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium",
                      "text-slate-700 transition-all duration-200",
                      "hover:text-slate-950 hover:bg-black/5 hover:-translate-y-[1px]",
                      "dark:text-white/80 dark:hover:text-white dark:hover:bg-white/5",
                      isActive ? "text-slate-950 dark:text-white" : "",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white/60 dark:focus-visible:ring-offset-slate-950/40",
                    ].join(" ")}
                  >
                    <span className="relative">
                      {item.label}
                      {/* hover underline */}
                      <span
                        aria-hidden="true"
                        className={[
                          "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0",
                          "bg-linear-to-r from-violet-400/0 via-violet-400/80 to-fuchsia-400/0",
                          prefersReducedMotion ? "" : "transition-transform duration-300",
                          "group-hover:scale-x-100",
                        ].join(" ")}
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* theme toggle */}
          <button
            type="button"
            onClick={() => setDark((v) => !v)}
            className={[
              "ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full",
              "border border-black/10 bg-black/5 text-slate-700 hover:bg-black/8 hover:text-slate-950",
              "dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white/60 dark:focus-visible:ring-offset-slate-950/40",
              prefersReducedMotion ? "" : "transition-all duration-200",
            ].join(" ")}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <span
              className={[
                "inline-block",
                prefersReducedMotion ? "" : "transition-transform duration-300",
                dark ? "rotate-0" : "-rotate-90",
              ].join(" ")}
            >
              {dark ? "☾" : "☀"}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;