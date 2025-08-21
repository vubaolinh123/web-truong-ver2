/**
 * Page Header Component
 * Modern page header for admin dashboard pages
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  backButton?: {
    href: string;
    label?: string;
  };
  actions?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon,
  breadcrumbs = [],
  backButton,
  actions,
  className = ''
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="flex mb-4" aria-label="Breadcrumb">
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
                {breadcrumbs.map((item, index) => (
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
          )}

          {/* Header Content */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4 min-w-0 flex-1">
              {/* Back Button */}
              {backButton && (
                <Link
                  href={backButton.href}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {backButton.label || 'Quay lại'}
                </Link>
              )}

              {/* Title Section */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center">
                  {icon && (
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <div className="text-white">
                          {icon}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="min-w-0">
                    <h1 className="text-2xl font-bold text-gray-900 truncate">
                      {title}
                    </h1>
                    {description && (
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            {actions && (
              <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
                {actions}
              </div>
            )}
          </div>
      </div>
    </div>
  );
};

export default PageHeader;
