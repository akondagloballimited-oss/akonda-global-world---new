const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = ["en", "bn"];

function normalizeLanguageCode(lang) {
  if (!lang || typeof lang !== "string") {
    return null;
  }

  const cleaned = lang.trim().toLowerCase().replace("_", "-");
  if (cleaned.startsWith("bn")) {
    return "bn";
  }
  if (cleaned.startsWith("en")) {
    return "en";
  }

  const baseCode = cleaned.split("-")[0];
  return SUPPORTED_LANGUAGES.includes(baseCode) ? baseCode : null;
}

export function detectLanguage(options = {}) {
  const {
    urlParam = "lang",
    storageKey = "app_language",
    supportedLanguages = SUPPORTED_LANGUAGES,
    defaultLanguage = DEFAULT_LANGUAGE,
  } = options;

  // ১. URL query parameter (?lang=bn বা ?lang=en) চেক করা
  if (typeof window !== "undefined" && window.location) {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = normalizeLanguageCode(params.get(urlParam));
      if (fromUrl && supportedLanguages.includes(fromUrl)) {
        return fromUrl;
      }
    } catch (_) {
      // URL parsing error এড়াতে উপেক্ষা করা হলো
    }
  }

  // ২. localStorage থেকে ইউজারের সেভ করা ভাষা চেক করা
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const fromStorage = normalizeLanguageCode(window.localStorage.getItem(storageKey));
      if (fromStorage && supportedLanguages.includes(fromStorage)) {
        return fromStorage;
      }
    } catch (_) {
      // Storage access error এড়াতে উপেক্ষা করা হলো
    }
  }

  // ৩. ব্রাউজার বা ডিভাইসের ভাষা চেক করা
  if (typeof navigator !== "undefined") {
    const candidates = Array.isArray(navigator.languages) && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language];

    for (const candidate of candidates) {
      const normalized = normalizeLanguageCode(candidate);
      if (normalized && supportedLanguages.includes(normalized)) {
        return normalized;
      }
    }
  }

  // ৪. ডিফল্ট ভাষা রিটার্ন করা
  return defaultLanguage;
}

export function saveLanguagePreference(lang, storageKey = "app_language") {
  const normalized = normalizeLanguageCode(lang) || DEFAULT_LANGUAGE;
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(storageKey, normalized);
    } catch (_) {
      // Ignore storage errors
    }
  }
  return normalized;
}

export function getTranslation(translations, lang, key, fallbackKey = null) {
  const activeLang = normalizeLanguageCode(lang) || DEFAULT_LANGUAGE;
  const langPack = translations?.[activeLang] || translations?.[DEFAULT_LANGUAGE] || {};

  const resolvePath = (obj, path) => {
    if (!obj || !path) return undefined;
    return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
  };

  const value = resolvePath(langPack, key);
  if (value !== undefined) {
    return value;
  }

  if (fallbackKey) {
    const fallbackValue = resolvePath(langPack, fallbackKey);
    if (fallbackValue !== undefined) {
      return fallbackValue;
    }
  }

  const defaultPack = translations?.[DEFAULT_LANGUAGE] || {};
  const defaultValue = resolvePath(defaultPack, key);
  return defaultValue !== undefined ? defaultValue : key;
}
