# [Колорадо]: тактичний довідник — Борці за свободу

Статичний сайт без збирача. Працює на GitHub Pages і Firebase Hosting без змін.

## Запуск локально
`fetch` для JSON не працює з `file://`, тому потрібен сервер:

    npx serve .          # або: python3 -m http.server 8000

## Структура
    index.html                 розмітка (рівень 1 і каркаси рівня 2 і 3)
    css/                       стилі (порядок підключення = номери файлів)
      vtabs.css                єдиний новий стиль: вертикальні вкладки рівня 3
    js/
      data-loader.js           завантаження data/*.json у глобальні змінні
      state.js                 стан і збереження (localStorage)
      components/              targets.js (аватари, рівень 2), vtabs.js (рівень 3)
      sections/                stories, routes, zones, disguises
      features/                navigation, export-reset
      main.js                  ініціалізація
    data/                      targets, zones, scenarios, routes, disguises (.json)
    assets/
      images/map.png           підкладка карти
      images/antagonists/      фото цілей (t1..t4)
      icons/roles/             іконки ролей цілей
      icons/disguises/         іконки маскувань

## Як додати контент
- Нова сюжетна лінія: об'єкт у `data/scenarios.json` — з'явиться вкладкою рівня 3.
- Нова зона: `data/zones.json` (`zones` + прямокутник у `rects`).
- Нова мікролокація: `data/disguises.json` → `microLocations`.
- Фото цілі: покладіть файл у `assets/images/antagonists/` і вкажіть шлях у `data/targets.json` (поле `photo`).

## Публікація
**GitHub Pages:** Settings → Pages → Deploy from branch → `main` / root.
**Firebase:** `firebase init hosting` (public directory: `.`, SPA: ні) → `firebase deploy`.

## Рівні вкладок
1. Бічні вертикальні вкладки розділів (як в оригіналі).
2. Горизонтальні вкладки цілей (як в оригіналі).
3. Вертикальні вкладки ліворуч: сюжетні лінії, маршрути, зони, мікролокації (компонент `renderVTabs*` у `js/components/vtabs.js`).
