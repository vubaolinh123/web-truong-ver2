import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import GalleryContent from './GalleryContent';

export const metadata: Metadata = {
  title: 'Hình ảnh trường | Trường Cao đẳng Thông tin và Truyền thông',
  description: 'Thư viện ảnh, album hoạt động của Trường Cao đẳng Thông tin và Truyền thông.',
};

export default function GalleryPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-yellow-50">
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 py-12 md:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.14),transparent_32%)]" aria-hidden="true" />

          <div className="relative mx-auto w-[92%] max-w-7xl px-4 text-white sm:px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-yellow-300/90">
              Trang chủ &gt; Hình ảnh trường
            </p>
            <h1 className="mt-3 text-3xl font-extrabold uppercase tracking-wide md:text-5xl">
              HÌNH ẢNH TRƯỜNG
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-blue-50 md:text-base">
              Khám phá các album hoạt động, sự kiện và những khoảnh khắc nổi bật của Trường Cao đẳng Thông tin và Truyền thông.
            </p>
          </div>
        </section>

        <div className="mx-auto w-[92%] max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <GalleryContent />
        </div>
      </div>
    </Layout>
  );
}
