/**
 * New Article Sidebar Component
 * Modern design with Tailwind CSS and light blue/yellow theme
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react';
import { Article } from '@/types/articles';

interface NewArticleSidebarProps {
  relatedArticles: Article[];
  currentArticleId: string;
  loading?: boolean;
  error?: string | null;
  className?: string;
}

const NewArticleSidebar: React.FC<NewArticleSidebarProps> = ({
  relatedArticles,
  currentArticleId,
  loading = false,
  error = null,
  className = ''
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getImageSrc = (featuredImage: any) => {
    if (!featuredImage) return '/images/default-article.jpg';
    return typeof featuredImage === 'string' ? featuredImage : featuredImage?.url || '/images/default-article.jpg';
  };

  const getTagName = (tag: any) => {
    return typeof tag === 'string' ? tag : tag?.name || '';
  };

  // Use related articles directly (filtering is now handled by the API)
  const filteredArticles = relatedArticles || [];

  if (loading) {
    return (
      <aside className={`bg-white rounded-2xl shadow-lg border border-sky-100 p-6 ${className}`}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gradient-to-r from-sky-200 to-yellow-200 rounded animate-pulse w-32"></div>
          </div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gradient-to-r from-sky-50 to-yellow-50 rounded-xl p-4 animate-pulse">
                <div className="flex space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-200 to-yellow-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gradient-to-r from-sky-200 to-yellow-200 rounded"></div>
                    <div className="h-3 bg-gradient-to-r from-sky-200 to-yellow-200 rounded w-4/5"></div>
                    <div className="h-3 bg-gradient-to-r from-sky-200 to-yellow-200 rounded w-3/5"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className={`bg-white rounded-2xl shadow-lg border border-sky-100 p-6 ${className}`}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Bài viết liên quan</h2>
          </div>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-500 font-medium mb-2">Có lỗi khi tải bài viết liên quan</p>
            <p className="text-xs text-slate-500">{error}</p>
          </div>
        </div>
      </aside>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <aside className={`bg-white rounded-2xl shadow-lg border border-sky-100 p-6 ${className}`}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Bài viết liên quan</h2>
          </div>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-600">Không có bài viết liên quan</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden ${className}`}>
      <div className="p-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">Bài viết liên quan</h2>
          <Link
            href="/tin-tuc"
            className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-800 font-medium transition-colors"
          >
            <span>Xem tất cả</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/tin-tuc/${article.slug}`}
              className="block group hover:bg-gradient-to-r hover:from-sky-50 hover:to-yellow-50 rounded-xl p-3 transition-all duration-200 border border-transparent hover:border-sky-200"
            >
              <div className="flex space-x-4">
                {/* Featured Image */}
                <div className="relative flex-shrink-0">
                  <img
                    src={getImageSrc(article.featuredImage)}
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded-lg"
                    loading="lazy"
                  />
                  {/* Category Badge */}
                  {article.category && (
                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      {article.category.name}
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-2 line-clamp-2 group-hover:text-sky-700 transition-colors">
                    {article.title}
                  </h3>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                    {/* Author */}
                    {article.author && (
                      <div className="flex items-center gap-1">
                        <User size={10} />
                        <span>{article.author.firstName} {article.author.lastName}</span>
                      </div>
                    )}

                    {/* Date */}
                    {article.publishedAt && (
                      <div className="flex items-center gap-1">
                        <Calendar size={10} />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 pt-6 border-t border-sky-100">
          <p className="text-sm text-slate-600 mb-4 text-center">
            Khám phá thêm nhiều bài viết thú vị khác
          </p>
          <Link
            href="/tin-tuc"
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span>Xem tất cả tin tức</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default NewArticleSidebar;
