import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/seo/Seo';

// Dynamic imports with lightweight skeletons
const BaCongKhaiHero = dynamic(() => import('./components/BaCongKhaiHero'), {
    loading: () => <div className="h-72 md:h-96 bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse" />,
});
const BaCongKhaiContent = dynamic(() => import('./components/BaCongKhaiContent'), {
    loading: () => <div className="h-96 bg-white rounded-xl shadow-lg animate-pulse" />,
});
const BaCongKhaiSidebar = dynamic(() => import('./components/BaCongKhaiSidebar'), {
    loading: () => <div className="h-96 bg-white rounded-xl shadow-lg animate-pulse" />,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Trường Cao đẳng Thông tin và Truyền thông';

export const metadata: Metadata = {
    title: `Ba Công Khai - ${SITE_NAME}`,
    description:
        'Thông tin công khai về cam kết chất lượng đào tạo, điều kiện đảm bảo chất lượng và thu chi tài chính của Trường Cao đẳng Thông tin và Truyền thông.',
    alternates: {
        canonical: `${SITE_URL}/ba-cong-khai`,
    },
    openGraph: {
        title: `Ba Công Khai - ${SITE_NAME}`,
        description:
            'Thông tin công khai về cam kết chất lượng đào tạo, điều kiện đảm bảo chất lượng và thu chi tài chính.',
        url: `${SITE_URL}/ba-cong-khai`,
        type: 'website',
        locale: 'vi_VN',
        images: [
            { url: `${SITE_URL}/images/logo.png`, width: 1200, height: 630, alt: SITE_NAME },
        ],
        siteName: SITE_NAME,
    },
    twitter: {
        card: 'summary_large_image',
        title: `Ba Công Khai - ${SITE_NAME}`,
        description: 'Thông tin công khai của nhà trường.',
        images: [`${SITE_URL}/images/logo.png`],
    },
};

// Structured data
const baCongKhaiJsonLd = [
    {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Ba Công Khai',
        description:
            'Thông tin công khai về cam kết chất lượng đào tạo, điều kiện đảm bảo chất lượng và thu chi tài chính.',
        url: `${SITE_URL}/ba-cong-khai`,
        isPartOf: {
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
        },
        publisher: {
            '@type': 'EducationalOrganization',
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/images/logo.png`,
        },
    },
];

export default function BaCongKhaiPage() {
    return (
        <Layout>
            {/* JSON-LD via shared SEO component */}
            <Seo minimal jsonLd={baCongKhaiJsonLd as any} />

            {/* Page container */}
            <div className="min-h-screen bg-gray-50">
                <BaCongKhaiHero />

                {/* Main Content with Sidebar */}
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Main Content - Left */}
                        <div className="flex-1 lg:w-2/3">
                            <BaCongKhaiContent />
                        </div>

                        {/* Sidebar - Right */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-4">
                                <BaCongKhaiSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
