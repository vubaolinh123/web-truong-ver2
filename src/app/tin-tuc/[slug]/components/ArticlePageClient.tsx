/**
 * Article Page Client Component
 * Client-side wrapper for Redux integration and dynamic imports
 */

'use client';

import React, { useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  fetchArticleBySlug,
  fetchArticles,
  selectCurrentArticle,
  selectCurrentArticleLoading,
  selectArticles,
  selectArticlesLoading,
  selectArticlesError
} from '@/lib/features/articles/articlesSlice';
import { ArticleContent, BreadcrumbItem } from '../types/article.types';
import styles from '../styles/page.module.css';

// Dynamic imports for code splitting
const ArticleHeader = dynamic(() => import('./ArticleHeader'), {
  loading: () => <div className={styles.loadingContainer}><div className={styles.loadingSpinner} /></div>
});

const ArticleContentComponent = dynamic(() => import('./ArticleContent'), {
  loading: () => <div style={{ height: '400px', background: '#f8fafc', borderRadius: '8px', animation: 'pulse 2s infinite' }} />
});

const NewArticleSidebar = dynamic(() => import('./NewArticleSidebar'), {
  loading: () => <div style={{ height: '600px', background: '#f8fafc', borderRadius: '16px', animation: 'pulse 2s infinite' }} />
});

interface ArticlePageClientProps {
  slug: string;
  initialArticle?: ArticleContent;
}

const ArticlePageClient: React.FC<ArticlePageClientProps> = ({ slug, initialArticle }) => {
  const dispatch = useAppDispatch();

  // Redux selectors
  const article = useAppSelector(selectCurrentArticle) || initialArticle;
  const articleLoading = useAppSelector(selectCurrentArticleLoading);
  const articleError = useAppSelector((state) => state.articles.currentArticleError);
  const allArticles = useAppSelector(selectArticles);
  const articlesLoading = useAppSelector(selectArticlesLoading);
  const articlesError = useAppSelector(selectArticlesError);

  // Extract first category from categories array (API returns categories as array)
  const primaryCategory = article && article.categories && Array.isArray(article.categories) && article.categories.length > 0
    ? article.categories[0]
    : article?.category; // fallback to category if exists

  // Filter related articles from all articles
  const relatedArticles = article && primaryCategory
    ? allArticles.filter(a =>
        a.category?.id === primaryCategory.id &&
        a.id !== article.id &&
        a.status === 'published'
      ).slice(0, 6)
    : [];

  // Debug logging
  console.log('ArticlePageClient Debug:', {
    hasArticle: !!article,
    hasAuthor: !!article?.author,
    hasCategory: !!article?.category,
    hasCategories: !!article?.categories,
    categoriesLength: article?.categories?.length || 0,
    primaryCategory: primaryCategory,
    articleId: article?.id,
    slug: article?.slug,
    allArticlesCount: allArticles.length,
    relatedArticlesCount: relatedArticles.length,
    articlesLoading: articlesLoading
  });

  // Fetch article and related articles
  useEffect(() => {
    if (!initialArticle) {
      dispatch(fetchArticleBySlug(slug));
    }
  }, [dispatch, slug, initialArticle]);

  // Fetch related articles when article and category are available
  useEffect(() => {
    if (article && primaryCategory) {
      dispatch(fetchArticles({
        page: 1,
        limit: 10, // Fetch more to ensure we have enough after filtering
        sortBy: 'publishedAt',
        sortOrder: 'desc',
        status: 'published',
        categoryId: primaryCategory.id
      }));
    }
  }, [dispatch, article, primaryCategory]);

  // Validate props
  if (!slug) {
    console.error('ArticlePageClient: slug is required but not provided');
    return (
      <div className={styles.pageContainer}>
        <div className="w-[80%] mx-auto">
          <div className={styles.contentWrapper}>
            <main className={styles.mainContent}>
              <div className={styles.errorContainer}>
                <h1 className={styles.errorTitle}>Lỗi tham số</h1>
                <p className={styles.errorMessage}>Không thể tải bài viết do thiếu thông tin định danh.</p>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (articleLoading && !article) {
    return (
      <div className={styles.pageContainer}>
        <div className="w-[80%] mx-auto">
          <div className={styles.contentWrapper}>
            <main className={styles.mainContent}>
              <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner} />
                <p style={{ marginTop: '1rem', color: '#6b7280' }}>Đang tải bài viết...</p>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (articleError || !article) {
    return (
      <div className={styles.pageContainer}>
        <div className="w-[80%] mx-auto">
          <div className={styles.contentWrapper}>
            <main className={styles.mainContent}>
              <div className={styles.errorContainer}>
                <h1 className={styles.errorTitle}>Có lỗi xảy ra</h1>
                <p className={styles.errorMessage}>
                  {articleError || 'Không thể tải bài viết. Vui lòng thử lại sau.'}
                </p>
                <button
                  onClick={() => dispatch(fetchArticleBySlug(slug))}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #87CEEB, #5a9fd4)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}
                >
                  Thử lại
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Generate breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tin tức', href: '/tin-tuc' },
    ...(primaryCategory ? [{
      label: primaryCategory.name,
      href: `/tin-tuc/danh-muc/${primaryCategory.slug}`
    }] : []),
    { label: article.title, href: `/tin-tuc/${article.slug}`, current: true }
  ];


  // Generate JSON-LD structured data
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.featuredImage,
    "author": {
      "@type": "Person",
      "name": article.author ? `${article.author.firstName} ${article.author.lastName}` : 'Unknown'
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/tin-tuc/${article.slug}`
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className={styles.pageContainer}>
        <div className="w-[80%] mx-auto">
          <div className={styles.contentWrapper}>
            {/* Main Content */}
            <main className={styles.mainContent}>
              <Suspense fallback={<div className={styles.loadingContainer}><div className={styles.loadingSpinner} /></div>}>
                <ArticleHeader 
                  article={article} 
                  breadcrumbs={breadcrumbs}
                />
              </Suspense>
              
              <div className={styles.articleBody}>
                <Suspense fallback={<div style={{ height: '400px', background: '#f8fafc', borderRadius: '8px' }} />}>
                  <ArticleContentComponent content={article.content} />
                </Suspense>
              </div>
              
              {/* Related articles are now handled by ArticleSidebar component */}
            </main>

            {/* Sidebar */}
            <aside>
              <Suspense fallback={<div style={{ height: '600px', background: '#f8fafc', borderRadius: '16px' }} />}>
                <NewArticleSidebar
                  relatedArticles={relatedArticles as any}
                  currentArticleId={article.id}
                  loading={articlesLoading}
                  error={articlesError}
                />
              </Suspense>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePageClient;
