import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with lightweight skeletons
const ScientificResearchHero = dynamic(() => import('./components/ScientificResearchHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const ScientificResearchArticle = dynamic(() => import('./components/ScientificResearchArticle'), {
  loading: () => <div className="w-[92%] md:w-[80%] mx-auto py-10"><div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /></div>,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Nghiên cứu khoa học - ${SITE_NAME}`,
  description:
    'Khám phá các hoạt động nghiên cứu khoa học, dự án và công trình nghiên cứu của giảng viên và sinh viên tại Trường Cao đẳng Thông tin và Truyền thông.',
  alternates: {
    canonical: `${SITE_URL}/nghien-cuu-khoa-hoc`,
  },
  openGraph: {
    title: `Nghiên cứu khoa học - ${SITE_NAME}`,
    description:
      'Nghiên cứu khoa học - Hoạt động nghiên cứu, dự án và công trình khoa học tại Trường Cao đẳng Thông tin và Truyền thông.',
    url: `${SITE_URL}/nghien-cuu-khoa-hoc`,
    type: 'website',
    locale: 'vi_VN',
    images: [
      { url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME },
    ],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Nghiên cứu khoa học - ${SITE_NAME}`,
    description: 'Nghiên cứu khoa học - Hoạt động nghiên cứu và công trình khoa học của nhà trường.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// Structured data (Organization + EducationalOrganization)
const scientificResearchJsonLd = [
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
      'Nghiên cứu khoa học - Các hoạt động nghiên cứu, dự án và công trình khoa học của giảng viên và sinh viên tại Trường Cao đẳng Thông tin và Truyền thông.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    foundingDate: '2010-01-01',
    description:
      'Thông tin chi tiết về các hoạt động nghiên cứu khoa học, dự án nghiên cứu và công trình công bố tại Trường Cao đẳng Thông tin và Truyền thông.',
  }
];

export default function ScientificResearchPage() {
  return (
    <Layout>
      {/* JSON-LD via shared SEO component */}
      <Seo minimal jsonLd={scientificResearchJsonLd as any} />

      {/* Page container */}
      <div className="min-h-screen bg-white">
        <ScientificResearchHero />
        <ScientificResearchArticle />
      </div>
    </Layout>
  );
}

