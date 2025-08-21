/**
 * Articles List Component
 * Displays paginated list of articles with card layout
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Eye, ArrowRight, Newspaper, Search } from 'lucide-react';
import { Article } from '@/types/articles';

interface ArticlesListProps {
  articles: Article[];
  currentPage: number;
  totalPages: number;
  isFirstPage?: boolean;
  search?: string;
  category?: string;
}

const ArticlesList: React.FC<ArticlesListProps> = ({ 
  articles, 
  currentPage, 
  totalPages,
  isFirstPage = false,
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

  const getAuthorName = (author: { firstName?: string; lastName?: string } | null | undefined) => {
    if (!author) return 'Tác giả ẩn danh';
    return `${author.firstName || ''} ${author.lastName || ''}`.trim() || 'Tác giả ẩn danh';
  };

  const getImageSrc = (featuredImage: string | { url?: string } | null | undefined) => {
    if (!featuredImage) return '/images/default-article.svg';
    return typeof featuredImage === 'string' ? featuredImage : featuredImage?.url || '/images/default-article.svg';
  };

  // Filter articles for display (skip first 3 on first page if they're featured)
  const displayArticles = isFirstPage && articles.length >= 3 ? articles.slice(3) : articles;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl">
            <Newspaper size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {currentPage === 1 ? '📰 Tất cả tin tức' : `📰 Tin tức - Trang ${currentPage}`}
            </h2>
            <p className="text-gray-600">
              {currentPage === 1 ? 'Danh sách đầy đủ các bài viết mới nhất' : `Hiển thị trang ${currentPage} của ${totalPages}`}
            </p>
          </div>
        </div>
        {totalPages > 1 && (
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
            <span>Trang {currentPage} / {totalPages}</span>
          </div>
        )}
      </div>
      
      {displayArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-sky-200 hover:-translate-y-1 flex flex-col h-full">
              <Link href={`/tin-tuc/${article.slug}`}>
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={getImageSrc(article.featuredImage)}
                    alt={article.title}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  {article.category && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-sky-500/90 text-white backdrop-blur-sm">
                        {article.category.name}
                      </span>
                    </div>
                  )}

                  {/* Read More Button */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                      <ArrowRight size={16} className="text-sky-500" />
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-sky-500 transition-colors line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                    {article.excerpt}
                  </p>

                  {/* Enhanced Meta */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center">
                        <User size={10} className="text-sky-500" />
                      </div>
                      <span className="text-xs font-medium text-gray-700 truncate max-w-[100px]">
                        {getAuthorName(article.author)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={10} />
                        <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={10} />
                        <span>{article.viewCount?.toLocaleString() || '0'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={64} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {search || category ? 'Không tìm thấy bài viết nào' : 'Chưa có bài viết nào'}
          </h3>
          <p className="text-gray-600 mb-4">
            {search || category 
              ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
              : 'Hệ thống đang được cập nhật. Vui lòng quay lại sau.'
            }
          </p>
          {(search || category) && (
            <Link
              href="/tin-tuc"
              className="inline-flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Xem tất cả tin tức
              <ArrowRight size={16} className="ml-2" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticlesList;
