import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';
import ProgramArticlesSection from '../components/ProgramArticlesSection';


const ProgramsHero = dynamic(() => import('../components/ProgramsHero'), { loading: () => <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" /> });
const PrintProgramTabs = dynamic(() => import('./tabs/PrintProgramTabs'), { loading: () => <div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /> });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Công nghệ in - ${SITE_NAME}`,
  description: 'Chương trình Công nghệ in: quy trình in offset/kỹ thuật số, tiền kỳ, quản lý màu, vật liệu và vận hành thiết bị in.',
  alternates: { canonical: `${SITE_URL}/cac-nganh-nghe-dao-tao/cong-nghe-in` },
};

const jsonLd = [{ '@context': 'https://schema.org', '@type': 'Course', name: 'Công nghệ in', provider: { '@type': 'EducationalOrganization', name: SITE_NAME, url: SITE_URL }, url: `${SITE_URL}/cac-nganh-nghe-dao-tao/cong-nghe-in`, description: 'Chương trình công nghệ in với thực hành dây chuyền.' }];

export default function PrintPage() {
  return (
    <Layout>
      <Seo minimal jsonLd={jsonLd as any} />
      <div className="min-h-screen bg-white">
        <ProgramsHero />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <PrintProgramTabs />
        </section>
        <ProgramArticlesSection categorySlug="cong-nghe-in" title="Công nghệ in" />
      </div>
    </Layout>
  );
}

