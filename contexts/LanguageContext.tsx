"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "th";

type Translations = {
  [key: string]: string;
};

const dictionaries: Record<Language, Translations> = {
  en: {
    title: "Funiche",
    subtitle: "Roulette",
    yourTopic: "Your Topic",
    drawing: "Drawing",
    spin: "Spin",
    spinning: "Spinning...",
    spinAgain: "Spin Again",
    buildIt3h: "Build it!",
    spaceToSpin: "to spin",
    spaceToSpinAgain: "to spin again",
    giveUp: "Give Up",
    cancelTimer: "Cancel Timer",
    timeRemaining: "Time Remaining",
    building: "Building:",
    add1h: "+ 1 Hour",
    by: "by",
  },
  th: {
    title: "Funiche",
    subtitle: "Roulette",
    yourTopic: "หัวข้อของคุณ",
    drawing: "กำลังสุ่ม",
    spin: "สุ่มเลย",
    spinning: "กำลังสุ่ม...",
    spinAgain: "สุ่มอีกครั้ง",
    buildIt3h: "ลุยเลย!",
    spaceToSpin: "เพื่อสุ่ม",
    spaceToSpinAgain: "เพื่อสุ่มอีกครั้ง",
    giveUp: "ยอมแพ้",
    cancelTimer: "ยกเลิกจับเวลา",
    timeRemaining: "เวลาที่เหลือ",
    building: "หัวข้อที่ทำ:",
    add1h: "+ 1 ชั่วโมง",
    by: "โดย",
  },
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof dictionaries.en) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("lang") as Language;
    if (stored === "th" || stored === "en") {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
  };

  const t = (key: string) => {
    if (!mounted) return dictionaries.en[key] || key; // fallback for SSR
    return dictionaries[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
