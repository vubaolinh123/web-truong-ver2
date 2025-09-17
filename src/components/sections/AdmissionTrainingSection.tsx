'use client';

import React from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { Article } from '@/types/articles';
import { ArrowRight, Eye, Calendar, Play, MapPin, Phone, Mail, Users, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

// Utility function to format numbers consistently across server and client
const formatViewCount = (count: number): string => {
  return new Intl.NumberFormat('en-US').format(count);
};

interface AdmissionTrainingSectionProps {
  articles: Article[];
}

const AdmissionTrainingSection: React.FC<AdmissionTrainingSectionProps> = ({ articles }) => {

  const getImageUrl = (image: Article['featuredImage']) => {
    if (!image) return null;
    const relativeUrl = typeof image === 'string' ? image : image.url;
    if (!relativeUrl) return null;
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api\/?$/, '');
    return relativeUrl.startsWith('http') ? relativeUrl : `${baseUrl}${relativeUrl}`;
  };

  const getImageAlt = (image: Article['featuredImage'], title: string) => {
    if (typeof image === 'object' && image?.alt) return image.alt;
    return title;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 uppercase">
            THÔNG TIN TUYỂN SINH VÀ ĐÀO TẠO
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <OptimizedImage
                    src={getImageUrl(article.featuredImage)}
                    alt={getImageAlt(article.featuredImage, article.title)}
                    width={400}
                    height={256}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {article.categories?.[0]?.name || 'Tin tức'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Eye size={12} />
                      <span>{formatViewCount(article.viewCount || 0)}</span>
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={14} className="mr-2" />
                    <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                  </div>
                  
                  <Link href={`/tin-tuc/${article.slug}`} className="block group">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-900 transition-colors duration-200 mb-6 leading-tight line-clamp-3">
                      {article.title}
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

        {/* View More Button */}
        <div className="text-center mt-12 mb-16">
          <Link
            href="/tuyen-sinh-dao-tao"
            className="inline-flex items-center space-x-2 bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>Xem thêm</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Admission Information Section: 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gradient-to-br from-blue-50/30 to-gray-50/50 p-8 rounded-2xl border border-gray-100 shadow-sm mt-16">
          {/* Left Column: Admission Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-8 border border-gray-200/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <GraduationCap className="text-blue-900" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900">THÔNG TIN TUYỂN SINH</h3>
            </div>

            <div className="space-y-6 flex-1">
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
                    <p className="text-gray-600 text-sm">01/03/2025 đến 30/10/2025</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="text-blue-900 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Đối tượng tuyển sinh</h4>
                    <ul className="text-gray-600 text-sm list-disc pl-5 space-y-1" aria-label="Đối tượng tuyển sinh">
                      <li>Trình độ sơ cấp: Xét tuyển từ 15 tuổi trở lên</li>
                      <li>Trình độ trung cấp: Tốt nghiệp THCS và tương đương trở lên</li>
                      <li>Trình độ cao đẳng: Tốt nghiệp THPT và tương đương</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="text-blue-900 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-800">Địa điểm học tập</h4>
                    <p className="text-gray-600 text-sm">Hà Nội</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-r from-blue-50 to-yellow-50 p-4 rounded-lg border border-blue-100/50 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3">Liên hệ tư vấn</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-blue-900" />
                    <span className="text-sm text-gray-700">Số điện thoại: 0964 322 215</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-blue-900" />
                    <span className="text-sm text-gray-700">Email: phongdaotao.cci@moet.edu.vn</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 lg:mt-auto">
                <Link
                  href="https://docs.google.com/forms/d/11D5J4efgXnvAMZONrNaTBNIlWL67_q7XvfMFS8vDxR8/viewform?edit_requested=true"
                  className="flex-1 bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-blue-800 transition-colors duration-300"
                >
                  ĐĂNG KÝ NGAY
                </Link>
                <Link
                  href="/thong-tin-tuyen-sinh"
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
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Video Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  src="https://www.youtube.com/embed/vpcZ9A7tDPE"
                  title="Video giới thiệu trường - Trường Cao đẳng Thông tin và Truyền thông"
                  aria-label="YouTube video giới thiệu trường"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-300">
              <h4 className="text-xl font-bold text-blue-900 mb-4">HÌNH ẢNH TRƯỜNG</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-32 rounded-lg overflow-hidden group cursor-pointer">
                  <OptimizedImage
                    src="/images/faculty-it.svg"
                    alt="Cơ sở vật chất - Trường Cao đẳng Thông tin và Truyền thông"
                    width={200}
                    height={150}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">Cơ sở vật chất</span>
                  </div>
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden group cursor-pointer">
                  <OptimizedImage
                    src="/images/quality-education.svg"
                    alt="Hoạt động sinh viên - Trường Cao đẳng Thông tin và Truyền thông"
                    width={200}
                    height={150}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">Hoạt động sinh viên</span>
                  </div>
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden group cursor-pointer">
                  <OptimizedImage
                    src="/images/banner-library.svg"
                    alt="Thư viện - Trường Cao đẳng Thông tin và Truyền thông"
                    width={200}
                    height={150}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">Thư viện</span>
                  </div>
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden group cursor-pointer">
                  <OptimizedImage
                    src="/images/banner-training.svg"
                    alt="Phòng thực hành - Trường Cao đẳng Thông tin và Truyền thông"
                    width={200}
                    height={150}
                    loading="lazy"
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

export default AdmissionTrainingSection;
