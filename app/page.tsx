import Link from "next/link";
import { Reveal } from "@/components/motion";
import { SectionTitle, Shell } from "@/components/shell";
import { about, asset, experience, profile, projects, publication } from "@/lib/data";

export default function Home() {
  return (
    <Shell>
      <Reveal>
        <header className="mb-10 flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(profile.headshot)}
            alt=""
            width={56}
            height={56}
            className="size-14 rounded-full object-cover"
          />
          <div>
            <h1 className="text-[1.6em] leading-tight font-medium tracking-tight text-heading">{profile.name}</h1>
            <p className="text-[0.85em] text-subtle italic">{profile.role}</p>
          </div>
        </header>
      </Reveal>

      <Reveal step={1}>
        <section aria-label="Bio" className="space-y-5 text-heading/90">
          {about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            {profile.status}.{" "}
            <a className="link" href={`mailto:${profile.email}`}>
              Say hi
            </a>
            .
          </p>
        </section>
      </Reveal>

      <Reveal step={2}>
        <section className="mt-14">
          <SectionTitle>Projects</SectionTitle>
          <ul className="space-y-4">
            {projects.map((p) => (
              <li key={p.id}>
                <Link href={`/${p.id}/`} className="group block">
                  <span className="link">{p.title}</span>
                  <span className="block text-[0.85em] text-subtle">{p.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal step={3}>
        <section className="mt-14">
          <SectionTitle>Work</SectionTitle>
          <ul className="space-y-2">
            {experience.map((e) => (
              <li key={e.title} className="flex items-baseline justify-between gap-6">
                <span>
                  <span className="text-heading">{e.title}</span>
                  <span className="text-subtle">, {e.org}</span>
                </span>
                <span className="shrink-0 text-[0.8em] text-subtle tabular-nums">{e.dates}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal step={4}>
        <section className="mt-14">
          <SectionTitle>Writing</SectionTitle>
          <p>
            <a className="link" href={publication.href} target="_blank" rel="noreferrer">
              {publication.title}
            </a>
            <span className="block text-[0.85em] text-subtle">
              {publication.venue}, with {publication.authors.split(", ")[1]}
            </span>
          </p>
        </section>
      </Reveal>
    </Shell>
  );
}
