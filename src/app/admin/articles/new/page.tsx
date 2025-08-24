/**
 * Add New Article Page
 * Page for creating new articles with light theme styling
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ArticleFormData } from '@/types/articles';
import { articlesApi } from '@/lib/api/articles';
import { isAuthenticated } from '@/lib/auth-utils';
import ArticleFormWrapper from '@/components/admin/articles/form/ArticleFormWrapper';

const NewArticlePage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: ArticleFormData) => {
    setLoading(true);

    // Check authentication
    if (!isAuthenticated()) {
      toast.error('Vui lòng đăng nhập để tạo bài viết.');
      router.push('/admin/login');
      setLoading(false);
      return;
    }

    const toastId = toast.loading('Đang xử lý...');

    try {
      // Prepare article data for API
      const articleData: ArticleFormData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        categoryIds: formData.categoryIds,
        status: formData.status,
        featured: formData.featured,
        tags: formData.tags,
        publishedAt: formData.publishedAt,
        featuredImage: formData.featuredImage,
      };

      // Submit to API using articles API
      const response = await articlesApi.createArticle(articleData);

      if (response.status === 'success') {
        toast.success('Tạo bài viết mới thành công!', { id: toastId });
        // Redirect to the articles list after a short delay
        setTimeout(() => {
          router.push('/admin/articles');
        }, 1000);
      } else {
        throw new Error(response.message || 'Có lỗi xảy ra khi tạo bài viết');
      }

    } catch (error: any) {
      console.error('Error creating article:', error);
      toast.error(`Đã xảy ra lỗi: ${error.message}`, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ArticleFormWrapper
      mode="create"
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default NewArticlePage;
