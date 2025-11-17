'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingActionButton from '../ui/FloatingActionButton';
import Breadcrumb from '../common/Breadcrumb';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { Toaster } from 'react-hot-toast';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { breadcrumbs } = useBreadcrumb();
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

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
      <main className="flex-grow">
        {recaptchaSiteKey ? (
          <GoogleReCaptchaProvider
            reCaptchaKey={recaptchaSiteKey}
            scriptProps={{ async: true, defer: true, appendTo: 'head' }}
          >
            {children}
          </GoogleReCaptchaProvider>
        ) : (
          children
        )}
      </main>
      <Footer />
      <FloatingActionButton />
      {/* Toast container for public pages */}
      <Toaster
        position="top-right"
        toastOptions={{
          // Default accessible styling
          duration: 4000,
          ariaProps: { role: 'status', 'aria-live': 'polite' },
          success: { duration: 4000 },
          error: { duration: Infinity },
        }}
      />
    </div>
  );
};

export default Layout;
