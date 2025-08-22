/**
 * Articles List Component
 * Displays paginated list of articles with card layout
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Eye, ArrowRight, Newspaper, Search } from 'lucide-react';
import { Article } from '@/types/articles';

interface ArticlesListProps {
  articles: Article[];
  currentPage: number;
  totalPages: number;

  search?: string;
  category?: string;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  currentPage,
  totalPages,

  search = '',
  category = ''
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  console.log("articles",articles)

  const getAuthorName = (author: { firstName?: string; lastName?: string } | null | undefined) => {
    if (!author) return 'Tác giả ẩn danh';
    return `${author.firstName || ''} ${author.lastName || ''}`.trim() || 'Tác giả ẩn danh';
  };

  const getImageSrc = (featuredImage: string | { url?: string } | null | undefined) => {
    if (!featuredImage) return '/images/default-article.svg';
    return typeof featuredImage === 'string' ? featuredImage : featuredImage?.url || '/images/default-article.svg';
  };

  const displayArticles = articles;

  return (
    <div className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-sky-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-sky-100 to-sky-200 text-sky-600 rounded-2xl">
            <Newspaper size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              {currentPage === 1 ? 'Tất cả tin tức' : `Tin tức - Trang ${currentPage}`}
            </h2>
            <p className="text-slate-500">
              {currentPage === 1 ? 'Danh sách đầy đủ các bài viết mới nhất' : `Hiển thị trang ${currentPage} của ${totalPages}`}
            </p>
          </div>
        </div>
        {totalPages > 1 && (
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 font-medium bg-white/70 border border-sky-100 px-4 py-2 rounded-full">
            <span>Trang {currentPage} / {totalPages}</span>
          </div>
        )}
      </div>

      {displayArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 border border-sky-100 hover:border-sky-300 hover:-translate-y-1.5 flex flex-col h-full">
              <div className="relative h-56 w-full overflow-hidden">
                <Link href={`/tin-tuc/${article.slug}`} className="block w-full h-full">
                  <Image
                    src={getImageSrc(article.featuredImage)}
                    alt={article.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href={`/tin-tuc/${article.slug}`} className="p-5 flex-1 flex flex-col">
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
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar size={14} />
                    <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl">
          <div className="w-24 h-24 bg-gradient-to-br from-sky-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={48} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            {search || category ? 'Không tìm thấy bài viết nào' : 'Chưa có bài viết nào'}
          </h3>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            {search || category
              ? 'Vui lòng thử lại với từ khóa hoặc bộ lọc khác để tìm ra bài viết bạn cần.'
              : 'Hiện tại chưa có bài viết nào được đăng tải. Vui lòng quay lại sau.'
            }
          </p>
          {(search || category) && (
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-lg hover:from-sky-600 hover:to-sky-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span>Xóa bộ lọc và xem tất cả</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticlesList;
