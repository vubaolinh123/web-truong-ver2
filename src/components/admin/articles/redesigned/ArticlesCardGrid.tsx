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

  const getImageUrl = (featuredImage: any) => {
    if (typeof featuredImage === 'string') return featuredImage;
    return featuredImage?.url || '/images/default-article.jpg';
  };

  const readingTime = article.readingTime || Math.ceil(article.content?.length / 1000) || 1;

  return (
    <div 
      className={`
        group relative bg-gradient-to-br from-slate-900/90 to-blue-900/90 
        backdrop-blur-sm border border-cyan-400/20 rounded-2xl overflow-hidden
        shadow-xl hover:shadow-2xl hover:shadow-cyan-400/20
        transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2
        stagger-item card-hover
        ${selected ? 'ring-2 ring-cyan-400 ring-opacity-50' : ''}
      `}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Background decorations */}
      <div className="absolute top-2 right-2 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
        <Sparkles size="sm" color="primary" />
      </div>
      
      <div className="absolute bottom-2 left-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <EnergyOrb size="sm" color="secondary" />
      </div>

      {/* Selection checkbox */}
      <div className="absolute top-4 left-4 z-20">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(article.id)}
          className="
            h-5 w-5 text-cyan-600 bg-slate-800/80 border-cyan-400/50 rounded
            focus:ring-cyan-500 focus:ring-2 transition-all duration-200
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
          <div className="absolute inset-0 bg-slate-800/50 animate-shimmer" />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

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
            className="p-2 bg-slate-800/80 backdrop-blur-sm text-cyan-400 hover:text-cyan-300 rounded-lg transition-all duration-200 hover:scale-110"
            title="Xem chi tiết"
          >
            <Eye size={16} />
          </button>
          
          <button
            onClick={() => window.open(`/admin/articles/${article.id}/edit`, '_blank')}
            className="p-2 bg-slate-800/80 backdrop-blur-sm text-yellow-400 hover:text-yellow-300 rounded-lg transition-all duration-200 hover:scale-110"
            title="Chỉnh sửa"
          >
            <Edit size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-cyan-100 group-hover:text-cyan-200 transition-colors duration-300 line-clamp-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-cyan-300/80 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Meta information */}
        <div className="space-y-3">
          {/* Author and category */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-cyan-300">
              <User size={14} />
              <span>{getAuthorName(article.author)}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-yellow-300">
              <FolderOpen size={14} />
              <span>{getCategoryName(article.category)}</span>
            </div>
          </div>

          {/* Date and reading time */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-purple-300">
              <Calendar size={14} />
              <span>{formatDate(article.createdAt)}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-green-300">
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
        <div className="flex items-center justify-between pt-4 border-t border-cyan-400/20">
          <div className="flex items-center space-x-2">
            <Link
              href={`/articles/${article.slug}`}
              target="_blank"
              className="flex items-center space-x-1 px-3 py-1.5 bg-green-600/20 border border-green-400/30 text-green-300 rounded-lg text-xs font-medium hover:bg-green-600/30 transition-all duration-200 hover:scale-105"
            >
              <ExternalLink size={14} />
              <span>Xem</span>
            </Link>
            
            <Link
              href={`/admin/articles/${article.id}/edit`}
              className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-600/20 border border-yellow-400/30 text-yellow-300 rounded-lg text-xs font-medium hover:bg-yellow-600/30 transition-all duration-200 hover:scale-105"
            >
              <Edit size={14} />
              <span>Sửa</span>
            </Link>
          </div>

          <button
            onClick={() => onDelete(article)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all duration-200 hover:scale-110"
            title="Xóa bài viết"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 transition-opacity duration-500 pointer-events-none" />
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
            className="h-96 bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-2xl border border-cyan-400/20 skeleton"
          />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
        <div className="text-center space-y-4">
          <div className="mx-auto w-32 h-32 opacity-50">
            <EnergyOrb size="lg" color="primary" />
          </div>
          <h3 className="text-2xl font-bold text-cyan-200">Không có bài viết nào</h3>
          <p className="text-cyan-300/70 max-w-md">
            Hãy tạo bài viết đầu tiên của bạn để bắt đầu chia sẻ nội dung tuyệt vời!
          </p>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 hover:scale-105"
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
