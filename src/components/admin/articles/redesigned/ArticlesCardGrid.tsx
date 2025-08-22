/**
 * Articles Card Grid Component
 * Masonry-style grid with anime-inspired cards
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Edit, 
  Trash2, 
  Eye, 
  ExternalLink,
  Calendar,
  User,
  FolderOpen,
  Clock,
  MoreVertical
} from 'lucide-react';
import { Article } from '@/types/articles';
import ArticleStatusBadge from './ArticleStatusBadge';
import ArticleMetrics from './ArticleMetrics';
import { Sparkles, EnergyOrb } from './svg/AnimeDecorations';
import './animations.css';

interface ArticlesCardGridProps {
  articles: Article[];
  onDelete: (article: Article) => void;
  onView: (article: Article) => void;
  loading?: boolean;
  selectedArticles?: string[];
  onSelectArticle?: (articleId: string) => void;
  className?: string;
}

interface ArticleCardProps {
  article: Article;
  selected: boolean;
  onSelect: (articleId: string) => void;
  onDelete: (article: Article) => void;
  onView: (article: Article) => void;
  index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  selected,
  onSelect,
  onDelete,
  onView,
  index
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const getImageUrl = (featuredImage: any): string => {
    if (typeof featuredImage === 'string' && featuredImage.trim() !== '') {
      return featuredImage;
    }
    if (typeof featuredImage?.url === 'string' && featuredImage.url.trim() !== '') {
      return featuredImage.url;
    }
    return '/images/default-article.jpg'; // Fallback image
  };

  const readingTime = article.readingTime || Math.ceil(article.content?.length / 1000) || 1;

  return (
    <div
      className={`
        group relative bg-white border border-gray-200 rounded-xl overflow-hidden
        shadow-md hover:shadow-lg
        transition-all duration-300 hover:-translate-y-1
        ${selected ? 'ring-2 ring-blue-500' : ''}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >

      {/* Selection checkbox */}
      <div className="absolute top-4 left-4 z-20">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(article.id)}
          className="
            h-5 w-5 text-blue-600 bg-white/70 border-gray-300 rounded
            focus:ring-blue-500 focus:ring-2 transition-all duration-200
            hover:scale-110 backdrop-blur-sm
          "
        />
      </div>

      {/* Featured image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={getImageUrl(article.featuredImage)}
          alt={article.title}
          fill
          className={`
            object-cover transition-all duration-500 group-hover:scale-110
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          onLoad={() => setImageLoaded(true)}
        />
        
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Status badges */}
        <div className="absolute top-4 right-4">
          <ArticleStatusBadge 
            status={article.status} 
            featured={article.featured}
            size="sm"
            showText={false}
          />
        </div>

        {/* Quick actions */}
        <div className={`
          absolute top-4 right-16 flex items-center space-x-2
          transition-all duration-300 transform
          ${showActions ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
        `}>
          <button
            onClick={() => onView(article)}
            className="p-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-110"
            title="Xem chi tiết"
          >
            <Eye size={16} />
          </button>

          <Link
            href={`/admin/articles/${article.id}/edit`}
            className="p-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-110"
            title="Chỉnh sửa"
          >
            <Edit size={16} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Meta information */}
        <div className="space-y-3">
          {/* Author and category */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <User size={14} />
              <span>{getAuthorName(article.author)}</span>
            </div>

            <div className="flex items-center space-x-2">
              <FolderOpen size={14} />
              <span>{getCategoryName(article.categories?.[0])}</span>
            </div>
          </div>

          {/* Date and reading time */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar size={14} />
              <span>{formatDate(article.createdAt)}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock size={14} />
              <span>{readingTime} phút đọc</span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <ArticleMetrics
          views={article.viewCount}
          likes={article.likeCount}
          comments={article.commentCount}
          compact
        />

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Link
              href={`/tin-tuc/${article.slug}`}
              target="_blank"
              className="flex items-center space-x-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-all duration-200 hover:scale-105"
            >
              <ExternalLink size={14} />
              <span>Xem</span>
            </Link>
            
            <Link
              href={`/admin/articles/${article.id}/edit`}
              className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium hover:bg-yellow-200 transition-all duration-200 hover:scale-105"
            >
              <Edit size={14} />
              <span>Sửa</span>
            </Link>
          </div>

          <button
            onClick={() => onDelete(article)}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110"
            title="Xóa bài viết"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>


    </div>
  );
};

const ArticlesCardGrid: React.FC<ArticlesCardGridProps> = ({
  articles,
  onDelete,
  onView,
  loading = false,
  selectedArticles = [],
  onSelectArticle,
  className = ""
}) => {
  const handleSelectArticle = (articleId: string) => {
    if (onSelectArticle) {
      onSelectArticle(articleId);
    }
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-96 bg-gray-100 rounded-xl skeleton"
          />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
        <div className="text-center space-y-4">
          <div className="mx-auto w-24 h-24 text-gray-300">
            <FolderOpen size={96} />
          </div>
          <h3 className="text-2xl font-bold text-gray-700">Không có bài viết nào</h3>
          <p className="text-gray-500 max-w-md">
            Hãy tạo bài viết đầu tiên của bạn để bắt đầu chia sẻ nội dung tuyệt vời!
          </p>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-105"
          >
            <span>Tạo bài viết đầu tiên</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {articles.map((article, index) => (
        <ArticleCard
          key={article.id}
          article={article}
          selected={selectedArticles.includes(article.id)}
          onSelect={handleSelectArticle}
          onDelete={onDelete}
          onView={onView}
          index={index}
        />
      ))}
    </div>
  );
};

export default ArticlesCardGrid;
