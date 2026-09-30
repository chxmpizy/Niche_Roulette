"use client";

import { useEffect, useRef, useState } from "react";
import { getRandomElement } from "@/lib/random";
import { scheduleReelSound } from "@/lib/audio";
import { clsx } from "clsx";

type SlotReelProps = {
  items: string[];
  isSpinning: boolean;
  onStop: (selected: string) => void;
  hasLanded?: boolean;
};

export function SlotReel({ items, isSpinning, onStop, hasLanded = false }: SlotReelProps) {
  const [displayItems, setDisplayItems] = useState<string[]>([...items, ...items]);
  const [targetIndex, setTargetIndex] = useState<number>(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const isSpinningRef = useRef(false);

  const isIdle = !isSpinning && !hasLanded;

  useEffect(() => {
    // When returning to idle state (e.g. reset), reset the items so it can scroll
    if (isIdle) {
      setDisplayItems([...items, ...items]);
      if (stripRef.current) {
        // Clear any inline styles left over from the spin animation
        stripRef.current.style.transition = "none";
        stripRef.current.style.transform = "";
        stripRef.current.style.filter = "blur(0px)";
      }
    }
  }, [isIdle, items]);

  useEffect(() => {
    if (!isSpinning || isSpinningRef.current) return;
    isSpinningRef.current = true;

    const duration = 4500 + Math.random() * 1500;
    const fillerCount = 70 + Math.floor(Math.random() * 20);
    const target = getRandomElement(items);
    const jumps = fillerCount + 1; // distance to the target
    
    setDisplayItems((prev) => {
      // In idle state, prev is a long list. Let's just grab a random starting point.
      // But for visual continuity, we could try to guess what's on screen.
      // Since it's moving, picking a random item as the start of the spin sequence is fine 
      // because the blur hides the cut.
      const sequence = [getRandomElement(items)];
      
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

        strip.style.transition = `transform ${duration}ms cubic-bezier(0.15, 0.95, 0.25, 1)`;
        strip.style.transform = `translateY(-${targetY}px)`;

        scheduleReelSound(jumps, duration);

        setTimeout(() => {
          if (stripRef.current) {
             stripRef.current.style.transition = `transform ${duration}ms cubic-bezier(0.15, 0.95, 0.25, 1), filter 0.4s ease-out`;
             stripRef.current.style.filter = "blur(0px)";
          }
        }, duration * 0.5);

        setTimeout(() => {
          isSpinningRef.current = false;
          onStop(target);
        }, duration);
      });
    });
  }, [isSpinning, items, onStop, targetIndex]);

  return (
    <div 
      className="h-[3em] -my-[0.8em] overflow-hidden w-full flex justify-center items-start relative pt-[0.8em]"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
        maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)"
      }}
    >
      <div
        ref={stripRef}
        className={clsx(
          "flex flex-col items-center will-change-transform origin-top w-full",
          isIdle && "animate-slow-spin"
        )}
      >
        {displayItems.map((item, idx) => (
          <div key={idx} className="h-[1.4em] flex items-center justify-center whitespace-nowrap relative w-full">
            <span className={clsx(
              "relative transition-opacity duration-300",
              (isIdle || (!isIdle && idx === targetIndex)) ? "opacity-100" : "opacity-40"
            )}>
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
