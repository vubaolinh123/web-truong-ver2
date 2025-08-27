import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

const ProgramsHero = dynamic(() => import('../components/ProgramsHero'), { loading: () => <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" /> });
const EcommerceProgramTabs = dynamic(() => import('./tabs/EcommerceProgramTabs'), { loading: () => <div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /> });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Thương mại điện tử - ${SITE_NAME}`,
  description: 'Chương trình Thương mại điện tử: tổng quan, nội dung đào tạo, nghề nghiệp, tiến độ, đối tượng, tuyển sinh, học phí.',
  alternates: { canonical: `${SITE_URL}/cac-nganh-nghe-dao-tao/thuong-mai-dien-tu` },
};

const jsonLd = [{ '@context': 'https://schema.org', '@type': 'Course', name: 'Thương mại điện tử', provider: { '@type': 'EducationalOrganization', name: SITE_NAME, url: SITE_URL }, url: `${SITE_URL}/cac-nganh-nghe-dao-tao/thuong-mai-dien-tu`, description: 'Chương trình TMĐT kết hợp CNTT và kinh doanh số.' }];

export default function EcommercePage() {
  return (
    <Layout>
      <Seo minimal jsonLd={jsonLd as any} />
      <div className="min-h-screen bg-white">
        <ProgramsHero />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <EcommerceProgramTabs />
        </section>
      </div>
    </Layout>
  );
}

