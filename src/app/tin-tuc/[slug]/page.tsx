/**
 * Article Detail Page
 * Modern, SEO-optimized article page with Redux integration and real API data
 */

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePageProps, ArticleContent, BreadcrumbItem } from './types/article.types';
import { articlesApi } from '@/lib/api/articles';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';
import ArticlePageClient from './components/ArticlePageClient';

// Real API function
async function getArticleBySlug(slug: string): Promise<ArticleContent | null> {
  try {
    const response = await articlesApi.getArticleBySlug(slug);
    if (response.status === 'success') {
      return response.data.article;
    }
    return null;
  } catch (error) {
    console.error('Error fetching article:', error);
    // Re-throw the error to be caught by the Next.js error boundary
    throw new Error('Không thể tải bài viết. Vui lòng thử lại sau.');
  }
}

// Real API function for related articles
async function getRelatedArticles(categoryId: string, currentArticleId: string) {
  try {
    const response = await articlesApi.getArticles({
      page: 1,
      limit: 7, // Fetch 7 to exclude current article and get 6
      sortBy: 'publishedAt',
      sortOrder: 'desc',
      status: 'published',
      categoryId: categoryId
    });

    if (response.status === 'success') {
      // Filter out current article and limit to 6
      return response.data.articles
        .filter(article => article.id !== currentArticleId)
        .slice(0, 6);
    }
    return [];
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
    // In Next.js 15+, params is always a Promise
    const resolvedParams = await params;

    // Validate that we have the slug parameter
    if (!resolvedParams || !resolvedParams.slug) {
      return {
        title: 'Bài viết không tồn tại',
        description: 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'
      };
    }

    const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Bài viết không tồn tại',
      description: 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';
  const articleUrl = `${baseUrl}/tin-tuc/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    keywords: Array.isArray(article.tags)
      ? article.tags.map((tag: any) => typeof tag === 'string' ? tag : tag.name).join(', ')
      : '',
    authors: article.author
      ? [{ name: `${article.author.firstName} ${article.author.lastName}` }]
      : [],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: articleUrl,
      siteName: siteName,
      images: [
        {
          url: typeof article.featuredImage === 'string'
            ? article.featuredImage
            : article.featuredImage?.url || `${baseUrl}/images/default-og.jpg`,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ],
      locale: 'vi_VN',
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      section: article.category?.name || '',
      tags: Array.isArray(article.tags)
        ? article.tags.map((tag: any) => typeof tag === 'string' ? tag : tag.name)
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [typeof article.featuredImage === 'string'
        ? article.featuredImage
        : article.featuredImage?.url || `${baseUrl}/images/default-og.jpg`],
    },
    alternates: {
      canonical: articleUrl,
    },
    other: {
      'article:author': article.author
        ? `${article.author.firstName} ${article.author.lastName}`
        : '',
      'article:published_time': article.publishedAt || '',
      'article:modified_time': article.updatedAt,
      'article:section': article.category?.name || '',
      'article:tag': Array.isArray(article.tags)
        ? article.tags.map((tag: any) => typeof tag === 'string' ? tag : tag.name).join(',')
        : '',
    }
  };
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    return {
      title: 'Bài viết không tồn tại',
      description: 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'
    };
  }
}



export default async function ArticlePage({ params }: ArticlePageProps) {
  try {
    // In Next.js 15+, params is always a Promise
    const resolvedParams = await params;

    // Validate that we have the slug parameter
    if (!resolvedParams || !resolvedParams.slug) {
      console.error('Missing slug parameter:', {
        resolvedParams,
        hasSlug: resolvedParams?.slug
      });
      notFound();
    }

    const { slug } = resolvedParams;

    const article = await getArticleBySlug(slug);

    if (!article) {
      notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.excerpt,
      "image": typeof article.featuredImage === 'string' ? article.featuredImage : article.featuredImage?.url,
      "author": article.author ? {
        "@type": "Person",
        "name": `${article.author.firstName} ${article.author.lastName}`
      } : undefined,
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/images/logo.png`
        }
      },
      "datePublished": article.publishedAt,
      "dateModified": article.updatedAt,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${baseUrl}/tin-tuc/${article.slug}`
      }
    } as any;

    return (
      <>
        <Seo minimal jsonLd={structuredData} />
        <Layout>
          <ArticlePageClient slug={slug} initialArticle={article} />
        </Layout>
      </>
    );
  } catch (error) {
    console.error('Error in ArticlePage:', error);
    notFound();
  }
}
