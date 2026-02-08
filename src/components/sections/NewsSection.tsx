'use client';

import React from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { ArrowRight, Eye, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

// Utility function to format numbers consistently across server and client
const formatViewCount = (count: number): string => {
  return new Intl.NumberFormat('en-US').format(count);
};

// Interface for news items (used in data structure)
import { Article } from '@/types/articles';

interface NewsSectionProps {
  articles: Article[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ articles }) => {

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

  const mainNews = articles.slice(0, 3);
  const secondaryNews = articles.slice(3, 6);

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
              {mainNews.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
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
        </div>

        {/* Secondary News Grid - Smaller and Compact (75% width) */}
        <div className="mt-16">
          <div className="w-[75%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {secondaryNews.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Compact Image Section */}
                  <div className="relative h-40 overflow-hidden">
                    <OptimizedImage
                      src={getImageUrl(article.featuredImage)}
                      alt={getImageAlt(article.featuredImage, article.title)}
                      width={280}
                      height={160}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-900 text-white px-2 py-1 rounded text-xs font-medium">
                        {article.categories?.[0]?.name || 'Tin tức'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                        <Eye size={12} />
                        <span>{formatViewCount(article.viewCount || 0)}</span>
                      </span>
                    </div>
                  </div>

                  {/* Compact Content Section */}
                  <div className="p-4">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Calendar size={12} className="mr-1" />
                      <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                    </div>

                    <Link href={`/tin-tuc/${article.slug}`} className="block group">
                      <h4 className="text-base font-bold text-gray-800 group-hover:text-blue-900 transition-colors duration-200 mb-3 leading-tight line-clamp-2">
                        {article.title}
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
            href="/tin-tuc-khac"
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
