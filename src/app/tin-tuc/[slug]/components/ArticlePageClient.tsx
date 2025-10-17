/**
 * Article Page Client Component
 * Client-side wrapper for Redux integration
 */

'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  fetchArticleBySlug,
  fetchRelatedArticles,
  selectCurrentArticle,
  selectCurrentArticleLoading,
  selectRelatedArticles,
  selectRelatedArticlesLoading,
  selectRelatedArticlesError
} from '@/lib/features/articles/articlesSlice';
import { ArticleContent } from '../types/article.types';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import ArticleHeader from './ArticleHeader';
import ArticleContentComponent from './ArticleContent';
import NewArticleSidebar from './NewArticleSidebar';

interface ArticlePageClientProps {
  slug: string;
  initialArticle?: ArticleContent;
}

const ArticlePageClient: React.FC<ArticlePageClientProps> = ({ slug, initialArticle }) => {
  const dispatch = useAppDispatch();
  const { setBreadcrumbs } = useBreadcrumb();

  // Redux selectors
  const article = useAppSelector(selectCurrentArticle) || initialArticle;
  const articleLoading = useAppSelector(selectCurrentArticleLoading);
  const articleError = useAppSelector((state) => state.articles.currentArticleError);
  const relatedArticles = useAppSelector(selectRelatedArticles);
  const relatedArticlesLoading = useAppSelector(selectRelatedArticlesLoading);
  const relatedArticlesError = useAppSelector(selectRelatedArticlesError);

  // Extract first category from categories array (API returns categories as array)
  const primaryCategory = article && article.categories && Array.isArray(article.categories) && article.categories.length > 0
    ? article.categories[0]
    : article?.category; // fallback to category if exists

  // Fetch article and related articles
  useEffect(() => {
    if (!initialArticle) {
      dispatch(fetchArticleBySlug(slug));
    }
  }, [dispatch, slug, initialArticle]);

  // Fetch related articles when article and category are available
  useEffect(() => {
    if (article && primaryCategory) {
      dispatch(fetchRelatedArticles({
        categoryId: primaryCategory.id,
        limit: 6,
        excludeId: article.id,
        sortBy: 'publishedAt',
        sortOrder: 'desc'
      }));
    }
  }, [dispatch, article, primaryCategory]);

  // Update breadcrumbs when article is loaded
  useEffect(() => {
    if (article) {
      const breadcrumbs = [
        { label: 'Trang chủ', href: '/' },
        { label: 'Tin tức', href: '/tin-tuc' },
        ...(primaryCategory ? [{
          label: primaryCategory.name,
          href: `/tin-tuc/danh-muc/${primaryCategory.slug}`
        }] : []),
        { label: article.title, href: `/tin-tuc/${article.slug}`, current: true }
      ];
      setBreadcrumbs(breadcrumbs);
    }
  }, [article, primaryCategory, setBreadcrumbs]);

  // Validate props
  if (!slug) {
    console.error('ArticlePageClient: slug is required but not provided');
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Lỗi tham số</h1>
              <p className="text-slate-600">Không thể tải bài viết do thiếu thông tin định danh.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (articleLoading && !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-8">
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-400 mb-4"></div>
              <p className="text-slate-600 text-lg">Đang tải bài viết...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (articleError || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">Có lỗi xảy ra</h1>
              <p className="text-slate-600 mb-6">
                {articleError || 'Không thể tải bài viết. Vui lòng thử lại sau.'}
              </p>
              <button
                onClick={() => dispatch(fetchArticleBySlug(slug))}
                className="px-6 py-3 bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Breadcrumbs are now handled by the main layout


  // Generate JSON-LD structured data


  return (
    <>
      {/* Modern Article Layout */}
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-yellow-50">
        <div className="max-w-[92%] mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <main className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden">
                {/* Article Header - Dynamic import handles its own loading */}
                <ArticleHeader article={article} />

                {/* Article Content - Dynamic import handles its own loading */}
                <div className="p-6 lg:p-8">
                  <ArticleContentComponent content={article.content} />
                </div>
              </div>
            </main>

            {/* Sidebar - Dynamic import handles its own loading */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8">
                <NewArticleSidebar
                  relatedArticles={relatedArticles}
                  loading={relatedArticlesLoading}
                  error={relatedArticlesError}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePageClient;
