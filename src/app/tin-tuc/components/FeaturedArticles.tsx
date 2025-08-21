/**
 * Featured Articles Component
 * Displays 3 featured articles in a prominent grid layout
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Eye, ArrowRight, Star } from 'lucide-react';
import { Article } from '@/types/articles';

interface FeaturedArticlesProps {
  articles: Article[];
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ articles }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getAuthorName = (author: { firstName?: string; lastName?: string } | null | undefined) => {
    if (!author) return 'Tác giả ẩn danh';
    return `${author.firstName || ''} ${author.lastName || ''}`.trim() || 'Tác giả ẩn danh';
  };

  const getImageSrc = (featuredImage: string | { url?: string } | null | undefined) => {
    if (!featuredImage) return '/images/default-article.svg';
    return typeof featuredImage === 'string' ? featuredImage : featuredImage?.url || '/images/default-article.svg';
  };

  if (articles.length < 3) {
    return null;
  }

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 rounded-xl">
            <Star size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">✨ Tin tức nổi bật</h2>
            <p className="text-gray-600">Những bài viết được quan tâm nhất</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Cập nhật liên tục</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {articles.slice(0, 3).map((article, index) => (
          <article key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-sky-200 flex flex-col">
            <Link href={`/tin-tuc/${article.slug}`}>
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <Image
                  src={getImageSrc(article.featuredImage)}
                  alt={article.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {article.category && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-sky-500 text-white shadow-lg backdrop-blur-sm">
                      {article.category.name}
                    </span>
                  )}
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 shadow-lg">
                    ⭐ Nổi bật
                  </span>
                </div>

                {/* Featured Number */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-sky-500 font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Read More Overlay */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">Đọc bài viết</span>
                      <ArrowRight size={16} className="text-sky-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-500 transition-colors line-clamp-2 leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Enhanced Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                        <User size={12} className="text-sky-500" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{getAuthorName(article.author)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={12} />
                      <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Eye size={12} />
                    <span>{article.viewCount?.toLocaleString() || '0'}</span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArticles;
