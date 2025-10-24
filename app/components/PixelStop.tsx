// app/components/PixelStop.tsx
import React from 'react';

export default function PixelStop({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 8 8" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Stop square pixel art */}
      <rect x="1" y="1" width="6" height="6" fill={color} />
    </svg>
  );
}

