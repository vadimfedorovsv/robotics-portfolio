import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Play } from "lucide-react";
import { HoverVideoPlayer } from "@/components/ui/hover-video-player";
import { Reveal } from "@/components/motion";
import { Shell } from "@/components/shell";
import { asset, projects, type Project } from "@/lib/data";
import { notes } from "@/lib/notes";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...projects.map((p) => ({ slug: p.id })), ...notes.map((n) => ({ slug: n.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.id === slug);
  if (p) return { title: p.title, description: p.summary };
  const n = notes.find((x) => x.slug === slug);
  return n ? { title: n.title, description: n.paragraphs[0]?.slice(0, 150) } : {};
}

function NotePage({ slug }: { slug: string }) {
  const n = notes.find((x) => x.slug === slug);
  if (!n) notFound();
  return (
    <Shell back>
      <Reveal>
        <h1 className="mb-8 text-[1.6em] leading-tight font-medium tracking-tight text-heading">{n.title}</h1>
      </Reveal>
      <Reveal step={1}>
        <div className="space-y-5 text-heading/90">
          {n.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {n.list && (
            <ul className="list-disc space-y-3 pl-5 marker:text-subtle">
              {n.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
    </Shell>
  );
}

function Media({ media }: { media: Project["media"] }) {
  if (media.kind === "video") {
    return (
      <figure className="my-10">
        <div className="mx-auto max-w-[360px] overflow-hidden rounded-lg">
          <HoverVideoPlayer
            videoSrc={asset(media.src)}
            thumbnailSrc={asset(media.poster)}
            muted
            loop
            restartOnPaused
            preload="none"
            className="aspect-[9/16] w-full"
            pausedOverlay={
              <div className="absolute inset-x-0 bottom-0 flex justify-center p-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-[0.7em] text-white italic backdrop-blur">
                  <Play className="size-3 fill-current" />
                  <span className="[@media(pointer:fine)]:hidden">Tap to play</span>
                  <span className="hidden [@media(pointer:fine)]:inline">Hover to play</span>
                </span>
              </div>
            }
          />
        </div>
        <figcaption className="mt-3 text-center text-[0.8em] text-subtle italic">{media.caption}</figcaption>
      </figure>
    );
  }
  const [first, ...rest] = media.srcs;
  const isPlot = first.src.includes("/bci/");
  return (
    <figure className="my-10">
      {/* eslint-disable @next/next/no-img-element */}
      <img src={asset(first.src)} alt={first.alt} className={`w-full rounded-lg ${isPlot ? "plot-dark" : ""}`} />
      {rest.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          {rest.map((r) => (
            <img key={r.src} src={asset(r.src)} alt={r.alt} loading="lazy" className={`w-full rounded-lg ${isPlot ? "plot-dark" : ""}`} />
          ))}
        </div>
      )}
      <figcaption className="mt-3 text-center text-[0.8em] text-subtle italic">{media.caption}</figcaption>
    </figure>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.id === slug);
  if (!p) return <NotePage slug={slug} />;

  return (
    <Shell back>
      <Reveal>
        <h1 className="text-[1.6em] leading-tight font-medium tracking-tight text-heading">{p.title}</h1>
        <p className="mt-1 text-[0.85em] text-subtle italic">{p.meta}</p>
        <p className="mt-6 text-heading/90">{p.summary}</p>
      </Reveal>

      <Reveal step={1}>
        <Media media={p.media} />
      </Reveal>

      <Reveal step={2}>
        <div className="space-y-8">
          {p.sections.map((s) => (
            <section key={s.label}>
              <h2 className="mb-2 text-heading italic">{s.label}</h2>
              {Array.isArray(s.body) ? (
                <ul className="list-disc space-y-2 pl-5 marker:text-subtle">
                  {s.body.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : (
                <p>{s.body}</p>
              )}
            </section>
          ))}
        </div>

        <p className="mt-10 text-[0.85em] text-subtle">{p.tags.join(" · ")}</p>
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {p.links.map((l) => (
            <a key={l.href} className="link" href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </p>
      </Reveal>
    </Shell>
  );
}
