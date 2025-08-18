/**
 * Categories Layout
 * Layout wrapper cho trang categories admin
 */

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

interface CategoriesLayoutProps {
  children: React.ReactNode;
}

const CategoriesLayout: React.FC<CategoriesLayoutProps> = ({ children }) => {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
};

export default CategoriesLayout;
