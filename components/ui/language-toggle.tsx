"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="absolute top-8 right-8 z-50 flex items-center bg-[#1a0c00] border border-orange-900/50 rounded-full p-1 shadow-md">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 text-xs font-bold font-mono tracking-wider rounded-full transition-all duration-300 ${
          language === "en"
            ? "bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]"
            : "text-orange-500/50 hover:text-orange-400"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("th")}
        className={`px-3 py-1 text-xs font-bold font-mono tracking-wider rounded-full transition-all duration-300 ${
          language === "th"
            ? "bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]"
            : "text-orange-500/50 hover:text-orange-400"
        }`}
      >
        TH
      </button>
    </div>
  );
}
