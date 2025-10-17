import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with lightweight skeletons
const DigitalTechnologyHero = dynamic(() => import('./components/DigitalTechnologyHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const DigitalTechnologyArticle = dynamic(() => import('./components/DigitalTechnologyArticle'), {
  loading: () => <div className="w-[92%] md:w-[80%] mx-auto py-10"><div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /></div>,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Công nghệ số - ${SITE_NAME}`,
  description:
    'Khám phá các công nghệ số tiên tiến, ứng dụng và giải pháp chuyển đổi số tại Trường Cao đẳng Thông tin và Truyền thông.',
  alternates: {
    canonical: `${SITE_URL}/cong-nghe-so`,
  },
  openGraph: {
    title: `Công nghệ số - ${SITE_NAME}`,
    description:
      'Công nghệ số - Ứng dụng công nghệ và chuyển đổi số tại Trường Cao đẳng Thông tin và Truyền thông.',
    url: `${SITE_URL}/cong-nghe-so`,
    type: 'website',
    locale: 'vi_VN',
    images: [
      { url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME },
    ],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Công nghệ số - ${SITE_NAME}`,
    description: 'Công nghệ số - Ứng dụng công nghệ và chuyển đổi số của nhà trường.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// Structured data (Organization + EducationalOrganization)
const digitalTechnologyJsonLd = [
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
      'Công nghệ số - Các công nghệ số tiên tiến, ứng dụng và giải pháp chuyển đổi số tại Trường Cao đẳng Thông tin và Truyền thông.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    foundingDate: '2010-01-01',
    description:
      'Thông tin về công nghệ số, ứng dụng thông minh và giải pháp chuyển đổi số tại Trường Cao đẳng Thông tin và Truyền thông.',
  }
];

export default function DigitalTechnologyPage() {
  return (
    <Layout>
      {/* JSON-LD via shared SEO component */}
      <Seo minimal jsonLd={digitalTechnologyJsonLd as any} />

      {/* Page container */}
      <div className="min-h-screen bg-white">
        <DigitalTechnologyHero />
        <DigitalTechnologyArticle />
      </div>
    </Layout>
  );
}

