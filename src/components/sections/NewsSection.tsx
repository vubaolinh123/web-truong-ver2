'use client';

import React from 'react';
import Link from 'next/link';
import ArticleImage from '@/components/common/ArticleImage';
import { ArrowRight, Eye, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

// Utility function to format numbers consistently across server and client
const formatViewCount = (count: number): string => {
  return new Intl.NumberFormat('en-US').format(count);
};

// Interface for news items (used in data structure)
interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  views: number;
  featured?: boolean;
}

const NewsSection = () => {

  // Main news grid data (3 large cards)
  const mainNews: NewsItem[] = [
    {
      id: 1,
      title: 'PTIT tổ chức chuỗi hoạt động tri ân nhân dịp kỷ niệm 78 năm Ngày Thương binh - Liệt sĩ (27/7/1947 - 27/7/2025)',
      excerpt: 'Nhằm tri ân những đóng góp to lớn của các anh hùng liệt sĩ, thương binh và gia đình chính sách...',
      date: '27/07/2025',
      category: 'Tin tức',
      image: '/images/news-graduation.svg',
      views: 1250,
      featured: true
    },
    {
      id: 2,
      title: 'Thông báo bảng quy đổi tương đương điểm trung tuyển giữa các phương thức xét tuyển đại học hệ chính quy đợt 1 năm 2025',
      excerpt: 'Trường Đại học Bưu chính Viễn thông thông báo bảng quy đổi tương đương điểm trung tuyển...',
      date: '23/07/2025',
      category: 'Tuyển sinh',
      image: '/images/faculty-it.svg',
      views: 2100,
      featured: true
    },
    {
      id: 3,
      title: 'PTIT và TMN thúc đẩy hợp tác AI, STEM và công nghệ xanh',
      excerpt: 'Hợp tác chiến lược giữa PTIT và TMN trong lĩnh vực trí tuệ nhân tạo, STEM và công nghệ xanh...',
      date: '22/07/2025',
      category: 'Hợp tác',
      image: '/images/quality-education.svg',
      views: 890,
      featured: true
    }
  ];
  // Secondary news grid data (3 smaller cards)
  const secondaryNews: NewsItem[] = [
    {
      id: 4,
      title: 'Lễ khai giảng năm học 2025-2026 với sự tham dự của lãnh đạo Bộ Khoa học và Công nghệ',
      excerpt: 'Buổi lễ khai giảng trang trọng đánh dấu bước khởi đầu năm học mới...',
      date: '15/07/2025',
      category: 'Sự kiện',
      image: '/images/banner-education.svg',
      views: 850
    },
    {
      id: 5,
      title: 'Sinh viên trường đạt giải nhất cuộc thi lập trình toàn quốc 2025',
      excerpt: 'Thành tích xuất sắc của đội tuyển lập trình trường trong cuộc thi...',
      date: '12/07/2025',
      category: 'Thành tích',
      image: '/images/quality-education.svg',
      views: 1200
    },
    {
      id: 6,
      title: 'Hội thảo khoa học "Công nghệ 4.0 trong giáo dục đại học"',
      excerpt: 'Hội thảo quy tụ các chuyên gia hàng đầu về công nghệ giáo dục...',
      date: '10/07/2025',
      category: 'Hội thảo',
      image: '/images/banner-training.svg',
      views: 650
    }
  ];





  return (
    <section className="py-16 bg-gray-50">
      <div className="w-[95%] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 uppercase">
            TIN TỨC
          </h2>
        </div>

        {/* Main News Grid - Large and Prominent (90-95% width) */}
        <div className="mb-16">
          <div className="w-[92%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainNews.map((newsItem, index) => (
              <motion.div
                key={newsItem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <ArticleImage
                    featuredImage={newsItem.image}
                    title={newsItem.title}
                    width={400}
                    height={256}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {newsItem.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Eye size={12} />
                      <span>{formatViewCount(newsItem.views)}</span>
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={14} className="mr-2" />
                    <span>{newsItem.date}</span>
                  </div>

                  <Link href={`/tin-tuc/${newsItem.id}`} className="block group">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-900 transition-colors duration-200 mb-6 leading-tight line-clamp-3">
                      {newsItem.title}
                    </h3>
                    <div className="flex items-center text-blue-900 font-semibold text-sm group-hover:text-blue-700 transition-colors">
                      <span>Đọc thêm</span>
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          </div>
        </div>

        {/* Secondary News Grid - Smaller and Compact (75% width) */}
        <div className="mt-16">
          <div className="w-[75%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryNews.map((newsItem, index) => (
              <motion.div
                key={newsItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Compact Image Section */}
                <div className="relative h-40 overflow-hidden">
                  <ArticleImage
                    featuredImage={newsItem.image}
                    title={newsItem.title}
                    width={280}
                    height={160}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-900 text-white px-2 py-1 rounded text-xs font-medium">
                      {newsItem.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Eye size={12} />
                      <span>{formatViewCount(newsItem.views)}</span>
                    </span>
                  </div>
                </div>

                {/* Compact Content Section */}
                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Calendar size={12} className="mr-1" />
                    <span>{newsItem.date}</span>
                  </div>

                  <Link href={`/tin-tuc/${newsItem.id}`} className="block group">
                    <h4 className="text-base font-bold text-gray-800 group-hover:text-blue-900 transition-colors duration-200 mb-3 leading-tight line-clamp-2">
                      {newsItem.title}
                    </h4>
                    <div className="flex items-center text-blue-900 font-semibold text-xs group-hover:text-blue-700 transition-colors">
                      <span>Đọc thêm</span>
                      <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          </div>
        </div>

        {/* Single View More Button for Entire Section */}
        <div className="text-center mt-12">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center space-x-2 bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>Xem thêm</span>
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default NewsSection;
