// app/components/CopyIcon.tsx
import React from 'react';

export default function CopyIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  const pixelSize = size / 8;
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 8 8" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Back square (behind) */}
      <rect x="2" y="0" width="5" height="1" fill={color} />
      <rect x="2" y="1" width="1" height="5" fill={color} />
      <rect x="6" y="1" width="1" height="1" fill={color} />
      <rect x="3" y="2" width="3" height="1" fill={color} />
      <rect x="6" y="2" width="1" height="4" fill={color} />
      <rect x="3" y="5" width="4" height="1" fill={color} />
      
      {/* Front square (in front) */}
      <rect x="0" y="2" width="5" height="1" fill={color} />
      <rect x="0" y="3" width="1" height="5" fill={color} />
      <rect x="4" y="3" width="1" height="1" fill={color} />
      <rect x="1" y="4" width="3" height="1" fill={color} />
      <rect x="4" y="4" width="1" height="3" fill={color} />
      <rect x="1" y="7" width="4" height="1" fill={color} />
    </svg>
  );
}

