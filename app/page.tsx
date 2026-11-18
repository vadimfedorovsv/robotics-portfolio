import { ArrowUpRight, GraduationCap } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { ProjectCard } from "@/components/project-card";
import { Reveal, Spotlight } from "@/components/motion";
import { about, asset, education, experience, profile, projects, publication, skills } from "@/lib/data";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-label={title} className="mb-20 scroll-mt-16 md:mb-28 lg:scroll-mt-20">
      {/* On small screens the section title sticks to the top while you scroll through it. */}
      <div className="sticky top-0 z-20 -mx-6 mb-6 bg-background/80 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
        <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-heading">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <>
      <div aria-hidden className="grid-bg pointer-events-none fixed inset-x-0 top-0 h-[70vh]" />
      <Spotlight />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="relative mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-8">
          <Sidebar />

          <main id="content" className="pt-20 lg:w-[54%] lg:py-20">
            <Section id="about" title="About">
              <Reveal className="space-y-4 leading-relaxed text-muted-foreground">
                {about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Reveal>
            </Section>

            <Section id="projects" title="Projects">
              <div className="space-y-16 lg:space-y-10">
                {projects.map((p) => (
                  <Reveal key={p.id}>
                    <ProjectCard p={p} />
                  </Reveal>
                ))}
              </div>
            </Section>

            <Section id="experience" title="Experience">
              <ol className="space-y-3">
                {experience.map((e) => {
                  const Body = (
                    <>
                      <p className="pt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{e.dates}</p>
                      <div>
                        <h3 className="font-medium leading-snug text-heading">
                          {e.title} <span className="text-muted-foreground">·</span>{" "}
                          <span className="inline-flex items-center gap-0.5 text-foreground/90 group-hover:text-primary">
                            {e.org}
                            {e.href && <ArrowUpRight className="size-3.5" />}
                          </span>
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
                        {e.tags.length > 0 && (
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {e.tags.map((t) => (
                              <li key={t} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                {t}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </>
                  );
                  const cls =
                    "group grid gap-1 rounded-xl border border-transparent transition-colors sm:grid-cols-[8rem_1fr] sm:gap-6 lg:-mx-5 lg:p-5 lg:hover:border-border lg:hover:bg-card/70";
                  return (
                    <li key={e.title}>
                      <Reveal>
                        {e.href ? (
                          <a href={e.href} target="_blank" rel="noreferrer" className={cls}>
                            {Body}
                          </a>
                        ) : (
                          <div className={cls}>{Body}</div>
                        )}
                      </Reveal>
                    </li>
                  );
                })}
              </ol>

              <Reveal className="mt-10">
                <div className="flex gap-4 rounded-xl border border-border bg-card/60 p-5">
                  <GraduationCap className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-medium text-heading">{education.school}</h3>
                    <p className="text-sm text-muted-foreground">
                      {education.degree} · {education.grad}
                    </p>
                    <p className="mt-2 font-mono text-xs text-foreground/80">
                      GPA {education.gpa} · {education.honors}
                    </p>
                  </div>
                </div>
              </Reveal>

              <a
                href={asset(profile.resume)}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-1 font-medium text-heading hover:text-primary"
              >
                View full résumé
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Section>

            <Section id="research" title="Research">
              <Reveal>
                <a
                  href={publication.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-xl border border-border bg-card/60 p-5 transition-colors hover:border-primary/40"
                >
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{publication.venue}</p>
                  <h3 className="mt-2 font-semibold leading-snug text-heading group-hover:text-primary">
                    {publication.title}
                    <ArrowUpRight className="ml-1 inline size-4 align-[-2px]" />
                  </h3>
                  <p className="mt-1 text-sm text-foreground/80">{publication.authors}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{publication.summary}</p>
                  <p className="mt-3 font-mono text-xs text-muted-foreground">DOI {publication.doi}</p>
                </a>
              </Reveal>
            </Section>

            <Section id="skills" title="Skills">
              <Reveal>
                <dl className="divide-y divide-border/70 border-y border-border/70">
                  {skills.map((s) => (
                    <div key={s.group} className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                      <dt className="pt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{s.group}</dt>
                      <dd>
                        <ul className="flex flex-wrap gap-1.5">
                          {s.items.map((i) => (
                            <li key={i} className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground/85">
                              {i}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </Section>

            <section aria-label="Contact" className="mb-16">
              <Reveal>
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold tracking-tight text-heading">Let&apos;s build something that works on real hardware.</h2>
                  <p className="mt-3 text-muted-foreground">
                    I&apos;m looking for Summer 2027 internships in robotics, embedded firmware, hardware reliability, or neurotech.
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-5 inline-block font-mono text-sm text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                  >
                    {profile.email}
                  </a>
                </div>
              </Reveal>
            </section>

            <footer className="pb-16 text-sm text-muted-foreground">
              <p>
                Built with Next.js, Tailwind CSS and components from Cult UI. Set in Inter and JetBrains Mono.
              </p>
              <p className="mt-1 font-mono text-xs">© 2026 {profile.name}</p>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}
