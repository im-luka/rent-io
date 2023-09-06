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

// 🖼️ UI
export const MIN_PASSWORD_CHARS = 8;
export const NOTIFICATIONS_LIMIT = 5;
export const MODAL_OVERLAY_Z_INDEX = 1001;
export const NOTIFICATION_Z_INDEX = 9999;
export const COUNTRY_SELECT_Z_INDEX = 1000;
export const COUNTRY_MAP_DEFAULT_ZOOM = 10;
export const COUNTRY_MAP_MIN_ZOOM = 3;
export const COUNTRY_MAP_MAX_ZOOM = 13;
