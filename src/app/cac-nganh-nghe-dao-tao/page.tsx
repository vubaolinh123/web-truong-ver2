import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

const ProgramsHero = dynamic(() => import('./components/ProgramsHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const ProgramsStats = dynamic(() => import('./components/ProgramsStats'), {
  loading: () => <div className="h-44 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const ProgramsGrid = dynamic(() => import('./components/ProgramsGrid'), {
  loading: () => <div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const IndustryPartnerships = dynamic(() => import('./components/IndustryPartnerships'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const CareerOutlook = dynamic(() => import('./components/CareerOutlook'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Các ngành nghề đào tạo - ${SITE_NAME}`,
  description:
    'Tổng quan các ngành đào tạo: nội dung chương trình, cơ hội nghề nghiệp, nhu cầu thị trường và mức lương tham khảo dành cho sinh viên.',
  alternates: { canonical: `${SITE_URL}/cac-nganh-nghe-dao-tao` },
  openGraph: {
    title: `Các ngành nghề đào tạo - ${SITE_NAME}`,
    description:
      'Danh mục ngành đào tạo với mô tả chi tiết, lộ trình học, cơ hội nghề nghiệp và hợp tác doanh nghiệp.',
    url: `${SITE_URL}/cac-nganh-nghe-dao-tao`,
    type: 'website',
    locale: 'vi_VN',
    images: [{ url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME }],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Các ngành nghề đào tạo - ${SITE_NAME}`,
    description: 'Danh mục ngành đào tạo với mô tả chi tiết và cơ hội nghề nghiệp.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

const programsJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    url: `${SITE_URL}/cac-nganh-nghe-dao-tao`,
    logo: `${SITE_URL}/images/logo.png`,
    hasCourse: [
      { '@type': 'Course', name: 'Công nghệ thông tin' },
      { '@type': 'Course', name: 'Lập trình máy tính' },
      { '@type': 'Course', name: 'Công nghệ kỹ thuật cơ khí' },
      { '@type': 'Course', name: 'Quản trị kinh doanh' },
      { '@type': 'Course', name: 'Công nghệ in' },
      { '@type': 'Course', name: 'Công nghệ và đổi mới sáng tạo' },
    ],
  },
];

export default function ProgramsOverviewPage() {
  return (
    <Layout>
      <Seo minimal jsonLd={programsJsonLd as any} />
      <div className="min-h-screen bg-white">
        <ProgramsHero />
        <ProgramsStats />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <ProgramsGrid />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <IndustryPartnerships />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-16">
          <CareerOutlook />
        </section>
      </div>
    </Layout>
  );
}

