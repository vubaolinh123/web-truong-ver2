/**
 * Edit Article Page
 * Page for editing existing articles with light theme styling
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Article, ArticleFormData } from '@/types/articles';
import { articlesApi } from '@/lib/api/articles';
import { isAuthenticated } from '@/lib/auth-utils';
import ArticleFormWrapper from '@/components/admin/articles/form/ArticleFormWrapper';

const EditArticlePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load article data
  useEffect(() => {
    const loadArticle = async () => {
      if (!articleId) return;
      
      try {
        // Use the articles API from lib/api
        const response = await articlesApi.getArticle(articleId);

        if (response.status === 'success') {
          setArticle(response.data.article);
        } else {
          throw new Error(response.message || 'Có lỗi xảy ra khi tải bài viết');
        }
        
      } catch (error: any) {
        console.error('Error loading article:', error);
        if (error.status === 404) {
          setError('Bài viết không tồn tại');
        } else {
          setError(error.message || 'Có lỗi xảy ra khi tải bài viết');
        }
      } finally {
        setInitialLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  const handleSubmit = async (formData: ArticleFormData) => {
    setLoading(true);

    // Check authentication
    if (!isAuthenticated()) {
      alert('Vui lòng đăng nhập để cập nhật bài viết');
      router.push('/admin/login');
      return;
    }

    try {
      let featuredImageUrl = '';

      // Handle featured image upload if it's a new file
      if (formData.featuredImage instanceof File) {
        try {
          const uploadResponse = await articlesApi.uploadImage(formData.featuredImage);
          if (uploadResponse.status === 'success') {
            featuredImageUrl = uploadResponse.data.url;
          }
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          throw new Error('Có lỗi xảy ra khi tải lên hình ảnh');
        }
      } else if (typeof formData.featuredImage === 'string') {
        featuredImageUrl = formData.featuredImage;
      }

      // Prepare article data for API
      const articleData: Partial<ArticleFormData> = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        categoryIds: formData.categoryIds,
        status: formData.status,
        featured: formData.featured,
        tags: formData.tags,
        publishedAt: formData.publishedAt,
        ...(featuredImageUrl && { featuredImage: featuredImageUrl })
      };

      // Submit to API using articles API
      const response = await articlesApi.updateArticle(articleId, articleData);

      if (response.status === 'success') {
        // Update local article state
        setArticle(response.data.article);

        // Show success message
        alert('Cập nhật bài viết thành công!');

        // Redirect based on status
        if (formData.status === 'published') {
          router.push('/admin/articles');
        }
      } else {
        throw new Error(response.message || 'Có lỗi xảy ra khi cập nhật bài viết');
      }

    } catch (error: any) {
      console.error('Error updating article:', error);
      alert(error.message || 'Có lỗi xảy ra khi cập nhật bài viết');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Có lỗi xảy ra</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="flex space-x-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Thử lại
              </button>
              <button
                onClick={() => router.push('/admin/articles')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Article not found
  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">Không tìm thấy bài viết</h2>
            <p className="text-yellow-600 mb-4">Bài viết bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
            <button
              onClick={() => router.push('/admin/articles')}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200"
            >
              Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ArticleFormWrapper
      mode="edit"
      article={article}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default EditArticlePage;
