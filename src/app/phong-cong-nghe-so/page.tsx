import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with lightweight skeletons
const OrganizationHero = dynamic(() => import('../ban-giam-hieu/components/OrganizationHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const DigitalTechDepartmentArticle = dynamic(() => import('./components/DigitalTechDepartmentArticle'), {
  loading: () => <div className="w-[92%] md:w-[80%] mx-auto py-10"><div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /></div>,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Phòng Công nghệ số - ${SITE_NAME}`,
  description:
    'Tìm hiểu về Phòng Công nghệ số, chức năng và nhiệm vụ quản lý công nghệ thông tin của Trường Cao đẳng Thông tin và Truyền thông.',
  alternates: {
    canonical: `${SITE_URL}/phong-cong-nghe-so`,
  },
  openGraph: {
    title: `Phòng Công nghệ số - ${SITE_NAME}`,
    description:
      'Phòng Công nghệ số - Quản lý công nghệ thông tin và chuyển đổi số của Trường Cao đẳng Thông tin và Truyền thông.',
    url: `${SITE_URL}/phong-cong-nghe-so`,
    type: 'website',
    locale: 'vi_VN',
    images: [
      { url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME },
    ],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Phòng Công nghệ số - ${SITE_NAME}`,
    description: 'Phòng Công nghệ số - Quản lý công nghệ thông tin và chuyển đổi số của nhà trường.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// Structured data (Organization + EducationalOrganization)
const digitalTechDepartmentJsonLd = [
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
      'Phòng Công nghệ số - Đơn vị quản lý công nghệ thông tin và chuyển đổi số của Trường Cao đẳng Thông tin và Truyền thông.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    foundingDate: '2010-01-01',
    description:
      'Phòng Công nghệ số chịu trách nhiệm quản lý hạ tầng công nghệ thông tin và thúc đẩy chuyển đổi số của nhà trường.',
  }
];

export default function DigitalTechDepartmentPage() {
  return (
    <Layout>
      {/* JSON-LD via shared SEO component */}
      <Seo minimal jsonLd={digitalTechDepartmentJsonLd as any} />

      {/* Page container */}
      <div className="min-h-screen bg-white">
        <OrganizationHero />
        <DigitalTechDepartmentArticle />
      </div>
    </Layout>
  );
}

