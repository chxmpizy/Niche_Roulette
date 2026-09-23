"use client";

import { useState } from "react";
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
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        {stage < 4 && <StageIndicator currentStage={stage} />}
        
        <div className="flex-1 flex flex-col items-center justify-center">
          {stage === 1 && <CategoryStage onComplete={handleCategorySelect} />}
          {stage === 2 && selections.category && (
            <SubNicheStage categoryName={selections.category} onComplete={handleSubNicheSelect} />
          )}
          {stage === 3 && <ProductStage onComplete={handleProductSelect} />}
          {stage === 4 && (
            <ResultView selections={selections} onReset={reset} />
          )}
        </div>
      </div>
    </div>
  );
}
