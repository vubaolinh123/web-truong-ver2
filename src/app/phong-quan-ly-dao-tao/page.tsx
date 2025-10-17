import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with lightweight skeletons
const OrganizationHero = dynamic(() => import('../ban-giam-hieu/components/OrganizationHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const TrainingDepartmentArticle = dynamic(() => import('./components/TrainingDepartmentArticle'), {
  loading: () => <div className="w-[92%] md:w-[80%] mx-auto py-10"><div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /></div>,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Phòng Quản lý Đào tạo - ${SITE_NAME}`,
  description:
    'Tìm hiểu về Phòng Quản lý Đào tạo, chức năng và nhiệm vụ quản lý chương trình đào tạo của Trường Cao đẳng Thông tin và Truyền thông.',
  alternates: {
    canonical: `${SITE_URL}/phong-quan-ly-dao-tao`,
  },
  openGraph: {
    title: `Phòng Quản lý Đào tạo - ${SITE_NAME}`,
    description:
      'Phòng Quản lý Đào tạo - Quản lý chương trình và hoạt động đào tạo của Trường Cao đẳng Thông tin và Truyền thông.',
    url: `${SITE_URL}/phong-quan-ly-dao-tao`,
    type: 'website',
    locale: 'vi_VN',
    images: [
      { url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME },
    ],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Phòng Quản lý Đào tạo - ${SITE_NAME}`,
    description: 'Phòng Quản lý Đào tạo - Quản lý chương trình và hoạt động đào tạo của nhà trường.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// Structured data (Organization + EducationalOrganization)
const trainingDepartmentJsonLd = [
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
      'Phòng Quản lý Đào tạo - Đơn vị quản lý chương trình, kế hoạch và hoạt động đào tạo của Trường Cao đẳng Thông tin và Truyền thông.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    foundingDate: '2010-01-01',
    description:
      'Phòng Quản lý Đào tạo chịu trách nhiệm quản lý chương trình, kế hoạch và các hoạt động đào tạo của nhà trường.',
  }
];

export default function TrainingDepartmentPage() {
  return (
    <Layout>
      {/* JSON-LD via shared SEO component */}
      <Seo minimal jsonLd={trainingDepartmentJsonLd as any} />

      {/* Page container */}
      <div className="min-h-screen bg-white">
        <OrganizationHero />
        <TrainingDepartmentArticle />
      </div>
    </Layout>
  );
}

