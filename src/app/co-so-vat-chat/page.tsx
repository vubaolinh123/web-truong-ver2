import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with lightweight skeletons
const FacilitiesHero = dynamic(() => import('./components/FacilitiesHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const SchoolFacilitiesArticle = dynamic(() => import('./components/SchoolFacilitiesArticle'), {
  loading: () => <div className="w-[92%] md:w-[80%] mx-auto py-10"><div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /></div>,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Cơ sở vật chất - ${SITE_NAME}`,
  description:
    'Tìm hiểu về cơ sở vật chất, trang thiết bị hiện đại và môi trường học tập chuyên nghiệp tại Trường Cao đẳng Thông tin và Truyền thông.',
  alternates: {
    canonical: `${SITE_URL}/co-so-vat-chat`,
  },
  openGraph: {
    title: `Cơ sở vật chất - ${SITE_NAME}`,
    description:
      'Cơ sở vật chất, trang thiết bị hiện đại và môi trường học tập chuyên nghiệp của Trường Cao đẳng Thông tin và Truyền thông.',
    url: `${SITE_URL}/co-so-vat-chat`,
    type: 'website',
    locale: 'vi_VN',
    images: [
      { url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME },
    ],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Cơ sở vật chất - ${SITE_NAME}`,
    description: 'Cơ sở vật chất và trang thiết bị hiện đại của nhà trường.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// Structured data (Organization + EducationalOrganization)
const facilitiesJsonLd = [
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
      'Cơ sở vật chất hiện đại, trang thiết bị tiên tiến phục vụ đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực Công nghệ Thông tin và Truyền thông.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    foundingDate: '2010-01-01',
    description:
      'Trường được trang bị cơ sở vật chất hiện đại với các phòng học, phòng thực hành và trang thiết bị tiên tiến phục vụ đào tạo.',
  }
];

export default function FacilitiesPage() {
  return (
    <Layout>
      {/* JSON-LD via shared SEO component */}
      <Seo minimal jsonLd={facilitiesJsonLd as any} />

      {/* Page container */}
      <div className="min-h-screen bg-white">
        <FacilitiesHero />
        <SchoolFacilitiesArticle />
      </div>
    </Layout>
  );
}


