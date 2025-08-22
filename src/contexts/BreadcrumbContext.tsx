/**
 * Breadcrumb Context
 * Manages breadcrumb state across the application
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbContextType {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
  addBreadcrumb: (item: BreadcrumbItem) => void;
  clearBreadcrumbs: () => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};

interface BreadcrumbProviderProps {
  children: React.ReactNode;
}

export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const pathname = usePathname();

  // Auto-generate breadcrumbs based on pathname
  useEffect(() => {
    const generateBreadcrumbs = () => {
      const pathSegments = pathname.split('/').filter(segment => segment !== '');
      const baseBreadcrumbs: BreadcrumbItem[] = [
        { label: 'Trang chủ', href: '/' }
      ];

      if (pathSegments.length === 0) {
        return baseBreadcrumbs;
      }

      const generatedBreadcrumbs = [...baseBreadcrumbs];

      // Handle specific routes
      if (pathSegments[0] === 'tin-tuc') {
        generatedBreadcrumbs.push({ label: 'Tin tức', href: '/tin-tuc' });
        
        if (pathSegments.length > 1) {
          if (pathSegments[1] === 'danh-muc' && pathSegments[2]) {
            // Category page: /tin-tuc/danh-muc/[slug]
            generatedBreadcrumbs.push({
              label: decodeURIComponent(pathSegments[2]).replace(/-/g, ' '),
              href: `/tin-tuc/danh-muc/${pathSegments[2]}`
            });
          } else {
            // Article page: /tin-tuc/[slug]
            // This will be overridden by the article page with actual title
            generatedBreadcrumbs.push({
              label: 'Bài viết',
              href: pathname,
              current: true
            });
          }
        }
      } else if (pathSegments[0] === 'lien-he') {
        generatedBreadcrumbs.push({ label: 'Liên hệ', href: '/lien-he', current: true });
      } else if (pathSegments[0] === 'admin') {
        generatedBreadcrumbs.push({ label: 'Quản trị', href: '/admin' });
        
        if (pathSegments.length > 1) {
          const adminSection = pathSegments[1];
          const sectionLabels: Record<string, string> = {
            'articles': 'Quản lý bài viết',
            'categories': 'Quản lý danh mục',
            'users': 'Quản lý người dùng',
            'settings': 'Cài đặt'
          };
          
          if (sectionLabels[adminSection]) {
            generatedBreadcrumbs.push({
              label: sectionLabels[adminSection],
              href: `/admin/${adminSection}`,
              current: pathSegments.length === 2
            });
          }
        }
      } else {
        // Generic breadcrumb generation
        let currentPath = '';
        pathSegments.forEach((segment, index) => {
          currentPath += `/${segment}`;
          const isLast = index === pathSegments.length - 1;
          
          generatedBreadcrumbs.push({
            label: decodeURIComponent(segment).replace(/-/g, ' '),
            href: currentPath,
            current: isLast
          });
        });
      }

      return generatedBreadcrumbs;
    };

    const newBreadcrumbs = generateBreadcrumbs();
    setBreadcrumbs(newBreadcrumbs);
  }, [pathname]);

  const addBreadcrumb = (item: BreadcrumbItem) => {
    setBreadcrumbs(prev => [...prev, item]);
  };

  const clearBreadcrumbs = () => {
    setBreadcrumbs([{ label: 'Trang chủ', href: '/' }]);
  };

  const value = {
    breadcrumbs,
    setBreadcrumbs,
    addBreadcrumb,
    clearBreadcrumbs
  };

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
