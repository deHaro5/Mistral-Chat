// app/components/PixelBrain.tsx
"use client";
import React from "react";

export default function PixelBrain() {
  return (
    <div className="pixel-brain-container">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Top of brain */}
        <rect x="6" y="4" width="12" height="2" fill="currentColor" />
        
        {/* Upper lobes */}
        <rect x="4" y="6" width="7" height="2" fill="currentColor" />
        <rect x="13" y="6" width="7" height="2" fill="currentColor" />
        
        {/* Middle sections with folds */}
        <rect x="4" y="8" width="2" height="6" fill="currentColor" />
        <rect x="7" y="8" width="2" height="6" fill="currentColor" />
        <rect x="10" y="8" width="4" height="2" fill="currentColor" />
        <rect x="15" y="8" width="2" height="6" fill="currentColor" />
        <rect x="18" y="8" width="2" height="6" fill="currentColor" />
        
        {/* Internal folds */}
        <rect x="10" y="11" width="4" height="2" fill="currentColor" />
        
        {/* Bottom sections */}
        <rect x="6" y="14" width="3" height="2" fill="currentColor" />
        <rect x="10" y="14" width="4" height="2" fill="currentColor" />
        <rect x="15" y="14" width="3" height="2" fill="currentColor" />
        
        {/* Brain stem */}
        <rect x="10" y="16" width="4" height="3" fill="currentColor" />
        <rect x="11" y="19" width="2" height="2" fill="currentColor" />
        
        {/* Detail dots for texture */}
        <rect x="6" y="9" width="1" height="1" fill="currentColor" opacity="0.5" />
        <rect x="8" y="11" width="1" height="1" fill="currentColor" opacity="0.5" />
        <rect x="16" y="9" width="1" height="1" fill="currentColor" opacity="0.5" />
        <rect x="17" y="12" width="1" height="1" fill="currentColor" opacity="0.5" />
      </svg>
      
      <style jsx>{`
        .pixel-brain-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}


