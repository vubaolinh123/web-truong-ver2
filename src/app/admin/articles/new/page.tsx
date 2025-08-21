/**
 * Add New Article Page
 * Page for creating new articles with light theme styling
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
      alert('Vui lòng đăng nhập để tạo bài viết');
      router.push('/admin/login');
      return;
    }

    try {
      let featuredImageUrl = '';

      // Handle featured image upload if provided
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
      }

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
        featuredImage: featuredImageUrl || null
      };

      // Debug: Log the form data to verify categories are included
      console.log('📝 Creating article with data:', {
        title: articleData.title,
        categoryIds: articleData.categoryIds,
        categoryCount: articleData.categoryIds.length
      });

      // Submit to API using articles API
      const response = await articlesApi.createArticle(articleData);

      if (response.status === 'success') {
        // Show success message
        alert('Tạo bài viết thành công!');

        // Redirect to articles list or edit page
        if (formData.status === 'published') {
          router.push('/admin/articles');
        } else {
          router.push(`/admin/articles/${response.data.article.id}/edit`);
        }
      } else {
        throw new Error(response.message || 'Có lỗi xảy ra khi tạo bài viết');
      }

    } catch (error: any) {
      console.error('Error creating article:', error);
      alert(error.message || 'Có lỗi xảy ra khi tạo bài viết');
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
