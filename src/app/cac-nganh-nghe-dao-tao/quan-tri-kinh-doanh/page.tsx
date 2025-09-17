import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';
import SingleProgramArticle from '../components/SingleProgramArticle';


const ProgramsHero = dynamic(() => import('../components/ProgramsHero'), { loading: () => <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" /> });


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Quản trị kinh doanh - ${SITE_NAME}`,
  description: 'Chương trình Quản trị kinh doanh: quản trị vận hành, marketing, phân tích dữ liệu và kỹ năng kinh doanh số.',
  alternates: { canonical: `${SITE_URL}/cac-nganh-nghe-dao-tao/quan-tri-kinh-doanh` },
};

const jsonLd = [{ '@context': 'https://schema.org', '@type': 'Course', name: 'Quản trị kinh doanh', provider: { '@type': 'EducationalOrganization', name: SITE_NAME, url: SITE_URL }, url: `${SITE_URL}/cac-nganh-nghe-dao-tao/quan-tri-kinh-doanh`, description: 'Chương trình kinh doanh số và vận hành hiện đại.' }];

export default function BizPage() {
  return (
    <Layout>
      <Seo minimal jsonLd={jsonLd as any} />
      <div className="min-h-screen bg-white">
        <ProgramsHero />
        <SingleProgramArticle categorySlug="quan-tri-kinh-doanh" />
      </div>
    </Layout>
  );
}

