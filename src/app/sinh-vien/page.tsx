import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with lightweight skeletons
const StudentsHero = dynamic(() => import('./components/StudentsHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const StudentsArticle = dynamic(() => import('./components/StudentsArticle'), {
  loading: () => <div className="w-[92%] md:w-[80%] mx-auto py-10"><div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /></div>,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Sinh viên - ${SITE_NAME}`,
  description:
    'Thông tin dành cho sinh viên về hoạt động học tập, đời sống và các dịch vụ hỗ trợ tại Trường Cao đẳng Thông tin và Truyền thông.',
  alternates: {
    canonical: `${SITE_URL}/sinh-vien`,
  },
  openGraph: {
    title: `Sinh viên - ${SITE_NAME}`,
    description:
      'Sinh viên - Thông tin về hoạt động học tập, đời sống sinh viên và dịch vụ hỗ trợ tại Trường Cao đẳng Thông tin và Truyền thông.',
    url: `${SITE_URL}/sinh-vien`,
    type: 'website',
    locale: 'vi_VN',
    images: [
      { url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME },
    ],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Sinh viên - ${SITE_NAME}`,
    description: 'Sinh viên - Thông tin về hoạt động học tập và đời sống sinh viên của nhà trường.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// Structured data (Organization + EducationalOrganization)
const studentsJsonLd = [
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
      'Sinh viên - Thông tin dành cho sinh viên về hoạt động học tập, đời sống sinh viên và các dịch vụ hỗ trợ tại Trường Cao đẳng Thông tin và Truyền thông.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    foundingDate: '2010-01-01',
    description:
      'Thông tin chi tiết về hoạt động học tập, đời sống sinh viên, câu lạc bộ, hoạt động ngoại khóa và các dịch vụ hỗ trợ sinh viên tại Trường Cao đẳng Thông tin và Truyền thông.',
  }
];

export default function StudentsPage() {
  return (
    <Layout>
      {/* JSON-LD via shared SEO component */}
      <Seo minimal jsonLd={studentsJsonLd as any} />

      {/* Page container */}
      <div className="min-h-screen bg-white">
        <StudentsHero />
        <StudentsArticle />
      </div>
    </Layout>
  );
}

