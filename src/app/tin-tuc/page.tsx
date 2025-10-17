/**
 * News Listing Page - Complete Redesign
 * Modular implementation with client component wrapper
 */

import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import { Article } from '@/types/articles';
import Seo from '@/components/seo/Seo';
import NewsPageClient from './components/NewsPageClient';

// Data fetching functions
async function getArticles(params: {
  page?: number;
  search?: string;
  category?: string;
  sort?: string;
}): Promise<{ articles: Article[]; total: number; totalPages: number }> {
  try {
    const searchParams = new URLSearchParams({
      page: (params.page || 1).toString(),
      limit: '12',
      status: 'published',
      ...(params.search && { search: params.search }),
      ...(params.category && { category: params.category }),
      ...(params.sort && { sort: params.sort })
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/articles/public?${searchParams}`,
      {
        cache: 'no-store' // Force dynamic fetching on every request
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return {
        articles: data.data.articles || [],
        total: data.data.pagination?.totalArticles || 0,
        totalPages: data.data.pagination?.totalPages || 1
      };
    }

    return { articles: [], total: 0, totalPages: 1 };
  } catch (error) {
    console.error('Error fetching articles:', error);
    // Re-throw the error to be caught by the Next.js error boundary
    throw new Error('Không thể tải danh sách bài viết. Vui lòng thử lại sau.');
  }
}

async function getFeaturedArticles(): Promise<Article[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/articles/public/featured?limit=4`,
      {
        next: { revalidate: 1 } // Revalidate every 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch featured articles');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return data.data.articles || [];
    }

    return [];
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/categories/public`,
      {
        next: { revalidate: 1 } // Cache for 1 hour
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data.status === 'success' ? data.data.categories : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// SEO Metadata
export const metadata: Metadata = {
  title: 'Tin Tức - Trường Cao đẳng Thông tin và Truyền thông',
  description: 'Cập nhật tin tức mới nhất từ Trường Cao đẳng Thông tin và Truyền thông. Thông tin về hoạt động giáo dục, nghiên cứu khoa học, sự kiện và thành tích của nhà trường.',
  keywords: 'tin tức, bài viết, thông báo, sự kiện, cao đẳng, giáo dục, công nghệ thông tin',
  openGraph: {
    title: 'Tin Tức - Trường Cao đẳng Thông tin và Truyền thông',
    description: 'Cập nhật tin tức mới nhất từ Trường Cao đẳng Thông tin và Truyền thông',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn'}/tin-tuc`,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn'}/images/news-og.jpg`],
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tin Tức - Trường Cao đẳng Thông tin và Truyền thông',
    description: 'Cập nhật tin tức mới nhất từ Trường Cao đẳng Thông tin và Truyền thông'
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn'}/tin-tuc`
  }
};

// Page Props Interface
interface NewsPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    sort?: string;
  }>;
}

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Tin Tức",
  "description": "Cập nhật tin tức mới nhất từ Trường Cao đẳng Thông tin và Truyền thông",
  "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn'}/tin-tuc`,
  "publisher": {
    "@type": "Organization",
    "name": process.env.NEXT_PUBLIC_SITE_NAME || "Trường Cao đẳng Thông tin và Truyền thông",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.vcic.edu.vn"
  }
};

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1');
  const search = params.search || '';
  const category = params.category || '';
  const sort = params.sort || 'newest';

  // Fetch data in parallel
  const [
    { articles, total, totalPages },
    categories,
    featuredArticles
  ] = await Promise.all([
    getArticles({ page: currentPage, search, category, sort }),
    getCategories(),
    getFeaturedArticles()
  ]);

  return (
    <>
      <Seo
        minimal
        jsonLd={structuredData as any}
      />
      <Layout>
        <NewsPageClient
          articles={articles}
          total={total}
          totalPages={totalPages}
          categories={categories}
          featuredArticles={featuredArticles}
          currentPage={currentPage}
          search={search}
          category={category}
          sort={sort}
        />
      </Layout>
    </>
  );
}
