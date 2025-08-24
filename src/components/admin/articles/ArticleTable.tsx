/**
 * Article Table Component
 * Hiển thị danh sách articles dạng table
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Star,
  Calendar,
  User,
  FolderOpen,
  Heart,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { Article } from '@/types/articles';
import ArticleImage from '@/components/common/ArticleImage';

interface ArticleTableProps {
  articles: Article[];
  onDelete: (article: Article) => void;
  onView: (article: Article) => void;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  loading?: boolean;
  selectedArticles?: string[];
  onSelectArticle?: (articleId: string) => void;
  onSelectAll?: (selected: boolean) => void;
}

const ArticleTable: React.FC<ArticleTableProps> = ({
  articles,
  onDelete,
  onView,
  onSort,
  sortField,
  sortDirection,
  loading = false,
  selectedArticles = [],
  onSelectArticle,
  onSelectAll
}) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleSort = (field: string) => {
    if (onSort) {
      const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(field, direction);
    }
  };

  const toggleRowExpansion = (articleId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(articleId)) {
      newExpanded.delete(articleId);
    } else {
      newExpanded.add(articleId);
    }
    setExpandedRows(newExpanded);
  };

  // Utility functions
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { bg: 'bg-green-100', text: 'text-green-800', label: 'Đã xuất bản' },
      draft: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Bản nháp' },
      archived: { bg: 'bg-red-100', text: 'text-red-800', label: 'Lưu trữ' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const SortableHeader: React.FC<{ field: string; children: React.ReactNode; className?: string }> = ({ 
    field, 
    children, 
    className = '' 
  }) => (
    <th 
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${className}`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field && (
          sortDirection === 'asc' ? 
            <ChevronUp size={14} /> : 
            <ChevronDown size={14} />
        )}
      </div>
    </th>
  );

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 border-t border-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <Eye size={48} className="text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Không có bài viết nào
        </h3>
        <p className="text-gray-500">
          Chưa có bài viết nào được tạo hoặc không có bài viết nào phù hợp với bộ lọc.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Mobile Card View - Visible on mobile and tablet */}
      <div className="block xl:hidden">
        {/* Container with responsive max-width for better content-aware sizing */}
        <div className="space-y-3 p-3 sm:p-4 max-w-full">
          {/* NEW Tablet View - Optimized Grid Layout (768px - 1279px) */}
          <div className="hidden md:block lg:hidden">
            {loading ? (
              // Tablet Loading State
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4 animate-pulse">
                    <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-start">
                      <div className="w-20 h-16 bg-gray-200 rounded"></div>
                      <div className="space-y-3">
                        <div className="h-5 bg-gray-200 rounded w-96"></div>
                        <div className="h-4 bg-gray-200 rounded w-80"></div>
                        <div className="grid grid-cols-4 gap-4 mt-3">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="w-20 h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    {/* Main Article Layout - 3 Column Grid */}
                    <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-start">
                      {/* Column 1: Image */}
                      <ArticleImage
                        featuredImage={article.featuredImage}
                        title={article.title}
                        width={80}
                        height={64}
                        className="w-20 h-16 rounded flex-shrink-0"

                      />

                      {/* Column 2: Content */}
                      <div className="min-w-0">
                        {/* Title and Excerpt */}
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <h3
                              className="text-base font-semibold text-gray-900 truncate"
                              title={article.title}
                              style={{ maxWidth: '500px' }}
                            >
                              {article.title}
                            </h3>
                            {article.featured && (
                              <Star size={16} className="text-yellow-500 fill-current flex-shrink-0" />
                            )}
                          </div>
                          <p
                            className="text-sm text-gray-600 line-clamp-2"
                            title={article.excerpt}
                            style={{ maxWidth: '500px' }}
                          >
                            {article.excerpt}
                          </p>
                        </div>

                        {/* Meta Information Grid */}
                        <div className="grid grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="text-gray-500 font-medium">Tác giả</span>
                            <p className="text-gray-900 mt-1 truncate" title={article.author ? `${article.author.firstName} ${article.author.lastName}` : 'N/A'}>
                              {article.author ? `${article.author.firstName} ${article.author.lastName}` : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500 font-medium">Lượt xem</span>
                            <p className="text-gray-900 mt-1">{formatNumber(article.viewCount)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500 font-medium">Danh mục</span>
                            <p className="text-gray-900 mt-1 truncate" title={article.category?.name || 'N/A'}>
                              {article.category?.name || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500 font-medium">Ngày tạo</span>
                            <p className="text-gray-900 mt-1">{formatDate(article.createdAt)}</p>
                          </div>
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                          <div>
                            {onSelectArticle && (
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedArticles.includes(article.id)}
                                  onChange={() => onSelectArticle(article.id)}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-sm text-gray-600">Chọn</span>
                              </label>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onView(article)}
                              className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-md hover:bg-blue-50"
                              title="Xem chi tiết"
                            >
                              <Eye size={18} />
                            </button>
                            <Link
                              href={`/admin/articles/edit/${article.id}`}
                              className="text-yellow-600 hover:text-yellow-800 transition-colors p-2 rounded-md hover:bg-yellow-50 inline-flex items-center"
                              title="Chỉnh sửa"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => onDelete(article)}
                              className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-md hover:bg-red-50"
                              title="Xóa"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Column 3: Status Badge */}
                      <div className="flex-shrink-0">
                        {getStatusBadge(article.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile view (below md breakpoint) */}
          <div className="block md:hidden space-y-3">
            {loading ? (
              // Mobile Loading State
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3 animate-pulse">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-9 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              articles.map((article) => (
                <div key={article.id} className="bg-gray-50 rounded-lg p-3 space-y-3 hover:bg-gray-100 transition-colors">
                  {/* Mobile Article Header */}
                  <div className="flex items-start space-x-2">
                    <ArticleImage
                      featuredImage={article.featuredImage}
                      title={article.title}
                      width={48}
                      height={36}
                      className="w-12 h-9 rounded flex-shrink-0"

                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1 mb-1">
                            <h3
                              className="text-sm font-medium text-gray-900 line-clamp-2"
                              title={article.title}
                            >
                              {article.title}
                            </h3>
                            {article.featured && (
                              <Star size={12} className="text-yellow-500 fill-current flex-shrink-0" />
                            )}
                          </div>
                          <p
                            className="text-xs text-gray-500 line-clamp-2"
                            title={article.excerpt}
                          >
                            {article.excerpt}
                          </p>
                        </div>
                        {/* Status Badge */}
                        <div className="flex-shrink-0">
                          {getStatusBadge(article.status)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Meta - Compact grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="min-w-0">
                      <span className="text-gray-500 block">Tác giả:</span>
                      <p className="text-gray-900 mt-1 truncate font-medium" title={article.author ? `${article.author.firstName} ${article.author.lastName}` : 'N/A'}>
                        {article.author ? `${article.author.firstName} ${article.author.lastName}` : 'N/A'}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <span className="text-gray-500 block">Lượt xem:</span>
                      <p className="text-gray-900 mt-1 font-medium">{formatNumber(article.viewCount)}</p>
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <div className="flex items-center">
                      {onSelectArticle && (
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedArticles.includes(article.id)}
                            onChange={() => onSelectArticle(article.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </label>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => onView(article)}
                        className="text-blue-600 hover:text-blue-900 transition-colors p-2 rounded-md hover:bg-blue-50"
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <Link
                        href={`/admin/articles/edit/${article.id}`}
                        className="text-yellow-600 hover:text-yellow-900 transition-colors p-2 rounded-md hover:bg-yellow-50 inline-flex items-center"
                        title="Chỉnh sửa"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => onDelete(article)}
                        className="text-red-600 hover:text-red-900 transition-colors p-2 rounded-md hover:bg-red-50"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* REDESIGNED Desktop Table View - Enhanced Layout (≥ 1280px) */}
      <div className="hidden xl:block">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                {onSelectAll && (
                  <th className="px-6 py-4 text-left w-16">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedArticles.length === articles.length && articles.length > 0}
                        onChange={(e) => onSelectAll(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </th>
                )}
                <SortableHeader field="title" className="px-6 py-4 text-left min-w-[400px] xl:min-w-[450px] 2xl:min-w-[500px]">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Bài viết</span>
                  </div>
                </SortableHeader>
                <SortableHeader field="author" className="px-6 py-4 text-left w-48">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Tác giả</span>
                  </div>
                </SortableHeader>
                <SortableHeader field="category" className="px-6 py-4 text-left w-40">
                  <div className="flex items-center space-x-2">
                    <FolderOpen size={16} className="text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Danh mục</span>
                  </div>
                </SortableHeader>
                <SortableHeader field="status" className="px-6 py-4 text-left w-36">
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Trạng thái</span>
                </SortableHeader>
                <SortableHeader field="viewCount" className="px-6 py-4 text-left w-32">
                  <div className="flex items-center space-x-2">
                    <Eye size={16} className="text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Lượt xem</span>
                  </div>
                </SortableHeader>
                <SortableHeader field="createdAt" className="px-6 py-4 text-left w-40">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Ngày tạo</span>
                  </div>
                </SortableHeader>
                <th className="px-6 py-4 text-center w-36">
                  <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Thao tác</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {articles.map((article, index) => (
                <React.Fragment key={article.id}>
                  <tr className={`group hover:bg-blue-50 transition-all duration-200 border-b border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    {onSelectArticle && (
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedArticles.includes(article.id)}
                            onChange={() => onSelectArticle(article.id)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                          />
                        </div>
                      </td>
                    )}

                    {/* Enhanced Article Info Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-start space-x-4">
                        {/* Enhanced Featured Image */}
                        <div className="flex-shrink-0">
                          <div className="relative group-hover:scale-105 transition-transform duration-200">
                            <ArticleImage
                              featuredImage={article.featuredImage}
                              title={article.title}
                              width={80}
                              height={60}
                              className="w-20 h-15 rounded-lg shadow-sm border border-gray-200"

                            />
                            {article.featured && (
                              <div className="absolute -top-2 -right-2">
                                <Star size={16} className="text-yellow-500 fill-current drop-shadow-sm" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Enhanced Title and Content */}
                        <div className="flex-1 min-w-0">
                          <div className="mb-2">
                            <h3
                              className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors"
                              title={article.title}
                            >
                              {article.title}
                            </h3>
                          </div>

                          <p
                            className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed"
                            title={article.excerpt}
                          >
                            {article.excerpt}
                          </p>

                          {/* Enhanced Tags Display */}
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {article.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                                  title={tag}
                                >
                                  {tag.length > 12 ? `${tag.substring(0, 12)}...` : tag}
                                </span>
                              ))}
                              {article.tags.length > 3 && (
                                <span
                                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                                  title={`Còn ${article.tags.length - 3} tag khác: ${article.tags.slice(3).join(', ')}`}
                                >
                                  +{article.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Enhanced Author Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <User size={14} className="text-white" />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p
                            className="text-sm font-medium text-gray-900 truncate"
                            title={article.author ? `${article.author.firstName} ${article.author.lastName}` : 'Chưa có tác giả'}
                          >
                            {article.author ? `${article.author.firstName} ${article.author.lastName}` : 'Chưa có tác giả'}
                          </p>
                          <p className="text-xs text-gray-500">Tác giả</p>
                        </div>
                      </div>
                    </td>

                    {/* Enhanced Category Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded flex items-center justify-center">
                            <FolderOpen size={12} className="text-white" />
                          </div>
                        </div>
                        <span
                          className="text-sm font-medium text-gray-900 truncate"
                          title={article.category?.name || 'Chưa phân loại'}
                        >
                          {article.category?.name || 'Chưa phân loại'}
                        </span>
                      </div>
                    </td>

                    {/* Enhanced Status Column */}
                    <td className="px-6 py-5">
                      <div className="flex justify-start">
                        {getStatusBadge(article.status)}
                      </div>
                    </td>

                    {/* Enhanced View Count Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded flex items-center justify-center">
                            <Eye size={12} className="text-white" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{formatNumber(article.viewCount)}</p>
                          <p className="text-xs text-gray-500">lượt xem</p>
                        </div>
                      </div>
                    </td>

                    {/* Enhanced Created Date Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded flex items-center justify-center">
                            <Calendar size={12} className="text-white" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(article.createdAt)}
                          </p>
                          <p className="text-xs text-gray-500">ngày tạo</p>
                        </div>
                      </div>
                    </td>

                    {/* Enhanced Actions Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center space-x-1">
                        <div className="flex items-center bg-gray-50 rounded-lg p-1 space-x-1 group-hover:bg-white transition-colors">
                          <button
                            onClick={() => onView(article)}
                            className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-md transition-all duration-200 tooltip"
                            title="Xem chi tiết"
                          >
                            <Eye size={16} />
                          </button>
                          <Link
                            href={`/admin/articles/edit/${article.id}`}
                            className="p-2 text-yellow-600 hover:text-white hover:bg-yellow-600 rounded-md transition-all duration-200 inline-flex items-center"
                            title="Chỉnh sửa"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => onDelete(article)}
                            className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-md transition-all duration-200"
                            title="Xóa"
                          >
                            <Trash2 size={16} />
                          </button>
                          <div className="w-px h-6 bg-gray-300"></div>
                          <button
                            onClick={() => toggleRowExpansion(article.id)}
                            className={`p-2 rounded-md transition-all duration-200 ${
                              expandedRows.has(article.id)
                                ? 'text-white bg-gray-600'
                                : 'text-gray-600 hover:text-white hover:bg-gray-600'
                            }`}
                            title={expandedRows.has(article.id) ? "Thu gọn" : "Xem thêm"}
                          >
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Enhanced Expanded Row */}
                  {expandedRows.has(article.id) && (
                    <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
                      <td colSpan={onSelectAll ? 8 : 7} className="px-6 py-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                          <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Chi tiết bài viết</h4>
                            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded"></div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <div className="space-y-4">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">S</span>
                                  </div>
                                  <span className="font-semibold text-gray-700">Slug</span>
                                </div>
                                <p className="text-gray-600 break-all text-sm font-mono bg-white p-2 rounded border">
                                  {article.slug}
                                </p>
                              </div>

                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                                    <Calendar size={12} className="text-white" />
                                  </div>
                                  <span className="font-semibold text-gray-700">Ngày xuất bản</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                  {article.publishedAt
                                    ? new Date(article.publishedAt).toLocaleDateString('vi-VN', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })
                                    : 'Chưa xuất bản'
                                  }
                                </p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-6 h-6 bg-purple-500 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">⏱</span>
                                  </div>
                                  <span className="font-semibold text-gray-700">Thời gian đọc</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                  <span className="text-lg font-bold text-purple-600">{article.readingTime || 0}</span> phút
                                </p>
                              </div>

                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">SEO</span>
                                  </div>
                                  <span className="font-semibold text-gray-700">SEO Score</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full ${
                                        (article.seoScore || 0) >= 80 ? 'bg-green-500' :
                                        (article.seoScore || 0) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}
                                      style={{ width: `${article.seoScore || 0}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-bold text-gray-700">{article.seoScore || 0}/100</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">📝</span>
                                  </div>
                                  <span className="font-semibold text-gray-700">Cập nhật lần cuối</span>
                                </div>
                                <p className="text-gray-600 text-sm">
                                  {new Date(article.updatedAt).toLocaleDateString('vi-VN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>

                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center space-x-2 mb-3">
                                  <div className="w-6 h-6 bg-teal-500 rounded flex items-center justify-center">
                                    <ExternalLink size={12} className="text-white" />
                                  </div>
                                  <span className="font-semibold text-gray-700">Hành động</span>
                                </div>
                                <a
                                  href={`/tin-tuc/${article.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                  <ExternalLink size={16} />
                                  <span>Xem trên website</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArticleTable;
