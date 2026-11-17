/* =========================================================================
   РІВЕНЬ 3: УНІВЕРСАЛЬНІ ВЕРТИКАЛЬНІ ВКЛАДКИ
   Один компонент для сюжетних ліній, маршрутів, зон і мікролокацій.
   item: { id, title, meta?, lead? (HTML), trail? (HTML), dimmed? }
   ========================================================================= */
function renderVTabButtons(opts) {
  return opts.items.map(function (it) {
    const isActive = it.id === opts.activeId;
    return `<button type="button"
      class="folder-tab subtab vertical vtab ${isActive ? `active` : ``} ${it.dimmed ? `is-dimmed` : ``}"
      role="tab"
      aria-selected="${isActive ? `true` : `false`}"
      tabindex="${isActive ? `0` : `-1`}"
      onkeydown="vtabKeydown(event)"
      onclick="${opts.onSelect}('${it.id}')">
      <span class="tab-cap" aria-hidden="true"></span>
      ${it.lead || ``}
      <span class="vtab-text">
        <span class="vtab-title">${escapeHtml(it.title)}</span>
        ${it.meta ? `<span class="vtab-meta">${escapeHtml(it.meta)}</span>` : ``}
      </span>
      ${it.trail ? `<span class="vtab-trail">${it.trail}</span>` : ``}
    </button>`;
  }).join(``);
}

// Готовий блок «вкладки зліва + панель справа» для розділів, що рендеряться повністю з JS
function renderVTabsLayout(opts, panelHtml) {
  return `<div class="vtabs-layout">
    <div class="vtabs" role="tablist" aria-orientation="vertical" aria-label="${escapeHtml(opts.label)}">${renderVTabButtons(opts)}</div>
    <div class="vtab-panel" role="tabpanel">${panelHtml}</div>
  </div>`;
}

// Навігація стрілками ↑ ↓ Home End між вкладками
function vtabKeydown(e) {
  const keys = [`ArrowDown`, `ArrowUp`, `Home`, `End`];
  if (keys.indexOf(e.key) === -1) return;
  const tabs = Array.from(e.currentTarget.parentElement.querySelectorAll(`[role="tab"]`));
  const i = tabs.indexOf(e.currentTarget);
  let next = i;
  if (e.key === `ArrowDown`) next = (i + 1) % tabs.length;
  if (e.key === `ArrowUp`) next = (i - 1 + tabs.length) % tabs.length;
  if (e.key === `Home`) next = 0;
  if (e.key === `End`) next = tabs.length - 1;
  e.preventDefault();
  const container = e.currentTarget.parentElement;
  tabs[next].click();
  // після перемальовування панелі шукаємо актуальний контейнер і повертаємо фокус на активну вкладку
  const live = container.isConnected ? container : document.querySelector(`.section-panel:not([hidden]) .vtabs`);
  const active = live && live.querySelector(`[aria-selected="true"]`);
  if (active) active.focus();
}
