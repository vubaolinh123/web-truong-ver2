/**
 * Categories Card Grid - Redesigned
 * Matches articles card grid design exactly
 */

'use client';

import React from 'react';
import { Edit, Trash2, Eye, MoreHorizontal, CheckCircle, XCircle, Calendar, FileText } from 'lucide-react';
import { Category } from '@/lib/api/categories';

interface CategoriesCardGridProps {
  categories: Category[];
  loading: boolean;
  selectedCategories: string[];
  onSelectionChange: (categoryIds: string[]) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

const CategoriesCardGrid: React.FC<CategoriesCardGridProps> = ({
  categories,
  loading,
  selectedCategories,
  onSelectionChange,
  onEdit,
  onDelete,
  pagination,
  onPageChange,
  onLimitChange
}) => {
  const handleSelectCategory = (categoryId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedCategories, categoryId]);
    } else {
      onSelectionChange(selectedCategories.filter(id => id !== categoryId));
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye size={24} className="text-white" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Không có danh mục nào
        </h3>
        <p className="text-gray-600 mb-6">
          Chưa có danh mục nào được tạo. Hãy tạo danh mục đầu tiên để bắt đầu.
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium">
          Tạo danh mục đầu tiên
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`
              bg-white rounded-2xl shadow-lg border border-gray-100 p-6
              hover:shadow-xl transition-all duration-300 transform hover:scale-105
              animate-slideInUp group relative overflow-hidden
              ${selectedCategories.includes(category.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Selection Checkbox */}
            <div className="absolute top-4 left-4">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={(e) => handleSelectCategory(category.id, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* Category Indicator */}
            <div className="absolute top-4 right-4">
              <div className="w-6 h-6 rounded-full ring-2 ring-white shadow-sm bg-blue-500" />
            </div>

            {/* Category Content */}
            <div className="mt-8 space-y-4">
              {/* Name and Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {category.description}
                  </p>
                )}
              </div>

              {/* Status Badge */}
              <div className="flex justify-between items-center">
                <span
                  className={`
                    inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                    ${category.status === 'active'
                      ? 'bg-green-100 text-green-800 ring-1 ring-green-200'
                      : 'bg-red-100 text-red-800 ring-1 ring-red-200'
                    }
                  `}
                >
                  {category.status === 'active' ? (
                    <>
                      <CheckCircle size={12} className="mr-1" />
                      Hoạt động
                    </>
                  ) : (
                    <>
                      <XCircle size={12} className="mr-1" />
                      Không hoạt động
                    </>
                  )}
                </span>

                <div className="text-xs text-gray-500">
                  ID: {category.id.slice(-8)}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <FileText size={14} className="text-gray-400" />
                    <span className="text-lg font-semibold text-gray-900">
                      {category.articleCount || 0}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Bài viết</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {category.createdAt ? new Date(category.createdAt).toLocaleDateString('vi-VN', { 
                        day: '2-digit', 
                        month: '2-digit' 
                      }) : '-'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Ngày tạo</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="
                      p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg
                      transition-all duration-200 group-hover:scale-110
                    "
                    title="Chỉnh sửa"
                  >
                    <Edit size={16} />
                  </button>
                  
                  <button
                    onClick={() => onDelete(category)}
                    className="
                      p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg
                      transition-all duration-200 group-hover:scale-110
                    "
                    title="Xóa"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <button
                  className="
                    p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg
                    transition-all duration-200 group-hover:scale-110
                  "
                  title="Thêm tùy chọn"
                >
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Hiển thị {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} 
              trong tổng số {pagination.total} danh mục
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={pagination.limit}
                onChange={(e) => onLimitChange?.(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                  let page;
                  if (pagination.totalPages <= 5) {
                    page = i + 1;
                  } else if (pagination.page <= 3) {
                    page = i + 1;
                  } else if (pagination.page >= pagination.totalPages - 2) {
                    page = pagination.totalPages - 4 + i;
                  } else {
                    page = pagination.page - 2 + i;
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => onPageChange?.(page)}
                      className={`
                        px-3 py-1 text-sm rounded-lg transition-colors
                        ${page === pagination.page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-200'
                        }
                      `}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesCardGrid;
