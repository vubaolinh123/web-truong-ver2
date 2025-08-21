/**
 * Status Icons Component
 * Custom status indicators with anime styling
 */

'use client';

import React from 'react';

interface StatusIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

// Published status icon
export const PublishedIcon: React.FC<StatusIconProps> = ({ 
  className = "", 
  size = 24,
  animated = true 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`${className} ${animated ? 'animate-pulse' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="publishedGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="publishedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ff88" />
        <stop offset="100%" stopColor="#00cc66" />
      </linearGradient>
    </defs>
    
    <circle cx="12" cy="12" r="10" fill="url(#publishedGradient)" filter="url(#publishedGlow)" opacity="0.9" />
    <path d="M 8 12 L 11 15 L 16 9" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Draft status icon
export const DraftIcon: React.FC<StatusIconProps> = ({ 
  className = "", 
  size = 24,
  animated = true 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`${className} ${animated ? 'animate-pulse' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="draftGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="draftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffff00" />
        <stop offset="100%" stopColor="#ffcc00" />
      </linearGradient>
    </defs>
    
    <circle cx="12" cy="12" r="10" fill="url(#draftGradient)" filter="url(#draftGlow)" opacity="0.9" />
    <path d="M 8 8 L 16 8 M 8 12 L 14 12 M 8 16 L 12 16" stroke="#1a1b3a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Archived status icon
export const ArchivedIcon: React.FC<StatusIconProps> = ({ 
  className = "", 
  size = 24,
  animated = true 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`${className} ${animated ? 'animate-pulse' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="archivedGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="archivedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff6b35" />
        <stop offset="100%" stopColor="#ff4500" />
      </linearGradient>
    </defs>
    
    <circle cx="12" cy="12" r="10" fill="url(#archivedGradient)" filter="url(#archivedGlow)" opacity="0.9" />
    <rect x="7" y="9" width="10" height="8" rx="1" fill="#ffffff" opacity="0.9" />
    <path d="M 9 7 L 15 7 L 15 9 L 9 9 Z" fill="#ffffff" opacity="0.9" />
    <path d="M 10 12 L 14 12" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Featured status icon
export const FeaturedIcon: React.FC<StatusIconProps> = ({ 
  className = "", 
  size = 24,
  animated = true 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`${className} ${animated ? 'animate-twinkle' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="featuredGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="featuredGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffff00" />
        <stop offset="50%" stopColor="#ff6b35" />
        <stop offset="100%" stopColor="#ff1744" />
      </linearGradient>
    </defs>
    
    <polygon 
      points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" 
      fill="url(#featuredGradient)" 
      filter="url(#featuredGlow)"
    />
    <polygon 
      points="12,5 14,9 18,9.5 15.5,12 16,16 12,14 8,16 8.5,12 6,9.5 10,9" 
      fill="#ffffff" 
      opacity="0.8"
    />
  </svg>
);

// Trending icon
export const TrendingIcon: React.FC<StatusIconProps> = ({ 
  className = "", 
  size = 24,
  animated = true 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`${className} ${animated ? 'animate-bounce' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="trendingGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="trendingGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="100%" stopColor="#00ffff" />
      </linearGradient>
    </defs>
    
    <path 
      d="M 3 17 L 9 11 L 13 15 L 21 7" 
      stroke="url(#trendingGradient)" 
      strokeWidth="3" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      filter="url(#trendingGlow)"
    />
    <path d="M 16 7 L 21 7 L 21 12" stroke="url(#trendingGradient)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Popular icon
export const PopularIcon: React.FC<StatusIconProps> = ({ 
  className = "", 
  size = 24,
  animated = true 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`${className} ${animated ? 'animate-pulse' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="popularGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <radialGradient id="popularGradient" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#ff1744" />
        <stop offset="100%" stopColor="#ff6b35" />
      </radialGradient>
    </defs>
    
    <path 
      d="M 12 21.35 L 10.55 20.03 C 5.4 15.36 2 12.28 2 8.5 C 2 5.42 4.42 3 7.5 3 C 9.24 3 10.91 3.81 12 5.09 C 13.09 3.81 14.76 3 16.5 3 C 19.58 3 22 5.42 22 8.5 C 22 12.28 18.6 15.36 13.45 20.04 L 12 21.35 Z" 
      fill="url(#popularGradient)" 
      filter="url(#popularGlow)"
    />
  </svg>
);

// View count icon
export const ViewIcon: React.FC<StatusIconProps> = ({ 
  className = "", 
  size = 20,
  animated = false 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    className={`${className} ${animated ? 'animate-pulse' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="viewGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="100%" stopColor="#0099cc" />
      </linearGradient>
    </defs>
    
    <path 
      d="M 10 3 C 14 3 17.5 6 18 10 C 17.5 14 14 17 10 17 C 6 17 2.5 14 2 10 C 2.5 6 6 3 10 3 Z" 
      fill="url(#viewGradient)" 
      opacity="0.8"
    />
    <circle cx="10" cy="10" r="3" fill="#ffffff" />
    <circle cx="10" cy="10" r="1.5" fill="#1a1b3a" />
  </svg>
);

// Comment icon
export const CommentIcon: React.FC<StatusIconProps> = ({ 
  className = "", 
  size = 20,
  animated = false 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    className={`${className} ${animated ? 'animate-pulse' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="commentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffff00" />
        <stop offset="100%" stopColor="#ffcc00" />
      </linearGradient>
    </defs>
    
    <path 
      d="M 3 3 L 17 3 C 17.5 3 18 3.5 18 4 L 18 12 C 18 12.5 17.5 13 17 13 L 6 13 L 3 16 L 3 4 C 3 3.5 3.5 3 4 3 Z" 
      fill="url(#commentGradient)" 
      opacity="0.8"
    />
    <circle cx="7" cy="8" r="1" fill="#1a1b3a" />
    <circle cx="10" cy="8" r="1" fill="#1a1b3a" />
    <circle cx="13" cy="8" r="1" fill="#1a1b3a" />
  </svg>
);

// Like icon
export const LikeIcon: React.FC<StatusIconProps> = ({ 
  className = "", 
  size = 20,
  animated = false 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    className={`${className} ${animated ? 'animate-pulse' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="likeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff1744" />
        <stop offset="100%" stopColor="#ff6b35" />
      </linearGradient>
    </defs>
    
    <path 
      d="M 10 17 L 8.8 15.9 C 4.4 11.9 1.5 9.3 1.5 6.1 C 1.5 3.6 3.6 1.5 6.1 1.5 C 7.6 1.5 9 2.2 10 3.3 C 11 2.2 12.4 1.5 13.9 1.5 C 16.4 1.5 18.5 3.6 18.5 6.1 C 18.5 9.3 15.6 11.9 11.2 15.9 L 10 17 Z" 
      fill="url(#likeGradient)" 
      opacity="0.8"
    />
  </svg>
);

export default {
  PublishedIcon,
  DraftIcon,
  ArchivedIcon,
  FeaturedIcon,
  TrendingIcon,
  PopularIcon,
  ViewIcon,
  CommentIcon,
  LikeIcon
};
