"use client";

import { RouletteState } from "@/app/roulette/page";
import { useState, useEffect } from "react";
import { Copy, Share, RotateCcw, Check } from "lucide-react";

export function ResultView({
  selections,
  onReset,
  setHints
}: {
  selections: RouletteState;
  onReset: () => void;
  setHints: (hints: React.ReactNode) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [showPainPoints, setShowPainPoints] = useState(false);

  useEffect(() => {
    if (showPainPoints) {
      setHints(<><kbd className="font-mono text-[10px] uppercase border border-gray-700 rounded px-1.5 py-0.5 text-gray-400 bg-gray-900 mr-2">esc</kbd> to start over</>);
    } else {
      setHints(
        <>
          <kbd className="font-mono text-[10px] uppercase border border-gray-700 rounded px-1.5 py-0.5 text-gray-400 bg-gray-900 mr-2">enter</kbd> find pain points
          <span className="mx-2 text-gray-700">|</span>
          <kbd className="font-mono text-[10px] uppercase border border-gray-700 rounded px-1.5 py-0.5 text-gray-400 bg-gray-900 mr-2">esc</kbd> start over
        </>
      );
    }
  }, [showPainPoints, setHints]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Enter" && !showPainPoints) {
        e.preventDefault();
        setShowPainPoints(true);
      } else if (e.code === "Escape") {
        e.preventDefault();
        onReset();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPainPoints, onReset]);

  const combinationString = `${selections.productType} for ${selections.subNiche}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(combinationString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Niche Product Idea",
        text: `I just generated a product idea: ${combinationString}`,
        url: window.location.href,
      });
    } else {
      copyToClipboard();
    }
  };

  if (showPainPoints) {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col space-y-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="text-center space-y-4">
          <p className="text-gray-500 uppercase font-mono tracking-widest text-xs">Your Idea</p>
          <div className="text-xl md:text-3xl font-medium tracking-tight font-mono">
            {combinationString}
          </div>
        </div>

        <div className="border border-gray-800 bg-[#0a0a0a] rounded-lg p-8 md:p-12 space-y-8 shadow-xl shadow-black/50">
          <div className="text-center">
            <p className="text-gray-500 font-mono text-sm mb-4">Discovery Phase</p>
            <h3 className="text-xl font-medium leading-relaxed">
              What problems do <span className="text-white border-b border-gray-600 pb-0.5">{selections.subNiche}</span> have
              <br className="hidden md:block" />
              that a <span className="text-white border-b border-gray-600 pb-0.5">{selections.productType}</span> could solve?
            </h3>
          </div>

          <div className="space-y-4 pt-6 border-t border-gray-900">
            <p className="text-xs text-gray-500 uppercase font-mono tracking-widest">Questions to think about:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 mt-0.5 font-mono">→</span> What is currently frustrating?
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 mt-0.5 font-mono">→</span> What takes too much time?
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 mt-0.5 font-mono">→</span> What is repetitive?
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 mt-0.5 font-mono">→</span> What is expensive?
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 mt-0.5 font-mono">→</span> What information is missing?
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-3 mt-0.5 font-mono">→</span> What are they currently doing manually?
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <textarea
              className="w-full bg-[#111] border border-gray-800 rounded p-4 text-white font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors resize-none h-32"
              placeholder="Describe the pain point..."
            ></textarea>
            <button className="w-full mt-4 py-3 bg-white text-black font-mono text-sm tracking-widest uppercase rounded hover:bg-gray-200 transition-colors">
              Save Idea
            </button>
          </div>
        </div>
        
        <button
          onClick={onReset}
          className="mx-auto flex items-center justify-center space-x-2 text-gray-500 hover:text-white transition-colors uppercase tracking-widest font-mono text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start Over</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center space-y-2">
        <p className="text-gray-500 font-mono tracking-widest uppercase text-xs">
          Your Product Opportunity
        </p>
      </div>

      <div className="text-center py-12 px-6 bg-[#0a0a0a] border border-gray-800 rounded-lg shadow-xl shadow-black/50">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-sm font-mono text-gray-500 flex items-center gap-2">
            <span>{selections.category}</span>
            <span className="text-gray-700">/</span>
            <span>{selections.subNiche}</span>
            <span className="text-gray-700">/</span>
            <span>{selections.productType}</span>
          </div>
          <div className="text-3xl md:text-5xl font-medium tracking-tight font-mono text-white leading-tight">
            Build a <span className="text-gray-400">{selections.productType?.toLowerCase()}</span><br />
            for <span className="text-gray-400">{selections.subNiche?.toLowerCase()}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowPainPoints(true)}
        className="w-full py-4 bg-white text-black font-mono text-sm uppercase tracking-widest rounded hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
      >
        Find Pain Points ▸
      </button>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
        <button
          onClick={onReset}
          className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="uppercase text-xs font-mono tracking-widest">
            Spin Again
          </span>
        </button>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span className="uppercase text-xs font-mono tracking-widest">
            {copied ? "Copied!" : "Copy Result"}
          </span>
        </button>
        <button
          onClick={shareResult}
          className="flex items-center space-x-2 text-gray-500 hover:text-white transition-colors"
        >
          <Share className="w-4 h-4" />
          <span className="uppercase text-xs font-mono tracking-widest">
            Share
          </span>
        </button>
      </div>
    </div>
  );
}
