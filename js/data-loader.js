/* =========================================================================
   ЗАВАНТАЖЕННЯ ДАНИХ (JSON у папці data/)
   Глобальні змінні мають ті самі імена, що й в оригінальному файлі,
   тому код розділів працює без змін.
   ========================================================================= */
let MAP_IMAGE_SRC = ``;
let ANTAGONIST_AVATARS = {};
let MAP_RECTS = {};
let MAP_ZONES = [];
let SCENARIOS = [];
let ROUTES_DATA = {};
let DISGUISES = [];
let DISGUISE_ICONS = {};
let MICRO_LOCATIONS = [];

async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return res.json();
}

async function loadAppData() {
  const [targets, zones, scenarios, routes, disguises] = await Promise.all([
    loadJson(`data/targets.json`),
    loadJson(`data/zones.json`),
    loadJson(`data/scenarios.json`),
    loadJson(`data/routes.json`),
    loadJson(`data/disguises.json`)
  ]);
  ANTAGONIST_AVATARS = targets;
  MAP_RECTS = zones.rects;
  MAP_ZONES = zones.zones;
  MAP_IMAGE_SRC = zones.mapImage;
  SCENARIOS = scenarios;
  ROUTES_DATA = routes;
  DISGUISES = disguises.items;
  DISGUISE_ICONS = disguises.icons;
  MICRO_LOCATIONS = disguises.microLocations;
}
