/**
 * Article Header Component
 * Displays article title and metadata with modern styling
 */

'use client';

import React from 'react';
import ArticleImage from '@/components/common/ArticleImage';
import { Calendar, User, Tag, FolderOpen } from 'lucide-react';
import { ArticleContent } from '../types/article.types';

interface ArticleHeaderProps {
  article: ArticleContent;
  className?: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  article,
  className = ''
}) => {
  console.log('--- ArticleHeader article:', JSON.stringify(article, null, 2));
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorInitials = (author: any) => {
    return `${author.firstName?.[0] || ''}${author.lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <div className={`${className}`}>
      {/* Modern Article Header */}
      <header className="relative">
        {/* Featured Image Background */}
        {article.featuredImage && (
          <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
            <ArticleImage
              featuredImage={article.featuredImage}
              title={article.title}
              fill
              className="w-full h-full object-cover"
              loading="eager"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent"></div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                {article.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-white/90">
                {article.publishedAt && (
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <Calendar size={16} />
                    <span className="text-sm">{formatDate(article.publishedAt)}</span>
                  </div>
                )}
                {article.category && (
                  <div className="flex items-center gap-2 bg-sky-500/80 backdrop-blur-sm rounded-full px-3 py-1">
                    <FolderOpen size={16} />
                    <span className="text-sm font-medium">{article.category.name}</span>
                  </div>
                )}
                {article.author && (
                  <div className="flex items-center gap-2 bg-yellow-500/80 backdrop-blur-sm rounded-full px-3 py-1">
                    <User size={16} />
                    <span className="text-sm">
                      {article.author.firstName} {article.author.lastName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Header without image */}
        {!article.featuredImage && (
          <div className="bg-gradient-to-r from-sky-100 via-white to-yellow-100 p-6 lg:p-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4">
              {article.publishedAt && (
                <div className="flex items-center gap-2 bg-white/80 border border-sky-200 rounded-full px-4 py-2">
                  <Calendar size={16} className="text-sky-600" />
                  <span className="text-sm text-slate-700">{formatDate(article.publishedAt)}</span>
                </div>
              )}
              {article.category && (
                <div className="flex items-center gap-2 bg-sky-500 text-white rounded-full px-4 py-2">
                  <FolderOpen size={16} />
                  <span className="text-sm font-medium">{article.category.name}</span>
                </div>
              )}
              {article.author && (
                <div className="flex items-center gap-2 bg-yellow-500 text-white rounded-full px-4 py-2">
                  <User size={16} />
                  <span className="text-sm">
                    {article.author.firstName} {article.author.lastName}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Excerpt */}
        {article.excerpt && (
          <div className="p-6 lg:p-8 bg-gradient-to-r from-sky-50/50 to-yellow-50/50 border-b border-sky-100">
            <p className="text-lg text-slate-700 leading-relaxed italic">
              {article.excerpt}
            </p>
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="p-6 lg:p-8 bg-white border-b border-sky-100">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={18} className="text-slate-500" />
              <span className="text-sm font-medium text-slate-600">Thẻ:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(article.tags) &&
                article.tags.map((tag: any, index: number) => (
                  <span
                    key={index}
                    className="inline-block bg-gradient-to-r from-sky-100 to-yellow-100 text-slate-700 px-3 py-1 rounded-full text-sm border border-sky-200 hover:from-sky-200 hover:to-yellow-200 transition-colors"
                  >
                    {typeof tag === 'string' ? tag : tag.name}
                  </span>
                ))
              }
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default ArticleHeader;
