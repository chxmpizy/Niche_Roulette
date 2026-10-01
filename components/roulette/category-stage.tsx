"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/data/categories";
import { SlotReel } from "./slot-reel";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/ui/language-toggle";

export function CategoryStage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalResult, setFinalResult] = useState<{en: string, th: string} | null>(null);

  // Flatten all sub-niches to spin specific topics
  const categoryObjects = categories.flatMap((c) => c.subNiches);
  // Get string representation for slot reel based on current language
  const categoryNames = categoryObjects.map(c => c[language]);

  const startSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setFinalResult(null);
  };

  const handleStop = (selectedString: string) => {
    // Find the original object to store both languages
    const matched = categoryObjects.find(c => c[language] === selectedString);
    if (matched) {
      setFinalResult(matched);
    }
    setIsSpinning(false);
  };

  const startTimer = (hours: number) => {
    if (!finalResult) return;
    // Pass English version as canonical for URL, or both
    router.push(`/timer?topicEN=${encodeURIComponent(finalResult.en)}&topicTH=${encodeURIComponent(finalResult.th)}&hours=${hours}`);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        if (!isSpinning) {
          startSpin();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSpinning]);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0a0500] text-orange-50 selection:bg-orange-500/30 relative">
      <LanguageToggle />
      {/* <header className="flex justify-center items-center w-full p-8 absolute top-0 left-0">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white/90 select-none">
          {t("title")} <span className="text-orange-500">{t("subtitle")}</span>
        </h1>
      </header> */}

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 mt-16 md:mt-0">
        <div className="flex flex-col items-center w-full max-w-6xl">
          <div className="mb-8 mt-4 h-8 flex justify-center items-center">
            {isSpinning ? (
              <h2 className="text-sm font-bold font-mono tracking-[0.3em] uppercase text-orange-500 animate-pulse flex items-center gap-3">
                
                {t("drawing")}
              </h2>
            ) : finalResult ? (
              <h2 className="text-sm font-bold font-mono tracking-[0.3em] uppercase text-orange-400 flex items-center gap-2 animate-in fade-in zoom-in duration-300">
               
                {t("yourTopic")}
               
              </h2>
            ) : (
              <h2 className="text-sm font-bold font-mono tracking-[0.3em] uppercase text-orange-700/60">
                {t("yourTopic")}
              </h2>
            )}
          </div>
          
          <div
            className={clsx(
              "w-full rounded-lg p-12 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden transition-all duration-500",
            )}
            onClick={() => !isSpinning && startSpin()}
          >
            <div
              className={clsx(
                "text-4xl md:text-5xl font-medium tracking-tight text-center font-mono w-full transition-all duration-500",
                finalResult ? "text-orange-50" : "text-orange-200/40"
              )}
            >
              <SlotReel
                key={language} // Force re-render of slot reel when language changes
                items={categoryNames}
                isSpinning={isSpinning}
                onStop={handleStop}
                hasLanded={!!finalResult}
              />
            </div>
          </div>

          <div className="min-h-[5rem] mt-8 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
            {!finalResult ? (
              <button
                onClick={startSpin}
                disabled={isSpinning}
                className={clsx(
                  "px-8 py-3 text-sm font-bold font-mono tracking-widest uppercase rounded transition-all duration-300",
                  isSpinning
                    ? "bg-orange-900/30 text-white/50 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-400 hover:shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)]"
                )}
              >
                {isSpinning ? t("spinning") : t("spin")}
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-4">
                <button
                  onClick={startSpin}
                  className="px-8 py-3 w-full sm:w-auto text-sm font-bold font-mono tracking-widest uppercase rounded bg-orange-950/40 border border-orange-900/50 text-orange-400 hover:bg-orange-900/60 hover:text-orange-200 transition-all duration-300"
                >
                  {t("spinAgain")}
                </button>
                {/* <button
                  onClick={() => startTimer(1)}
                  className="px-8 py-3 w-full sm:w-auto text-sm font-bold font-mono tracking-widest uppercase rounded border border-orange-600 text-orange-400 hover:bg-orange-900/50 hover:text-orange-200 transition-all duration-300 shadow-[0_0_15px_-5px_rgba(249,115,22,0.2)] flex items-center justify-center gap-2"
                >
                  {t("timer1h")}
                </button> */}
                <button
                  onClick={() => startTimer(3)}
                  className="px-8 py-3 w-full sm:w-auto text-sm font-bold font-mono tracking-widest uppercase rounded bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)] flex items-center justify-center gap-2 group"
                >
                  {t("buildIt3h")}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="flex justify-between items-center border-orange-900/30 border-t py-4 px-6 text-sm text-orange-500/70">
        <div className="flex items-center gap-2 font-mono">
          <kbd className="px-2 py-1 bg-orange-950/50 border border-orange-900/50 rounded-md text-orange-300 font-bold shadow-sm">
            Space
          </kbd>
          <span>{finalResult ? t("spaceToSpinAgain") : t("spaceToSpin")}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-orange-300">
          <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent font-bold">{t("title")} {t("subtitle")}</span>
          <span>{t("by")} <a className="hover:underline" href="https://www.instagram.com/champ.ratt/">@champ.ratt</a></span>
        </div>
      </footer>
    </div>
  );
}
