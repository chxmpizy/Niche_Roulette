"use client";

import { useState, useEffect } from "react";
import { categories } from "@/data/categories";
import { SlotReel } from "./slot-reel";
import { clsx } from "clsx";

export function CategoryStage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalResult, setFinalResult] = useState<string | null>(null);
  const [timer, setTimer] = useState<number | null>(null);

  const categoryNames = categories.map((c) => c.name);

  const startSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setFinalResult(null);
    setTimer(null); // Cancel timer on re-spin
  };

  const handleStop = (selected: string) => {
    setFinalResult(selected);
    setIsSpinning(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space or Enter spins unless the timer is actively running
      if (e.code === "Space" || e.code === "Enter") {
        if (timer !== null) return; // Disable spacebar spin when building
        e.preventDefault();
        if (!isSpinning) {
          startSpin();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSpinning, timer]);

  // Timer Countdown Logic
  useEffect(() => {
    if (timer === null || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => (t !== null && t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0a0500] text-orange-50 selection:bg-orange-500/30">
      <header className="flex justify-center items-center w-full p-8 absolute top-0 left-0">
        <h1 className="text-xl md:text-2xl font-sans font-bold tracking-tight text-white/90 select-none">
          Funiche <span className="text-orange-500">Roulette</span>
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 mt-16 md:mt-0">
        <div className="flex flex-col items-center w-full max-w-6xl">
          <div className="mb-8 mt-4 h-8 flex justify-center items-center">
            {isSpinning ? (
              <h2 className="text-sm font-bold font-mono tracking-[0.3em] uppercase text-orange-500 animate-pulse flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping absolute -ml-5" />
                Drawing
              </h2>
            ) : finalResult ? (
              <h2 className="text-sm font-bold font-mono tracking-[0.3em] uppercase text-orange-400 flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                <span className="text-amber-500">✨</span>
                Your Topic
                <span className="text-amber-500">✨</span>
              </h2>
            ) : (
              <h2 className="text-sm font-bold font-mono tracking-[0.3em] uppercase text-orange-700/60">
                Your Topic
              </h2>
            )}
          </div>
          
          <div
            className={clsx(
              "w-full rounded-lg p-12 flex flex-col items-center justify-center min-h-[150px] relative overflow-hidden transition-all duration-500",
              timer !== null 
                ? "border border-orange-500/60 shadow-[0_0_80px_-15px_rgba(249,115,22,0.3)] bg-[#1a0c00] scale-[1.02]" 
                : "bg-[#140a00] border border-orange-900/40 shadow-[0_0_40px_-15px_rgba(249,115,22,0.05)] cursor-pointer group hover:border-orange-500/40 hover:shadow-[0_0_60px_-15px_rgba(249,115,22,0.15)]"
            )}
            onClick={() => !isSpinning && timer === null && startSpin()}
          >
            <div
              className={clsx(
                "text-4xl md:text-5xl font-medium tracking-tight text-center font-mono w-full transition-all duration-500",
                finalResult ? (timer !== null ? "text-orange-300 scale-90" : "text-orange-50") : "text-orange-200/40"
              )}
            >
              <SlotReel
                items={categoryNames}
                isSpinning={isSpinning}
                onStop={handleStop}
                hasLanded={!!finalResult}
              />
            </div>

            {/* In-card Timer Display */}
            {timer !== null && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a0c00]/90 backdrop-blur-sm animate-in fade-in duration-500">
                <div className="text-sm font-bold font-mono tracking-[0.3em] uppercase text-orange-500 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Time Remaining
                </div>
                <div className="text-6xl md:text-8xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-orange-300 to-orange-600 drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                  {formatTimer(timer)}
                </div>
                <div className="mt-8 text-orange-200/70 text-sm font-mono tracking-widest uppercase">
                  Building: <span className="text-orange-400 font-bold">{finalResult}</span>
                </div>
              </div>
            )}
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
                {isSpinning ? "Spinning..." : "Spin"}
              </button>
            ) : timer !== null ? (
              <button
                onClick={() => setTimer(null)}
                className="px-6 py-2 text-xs font-bold font-mono tracking-widest uppercase rounded border border-orange-900/50 text-orange-500 hover:text-white hover:bg-red-900/60 hover:border-red-500 transition-all duration-300 animate-in fade-in"
              >
                Cancel Build
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-4">
                <button
                  onClick={startSpin}
                  className="px-8 py-3 w-full sm:w-auto text-sm font-bold font-mono tracking-widest uppercase rounded bg-orange-950/40 border border-orange-900/50 text-orange-400 hover:bg-orange-900/60 hover:text-orange-200 transition-all duration-300"
                >
                  Spin Again
                </button>
                <button
                  onClick={() => setTimer(3 * 60 * 60)} // 3 Hours
                  className="px-8 py-3 w-full sm:w-auto text-sm font-bold font-mono tracking-widest uppercase rounded bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)] flex items-center justify-center gap-2 group"
                >
                  Build it! <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">🚀</span>
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
          <span>to {finalResult ? "spin again" : "spin"}</span>
        </div>
      </footer>
    </div>
  );
}
