/**
 * Category Card Component
 * Hiển thị thông tin category dạng card
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
  MoreVertical
} from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onView: (category: Category) => void;
  loading?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
  onView,
  loading = false
}) => {
  const statusColor = category.status === 'active' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800';

  const categoryColor = category.color || '#3B82F6';

  return (
    <div className={`
      bg-white rounded-lg shadow-md border border-gray-200 p-6 
      hover:shadow-lg transition-all duration-200 
      ${loading ? 'opacity-50 pointer-events-none' : ''}
    `}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Category Color Indicator */}
          <div 
            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: categoryColor }}
          />
          
          {/* Category Name */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500">
              /{category.slug}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`
          px-2 py-1 text-xs font-medium rounded-full
          ${statusColor}
        `}>
          {category.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      </div>

      {/* Description */}
      {category.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {category.description}
        </p>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <FileText size={16} className="text-blue-500" />
          <div>
            <p className="text-xs text-gray-500">Bài viết</p>
            <p className="text-sm font-semibold text-gray-900">
              {category.articleCount}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-green-500" />
          <div>
            <p className="text-xs text-gray-500">Thứ tự</p>
            <p className="text-sm font-semibold text-gray-900">
              {category.sortOrder}
            </p>
          </div>
        </div>
      </div>

      {/* Meta Information */}
      <div className="border-t border-gray-100 pt-4 mb-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <User size={12} />
            <span>
              {category.createdBy 
                ? `${category.createdBy.firstName} ${category.createdBy.lastName}`
                : 'Không rõ'
              }
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={12} />
            <span>
              {new Date(category.createdAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onView(category)}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
          >
            <Eye size={14} />
            <span>Xem</span>
          </button>
          
          <button
            onClick={() => onEdit(category)}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-yellow-600 bg-yellow-50 rounded-md hover:bg-yellow-100 transition-colors"
          >
            <Edit size={14} />
            <span>Sửa</span>
          </button>
        </div>

        <button
          onClick={() => onDelete(category)}
          className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
          disabled={category.articleCount > 0}
          title={category.articleCount > 0 ? 'Không thể xóa category có bài viết' : 'Xóa category'}
        >
          <Trash2 size={14} />
          <span>Xóa</span>
        </button>
      </div>

      {/* Warning for categories with articles */}
      {category.articleCount > 0 && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-700">
            ⚠️ Category này có {category.articleCount} bài viết. Cần di chuyển bài viết trước khi xóa.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
