/**
 * Articles Data Grid Component
 * Modern table view with anime-inspired styling and animations
 */

'use client';

import React, { useState, useMemo } from 'react';
import { 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Calendar,
  User,
  FolderOpen
} from 'lucide-react';
import { Article } from '@/types/articles';
import { ViewIcon, CommentIcon, LikeIcon } from './svg/StatusIcons';
import ArticleStatusBadge from './ArticleStatusBadge';
import ArticleMetrics from './ArticleMetrics';
import { Sparkles } from './svg/AnimeDecorations';
import './animations.css';

interface ArticlesDataGridProps {
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
  className?: string;
}

interface TableHeaderProps {
  label: string;
  field: string;
  sortable?: boolean;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  className?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  label,
  field,
  sortable = true,
  sortField,
  sortDirection,
  onSort,
  className = ""
}) => {
  const isActive = sortField === field;
  
  const handleSort = () => {
    if (!sortable || !onSort) return;
    
    const newDirection = isActive && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(field, newDirection);
  };

  return (
    <th
      className={`
        px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider
        ${sortable ? 'cursor-pointer hover:text-gray-800 transition-colors duration-200' : ''}
        ${className}
      `}
      onClick={handleSort}
    >
      <div className="flex items-center space-x-2">
        <span>{label}</span>
        {sortable && (
          <div className="flex flex-col">
            <ChevronUp
              size={12}
              className={`
                transition-colors duration-200
                ${isActive && sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}
              `}
            />
            <ChevronDown
              size={12}
              className={`
                -mt-1 transition-colors duration-200
                ${isActive && sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}
              `}
            />
          </div>
        )}
      </div>
    </th>
  );
};

interface TableRowProps {
  article: Article;
  selected: boolean;
  onSelect: (articleId: string) => void;
  onDelete: (article: Article) => void;
  onView: (article: Article) => void;
  index: number;
}

const TableRow: React.FC<TableRowProps> = ({
  article,
  selected,
  onSelect,
  onDelete,
  onView,
  index
}) => {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getAuthorName = (author: any) => {
    if (typeof author === 'string') return author;
    if (author?.firstName && author?.lastName) {
      return `${author.firstName} ${author.lastName}`;
    }
    return author?.username || 'Không xác định';
  };

  const getCategoryName = (category: any) => {
    if (typeof category === 'string') return category;
    return category?.name || 'Chưa phân loại';
  };

  return (
    <tr
      className={`
        group transition-all duration-300 hover:bg-blue-50 stagger-item
        ${selected ? 'bg-blue-100 border-l-4 border-blue-400' : ''}
      `}
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Selection checkbox */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(article.id)}
            className="
              h-4 w-4 text-blue-600 bg-white border-gray-300 rounded
              focus:ring-blue-500 focus:ring-2 transition-all duration-200
              hover:scale-110
            "
          />
        </div>
      </td>

      {/* Title and excerpt */}
      <td className="px-6 py-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-200 line-clamp-1">
              {article.title}
            </h3>
            {article.featured && (
              <div className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                Nổi bật
              </div>
            )}
          </div>
          <p className="text-xs text-gray-600 line-clamp-2 max-w-md">
            {article.excerpt}
          </p>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <ArticleStatusBadge status={article.status} featured={article.featured} />
      </td>

      {/* Author */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <User size={16} className="text-blue-500" />
          <span className="text-sm text-gray-700">
            {getAuthorName(article.author)}
          </span>
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <FolderOpen size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700">
            {getCategoryName(article.categories?.[0])}
          </span>
        </div>
      </td>

      {/* Metrics */}
      <td className="px-6 py-4 whitespace-nowrap">
        <ArticleMetrics
          views={article.viewCount}
          likes={article.likeCount}
          comments={article.commentCount}
          compact
        />
      </td>

      {/* Date */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-purple-500" />
          <div className="text-sm text-gray-700">
            <div>{formatDate(article.createdAt)}</div>
            {article.publishedAt && (
              <div className="text-xs text-gray-500">
                Xuất bản: {formatDate(article.publishedAt)}
              </div>
            )}
          </div>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className={`
          flex items-center justify-end space-x-2 transition-all duration-300
          ${showActions ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
        `}>
          <button
            onClick={() => onView(article)}
            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110"
            title="Xem chi tiết"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => window.open(`/admin/articles/${article.id}/edit`, '_blank')}
            className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100 rounded-lg transition-all duration-200 hover:scale-110"
            title="Chỉnh sửa"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={() => onDelete(article)}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110"
            title="Xóa"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

const ArticlesDataGrid: React.FC<ArticlesDataGridProps> = ({
  articles,
  onDelete,
  onView,
  onSort,
  sortField,
  sortDirection,
  loading = false,
  selectedArticles = [],
  onSelectArticle,
  onSelectAll,
  className = ""
}) => {
  const allSelected = articles.length > 0 && selectedArticles.length === articles.length;
  const someSelected = selectedArticles.length > 0 && selectedArticles.length < articles.length;

  const handleSelectAll = () => {
    if (onSelectAll) {
      onSelectAll(!allSelected);
    }
  };

  const handleSelectArticle = (articleId: string) => {
    if (onSelectArticle) {
      onSelectArticle(articleId);
    }
  };

  if (loading) {
    return (
      <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg ${className}`}>
        <div className="p-8 space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-16 bg-gray-100 rounded-lg skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className={`bg-white border border-gray-200 rounded-xl p-12 text-center shadow-lg ${className}`}>
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-gray-700">Không có bài viết nào</h3>
          <p className="text-gray-500">Hãy tạo bài viết đầu tiên của bạn!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
              </th>
              
              <TableHeader
                label="Tiêu đề"
                field="title"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              
              <TableHeader
                label="Trạng thái"
                field="status"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              
              <TableHeader
                label="Tác giả"
                field="author"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              
              <TableHeader
                label="Danh mục"
                field="category"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              
              <TableHeader
                label="Thống kê"
                field="viewCount"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              
              <TableHeader
                label="Ngày tạo"
                field="createdAt"
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
              />
              
              <TableHeader
                label="Thao tác"
                field=""
                sortable={false}
                className="text-right"
              />
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article, index) => (
              <TableRow
                key={article.id}
                article={article}
                selected={selectedArticles.includes(article.id)}
                onSelect={handleSelectArticle}
                onDelete={onDelete}
                onView={onView}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticlesDataGrid;
