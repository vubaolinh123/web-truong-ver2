import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with lightweight skeletons
const OnlineLearningHero = dynamic(() => import('./components/OnlineLearningHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const OnlineLearningArticle = dynamic(() => import('./components/OnlineLearningArticle'), {
  loading: () => <div className="w-[92%] md:w-[80%] mx-auto py-10"><div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /></div>,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Học trực tuyến - ${SITE_NAME}`,
  description:
    'Trải nghiệm học tập trực tuyến hiện đại với nền tảng công nghệ tiên tiến tại Trường Cao đẳng Thông tin và Truyền thông.',
  alternates: {
    canonical: `${SITE_URL}/hoc-truc-tuyen`,
  },
  openGraph: {
    title: `Học trực tuyến - ${SITE_NAME}`,
    description:
      'Học trực tuyến - Nền tảng học tập trực tuyến hiện đại tại Trường Cao đẳng Thông tin và Truyền thông.',
    url: `${SITE_URL}/hoc-truc-tuyen`,
    type: 'website',
    locale: 'vi_VN',
    images: [
      { url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME },
    ],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Học trực tuyến - ${SITE_NAME}`,
    description: 'Học trực tuyến - Nền tảng học tập trực tuyến hiện đại của nhà trường.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// Structured data (Organization + EducationalOrganization)
const onlineLearningJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    alternateName: 'College of Information and Communication Technology',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    foundingDate: '2010-01-01',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hà Nội',
      addressCountry: 'VN',
    },
    sameAs: [
      process.env.NEXT_PUBLIC_FACEBOOK_PAGE || 'https://facebook.com/vcic.edu.vn',
      'https://youtube.com',
    ],
    description:
      'Học trực tuyến - Nền tảng học tập trực tuyến hiện đại với công nghệ tiên tiến tại Trường Cao đẳng Thông tin và Truyền thông.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    foundingDate: '2010-01-01',
    description:
      'Thông tin về nền tảng học tập trực tuyến, khóa học và tài nguyên học liệu số tại Trường Cao đẳng Thông tin và Truyền thông.',
  }
];

export default function OnlineLearningPage() {
  return (
    <Layout>
      {/* JSON-LD via shared SEO component */}
      <Seo minimal jsonLd={onlineLearningJsonLd as any} />

      {/* Page container */}
      <div className="min-h-screen bg-white">
        <OnlineLearningHero />
        <OnlineLearningArticle />
      </div>
    </Layout>
  );
}

