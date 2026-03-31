import type { Metadata } from "next";
import { Manrope, Fira_Code } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/providers/StoreProvider";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Trường Cao đẳng Thông tin và Truyền thông - Đào tạo Công nghệ Thông tin chất lượng cao",
    template: "%s | Trường Cao đẳng Thông tin và Truyền thông"
  },
  icons: {
    icon: [
      {
        url: '/images/logo.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/images/logo.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  description: "Trường Cao đẳng Thông tin và Truyền thông - Đào tạo chuyên sâu các ngành Công nghệ Thông tin, Lập trình máy tính, An toàn thông tin. Tuyển sinh 2025 với nhiều ưu đãi hấp dẫn.",
  keywords: [
    "cao đẳng thông tin truyền thông",
    "đào tạo công nghệ thông tin",
    "tuyển sinh cao đẳng 2025",
    "lập trình máy tính",
    "an toàn thông tin",
    "thiết kế đồ họa",
    "quản trị mạng",
    "trường cao đẳng chất lượng",
    "đào tạo IT Việt Nam",
    "học bổng sinh viên",
    "việc làm sau tốt nghiệp",
    "chương trình liên kết quốc tế"
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'vi-VN': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: SITE_URL,
    title: 'Trường Cao đẳng Thông tin và Truyền thông - Đào tạo Công nghệ Thông tin chất lượng cao',
    description: 'Trường Cao đẳng Thông tin và Truyền thông - Đào tạo chuyên sâu các ngành Công nghệ Thông tin, Lập trình máy tính, An toàn thông tin. Tuyển sinh 2025 với nhiều ưu đãi hấp dẫn.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: `Logo ${SITE_NAME}`,
      },
    ],
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trường Cao đẳng Thông tin và Truyền thông - Đào tạo Công nghệ Thông tin chất lượng cao',
    description: 'Trường Cao đẳng Thông tin và Truyền thông - Đào tạo chuyên sâu các ngành Công nghệ Thông tin, Lập trình máy tính, An toàn thông tin.',
    images: ['/images/logo.png'],
    creator: '@vcic_edu_vn',
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
  verification: {
    // ═══════════════════════════════════════════════════════════════
    // HƯỚNG DẪN KHAI BÁO GOOGLE SEARCH CONSOLE:
    //
    // 1. Truy cập: https://search.google.com/search-console/about
    // 2. Click "Start Now" → đăng nhập Google
    // 3. Chọn "URL prefix" → nhập: https://www.vcic.edu.vn
    // 4. Chọn phương pháp xác minh "HTML tag"
    // 5. Google cho mã: <meta name="google-site-verification" content="ABC123..." />
    // 6. Copy giá trị "ABC123..." paste thay thế bên dưới
    // 7. Deploy website → Quay lại Google Search Console → Click "Verify"
    // 8. Sau khi verify → Vào Sitemaps → Submit: https://www.vcic.edu.vn/sitemap.xml
    // ═══════════════════════════════════════════════════════════════
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Google Fonts preconnect for better performance */}
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link rel="icon" href="/images/logo.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/images/logo.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" sizes="180x180" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileImage" content="/images/logo.png" />
        <meta name="msapplication-TileColor" content="#1e40af" />

        {/* ══════════════════════════════════════════════════════════
            Global JSON-LD: WebSite + SearchAction (sitelinks search box)
            This enables Google to show a search box in search results.
            ══════════════════════════════════════════════════════════ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": SITE_NAME,
              "alternateName": "VCIC",
              "url": SITE_URL,
              "inLanguage": "vi",
              "publisher": {
                "@type": "EducationalOrganization",
                "name": SITE_NAME,
                "url": SITE_URL,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${SITE_URL}/images/logo.png`
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${SITE_URL}/tin-tuc?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Global JSON-LD: Organization (always present on every page) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": SITE_NAME,
              "alternateName": "College of Information and Communication Technology",
              "url": SITE_URL,
              "logo": `${SITE_URL}/images/logo.png`,
              "image": `${SITE_URL}/images/logo.png`,
              "description": "Trường Cao đẳng Thông tin và Truyền thông - Đào tạo chuyên sâu các ngành Công nghệ Thông tin, Lập trình máy tính, An toàn thông tin với chất lượng cao.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Số 8 Tôn Thất Thuyết",
                "addressLocality": "Cầu Giấy",
                "addressRegion": "Hà Nội",
                "postalCode": "100000",
                "addressCountry": "VN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "21.0285",
                "longitude": "105.7823"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+84-964-322-215",
                  "contactType": "admissions",
                  "availableLanguage": "Vietnamese"
                }
              ],
              "sameAs": [
                process.env.NEXT_PUBLIC_FACEBOOK_PAGE || "https://facebook.com/vcic.edu.vn",
                "https://youtube.com/c/vcicedu"
              ],
              "foundingDate": "2010"
            })
          }}
        />
      </head>
      <body
        className={`${manrope.variable} ${firaCode.variable} antialiased bg-white`}
      >
        <StoreProvider>
          <BreadcrumbProvider>
            {children}
          </BreadcrumbProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
