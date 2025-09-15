import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with skeletons
const ContactHero = dynamic(() => import('./components/ContactHero'), {
  loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const ContactInfo = dynamic(() => import('./components/ContactInfo'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const ContactForm = dynamic(() => import('./components/ContactForm'), {
  loading: () => <div className="h-80 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const LocationMap = dynamic(() => import('./components/LocationMap'), {
  loading: () => <div className="h-80 bg-slate-100 rounded-2xl shadow-inner animate-pulse" />,
});
const DepartmentContacts = dynamic(() => import('./components/DepartmentContacts'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});
const FAQ = dynamic(() => import('./components/FAQ'), {
  loading: () => <div className="h-64 bg-white rounded-2xl shadow-lg animate-pulse" />,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
  title: `Liên hệ - ${SITE_NAME}`,
  description:
    'Liên hệ nhà trường: địa chỉ, điện thoại, email, giờ làm việc và biểu mẫu trực tuyến. Hỗ trợ tuyển sinh và giải đáp thông tin nhanh chóng.',
  alternates: { canonical: `${SITE_URL}/lien-he` },
  openGraph: {
    title: `Liên hệ - ${SITE_NAME}`,
    description:
      'Thông tin liên hệ chính thức: địa chỉ, số điện thoại, email, giờ làm việc và biểu mẫu hỗ trợ trực tuyến.',
    url: `${SITE_URL}/lien-he`,
    type: 'website',
    locale: 'vi_VN',
    images: [{ url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME }],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Liên hệ - ${SITE_NAME}`,
    description: 'Kênh liên hệ chính thức của nhà trường: địa chỉ, điện thoại, email và giờ làm việc.',
    images: [`${SITE_URL}/images/logo.png`],
  },
};

// JSON-LD (Organization + LocalBusiness-like contact details)
const contactJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+84-24-3123-4567', contactType: 'customer service', areaServed: 'VN', availableLanguage: ['Vietnamese', 'English'] },
      { '@type': 'ContactPoint', telephone: '+84-24-3123-4568', contactType: 'admissions', areaServed: 'VN', availableLanguage: ['Vietnamese'] },
    ],
    sameAs: [
      process.env.NEXT_PUBLIC_FACEBOOK_PAGE || 'https://facebook.com/vcic.edu.vn',
      'https://youtube.com/c/vcicedu',
      'https://linkedin.com/school/vcic-edu-vn'
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: `${SITE_URL}/lien-he`,
    image: `${SITE_URL}/images/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '36 Cầu Diễn, Phường Phú Diễn, Hà Nội',
      addressLocality: 'Bắc Từ Liêm',
      addressRegion: 'Hà Nội',
      postalCode: '100000',
      addressCountry: 'VN',
    },
    telephone: '+84-24-3123-4567',
    openingHours: 'Mo-Fr 08:00-17:00',
  }
];

export default function ContactPage() {
  return (
    <Layout>
      <Seo minimal jsonLd={contactJsonLd as any} />
      <div className="min-h-screen bg-white">
        <ContactHero />
        <section className="w-[92%] md:w-[80%] mx-auto py-12 md:py-16">
          <ContactInfo />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <ContactForm />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <LocationMap />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-12">
          <DepartmentContacts />
        </section>
        <section className="w-[92%] md:w-[80%] mx-auto py-6 md:py-16">
          <FAQ />
        </section>
      </div>
    </Layout>
  );
}

