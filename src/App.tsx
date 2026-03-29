import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { content, liveUrl, promoRepoUrl, repoUrl, type Locale, videoEmbedUrl } from "./content";

const localeStorageKey = "gordian-node-promo-locale";

function getInitialLocale(): Locale {
  const stored = window.localStorage.getItem(localeStorageKey);
  if (stored === "ru" || stored === "en") {
    return stored;
  }

  return navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
}

function App() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const t = content[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.metaTitle;
    window.localStorage.setItem(localeStorageKey, locale);
  }, [locale, t.metaTitle]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(133,222,207,0.12),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(222,193,151,0.12),_transparent_18%),linear-gradient(180deg,_#0a1320_0%,_#09101a_44%,_#060b12_100%)] text-mist-50">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.82),transparent_92%)]" />

      <div className="relative z-10">
        <header className="sticky top-4 z-30 mx-auto mt-4 flex w-[min(1220px,calc(100%-20px))] flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-ink-950/80 px-4 py-3 shadow-calm backdrop-blur">
          <a href="#top" className="flex items-center gap-3">
            <img src="/media/logo.png" alt="Gordian Node logo" className="h-11 w-11 rounded-2xl bg-white/5 p-1.5" />
            <div>
              <div className="font-display text-sm font-bold tracking-[0.18em] text-mint-300">GORDIAN NODE</div>
              <div className="text-sm text-mist-200/80">Narrative workspace</div>
            </div>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-mist-200/75">
            {t.nav.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold">
            {(["ru", "en"] as Locale[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setLocale(value)}
                className={`rounded-full px-3 py-2 transition ${
                  locale === value ? "bg-mint-300 text-ink-950" : "text-mist-100/70 hover:text-white"
                }`}
              >
                {value.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        <main id="top" className="mx-auto w-[min(1180px,calc(100%-28px))] pb-20 pt-14 md:pt-20">
          <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="py-6">
              <p className="font-display text-xs font-bold uppercase tracking-[0.32em] text-mint-300">{t.hero.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl">
                {t.hero.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-mist-100/75 sm:text-lg">{t.hero.body}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-mint-300 px-5 py-3 font-display text-sm font-bold text-ink-950 transition hover:-translate-y-0.5"
                >
                  {t.hero.primary}
                </a>
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-display text-sm font-bold text-white transition hover:border-white/25"
                >
                  {t.hero.secondary}
                </a>
              </div>

              <ul className="mt-8 space-y-3 text-sm leading-7 text-mist-100/75 sm:text-base">
                {t.hero.facts.map((fact) => (
                  <li key={fact} className="flex gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-mint-300 shadow-[0_0_18px_rgba(133,222,207,0.75)]" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-calm">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-white/6 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-mint-300">
                  Product snapshot
                </span>
                <span className="text-sm text-mist-100/65">README + changelog aware</span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {t.hero.metrics.map((metric) => (
                  <article key={metric.value} className="rounded-3xl border border-white/10 bg-ink-900/70 p-4">
                    <strong className="block font-display text-lg font-bold text-sand-300">{metric.value}</strong>
                    <span className="mt-2 block text-sm leading-6 text-mist-100/70">{metric.label}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <SectionBlock id="overview" eyebrow={t.sections.overview.eyebrow} title={t.sections.overview.title} body={t.sections.overview.body}>
            <div className="grid gap-4 md:grid-cols-3">
              {t.sections.overview.cards.map((card) => (
                <InfoCard key={card.title} card={card} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="workflows" eyebrow={t.sections.workflows.eyebrow} title={t.sections.workflows.title} body={t.sections.workflows.body}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {t.sections.workflows.cards.map((card) => (
                <InfoCard key={card.title} card={card} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="combined" eyebrow={t.sections.combined.eyebrow} title={t.sections.combined.title} body={t.sections.combined.body}>
            <div className="grid gap-4 lg:grid-cols-2">
              {t.sections.combined.cards.map((card) => (
                <InfoCard key={card.title} card={card} emphasis />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="gallery" eyebrow={t.sections.gallery.eyebrow} title={t.sections.gallery.title} body={t.sections.gallery.body}>
            <div className="grid gap-4 lg:grid-cols-12">
              {t.sections.gallery.items.map((item) => {
                const widthClass = item.size === "wide" ? "lg:col-span-7" : "lg:col-span-5";
                const tallClass = item.size === "tall" ? "min-h-[460px]" : "min-h-[320px]";

                return (
                  <article
                    key={item.title}
                    className={`overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-calm ${widthClass}`}
                  >
                    <div className={`relative ${tallClass}`}>
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />
                    </div>
                    <div className="space-y-2 p-5">
                      <h3 className="font-display text-2xl font-bold text-white">{item.title}</h3>
                      <p className="max-w-2xl text-sm leading-7 text-mist-100/75">{item.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </SectionBlock>

          <SectionBlock id="video" eyebrow={t.sections.video.eyebrow} title={t.sections.video.title} body={t.sections.video.body}>
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-calm lg:grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative min-h-[280px] border-b border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(133,222,207,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] lg:min-h-[420px] lg:border-b-0 lg:border-r">
                {videoEmbedUrl ? (
                  <iframe
                    title="Gordian Node video"
                    src={videoEmbedUrl}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center px-8 text-center">
                    <div>
                      <p className="font-display text-2xl font-bold text-white">{t.sections.video.placeholderTitle}</p>
                      <p className="mt-3 max-w-md text-sm leading-7 text-mist-100/75">{t.sections.video.placeholderBody}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-white">{t.sections.video.notesTitle}</h3>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-mist-100/75">
                  {t.sections.video.notes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sand-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionBlock>

          <SectionBlock id="changelog" eyebrow={t.sections.changelog.eyebrow} title={t.sections.changelog.title} body={t.sections.changelog.body}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {t.sections.changelog.highlights.map((item) => (
                <article key={item.title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-mint-300">{item.label}</span>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-mist-100/70">{item.body}</p>
                </article>
              ))}
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {t.sections.changelog.items.map((item) => (
                <article key={item.title} className="rounded-[28px] border border-white/10 bg-ink-900/80 p-6 shadow-calm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-mint-300">{item.tag}</span>
                    <span className="text-sm text-mist-100/55">{item.bullets.length} points</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-mist-100/75">{item.body}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-mist-100/70">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mint-300" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock eyebrow={t.sections.stack.eyebrow} title={t.sections.stack.title} body={t.sections.stack.body}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {t.sections.stack.cards.map((card) => (
                <InfoCard key={card.title} card={card} />
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="next" eyebrow={t.sections.next.eyebrow} title={t.sections.next.title} body={t.sections.next.body}>
            <div className="grid gap-4 md:grid-cols-2">
              {t.sections.next.cards.map((card) => (
                <InfoCard key={card.title} card={card} />
              ))}
            </div>
          </SectionBlock>
        </main>

        <footer className="mx-auto mb-8 w-[min(1180px,calc(100%-28px))] rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-sm text-mist-100/70 shadow-calm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>{t.footer.note}</p>
            <div className="flex flex-wrap gap-4">
              {t.footer.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-4 text-xs uppercase tracking-[0.2em] text-mist-200/40">{promoRepoUrl.replace("https://github.com/", "")}</div>
        </footer>
      </div>
    </div>
  );
}

function SectionBlock({
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

function InfoCard({
  card,
  emphasis = false,
}: {
  card: { title: string; body: string; bullets?: string[]; kicker?: string; note?: string };
  emphasis?: boolean;
}) {
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

export default App;
