/**
 * Featured Articles Component
 * Displays 3 featured articles in a prominent grid layout
 */

import React from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
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

  if (articles.length < 4) {
    return null;
  }

  return (
    <div className="mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-yellow-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-700 rounded-2xl">
            <Star size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Tin tức nổi bật</h2>
            <p className="text-slate-500">Những bài viết được quan tâm nhất trong tháng</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 font-medium">
          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse"></div>
          <span>Cập nhật liên tục</span>
        </div>
      </div>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.slice(0, 4).map((article, index) => (
          <article
            key={article.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-yellow-200 transform hover:-translate-y-2 h-full flex flex-col">
            <Link href={`/tin-tuc/${article.slug}`} className="flex flex-col h-full">
              {/* Fixed height image container to prevent layout issues */}
              <div className="relative w-full h-64 overflow-hidden flex-shrink-0">
                <OptimizedImage
                  src={getImageUrl(article.featuredImage)}
                  alt={getImageAlt(article.featuredImage, article.title)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {article.category && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-sky-500/90 text-white backdrop-blur-sm border border-white/20">
                      {article.category.name}
                    </span>
                  )}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 backdrop-blur-sm border border-white/20">
                    ⭐ Nổi bật
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                </div>
              </div>

              {/* Content section with flex-grow to fill remaining space */}
              <div className="p-6 flex-grow flex flex-col bg-gradient-to-br from-white to-yellow-50/50">
                {/* Meta information pushed to bottom */}
                <div className="flex items-center justify-between pt-4 border-t border-yellow-200 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-sky-100 rounded-full flex items-center justify-center">
                      <User size={16} className="text-sky-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{getAuthorName(article.author)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar size={14} />
                    <span>{formatDate(article.publishedAt || article.createdAt)}</span>
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
