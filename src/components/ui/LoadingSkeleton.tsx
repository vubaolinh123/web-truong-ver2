/**
 * Loading Skeleton Component
 * Skeleton UI cho loading states
 */

'use client';

import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'article' | 'card' | 'text' | 'avatar' | 'image' | 'grid';
  lines?: number;
  width?: string;
  height?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  variant = 'default',
  lines = 3,
  width = 'w-full',
  height = 'h-4'
}) => {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';

  if (variant === 'article') {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Hero Image */}
        <div className={`${baseClasses} h-64 w-full`} />
        
        {/* Title */}
        <div className={`${baseClasses} h-8 w-3/4`} />
        
        {/* Meta */}
        <div className="flex space-x-4">
          <div className={`${baseClasses} h-4 w-24`} />
          <div className={`${baseClasses} h-4 w-32`} />
          <div className={`${baseClasses} h-4 w-20`} />
        </div>
        
        {/* Content */}
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`${baseClasses} h-4 ${i === 4 ? 'w-2/3' : 'w-full'}`} />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`space-y-3 ${className}`}>
        {/* Image */}
        <div className={`${baseClasses} h-48 w-full`} />
        
        {/* Title */}
        <div className={`${baseClasses} h-6 w-full`} />
        <div className={`${baseClasses} h-6 w-3/4`} />
        
        {/* Description */}
        <div className="space-y-2">
          <div className={`${baseClasses} h-4 w-full`} />
          <div className={`${baseClasses} h-4 w-5/6`} />
          <div className={`${baseClasses} h-4 w-2/3`} />
        </div>
        
        {/* Meta */}
        <div className="flex justify-between">
          <div className={`${baseClasses} h-3 w-20`} />
          <div className={`${baseClasses} h-3 w-16`} />
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className={`${baseClasses} h-48 w-full`} />
            <div className="p-4 space-y-3">
              <div className={`${baseClasses} h-6 w-full`} />
              <div className={`${baseClasses} h-6 w-3/4`} />
              <div className="space-y-2">
                <div className={`${baseClasses} h-4 w-full`} />
                <div className={`${baseClasses} h-4 w-2/3`} />
              </div>
              <div className="flex justify-between">
                <div className={`${baseClasses} h-3 w-20`} />
                <div className={`${baseClasses} h-3 w-16`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {[...Array(lines)].map((_, i) => (
          <div 
            key={i} 
            className={`${baseClasses} ${height} ${
              i === lines - 1 ? 'w-2/3' : width
            }`} 
          />
        ))}
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div className={`${baseClasses} rounded-full w-10 h-10 ${className}`} />
    );
  }

  if (variant === 'image') {
    return (
      <div className={`${baseClasses} ${width} ${height} ${className}`} />
    );
  }

  // Default variant
  return (
    <div className={`${baseClasses} ${width} ${height} ${className}`} />
  );
};

export default LoadingSkeleton;
