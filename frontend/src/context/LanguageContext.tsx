import React, { createContext, useContext } from "react";
import translations from "../i18n/translations.json";
import { useLocation, useNavigate } from "react-router-dom";
import { slugMapping } from "../i18n/slugMapping";

type Language = "TR" | "EN";

interface LanguageContextType {
  language: Language;
  t: (key: keyof typeof translations["TR"]) => string;
  tArray: (key: keyof typeof translations["TR"]) => string[];
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const language: Language = location.pathname.startsWith("/en") ? "EN" : "TR";

const setLanguage = (lang: Language) => {
  const segments = location.pathname.split("/").filter(Boolean);

  // Determine current language
  const currentLang = segments[0] === "en" ? "EN" : "TR";

  // Remove language segment if English
  if (currentLang === "EN") segments.shift();

  // Map the first segment (page slug) to target language
  if (segments.length > 0) {
    const currentSlug = segments[0];

    if (lang === "EN") {
      segments[0] = slugMapping[currentSlug] || currentSlug;
    } else {
      // Reverse map: find TR slug for current EN slug
      const trSlug = Object.entries(slugMapping).find(([, en]) => en === currentSlug)?.[0];
      if (trSlug) segments[0] = trSlug;
    }
  }

  // Prepend language if EN
  if (lang === "EN") segments.unshift("en");

  navigate("/" + segments.join("/"), { replace: true });
};

  const t = (key: keyof typeof translations["TR"]): string => {
    const value = translations[language][key];
    return Array.isArray(value) ? value.join(" ") : value || key;
  };

  const tArray = (key: keyof typeof translations["TR"]): string[] => {
    const value = translations[language][key];
    return Array.isArray(value) ? value : [String(value)];
  };

  return (
    <LanguageContext.Provider value={{ language, t, tArray, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
