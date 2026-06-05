import { useEffect, useState } from "react";

export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "sw", label: "Kiswahili", flag: "🇰🇪" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];
const KEY = "velafrika:lang";

export function useLanguage() {
  const [lang, setLangState] = useState<LangCode>("en");
  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY) as LangCode | null;
      if (v) setLangState(v);
    } catch {}
    const on = () => {
      try {
        const v = localStorage.getItem(KEY) as LangCode | null;
        if (v) setLangState(v);
      } catch {}
    };
    window.addEventListener("velafrika:lang-changed", on);
    return () => window.removeEventListener("velafrika:lang-changed", on);
  }, []);

  const setLang = (code: LangCode) => {
    try {
      localStorage.setItem(KEY, code);
      window.dispatchEvent(new CustomEvent("velafrika:lang-changed"));
    } catch {}
    setLangState(code);
  };

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  return { lang, setLang, current };
}
