// app/components/PixelClock.tsx
"use client";
import React from "react";

export default function PixelClock() {
  return (
    <div className="pixel-clock-container">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Clock circle outer */}
        <rect x="8" y="5" width="8" height="2" fill="currentColor" />
        <rect x="6" y="7" width="2" height="2" fill="currentColor" />
        <rect x="16" y="7" width="2" height="2" fill="currentColor" />
        <rect x="5" y="9" width="2" height="6" fill="currentColor" />
        <rect x="17" y="9" width="2" height="6" fill="currentColor" />
        <rect x="6" y="15" width="2" height="2" fill="currentColor" />
        <rect x="16" y="15" width="2" height="2" fill="currentColor" />
        <rect x="8" y="17" width="8" height="2" fill="currentColor" />
        
        {/* Clock center dot */}
        <rect x="11" y="11" width="2" height="2" fill="currentColor" />
        
        {/* Hour hand (pointing up-right) */}
        <rect x="11" y="9" width="2" height="2" fill="currentColor" />
        <rect x="13" y="9" width="2" height="2" fill="currentColor" />
        
        {/* Minute hand (pointing right) */}
        <rect x="13" y="11" width="2" height="2" fill="currentColor" />
        <rect x="15" y="11" width="2" height="2" fill="currentColor" />
        
        {/* Hour markers */}
        <rect x="11" y="6" width="2" height="1" fill="currentColor" opacity="0.5" />
        <rect x="15" y="8" width="1" height="2" fill="currentColor" opacity="0.5" />
        <rect x="11" y="16" width="2" height="1" fill="currentColor" opacity="0.5" />
        <rect x="7" y="11" width="1" height="2" fill="currentColor" opacity="0.5" />
      </svg>
      
      <style jsx>{`
        .pixel-clock-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}

