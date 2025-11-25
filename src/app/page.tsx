import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Banner from '@/components/layout/Banner';
import dynamic from 'next/dynamic';
import Seo from '@/components/seo/Seo';

// Dynamic Imports with Skeleton Loaders
const NewsSection = dynamic(() => import('@/components/sections/NewsSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});
const AdmissionTrainingSection = dynamic(() => import('@/components/sections/AdmissionTrainingSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});
const FacultiesSection = dynamic(() => import('@/components/sections/FacultiesSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
});
const AchievementsSection = dynamic(() => import('@/components/sections/AchievementsSection'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});
import { Article } from '@/types/articles'; // Import Article type

export const metadata: Metadata = {
  title: 'Trường Cao đẳng Thông tin và Truyền thông',
  description: 'Trường Cao đẳng Thông tin và Truyền thông - Đào tạo chuyên sâu Công nghệ Thông tin, Lập trình máy tính, An toàn thông tin. Tuyển sinh 2025 với học bổng hấp dẫn, đảm bảo việc làm sau tốt nghiệp.',
  keywords: [
    'trang chủ cao đẳng thông tin',
    'trường cao đẳng công nghệ thông tin',
    'đào tạo lập trình viên',
    'tuyển sinh cao đẳng 2025',
    'học phí cao đẳng IT',
    'chương trình đào tạo công nghệ',
    'sinh viên công nghệ thông tin',
    'việc làm ngành IT'
  ],
  openGraph: {
    title: 'Trường Cao đẳng Thông tin và Truyền thông',
    description: 'Khám phá các chương trình đào tạo Công nghệ Thông tin chất lượng cao tại Trường Cao đẳng Thông tin và Truyền thông. Tuyển sinh 2025 đang diễn ra.',
    url: 'https://web-truong-ver2.vercel.app/',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Logo Trường Cao đẳng Thông tin và Truyền thông',
      },
    ],
  },
  alternates: {
    canonical: 'https://web-truong-ver2.vercel.app/',
  },
};

// Structured Data for Educational Organization
const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Trường Cao đẳng Thông tin và Truyền thông",
  "alternateName": "College of Information and Communication Technology",
  "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.vcic.edu.vn",
  "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.vcic.edu.vn"}/images/logo.png`,
  "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.vcic.edu.vn"}/images/logo.png`,
  "description": "Trường Cao đẳng Thông tin và Truyền thông - Đào tạo chuyên sâu các ngành Công nghệ Thông tin, Lập trình máy tính, An toàn thông tin với chất lượng cao.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Số 8 Tôn Thất Thuyết",
    "addressLocality": "Cầu Giấy",
    "addressRegion": "Hà Nội",
    "addressCountry": "VN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+84-964-322-215",
    "contactType": "Admissions",
    "availableLanguage": "Vietnamese"
  },
  "sameAs": [
    "https://facebook.com/cic.edu.vn",
    "https://youtube.com/cic",
    "https://twitter.com/cic_edu_vn"
  ],
  "foundingDate": "2010",
  "parentOrganization": {
    "@type": "GovernmentOrganization",
    "name": "Bộ Khoa học và Công nghệ"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Chương trình đào tạo",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Công nghệ Thông tin",
        "description": "Đào tạo chuyên sâu về phát triển phần mềm, lập trình web, mobile"
      },
      {
        "@type": "Course",
        "name": "Lập trình máy tính",
        "description": "Đào tạo lập trình viên chuyên nghiệp với các ngôn ngữ hiện đại"
      },
      {
        "@type": "Course",
        "name": "An toàn thông tin",
        "description": "Đào tạo chuyên gia bảo mật thông tin và an ninh mạng"
      }
    ]
  }
};

// Data fetching function for featured articles
async function getFeaturedArticles(): Promise<Article[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const base = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '');
    const url = `${base}/articles/public/featured?limit=6`;

    const response = await fetch(url, {
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.warn('Failed to fetch featured articles:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data?.data?.articles || [];
  } catch (error) {
    console.warn('Error fetching featured articles:', error);
    return [];
  }
}

// Data fetching function for admission & training articles
async function getAdmissionTrainingArticles(): Promise<Article[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const params = new URLSearchParams({
      limit: '3',
      category: 'tuyen-sinh,dao-tao',
      sort: 'newest',
      status: 'published'
    });

    const base = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '');
    const url = `${base}/articles/public?${params.toString()}`;

    const response = await fetch(url, {
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.warn('Failed to fetch admission/training articles:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data?.data?.articles || [];
  } catch (error) {
    console.warn('Error fetching admission/training articles:', error);
    return [];
  }
}

// Data fetching function for digital transformation articles
async function getDigitalTransformationArticles(): Promise<Article[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const params = new URLSearchParams({
      limit: '3',
      category: 'cong-nghe-so',
      sort: 'newest',
      status: 'published'
    });

    const base = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '');
    const url = `${base}/articles/public?${params.toString()}`;

    const response = await fetch(url, {
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.warn('Failed to fetch digital transformation articles:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data?.data?.articles || [];
  } catch (error) {
    console.warn('Error fetching digital transformation articles:', error);
    return [];
  }
}

export default async function Home() {
  const [featuredArticles, admissionTrainingArticles, digitalTransformationArticles] = await Promise.all([
    getFeaturedArticles(),
    getAdmissionTrainingArticles(),
    getDigitalTransformationArticles()
  ]);

  return (
    <>
      <Seo
        minimal
        jsonLd={structuredData as any}
      />
      <Layout>
        <Banner />
        <NewsSection articles={featuredArticles} />
        <AdmissionTrainingSection articles={admissionTrainingArticles} digitalTransformationArticles={digitalTransformationArticles} />
        <FacultiesSection />
        <AchievementsSection />
      </Layout>
    </>
  );
}
