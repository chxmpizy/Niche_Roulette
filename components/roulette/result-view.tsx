"use client";

import { RouletteState } from "@/app/roulette/page";
import { useState } from "react";
import { Copy, Share, RotateCcw, Check } from "lucide-react";

export function ResultView({
  selections,
  onReset,
}: {
  selections: RouletteState;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [showPainPoints, setShowPainPoints] = useState(false);

  const combinationString = `${selections.category} × ${selections.subNiche} × ${selections.productType}`;

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
      <div className="w-full max-w-2xl mx-auto flex flex-col space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <p className="text-gray-500 uppercase tracking-widest text-sm">You got</p>
          <div className="text-xl md:text-3xl font-bold leading-relaxed">
            <span className="text-white">{selections.category}</span>
            <span className="text-gray-600 mx-2">×</span>
            <span className="text-white">{selections.subNiche}</span>
            <span className="text-gray-600 mx-2">×</span>
            <span className="text-white">{selections.productType}</span>
          </div>
        </div>

        <div className="border border-gray-800 bg-[#050505] p-8 md:p-12 space-y-8">
          <div className="text-center">
            <p className="text-gray-400 mb-2">Now ask:</p>
            <h3 className="text-xl md:text-2xl font-medium leading-relaxed">
              What problems do <span className="text-white border-b border-gray-600">{selections.subNiche}</span> have
              <br className="hidden md:block" />
              that a <span className="text-white border-b border-gray-600">{selections.productType}</span> could solve?
            </h3>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-800">
            <p className="text-sm text-gray-500 uppercase tracking-widest">Questions to think about:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">-</span> What is currently frustrating?
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">-</span> What takes too much time?
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">-</span> What is repetitive?
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">-</span> What is expensive?
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">-</span> What is difficult to understand?
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">-</span> What information is missing?
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">-</span> What are they currently doing manually?
              </li>
              <li className="flex items-start">
                <span className="text-gray-600 mr-2">-</span> What are they already paying for?
              </li>
            </ul>
          </div>

          <div className="pt-6">
            <textarea
              className="w-full bg-black border border-gray-700 rounded-none p-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors resize-none h-32"
              placeholder="Describe the pain point..."
            ></textarea>
            <button className="w-full mt-4 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Save Idea
            </button>
          </div>
        </div>
        
        <button
          onClick={onReset}
          className="mx-auto flex items-center justify-center space-x-2 text-gray-500 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Over</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <p className="text-gray-500 tracking-[0.2em] uppercase text-sm">
          Your Product Opportunity
        </p>
      </div>

      <div className="border border-gray-800 bg-[#050505]">
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-gray-800">
          <div className="text-xs text-gray-500 uppercase tracking-widest w-24 md:w-32">
            Category
          </div>
          <div className="text-lg md:text-xl font-medium text-right flex-1">
            {selections.category}
          </div>
        </div>
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-gray-800">
          <div className="text-xs text-gray-500 uppercase tracking-widest w-24 md:w-32">
            Sub-niche
          </div>
          <div className="text-lg md:text-xl font-medium text-right flex-1">
            {selections.subNiche}
          </div>
        </div>
        <div className="p-6 md:p-8 flex items-center justify-between">
          <div className="text-xs text-gray-500 uppercase tracking-widest w-24 md:w-32">
            Product
          </div>
          <div className="text-lg md:text-xl font-medium text-right flex-1">
            {selections.productType}
          </div>
        </div>
      </div>

      <div className="text-center p-6 bg-black border border-gray-800">
        <div className="text-2xl md:text-3xl font-bold leading-relaxed break-words">
          {combinationString}
        </div>
      </div>

      <button
        onClick={() => setShowPainPoints(true)}
        className="w-full py-5 bg-white text-black font-bold text-lg uppercase tracking-widest hover:bg-gray-200 transition-colors"
      >
        Find Pain Points →
      </button>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4">
        <button
          onClick={onReset}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="uppercase text-xs font-bold tracking-widest">
            Spin Again
          </span>
        </button>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span className="uppercase text-xs font-bold tracking-widest">
            {copied ? "Copied!" : "Copy Result"}
          </span>
        </button>
        <button
          onClick={shareResult}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <Share className="w-4 h-4" />
          <span className="uppercase text-xs font-bold tracking-widest">
            Share
          </span>
        </button>
      </div>
    </div>
  );
}
