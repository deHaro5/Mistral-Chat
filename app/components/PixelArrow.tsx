// app/components/PixelArrow.tsx
import React from 'react';

export default function PixelArrow({ size = 20, color = "currentColor", direction = "right" }: { size?: number; color?: string; direction?: "left" | "right" }) {
  
  if (direction === "right") {
    return (
      <svg 
        width={size} 
        height={size * 0.5} 
        viewBox="0 0 12 6" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Simple right arrow: → */}
        {/* Horizontal line */}
        <rect x="0" y="2" width="9" height="2" fill={color} />
        {/* Arrow head top */}
        <rect x="8" y="0" width="2" height="2" fill={color} />
        {/* Arrow head bottom */}
        <rect x="8" y="4" width="2" height="2" fill={color} />
        {/* Tip */}
        <rect x="10" y="2" width="2" height="2" fill={color} />
      </svg>
    );
  }
  
  return (
    <svg 
      width={size} 
      height={size * 0.5} 
      viewBox="0 0 12 6" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Simple left arrow: ← */}
      {/* Horizontal line */}
      <rect x="3" y="2" width="9" height="2" fill={color} />
      {/* Arrow head top */}
      <rect x="2" y="0" width="2" height="2" fill={color} />
      {/* Arrow head bottom */}
      <rect x="2" y="4" width="2" height="2" fill={color} />
      {/* Tip */}
      <rect x="0" y="2" width="2" height="2" fill={color} />
    </svg>
  );
}

