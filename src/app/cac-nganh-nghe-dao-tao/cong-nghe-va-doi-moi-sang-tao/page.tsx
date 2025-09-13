import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';
import ProgramArticlesSection from '../components/ProgramArticlesSection';


const ProgramsHero = dynamic(() => import('../components/ProgramsHero'), { loading: () => <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" /> });
const InnovProgramTabs = dynamic(() => import('./tabs/InnovProgramTabs'), { loading: () => <div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /> });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Công nghệ và đổi mới sáng tạo - ${SITE_NAME}`,
  description: 'Chương trình Công nghệ và đổi mới sáng tạo: công nghệ mới, khởi nghiệp, thiết kế sản phẩm và quản trị đổi mới.',
  alternates: { canonical: `${SITE_URL}/cac-nganh-nghe-dao-tao/cong-nghe-va-doi-moi-sang-tao` },
};

const jsonLd = [{ '@context': 'https://schema.org', '@type': 'Course', name: 'Công nghệ và đổi mới sáng tạo', provider: { '@type': 'EducationalOrganization', name: SITE_NAME, url: SITE_URL }, url: `${SITE_URL}/cac-nganh-nghe-dao-tao/cong-nghe-va-doi-moi-sang-tao`, description: 'Chương trình đổi mới sáng tạo và sản phẩm.' }];

export default function InnovPage() {
  return (
    <Layout>
      <Seo minimal jsonLd={jsonLd as any} />
      <div className="min-h-screen bg-white">
        <ProgramsHero />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <InnovProgramTabs />
        </section>
        <ProgramArticlesSection categorySlug="cong-nghe-va-doi-moi-sang-tao" title="Công nghệ và đổi mới sáng tạo" />
      </div>
    </Layout>
  );
}

