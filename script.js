const videoConfig = {
  embedUrl: "",
};

const screenshotItems = [
  {
    title: "Стартовый экран проекта",
    description:
      "Первый экран даёт ощущение продукта: tutorial, demo, быстрый вход в новый проект и чистый тёмный UI.",
    image: "./assets/screenshots/workspace-overview.png",
    span: "wide",
  },
  {
    title: "Script Studio",
    description:
      "Блок под текстовый режим, автодополнение и двустороннюю синхронизацию между графом и сценарием.",
    image: "./assets/screenshots/script-studio.png",
    tall: true,
  },
  {
    title: "Канвас с ветвлением",
    description:
      "Здесь видно ядро продукта: граф узлов, сцены, связи, интерфейс редактирования и общую читаемость narrative map.",
    image: "./assets/screenshots/worldbuilding-and-qa.png",
  },
];

const releaseHighlights = [
  {
    label: "Последний крупный апдейт",
    title: "ProjectManager redesign",
    body: "Новый layout, обложки проектов и описания для более сильного первого экрана.",
  },
  {
    label: "UX и readability",
    title: "Font / Color controls",
    body: "Глобальные настройки текста, draggable HelpCenter и fitView при загрузке проекта.",
  },
  {
    label: "Narrative workflow",
    title: "MindSpace и LogicBuilder",
    body: "Захват идей на лету, named rules и улучшенная работа с условиями и эффектами.",
  },
  {
    label: "Playable quality",
    title: "Playtest + export",
    body: "Сохранения, rewind, debug и полноценный HTML-экспорт для демонстраций.",
  },
];

const combinedItems = [
  {
    kicker: "Граф + логика",
    title: "README обещает визуальный narrative graph, а changelog показывает, что он уже умнеет в деталях.",
    body:
      "База продукта остаётся той же: узлы, сцены, условия, эффекты, поиск и авто-раскладка. Но последние обновления добавляют Rule Sheet, LogicBuilder, condition modes и более читаемое отображение логики прямо на канвасе.",
    bullets: [
      "Визуальный граф уже не просто карта реплик, а рабочая логическая система.",
      "Quick Connect, обновлённые handles и fitView ускоряют реальную работу на большом полотне.",
    ],
    bridge:
      "Для сайта это важно: можно показывать не абстрактный редактор узлов, а редактор сложной интерактивной логики.",
  },
  {
    kicker: "Script Studio + AI",
    title: "README задаёт Script Studio как текстовую студию, а changelog усиливает её до полноценного production-режима.",
    body:
      "У Gordian Node уже есть Fountain-подход, синхронизация графа и автодополнение. Поверх этого changelog показывает улучшения в character autocomplete, AI-контексте, logic-aware подсказках и более удобной редакционной ergonomics.",
    bullets: [
      "Текст и граф связаны в обе стороны, а не живут как два разрозненных режима.",
      "AI работает не в пустоте, а всё лучше понимает персонажей, условия и структуру сцены.",
    ],
    bridge:
      "Это делает продукт особенно убедительным для сценаристов, которым нужен и чистый writing flow, и техническая точность.",
  },
  {
    kicker: "Playtest + экспорт",
    title: "README говорит про QA и export, а changelog превращает это в сильный продающий аргумент.",
    body:
      "В основе уже были аналитика, линтер и экспорт в несколько форматов. Последние изменения добавили save/load, rewind, debug-панели, coverage-метрики и playable HTML-export с меню, слотами и VN-интерфейсом.",
    bullets: [
      "Проверка истории происходит прямо внутри инструмента, без долгого ручного переноса.",
      "Экспорт уже подходит не только для архивации, но и для демо, тестов и презентаций.",
    ],
    bridge:
      "Для лендинга это одна из самых сильных зон: продукт помогает не только писать, но и быстро проверять и показывать результат.",
  },
  {
    kicker: "Проектный слой",
    title: "README описывает экосистему проекта, а changelog показывает, что даже входной экран и управление проектами активно шлифуются.",
    body:
      "Мир, персонажи, локации, переменные, снапшоты и offline-first хранение уже формируют вокруг редактора полноценный workspace. Свежие апдейты добавили редизайн ProjectManager, cover images, descriptions, MindSpace и более продуманный first-run experience.",
    bullets: [
      "Продукт выглядит всё ближе к зрелому narrative workspace, а не к набору утилит.",
      "Даже оболочка проекта работает на продажу: первый экран, структура и entry flow становятся визуально сильнее.",
    ],
    bridge:
      "Именно здесь README и changelog особенно хорошо работают вместе: один объясняет масштаб, второй показывает живое взросление продукта.",
  },
];

const changelogItems = [
  {
    tag: "2026-03-28",
    title: "ProjectManager стал более презентабельным",
    summary:
      "Последний заметный апдейт улучшил вход в проект: карточки с обложками, descriptions и более чистый стартовый экран.",
    bullets: [
      "Редизайн кнопок «Туториал», «Демо» и «Новый проект».",
      "Карточки получили cover image со сохранением в localStorage.",
      "В форме создания проекта появилось описание, которое отображается на карточке.",
    ],
  },
  {
    tag: "2026-03-28",
    title: "Сильный UX-пакет для реальной работы",
    summary:
      "В один цикл были добавлены настройки размера и цвета текста, fullscreen HelpCenter и более удобная навигация по холсту.",
    bullets: [
      "Четыре уровня глобального размера текста и пять цветовых пресетов.",
      "HelpCenter стал draggable и поддерживает fullscreen.",
      "При открытии проекта канвас автоматически делает fitView.",
    ],
  },
  {
    tag: "2026-03-28",
    title: "MindSpace и логика проекта стали глубже",
    summary:
      "Продукт движется в сторону полноценной narrative operating system, а не просто редактора узлов.",
    bullets: [
      "Добавлена панель MindSpace для идей, заметок и быстрого переноса на канвас.",
      "Rule Sheet и LogicBuilder усилили работу с условиями и эффектами.",
      "AI знает больше о логике, conditionMode и structured effects.",
    ],
  },
  {
    tag: "2026-03-27 → 2026-03-28",
    title: "Playtest и экспорт стали продающими фичами",
    summary:
      "Изменения в плейтесте и HTML-экспорте особенно хорошо подходят для демо на сайте, потому что показывают практическую ценность.",
    bullets: [
      "Добавлены save/load, rewind, метрики прохождения и debug-редактирование переменных.",
      "Экспорт в HTML превратился в playable visual novel интерфейс с меню, слотами и статусом.",
      "Это делает Gordian Node удобным не только для авторинга, но и для быстрых проверок и презентаций.",
    ],
  },
];

function setupVideo() {
  const frame = document.getElementById("project-video");
  const placeholder = document.getElementById("video-placeholder");

  if (!videoConfig.embedUrl) {
    return;
  }

  frame.src = videoConfig.embedUrl;
  frame.style.display = "block";
  placeholder.style.display = "none";
}

function renderGallery() {
  const gallery = document.getElementById("gallery-grid");

  screenshotItems.forEach((item) => {
    const article = document.createElement("article");
    article.className = `gallery-card${item.span === "wide" ? " gallery-card--wide" : ""}${item.tall ? " gallery-card--tall" : ""}`;

    article.innerHTML = `
      <div class="gallery-card__media">
        <img src="${item.image}" alt="${item.title}" />
        <div class="gallery-card__placeholder">
          <div>
            <span>${item.image.split("/").pop()}</span>
            <p>${item.description}</p>
          </div>
        </div>
      </div>
      <div class="gallery-card__copy">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    `;

    const image = article.querySelector("img");
    const placeholder = article.querySelector(".gallery-card__placeholder");

    image.addEventListener("load", () => {
      placeholder.style.display = "none";
    });

    image.addEventListener("error", () => {
      image.style.display = "none";
      placeholder.style.display = "grid";
    });

    if (image.complete && image.naturalWidth > 0) {
      placeholder.style.display = "none";
    }

    gallery.appendChild(article);
  });
}

function renderReleases() {
  const releases = document.getElementById("release-strip");

  releaseHighlights.forEach((item) => {
    const article = document.createElement("article");
    article.className = "release-chip";
    article.innerHTML = `
      <span class="release-chip__label">${item.label}</span>
      <strong>${item.title}</strong>
      <p>${item.body}</p>
    `;
    releases.appendChild(article);
  });
}

function renderCombinedStory() {
  const grid = document.getElementById("merge-grid");

  combinedItems.forEach((item) => {
    const article = document.createElement("article");
    article.className = "merge-card surface";
    article.innerHTML = `
      <span class="merge-card__kicker">${item.kicker}</span>
      <h3>${item.title}</h3>
      <p>${item.body}</p>
      <ul>
        ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
      </ul>
      <p class="merge-card__bridge">${item.bridge}</p>
    `;
    grid.appendChild(article);
  });
}

function renderChangelog() {
  const list = document.getElementById("changelog-list");

  changelogItems.forEach((item) => {
    const article = document.createElement("article");
    article.className = "change-card";
    article.innerHTML = `
      <div class="change-card__meta">
        <span>${item.tag}</span>
        <time>${item.bullets.length} ключевых пункта</time>
      </div>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <ul>
        ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
      </ul>
    `;
    list.appendChild(article);
  });
}

setupVideo();
renderGallery();
renderReleases();
renderCombinedStory();
renderChangelog();
