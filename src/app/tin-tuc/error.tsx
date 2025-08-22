'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-red-50/50 p-4">
      <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Đã có lỗi xảy ra</h2>
      <p className="text-gray-600 max-w-md mb-8">
        {error.message || 'Không thể tải dữ liệu cho trang này. Vui lòng kiểm tra lại kết nối của bạn và thử lại.'}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Thử lại
      </button>
    </div>
  );
}

