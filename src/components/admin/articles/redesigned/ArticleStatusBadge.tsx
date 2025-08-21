/**
 * Article Status Badge Component
 * Anime-inspired status indicators with glow effects
 */

'use client';

import React from 'react';
import { PublishedIcon, DraftIcon, ArchivedIcon, FeaturedIcon } from './svg/StatusIcons';
import './animations.css';

interface ArticleStatusBadgeProps {
  status: 'draft' | 'published' | 'archived';
  featured?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

const ArticleStatusBadge: React.FC<ArticleStatusBadgeProps> = ({
  status,
  featured = false,
  size = 'md',
  showText = true,
  animated = true,
  className = ""
}) => {
  const sizeClasses = {
    sm: {
      container: 'px-2 py-1 text-xs',
      icon: 16,
      text: 'text-xs'
    },
    md: {
      container: 'px-3 py-1.5 text-sm',
      icon: 20,
      text: 'text-sm'
    },
    lg: {
      container: 'px-4 py-2 text-base',
      icon: 24,
      text: 'text-base'
    }
  };

  const statusConfig = {
    published: {
      label: 'Đã xuất bản',
      bgClass: 'bg-gradient-to-r from-green-50 to-emerald-50',
      borderClass: 'border-green-200',
      textClass: 'text-green-700',
      glowClass: 'shadow-green-200/50',
      icon: PublishedIcon
    },
    draft: {
      label: 'Bản nháp',
      bgClass: 'bg-gradient-to-r from-yellow-50 to-orange-50',
      borderClass: 'border-yellow-200',
      textClass: 'text-yellow-700',
      glowClass: 'shadow-yellow-200/50',
      icon: DraftIcon
    },
    archived: {
      label: 'Lưu trữ',
      bgClass: 'bg-gradient-to-r from-red-50 to-pink-50',
      borderClass: 'border-red-200',
      textClass: 'text-red-700',
      glowClass: 'shadow-red-200/50',
      icon: ArchivedIcon
    }
  };

  const config = statusConfig[status];
  const sizes = sizeClasses[size];
  const StatusIcon = config.icon;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Main status badge */}
      <div className={`
        inline-flex items-center space-x-2 rounded-full border backdrop-blur-sm
        ${sizes.container}
        ${config.bgClass}
        ${config.borderClass}
        ${config.glowClass}
        ${animated ? 'hover:scale-105 transition-all duration-300' : ''}
        shadow-lg
      `}>
        <StatusIcon size={sizes.icon} animated={animated} />
        
        {showText && (
          <span className={`font-medium ${config.textClass} ${sizes.text}`}>
            {config.label}
          </span>
        )}
      </div>

      {/* Featured badge */}
      {featured && (
        <div className={`
          inline-flex items-center space-x-1 rounded-full border backdrop-blur-sm
          ${sizes.container}
          bg-gradient-to-r from-yellow-50 to-orange-50
          border-yellow-200
          shadow-yellow-200/50
          ${animated ? 'hover:scale-105 transition-all duration-300 animate-twinkle' : ''}
          shadow-sm
        `}>
          <FeaturedIcon size={sizes.icon} animated={animated} />
          
          {showText && (
            <span className={`font-medium text-yellow-700 ${sizes.text}`}>
              Nổi bật
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleStatusBadge;
