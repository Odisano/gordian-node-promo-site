import type { Locale, LocaleContent } from "./content";
import { defaultContent } from "./content";

export const localeStorageKey = "gordian-node-promo-locale";
export const contentStorageKey = "gordian-node-site-content-v2";

export function cloneData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function getInitialLocale(): Locale {
  const stored = window.localStorage.getItem(localeStorageKey);
  if (stored === "ru" || stored === "en") {
    return stored;
  }

  return navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
}

export function getInitialContent() {
  const stored = window.localStorage.getItem(contentStorageKey);
  if (!stored) {
    return cloneData(defaultContent);
  }

  try {
    const parsed = JSON.parse(stored);
    if (parsed?.ru && parsed?.en) {
      return parsed as Record<Locale, LocaleContent>;
    }
  } catch {
    return cloneData(defaultContent);
  }

  return cloneData(defaultContent);
}

export function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function splitCommaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function pickFile(accept: string) {
  return new Promise<File | null>((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = () => resolve(input.files?.[0] ?? null);
    input.click();
  });
}

export function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
