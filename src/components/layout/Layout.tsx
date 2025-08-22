'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingActionButton from '../ui/FloatingActionButton';
import MobileBottomNav from '../ui/MobileBottomNav';
import Breadcrumb from '../common/Breadcrumb';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { breadcrumbs } = useBreadcrumb();

  // Only show breadcrumbs if we're not on the home page
  const showBreadcrumbs = breadcrumbs.length > 1;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {showBreadcrumbs && (
        <Breadcrumb
          items={breadcrumbs}
          showHomeIcon={true}
          maxItems={5}
        />
      )}
      <main className="flex-grow pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <FloatingActionButton />
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
