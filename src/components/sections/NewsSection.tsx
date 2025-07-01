'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

// Utility function to format numbers consistently across server and client
const formatViewCount = (count: number): string => {
  return new Intl.NumberFormat('en-US').format(count);
};

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
  const newsCategories = [
    {
      id: 'tin-tuc',
      title: 'TIN TỨC',
      image: '/images/news-graduation.svg',
      news: [
        {
          id: 1,
          title: 'TRƯỜNG CAO ĐẲNG THÔNG TIN VÀ TRUYỀN THÔNG CHÍNH THỨC TUYỂN SINH VÀ ĐÀO TẠO NGHỀ CÔNG NGHỆ THÔNG TIN VÀ LẬP TRÌNH MÁY TÍNH TỪ NĂM 2025',
          excerpt: 'Mở rộng đào tạo các ngành nghề công nghệ thông tin hiện đại...',
          date: '25.06.2025',
          category: 'Tin tức',
          image: '/images/news-graduation.svg',
          views: 1250,
          featured: true
        }
      ]
    },
    {
      id: 'thong-tin-tuyen-sinh',
      title: 'THÔNG TIN TUYỂN SINH',
      image: '/images/faculty-it.svg',
      news: [
        {
          id: 2,
          title: 'TRƯỜNG CAO ĐẲNG THÔNG TIN VÀ TRUYỀN THÔNG TUYỂN SINH 2025',
          excerpt: 'Thông tin chi tiết về tuyển sinh năm 2025 với nhiều ngành nghề hấp dẫn...',
          date: '20.06.2025',
          category: 'Tuyển sinh',
          image: '/images/faculty-it.svg',
          views: 2100,
          featured: true
        }
      ]
    },
    {
      id: 'thong-tin-dao-tao',
      title: 'THÔNG TIN ĐÀO TẠO',
      image: '/images/quality-education.svg',
      news: [
        {
          id: 3,
          title: 'KHAI GIẢNG LỚP BỒI DƯỠNG NGHIỆP VỤ QUẢN LÝ IN',
          excerpt: 'Chương trình bồi dưỡng nghiệp vụ chuyên sâu về quản lý in...',
          date: '15.06.2025',
          category: 'Đào tạo',
          image: '/images/quality-education.svg',
          views: 890
        }
      ]
    },
    {
      id: 'hop-tac-doanh-nghiep',
      title: 'HỢP TÁC DOANH NGHIỆP',
      image: '/images/faculty-economics.svg',
      news: [
        {
          id: 4,
          title: 'Chương trình kỷ niệm ngày 20/11/2024 và Samsung Việt Nam tài trợ cho Trường CĐ Thông tin và Truyền thông 38 máy tính, một Hệ thống thực hành mạng LAN để triển khai đào tạo các ngành nghề Công nghệ Thông tin',
          excerpt: 'Hợp tác chiến lược với Samsung Việt Nam nâng cao chất lượng đào tạo...',
          date: '20.11.2024',
          category: 'Hợp tác',
          image: '/images/faculty-economics.svg',
          views: 3200
        }
      ]
    },
    {
      id: 'cong-nghe-phan-mem',
      title: 'CÔNG NGHỆ PHẦN MỀM',
      image: '/images/faculty-it.svg',
      news: [
        {
          id: 5,
          title: 'Controllers-Điều khiển chức năng trong ứng dụng.',
          excerpt: 'Hướng dẫn chi tiết về Controllers trong phát triển ứng dụng...',
          date: '10.06.2025',
          category: 'Công nghệ',
          image: '/images/faculty-it.svg',
          views: 1500
        }
      ]
    },
    {
      id: 'tuyen-sinh-du-hoc',
      title: 'TUYỂN SINH DU HỌC',
      image: '/images/faculty-environment.svg',
      news: [
        {
          id: 6,
          title: 'TUYỂN THỰC TẬP SINH IN VÀ ĐÓNG SÁCH TẠI NHẬT THÁNG 2/2020',
          excerpt: 'Cơ hội du học và thực tập tại Nhật Bản với mức lương hấp dẫn...',
          date: '15.02.2020',
          category: 'Du học',
          image: '/images/faculty-environment.svg',
          views: 2800
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            TIN TỨC & THÔNG TIN
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về hoạt động của trường và các chương trình đào tạo
          </p>
        </div>

        {/* News Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Category Header */}
              <div className="relative h-48 bg-gradient-to-br from-blue-900 to-blue-700">
                <div className="absolute inset-0 bg-black/20" />
                <Image
                  src={category.image}
                  alt={category.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-lg font-bold text-center px-4">
                    {category.title}
                  </h3>
                </div>
              </div>

              {/* News Content */}
              <div className="p-6">
                {category.news.map((newsItem) => (
                  <div key={newsItem.id} className="mb-4 last:mb-0">
                    <Link href={`/tin-tuc/${newsItem.id}`} className="block group">
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-900 transition-colors duration-200 line-clamp-3 mb-2">
                        {newsItem.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{newsItem.date}</span>
                        <span className="flex items-center space-x-1">
                          <Eye size={12} />
                          <span>{formatViewCount(newsItem.views)}</span>
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}

                {/* View More Button */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href={`/${category.id}`}
                    className="text-blue-900 hover:text-blue-700 text-sm font-semibold flex items-center justify-center space-x-1 transition-colors duration-200"
                  >
                    <span>Xem thêm</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
