/**
 * Categories Data Grid - Redesigned
 * Matches articles data grid design exactly
 */

'use client';

import React from 'react';
import { Edit, Trash2, Eye, MoreHorizontal, CheckCircle, XCircle, Calendar, FileText } from 'lucide-react';
import { Category } from '@/lib/api/categories';

interface CategoriesDataGridProps {
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

const CategoriesDataGrid: React.FC<CategoriesDataGridProps> = ({
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
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(categories.map(cat => cat.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectCategory = (categoryId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedCategories, categoryId]);
    } else {
      onSelectionChange(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const isAllSelected = categories.length > 0 && selectedCategories.length === categories.length;
  const isPartiallySelected = selectedCategories.length > 0 && selectedCategories.length < categories.length;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slideInUp">
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center space-x-4">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-20 h-6 bg-gray-200 rounded"></div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
              <div className="w-24 h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center animate-slideInUp">
        <div className="max-w-md mx-auto">
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
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slideInUp">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Header */}
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isPartiallySelected;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Danh mục
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Bài viết
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ngày tạo
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr
                key={category.id}
                className={`
                  hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 
                  transition-all duration-200 group
                  ${selectedCategories.includes(category.id) ? 'bg-blue-50' : ''}
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Checkbox */}
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={(e) => handleSelectCategory(category.id, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                  />
                </td>

                {/* Category Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-3 ring-2 ring-white shadow-sm bg-blue-500" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </div>
                      {category.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {category.description}
                        </div>
                      )}
                      <div className="text-xs text-gray-400 mt-1">
                        ID: {category.id.slice(-8)}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
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
                </td>

                {/* Articles Count */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <FileText size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {category.articleCount || 0}
                    </span>
                    <span className="text-xs text-gray-500">bài viết</span>
                  </div>
                </td>

                {/* Created Date */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {category.createdAt ? new Date(category.createdAt).toLocaleDateString('vi-VN') : '-'}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
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
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesDataGrid;
