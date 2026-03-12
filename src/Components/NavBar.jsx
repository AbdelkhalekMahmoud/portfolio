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

function getInitialTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

const NavBar = () => {
  const headerRef = useRef(null);
  const trackRef = useRef(null);
  const linkRefs = useRef(new Map());

  const [activeId, setActiveId] = useState("about");

  const [dark, setDark] = useState(() => {
    const hasClass = document.documentElement.classList.contains("dark");
    return hasClass || getInitialTheme();
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    ready: false,
  });

  const navItems = useMemo(() => ITEMS, []);

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
  }, [activeId]);

  useEffect(() => {
    const onResize = () => {
      measure();
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  /* active section detection */
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const offset = headerHeight + 20;

      let currentId = ITEMS[0].id;

      for (const item of ITEMS) {
        const section = document.getElementById(item.id);
        if (!section) continue;

        const sectionTop = section.offsetTop;

        if (window.scrollY + offset >= sectionTop) {
          currentId = item.id;
        }
      }

      setActiveId(currentId);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);

    if (!target) return;

    const headerHeight = headerRef.current?.offsetHeight ?? 0;

    const top =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight -
      12;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const onItemClick = (id) => (e) => {
    e.preventDefault();
    setActiveId(id);

    if (mobileOpen) {
      setMobileOpen(false);
      setTimeout(() => scrollToSection(id), 200);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/70 to-transparent dark:from-slate-950/80" />

      <div className="mx-auto flex justify-center px-4 py-4">
        <nav className="relative inline-flex max-w-full items-center rounded-full border border-black/10 bg-white/70 px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.10)] backdrop-blur-md dark:border-white/10 dark:bg-slate-950/55 dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">

          {/* mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="mr-2 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/5 text-slate-700 md:hidden dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>

          {/* active pill */}
          <div
            className="pointer-events-none absolute bottom-1 left-0 h-9 rounded-full bg-black/5 ring-1 ring-black/10 transition-all duration-300 dark:bg-white/10 dark:ring-white/10"
            style={{
              width: indicator.width,
              transform: `translateX(${indicator.left}px)`,
              opacity: indicator.ready ? 1 : 0,
            }}
          />

          <ul ref={trackRef} className="relative hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = item.id === activeId;

              return (
                <li key={item.id}>
                  <a
                    ref={setRef(item.id)}
                    href={`#${item.id}`}
                    onClick={onItemClick(item.id)}
                    className={`inline-flex h-9 items-center justify-center rounded-full px-4 text-sm font-medium transition-all
                    ${
                      isActive
                        ? "text-slate-950 dark:text-white"
                        : "text-slate-600 hover:bg-black/5 hover:text-slate-950 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* theme toggle */}
          <button
            onClick={() => setDark((v) => !v)}
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black/5 text-slate-700 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            {dark ? "☾" : "☀"}
          </button>
        </nav>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-sm px-4 md:hidden">
          <div className="rounded-2xl border border-black/10 bg-white/80 p-2 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/70">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onItemClick(item.id)}
                className="flex h-11 items-center rounded-xl px-4 text-sm font-medium text-slate-700 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;