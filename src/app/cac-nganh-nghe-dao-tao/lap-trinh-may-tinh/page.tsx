import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

const ProgramsHero = dynamic(() => import('../components/ProgramsHero'), { loading: () => <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" /> });
const CSProgramTabs = dynamic(() => import('./tabs/CSProgramTabs'), { loading: () => <div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /> });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Lập trình máy tính - ${SITE_NAME}`,
  description: 'Chương trình Lập trình máy tính: cấu trúc dữ liệu & giải thuật, lập trình hướng đối tượng, cơ sở dữ liệu, phát triển phần mềm hiện đại.',
  alternates: { canonical: `${SITE_URL}/cac-nganh-nghe-dao-tao/lap-trinh-may-tinh` },
};

const jsonLd = [{ '@context': 'https://schema.org', '@type': 'Course', name: 'Lập trình máy tính', provider: { '@type': 'EducationalOrganization', name: SITE_NAME, url: SITE_URL }, url: `${SITE_URL}/cac-nganh-nghe-dao-tao/lap-trinh-may-tinh`, description: 'Chương trình lập trình hiện đại với thực hành dự án.' }];

export default function CSPage() {
  return (
    <Layout>
      <Seo minimal jsonLd={jsonLd as any} />
      <div className="min-h-screen bg-white">
        <ProgramsHero />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <CSProgramTabs />
        </section>
      </div>
    </Layout>
  );
}

