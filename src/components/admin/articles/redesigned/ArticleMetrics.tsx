/**
 * Article Metrics Component
 * Display views, likes, and comments with anime styling
 */

'use client';

import React from 'react';
import { ViewIcon, CommentIcon, LikeIcon } from './svg/StatusIcons';
import { TrendingIcon, PopularIcon } from './svg/StatusIcons';
import './animations.css';

interface ArticleMetricsProps {
  views: number;
  likes: number;
  comments: number;
  trending?: boolean;
  popular?: boolean;
  compact?: boolean;
  animated?: boolean;
  className?: string;
}

interface MetricItemProps {
  icon: React.ComponentType<any>;
  value: number;
  label: string;
  color: string;
  compact?: boolean;
  animated?: boolean;
}

const MetricItem: React.FC<MetricItemProps> = ({
  icon: Icon,
  value,
  label,
  color,
  compact = false,
  animated = true
}) => {
  const formatValue = (num: number): string => {
    // Handle undefined, null, or non-numeric values
    if (num == null || isNaN(num)) {
      return '0';
    }

    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  if (compact) {
    return (
      <div className={`
        flex items-center space-x-1 px-2 py-1 rounded-lg
        bg-gray-100 border border-gray-200
        ${animated ? 'hover:scale-105 transition-all duration-200' : ''}
      `}>
        <Icon size={14} className={color} animated={false} />
        <span className="text-xs text-gray-700 font-medium">
          {formatValue(value)}
        </span>
      </div>
    );
  }

  return (
    <div className={`
      flex flex-col items-center space-y-1 p-3 rounded-xl
      bg-gradient-to-br from-gray-50 to-gray-100
      border border-gray-200 backdrop-blur-sm
      ${animated ? 'hover:scale-105 hover:shadow-lg transition-all duration-300' : ''}
    `}>
      <Icon size={20} className={color} animated={animated} />
      <div className="text-center">
        <div className="text-lg font-bold text-gray-900">
          {formatValue(value)}
        </div>
        <div className="text-xs text-gray-600">
          {label}
        </div>
      </div>
    </div>
  );
};

const ArticleMetrics: React.FC<ArticleMetricsProps> = ({
  views,
  likes,
  comments,
  trending = false,
  popular = false,
  compact = false,
  animated = true,
  className = ""
}) => {
  // Ensure all values are valid numbers
  const safeViews = views ?? 0;
  const safeLikes = likes ?? 0;
  const safeComments = comments ?? 0;

  const metrics = [
    {
      icon: ViewIcon,
      value: safeViews,
      label: 'Lượt xem',
      color: 'text-blue-600'
    },
    {
      icon: LikeIcon,
      value: safeLikes,
      label: 'Thích',
      color: 'text-red-600'
    },
    {
      icon: CommentIcon,
      value: safeComments,
      label: 'Bình luận',
      color: 'text-yellow-600'
    }
  ];

  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {metrics.map((metric, index) => (
          <MetricItem
            key={index}
            {...metric}
            compact={compact}
            animated={animated}
          />
        ))}
        
        {/* Special indicators */}
        <div className="flex items-center space-x-1">
          {trending && (
            <div className="p-1 rounded-full bg-cyan-600/20 border border-cyan-400/30">
              <TrendingIcon size={12} animated={animated} />
            </div>
          )}
          
          {popular && (
            <div className="p-1 rounded-full bg-red-600/20 border border-red-400/30">
              <PopularIcon size={12} animated={animated} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main metrics */}
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <MetricItem
            key={index}
            {...metric}
            compact={compact}
            animated={animated}
          />
        ))}
      </div>

      {/* Special indicators */}
      {(trending || popular) && (
        <div className="flex items-center justify-center space-x-4">
          {trending && (
            <div className={`
              flex items-center space-x-2 px-3 py-2 rounded-xl
              bg-gradient-to-r from-cyan-600/20 to-blue-600/20
              border border-cyan-400/30 backdrop-blur-sm
              ${animated ? 'animate-bounce' : ''}
            `}>
              <TrendingIcon size={16} animated={animated} />
              <span className="text-cyan-300 text-sm font-medium">
                Đang thịnh hành
              </span>
            </div>
          )}
          
          {popular && (
            <div className={`
              flex items-center space-x-2 px-3 py-2 rounded-xl
              bg-gradient-to-r from-red-600/20 to-pink-600/20
              border border-red-400/30 backdrop-blur-sm
              ${animated ? 'animate-pulse' : ''}
            `}>
              <PopularIcon size={16} animated={animated} />
              <span className="text-red-300 text-sm font-medium">
                Phổ biến
              </span>
            </div>
          )}
        </div>
      )}

      {/* Engagement rate */}
      <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="text-purple-300 text-sm font-medium">
            Tỷ lệ tương tác
          </span>
          <span className="text-purple-200 text-sm font-bold">
            {safeViews > 0 ? (((safeLikes + safeComments) / safeViews * 100).toFixed(1)) : '0'}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-2 w-full bg-slate-800/50 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min((safeLikes + safeComments) / Math.max(safeViews, 1) * 100, 100)}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleMetrics;
