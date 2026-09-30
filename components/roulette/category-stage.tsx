"use client";

import { useState, useEffect } from "react";
import { categories } from "@/data/categories";
import { SlotReel } from "./slot-reel";
import { clsx } from "clsx";

export function CategoryStage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalResult, setFinalResult] = useState<string | null>(null);

  const categoryNames = categories.map((c) => c.name);

  const startSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setFinalResult(null);
  };

  const handleStop = (selected: string) => {
    setFinalResult(selected);
    setIsSpinning(false);
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
    <div className="flex-1 flex flex-col min-h-screen bg-[#0a0500] text-orange-50 selection:bg-orange-500/30">
      <header className="flex justify-center items-center p-6 text-sm tracking-wide font-mono text-orange-500/80">
        <div className="text-4xl text-center bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent font-bold">
          Funiche Roulette
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="flex flex-col items-center w-full max-w-6xl">
          <div
            className="w-full  rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden cursor-pointer"
            onClick={() => !isSpinning && startSpin()}
          >
            <div
              className={clsx(
                "text-5xl font-medium tracking-tight text-center font-mono w-full",
                finalResult ? "text-orange-50" : "text-orange-200/40",
              )}
            >
              <SlotReel
                items={categoryNames}
                isSpinning={isSpinning}
                onStop={handleStop}
                hasLanded={!!finalResult}
              />
            </div>
          </div>

          <div className="h-20 mt-8 w-full flex items-center justify-center">
            {!finalResult ? (
              <button
                onClick={startSpin}
                disabled={isSpinning}
                className={clsx(
                  "px-8 py-3 text-sm font-bold font-mono tracking-widest uppercase rounded transition-all duration-300",
                  isSpinning
                    ? "bg-orange-900/30 text-white/50 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-400 hover:shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)]",
                )}
              >
                {isSpinning ? "Spinning..." : "Spin"}
              </button>
            ) : (
              <button
                onClick={startSpin}
                className="px-8 py-3 text-sm font-bold font-mono tracking-widest uppercase rounded bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:opacity-90 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)]"
              >
                Spin Again
              </button>
            )}
          </div>
        </div>
      </main>
      <footer className="flex justify-between items-center border-orange-900/30 border-t py-4 px-6 text-sm text-orange-500/70">
        <div className="flex items-center gap-2 font-mono">
          <kbd className="px-2 py-1 bg-orange-950/50 border border-orange-900/50 rounded-md text-orange-300 font-bold shadow-sm">
            Space
          </kbd>
          <span>to {finalResult ? "spin again" : "spin"}</span>
        </div>
      </footer>
    </div>
  );
}
