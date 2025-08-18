/**
 * Article Table Component
 * Hiển thị danh sách articles dạng table
 */

'use client';

import React, { useState } from 'react';
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
  onEdit: (article: Article) => void;
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
  onEdit,
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
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {onSelectAll && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedArticles.length === articles.length && articles.length > 0}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
              )}
              <SortableHeader field="title" className="min-w-[300px]">
                Bài viết
              </SortableHeader>
              <SortableHeader field="status">
                Trạng thái
              </SortableHeader>
              <SortableHeader field="category">
                Category
              </SortableHeader>
              <SortableHeader field="author">
                Tác giả
              </SortableHeader>
              <SortableHeader field="viewCount">
                Lượt xem
              </SortableHeader>
              <SortableHeader field="createdAt">
                Ngày tạo
              </SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article) => (
              <React.Fragment key={article.id}>
                <tr className="hover:bg-gray-50 transition-colors">
                  {onSelectArticle && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedArticles.includes(article.id)}
                        onChange={() => onSelectArticle(article.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                  )}
                  
                  {/* Article Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-4">
                      {/* Featured Image */}
                      <div className="flex-shrink-0">
                        <ArticleImage
                          featuredImage={article.featuredImage}
                          title={article.title}
                          width={60}
                          height={40}
                          className="w-15 h-10 rounded"
                          fallbackIcon="eye"
                          fallbackSize={16}
                        />
                      </div>
                      
                      {/* Title and Excerpt */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {article.title}
                          </h3>
                          {article.featured && (
                            <Star size={14} className="text-yellow-500 fill-current" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate mt-1">
                          {article.excerpt}
                        </p>
                        
                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {article.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {tag}
                              </span>
                            ))}
                            {article.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{article.tags.length - 3} khác
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(article.status)}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <FolderOpen size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {article.category?.name || 'Không có'}
                      </span>
                    </div>
                  </td>

                  {/* Author */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <User size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {article.author ? `${article.author.firstName} ${article.author.lastName}` : 'Không có'}
                      </span>
                    </div>
                  </td>

                  {/* View Count */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye size={14} />
                        <span>{article.viewCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart size={14} />
                        <span>{article.likeCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare size={14} />
                        <span>{article.commentCount.toLocaleString()}</span>
                      </div>
                    </div>
                  </td>

                  {/* Created Date */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {new Date(article.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onView(article)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onEdit(article)}
                        className="text-yellow-600 hover:text-yellow-900 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(article)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => toggleRowExpansion(article.id)}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        title="Xem thêm"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Expanded Row */}
                {expandedRows.has(article.id) && (
                  <tr className="bg-gray-50">
                    <td colSpan={onSelectAll ? 8 : 7} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Slug:</span>
                          <p className="text-gray-600 break-all">{article.slug}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Ngày xuất bản:</span>
                          <p className="text-gray-600">
                            {article.publishedAt 
                              ? new Date(article.publishedAt).toLocaleDateString('vi-VN')
                              : 'Chưa xuất bản'
                            }
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Thời gian đọc:</span>
                          <p className="text-gray-600">{article.readingTime || 0} phút</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">SEO Score:</span>
                          <p className="text-gray-600">{article.seoScore || 0}/100</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Cập nhật lần cuối:</span>
                          <p className="text-gray-600">
                            {new Date(article.updatedAt).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Hành động:</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <a
                              href={`/articles/${article.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                            >
                              <ExternalLink size={14} />
                              <span>Xem trên website</span>
                            </a>
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
  );
};

export default ArticleTable;
