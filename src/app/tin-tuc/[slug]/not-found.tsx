/**
 * Article Not Found Page
 * Trang 404 cho bài viết không tồn tại
 */

import Link from 'next/link';
import { ArrowLeft, Search, Home, FileText } from 'lucide-react';
import Layout from '@/components/layout/Layout';

export default function ArticleNotFound() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          {/* 404 Illustration */}
          <div className="relative">
            <div className="text-9xl font-bold text-blue-100 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FileText size={80} className="text-blue-300" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Bài viết không tồn tại
            </h1>
            <p className="text-lg text-gray-600">
              Bài viết bạn đang tìm kiếm có thể đã bị xóa, di chuyển hoặc URL không chính xác.
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Bạn có thể thử:
            </h2>
            
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <Search size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Tìm kiếm bài viết</p>
                  <p className="text-sm text-gray-600">Sử dụng từ khóa để tìm bài viết tương tự</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <FileText size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Xem tất cả tin tức</p>
                  <p className="text-sm text-gray-600">Duyệt qua danh sách bài viết mới nhất</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Home size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Về trang chủ</p>
                  <p className="text-sm text-gray-600">Quay lại trang chủ của website</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/tin-tuc"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <FileText size={20} className="mr-2" />
                Xem tất cả tin tức
              </Link>
              
              <Link
                href="/"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Home size={20} className="mr-2" />
                Về trang chủ
              </Link>
            </div>

            <Link
              href="/tin-tuc"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              Quay lại danh sách tin tức
            </Link>
          </div>

          {/* Contact Support */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Nếu bạn cho rằng đây là lỗi, vui lòng{' '}
              <Link 
                href="/lien-he" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                liên hệ với chúng tôi
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
