'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Eye, ChevronLeft, ChevronRight, Play, MapPin, Phone, Mail, Calendar, Users, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [currentSlide, setCurrentSlide] = useState(0);

  // Top 3 main news categories for slider
  const mainNewsCategories = [
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
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mainNewsCategories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mainNewsCategories.length) % mainNewsCategories.length);
  };

  return (
    <section className="py-16 bg-gray-50">
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

        {/* Top News Slider */}
        <div className="relative mb-16">
          <div className="overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {mainNewsCategories.map((category, index) => (
                  <motion.div
                    key={`${category.id}-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Category Header */}
                    <div className="relative h-48 bg-gradient-to-br from-primary-blue to-secondary-blue">
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
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-blue-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-blue-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {mainNewsCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-blue-900 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section: 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gradient-to-br from-blue-50/30 to-gray-50/50 p-8 rounded-2xl border border-gray-100 shadow-sm">
          {/* Left Column: Admission Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-200/50 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <GraduationCap className="text-blue-900" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900">THÔNG TIN TUYỂN SINH</h3>
            </div>

            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-2xl font-bold text-blue-900">2025</div>
                  <div className="text-sm text-gray-600">Năm tuyển sinh</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center border border-yellow-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-2xl font-bold text-yellow-600">15+</div>
                  <div className="text-sm text-gray-600">Ngành đào tạo</div>
                </div>
              </div>

              {/* Admission Info */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="text-blue-900 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Thời gian đăng ký</h4>
                    <p className="text-gray-600 text-sm">Từ 01/03/2025 đến 30/08/2025</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="text-blue-900 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Đối tượng tuyển sinh</h4>
                    <p className="text-gray-600 text-sm">Tốt nghiệp THPT, THCS, tương đương</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="text-blue-900 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Địa điểm học tập</h4>
                    <p className="text-gray-600 text-sm">Cơ sở chính: Hà Nội & TP.HCM</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-r from-blue-50 to-yellow-50 p-4 rounded-lg border border-blue-100/50 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">Liên hệ tư vấn</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-blue-900" />
                    <span className="text-sm text-gray-700">Hotline: 0964 322 215</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-blue-900" />
                    <span className="text-sm text-gray-700">Email: tuyensinh@vcic.edu.vn</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/dang-ky-truc-tuyen"
                  className="flex-1 bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-blue-800 transition-colors duration-300"
                >
                  ĐĂNG KÝ NGAY
                </Link>
                <Link
                  href="/tuyen-sinh"
                  className="flex-1 border-2 border-blue-900 text-blue-900 py-3 px-6 rounded-lg font-semibold text-center hover:bg-blue-900 hover:text-white transition-all duration-300"
                >
                  TÌM HIỂU THÊM
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Multimedia */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Video Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 bg-gradient-to-br from-blue-900 to-blue-700">
                <Image
                  src="/images/banner-education.svg"
                  alt="Video giới thiệu trường"
                  width={600}
                  height={300}
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/20 backdrop-blur-sm border-2 border-white/50 text-white p-4 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                    <Play size={32} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h4 className="text-white font-semibold text-lg">Video giới thiệu trường</h4>
                  <p className="text-white/80 text-sm">Khám phá cơ sở vật chất và môi trường học tập</p>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <h4 className="text-xl font-bold text-blue-900 mb-4">HÌNH ẢNH TRƯỜNG</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-32 rounded-lg overflow-hidden group cursor-pointer">
                  <Image
                    src="/images/faculty-it.svg"
                    alt="Cơ sở vật chất"
                    width={200}
                    height={150}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">Cơ sở vật chất</span>
                  </div>
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden group cursor-pointer">
                  <Image
                    src="/images/quality-education.svg"
                    alt="Hoạt động sinh viên"
                    width={200}
                    height={150}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">Hoạt động sinh viên</span>
                  </div>
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden group cursor-pointer">
                  <Image
                    src="/images/banner-library.svg"
                    alt="Thư viện"
                    width={200}
                    height={150}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">Thư viện</span>
                  </div>
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden group cursor-pointer">
                  <Image
                    src="/images/banner-training.svg"
                    alt="Phòng thực hành"
                    width={200}
                    height={150}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">Phòng thực hành</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link
                  href="/hinh-anh"
                  className="text-blue-900 hover:text-blue-700 font-semibold text-sm flex items-center justify-center space-x-1"
                >
                  <span>Xem tất cả hình ảnh</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
