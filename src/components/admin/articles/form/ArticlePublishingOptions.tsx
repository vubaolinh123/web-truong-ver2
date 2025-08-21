/**
 * Article Publishing Options Component
 * Handles status, featured flag, and publish date settings
 */

'use client';

import React from 'react';
import { Settings, Calendar, Star, Globe } from 'lucide-react';

interface ArticlePublishingOptionsProps {
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  publishedAt: string;
  onStatusChange: (status: 'draft' | 'published' | 'archived') => void;
  onFeaturedChange: (featured: boolean) => void;
  onPublishedAtChange: (publishedAt: string) => void;
  errors?: {
    status?: string;
    publishedAt?: string;
  };
}

const ArticlePublishingOptions: React.FC<ArticlePublishingOptionsProps> = ({
  status,
  featured,
  publishedAt,
  onStatusChange,
  onFeaturedChange,
  onPublishedAtChange,
  errors = {}
}) => {
  const statusOptions = [
    {
      value: 'draft',
      label: 'Nháp',
      description: 'Chưa xuất bản',
      color: 'yellow',
      icon: '📝'
    },
    {
      value: 'published',
      label: 'Công khai',
      description: 'Đã xuất bản',
      color: 'green',
      icon: '✅'
    },
    {
      value: 'archived',
      label: 'Lưu trữ',
      description: 'Đã ẩn',
      color: 'gray',
      icon: '📦'
    }
  ];

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const isoDate = new Date(dateValue).toISOString();
      onPublishedAtChange(isoDate);
    } else {
      onPublishedAtChange('');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Settings size={20} className="text-orange-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Tùy chọn xuất bản</h2>
      </div>

      <div className="space-y-6">
        {/* Status Selection */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
            <Globe size={16} className="text-blue-500" />
            <span>Trạng thái bài viết</span>
            <span className="text-red-500">*</span>
          </label>
          
          <div className="grid grid-cols-3 gap-2">
            {statusOptions.map((option) => (
              <label
                key={option.value}
                className={`
                  relative flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all duration-200
                  ${status === option.value
                    ? option.color === 'yellow'
                      ? 'border-yellow-300 bg-yellow-50 ring-2 ring-yellow-200'
                      : option.color === 'green'
                      ? 'border-green-300 bg-green-50 ring-2 ring-green-200'
                      : 'border-gray-300 bg-gray-50 ring-2 ring-gray-200'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={status === option.value}
                  onChange={(e) => onStatusChange(e.target.value as any)}
                  className="sr-only"
                />

                <div className="flex flex-col items-center space-y-1 text-center">
                  <span className="text-lg">{option.icon}</span>
                  <div className="text-sm font-medium text-gray-900">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </div>

                {status === option.value && (
                  <div className="absolute top-1 right-1">
                    <div className={`w-2 h-2 rounded-full ${
                      option.color === 'yellow' ? 'bg-yellow-500' :
                      option.color === 'green' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                  </div>
                )}
              </label>
            ))}
          </div>
          
          {errors.status && (
            <p className="mt-2 text-sm text-red-600">{errors.status}</p>
          )}
        </div>

        {/* Featured Toggle */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
            <Star size={16} className="text-yellow-500" />
            <span>Bài viết nổi bật</span>
          </label>
          
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => onFeaturedChange(!featured)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                ${featured ? 'bg-yellow-500' : 'bg-gray-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                  ${featured ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
            
            <div className="flex-1">
              <div className="text-sm text-gray-900">
                {featured ? 'Bài viết nổi bật' : 'Bài viết thường'}
              </div>
              <div className="text-xs text-gray-500">
                {featured 
                  ? 'Bài viết sẽ được hiển thị ở vị trí nổi bật' 
                  : 'Bài viết sẽ hiển thị theo thứ tự thông thường'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Publish Date */}
        <div>
          <label htmlFor="publishedAt" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Calendar size={16} className="text-purple-500" />
            <span>Thời gian xuất bản</span>
          </label>
          
          <input
            type="datetime-local"
            id="publishedAt"
            value={formatDateForInput(publishedAt)}
            onChange={handleDateChange}
            className={`
              w-full px-4 py-3 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200
              ${errors.publishedAt 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
          />
          
          {errors.publishedAt && (
            <p className="mt-1 text-sm text-red-600">{errors.publishedAt}</p>
          )}
          
          <p className="mt-1 text-xs text-gray-500">
            {status === 'published' 
              ? 'Thời gian bài viết được xuất bản công khai'
              : 'Thời gian sẽ được sử dụng khi xuất bản bài viết'
            }
          </p>
        </div>

        {/* Publishing Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Tóm tắt xuất bản:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Trạng thái: <span className="font-medium">{statusOptions.find(opt => opt.value === status)?.label}</span></li>
            <li>• Nổi bật: <span className="font-medium">{featured ? 'Có' : 'Không'}</span></li>
            {publishedAt && (
              <li>• Thời gian: <span className="font-medium">{new Date(publishedAt).toLocaleString('vi-VN')}</span></li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArticlePublishingOptions;
