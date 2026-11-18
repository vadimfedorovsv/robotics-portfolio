import Link from "next/link";
import { asset, profile } from "@/lib/data";

/** Narrow single column shared by every page. */
export function Shell({ children, back = false }: { children: React.ReactNode; back?: boolean }) {
  return (
    <div className="mx-auto min-h-screen max-w-[640px] px-6 pt-16 pb-20 sm:pt-24">
      {back && (
        <Link href="/" className="mb-12 inline-block text-[0.9em] text-subtle italic hover:text-heading">
          ← Vadim Fedorov
        </Link>
      )}
      <main>{children}</main>
      <footer className="mt-24 flex flex-wrap gap-x-5 gap-y-1 border-t border-rule pt-6 text-[0.85em] text-subtle">
        <a className="hover:text-heading" href={asset(profile.resume)} target="_blank" rel="noreferrer">
          Résumé
        </a>
        <a className="hover:text-heading" href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="hover:text-heading" href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="hover:text-heading" href={`mailto:${profile.email}`}>
          Email
        </a>
      </footer>
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 text-[1.15em] font-medium text-heading">{children}</h2>;
}
