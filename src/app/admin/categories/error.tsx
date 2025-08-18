/**
 * Categories Error Page
 * Error boundary cho trang categories
 */

'use client';

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface CategoriesErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const CategoriesError: React.FC<CategoriesErrorProps> = ({ error, reset }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={32} className="text-red-600" />
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Có lỗi xảy ra
        </h1>
        
        <p className="text-gray-600 mb-6">
          Không thể tải trang quản lý categories. Vui lòng thử lại hoặc liên hệ quản trị viên.
        </p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-sm font-medium text-red-800 mb-2">Chi tiết lỗi:</h3>
            <p className="text-xs text-red-700 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <RefreshCw size={16} />
            <span>Thử lại</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/admin'}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            <Home size={16} />
            <span>Về trang chủ Admin</span>
          </button>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 mt-6">
          Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ bộ phận kỹ thuật.
        </p>
      </div>
    </div>
  );
};

export default CategoriesError;
