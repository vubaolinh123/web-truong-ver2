import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with lightweight skeletons (match history page pattern)
const FacilitiesHero = dynamic(() => import('./components/FacilitiesHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const CampusOverview = dynamic(() => import('./components/CampusOverview'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const AcademicFacilities = dynamic(() => import('./components/AcademicFacilities'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const TechnologyInfrastructure = dynamic(() => import('./components/TechnologyInfrastructure'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const StudentServices = dynamic(() => import('./components/StudentServices'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const VirtualTour = dynamic(() => import('./components/VirtualTour'), {
  loading: () => <div className="h-80 bg-slate-100 rounded-2xl shadow-inner animate-pulse" />,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Cơ sở vật chất - ${SITE_NAME}`,
  description:
    'Khám phá cơ sở vật chất hiện đại: phòng học, phòng thí nghiệm CNTT, thư viện, ký túc xá, thể thao và hạ tầng công nghệ số của nhà trường.',
  alternates: {
    canonical: `${SITE_URL}/co-so-vat-chat`,
  },
  openGraph: {
    title: `Cơ sở vật chất - ${SITE_NAME}`,
    description:
      'Tổng quan cơ sở vật chất: lớp học, phòng lab, thư viện, ký túc xá, thể thao và hạ tầng công nghệ hiện đại.',
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
    description: 'Cơ sở vật chất và hạ tầng công nghệ hiện đại phục vụ học tập và sinh hoạt.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// Structured data (Place/Campus + EducationalOrganization with location)
const facilitiesJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${SITE_NAME} - Cơ sở chính`,
    url: `${SITE_URL}/co-so-vat-chat`,
    image: `${SITE_URL}/images/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '36 Cầu Diễn, Phường Phú Diễn, Hà Nội',
      addressLocality: 'Bắc Từ Liêm',
      addressRegion: 'Hà Nội',
      postalCode: '100000',
      addressCountry: 'VN',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '36 Cầu Diễn, Phường Phú Diễn, Hà Nội',
        addressLocality: 'Bắc Từ Liêm',
        addressRegion: 'Hà Nội',
        postalCode: '100000',
        addressCountry: 'VN',
      },
    },
    description:
      'Cơ sở vật chất hiện đại với phòng học thông minh, phòng thí nghiệm CNTT, thư viện số, ký túc xá và khu thể thao.',
  },
];

export default function FacilitiesPage() {
  return (
    <Layout>
      {/* JSON-LD via shared SEO component */}
      <Seo minimal jsonLd={facilitiesJsonLd as any} />

      {/* Page container */}
      <div className="min-h-screen bg-white">
        <FacilitiesHero />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <CampusOverview />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <AcademicFacilities />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <TechnologyInfrastructure />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <StudentServices />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-16">
          <VirtualTour />
        </section>
      </div>
    </Layout>
  );
}

