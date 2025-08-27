import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

const ProgramsHero = dynamic(() => import('../components/ProgramsHero'), { loading: () => <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" /> });
const DesignProgramTabs = dynamic(() => import('./tabs/DesignProgramTabs'), { loading: () => <div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /> });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Thiết kế đồ họa & Truyền thông số - ${SITE_NAME}`,
  description: 'Chương trình Thiết kế đồ họa & Truyền thông số: tổng quan, nội dung đào tạo, nghề nghiệp, tiến độ, đối tượng, tuyển sinh, học phí.',
  alternates: { canonical: `${SITE_URL}/cac-nganh-nghe-dao-tao/thiet-ke-do-hoa-truyen-thong-so` },
};

const jsonLd = [{ '@context': 'https://schema.org', '@type': 'Course', name: 'Thiết kế đồ họa & Truyền thông số', provider: { '@type': 'EducationalOrganization', name: SITE_NAME, url: SITE_URL }, url: `${SITE_URL}/cac-nganh-nghe-dao-tao/thiet-ke-do-hoa-truyen-thong-so`, description: 'Chương trình thiết kế số hiện đại gắn nhu cầu thị trường.' }];

export default function DesignPage() {
  return (
    <Layout>
      <Seo minimal jsonLd={jsonLd as any} />
      <div className="min-h-screen bg-white">
        <ProgramsHero />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <DesignProgramTabs />
        </section>
      </div>
    </Layout>
  );
}

