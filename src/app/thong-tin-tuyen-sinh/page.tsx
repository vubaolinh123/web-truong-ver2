import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with skeletons (consistent with other pages)
const AdmissionsHero = dynamic(() => import('./components/AdmissionsHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const AdmissionRequirements = dynamic(() => import('./components/AdmissionRequirements'), {
  loading: () => <div className="h-80 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const AdmissionsStats = dynamic(() => import('./components/AdmissionsStats'), {
  loading: () => <div className="h-44 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const Programs = dynamic(() => import('./components/Programs'), {
  loading: () => <div className="h-80 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const ApplicationProcess = dynamic(() => import('./components/ApplicationProcess'), {
  loading: () => <div className="h-80 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const Scholarships = dynamic(() => import('./components/Scholarships'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const AdmissionsFAQ = dynamic(() => import('./components/AdmissionsFAQ'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Thông tin tuyển sinh - ${SITE_NAME}`,
  description:
    'Thông tin tuyển sinh: điều kiện, ngành học, quy trình đăng ký trực tuyến, học bổng và thời hạn quan trọng dành cho thí sinh năm nay.',
  alternates: { canonical: `${SITE_URL}/thong-tin-tuyen-sinh` },
  openGraph: {
    title: `Thông tin tuyển sinh - ${SITE_NAME}`,
    description:
      'Tổng hợp điều kiện xét tuyển, chương trình đào tạo, quy trình đăng ký online, học bổng và các mốc thời gian quan trọng.',
    url: `${SITE_URL}/thong-tin-tuyen-sinh`,
    type: 'website',
    locale: 'vi_VN',
    images: [{ url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME }],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Thông tin tuyển sinh - ${SITE_NAME}`,
    description: 'Tổng hợp điều kiện xét tuyển, ngành học, quy trình online, học bổng và deadline cho thí sinh.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// JSON-LD (EducationalOrganization with admissions details)
const admissionsJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    url: `${SITE_URL}/thong-tin-tuyen-sinh`,
    logo: `${SITE_URL}/images/logo.png`,
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', name: 'Cao đẳng', educationalLevel: 'Postsecondary' }
    ],
    acceptsReservations: false,
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+84-24-3123-4568', contactType: 'admissions', areaServed: 'VN', availableLanguage: ['Vietnamese'] }
    ],
    department: [
      { '@type': 'CollegeOrUniversity', name: SITE_NAME, sameAs: SITE_URL }
    ],
    description: 'Thông tin tuyển sinh: điều kiện, quy trình, học bổng, thời hạn và cơ hội nghề nghiệp sau tốt nghiệp.'
  }
];

export default function AdmissionsPage() {
  return (
    <Layout>
      <Seo minimal jsonLd={admissionsJsonLd as any} />
      <div className="min-h-screen bg-white">
        <AdmissionsHero />
        <AdmissionsStats />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <AdmissionRequirements />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <Programs />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <ApplicationProcess />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <Scholarships />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-16">
          <AdmissionsFAQ />
        </section>
      </div>
    </Layout>
  );
}

