import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

const ProgramsHero = dynamic(() => import('../components/ProgramsHero'), {
  loading: () => <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const InfoSecProgramTabs = dynamic(() => import('./tabs/InfoSecProgramTabs'), {
  loading: () => <div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" />,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `An toàn thông tin - ${SITE_NAME}`,
  description: 'Chương trình An toàn thông tin: tổng quan, nội dung đào tạo, cơ hội nghề nghiệp, tiến độ, đối tượng, hình thức tuyển sinh, học phí.',
  alternates: { canonical: `${SITE_URL}/cac-nganh-nghe-dao-tao/an-toan-thong-tin` },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'An toàn thông tin',
    provider: { '@type': 'EducationalOrganization', name: SITE_NAME, url: SITE_URL },
    url: `${SITE_URL}/cac-nganh-nghe-dao-tao/an-toan-thong-tin`,
    description: 'Chương trình đào tạo An toàn thông tin với phòng lab và mô phỏng sự cố thực tế.',
  },
];

export default function InfoSecPage() {
  return (
    <Layout>
      <Seo minimal jsonLd={jsonLd as any} />
      <div className="min-h-screen bg-white">
        <ProgramsHero />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <InfoSecProgramTabs />
        </section>
      </div>
    </Layout>
  );
}

