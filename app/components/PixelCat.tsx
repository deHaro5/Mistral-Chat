// app/components/PixelCat.tsx
"use client";
import React from "react";

export default function PixelCat() {
  return (
    <div className="pixel-cat-container">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Left ear */}
        <rect x="6" y="8" width="4" height="4" fill="currentColor" />
        <rect x="8" y="6" width="2" height="2" fill="currentColor" />
        
        {/* Right ear */}
        <rect x="22" y="8" width="4" height="4" fill="currentColor" />
        <rect x="22" y="6" width="2" height="2" fill="currentColor" />
        
        {/* Head */}
        <rect x="10" y="10" width="12" height="12" fill="currentColor" />
        <rect x="8" y="12" width="2" height="8" fill="currentColor" />
        <rect x="22" y="12" width="2" height="8" fill="currentColor" />
        
        {/* Eyes */}
        <rect x="12" y="14" width="2" height="2" fill="#ff8c42" className="cat-eye-left" />
        <rect x="18" y="14" width="2" height="2" fill="#ff8c42" className="cat-eye-right" />
        
        {/* Nose */}
        <rect x="15" y="17" width="2" height="2" fill="#ff8c42" />
        
        {/* Mouth */}
        <rect x="14" y="19" width="4" height="1" fill="currentColor" opacity="0.5" />
        
        {/* Whiskers left */}
        <rect x="4" y="15" width="4" height="1" fill="currentColor" opacity="0.6" />
        <rect x="4" y="17" width="3" height="1" fill="currentColor" opacity="0.6" />
        
        {/* Whiskers right */}
        <rect x="24" y="15" width="4" height="1" fill="currentColor" opacity="0.6" />
        <rect x="25" y="17" width="3" height="1" fill="currentColor" opacity="0.6" />
        
        {/* Body */}
        <rect x="10" y="22" width="12" height="4" fill="currentColor" />
        
        {/* Tail */}
        <rect x="22" y="24" width="4" height="2" fill="currentColor" className="cat-tail" />
        <rect x="26" y="22" width="2" height="2" fill="currentColor" className="cat-tail-tip" />
      </svg>
      
      <style jsx>{`
        .pixel-cat-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #e5e5e5;
        }
        
        .cat-eye-left, .cat-eye-right {
          animation: blink 4s infinite;
        }
        
        .cat-tail {
          animation: tail-wag 2s ease-in-out infinite;
          transform-origin: left center;
        }
        
        .cat-tail-tip {
          animation: tail-wag-tip 2s ease-in-out infinite;
          transform-origin: left center;
        }
        
        @keyframes blink {
          0%, 96%, 100% {
            opacity: 1;
          }
          97%, 98% {
            opacity: 0;
          }
        }
        
        @keyframes tail-wag {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        
        @keyframes tail-wag-tip {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(1px, -3px);
          }
        }
      `}</style>
    </div>
  );
}




