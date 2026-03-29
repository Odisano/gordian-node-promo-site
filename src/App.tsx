import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { AdminPanel } from "./AdminPanel";
import { liveUrl, repoUrl, type Locale, type LocaleContent } from "./content";
import { cloneData, contentStorageKey, getInitialContent, getInitialLocale, localeStorageKey } from "./siteUtils";
import { InfoCard, SectionBlock } from "./ui";

function App() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [siteData, setSiteData] = useState<Record<Locale, LocaleContent>>(getInitialContent);
  const [adminOpen, setAdminOpen] = useState(false);
  const [jsonDraft, setJsonDraft] = useState("");
  const [statusText, setStatusText] = useState("");
  const importRef = useRef<HTMLInputElement | null>(null);

  const t = siteData[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.metaTitle;
    window.localStorage.setItem(localeStorageKey, locale);
  }, [locale, t.metaTitle]);

  useEffect(() => {
    window.localStorage.setItem(contentStorageKey, JSON.stringify(siteData));
    setStatusText(locale === "ru" ? "Изменения сохранены в этом браузере." : "Changes saved in this browser.");
  }, [siteData, locale]);

  useEffect(() => {
    if (adminOpen) {
      setJsonDraft(JSON.stringify(siteData[locale], null, 2));
    }
  }, [adminOpen, locale, siteData]);

  const updateLocaleContent = (mutate: (draft: LocaleContent) => void) => {
    setSiteData((current) => {
      const next = cloneData(current);
      mutate(next[locale]);
      return next;
    });
  };

  const exportContent = () => {
    const blob = new Blob([JSON.stringify(siteData, null, 2)], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = `gordian-node-site-content-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(href);
  };

  const applyJsonDraft = () => {
    try {
      const parsed = JSON.parse(jsonDraft) as LocaleContent;
      setSiteData((current) => {
        const next = cloneData(current);
        next[locale] = parsed;
        return next;
      });
      setStatusText(locale === "ru" ? "JSON применён к текущему языку." : "JSON applied to the current locale.");
    } catch {
      setStatusText(locale === "ru" ? "JSON содержит ошибку." : "The JSON draft is invalid.");
    }
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed?.ru || !parsed?.en) {
        throw new Error("Invalid shape");
      }
      setSiteData(parsed as Record<Locale, LocaleContent>);
      setStatusText(locale === "ru" ? "Контент импортирован." : "Content imported.");
    } catch {
      setStatusText(locale === "ru" ? "Не удалось импортировать JSON." : "Could not import JSON.");
    } finally {
      event.target.value = "";
    }
  };

  const resetToDefaults = () => {
    const confirmed = window.confirm(
      locale === "ru"
        ? "Сбросить локальные изменения и вернуть сайт к исходному контенту?"
        : "Reset local changes and restore the default site content?",
    );
    if (!confirmed) return;
    window.localStorage.removeItem(contentStorageKey);
    const next = getInitialContent();
    setSiteData(next);
  };

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

          <div className="flex items-center gap-3">
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
            <button type="button" onClick={() => setAdminOpen(true)} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-mist-100/80 transition hover:border-mint-300/40 hover:text-white">
              Webmaster
            </button>
          </div>
        </header>

        <main id="top" className="mx-auto w-[min(1180px,calc(100%-28px))] pb-20 pt-14 md:pt-20">
          <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="py-6">
              <p className="font-display text-xs font-bold uppercase tracking-[0.32em] text-mint-300">{t.hero.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl lg:text-7xl">{t.hero.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-mist-100/75 sm:text-lg">{t.hero.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={liveUrl} target="_blank" rel="noreferrer" className="rounded-full bg-mint-300 px-5 py-3 font-display text-sm font-bold text-ink-950 transition hover:-translate-y-0.5">
                  {t.hero.primary}
                </a>
                <a href={repoUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-display text-sm font-bold text-white transition hover:border-white/25">
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
                <span className="rounded-full bg-white/6 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-mint-300">Project overview</span>
                <span className="text-sm text-mist-100/65">Visual editing, writing, QA, export</span>
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

          <SectionBlock id="overview" eyebrow={t.sections.overview.eyebrow} title={t.sections.overview.title} body={t.sections.overview.body}><div className="grid gap-4 md:grid-cols-3">{t.sections.overview.cards.map((card) => <InfoCard key={card.title} card={card} />)}</div></SectionBlock>
          <SectionBlock id="workflows" eyebrow={t.sections.workflows.eyebrow} title={t.sections.workflows.title} body={t.sections.workflows.body}><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{t.sections.workflows.cards.map((card) => <InfoCard key={card.title} card={card} />)}</div></SectionBlock>
          <SectionBlock id="combined" eyebrow={t.sections.combined.eyebrow} title={t.sections.combined.title} body={t.sections.combined.body}><div className="grid gap-4 lg:grid-cols-2">{t.sections.combined.cards.map((card) => <InfoCard key={card.title} card={card} emphasis />)}</div></SectionBlock>

          <SectionBlock id="gallery" eyebrow={t.sections.gallery.eyebrow} title={t.sections.gallery.title} body={t.sections.gallery.body}>
            <div className="grid gap-4 lg:grid-cols-12">
              {t.sections.gallery.items.map((item) => {
                const widthClass = item.size === "wide" ? "lg:col-span-7" : "lg:col-span-5";
                const tallClass = item.size === "tall" ? "min-h-[460px]" : "min-h-[320px]";
                return (
                  <article key={item.title} className={`overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-calm ${widthClass}`}>
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
            {t.sections.video.items.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2">{t.sections.video.items.map((video) => <article key={`${video.title}-${video.embedUrl}`} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-calm"><div className="aspect-video bg-ink-900"><iframe title={video.title} src={video.embedUrl} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" /></div><div className="space-y-2 p-5"><h3 className="font-display text-2xl font-bold text-white">{video.title}</h3><p className="text-sm leading-7 text-mist-100/75">{video.body}</p></div></article>)}</div>
            ) : (
              <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-calm lg:grid lg:grid-cols-[1.2fr_0.8fr]"><div className="relative min-h-[280px] border-b border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(133,222,207,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] lg:min-h-[420px] lg:border-b-0 lg:border-r"><div className="absolute inset-0 grid place-items-center px-8 text-center"><div><p className="font-display text-2xl font-bold text-white">{t.sections.video.placeholderTitle}</p><p className="mt-3 max-w-md text-sm leading-7 text-mist-100/75">{t.sections.video.placeholderBody}</p></div></div></div><div className="p-6"><h3 className="font-display text-2xl font-bold text-white">{t.sections.video.notesTitle}</h3><ul className="mt-5 space-y-3 text-sm leading-7 text-mist-100/75">{t.sections.video.notes.map((item) => <li key={item} className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sand-300" /><span>{item}</span></li>)}</ul></div></div>
            )}
          </SectionBlock>

          <SectionBlock eyebrow={t.sections.articles.eyebrow} title={t.sections.articles.title} body={t.sections.articles.body}><div className="grid gap-4 lg:grid-cols-2">{t.sections.articles.items.map((article) => <article key={`${article.date}-${article.title}`} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-calm"><div className="flex flex-wrap items-center justify-between gap-3"><span className="font-display text-sm font-bold uppercase tracking-[0.16em] text-mint-300">{article.date}</span><div className="flex flex-wrap gap-2">{(article.tags ?? []).map((tag) => <span key={tag} className="rounded-full bg-white/6 px-3 py-1 text-xs text-mist-100/70">{tag}</span>)}</div></div><h3 className="mt-4 font-display text-2xl font-bold text-white">{article.title}</h3><p className="mt-3 text-sm leading-7 text-mist-100/85">{article.excerpt}</p><p className="mt-4 whitespace-pre-line text-sm leading-7 text-mist-100/72">{article.body}</p></article>)}</div></SectionBlock>
          <SectionBlock eyebrow={t.sections.resources.eyebrow} title={t.sections.resources.title} body={t.sections.resources.body}><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{t.sections.resources.items.map((resource) => <article key={`${resource.title}-${resource.url}`} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-calm"><span className="rounded-full bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.16em] text-mint-300">{resource.type}</span><h3 className="mt-4 font-display text-2xl font-bold text-white">{resource.title}</h3><p className="mt-3 text-sm leading-7 text-mist-100/75">{resource.body}</p><a href={resource.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-mint-300/40">Open</a></article>)}</div></SectionBlock>

          <SectionBlock id="changelog" eyebrow={t.sections.changelog.eyebrow} title={t.sections.changelog.title} body={t.sections.changelog.body}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{t.sections.changelog.highlights.map((item) => <article key={item.title} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5"><span className="text-xs font-bold uppercase tracking-[0.25em] text-mint-300">{item.label}</span><h3 className="mt-3 font-display text-xl font-bold text-white">{item.title}</h3><p className="mt-3 text-sm leading-7 text-mist-100/70">{item.body}</p></article>)}</div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">{t.sections.changelog.items.map((item) => <article key={item.title} className="rounded-[28px] border border-white/10 bg-ink-900/80 p-6 shadow-calm"><div className="flex flex-wrap items-center justify-between gap-3"><span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-mint-300">{item.tag}</span><span className="text-sm text-mist-100/55">{item.bullets.length} points</span></div><h3 className="mt-4 font-display text-2xl font-bold text-white">{item.title}</h3><p className="mt-3 text-sm leading-7 text-mist-100/75">{item.body}</p><ul className="mt-4 space-y-2 text-sm leading-7 text-mist-100/70">{item.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mint-300" /><span>{bullet}</span></li>)}</ul></article>)}</div>
          </SectionBlock>

          <SectionBlock eyebrow={t.sections.stack.eyebrow} title={t.sections.stack.title} body={t.sections.stack.body}><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{t.sections.stack.cards.map((card) => <InfoCard key={card.title} card={card} />)}</div></SectionBlock>
        </main>

        <footer className="mx-auto mb-8 w-[min(1180px,calc(100%-28px))] rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-sm text-mist-100/70 shadow-calm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>{t.footer.note}</p>
            <div className="flex flex-wrap gap-4">{t.footer.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="transition hover:text-white">{link.label}</a>)}</div>
          </div>
        </footer>

        <button type="button" onClick={() => setAdminOpen(true)} className="fixed bottom-5 right-5 z-30 rounded-full border border-mint-300/30 bg-ink-950/90 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-mint-300 shadow-calm backdrop-blur transition hover:border-mint-300/60">
          Webmaster
        </button>

        {adminOpen ? <AdminPanel locale={locale} statusText={statusText} jsonDraft={jsonDraft} setJsonDraft={setJsonDraft} content={t} onClose={() => setAdminOpen(false)} onExport={exportContent} onImportClick={() => importRef.current?.click()} onApplyJson={applyJsonDraft} onReset={resetToDefaults} updateLocaleContent={updateLocaleContent} /> : null}
        <input ref={importRef} type="file" accept="application/json" className="hidden" onChange={handleImport} />
      </div>
    </div>
  );
}

export default App;
