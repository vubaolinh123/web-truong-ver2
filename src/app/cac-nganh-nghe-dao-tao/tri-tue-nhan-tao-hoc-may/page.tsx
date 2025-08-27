import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

const ProgramsHero = dynamic(() => import('../components/ProgramsHero'), { loading: () => <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" /> });
const AIProgramTabs = dynamic(() => import('./tabs/AIProgramTabs'), { loading: () => <div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /> });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Trí tuệ nhân tạo & Học máy - ${SITE_NAME}`,
  description: 'Chương trình Trí tuệ nhân tạo & Học máy: tổng quan, nội dung, nghề nghiệp, tiến độ, đối tượng, tuyển sinh, học phí.',
  alternates: { canonical: `${SITE_URL}/cac-nganh-nghe-dao-tao/tri-tue-nhan-tao-hoc-may` },
};

const jsonLd = [{ '@context': 'https://schema.org', '@type': 'Course', name: 'Trí tuệ nhân tạo & Học máy', provider: { '@type': 'EducationalOrganization', name: SITE_NAME, url: SITE_URL }, url: `${SITE_URL}/cac-nganh-nghe-dao-tao/tri-tue-nhan-tao-hoc-may`, description: 'Chương trình AI/ML ứng dụng với dự án thực tế.' }];

export default function AIPage() {
  return (
    <Layout>
      <Seo minimal jsonLd={jsonLd as any} />
      <div className="min-h-screen bg-white">
        <ProgramsHero />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <AIProgramTabs />
        </section>
      </div>
    </Layout>
  );
}

