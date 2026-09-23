"use client";

import { useState, useEffect } from "react";
import { productTypes } from "@/data/product-types";
import { SlotReel } from "./slot-reel";
import { clsx } from "clsx";

export function ProductStage({ 
  onComplete,
  setHints
}: { 
  onComplete: (val: string) => void;
  setHints: (hints: React.ReactNode) => void;
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalResult, setFinalResult] = useState<string | null>(null);

  const productNames = productTypes.map(p => p.name);

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
      <><kbd className="font-mono text-[10px] uppercase border border-gray-700 rounded px-1.5 py-0.5 text-gray-400 bg-gray-900 mr-2">enter</kbd> to view result</>
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
    <div className="flex flex-col items-center w-full max-w-2xl">
      <div 
        className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-12 md:p-24 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden cursor-pointer group"
        onClick={() => !finalResult && !isSpinning && startSpin()}
      >
        <div className="absolute top-8 text-gray-600 text-xs font-mono tracking-widest uppercase">
          Select Product Type
        </div>
        
        <div className={clsx(
          "text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-center font-mono w-full",
          finalResult ? "text-white" : "text-gray-300"
        )}>
          {finalResult ? (
            <div className="h-[1.4em] flex items-center justify-center whitespace-nowrap relative w-fit mx-auto">
              {finalResult}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white animate-in slide-in-from-left duration-300" />
            </div>
          ) : (
            <SlotReel 
              items={productNames} 
              isSpinning={isSpinning} 
              onStop={handleStop} 
            />
          )}
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
            View Result ▸
          </button>
        )}
      </div>
    </div>
  );
}
