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
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setCats([]);
      onComplete();
    }, 800); // Wait for fade out animation
  };

  useEffect(() => {
    if (active) {
      setIsClosing(false);
      // Create 20 flying cats with random positions
      const newCats: FlyingCat[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 90 + 5, // 5% to 95%
        delay: i * 0.15,
      }));
      setCats(newCats);

      // Clear cats AFTER the CSS animation completes (6s) but BEFORE unmounting
      const clearCatsTimeout = setTimeout(() => {
        setCats([]);
      }, 6000);

      // Call onComplete slightly after to ensure clean unmount
      const completeTimeout = setTimeout(() => {
        onComplete();
      }, 6100);

      return () => {
        clearTimeout(clearCatsTimeout);
        clearTimeout(completeTimeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!active && cats.length === 0) return null;

  return (
    <>
      <div 
        className={`easter-egg-overlay ${isClosing ? 'closing' : ''}`}
        onClick={handleClose}
        style={{ cursor: 'pointer' }}
      />
      <div 
        className={`easter-egg-container ${isClosing ? 'closing' : ''}`}
        onClick={handleClose}
        style={{ cursor: 'pointer' }}
      >
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

