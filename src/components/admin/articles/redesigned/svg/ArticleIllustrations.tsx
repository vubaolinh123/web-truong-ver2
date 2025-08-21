/**
 * Article Illustrations Component
 * Custom SVG illustrations for the articles admin page
 */

'use client';

import React from 'react';

interface IllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

// Empty state illustration - Anime-style character with books
export const EmptyArticlesIllustration: React.FC<IllustrationProps> = ({ 
  className = "", 
  width = 300, 
  height = 300 
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 300 300"
    className={`${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a1b3a" />
        <stop offset="100%" stopColor="#0f1419" />
      </linearGradient>
      <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="100%" stopColor="#0099cc" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Background circle */}
    <circle cx="150" cy="150" r="140" fill="url(#bgGradient)" opacity="0.1" />
    
    {/* Floating books */}
    <g className="animate-float">
      <rect x="80" y="120" width="30" height="40" rx="3" fill="url(#bookGradient)" filter="url(#glow)" />
      <rect x="85" y="125" width="20" height="2" fill="#ffffff" opacity="0.8" />
      <rect x="85" y="130" width="15" height="2" fill="#ffffff" opacity="0.6" />
    </g>
    
    <g className="animate-float" style={{ animationDelay: '0.5s' }}>
      <rect x="190" y="100" width="25" height="35" rx="3" fill="#ff6b35" filter="url(#glow)" />
      <rect x="195" y="105" width="15" height="2" fill="#ffffff" opacity="0.8" />
      <rect x="195" y="110" width="10" height="2" fill="#ffffff" opacity="0.6" />
    </g>
    
    {/* Central character/mascot */}
    <g transform="translate(150, 150)">
      {/* Character body */}
      <ellipse cx="0" cy="20" rx="25" ry="35" fill="#2d3748" />
      
      {/* Character head */}
      <circle cx="0" cy="-20" r="20" fill="#f7fafc" />
      
      {/* Eyes */}
      <circle cx="-8" cy="-25" r="3" fill="#00d4ff" />
      <circle cx="8" cy="-25" r="3" fill="#00d4ff" />
      
      {/* Smile */}
      <path d="M -8 -15 Q 0 -10 8 -15" stroke="#00d4ff" strokeWidth="2" fill="none" />
      
      {/* Arms holding a book */}
      <ellipse cx="-15" cy="0" rx="8" ry="15" fill="#f7fafc" />
      <ellipse cx="15" cy="0" rx="8" ry="15" fill="#f7fafc" />
      
      {/* Book in hands */}
      <rect x="-12" y="-5" width="24" height="18" rx="2" fill="#ffff00" filter="url(#glow)" />
      <rect x="-10" y="-2" width="20" height="2" fill="#1a1b3a" opacity="0.8" />
      <rect x="-10" y="2" width="15" height="2" fill="#1a1b3a" opacity="0.6" />
      <rect x="-10" y="6" width="18" height="2" fill="#1a1b3a" opacity="0.4" />
    </g>
    
    {/* Decorative stars */}
    <g className="animate-twinkle">
      <polygon points="50,50 52,58 60,58 54,62 56,70 50,66 44,70 46,62 40,58 48,58" fill="#ffff00" opacity="0.8" />
      <polygon points="250,80 252,88 260,88 254,92 256,100 250,96 244,100 246,92 240,88 248,88" fill="#00ffff" opacity="0.6" />
      <polygon points="70,220 72,228 80,228 74,232 76,240 70,236 64,240 66,232 60,228 68,228" fill="#ff6b35" opacity="0.7" />
    </g>
    
    {/* Floating particles */}
    <g className="animate-pulse">
      <circle cx="100" cy="80" r="2" fill="#00d4ff" opacity="0.6" />
      <circle cx="220" cy="180" r="1.5" fill="#ffff00" opacity="0.8" />
      <circle cx="60" cy="180" r="1" fill="#00ffff" opacity="0.5" />
      <circle cx="240" cy="120" r="2.5" fill="#ff6b35" opacity="0.7" />
    </g>
  </svg>
);

// Loading illustration - Animated books and papers
export const LoadingArticlesIllustration: React.FC<IllustrationProps> = ({ 
  className = "", 
  width = 200, 
  height = 200 
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 200"
    className={`${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="loadingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="50%" stopColor="#ffff00" />
        <stop offset="100%" stopColor="#ff6b35" />
      </linearGradient>
    </defs>
    
    {/* Spinning books */}
    <g className="animate-spin" style={{ transformOrigin: '100px 100px' }}>
      <rect x="90" y="70" width="20" height="30" rx="2" fill="url(#loadingGradient)" opacity="0.8" />
      <rect x="70" y="90" width="30" height="20" rx="2" fill="url(#loadingGradient)" opacity="0.6" />
      <rect x="110" y="90" width="30" height="20" rx="2" fill="url(#loadingGradient)" opacity="0.4" />
    </g>
    
    {/* Pulsing center */}
    <circle cx="100" cy="100" r="15" fill="#00d4ff" className="animate-pulse" opacity="0.3" />
  </svg>
);

// Success illustration - Checkmark with sparkles
export const SuccessIllustration: React.FC<IllustrationProps> = ({ 
  className = "", 
  width = 150, 
  height = 150 
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 150 150"
    className={`${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="successGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Success circle */}
    <circle cx="75" cy="75" r="40" fill="#00ff88" opacity="0.2" filter="url(#successGlow)" />
    <circle cx="75" cy="75" r="30" fill="none" stroke="#00ff88" strokeWidth="3" />
    
    {/* Checkmark */}
    <path d="M 60 75 L 70 85 L 90 65" stroke="#00ff88" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Sparkles */}
    <g className="animate-twinkle">
      <polygon points="45,45 47,53 55,53 49,57 51,65 45,61 39,65 41,57 35,53 43,53" fill="#ffff00" opacity="0.8" />
      <polygon points="105,45 107,53 115,53 109,57 111,65 105,61 99,65 101,57 95,53 103,53" fill="#00ffff" opacity="0.6" />
    </g>
  </svg>
);

// Error illustration - Warning with anime styling
export const ErrorIllustration: React.FC<IllustrationProps> = ({ 
  className = "", 
  width = 150, 
  height = 150 
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 150 150"
    className={`${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="errorGlow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Error circle */}
    <circle cx="75" cy="75" r="40" fill="#ff1744" opacity="0.2" filter="url(#errorGlow)" />
    <circle cx="75" cy="75" r="30" fill="none" stroke="#ff1744" strokeWidth="3" />
    
    {/* X mark */}
    <path d="M 60 60 L 90 90" stroke="#ff1744" strokeWidth="4" strokeLinecap="round" />
    <path d="M 90 60 L 60 90" stroke="#ff1744" strokeWidth="4" strokeLinecap="round" />
    
    {/* Warning sparkles */}
    <g className="animate-pulse">
      <circle cx="45" cy="45" r="2" fill="#ff6b35" opacity="0.8" />
      <circle cx="105" cy="45" r="2" fill="#ff6b35" opacity="0.6" />
      <circle cx="45" cy="105" r="2" fill="#ff6b35" opacity="0.7" />
      <circle cx="105" cy="105" r="2" fill="#ff6b35" opacity="0.5" />
    </g>
  </svg>
);

export default {
  EmptyArticlesIllustration,
  LoadingArticlesIllustration,
  SuccessIllustration,
  ErrorIllustration
};
