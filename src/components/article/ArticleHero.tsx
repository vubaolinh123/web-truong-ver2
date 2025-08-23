/**
 * Article Hero Component
 * Hero banner với featured image và title overlay
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, User, Eye, Clock, Star, Tag } from 'lucide-react';
import { Article } from '@/types/articles';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface ArticleHeroProps {
  article: Article;
}

const ArticleHero: React.FC<ArticleHeroProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const authorName = article.author 
    ? `${article.author.firstName} ${article.author.lastName}`
    : 'Tác giả ẩn danh';

  const breadcrumbItems = [
    { label: 'Tin Tức', href: '/tin-tuc' },
    { label: article.title, current: true }
  ];

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {(typeof article.featuredImage === 'string' && article.featuredImage) ||
         (typeof article.featuredImage === 'object' && article.featuredImage?.url) ? (
          <Image
            src={typeof article.featuredImage === 'string'
              ? article.featuredImage
              : article.featuredImage.url!}
            alt={typeof article.featuredImage === 'string'
              ? article.title
              : article.featuredImage.alt || article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800" />
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-between">
        {/* Breadcrumbs */}
        <div className="pt-8">
          <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
              <Breadcrumbs items={breadcrumbItems} className="text-white" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pb-16">
          <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              {/* Category Badge */}
              {article.category && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-yellow-400 text-blue-900 shadow-lg">
                    <Tag size={16} className="mr-2" />
                    {article.category.name}
                  </span>
                </div>
              )}

              {/* Featured Badge */}
              {article.featured && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-yellow-500 text-white shadow-lg">
                    <Star size={16} className="mr-2 fill-current" />
                    Bài viết nổi bật
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl drop-shadow-md">
                  {article.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                {/* Author */}
                <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <User size={18} className="mr-2" />
                  <span className="font-medium">{authorName}</span>
                </div>

                {/* Published Date */}
                {article.publishedAt && (
                  <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Calendar size={18} className="mr-2" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 6).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                    {article.tags.length > 6 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30">
                        +{article.tags.length - 6} thẻ khác
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleHero;
