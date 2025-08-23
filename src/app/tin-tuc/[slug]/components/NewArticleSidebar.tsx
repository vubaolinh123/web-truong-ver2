/**
 * New Article Sidebar Component
 * Redesigned for a wider, more spacious, and clearer layout.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Article } from '@/types/articles';
import ArticleImage from '@/components/common/ArticleImage'; // Using the consistent ArticleImage component

interface NewArticleSidebarProps {
  relatedArticles: Article[];
  loading?: boolean;
  error?: string | null;
  className?: string;
}

const NewArticleSidebar: React.FC<NewArticleSidebarProps> = ({
  relatedArticles,
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

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // API now handles filtering, so we just use the provided list.
  const filteredArticles = relatedArticles || [];

  if (loading) {
    return (
      <aside className={`bg-white rounded-2xl shadow-lg border border-sky-100 p-6 ${className}`}>
        <div className="h-8 bg-gradient-to-r from-sky-200 to-yellow-200 rounded animate-pulse w-48 mb-6"></div>
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video bg-gradient-to-br from-sky-200 to-yellow-200 rounded-lg mb-4"></div>
              <div className="h-5 bg-gradient-to-r from-sky-200 to-yellow-200 rounded mb-2"></div>
              <div className="h-5 bg-gradient-to-r from-sky-200 to-yellow-200 rounded w-3/4 mb-4"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-gradient-to-r from-sky-200 to-yellow-200 rounded w-1/3"></div>
                <div className="h-4 bg-gradient-to-r from-sky-200 to-yellow-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className={`bg-white rounded-2xl shadow-lg border border-sky-100 p-6 ${className}`}>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Bài viết liên quan</h2>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-500 font-medium">Lỗi khi tải bài viết</p>
          <p className="text-xs text-slate-500 mt-1">{error}</p>
        </div>
      </aside>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <aside className={`bg-white rounded-2xl shadow-lg border border-sky-100 p-6 ${className}`}>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Bài viết liên quan</h2>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-slate-600">Không có bài viết liên quan</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`bg-white rounded-2xl shadow-lg border border-sky-100 overflow-hidden ${className}`}>
      <div className="p-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Bài viết liên quan</h2>
          <Link
            href="/tin-tuc"
            className="flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-800 font-medium transition-colors group"
          >
            <span>Xem tất cả</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/tin-tuc/${article.slug}`}
              className="block group"
            >
              <div className="flex flex-col space-y-2">
                {/* Featured Image */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <ArticleImage
                    featuredImage={article.featuredImage}
                    title={article.title}
                    fill
                    className="group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 30vw, 25vw"
                  />
                  {/* Category Badge */}
                  {article.category && (
                    <div className="absolute top-2 left-2">
                      <span className="inline-block bg-gradient-to-r from-sky-500 to-sky-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                        {truncateText(article.category.name, 20)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="flex flex-col space-y-2">
                  {/* Title */}
                  <h3 className="font-bold text-slate-800 text-base leading-snug group-hover:text-sky-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    {/* Author */}
                    {article.author && (
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-sky-500" />
                        <span className="font-medium">
                          {truncateText(`${article.author.firstName} ${article.author.lastName}`, 15)}
                        </span>
                      </div>
                    )}

                    {/* Date */}
                    {article.publishedAt && (
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-sky-500" />
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
