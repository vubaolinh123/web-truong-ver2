/**
 * Other News Page
 * Displays paginated grid of non-featured news articles (excluding articles marked as "tin nổi bật")
 */

import type { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Article } from '@/types/articles';

// Dynamic imports for performance optimization
const ArticlesList = dynamic(() => import('@/app/tin-tuc/components/ArticlesList'), {
  loading: () => (
    <div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse mb-12" />
  )
});

const OtherNewsPagination = dynamic(() => import('./components/OtherNewsPagination'), {
  loading: () => (
    <div className="h-16 bg-white rounded-2xl shadow-lg animate-pulse" />
  )
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

// Page props interface
interface OtherNewsPageProps {
  searchParams: Promise<{
    page?: string;
    sort?: string;
  }>;
}

export const metadata: Metadata = {
  title: `Tin tức khác - ${SITE_NAME}`,
  description:
    'Các tin tức và thông báo khác của trường',
  alternates: { canonical: `${SITE_URL}/tin-tuc-khac` },
  openGraph: {
    title: `Tin tức khác - ${SITE_NAME}`,
    description:
      'Các tin tức và thông báo khác của trường',
    url: `${SITE_URL}/tin-tuc-khac`,
    type: 'website',
    locale: 'vi_VN',
    images: [{ url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME }],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Tin tức khác - ${SITE_NAME}`,
    description: 'Các tin tức và thông báo khác của trường',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// Data fetching function
async function getOtherArticles(params: {
  page?: number;
  sort?: string;
}): Promise<{ articles: Article[]; total: number; totalPages: number }> {
  try {
    const searchParams = new URLSearchParams({
      page: (params.page || 1).toString(),
      limit: '12',
      sort: params.sort || 'newest',
      status: 'published',
      featured: 'false'
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/articles/public?${searchParams}`,
      {
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch other articles');
    }

    const data = await response.json();

    return {
      articles: data?.data?.articles || [],
      total: data?.data?.pagination?.totalArticles || 0,
      totalPages: data?.data?.pagination?.totalPages || 1
    };
  } catch (error) {
    console.error('Error fetching other articles:', error);
    return {
      articles: [],
      total: 0,
      totalPages: 1
    };
  }
}

// JSON-LD structured data
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Tin tức khác - ${SITE_NAME}`,
    description: 'Các tin tức và thông báo khác của trường',
    url: `${SITE_URL}/tin-tuc-khac`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL
    }
  }
];

export default async function OtherNewsPage({ searchParams }: OtherNewsPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1');
  const sort = params.sort || 'newest';

  // Fetch other (non-featured) articles
  const { articles, total, totalPages } = await getOtherArticles({
    page: currentPage,
    sort
  });

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tin tức khác', href: '/tin-tuc-khac', current: true }
  ];

  return (
    <>
      <Seo minimal jsonLd={structuredData as any} />
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-yellow-50">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] py-16 md:py-24">
            <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
            <div className="relative w-[92%] md:w-[80%] mx-auto px-4 text-white">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight uppercase mb-4">
                Tin tức khác
              </h1>
              <p className="text-white/90 max-w-3xl text-lg">
                Các tin tức và thông báo khác của trường
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                  <span className="font-semibold">{total}</span>
                  <span className="text-white/80">bài viết</span>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} showHomeIcon={false} />

            {/* Articles List */}
            <Suspense fallback={
              <div className="h-96 bg-white/70 rounded-2xl shadow-lg animate-pulse mb-12" />
            }>
              <ArticlesList
                articles={articles}
                currentPage={currentPage}
                totalPages={totalPages}
                search=""
                category=""
              />
            </Suspense>

            {/* Pagination */}
            {totalPages > 1 && (
              <Suspense fallback={
                <div className="h-16 bg-white/70 rounded-2xl shadow-lg animate-pulse" />
              }>
                <OtherNewsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  sort={sort}
                />
              </Suspense>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

