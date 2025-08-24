/**
 * Article Card Component
 * Hiển thị article dạng card cho grid view
 */

'use client';

import React from 'react';
import Link from 'next/link';
import {
  Edit,
  Trash2,
  Eye,
  Star,
  Calendar,
  User,
  FolderOpen,
  Heart,
  MessageSquare,
  ExternalLink,
  Clock
} from 'lucide-react';
import { Article } from '@/types/articles';
import ArticleImage from '@/components/common/ArticleImage';

interface ArticleCardProps {
  article: Article;
  onDelete: (article: Article) => void;
  onView: (article: Article) => void;
  loading?: boolean;
  selected?: boolean;
  onSelect?: (articleId: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onDelete,
  onView,
  loading = false,
  selected = false,
  onSelect
}) => {
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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 ${
      selected ? 'ring-2 ring-blue-500 border-blue-500' : ''
    }`}>
      {/* Selection Checkbox */}
      {onSelect && (
        <div className="absolute top-3 left-3 z-10">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(article.id)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white"
          />
        </div>
      )}

      {/* Featured Image */}
      <div className="relative h-48">
        <ArticleImage
          featuredImage={article.featuredImage}
          title={article.title}
          fill
          className="w-full h-full"

        />
        
        {/* Featured Badge */}
        {article.featured && (
          <div className="absolute top-3 right-3">
            <div className="bg-yellow-500 text-white p-1 rounded-full">
              <Star size={16} className="fill-current" />
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          {getStatusBadge(article.status)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
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
                +{article.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Meta Information */}
        <div className="space-y-2 mb-4">
          {/* Category and Author */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <FolderOpen size={14} />
              <span>{article.category?.name || 'Không có'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>
                {article.author 
                  ? `${article.author.firstName} ${article.author.lastName}` 
                  : 'Không có'
                }
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-3">
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
            {article.readingTime && (
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{article.readingTime} phút</span>
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar size={12} />
              <span>Tạo: {new Date(article.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
            {article.publishedAt && (
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>XB: {new Date(article.publishedAt).toLocaleDateString('vi-VN')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onView(article)}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
              title="Xem chi tiết"
            >
              <Eye size={14} />
              <span>Xem</span>
            </button>
            <Link
              href={`/admin/articles/edit/${article.id}`}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded transition-colors"
              title="Chỉnh sửa"
            >
              <Edit size={14} />
              <span>Sửa</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={`/tin-tuc/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
              title="Xem trên website"
            >
              <ExternalLink size={14} />
            </a>
            <button
              onClick={() => onDelete(article)}
              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
              title="Xóa"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* SEO Score Indicator */}
      {article.seoScore !== undefined && (
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>SEO Score</span>
            <span>{article.seoScore}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full ${
                article.seoScore >= 80 ? 'bg-green-500' :
                article.seoScore >= 60 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${article.seoScore}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
