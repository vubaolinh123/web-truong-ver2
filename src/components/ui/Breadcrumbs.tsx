/**
 * Breadcrumbs Component
 * Navigation breadcrumbs cho better UX
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-white/20">
        <ol className="flex items-center space-x-2">
          {/* Home Link */}
          <li>
            <Link
              href="/"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50"
              aria-label="Trang chủ"
            >
              <Home size={16} />
            </Link>
          </li>

          {/* Breadcrumb Items */}
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight size={16} className="text-gray-400 mx-2" />

              {item.href && !item.current ? (
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded-md hover:bg-blue-50"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`font-semibold px-2 py-1 rounded-md ${
                    item.current
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-900'
                  }`}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
