/**
 * Modern Breadcrumb Component
 * Responsive breadcrumb navigation with light blue/yellow theme
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
  maxItems?: number;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHomeIcon = true,
  maxItems = 5,
  className = ''
}) => {
  // Limit items if maxItems is specified
  const displayItems = maxItems && items.length > maxItems
    ? [
        items[0],
        { label: '...', href: '#', disabled: true, current: false },
        ...items.slice(-(maxItems - 2))
      ]
    : items;

  return (
    <nav 
      className={`bg-gradient-to-r from-sky-50 to-yellow-50 border-b border-sky-100 ${className}`}
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isFirst = index === 0;
            const isDisabled = 'disabled' in item && item.disabled;

            return (
              <li key={index} className="flex items-center">
                {/* Home icon for first item */}
                {isFirst && showHomeIcon && (
                  <Home 
                    size={16} 
                    className="text-sky-600 mr-1" 
                    aria-hidden="true"
                  />
                )}

                {/* Breadcrumb item */}
                {isDisabled ? (
                  <span className="text-slate-400 font-medium">
                    {item.label}
                  </span>
                ) : isLast || item.current ? (
                  <span 
                    className="text-slate-700 font-semibold bg-white/60 px-3 py-1 rounded-full border border-sky-200"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sky-700 hover:text-sky-800 font-medium hover:bg-white/40 px-3 py-1 rounded-full transition-all duration-200 border border-transparent hover:border-sky-200"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Separator */}
                {!isLast && (
                  <ChevronRight 
                    size={16} 
                    className="text-slate-400 mx-2" 
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
