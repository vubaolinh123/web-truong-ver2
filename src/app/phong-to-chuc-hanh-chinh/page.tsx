import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with lightweight skeletons
const OrganizationHero = dynamic(() => import('../ban-giam-hieu/components/OrganizationHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const AdminDepartmentArticle = dynamic(() => import('./components/AdminDepartmentArticle'), {
  loading: () => <div className="w-[92%] md:w-[80%] mx-auto py-10"><div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /></div>,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Phòng Tổ chức hành chính - ${SITE_NAME}`,
  description:
    'Tìm hiểu về Phòng Tổ chức hành chính, chức năng và nhiệm vụ quản lý tổ chức, nhân sự của Trường Cao đẳng Thông tin và Truyền thông.',
  alternates: {
    canonical: `${SITE_URL}/phong-to-chuc-hanh-chinh`,
  },
  openGraph: {
    title: `Phòng Tổ chức hành chính - ${SITE_NAME}`,
    description:
      'Phòng Tổ chức hành chính - Quản lý tổ chức và nhân sự của Trường Cao đẳng Thông tin và Truyền thông.',
    url: `${SITE_URL}/phong-to-chuc-hanh-chinh`,
    type: 'website',
    locale: 'vi_VN',
    images: [
      { url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME },
    ],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Phòng Tổ chức hành chính - ${SITE_NAME}`,
    description: 'Phòng Tổ chức hành chính - Quản lý tổ chức và nhân sự của nhà trường.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// Structured data (Organization + EducationalOrganization)
const adminDepartmentJsonLd = [
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
      'Phòng Tổ chức hành chính - Đơn vị quản lý tổ chức, nhân sự và hành chính của Trường Cao đẳng Thông tin và Truyền thông.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    foundingDate: '2010-01-01',
    description:
      'Phòng Tổ chức hành chính chịu trách nhiệm quản lý tổ chức, nhân sự và các công tác hành chính của nhà trường.',
  }
];

export default function AdminDepartmentPage() {
  return (
    <Layout>
      {/* JSON-LD via shared SEO component */}
      <Seo minimal jsonLd={adminDepartmentJsonLd as any} />

      {/* Page container */}
      <div className="min-h-screen bg-white">
        <OrganizationHero />
        <AdminDepartmentArticle />
      </div>
    </Layout>
  );
}

