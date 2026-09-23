"use client";

import { useEffect, useRef, useState } from "react";
import { getRandomElement } from "@/lib/random";
import { scheduleReelSound } from "@/lib/audio";

type SlotReelProps = {
  items: string[];
  isSpinning: boolean;
  onStop: (selected: string) => void;
  hasLanded?: boolean;
};

export function SlotReel({ items, isSpinning, onStop, hasLanded = false }: SlotReelProps) {
  const [displayItems, setDisplayItems] = useState<string[]>(["???"]);
  const [targetIndex, setTargetIndex] = useState<number>(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const isSpinningRef = useRef(false);

  useEffect(() => {
    if (!isSpinning || isSpinningRef.current) return;
    isSpinningRef.current = true;

    const duration = 2500 + Math.random() * 1000;
    const fillerCount = 30 + Math.floor(Math.random() * 20);
    const target = getRandomElement(items);
    const jumps = fillerCount + 1; // distance to the target
    
    setDisplayItems((prev) => {
      const sequence = [prev[targetIndex] || "???"];
      
      const getUniqueItem = (recent: string[]) => {
        let attempts = 0;
        let item;
        do {
          item = getRandomElement(items);
          attempts++;
        } while (recent.includes(item) && attempts < 50);
        return item;
      };

      for (let i = 0; i < fillerCount; i++) {
        const recentHistory = sequence.slice(Math.max(0, sequence.length - Math.min(10, items.length - 1)));
        sequence.push(getUniqueItem(recentHistory));
      }

      if (sequence[sequence.length - 1] === target) {
        sequence[sequence.length - 1] = getUniqueItem([target, sequence[sequence.length - 2]]);
      }
      
      sequence.push(target);

      // Add dummy items so the gradient mask has text to fade out at the bottom
      let last = target;
      for (let i = 0; i < 3; i++) {
        const nextDummy = getUniqueItem([last]);
        sequence.push(nextDummy);
        last = nextDummy;
      }

      return sequence;
    });
    
    setTargetIndex(jumps);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!stripRef.current) return;
        const strip = stripRef.current;
        
        strip.style.transition = "none";
        strip.style.transform = "translateY(0)";
        void strip.offsetHeight;

        strip.style.filter = "blur(4px)";
        
        const lineH = strip.firstElementChild?.getBoundingClientRect().height || 0;
        const targetY = jumps * lineH;

        strip.style.transition = `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
        strip.style.transform = `translateY(-${targetY}px)`;

        scheduleReelSound(jumps, duration);

        setTimeout(() => {
          if (stripRef.current) {
             stripRef.current.style.transition = `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease-out`;
             stripRef.current.style.filter = "blur(0px)";
          }
        }, duration * 0.45);

        setTimeout(() => {
          isSpinningRef.current = false;
          onStop(target);
        }, duration);
      });
    });
  }, [isSpinning, items, onStop, targetIndex]);

  return (
    <div 
      className="h-[3em] -my-[0.8em] overflow-hidden w-full flex justify-center items-start relative"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
        maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)"
      }}
    >
      <div
        ref={stripRef}
        className="flex flex-col items-center will-change-transform origin-top pt-[0.8em] w-full"
      >
        {displayItems.map((item, idx) => (
          <div key={idx} className="h-[1.4em] flex items-center justify-center whitespace-nowrap relative w-full">
            <span className="relative">
              {item}
              {hasLanded && idx === targetIndex && (
                <span className="absolute -bottom-[2px] left-0 w-full h-[3px] bg-white animate-in slide-in-from-left duration-300" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
