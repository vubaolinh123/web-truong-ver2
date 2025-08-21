/**
 * Unauthorized Access Page
 * Trang hiển thị khi user không có quyền truy cập
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, ArrowLeft, Home, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const UnauthorizedPage: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/admin/login');
    }
  };

  const getUserRole = () => {
    if (!user) return 'Không xác định';
    switch (user.role) {
      case 'admin':
        return 'Quản Trị Viên';
      case 'faculty':
        return 'Giảng Viên';
      case 'student':
        return 'Sinh Viên';
      default:
        return 'Người Dùng';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={40} className="text-yellow-600" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Không Đủ Quyền Truy Cập
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Bạn không có quyền truy cập vào trang quản trị này. 
          Vui lòng liên hệ quản trị viên để được cấp quyền.
        </p>

        {/* User Info */}
        {user && (
          <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Thông tin tài khoản hiện tại:
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Tên:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Vai trò:</strong> {getUserRole()}</p>
            </div>
          </div>
        )}

        {/* Required Role Info */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Yêu cầu quyền truy cập:
          </h3>
          <p className="text-sm text-blue-700">
            Cần có vai trò <strong>Quản Trị Viên</strong> để truy cập trang này.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Quay Lại Trang Trước</span>
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <Home size={18} />
            <span>Về Trang Chủ</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
          >
            <LogOut size={18} />
            <span>Đăng Xuất</span>
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Cần hỗ trợ?</p>
          <p>
            Liên hệ: <a href="mailto:admin@vcic.edu.vn" className="text-blue-600 hover:underline">
              admin@vcic.edu.vn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
