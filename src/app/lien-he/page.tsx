import type { Metadata } from 'next';
import ContactPageClient from './components/ContactPageClient';

// Get environment variables
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Trường Cao đẳng Thông tin và Truyền thông - Đào tạo chuyên sâu các ngành Công nghệ Thông tin';

// SEO Metadata
export const metadata: Metadata = {
  title: `Liên hệ - ${siteName}`,
  description: `Liên hệ với ${siteName}. Địa chỉ: 36 Cầu Diễn, Bắc Từ Liêm, Hà Nội. Hotline tư vấn tuyển sinh, email hỗ trợ, giờ làm việc và form liên hệ trực tuyến.`,
  keywords: [
    'liên hệ trường cao đẳng thông tin truyền thông',
    'địa chỉ 36 Cầu Diễn Hà Nội',
    'hotline tuyển sinh VCIC',
    'email liên hệ trường',
    'giờ làm việc phòng ban',
    'form liên hệ trực tuyến',
    'tư vấn tuyển sinh 2025',
    'hỗ trợ sinh viên',
    'VCIC Hà Nội',
    'cao đẳng CNTT Bắc Từ Liêm',
    'trường công nghệ thông tin',
    'đào tạo IT chất lượng'
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  openGraph: {
    title: `Liên hệ - ${siteName}`,
    description: 'Liên hệ với chúng tôi để được tư vấn về các chương trình đào tạo, tuyển sinh và các dịch vụ hỗ trợ sinh viên. Địa chỉ: 36 Cầu Diễn, Bắc Từ Liêm, Hà Nội.',
    type: 'website',
    locale: 'vi_VN',
    url: `${siteUrl}/lien-he`,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/images/contact-banner.jpg`,
        width: 1200,
        height: 630,
        alt: `Liên hệ ${siteName} - 36 Cầu Diễn, Hà Nội`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Liên hệ - ${siteName}`,
    description: 'Liên hệ tư vấn tuyển sinh và hỗ trợ sinh viên. Địa chỉ: 36 Cầu Diễn, Bắc Từ Liêm, Hà Nội.',
    images: [`${siteUrl}/images/contact-banner.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/lien-he`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Structured Data for Organization
const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: siteName,
  alternateName: 'VCIC - College of Information and Communication Technology',
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  description: siteDescription,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '36 Cầu Diễn, Phường Minh Khai',
    addressLocality: 'Quận Bắc Từ Liêm',
    addressRegion: 'Hà Nội',
    postalCode: '100000',
    addressCountry: 'VN'
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+84-24-3123-4567',
      contactType: 'customer service',
      availableLanguage: ['Vietnamese', 'English'],
      areaServed: 'VN'
    },
    {
      '@type': 'ContactPoint',
      telephone: '+84-24-3123-4568',
      contactType: 'admissions',
      availableLanguage: ['Vietnamese'],
      areaServed: 'VN'
    }
  ],
  sameAs: [
    process.env.NEXT_PUBLIC_FACEBOOK_PAGE || 'https://facebook.com/vcic.edu.vn',
    'https://youtube.com/c/vcicedu',
    'https://linkedin.com/school/vcic-edu-vn'
  ],
  foundingDate: '2010',
  email: 'info@vcic.edu.vn',
  telephone: '+84-24-3123-4567',
  faxNumber: '+84-24-3123-4569'
};

export default function ContactPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      
      {/* Main Contact Page Content */}
      <ContactPageClient />
    </>
  );
}
