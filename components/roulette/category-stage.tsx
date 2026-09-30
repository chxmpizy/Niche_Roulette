"use client";

import { useState, useEffect } from "react";
import { categories } from "@/data/categories";
import { SlotReel } from "./slot-reel";
import { clsx } from "clsx";

export function CategoryStage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalResult, setFinalResult] = useState<string | null>(null);
  const [hints, setHints] = useState<React.ReactNode>(
    <><kbd className="font-mono text-[10px] uppercase border border-gray-700 rounded px-1.5 py-0.5 text-gray-400 bg-gray-900 mr-2">space</kbd> to spin</>
  );

  const categoryNames = categories.map(c => c.name);

  const startSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setFinalResult(null);
    setHints(null);
  };

  const handleStop = (selected: string) => {
    setFinalResult(selected);
    setIsSpinning(false);
    setHints(
      <><kbd className="font-mono text-[10px] uppercase border border-gray-700 rounded px-1.5 py-0.5 text-gray-400 bg-gray-900 mr-2">space</kbd> to spin again</>
    );
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
    <div className="flex-1 flex flex-col min-h-screen bg-black text-white">
      <header className="flex justify-between items-center p-6 border-b border-gray-900 text-sm tracking-wide font-mono text-gray-500">
        <div>niche roulette</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="flex flex-col items-center w-full max-w-6xl">
          <div 
            className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden cursor-pointer group"
            onClick={() => !isSpinning && startSpin()}
          >
            <div className="absolute top-8 text-gray-600 text-xs font-mono tracking-widest uppercase">
              Select Category
            </div>
            
            <div className={clsx(
              "text-5xl font-medium tracking-tight text-center font-mono w-full",
              finalResult ? "text-white" : "text-gray-300"
            )}>
              <SlotReel 
                items={categoryNames} 
                isSpinning={isSpinning} 
                onStop={handleStop} 
                hasLanded={!!finalResult}
              />
            </div>
          </div>

        </div>
      </main>

      <footer className="flex justify-between items-center p-6 border-t border-gray-900 text-sm text-gray-500">
        <div className="flex items-center">
          {hints}
        </div>
      </footer>
    </div>
  );
}
