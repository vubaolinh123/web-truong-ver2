import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with lightweight skeletons
const OrganizationHero = dynamic(() => import('../ban-giam-hieu/components/OrganizationHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const FinanceDepartmentArticle = dynamic(() => import('./components/FinanceDepartmentArticle'), {
  loading: () => <div className="w-[92%] md:w-[80%] mx-auto py-10"><div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /></div>,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Phòng Kế hoạch tài chính - ${SITE_NAME}`,
  description:
    'Tìm hiểu về Phòng Kế hoạch tài chính, chức năng và nhiệm vụ quản lý tài chính, kế hoạch của Trường Cao đẳng Thông tin và Truyền thông.',
  alternates: {
    canonical: `${SITE_URL}/phong-ke-hoach-tai-chinh`,
  },
  openGraph: {
    title: `Phòng Kế hoạch tài chính - ${SITE_NAME}`,
    description:
      'Phòng Kế hoạch tài chính - Quản lý tài chính và kế hoạch của Trường Cao đẳng Thông tin và Truyền thông.',
    url: `${SITE_URL}/phong-ke-hoach-tai-chinh`,
    type: 'website',
    locale: 'vi_VN',
    images: [
      { url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME },
    ],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Phòng Kế hoạch tài chính - ${SITE_NAME}`,
    description: 'Phòng Kế hoạch tài chính - Quản lý tài chính và kế hoạch của nhà trường.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// Structured data (Organization + EducationalOrganization)
const financeDepartmentJsonLd = [
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
      'Phòng Kế hoạch tài chính - Đơn vị quản lý tài chính, kế hoạch và ngân sách của Trường Cao đẳng Thông tin và Truyền thông.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    foundingDate: '2010-01-01',
    description:
      'Phòng Kế hoạch tài chính chịu trách nhiệm quản lý tài chính, kế hoạch và ngân sách của nhà trường.',
  }
];

export default function FinanceDepartmentPage() {
  return (
    <Layout>
      {/* JSON-LD via shared SEO component */}
      <Seo minimal jsonLd={financeDepartmentJsonLd as any} />

      {/* Page container */}
      <div className="min-h-screen bg-white">
        <OrganizationHero />
        <FinanceDepartmentArticle />
      </div>
    </Layout>
  );
}

