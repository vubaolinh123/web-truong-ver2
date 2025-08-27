import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

const ProgramsHero = dynamic(() => import('../components/ProgramsHero'), { loading: () => <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" /> });
const MechProgramTabs = dynamic(() => import('./tabs/MechProgramTabs'), { loading: () => <div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" /> });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Công nghệ kỹ thuật cơ khí - ${SITE_NAME}`,
  description: 'Chương trình Công nghệ kỹ thuật cơ khí: thiết kế, chế tạo, vận hành, bảo trì máy móc và dây chuyền cơ khí hiện đại.',
  alternates: { canonical: `${SITE_URL}/cac-nganh-nghe-dao-tao/cong-nghe-ky-thuat-co-khi` },
};

const jsonLd = [{ '@context': 'https://schema.org', '@type': 'Course', name: 'Công nghệ kỹ thuật cơ khí', provider: { '@type': 'EducationalOrganization', name: SITE_NAME, url: SITE_URL }, url: `${SITE_URL}/cac-nganh-nghe-dao-tao/cong-nghe-ky-thuat-co-khi`, description: 'Chương trình cơ khí với thực hành xưởng và CAD/CAM.' }];

export default function MechPage() {
  return (
    <Layout>
      <Seo minimal jsonLd={jsonLd as any} />
      <div className="min-h-screen bg-white">
        <ProgramsHero />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <MechProgramTabs />
        </section>
      </div>
    </Layout>
  );
}

