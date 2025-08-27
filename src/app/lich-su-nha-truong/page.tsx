import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with lightweight skeletons
const HistoryHero = dynamic(() => import('./components/HistoryHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const Timeline = dynamic(() => import('./components/Timeline'), {
  loading: () => <div className="h-80 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const Achievements = dynamic(() => import('./components/Achievements'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const Leadership = dynamic(() => import('./components/Leadership'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const Gallery = dynamic(() => import('./components/Gallery'), {
  loading: () => <div className="h-64 bg-slate-100 rounded-2xl shadow-inner animate-pulse" />,
});
const StatsAndVision = dynamic(() => import('./components/StatsAndVision'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Lịch sử nhà trường - ${SITE_NAME}`,
  description:
    'Tìm hiểu lịch sử hình thành và phát triển của Trường Cao đẳng Thông tin và Truyền thông: cột mốc, thành tựu và tầm nhìn tương lai.',
  alternates: {
    canonical: `${SITE_URL}/lich-su-nha-truong`,
  },
  openGraph: {
    title: `Lịch sử nhà trường - ${SITE_NAME}`,
    description:
      'Lịch sử hình thành và phát triển của Trường Cao đẳng Thông tin và Truyền thông với các cột mốc, thành tựu và tầm nhìn tương lai.',
    url: `${SITE_URL}/lich-su-nha-truong`,
    type: 'website',
    locale: 'vi_VN',
    images: [
      { url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME },
    ],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Lịch sử nhà trường - ${SITE_NAME}`,
    description: 'Lịch sử, thành tựu và tầm nhìn của nhà trường.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// Structured data (Organization + EducationalOrganization)
const historyJsonLd = [
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
      'Lịch sử hình thành, phát triển và đóng góp của trường trong lĩnh vực Công nghệ Thông tin và Truyền thông tại Việt Nam.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    foundingDate: '2010-01-01',
    description:
      'Trường được thành lập năm 2010 với sứ mệnh đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực CNTT và Truyền thông.',
  }
];

export default function HistoryPage() {
  return (
    <Layout>
      {/* JSON-LD via shared SEO component */}
      <Seo minimal jsonLd={historyJsonLd as any} />

      {/* Page container */}
      <div className="min-h-screen bg-white">
        <HistoryHero />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <Timeline />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <Achievements />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <Leadership />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <Gallery />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-16">
          <StatsAndVision />
        </section>
      </div>
    </Layout>
  );
}

