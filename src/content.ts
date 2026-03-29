import contentData from "./content.json";

export type Locale = "ru" | "en";

export type LinkItem = {
  label: string;
  href: string;
};

export type Card = {
  title: string;
  body: string;
  bullets?: string[];
  kicker?: string;
  note?: string;
};

export type ScreenshotItem = {
  title: string;
  body: string;
  image: string;
  size?: "wide" | "tall";
};

export type VideoItem = {
  title: string;
  body: string;
  embedUrl: string;
};

export type ArticleItem = {
  date: string;
  title: string;
  excerpt: string;
  body: string;
  tags?: string[];
};

export type ResourceItem = {
  title: string;
  body: string;
  url: string;
  type: string;
};

export type LocaleContent = {
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
      items: VideoItem[];
    };
    articles: { eyebrow: string; title: string; body: string; items: ArticleItem[] };
    resources: { eyebrow: string; title: string; body: string; items: ResourceItem[] };
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
export const defaultContent = contentData as Record<Locale, LocaleContent>;
