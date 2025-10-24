// app/components/EasterEgg.tsx
"use client";
import React, { useEffect, useState } from "react";
import PixelCat from "./PixelCat";

interface FlyingCat {
  id: number;
  x: number;
  delay: number;
}

export default function EasterEgg({ active, onComplete }: { active: boolean; onComplete: () => void }) {
  const [cats, setCats] = useState<FlyingCat[]>([]);

  useEffect(() => {
    if (active) {
      // Create 20 flying cats with random positions
      const newCats: FlyingCat[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 90 + 5, // 5% to 95%
        delay: i * 0.15,
      }));
      setCats(newCats);

      // Clear cats after animation
      const timeout = setTimeout(() => {
        setCats([]);
        onComplete();
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <>
      <div className="easter-egg-overlay" />
      <div className="easter-egg-container">
        {cats.map((cat) => (
          <div
            key={cat.id}
            className="flying-cat"
            style={{
              left: `${cat.x}%`,
              animationDelay: `${cat.delay}s`,
            }}
          >
            <PixelCat />
          </div>
        ))}
      </div>
    </>
  );
}

