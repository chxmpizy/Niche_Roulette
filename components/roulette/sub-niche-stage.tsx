"use client";

import { useState, useEffect } from "react";
import { categories } from "@/data/categories";
import { SlotReel } from "./slot-reel";
import { clsx } from "clsx";

export function SubNicheStage({ 
  categoryName,
  onComplete,
  setHints 
}: { 
  categoryName: string;
  onComplete: (val: string) => void;
  setHints: (hints: React.ReactNode) => void;
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalResult, setFinalResult] = useState<string | null>(null);

  const category = categories.find((c) => c.name === categoryName);
  const subNiches = category?.subNiches || ["General"];

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
      <><kbd className="font-mono text-[10px] uppercase border border-gray-700 rounded px-1.5 py-0.5 text-gray-400 bg-gray-900 mr-2">enter</kbd> to continue</>
    );
  };

  useEffect(() => {
    setHints(<><kbd className="font-mono text-[10px] uppercase border border-gray-700 rounded px-1.5 py-0.5 text-gray-400 bg-gray-900 mr-2">space</kbd> to spin</>);
  }, [setHints]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!finalResult && !isSpinning) {
          startSpin();
        }
      } else if (e.code === "Enter") {
        e.preventDefault();
        if (finalResult && !isSpinning) {
          onComplete(finalResult);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finalResult, isSpinning, onComplete]);

  return (
    <div className="flex flex-col items-center w-full max-w-6xl">
      <div 
        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden cursor-pointer group"
        onClick={() => !finalResult && !isSpinning && startSpin()}
      >
        <div className="absolute top-8 flex flex-col items-center">
          <span className="text-gray-500 text-[10px] font-mono tracking-widest uppercase mb-1">{categoryName}</span>
          <span className="text-gray-600 text-xs font-mono tracking-widest uppercase">
            Select Sub-niche
          </span>
        </div>
        
        <div className={clsx(
          "text-5xl font-medium tracking-tight text-center font-mono w-full",
          finalResult ? "text-white" : "text-gray-300"
        )}>
          <SlotReel 
            items={subNiches} 
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
              "px-8 py-3 text-sm font-mono tracking-widest uppercase rounded border transition-all duration-300",
              isSpinning 
                ? "border-transparent text-gray-600 opacity-50"
                : "border-gray-700 text-gray-400 hover:text-white hover:border-white hover:bg-white/5"
            )}
          >
            {isSpinning ? "Spinning..." : "Spin"}
          </button>
        ) : (
          <button
            onClick={() => onComplete(finalResult)}
            className="px-8 py-3 text-sm font-mono tracking-widest uppercase rounded border border-white bg-white text-black hover:bg-gray-200 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
          >
            Continue ▸
          </button>
        )}
      </div>
    </div>
  );
}
