import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

const ProgramsHero = dynamic(() => import('../cac-nganh-nghe-dao-tao/components/ProgramsHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const TrainingOverviewContent = dynamic(() => import('./TrainingOverviewContent'), {
  loading: () => <div className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16"><div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /></div>,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Chương trình đào tạo - ${SITE_NAME}`,
  description: 'Tổng quan toàn diện về triết lý, phương pháp đào tạo, hợp tác doanh nghiệp, đánh giá & đảm bảo chất lượng, và chuẩn đầu ra tại Trường Cao đẳng Thông tin và Truyền thông.',
  alternates: { canonical: `${SITE_URL}/chuong-trinh-dao-tao` },
  openGraph: {
    title: `Chương trình đào tạo - ${SITE_NAME}`,
    description: 'Tổng quan toàn diện về triết lý và phương pháp đào tạo tại trường, với mô hình học theo dự án, hợp tác doanh nghiệp và đảm bảo chất lượng.',
    url: `${SITE_URL}/chuong-trinh-dao-tao`,
    type: 'website',
    locale: 'vi_VN',
    images: [{ url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME }],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Chương trình đào tạo - ${SITE_NAME}`,
    description: 'Tổng quan triết lý & phương pháp đào tạo, hợp tác doanh nghiệp và chuẩn đầu ra.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: 'Chương trình đào tạo',
    provider: { '@type': 'EducationalOrganization', name: SITE_NAME, url: SITE_URL },
    programType: 'CollegeProgram',
    educationalCredentialAwarded: 'Cao đẳng',
    url: `${SITE_URL}/chuong-trinh-dao-tao`,
    description: 'Triết lý, phương pháp và đảm bảo chất lượng của chương trình đào tạo.',
  },
];

export default function TrainingProgramsPage() {
  return (
    <Layout>
      <Seo minimal jsonLd={jsonLd as any} />
      <div className="min-h-screen bg-white">
        <ProgramsHero />
        <TrainingOverviewContent />
      </div>
    </Layout>
  );
}

