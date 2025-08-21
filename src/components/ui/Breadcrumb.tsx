/**
 * Reusable Breadcrumb Component
 * Modern, responsive breadcrumb navigation with accessibility support
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

// TypeScript interfaces
export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  showHomeIcon?: boolean;
  maxItems?: number;
  homeHref?: string;
  variant?: 'default' | 'admin';
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = '',
  separator = <ChevronRight size={16} />,
  showHomeIcon = true,
  maxItems = 5,
  homeHref = '/',
  variant = 'default'
}) => {
  // Handle empty or invalid items
  if (!items || items.length === 0) {
    return null;
  }

  // Truncate items if exceeding maxItems
  const displayItems = items.length > maxItems
    ? [
        items[0], // Always show first item (usually Home)
        { label: '...', href: '#', current: false },
        ...items.slice(-(maxItems - 2)) // Show last few items
      ]
    : items;

  // Admin variant (legacy support)
  if (variant === 'admin') {
    return (
      <nav className={`flex ${className}`} aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          {/* Home icon */}
          <li>
            <div>
              <Link
                href="/admin"
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </div>
          </li>

          {/* Breadcrumb items */}
          {items.map((item, index) => (
            <li key={index}>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                {item.current ? (
                  <span
                    className="ml-2 text-sm font-medium text-gray-500 truncate"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors truncate"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  // Modern default variant
  return (
    <nav
      aria-label="Breadcrumb"
      className={`breadcrumb-container ${className}`}
    >
      <ol className="breadcrumb-list">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';

          return (
            <li key={`${item.href}-${index}`} className="breadcrumb-item">
              {!isLast && !isEllipsis ? (
                <Link
                  href={item.href}
                  className="breadcrumb-link"
                  aria-current={item.current ? 'page' : undefined}
                >
                  {index === 0 && showHomeIcon && (
                    <Home size={16} className="breadcrumb-home-icon" />
                  )}
                  <span className="breadcrumb-text">{item.label}</span>
                </Link>
              ) : isEllipsis ? (
                <span className="breadcrumb-ellipsis" aria-hidden="true">
                  {item.label}
                </span>
              ) : (
                <span
                  className="breadcrumb-current"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  {separator}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <style jsx>{`
        .breadcrumb-container {
          margin-bottom: 1.5rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          border: 1px solid rgba(135, 206, 235, 0.2);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .breadcrumb-list {
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          gap: 0.5rem;
          margin: 0;
          padding: 0;
          list-style: none;
          font-size: 0.875rem;
          line-height: 1.5;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .breadcrumb-list::-webkit-scrollbar {
          display: none;
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: #87CEEB;
          text-decoration: none;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          transition: all 0.2s ease;
          font-weight: 500;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .breadcrumb-link:hover {
          background: rgba(135, 206, 235, 0.1);
          color: #5a9fd4;
          transform: translateY(-1px);
        }

        .breadcrumb-link:focus {
          outline: 2px solid #FFD700;
          outline-offset: 2px;
        }

        .breadcrumb-home-icon {
          color: #87CEEB;
          transition: color 0.2s ease;
        }

        .breadcrumb-link:hover .breadcrumb-home-icon {
          color: #5a9fd4;
        }

        .breadcrumb-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 150px;
          flex-shrink: 0;
        }

        .breadcrumb-current {
          color: #374151;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          background: rgba(255, 215, 0, 0.1);
          border-radius: 6px;
          border: 1px solid rgba(255, 215, 0, 0.3);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }

        .breadcrumb-ellipsis {
          color: #6b7280;
          font-weight: 500;
          padding: 0.25rem;
        }

        .breadcrumb-separator {
          color: #9ca3af;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        /* Mobile responsive design */
        @media (max-width: 768px) {
          .breadcrumb-container {
            padding: 0.5rem 0.75rem;
            margin-bottom: 1rem;
          }

          .breadcrumb-list {
            font-size: 0.8rem;
            gap: 0.25rem;
          }

          .breadcrumb-text {
            max-width: 100px;
          }

          .breadcrumb-current {
            max-width: 120px;
          }
        }

        /* Very small screens - horizontal scroll */
        @media (max-width: 480px) {
          .breadcrumb-container {
            overflow-x: auto;
            padding: 0.5rem;
          }

          .breadcrumb-list {
            flex-wrap: nowrap;
            min-width: max-content;
          }

          .breadcrumb-text,
          .breadcrumb-current {
            max-width: none;
            white-space: nowrap;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .breadcrumb-container {
            border: 2px solid #000;
            background: #fff;
          }

          .breadcrumb-link {
            color: #0066cc;
          }

          .breadcrumb-current {
            background: #ffff00;
            color: #000;
            border: 2px solid #000;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .breadcrumb-link {
            transition: none;
          }

          .breadcrumb-link:hover {
            transform: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Breadcrumb;
