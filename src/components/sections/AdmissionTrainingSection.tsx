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

// Interface for admission and training items
interface AdmissionTrainingItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  views: number;
  featured?: boolean;
}

const AdmissionTrainingSection = () => {
  // Admission and training content data (3 cards)
  const admissionTrainingContent: AdmissionTrainingItem[] = [
    {
      id: 1,
      title: 'Thông báo tuyển sinh Cao đẳng chính quy năm 2025 - Ngành Công nghệ Thông tin',
      excerpt: 'Trường Cao đẳng Thông tin và Truyền thông thông báo tuyển sinh các ngành Công nghệ Thông tin, Lập trình máy tính với nhiều ưu đãi hấp dẫn...',
      date: '25/07/2025',
      category: 'Tuyển sinh',
      image: '/images/faculty-it.svg',
      views: 2850,
      featured: true
    },
    {
      id: 2,
      title: 'Chương trình đào tạo Lập trình viên chuyên nghiệp - Liên kết với doanh nghiệp',
      excerpt: 'Chương trình đào tạo thực tế kết hợp với các doanh nghiệp công nghệ hàng đầu, đảm bảo việc làm sau tốt nghiệp...',
      date: '20/07/2025',
      category: 'Đào tạo',
      image: '/images/quality-education.svg',
      views: 1920,
      featured: true
    },
    {
      id: 3,
      title: 'Học bổng toàn phần cho sinh viên xuất sắc năm học 2025-2026',
      excerpt: 'Chương trình học bổng toàn phần dành cho các thí sinh có thành tích học tập xuất sắc và hoàn cảnh khó khăn...',
      date: '18/07/2025',
      category: 'Học bổng',
      image: '/images/banner-education.svg',
      views: 3200,
      featured: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Thông tin tuyển sinh và đào tạo
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thông tin chi tiết về tuyển sinh, chương trình đào tạo và các cơ hội học tập tại trường
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {admissionTrainingContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`Hình ảnh tuyển sinh và đào tạo: ${item.title} - ${item.category}`}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Eye size={12} />
                      <span>{formatViewCount(item.views)}</span>
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={14} className="mr-2" />
                    <span>{item.date}</span>
                  </div>
                  
                  <Link href={`/tuyen-sinh-dao-tao/${item.id}`} className="block group">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-900 transition-colors duration-200 mb-4 leading-tight line-clamp-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
                      {item.excerpt}
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

        {/* View More Button */}
        <div className="text-center">
          <Link
            href="/tuyen-sinh-dao-tao"
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

export default AdmissionTrainingSection;
