/**
 * Article Basic Info Section Component
 * Handles title, slug, and excerpt fields with automatic slug generation
 */

'use client';

import React, { useEffect, useState } from 'react';
import { Type, Link, FileText } from 'lucide-react';

interface ArticleBasicInfoProps {
  title: string;
  slug: string;
  excerpt: string;
  onTitleChange: (title: string) => void;
  onSlugChange: (slug: string) => void;
  onExcerptChange: (excerpt: string) => void;
  errors?: {
    title?: string;
    slug?: string;
    excerpt?: string;
  };
  isEdit?: boolean;
}

const ArticleBasicInfo: React.FC<ArticleBasicInfoProps> = ({
  title,
  slug,
  excerpt,
  onTitleChange,
  onSlugChange,
  onExcerptChange,
  errors = {},
  isEdit = false
}) => {
  // Auto-generate slug from title
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      // Replace Vietnamese characters
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  // Auto-generate slug when title changes (always, except in edit mode with existing slug)
  useEffect(() => {
    if (title) {
      const newSlug = generateSlug(title);
      onSlugChange(newSlug);
    } else {
      onSlugChange('');
    }
  }, [title, onSlugChange]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FileText size={20} className="text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Thông tin cơ bản</h2>
      </div>

      <div className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Type size={16} className="text-blue-500" />
            <span>Tiêu đề bài viết</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Nhập tiêu đề bài viết..."
            className={`
              w-full px-4 py-3 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200
              ${errors.title 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Slug Field - Read Only */}
        <div>
          <label htmlFor="slug" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Link size={16} className="text-green-500" />
            <span>Đường dẫn URL (Tự động tạo)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="slug"
              value={slug}
              readOnly
              placeholder="duong-dan-url-bai-viet"
              className={`
                w-full px-4 py-3 border rounded-lg bg-gray-50 cursor-not-allowed
                ${errors.slug
                  ? 'border-red-300'
                  : 'border-gray-300'
                }
              `}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                Tự động
              </span>
            </div>
          </div>
          {errors.slug && (
            <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            URL sẽ là: <span className="font-mono text-blue-600">/bai-viet/{slug || 'duong-dan-url'}</span>
          </p>
          <p className="mt-1 text-xs text-blue-600">
            💡 Đường dẫn URL được tạo tự động từ tiêu đề bài viết
          </p>
        </div>

        {/* Excerpt Field */}
        <div>
          <label htmlFor="excerpt" className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <FileText size={16} className="text-purple-500" />
            <span>Tóm tắt bài viết</span>
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => onExcerptChange(e.target.value)}
            placeholder="Nhập tóm tắt ngắn gọn về nội dung bài viết..."
            rows={4}
            className={`
              w-full px-4 py-3 border rounded-lg resize-none
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200
              ${errors.excerpt 
                ? 'border-red-300 bg-red-50' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
          />
          {errors.excerpt && (
            <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
          )}
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>Tóm tắt sẽ hiển thị trong danh sách bài viết</span>
            <span>{excerpt.length}/300</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleBasicInfo;
