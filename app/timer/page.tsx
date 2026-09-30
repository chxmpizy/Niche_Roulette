"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";

function TimerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const topic = searchParams.get("topic") || "Something Awesome";
  const initialHours = parseInt(searchParams.get("hours") || "1", 10);

  const [timer, setTimer] = useState<number>(initialHours * 3600);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const addTime = (hours: number) => {
    setTimer((prev) => prev + hours * 3600);
  };

  return (
    <div className="flex-1 flex flex-col items-center w-full max-w-6xl mt-12 md:mt-24">
      <div className="w-full bg-[#1a0c00] border border-orange-500/60 shadow-[0_0_80px_-15px_rgba(249,115,22,0.3)] rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden animate-in zoom-in duration-500">
        <div className="text-sm font-bold font-mono tracking-[0.3em] uppercase text-orange-500 mb-8 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Time Remaining
        </div>
        <div className="text-6xl md:text-9xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-orange-300 to-orange-600 drop-shadow-[0_0_30px_rgba(249,115,22,0.4)] mb-8">
          {formatTimer(timer)}
        </div>
        <div className="text-orange-200/70 text-lg md:text-xl font-mono tracking-widest uppercase">
          Building: <span className="text-orange-400 font-bold">{topic}</span>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 w-full sm:w-auto">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 text-sm font-bold font-mono tracking-widest uppercase rounded border border-orange-900/50 text-orange-500 hover:text-white hover:bg-red-900/60 hover:border-red-500 transition-all duration-300 w-full sm:w-auto"
        >
          Give Up
        </button>
        <button
          onClick={() => addTime(1)}
          className="px-8 py-3 text-sm font-bold font-mono tracking-widest uppercase rounded bg-orange-900/40 border border-orange-900/50 text-orange-400 hover:bg-orange-800/50 hover:text-orange-200 transition-all duration-300 w-full sm:w-auto"
        >
          + 1 Hour
        </button>
      </div>
    </div>
  );
}

export default function TimerPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0a0500] text-orange-50 selection:bg-orange-500/30 items-center px-4">
      <header className="flex justify-center items-center w-full p-8 absolute top-0 left-0">
        <h1 className="text-xl md:text-2xl font-sans font-bold tracking-tight text-white/90 select-none">
          Funiche <span className="text-orange-500">Roulette</span>
        </h1>
      </header>
      <Suspense fallback={<div className="mt-40 text-orange-500 font-mono animate-pulse">Loading...</div>}>
        <TimerContent />
      </Suspense>
    </div>
  );
}
