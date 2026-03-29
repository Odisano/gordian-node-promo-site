import type { ReactNode } from "react";
import type { Locale, LocaleContent } from "./content";
import { pickFile, readFileAsDataUrl, splitCommaList, splitLines } from "./siteUtils";

type Props = {
  locale: Locale;
  statusText: string;
  jsonDraft: string;
  setJsonDraft: (value: string) => void;
  content: LocaleContent;
  onClose: () => void;
  onExport: () => void;
  onImportClick: () => void;
  onApplyJson: () => void;
  onReset: () => void;
  updateLocaleContent: (mutate: (draft: LocaleContent) => void) => void;
};

export function AdminPanel({
  locale,
  statusText,
  jsonDraft,
  setJsonDraft,
  content,
  onClose,
  onExport,
  onImportClick,
  onApplyJson,
  onReset,
  updateLocaleContent,
}: Props) {
  const localeLabel = locale === "ru" ? "Русский" : "English";

  return (
    <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-[680px] overflow-y-auto border-l border-white/10 bg-ink-950/95 p-5 shadow-calm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.28em] text-mint-300">Webmaster mode</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white">
              {locale === "ru" ? "Редактирование сайта прямо в браузере" : "Edit the site directly in the browser"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-mist-100/72">
              {locale === "ru"
                ? "Здесь можно менять тексты, добавлять статьи, видео, файлы и изображения. Изменения сохраняются в этом браузере. Для переноса на другой компьютер или публикации экспортируй JSON."
                : "You can edit text, add articles, videos, files, and images here. Changes are saved in this browser. Export the JSON if you want to move or publish them elsewhere."}
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/25">
            Close
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <button type="button" onClick={onExport} className="rounded-full bg-mint-300 px-4 py-2 font-semibold text-ink-950">
            {locale === "ru" ? "Экспорт JSON" : "Export JSON"}
          </button>
          <button type="button" onClick={onImportClick} className="rounded-full border border-white/10 px-4 py-2 font-semibold text-white">
            {locale === "ru" ? "Импорт JSON" : "Import JSON"}
          </button>
          <button type="button" onClick={onReset} className="rounded-full border border-white/10 px-4 py-2 font-semibold text-white">
            {locale === "ru" ? "Сбросить" : "Reset"}
          </button>
        </div>

        <p className="mt-4 text-sm text-mint-300/90">{statusText}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mist-100/40">{localeLabel}</p>

        <div className="mt-6 space-y-5">
          <EditorSection title="Hero">
            <LabeledInput
              label={locale === "ru" ? "Заголовок" : "Title"}
              value={content.hero.title}
              onChange={(value) => updateLocaleContent((draft) => void (draft.hero.title = value))}
            />
            <LabeledTextarea
              label={locale === "ru" ? "Описание" : "Body"}
              value={content.hero.body}
              onChange={(value) => updateLocaleContent((draft) => void (draft.hero.body = value))}
            />
            <LabeledTextarea
              label={locale === "ru" ? "Факты, по одному на строку" : "Facts, one per line"}
              value={content.hero.facts.join("\n")}
              onChange={(value) => updateLocaleContent((draft) => void (draft.hero.facts = splitLines(value)))}
            />
          </EditorSection>

          <CollectionEditor
            title={locale === "ru" ? "Скриншоты" : "Screenshots"}
            items={content.sections.gallery.items}
            onAdd={() =>
              updateLocaleContent((draft) => {
                draft.sections.gallery.items.push({
                  title: locale === "ru" ? "Новый скриншот" : "New screenshot",
                  body: "",
                  image: "",
                  size: "wide",
                });
              })
            }
            renderItem={(item, index) => (
              <div className="space-y-3">
                <LabeledInput
                  label={locale === "ru" ? "Название" : "Title"}
                  value={item.title}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.gallery.items[index].title = value))}
                />
                <LabeledTextarea
                  label={locale === "ru" ? "Описание" : "Description"}
                  value={item.body}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.gallery.items[index].body = value))}
                />
                <LabeledInput
                  label={locale === "ru" ? "URL изображения или data URL" : "Image URL or data URL"}
                  value={item.image}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.gallery.items[index].image = value))}
                />
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={async () => {
                      const file = await pickFile("image/*");
                      if (!file) return;
                      const dataUrl = await readFileAsDataUrl(file);
                      updateLocaleContent((draft) => void (draft.sections.gallery.items[index].image = dataUrl));
                    }}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white"
                  >
                    {locale === "ru" ? "Загрузить изображение" : "Upload image"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateLocaleContent((draft) => {
                        draft.sections.gallery.items[index].size =
                          draft.sections.gallery.items[index].size === "tall" ? "wide" : "tall";
                      })
                    }
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white"
                  >
                    {item.size === "tall" ? "tall" : "wide"}
                  </button>
                  <button
                    type="button"
                    onClick={() => updateLocaleContent((draft) => void draft.sections.gallery.items.splice(index, 1))}
                    className="rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-200"
                  >
                    {locale === "ru" ? "Удалить" : "Remove"}
                  </button>
                </div>
              </div>
            )}
          />

          <CollectionEditor
            title={locale === "ru" ? "Видео" : "Videos"}
            items={content.sections.video.items}
            onAdd={() =>
              updateLocaleContent((draft) => {
                draft.sections.video.items.push({
                  title: locale === "ru" ? "Новое видео" : "New video",
                  body: "",
                  embedUrl: "",
                });
              })
            }
            renderItem={(item, index) => (
              <div className="space-y-3">
                <LabeledInput
                  label={locale === "ru" ? "Название видео" : "Video title"}
                  value={item.title}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.video.items[index].title = value))}
                />
                <LabeledTextarea
                  label={locale === "ru" ? "Описание" : "Description"}
                  value={item.body}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.video.items[index].body = value))}
                />
                <LabeledInput
                  label="Embed URL"
                  value={item.embedUrl}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.video.items[index].embedUrl = value))}
                />
                <button
                  type="button"
                  onClick={() => updateLocaleContent((draft) => void draft.sections.video.items.splice(index, 1))}
                  className="rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-200"
                >
                  {locale === "ru" ? "Удалить видео" : "Remove video"}
                </button>
              </div>
            )}
          />

          <CollectionEditor
            title={locale === "ru" ? "Статьи" : "Articles"}
            items={content.sections.articles.items}
            onAdd={() =>
              updateLocaleContent((draft) => {
                draft.sections.articles.items.unshift({
                  date: new Date().toISOString().slice(0, 10),
                  title: locale === "ru" ? "Новая статья" : "New article",
                  excerpt: "",
                  body: "",
                  tags: [],
                });
              })
            }
            renderItem={(item, index) => (
              <div className="space-y-3">
                <LabeledInput
                  label={locale === "ru" ? "Дата" : "Date"}
                  value={item.date}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.articles.items[index].date = value))}
                />
                <LabeledInput
                  label={locale === "ru" ? "Заголовок" : "Title"}
                  value={item.title}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.articles.items[index].title = value))}
                />
                <LabeledTextarea
                  label={locale === "ru" ? "Краткое описание" : "Excerpt"}
                  value={item.excerpt}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.articles.items[index].excerpt = value))}
                />
                <LabeledTextarea
                  label={locale === "ru" ? "Полный текст" : "Body"}
                  rows={8}
                  value={item.body}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.articles.items[index].body = value))}
                />
                <LabeledInput
                  label={locale === "ru" ? "Теги через запятую" : "Tags, comma separated"}
                  value={(item.tags ?? []).join(", ")}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.articles.items[index].tags = splitCommaList(value)))}
                />
                <button
                  type="button"
                  onClick={() => updateLocaleContent((draft) => void draft.sections.articles.items.splice(index, 1))}
                  className="rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-200"
                >
                  {locale === "ru" ? "Удалить статью" : "Remove article"}
                </button>
              </div>
            )}
          />

          <CollectionEditor
            title={locale === "ru" ? "Файлы и ресурсы" : "Files and resources"}
            items={content.sections.resources.items}
            onAdd={() =>
              updateLocaleContent((draft) => {
                draft.sections.resources.items.push({
                  title: locale === "ru" ? "Новый ресурс" : "New resource",
                  body: "",
                  url: "",
                  type: "link",
                });
              })
            }
            renderItem={(item, index) => (
              <div className="space-y-3">
                <LabeledInput
                  label={locale === "ru" ? "Название" : "Title"}
                  value={item.title}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.resources.items[index].title = value))}
                />
                <LabeledTextarea
                  label={locale === "ru" ? "Описание" : "Description"}
                  value={item.body}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.resources.items[index].body = value))}
                />
                <LabeledInput
                  label={locale === "ru" ? "Ссылка или data URL" : "URL or data URL"}
                  value={item.url}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.resources.items[index].url = value))}
                />
                <LabeledInput
                  label={locale === "ru" ? "Тип" : "Type"}
                  value={item.type}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.resources.items[index].type = value))}
                />
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={async () => {
                      const file = await pickFile("*/*");
                      if (!file) return;
                      const dataUrl = await readFileAsDataUrl(file);
                      updateLocaleContent((draft) => {
                        draft.sections.resources.items[index].url = dataUrl;
                        draft.sections.resources.items[index].type = "file";
                        if (!draft.sections.resources.items[index].title) {
                          draft.sections.resources.items[index].title = file.name;
                        }
                      });
                    }}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white"
                  >
                    {locale === "ru" ? "Загрузить файл" : "Upload file"}
                  </button>
                  <button
                    type="button"
                    onClick={() => updateLocaleContent((draft) => void draft.sections.resources.items.splice(index, 1))}
                    className="rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-200"
                  >
                    {locale === "ru" ? "Удалить" : "Remove"}
                  </button>
                </div>
              </div>
            )}
          />

          <CollectionEditor
            title="Changelog"
            items={content.sections.changelog.items}
            onAdd={() =>
              updateLocaleContent((draft) => {
                draft.sections.changelog.items.unshift({
                  tag: new Date().toISOString().slice(0, 10),
                  title: locale === "ru" ? "Новая запись" : "New entry",
                  body: "",
                  bullets: [],
                });
              })
            }
            renderItem={(item, index) => (
              <div className="space-y-3">
                <LabeledInput
                  label={locale === "ru" ? "Тег / дата" : "Tag / date"}
                  value={item.tag}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.changelog.items[index].tag = value))}
                />
                <LabeledInput
                  label={locale === "ru" ? "Заголовок" : "Title"}
                  value={item.title}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.changelog.items[index].title = value))}
                />
                <LabeledTextarea
                  label={locale === "ru" ? "Описание" : "Description"}
                  value={item.body}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.changelog.items[index].body = value))}
                />
                <LabeledTextarea
                  label={locale === "ru" ? "Пункты, по одному на строку" : "Bullets, one per line"}
                  value={item.bullets.join("\n")}
                  onChange={(value) => updateLocaleContent((draft) => void (draft.sections.changelog.items[index].bullets = splitLines(value)))}
                />
                <button
                  type="button"
                  onClick={() => updateLocaleContent((draft) => void draft.sections.changelog.items.splice(index, 1))}
                  className="rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-200"
                >
                  {locale === "ru" ? "Удалить запись" : "Remove entry"}
                </button>
              </div>
            )}
          />

          <EditorSection title={locale === "ru" ? "Расширенное редактирование текущего языка" : "Advanced editing for the current locale"}>
            <LabeledTextarea label="JSON" rows={18} value={jsonDraft} onChange={setJsonDraft} />
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={onApplyJson} className="rounded-full bg-mint-300 px-4 py-2 text-sm font-semibold text-ink-950">
                {locale === "ru" ? "Применить JSON" : "Apply JSON"}
              </button>
              <button
                type="button"
                onClick={() => setJsonDraft(JSON.stringify(content, null, 2))}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white"
              >
                {locale === "ru" ? "Подгрузить текущее состояние" : "Load current state"}
              </button>
            </div>
          </EditorSection>
        </div>
      </div>
    </div>
  );
}

function EditorSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
      <h3 className="font-display text-xl font-bold text-white">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function CollectionEditor<T>({
  title,
  items,
  onAdd,
  renderItem,
}: {
  title: string;
  items: T[];
  onAdd: () => void;
  renderItem: (item: T, index: number) => ReactNode;
}) {
  return (
    <EditorSection title={title}>
      <button type="button" onClick={onAdd} className="rounded-full bg-mint-300 px-4 py-2 text-sm font-semibold text-ink-950">
        Add
      </button>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-[24px] border border-white/10 bg-ink-900/70 p-4">
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </EditorSection>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-mist-100/70">{label}</span>
      <input
        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-mint-300/50"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function LabeledTextarea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-mist-100/70">{label}</span>
      <textarea
        rows={rows}
        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-mint-300/50"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
