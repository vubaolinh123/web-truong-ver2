import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import Banner from '@/components/layout/Banner';
import NewsSection from '@/components/sections/NewsSection';
import AdmissionTrainingSection from '@/components/sections/AdmissionTrainingSection';
import StatsSection from '@/components/sections/StatsSection';
import FacultiesSection from '@/components/sections/FacultiesSection';
import AchievementsSection from '@/components/sections/AchievementsSection';

export const metadata: Metadata = {
  title: 'Trang chủ - Trường Cao đẳng Thông tin và Truyền thông',
  description: 'Trường Cao đẳng Thông tin và Truyền thông - Đào tạo chuyên sâu Công nghệ Thông tin, Lập trình máy tính, An toàn thông tin. Tuyển sinh 2025 với học bổng hấp dẫn, đảm bảo việc làm sau tốt nghiệp.',
  keywords: [
    'trang chủ cao đẳng thông tin',
    'trường cao đẳng công nghệ thông tin',
    'đào tạo lập trình viên',
    'tuyển sinh cao đẳng 2025',
    'học phí cao đẳng IT',
    'chương trình đào tạo công nghệ',
    'sinh viên công nghệ thông tin',
    'việc làm ngành IT'
  ],
  openGraph: {
    title: 'Trang chủ - Trường Cao đẳng Thông tin và Truyền thông',
    description: 'Khám phá các chương trình đào tạo Công nghệ Thông tin chất lượng cao tại Trường Cao đẳng Thông tin và Truyền thông. Tuyển sinh 2025 đang diễn ra.',
    url: 'https://web-truong-ver2.vercel.app/',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Logo Trường Cao đẳng Thông tin và Truyền thông',
      },
    ],
  },
  alternates: {
    canonical: 'https://web-truong-ver2.vercel.app/',
  },
};

// Structured Data for Educational Organization
const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Trường Cao đẳng Thông tin và Truyền thông",
  "alternateName": "College of Information and Communication Technology",
  "url": "https://web-truong-ver2.vercel.app/",
  "logo": "https://web-truong-ver2.vercel.app/images/logo.png",
  "image": "https://web-truong-ver2.vercel.app/images/logo.png",
  "description": "Trường Cao đẳng Thông tin và Truyền thông - Đào tạo chuyên sâu các ngành Công nghệ Thông tin, Lập trình máy tính, An toàn thông tin với chất lượng cao.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Số 8 Tôn Thất Thuyết",
    "addressLocality": "Cầu Giấy",
    "addressRegion": "Hà Nội",
    "addressCountry": "VN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+84-964-322-215",
    "contactType": "Admissions",
    "availableLanguage": "Vietnamese"
  },
  "sameAs": [
    "https://facebook.com/cic.edu.vn",
    "https://youtube.com/cic",
    "https://twitter.com/cic_edu_vn"
  ],
  "foundingDate": "2010",
  "parentOrganization": {
    "@type": "GovernmentOrganization",
    "name": "Bộ Khoa học và Công nghệ"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Chương trình đào tạo",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Công nghệ Thông tin",
        "description": "Đào tạo chuyên sâu về phát triển phần mềm, lập trình web, mobile"
      },
      {
        "@type": "Course",
        "name": "Lập trình máy tính",
        "description": "Đào tạo lập trình viên chuyên nghiệp với các ngôn ngữ hiện đại"
      },
      {
        "@type": "Course",
        "name": "An toàn thông tin",
        "description": "Đào tạo chuyên gia bảo mật thông tin và an ninh mạng"
      }
    ]
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Layout>
        <Banner />
        <NewsSection />
        <AdmissionTrainingSection />
        <FacultiesSection />
        <StatsSection />
        <AchievementsSection />
      </Layout>
    </>
  );
}
