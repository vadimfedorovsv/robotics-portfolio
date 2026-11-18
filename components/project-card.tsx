import { ArrowUpRight, Play } from "lucide-react";
import { HoverVideoPlayer } from "@/components/ui/hover-video-player";
import { asset, type Project } from "@/lib/data";

function Media({ media, title }: { media: Project["media"]; title: string }) {
  if (media.kind === "video") {
    return (
      <figure>
        {/* Phone: photo on top, then video beside the spec sheet. sm+: tall video left, photo + specs right. */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          <div className="order-2 self-start overflow-hidden rounded-lg border border-border bg-black sm:order-1 sm:col-span-2">
            <HoverVideoPlayer
              videoSrc={asset(media.src)}
              thumbnailSrc={asset(media.poster)}
              muted
              loop
              restartOnPaused
              preload="none"
              className="aspect-[9/16] w-full"
              pausedOverlay={
                <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 font-mono text-[11px] text-white backdrop-blur">
                    <Play className="size-3 fill-current" />
                    <span className="[@media(pointer:fine)]:hidden">Tap to play</span>
                    <span className="hidden [@media(pointer:fine)]:inline">Hover to play</span>
                  </span>
                </div>
              }
            />
          </div>
          <div className="contents sm:order-2 sm:col-span-3 sm:flex sm:flex-col sm:gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(media.side.image.src)}
              alt={media.side.image.alt}
              loading="lazy"
              className="order-1 col-span-2 w-full rounded-lg border border-border bg-white object-contain sm:col-span-1"
            />
            <dl className="order-3 rounded-lg border border-border bg-card p-3 font-mono text-[11px] leading-relaxed sm:flex-1 sm:p-4 sm:text-xs">
              <p className="mb-2 text-[10px] uppercase tracking-widest text-primary">// spec sheet</p>
              {media.side.specs.map(([k, v]) => (
                <div
                  key={k}
                  className="border-b border-dashed border-border py-1.5 last:border-0 sm:flex sm:justify-between sm:gap-3"
                >
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs sm:normal-case sm:tracking-normal">
                    {k}
                  </dt>
                  <dd className="text-foreground/90 sm:text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <figcaption className="mt-2 text-xs text-muted-foreground">{media.caption}</figcaption>
      </figure>
    );
  }
  const [first, ...rest] = media.srcs;
  return (
    <figure>
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src={asset(first.src)}
        alt={first.alt}
        loading="lazy"
        className="w-full rounded-lg border border-border bg-white object-contain"
      />
      {rest.length > 0 && (
        <div className="mt-2 grid grid-cols-2 gap-2">
          {rest.map((r) => (
            <img
              key={r.src}
              src={asset(r.src)}
              alt={r.alt}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-lg border border-border bg-white object-contain"
            />
          ))}
        </div>
      )}
      <figcaption className="mt-2 text-xs text-muted-foreground">{media.caption}</figcaption>
      <span className="sr-only">{title} figures</span>
    </figure>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <article
      id={p.id}
      className="group relative rounded-xl border border-transparent p-0 transition-colors lg:-mx-5 lg:p-5 lg:hover:border-border lg:hover:bg-card/70"
    >
      <Media media={p.media} title={p.title} />

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{p.meta}</p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-heading">{p.title}</h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">{p.summary}</p>

        {p.badges && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Key results">
            {p.badges.map((b) => (
              <li
                key={b}
                className="rounded-md border border-primary/25 bg-primary/10 px-2 py-1 font-mono text-xs font-medium text-primary"
              >
                {b}
              </li>
            ))}
          </ul>
        )}

        <dl className="mt-5 space-y-4">
          {p.sections.map((s) => (
            <div key={s.label} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <dt className="pt-0.5 font-mono text-xs uppercase tracking-wider text-primary/90">{s.label}</dt>
              <dd className="text-sm leading-relaxed text-foreground/85">
                {Array.isArray(s.body) ? (
                  <ul className="space-y-1.5">
                    {s.body.map((b) => (
                      <li key={b} className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-muted-foreground/50">
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : (
                  s.body
                )}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.tags.map((t) => (
            <li key={t} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground/80">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {p.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1 text-sm font-medium text-heading hover:text-primary"
            >
              {l.label}
              <ArrowUpRight className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
