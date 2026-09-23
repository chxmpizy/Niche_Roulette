"use client";

import { useState, useEffect } from "react";
import { StageIndicator } from "@/components/roulette/stage-indicator";
import { CategoryStage } from "@/components/roulette/category-stage";
import { SubNicheStage } from "@/components/roulette/sub-niche-stage";
import { ProductStage } from "@/components/roulette/product-stage";
import { ResultView } from "@/components/roulette/result-view";

export type RouletteState = {
  category: string | null;
  subNiche: string | null;
  productType: string | null;
};

export default function RoulettePage() {
  const [stage, setStage] = useState<1 | 2 | 3 | 4>(1);
  const [selections, setSelections] = useState<RouletteState>({
    category: null,
    subNiche: null,
    productType: null,
  });
  const [hints, setHints] = useState<React.ReactNode>(
    <><kbd className="font-mono text-[10px] uppercase border border-gray-700 rounded px-1.5 py-0.5 text-gray-400 bg-gray-900 mr-2">space</kbd> to spin</>
  );

  const handleCategorySelect = (category: string) => {
    setSelections((prev) => ({ ...prev, category }));
    setStage(2);
  };

  const handleSubNicheSelect = (subNiche: string) => {
    setSelections((prev) => ({ ...prev, subNiche }));
    setStage(3);
  };

  const handleProductSelect = (productType: string) => {
    setSelections((prev) => ({ ...prev, productType }));
    setStage(4);
  };

  const reset = () => {
    setSelections({ category: null, subNiche: null, productType: null });
    setStage(1);
    setHints(<><kbd className="font-mono text-[10px] uppercase border border-gray-700 rounded px-1.5 py-0.5 text-gray-400 bg-gray-900 mr-2">space</kbd> to spin</>);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-black text-white">
      <header className="flex justify-between items-center p-6 border-b border-gray-900 text-sm tracking-wide font-mono text-gray-500">
        <div>niche roulette</div>
        <div>stage {stage}/4</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
          {stage < 4 && <StageIndicator currentStage={stage} />}
          
          <div className="flex-1 flex flex-col items-center justify-center w-full">
            {stage === 1 && (
              <CategoryStage onComplete={handleCategorySelect} setHints={setHints} />
            )}
            {stage === 2 && selections.category && (
              <SubNicheStage 
                categoryName={selections.category} 
                onComplete={handleSubNicheSelect} 
                setHints={setHints}
              />
            )}
            {stage === 3 && (
              <ProductStage onComplete={handleProductSelect} setHints={setHints} />
            )}
            {stage === 4 && (
              <ResultView selections={selections} onReset={reset} setHints={setHints} />
            )}
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
