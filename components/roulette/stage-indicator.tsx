import { Check } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type StageIndicatorProps = {
  currentStage: number;
};

export function StageIndicator({ currentStage }: StageIndicatorProps) {
  const stages = [
    { num: 1, label: "Category" },
    { num: 2, label: "Sub-niche" },
    { num: 3, label: "Product" },
  ];

  return (
    <div className="flex items-center justify-center space-x-6 md:space-x-12 py-8">
      {stages.map((stage) => {
        const isCompleted = currentStage > stage.num;
        const isActive = currentStage === stage.num;
        
        return (
          <div key={stage.num} className="flex items-center space-x-3">
            <div
              className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold border transition-colors",
                isCompleted
                  ? "bg-white text-black border-white"
                  : isActive
                  ? "bg-transparent text-white border-white"
                  : "bg-transparent text-gray-600 border-gray-600"
              )}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : stage.num}
            </div>
            <span
              className={cn(
                "text-sm uppercase tracking-widest font-medium hidden md:block",
                isCompleted || isActive ? "text-white" : "text-gray-600"
              )}
            >
              {stage.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
