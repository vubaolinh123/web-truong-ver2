'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import PageHeader from '@/components/admin/PageHeader';
import { GraduationCap } from 'lucide-react';

const RegistrationStats = dynamic(() => import('./components/RegistrationStats'), { ssr: false });
const RegistrationFilters = dynamic(() => import('./components/RegistrationFilters'), { ssr: false });
const RegistrationList = dynamic(() => import('./components/RegistrationList'), { ssr: false });

const AdminRegisterPage = () => {
  return (
    <AdminLayout>
      {/* Standard admin page header with gradient background and icon */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-200 shadow-sm mb-6">
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600">
          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-xl bg-yellow-300/90 text-blue-900 shadow-md">
                <GraduationCap size={22} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className="text-white text-xl sm:text-2xl font-semibold tracking-wide uppercase">Quản lý đăng ký sinh viên</h1>
                <p className="mt-1 text-yellow-200 text-sm sm:text-base">Theo dõi và xử lý các đăng ký tuyển sinh</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <RegistrationStats />
        <RegistrationFilters />
        <RegistrationList />
      </div>
    </AdminLayout>
  );
};

export default AdminRegisterPage;

