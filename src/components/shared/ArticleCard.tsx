"use client";

import React from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { Calendar, User, Eye } from 'lucide-react';
import { Article } from '@/types/articles';

export interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
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

  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 border border-sky-100 hover:border-sky-300 hover:-translate-y-1.5 flex flex-col h-full">
      <div className="relative h-56 w-full overflow-hidden">
        <Link href={`/tin-tuc/${article.slug}`} className="block w-full h-full" aria-label={article.title}>
          <OptimizedImage
            src={getImageUrl(article.featuredImage)}
            alt={getImageAlt(article.featuredImage, article.title)}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </Link>
        {(article.categories && article.categories.length > 0) && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {article.categories.slice(0, 2).map((cat) => (
              <Link
                key={cat.id}
                href={`/tin-tuc?category=${cat.slug}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-sky-500/90 text-white backdrop-blur-sm border border-white/20 hover:bg-sky-600/90 transition-colors"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Xem bài viết theo danh mục ${cat.name}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link href={`/tin-tuc/${article.slug}`} className="p-5 flex-1 flex flex-col" aria-label={article.title}>
        <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-sky-600 transition-colors line-clamp-3 leading-tight flex-grow">
          {article.title}
        </h3>

        {/* Meta Information */}
        <div className="flex items-center justify-between pt-4 border-t border-sky-100 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
              <User size={14} className="text-sky-600" />
            </div>
            <span className="text-sm font-medium text-slate-600 truncate max-w-[120px]">
              {getAuthorName(article.author)}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={14} />
              <span>{article.viewCount?.toLocaleString() || 0}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;

