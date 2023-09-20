// ⚙️ CONFIG
export const LOCALES = ["en", "hr"];
export const DEFAULT_LOCALE = "en";
export const EMAIL_PROVIDERS = ["gmail", "outlook", "yahoo", "icloud"].map(
  (el) => `${el}.com`
);
export const PASSWORD_HASH_SALT = 12;
export const TOKEN_CRYPTO_DEFAULT = 32;
export const SEARCH_CATEGORIES_KEY = "K";
export const DEFAULT_CATEGORY_EMOJI = "🏡";
export const MIN_PASSWORD_CHARS = 8;
export const NOTIFICATIONS_LIMIT = 5;

export const DEFAULT_PAGE = 1;
export const HOME_PROPERTIES_PER_PAGE = 6;
export const HOME_PROPERTIES_PER_PAGE_OPTIONS = [6, 12, 24, 48, 96];

// 🖼️ UI
export const MAP_TILE_LAYER_DARK =
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
export const MAP_TILE_LAYER_LIGHT =
  "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png";
export const COUNTRY_MAP_DEFAULT_ZOOM = 8;
export const COUNTRY_MAP_MIN_ZOOM = 3;
export const COUNTRY_MAP_MAX_ZOOM = 13;
export const DEFAULT_MAP_LATLNG = [51.505, -0.09];

export const MODAL_OVERLAY_Z_INDEX = 1001;
export const NOTIFICATION_Z_INDEX = 9999;
export const COUNTRY_SELECT_Z_INDEX = 1000;

export const OPTIMAL_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
