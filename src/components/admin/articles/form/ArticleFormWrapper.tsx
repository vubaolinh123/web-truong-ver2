/**
 * Article Form Wrapper Component
 * Main form component that orchestrates all sub-components
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Eye, AlertCircle } from 'lucide-react';
import { Article, ArticleFormData } from '@/types/articles';

// Form components
import ArticleBasicInfo from './ArticleBasicInfo';
import ArticleContentEditor from './ArticleContentEditor';
import ArticleCategoryTags from './ArticleCategoryTags';
import ArticleFeaturedImage from './ArticleFeaturedImage';
import ArticlePublishingOptions from './ArticlePublishingOptions';

interface ArticleFormWrapperProps {
  mode: 'create' | 'edit';
  article?: Article;
  onSubmit: (data: ArticleFormData) => Promise<void>;
  loading?: boolean;
}

interface FormErrors {
  title?: string;
  slug?: string;
  content?: string;
  categoryIds?: string;
  excerpt?: string;
  tags?: string;
  status?: string;
  publishedAt?: string;
  featuredImage?: string;
  [key: string]: string | undefined;
}

const ArticleFormWrapper: React.FC<ArticleFormWrapperProps> = ({
  mode,
  article,
  onSubmit,
  loading = false
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    categoryIds: [],
    tags: [],
    featuredImage: null,
    status: 'draft',
    featured: false,
    publishedAt: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});


  // Initialize form data for edit mode
  useEffect(() => {
    if (mode === 'edit' && article) {
      // Extract category IDs from the API response
      let categoryIds: string[] = [];

      if (Array.isArray(article.categories)) {
        // Handle categories array from API response
        categoryIds = article.categories.map(cat => {
          // Categories can be objects with id field
          if (typeof cat === 'object') {
            return (cat as any)._id || cat.id || '';
          }
          return cat || '';
        }).filter(id => id); // Remove empty strings
      } else if (article.category) {
        // Handle single category (legacy support)
        if (typeof article.category === 'object') {
          categoryIds = [(article.category as any)._id || article.category.id || ''];
        } else {
          categoryIds = [article.category];
        }
      }

      setFormData({
        title: article.title || '',
        slug: article.slug || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        categoryIds: categoryIds,
        tags: article.tags || [],
        featuredImage: (typeof article.featuredImage === 'object' && article.featuredImage?.url) ? article.featuredImage.url : (typeof article.featuredImage === 'string' ? article.featuredImage : null),
        status: article.status || 'draft',
        featured: article.featured || false,
        publishedAt: article.publishedAt || ''
      });
    }
  }, [mode, article]);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề bài viết là bắt buộc';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Đường dẫn URL là bắt buộc';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Đường dẫn URL chỉ được chứa chữ thường, số và dấu gạch ngang';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Nội dung bài viết là bắt buộc';
    }

    if (!formData.categoryIds || formData.categoryIds.length === 0) {
      newErrors.categoryIds = 'Vui lòng chọn ít nhất một danh mục';

      // Debug: Log category validation failure
      console.log('❌ Category validation failed:', {
        categoryIds: formData.categoryIds,
        categoryIdsType: typeof formData.categoryIds,
        categoryIdsLength: formData.categoryIds?.length,
        isArray: Array.isArray(formData.categoryIds)
      });
    } else {
      // Debug: Log successful category validation
      console.log('✅ Category validation passed:', {
        categoryIds: formData.categoryIds,
        categoryCount: formData.categoryIds.length
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Handle form field changes - memoized to prevent infinite re-renders
  const updateFormData = useCallback((field: keyof ArticleFormData, value: any) => {
    setFormData(prev => {
      // Only update if value actually changed
      if (prev[field] !== value) {
        const newData = { ...prev, [field]: value };

        // Debug: Log category changes specifically
        if (field === 'categoryIds') {
          console.log('🔄 Form data categoryIds updated:', {
            field,
            previousValue: prev[field],
            newValue: value,
            valueType: typeof value,
            isArray: Array.isArray(value)
          });
        }

        return newData;
      }
      return prev;
    });


    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  // Handle back navigation with unsaved changes warning
  const handleBack = () => {
    router.push("/admin/articles/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <div className="w-[90%] max-w-[92%] mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 md:mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3 md:space-x-4">
            <button
              onClick={handleBack}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {mode === 'create' ? 'Tạo bài viết mới' : 'Chỉnh sửa bài viết'}
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                {mode === 'create'
                  ? 'Tạo và xuất bản nội dung mới cho website'
                  : 'Cập nhật thông tin và nội dung bài viết'
                }
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Preview Button */}
            <button
              type="button"
              className="flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm md:text-base"
            >
              <Eye size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="hidden sm:inline">Xem trước</span>
            </button>

            {/* Save Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center space-x-1 md:space-x-2 px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm md:text-base"
            >
              <Save size={16} className="md:w-[18px] md:h-[18px]" />
              <span>{loading ? 'Đang lưu...' : 'Lưu bài viết'}</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
            {/* Main Content Column */}
            <div className="xl:col-span-2 space-y-6 md:space-y-8">
              {/* Basic Info */}
              <ArticleBasicInfo
                title={formData.title}
                slug={formData.slug}
                excerpt={formData.excerpt}
                onTitleChange={(title) => updateFormData('title', title)}
                onSlugChange={(slug) => updateFormData('slug', slug)}
                onExcerptChange={(excerpt) => updateFormData('excerpt', excerpt)}
                errors={errors}
                isEdit={mode === 'edit'}
              />

              {/* Content Editor */}
              <ArticleContentEditor
                content={formData.content}
                onContentChange={(content) => updateFormData('content', content)}
                errors={errors}
              />
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6 md:space-y-8">
              {/* Publishing Options */}
              <ArticlePublishingOptions
                status={formData.status}
                featured={formData.featured}
                publishedAt={formData.publishedAt}
                onStatusChange={(status) => updateFormData('status', status)}
                onFeaturedChange={(featured) => updateFormData('featured', featured)}
                onPublishedAtChange={(publishedAt) => updateFormData('publishedAt', publishedAt)}
                errors={errors}
              />

              {/* Category and Tags */}
              <ArticleCategoryTags
                categoryIds={formData.categoryIds}
                tags={formData.tags}
                onCategoryChange={(categoryIds) => updateFormData('categoryIds', categoryIds)}
                onTagsChange={(tags) => updateFormData('tags', tags)}
                errors={errors}
              />

              {/* Featured Image */}
              <ArticleFeaturedImage
                featuredImage={formData.featuredImage}
                onImageChange={(image) => updateFormData('featuredImage', image)}
                errors={errors}
              />
            </div>
          </div>

          {/* Form Errors Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-red-800 mb-2">
                <AlertCircle size={20} />
                <h3 className="font-medium">Vui lòng kiểm tra lại thông tin:</h3>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ArticleFormWrapper;
