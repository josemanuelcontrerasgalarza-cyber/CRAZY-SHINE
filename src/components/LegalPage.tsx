import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "./ui/Logo";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-ink">
      <div className="container-x max-w-4xl py-10">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Crazy Shine — inicio">
            <Logo />
          </Link>
          <Link href="/" className="label inline-flex items-center gap-2 text-metal hover:text-bone">
            <ArrowLeft className="h-3.5 w-3.5" /> Volver
          </Link>
        </div>
        <h1 className="display mt-24 text-[clamp(3rem,9vw,7rem)] text-bone">{title}</h1>
        <p className="label mt-6 text-metal">Última actualización: {updated}</p>
        <div className="mt-16 space-y-10 pb-24 leading-relaxed text-bone/80 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-bone [&_p]:mt-3">
          {children}
        </div>
      </div>
    </main>
  );
}
