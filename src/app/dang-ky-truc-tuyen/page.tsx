import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with skeletons
const RegistrationHero = dynamic(() => import('./components/RegistrationHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const RegistrationForm = dynamic(() => import('./components/RegistrationForm'), {
  loading: () => <div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const RegistrationInfo = dynamic(() => import('./components/RegistrationInfo'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const RegistrationFAQ = dynamic(() => import('./components/RegistrationFAQ'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Đăng ký trực tuyến - ${SITE_NAME}`,
  description:
    'Đăng ký xét tuyển trực tuyến: điền thông tin, chọn ngành học, xác nhận liên hệ. Hỗ trợ email/điện thoại, hồ sơ online nhanh chóng, bảo mật thông tin.',
  alternates: { canonical: `${SITE_URL}/dang-ky-truc-tuyen` },
  openGraph: {
    title: `Đăng ký trực tuyến - ${SITE_NAME}`,
    description:
      'Biểu mẫu đăng ký trực tuyến: email, họ tên, điện thoại, ngành học. Hỗ trợ xác minh và tư vấn nhanh chóng cho thí sinh.',
    url: `${SITE_URL}/dang-ky-truc-tuyen`,
    type: 'website',
    locale: 'vi_VN',
    images: [{ url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME }],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Đăng ký trực tuyến - ${SITE_NAME}`,
    description: 'Biểu mẫu đăng ký trực tuyến với xác thực email/điện thoại và lựa chọn ngành học.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// JSON-LD: Registration process
const registrationJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollegeOrUniversity',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'RegisterAction',
      target: `${SITE_URL}/dang-ky-truc-tuyen`,
    },
    description: 'Biểu mẫu đăng ký xét tuyển trực tuyến dành cho thí sinh mới.',
  },
];

export default function OnlineRegistrationPage() {
  return (
    <Layout>
      <Seo minimal jsonLd={registrationJsonLd as any} />
      <div className="min-h-screen bg-white">
        <RegistrationHero />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <RegistrationForm />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <RegistrationInfo />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-16">
          <RegistrationFAQ />
        </section>
      </div>
    </Layout>
  );
}

