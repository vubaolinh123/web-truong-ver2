/**
 * Dynamic Article Page
 * Trang chi tiết bài viết với slug động
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Components
import Layout from '@/components/layout/Layout';
import ArticleHero from '@/components/article/ArticleHero';
import ArticleContent from '@/components/article/ArticleContent';
import ArticleMeta from '@/components/article/ArticleMeta';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

// Dynamic imports for performance
const RelatedArticles = dynamic(() => import('@/components/article/RelatedArticles'), {
  loading: () => <LoadingSkeleton className="h-96" />
});

// Types
import { Article } from '@/types/articles';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Fetch article data
async function getArticle(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/articles/public/slug/${slug}`,
      {
        next: { 
          revalidate: 3600, // ISR: revalidate every hour
          tags: [`article-${slug}`]
        }
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch article');
    }

    const data = await response.json();
    return data.status === 'success' ? data.data.article : null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: 'Bài viết không tồn tại - Trường Đại học ABC',
      description: 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'
    };
  }

  const title = article.metaTitle || article.title;
  const description = article.metaDescription || article.excerpt;
  const imageUrl = article.featuredImage?.url || '/images/default-article.jpg';
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/tin-tuc/${article.slug}`;

  return {
    title: `${title} - Trường Đại học ABC`,
    description,
    keywords: article.tags?.join(', '),
    authors: [{ name: article.author?.firstName + ' ' + article.author?.lastName }],
    openGraph: {
      title,
      description,
      type: 'article',
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.featuredImage?.alt || article.title
        }
      ],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author?.firstName + ' ' + article.author?.lastName],
      tags: article.tags
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    },
    alternates: {
      canonical: canonicalUrl
    },
    other: {
      'article:published_time': article.publishedAt || '',
      'article:modified_time': article.updatedAt || '',
      'article:author': article.author?.firstName + ' ' + article.author?.lastName || '',
      'article:section': article.category?.name || '',
      'article:tag': article.tags?.join(',') || ''
    }
  };
}

// Generate static params for popular articles (optional)
export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/articles/public/popular?limit=20`
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    const articles = data.status === 'success' ? data.data.articles : [];
    
    return articles.map((article: Article) => ({
      slug: article.slug
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Main page component
export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage?.url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: `${article.author?.firstName} ${article.author?.lastName}`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/authors/${article.author?.username}`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Trường Đại học ABC',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/tin-tuc/${article.slug}`
    },
    articleSection: article.category?.name,
    keywords: article.tags?.join(', '),
    wordCount: article.content?.length || 0,
    timeRequired: `PT${article.readingTime || 5}M`
  };

  return (
    <Layout>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Layout */}
      <article className="min-h-screen bg-gray-50">
        {/* Hero Banner */}
        <ArticleHero article={article} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Article Content - Main Column (85% width) */}
            <div className="lg:col-span-10">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Article Meta */}
                <ArticleMeta article={article} />
                
                {/* Article Content */}
                <ArticleContent article={article} />
              </div>
            </div>

            {/* Sidebar (15% width) */}
            <div className="lg:col-span-2">
              <div className="sticky top-8 space-y-6">
                {/* Article Info Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Thông tin bài viết</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Tác giả</div>
                      <div className="font-bold text-blue-900">{article.author?.firstName} {article.author?.lastName}</div>
                    </div>
                    {article.publishedAt && (
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">Ngày xuất bản</div>
                        <div className="font-bold text-blue-900">
                          {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                    )}
                    {article.category && (
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-2">Danh mục</div>
                        <div className="font-bold text-blue-900">{article.category.name}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">Hành động nhanh</h3>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      📧 Gửi email bài viết
                    </button>
                    <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                      💾 Tải xuống PDF
                    </button>
                    <button className="w-full px-4 py-3 bg-yellow-500 text-blue-900 rounded-lg hover:bg-yellow-400 transition-colors font-semibold">
                      🔖 Đánh dấu trang
                    </button>
                  </div>
                </div>


              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <Suspense fallback={<LoadingSkeleton className="h-96" />}>
              <RelatedArticles articleId={article.id} categoryId={article.category?.id} />
            </Suspense>
          </div>
        </div>
      </article>
    </Layout>
  );
}
