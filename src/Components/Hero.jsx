import { useMemo } from "react";
const Hero = ({
  name = "Abdelkhalek Mahmoud ",
  role = "Frontend Developer",
  headline = "Building Intuitive Digital Experiences",
  description = "Frontend Developer specializing in enterprise applications, design systems, and user-centered solutions",
  ctaText = "View My Work",
  ctaHref = "#projects",
}) => {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        top: `${Math.round(Math.random() * 80 + 5)}%`,
        left: `${Math.round(Math.random() * 90 + 5)}%`,
        size: Math.round(Math.random() * 4 + 2),
        delay: `${(Math.random() * 2).toFixed(2)}s`,
        duration: `${(Math.random() * 3 + 2).toFixed(2)}s`,
        opacity: (Math.random() * 0.35 + 0.15).toFixed(2),
      })),
    []
  );

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white"
    >
      {/* background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-radial-[circle_at_50%_25%] from-violet-300/35 via-slate-50 to-slate-100 dark:from-violet-500/25 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-500/20" />
        <div className="absolute -right-40 top-24 h-112 w-md rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-500/18" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-black/10 to-transparent dark:via-white/15" />
      </div>

      {/* particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-80"
      >
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-violet-400/50 blur-[0.2px] animate-[pulse_var(--dur)_ease-in-out_infinite] dark:bg-violet-300/60"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: p.delay,
              ["--dur"]: p.duration,
            }}
          />
        ))}

        {/* subtle connecting lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[90px_90px] mask-[radial-gradient(closest-side,rgba(0,0,0,0.55),transparent)]" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-5xl flex-col items-center px-4 py-16 sm:py-20 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="w-full text-center md:w-1/2 md:text-left">
          <div
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-700 backdrop-blur dark:border-white/15 dark:bg-white/5 dark:text-white/80 opacity-0 animate-[fade-in-up_0.6s_ease-out_forwards]"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500 shadow-[0_0_18px_rgba(167,139,250,0.9)]" />
            {role}
          </div>

          <h1
            className="mt-8 text-balance text-5xl font-medium tracking-tight sm:text-[3.6rem] md:text-[4rem] opacity-0 animate-[fade-in-up_0.7s_ease-out_forwards]"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="bg-linear-to-r from-slate-900 via-violet-700 to-violet-500 bg-clip-text text-transparent dark:from-white dark:via-violet-100 dark:to-violet-300">
              {name}
            </span>
          </h1>

          <p
            className="mt-4 text-base font-medium tracking-tight text-slate-900 dark:text-white sm:text-lg opacity-0 animate-[fade-in-up_0.7s_ease-out_forwards]"
            style={{ animationDelay: "0.25s" }}
          >
            {headline}
          </p>

          <p
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-white/80 sm:text-[0.95rem] opacity-0 animate-[fade-in-up_0.75s_ease-out_forwards]"
            style={{ animationDelay: "0.35s" }}
          >
            {description}
          </p>

          <div
            className="mt-10 flex items-center justify-center opacity-0 animate-[fade-in-up_0.8s_ease-out_forwards] md:justify-start"
            style={{ animationDelay: "0.45s" }}
          >
            <a
              href={ctaHref}
              className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-violet-600 to-fuchsia-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_50px_rgba(139,92,246,0.35)] ring-1 ring-white/10 transition hover:from-violet-500 hover:to-fuchsia-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            >
              {ctaText}
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 transition group-hover:translate-x-0.5">
                <span className="text-base leading-none">→</span>
              </span>
            </a>
          </div>
        </div>

        {/* profile image on the right for larger screens */}
        <div className="mt-10 flex w-full justify-center md:mt-0 md:w-1/2 md:justify-end">
          <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/15 bg-white/5 shadow-[0_18px_60px_rgba(15,23,42,0.7)] sm:h-48 sm:w-48 md:h-56 md:w-56">
            <img
              src="/profile.jpg"
              alt="Abdelkhalek portrait"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-violet-400/40 ring-offset-2 ring-offset-slate-900/80" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

