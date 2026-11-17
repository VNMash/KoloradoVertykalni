/* =========================================================================
   СТАН ДОДАТКА ТА ПЕРСИСТЕНТНІСТЬ (localStorage замість API хост-середовища)
   ========================================================================= */
const STORAGE_KEY = `colorado-guide:state:v1`;

const DEFAULT_STATE = {
  activeTopTab: `stories`,
  subTabs: {
    stories: `all`,
    routes: `all`,
    zones: `all`,
    disguises: `all`
  },
  checkedSteps: {},
  checkedGear: {},
  selectedScenarioId: null,
  selectedRouteId: null,
  selectedZoneId: `z1`,
  microLocationFilter: `all`,
  selectedDisguiseId: `d-elite`,
  mapScale: 1,
  mapPanX: 0,
  mapPanY: 0
};

let appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
let isDraggingMap = false;
let dragStartX = 0;
let dragStartY = 0;
let saveTimer = null;

function setSaveStatus(text, isTemp) {
  const textEl = document.getElementById(`save-status-text`);
  if (!textEl) return;
  textEl.textContent = text;
  if (isTemp) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      const el = document.getElementById(`save-status-text`);
      if (el) el.textContent = `Збережено`;
    }, 1600);
  }
}

async function persistState() {
  setSaveStatus(`Збереження...`, false);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    setSaveStatus(`Збережено`, false);
  } catch (e) {
    setSaveStatus(`Збережено локально`, true);
  }
}

function loadSavedState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved && typeof saved === `object`) {
      appState = Object.assign({}, JSON.parse(JSON.stringify(DEFAULT_STATE)), saved);
      if (!appState.subTabs) appState.subTabs = Object.assign({}, DEFAULT_STATE.subTabs);
      if (!appState.checkedSteps) appState.checkedSteps = {};
      if (!appState.checkedGear) appState.checkedGear = {};
    }
  } catch (e) {
    // Залишаємо стан за замовчуванням
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, `&amp;`)
    .replace(/</g, `&lt;`)
    .replace(/>/g, `&gt;`)
    .replace(/"/g, `&quot;`);
}
