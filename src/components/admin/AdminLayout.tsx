'use client';

import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import PrivateRoute from '@/components/auth/PrivateRoute';
import { Toaster } from 'react-hot-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <PrivateRoute requiredRoles={['admin']}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Admin Header */}
        <AdminHeader
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <div className="flex pt-16">
          {/* Admin Sidebar */}
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <main className={`flex-1 transition-all duration-300 ease-in-out ${
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
            className="fixed inset-0 top-16 modal-overlay z-20 lg:hidden transition-all duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Toast Container */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </PrivateRoute>
  );
};

export default AdminLayout;
