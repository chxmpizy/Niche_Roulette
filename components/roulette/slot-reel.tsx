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
  const stripRef = useRef<HTMLDivElement>(null);
  const isSpinningRef = useRef(false);

  useEffect(() => {
    if (!isSpinning || isSpinningRef.current) return;
    isSpinningRef.current = true;

    const duration = 2500 + Math.random() * 1000;
    const fillerCount = 30 + Math.floor(Math.random() * 20);
    const target = getRandomElement(items);
    const jumps = fillerCount + 1;
    
    setDisplayItems((prev) => {
      const sequence = [prev[prev.length - 1] || "???"];
      for (let i = 0; i < fillerCount; i++) {
        sequence.push(getRandomElement(items));
      }
      sequence.push(target);
      return sequence;
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!stripRef.current) return;
        const strip = stripRef.current;
        
        // Disable transitions and jump back to the start instantly
        strip.style.transition = "none";
        strip.style.transform = "translateY(0)";
        
        // Force reflow so the browser registers translateY(0) before we add transition
        void strip.offsetHeight;

        // Apply blur
        strip.style.filter = "blur(4px)";
        
        // Calculate target offset based on actual rendered height
        const lineH = strip.firstElementChild?.getBoundingClientRect().height || 0;
        const targetY = jumps * lineH;

        // Animate downward
        strip.style.transition = `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
        strip.style.transform = `translateY(-${targetY}px)`;

        // Play the ratchet sound effects matching the curve!
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
  }, [isSpinning, items, onStop]);

  return (
    <div className="h-[1.4em] overflow-hidden w-auto flex justify-center items-start">
      <div
        ref={stripRef}
        className="flex flex-col items-center will-change-transform origin-top"
      >
        {displayItems.map((item, idx) => (
          <div key={idx} className="h-[1.4em] flex items-center justify-center whitespace-nowrap relative">
            {item}
            {hasLanded && idx === displayItems.length - 1 && (
              <div className="absolute bottom-[2px] left-0 w-full h-[3px] bg-white animate-in slide-in-from-left duration-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
