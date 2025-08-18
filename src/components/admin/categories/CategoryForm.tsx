/**
 * Category Form Component
 * Form tạo và chỉnh sửa category
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Category } from '@/lib/api/categories';
import { X, Save, Loader2, Palette, Hash, Type, AlignLeft, ToggleLeft, ToggleRight } from 'lucide-react';

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  title?: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
  status: 'active' | 'inactive';
  color: string;
  icon: string;
  sortOrder: number;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSubmit,
  onCancel,
  loading = false,
  title
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    status: 'active',
    color: '#3B82F6',
    icon: '',
    sortOrder: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when editing
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        status: category.status || 'active',
        color: category.color || '#3B82F6',
        icon: category.icon || '',
        sortOrder: category.sortOrder || 0,
      });
    }
  }, [category]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên category là bắt buộc';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Tên category phải có ít nhất 2 ký tự';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Tên category không được vượt quá 100 ký tự';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Mô tả không được vượt quá 500 ký tự';
    }

    if (formData.sortOrder < 0) {
      newErrors.sortOrder = 'Thứ tự phải là số không âm';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (field: keyof CategoryFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const predefinedColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {title || (category ? 'Chỉnh sửa Category' : 'Tạo Category mới')}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category Name */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Type size={16} />
              <span>Tên Category *</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nhập tên category..."
              disabled={loading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <AlignLeft size={16} />
              <span>Mô tả</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nhập mô tả category..."
              disabled={loading}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {formData.description.length}/500 ký tự
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              {formData.status === 'active' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
              <span>Trạng thái</span>
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="active"
                  checked={formData.status === 'active'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                  disabled={loading}
                />
                <span className="text-sm text-gray-700">Hoạt động</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="inactive"
                  checked={formData.status === 'inactive'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                  disabled={loading}
                />
                <span className="text-sm text-gray-700">Không hoạt động</span>
              </label>
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Palette size={16} />
              <span>Màu sắc</span>
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                disabled={loading}
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#3B82F6"
                disabled={loading}
              />
            </div>
            
            {/* Predefined Colors */}
            <div className="mt-2 flex flex-wrap gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleInputChange('color', color)}
                  className={`w-8 h-8 rounded border-2 transition-all ${
                    formData.color === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  disabled={loading}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Icon */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Hash size={16} />
              <span>Icon (tùy chọn)</span>
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => handleInputChange('icon', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên icon hoặc emoji..."
              disabled={loading}
            />
            <p className="mt-1 text-xs text-gray-500">
              Ví dụ: 📚, book, graduation-cap
            </p>
          </div>

          {/* Sort Order */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Hash size={16} />
              <span>Thứ tự hiển thị</span>
            </label>
            <input
              type="number"
              value={formData.sortOrder}
              onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 0)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.sortOrder ? 'border-red-500' : 'border-gray-300'
              }`}
              min="0"
              disabled={loading}
            />
            {errors.sortOrder && (
              <p className="mt-1 text-sm text-red-600">{errors.sortOrder}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Số nhỏ hơn sẽ hiển thị trước
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              <span>{loading ? 'Đang lưu...' : 'Lưu'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
