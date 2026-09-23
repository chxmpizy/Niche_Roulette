"use client";

import { useState } from "react";
import { categories } from "@/data/categories";
import { getRandomElement, sleep } from "@/lib/random";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export function SubNicheStage({
  categoryName,
  onComplete,
}: {
  categoryName: string;
  onComplete: (val: string) => void;
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentDisplay, setCurrentDisplay] = useState("???");
  const [finalResult, setFinalResult] = useState<string | null>(null);

  const category = categories.find((c) => c.name === categoryName);
  const subNiches = category?.subNiches || ["General"];

  const spin = async () => {
    setIsSpinning(true);
    setFinalResult(null);

    const spinDuration = 3000;
    const intervalTime = 50;
    const steps = spinDuration / intervalTime;

    for (let i = 0; i < steps; i++) {
      if (i > steps * 0.8 && i % 3 !== 0) {
        await sleep(intervalTime);
        continue;
      }
      if (i > steps * 0.9 && i % 5 !== 0) {
        await sleep(intervalTime);
        continue;
      }

      setCurrentDisplay(getRandomElement(subNiches));
      await sleep(intervalTime);
    }

    const selected = getRandomElement(subNiches);
    setCurrentDisplay(selected);
    setFinalResult(selected);
    setIsSpinning(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="w-full border border-gray-800 bg-[#050505] p-8 md:p-12 flex flex-col items-center justify-center min-h-[300px] mb-8 relative overflow-hidden">
        <div className="absolute top-6 flex flex-col items-center">
          <span className="text-gray-600 text-xs font-mono mb-1">{categoryName}</span>
          <span className="text-gray-500 text-xs tracking-[0.2em] uppercase">
            Sub-niche
          </span>
        </div>

        <motion.div
          key={currentDisplay}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.1 }}
          className={clsx(
            "text-2xl md:text-4xl font-bold text-center",
            finalResult ? "text-white" : "text-gray-400"
          )}
        >
          {currentDisplay}
        </motion.div>
      </div>

      {!finalResult ? (
        <button
          onClick={spin}
          disabled={isSpinning}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSpinning ? "Spinning..." : "Spin the Wheel"}
        </button>
      ) : (
        <button
          onClick={() => onComplete(finalResult)}
          className="w-full py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
        >
          Continue →
        </button>
      )}
    </div>
  );
}
