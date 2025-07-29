'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

  // Secondary news grid data (6 compact cards)
  const secondaryNews: NewsItem[] = [
    {
      id: 4,
      title: 'Đồng đạo thi sinh được tư vấn về tuyển sinh đại học chính quy năm 2025',
      excerpt: 'Chương trình tư vấn tuyển sinh dành cho học sinh tốt nghiệp THPT...',
      date: '20/07/2025',
      category: 'Tuyển sinh',
      image: '/images/banner-education.svg',
      views: 650
    },
    {
      id: 5,
      title: 'PTIT khai giảng chương trình "Lãnh đạo trẻ trong kỷ nguyên số"',
      excerpt: 'Chương trình đào tạo lãnh đạo trẻ với công nghệ hiện đại...',
      date: '16/07/2025',
      category: 'Đào tạo',
      image: '/images/banner-training.svg',
      views: 420
    },
    {
      id: 6,
      title: 'Đại sứ Phạm Quang Vinh thăm gia Hội đồng cố vấn Viện Lãnh đạo, Quản lý và Chính sách công',
      excerpt: 'Buổi làm việc quan trọng về định hướng phát triển viện...',
      date: '16/07/2025',
      category: 'Sự kiện',
      image: '/images/banner-library.svg',
      views: 380
    },
    {
      id: 7,
      title: 'Thông báo về việc đăng ký nguyện vọng xét tuyển đại học chính quy năm 2025',
      excerpt: 'Hướng dẫn chi tiết về quy trình đăng ký nguyện vọng...',
      date: '14/07/2025',
      category: 'Tuyển sinh',
      image: '/images/faculty-economics.svg',
      views: 920
    },
    {
      id: 8,
      title: 'Công đoàn Học viện Công nghệ Bưu chính Viễn thông tổ chức hành trình về nguồn',
      excerpt: 'Chuyến đi ý nghĩa nhằm giáo dục truyền thống cách mạng...',
      date: '14/07/2025',
      category: 'Hoạt động',
      image: '/images/faculty-environment.svg',
      views: 310
    },
    {
      id: 9,
      title: 'PTIT trao tặng học bổng Tài năng trị giá 500 triệu cho các thí sinh tuyển sinh đại học 2025',
      excerpt: 'Chương trình học bổng ưu đãi dành cho sinh viên xuất sắc...',
      date: '11/07/2025',
      category: 'Học bổng',
      image: '/images/faculty-general.svg',
      views: 1150
    }
  ];



  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Tin tức và Sự Kiện
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về hoạt động của trường và các chương trình đào tạo
          </p>
        </div>

        {/* Main News Grid */}
        <div className="mb-16">
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
                  <Image
                    src={newsItem.image}
                    alt={newsItem.title}
                    width={400}
                    height={256}
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
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-900 transition-colors duration-200 mb-4 leading-tight line-clamp-3">
                      {newsItem.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
                      {newsItem.excerpt}
                    </p>
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

        {/* Secondary News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
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
                <Image
                  src={newsItem.image}
                  alt={newsItem.title}
                  width={300}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-blue-900 text-white px-2 py-1 rounded text-xs font-medium">
                    {newsItem.category}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                    <Eye size={10} />
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
                  <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-900 transition-colors duration-200 mb-2 leading-tight line-clamp-2">
                    {newsItem.title}
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-3">
                    {newsItem.excerpt}
                  </p>
                  <div className="flex items-center text-blue-900 font-medium text-xs group-hover:text-blue-700 transition-colors">
                    <span>Đọc thêm</span>
                    <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
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
