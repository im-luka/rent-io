// ⚙️ CONFIG
export const LOCALES = ["en", "hr"];
export const DEFAULT_LOCALE = "en";
export const EMAIL_PROVIDERS = ["gmail", "outlook", "yahoo", "icloud"].map(
  (el) => `${el}.com`
);
export const PASSWORD_HASH_SALT = 12;
export const TOKEN_CRYPTO_DEFAULT = 32;

// 🖼️ UI
export const MIN_PASSWORD_CHARS = 8;
export const NOTIFICATIONS_LIMIT = 5;
export const NOTIFICATION_Z_INDEX = 9999;
