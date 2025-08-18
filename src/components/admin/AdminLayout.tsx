'use client';

import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import PrivateRoute from '@/components/auth/PrivateRoute';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <PrivateRoute requiredRoles={['admin']}>
      <div className="min-h-screen bg-gray-50">
        {/* Admin Header */}
        <AdminHeader
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <div className="flex">
          {/* Admin Sidebar */}
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <main className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
          } min-h-[calc(100vh-4rem)]`}>
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 top-16 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          />
        )}
      </div>
    </PrivateRoute>
  );
};

export default AdminLayout;
