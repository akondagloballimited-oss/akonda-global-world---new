
const DEFAULT_LANGUAGE = "en";
const FALLBACK_LANGUAGE = "en";

const SUPPORTED_LANGUAGES = ["en", "bn"];

function normalizeLanguageCode(lang) {
  if (typeof lang !== "string" || !lang.trim()) {
    return null;
  }

  const cleaned = lang.trim().toLowerCase().replace(/_/g, "-");
  const baseCode = cleaned.split("-")[0];

  return SUPPORTED_LANGUAGES.includes(baseCode)
    ? baseCode
    : null;
}

export function detectLanguage(options = {}) {
  const {
    urlParam = "lang",
    storageKey = "app_language",
    supportedLanguages = SUPPORTED_LANGUAGES,
    defaultLanguage = DEFAULT_LANGUAGE,
  } = options;

  const defaultLang = supportedLanguages.includes(defaultLanguage)
    ? defaultLanguage
    : FALLBACK_LANGUAGE;

  // 1. URL থেকে ভাষা পরীক্ষা
  if (typeof window !== "undefined") {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = normalizeLanguageCode(params.get(urlParam));

      if (fromUrl && supportedLanguages.includes(fromUrl)) {
        return fromUrl;
      }
    } catch (_) {}
  }

  // 2. সংরক্ষিত ভাষা পরীক্ষা
  if (typeof window !== "undefined") {
    try {
      const fromStorage = normalizeLanguageCode(
        window.localStorage.getItem(storageKey)
      );

      if (fromStorage && supportedLanguages.includes(fromStorage)) {
        return fromStorage;
      }
    } catch (_) {}
  }

  // 3. ডিভাইসের ভাষা পরীক্ষা
  if (typeof navigator !== "undefined") {
    const candidates = Array.isArray(navigator.languages)
      ? navigator.languages
      : [navigator.language];

    for (const candidate of candidates) {
      const detected = normalizeLanguageCode(candidate);

      if (detected && supportedLanguages.includes(detected)) {
        return detected;
      }
    }
  }

  return defaultLang;
}

export function saveLanguagePreference(
  lang,
  storageKey = "app_language"
) {
  const normalized = normalizeLanguageCode(lang) || DEFAULT_LANGUAGE;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(storageKey, normalized);
    } catch (_) {}
  }

  return normalized;
}

export function applyLanguageSettings(lang) {
  const normalized = normalizeLanguageCode(lang) || DEFAULT_LANGUAGE;

  if (typeof document !== "undefined") {
    document.documentElement.lang = normalized;
    document.documentElement.dir = "ltr";
  }

  return normalized;
}

export function getTranslation(
  translations,
  lang,
  key,
  fallbackKey = null
) {
  const activeLang = normalizeLanguageCode(lang) || DEFAULT_LANGUAGE;

  const resolvePath = (obj, path) => {
    if (!obj || typeof path !== "string") return undefined;

    return path.split(".").reduce((acc, part) => {
      return acc != null && acc[part] !== undefined
        ? acc[part]
        : undefined;
    }, obj);
  };

  const activePack = translations?.[activeLang] || {};
  const fallbackPack = translations?.[FALLBACK_LANGUAGE] || {};

  const value = resolvePath(activePack, key);

  if (value !== undefined) return value;

  if (fallbackKey) {
    const fallbackValue = resolvePath(activePack, fallbackKey);
    if (fallbackValue !== undefined) return fallbackValue;
  }

  const defaultValue = resolvePath(fallbackPack, key);

  return defaultValue !== undefined ? defaultValue : key;
}

export {
  DEFAULT_LANGUAGE,
  FALLBACK_LANGUAGE,
  SUPPORTED_LANGUAGES,
};
