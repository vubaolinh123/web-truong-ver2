/**
 * Private Route Component
 * Bảo vệ routes yêu cầu authentication
 */

'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Shield, AlertTriangle } from 'lucide-react';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  fallbackPath?: string;
  showLoading?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  requiredRoles = ['admin'],
  fallbackPath = '/admin/login',
  showLoading = true
}) => {
  const { isAuthenticated, isLoading, user, hasRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log('🛡️ PrivateRoute check:', {
      pathname,
      isLoading,
      isAuthenticated,
      user: user?.username,
      userRole: user?.role,
      requiredRoles
    });

    // Don't redirect if still loading
    if (isLoading) {
      console.log('⏳ Still loading, waiting...');
      return;
    }

    // Store intended route for redirect after login
    if (!isAuthenticated) {
      console.log('❌ Not authenticated, redirecting to login');
      const intendedRoute = pathname !== '/admin/login' ? pathname : '/admin';
      sessionStorage.setItem('intendedRoute', intendedRoute);
      router.replace(fallbackPath);
      return;
    }

    // Check role permissions
    if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
      console.log('🚫 Insufficient role permissions, redirecting to unauthorized');
      router.replace('/admin/unauthorized');
      return;
    }

    console.log('✅ PrivateRoute check passed');
  }, [isAuthenticated, isLoading, hasRole, requiredRoles, router, pathname, fallbackPath, user]);

  // Show loading state
  if (isLoading) {
    if (!showLoading) return null;
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Đang kiểm tra quyền truy cập...
          </h2>
          <p className="text-gray-600">
            Vui lòng chờ trong giây lát
          </p>
        </div>
      </div>
    );
  }

  // Show unauthorized if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <Shield size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Yêu cầu đăng nhập
          </h2>
          <p className="text-gray-600 mb-6">
            Bạn cần đăng nhập để truy cập trang này.
          </p>
          <button
            onClick={() => router.push(fallbackPath)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Đến trang đăng nhập
          </button>
        </div>
      </div>
    );
  }

  // Show insufficient permissions
  if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertTriangle size={48} className="text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Không đủ quyền truy cập
          </h2>
          <p className="text-gray-600 mb-4">
            Bạn không có quyền truy cập trang này.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <strong>Vai trò hiện tại:</strong> {user?.role || 'Không xác định'}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Vai trò yêu cầu:</strong> {requiredRoles.join(', ')}
            </p>
          </div>
          <div className="flex space-x-3 justify-center">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Quay lại
            </button>
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render children if all checks pass
  return <>{children}</>;
};

export default PrivateRoute;
