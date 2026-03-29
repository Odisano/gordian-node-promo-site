import contentData from "./content.json";

export type Locale = "ru" | "en";

type LinkItem = {
  label: string;
  href: string;
};

type Card = {
  title: string;
  body: string;
  bullets?: string[];
  kicker?: string;
  note?: string;
};

type ScreenshotItem = {
  title: string;
  body: string;
  image: string;
  size?: "wide" | "tall";
};

type LocaleContent = {
  metaTitle: string;
  nav: LinkItem[];
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primary: string;
    secondary: string;
    facts: string[];
    metrics: { value: string; label: string }[];
  };
  sections: {
    overview: { eyebrow: string; title: string; body: string; cards: Card[] };
    workflows: { eyebrow: string; title: string; body: string; cards: Card[] };
    combined: { eyebrow: string; title: string; body: string; cards: Card[] };
    gallery: { eyebrow: string; title: string; body: string; items: ScreenshotItem[] };
    video: {
      eyebrow: string;
      title: string;
      body: string;
      placeholderTitle: string;
      placeholderBody: string;
      notesTitle: string;
      notes: string[];
    };
    changelog: {
      eyebrow: string;
      title: string;
      body: string;
      highlights: { label: string; title: string; body: string }[];
      items: { tag: string; title: string; body: string; bullets: string[] }[];
    };
    stack: { eyebrow: string; title: string; body: string; cards: Card[] };
    next: { eyebrow: string; title: string; body: string; cards: Card[] };
  };
  footer: {
    note: string;
    links: LinkItem[];
  };
};

export const repoUrl = "https://github.com/Odisano/lusnidzor-architect";
export const liveUrl = "https://narrative-tool-cfdf9.web.app";
export const promoRepoUrl = "https://github.com/Odisano/gordian-node-promo-site";
export const videoEmbedUrl = "";

export const content = contentData as Record<Locale, LocaleContent>;
