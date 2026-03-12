import "./App.css";
import NavBar from "./Components/NavBar";
import Hero from "./Components/Hero";
import { cv } from "./data/cv";

const Section = ({ id, title, children }) => (
  <section id={id} className="mx-auto max-w-6xl px-4 py-20">
    <div className="mb-8 flex items-center gap-3">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      <div className="h-px flex-1 bg-black/5 dark:bg-white/10" />
    </div>
    {children}
  </section>
);

const Card = ({ children }) => (
  <div className="rounded-2xl border border-black/5 bg-white/70 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-slate-900/60 dark:shadow-[0_22px_70px_rgba(0,0,0,0.55)]">
    {children}
  </div>
);

function App() {
  return (
    <>
      <NavBar />
      <Hero
        name={cv.name.split(" ")[0]}
        role={cv.title}
        headline="Creating Intuitive Digital Experiences"
        description={cv.profile}
        ctaText="View My Work"
        ctaHref="#projects"
      />

      <main className="bg-white/95 pb-20 dark:bg-slate-950">
        <Section id="skills" title="Skills">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Programming & Frameworks", cv.skills.programming],
              ["Tools & Concepts", cv.skills.tools],
              ["Styling", cv.skills.styling],
              ["Languages", cv.skills.languages],
            ].map(([label, items]) => (
              <Card key={label}>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {label}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="grid gap-4">
            {cv.experience.map((job) => (
              <Card key={`${job.company}-${job.role}`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {job.role}
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-white/70">
                      {job.company} • {job.location}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-slate-600 dark:text-white/55">
                    {job.start} — {job.end}
                  </p>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-white/75">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid gap-4 md:grid-cols-2">
            {cv.projects.map((p) => (
              <Card key={p.name}>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-slate-700 dark:text-white/70">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education">
          <div className="grid gap-4">
            {cv.education.map((e) => (
              <Card key={e.school}>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {e.degree}
                </h3>
                <p className="mt-1 text-sm text-slate-700 dark:text-white/70">
                  {e.school} • {e.start} — {e.end}
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-white/75">
                  {e.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="achievements" title="Achievements">
          <Card>
            <p className="text-sm text-slate-700 dark:text-white/70">
              ITI Intensive Front-End Code Camp (Nov 2023 — Feb 2024)
            </p>
          </Card>
        </Section>

        <Section id="contact" title="Contact">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Get in touch
              </h3>
              <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-white/75">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    className="text-violet-700 underline-offset-4 hover:underline dark:text-violet-300"
                    href={`mailto:${cv.email}`}
                  >
                    {cv.email}
                  </a>
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {cv.phone}
                </p>
                <p>
                  <span className="font-medium">Location:</span> {cv.location}
                </p>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Links
              </h3>
              <div className="mt-4 space-y-2 text-sm">
                <a
                  className="block rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-slate-800 transition hover:bg-black/8 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                  href={cv.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="block rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-slate-800 transition hover:bg-black/8 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10"
                  href={cv.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </Card>
          </div>
        </Section>
      </main>
    </>
  );
}

export default App;
