import type { ReactNode } from "react";
import type { Card } from "./content";

export function SectionBlock({
  id,
  eyebrow,
  title,
  body,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="pt-16">
      <div className="mb-8 max-w-3xl">
        <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-mint-300">{eyebrow}</p>
        <h2 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-8 text-mist-100/75">{body}</p>
      </div>
      {children}
    </section>
  );
}

export function InfoCard({ card, emphasis = false }: { card: Card; emphasis?: boolean }) {
  return (
    <article className={`rounded-[28px] border border-white/10 p-5 shadow-calm ${emphasis ? "bg-ink-900/80" : "bg-white/[0.04]"}`}>
      {card.kicker ? (
        <span className="inline-flex rounded-full bg-mint-300/10 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-mint-300">
          {card.kicker}
        </span>
      ) : null}
      <h3 className="mt-3 font-display text-2xl font-bold text-white">{card.title}</h3>
      <p className="mt-3 text-sm leading-7 text-mist-100/75">{card.body}</p>
      {card.bullets?.length ? (
        <ul className="mt-4 space-y-2 text-sm leading-7 text-mist-100/70">
          {card.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mint-300" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {card.note ? <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-sand-300">{card.note}</p> : null}
    </article>
  );
}
