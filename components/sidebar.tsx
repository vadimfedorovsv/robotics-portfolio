"use client";

import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import { StatCounter, useActiveSection } from "@/components/motion";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { asset, profile, stats } from "@/lib/data";

const NAV = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
];
const NAV_IDS = NAV.map((n) => n.id);

export function Sidebar() {
  const active = useActiveSection(NAV_IDS);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-20">
      <div>
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(profile.headshot)}
            alt="Portrait of Vadim Fedorov"
            width={64}
            height={64}
            className="size-16 rounded-full object-cover ring-1 ring-border"
          />
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {profile.status}
          </p>
        </div>

        <h1 className="sr-only">{profile.name}</h1>
        <div aria-hidden>
          <TextAnimate
            text={profile.name}
            type="calmInUp"
            className="mt-6 text-4xl font-bold tracking-tight text-heading sm:text-5xl"
          />
        </div>
        <p className="mt-3 font-mono text-sm text-primary">{profile.role}</p>
        <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">{profile.tagline}</p>

        <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-y border-border/70 py-5">
          {stats.map((s) => (
            <StatCounter key={s.label} stat={s} />
          ))}
        </dl>

        <nav className="mt-12 hidden lg:block" aria-label="In-page">
          <ul className="w-max">
            {NAV.map((n) => {
              const on = active === n.id;
              return (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="group flex items-center py-2.5" aria-current={on ? "true" : undefined}>
                    <span
                      className={`mr-4 h-px transition-all duration-300 motion-reduce:transition-none ${
                        on ? "w-16 bg-heading" : "w-8 bg-muted-foreground/60 group-hover:w-16 group-hover:bg-heading"
                      }`}
                    />
                    <span
                      className={`font-mono text-xs font-medium uppercase tracking-widest ${
                        on ? "text-heading" : "text-muted-foreground group-hover:text-heading"
                      }`}
                    >
                      {n.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-0">
        <a
          href={asset(profile.resume)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
        >
          <FileText className="size-4" /> Resume
          <ArrowUpRight className="size-3.5 opacity-70" />
        </a>
        {[
          { href: profile.github, label: "GitHub", Icon: GitHubIcon },
          { href: profile.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
        ].map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary/50 hover:text-heading"
          >
            <Icon className="size-4" />
          </a>
        ))}
        <a
          href={`mailto:${profile.email}`}
          aria-label="Email"
          className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary/50 hover:text-heading"
        >
          <Mail className="size-4" />
        </a>
      </div>
    </header>
  );
}
