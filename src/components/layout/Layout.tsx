import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingActionButton from '../ui/FloatingActionButton';
import MobileBottomNav from '../ui/MobileBottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
