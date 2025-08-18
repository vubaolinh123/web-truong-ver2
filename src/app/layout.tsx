import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  authors: [{ name: "Trường Cao đẳng Thông tin và Truyền thông" }],
  creator: "Trường Cao đẳng Thông tin và Truyền thông",
  publisher: "Trường Cao đẳng Thông tin và Truyền thông",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://web-truong-ver2.vercel.app/'),
  alternates: {
    canonical: '/',
    languages: {
      'vi-VN': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://web-truong-ver2.vercel.app/',
    title: 'Trường Cao đẳng Thông tin và Truyền thông - Đào tạo Công nghệ Thông tin chất lượng cao',
    description: 'Trường Cao đẳng Thông tin và Truyền thông - Đào tạo chuyên sâu các ngành Công nghệ Thông tin, Lập trình máy tính, An toàn thông tin. Tuyển sinh 2025 với nhiều ưu đãi hấp dẫn.',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Logo Trường Cao đẳng Thông tin và Truyền thông',
      },
    ],
    siteName: 'Trường Cao đẳng Thông tin và Truyền thông',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trường Cao đẳng Thông tin và Truyền thông - Đào tạo Công nghệ Thông tin chất lượng cao',
    description: 'Trường Cao đẳng Thông tin và Truyền thông - Đào tạo chuyên sâu các ngành Công nghệ Thông tin, Lập trình máy tính, An toàn thông tin.',
    images: ['/images/logo.png'],
    creator: '@cic_edu_vn',
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
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
        <link rel="icon" href="/images/logo.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/images/logo.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" sizes="180x180" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileImage" content="/images/logo.png" />
        <meta name="msapplication-TileColor" content="#1e40af" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
