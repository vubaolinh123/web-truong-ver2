/**
 * Category Table Component
 * Hiển thị danh sách categories dạng table
 */

'use client';

import React from 'react';
import { Category } from '@/lib/api/categories';
import { 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  Calendar,
  User,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onView: (category: Category) => void;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  loading?: boolean;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onEdit,
  onDelete,
  onView,
  onSort,
  sortField,
  sortDirection,
  loading = false
}) => {
  const handleSort = (field: string) => {
    if (!onSort) return;
    
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(field, newDirection);
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="text-gray-400" />;
    return sortDirection === 'asc' 
      ? <ArrowUp size={14} className="text-blue-500" />
      : <ArrowDown size={14} className="text-blue-500" />;
  };

  const SortableHeader: React.FC<{ field: string; children: React.ReactNode }> = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {getSortIcon(field)}
      </div>
    </th>
  );

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 border-t border-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Không có categories nào
        </h3>
        <p className="text-gray-500">
          Hãy tạo category đầu tiên để bắt đầu quản lý nội dung.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <SortableHeader field="name">Tên Category</SortableHeader>
              <SortableHeader field="status">Trạng thái</SortableHeader>
              <SortableHeader field="articleCount">Bài viết</SortableHeader>
              <SortableHeader field="sortOrder">Thứ tự</SortableHeader>
              <SortableHeader field="createdAt">Ngày tạo</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Người tạo
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                {/* Category Name & Info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full border border-gray-300"
                      style={{ backgroundColor: category.color || '#3B82F6' }}
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {category.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        /{category.slug}
                      </div>
                      {category.description && (
                        <div className="text-xs text-gray-400 mt-1 max-w-xs truncate">
                          {category.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`
                    inline-flex px-2 py-1 text-xs font-semibold rounded-full
                    ${category.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                    }
                  `}>
                    {category.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </td>

                {/* Article Count */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <FileText size={14} className="text-blue-500" />
                    <span className="text-sm font-medium text-gray-900">
                      {category.articleCount}
                    </span>
                  </div>
                </td>

                {/* Sort Order */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {category.sortOrder}
                  </span>
                </td>

                {/* Created Date */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(category.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(category.createdAt).toLocaleTimeString('vi-VN')}
                  </div>
                </td>

                {/* Created By */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-1">
                    <User size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {category.createdBy 
                        ? `${category.createdBy.firstName} ${category.createdBy.lastName}`
                        : 'Không rõ'
                      }
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onView(category)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                      title="Xem chi tiết"
                    >
                      <Eye size={16} />
                    </button>
                    
                    <button
                      onClick={() => onEdit(category)}
                      className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit size={16} />
                    </button>
                    
                    <button
                      onClick={() => onDelete(category)}
                      className={`p-1 rounded transition-colors ${
                        category.articleCount > 0
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-red-600 hover:text-red-900 hover:bg-red-50'
                      }`}
                      disabled={category.articleCount > 0}
                      title={
                        category.articleCount > 0 
                          ? 'Không thể xóa category có bài viết' 
                          : 'Xóa category'
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;
