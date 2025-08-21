/**
 * Anime Decorations Component
 * Decorative SVG elements for anime/comic theme
 */

'use client';

import React from 'react';

interface DecorationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent';
  animated?: boolean;
}

// Floating sparkles
export const Sparkles: React.FC<DecorationProps> = ({ 
  className = "", 
  size = 'md',
  color = 'primary',
  animated = true 
}) => {
  const sizeMap = { sm: 20, md: 30, lg: 40 };
  const colorMap = {
    primary: '#00d4ff',
    secondary: '#ffff00', 
    accent: '#ff6b35'
  };
  
  const sparkleSize = sizeMap[size];
  const sparkleColor = colorMap[color];
  
  return (
    <svg
      width={sparkleSize}
      height={sparkleSize}
      viewBox="0 0 30 30"
      className={`${className} ${animated ? 'animate-twinkle' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={`sparkleGlow-${color}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <polygon 
        points="15,2 17,12 27,12 19,18 22,28 15,22 8,28 11,18 3,12 13,12" 
        fill={sparkleColor} 
        filter={`url(#sparkleGlow-${color})`}
        opacity="0.8"
      />
    </svg>
  );
};

// Energy orbs
export const EnergyOrb: React.FC<DecorationProps> = ({ 
  className = "", 
  size = 'md',
  color = 'primary',
  animated = true 
}) => {
  const sizeMap = { sm: 40, md: 60, lg: 80 };
  const colorMap = {
    primary: ['#00d4ff', '#0099cc'],
    secondary: ['#ffff00', '#ffcc00'], 
    accent: ['#ff6b35', '#ff4500']
  };
  
  const orbSize = sizeMap[size];
  const [color1, color2] = colorMap[color];
  
  return (
    <svg
      width={orbSize}
      height={orbSize}
      viewBox="0 0 60 60"
      className={`${className} ${animated ? 'animate-pulse' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`orbGradient-${color}`} cx="30%" cy="30%">
          <stop offset="0%" stopColor={color1} stopOpacity="0.8" />
          <stop offset="70%" stopColor={color2} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color1} stopOpacity="0.1" />
        </radialGradient>
        <filter id={`orbGlow-${color}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <circle 
        cx="30" 
        cy="30" 
        r="25" 
        fill={`url(#orbGradient-${color})`} 
        filter={`url(#orbGlow-${color})`}
      />
      <circle cx="30" cy="30" r="15" fill={color1} opacity="0.3" />
      <circle cx="25" cy="25" r="5" fill="#ffffff" opacity="0.6" />
    </svg>
  );
};

// Lightning bolts
export const LightningBolt: React.FC<DecorationProps> = ({ 
  className = "", 
  size = 'md',
  color = 'accent',
  animated = true 
}) => {
  const sizeMap = { sm: 30, md: 40, lg: 50 };
  const colorMap = {
    primary: '#00d4ff',
    secondary: '#ffff00', 
    accent: '#ff6b35'
  };
  
  const boltSize = sizeMap[size];
  const boltColor = colorMap[color];
  
  return (
    <svg
      width={boltSize}
      height={boltSize}
      viewBox="0 0 40 40"
      className={`${className} ${animated ? 'animate-flash' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={`boltGlow-${color}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <path 
        d="M 20 2 L 12 18 L 18 18 L 16 38 L 28 15 L 22 15 L 20 2 Z" 
        fill={boltColor} 
        filter={`url(#boltGlow-${color})`}
        opacity="0.9"
      />
    </svg>
  );
};

// Floating particles
export const FloatingParticles: React.FC<{ 
  className?: string; 
  count?: number;
  colors?: string[];
}> = ({ 
  className = "", 
  count = 5,
  colors = ['#00d4ff', '#ffff00', '#ff6b35', '#00ffff', '#ff1744']
}) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    delay: Math.random() * 2
  }));
  
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      className={`absolute inset-0 pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {particles.map((particle) => (
        <circle
          key={particle.id}
          cx={particle.x}
          cy={particle.y}
          r={particle.size}
          fill={particle.color}
          opacity="0.6"
          className="animate-float"
          style={{ 
            animationDelay: `${particle.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </svg>
  );
};

// Geometric patterns
export const GeometricPattern: React.FC<DecorationProps> = ({ 
  className = "", 
  size = 'md',
  color = 'primary',
  animated = true 
}) => {
  const sizeMap = { sm: 60, md: 80, lg: 100 };
  const colorMap = {
    primary: '#00d4ff',
    secondary: '#ffff00', 
    accent: '#ff6b35'
  };
  
  const patternSize = sizeMap[size];
  const patternColor = colorMap[color];
  
  return (
    <svg
      width={patternSize}
      height={patternSize}
      viewBox="0 0 80 80"
      className={`${className} ${animated ? 'animate-spin-slow' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={`patternGlow-${color}`}>
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Hexagonal pattern */}
      <polygon 
        points="40,10 60,25 60,55 40,70 20,55 20,25" 
        fill="none" 
        stroke={patternColor} 
        strokeWidth="2" 
        opacity="0.6"
        filter={`url(#patternGlow-${color})`}
      />
      <polygon 
        points="40,20 50,30 50,50 40,60 30,50 30,30" 
        fill="none" 
        stroke={patternColor} 
        strokeWidth="1" 
        opacity="0.4"
      />
      <circle cx="40" cy="40" r="8" fill={patternColor} opacity="0.3" />
    </svg>
  );
};

// Anime-style speed lines
export const SpeedLines: React.FC<{ 
  className?: string;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  intensity?: 'low' | 'medium' | 'high';
}> = ({ 
  className = "",
  direction = 'diagonal',
  intensity = 'medium'
}) => {
  const lineCount = { low: 5, medium: 8, high: 12 }[intensity];
  const lines = Array.from({ length: lineCount }, (_, i) => i);
  
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      className={`absolute inset-0 pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {lines.map((line) => {
        const offset = (line / lineCount) * 100;
        const length = Math.random() * 30 + 20;
        
        if (direction === 'horizontal') {
          return (
            <line
              key={line}
              x1="0"
              y1={offset}
              x2={length}
              y2={offset}
              stroke="url(#speedGradient)"
              strokeWidth="1"
              opacity="0.7"
            />
          );
        } else if (direction === 'vertical') {
          return (
            <line
              key={line}
              x1={offset}
              y1="0"
              x2={offset}
              y2={length}
              stroke="url(#speedGradient)"
              strokeWidth="1"
              opacity="0.7"
            />
          );
        } else {
          return (
            <line
              key={line}
              x1="0"
              y1={offset}
              x2={length}
              y2={offset + length * 0.5}
              stroke="url(#speedGradient)"
              strokeWidth="1"
              opacity="0.7"
            />
          );
        }
      })}
    </svg>
  );
};

export default {
  Sparkles,
  EnergyOrb,
  LightningBolt,
  FloatingParticles,
  GeometricPattern,
  SpeedLines
};
