"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { getRandomElement, sleep } from "@/lib/random";

type SlotReelProps = {
  items: string[];
  isSpinning: boolean;
  onStop: (selected: string) => void;
};

export function SlotReel({ items, isSpinning, onStop }: SlotReelProps) {
  const [displayItems, setDisplayItems] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSettling, setIsSettling] = useState(false);

  useEffect(() => {
    // Initial display
    if (displayItems.length === 0) {
      setDisplayItems(["???"]);
    }
  }, [displayItems]);

  useEffect(() => {
    if (!isSpinning) return;

    let isActive = true;
    const spinDuration = 2500 + Math.random() * 1000;
    
    // Generate a long list of items for the strip
    const sequence = ["???"];
    const fillerCount = 30 + Math.floor(Math.random() * 20);
    for (let i = 0; i < fillerCount; i++) {
      sequence.push(getRandomElement(items));
    }
    const target = getRandomElement(items);
    sequence.push(target);
    
    setDisplayItems(sequence);
    setOffset(0);
    setIsSettling(false);

    const runSpin = async () => {
      // Need a tiny delay for DOM to update with new items
      await sleep(50);
      if (!isActive) return;

      const itemHeight = containerRef.current?.firstElementChild?.getBoundingClientRect().height || 60;
      const totalOffset = (sequence.length - 1) * itemHeight;
      
      setOffset(totalOffset);

      setTimeout(() => {
        if (!isActive) return;
        setIsSettling(true);
      }, spinDuration * 0.45);

      setTimeout(() => {
        if (!isActive) return;
        onStop(target);
      }, spinDuration);
    };

    runSpin();

    return () => {
      isActive = false;
    };
  }, [isSpinning, items, onStop]);

  return (
    <div className="h-[1.4em] overflow-hidden w-full flex justify-center items-center">
      <div
        ref={containerRef}
        className={clsx(
          "flex flex-col items-center will-change-transform",
          isSpinning && !isSettling ? "blur-[4px]" : "blur-0",
          !isSpinning && !isSettling && "transition-none"
        )}
        style={{
          transform: `translateY(-${offset}px)`,
          transition: isSpinning ? `transform ${isSettling ? '2.5s' : '3s'} cubic-bezier(0.16, 1, 0.3, 1)` : 'none',
        }}
      >
        {displayItems.map((item, idx) => (
          <div key={idx} className="h-[1.4em] flex items-center justify-center whitespace-nowrap">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
