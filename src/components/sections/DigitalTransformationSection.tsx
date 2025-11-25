'use client';

import React from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { Article } from '@/types/articles';
import { ArrowRight, Eye, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

// Utility function to format numbers consistently across server and client
const formatViewCount = (count: number): string => {
  return new Intl.NumberFormat('en-US').format(count);
};

interface DigitalTransformationSectionProps {
  articles: Article[];
}

const DigitalTransformationSection: React.FC<DigitalTransformationSectionProps> = ({ articles }) => {

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
            CHUYỂN ĐỔI SỐ
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
            href="/cong-nghe-so"
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

export default DigitalTransformationSection;

