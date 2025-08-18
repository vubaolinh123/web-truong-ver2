/**
 * Articles Layout
 * Layout wrapper cho trang articles admin
 */

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

interface ArticlesLayoutProps {
  children: React.ReactNode;
}

const ArticlesLayout: React.FC<ArticlesLayoutProps> = ({ children }) => {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
};

export default ArticlesLayout;
