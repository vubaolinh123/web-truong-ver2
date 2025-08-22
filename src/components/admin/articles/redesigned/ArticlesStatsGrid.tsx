/**
 * Articles Statistics Grid Component
 * Anime-inspired statistics display with floating cards and animations
 */

'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Eye, 
  Heart, 
  MessageSquare,
  TrendingUp, 
  Star,
  Calendar,
  Users,
  Activity,
  BarChart3
} from 'lucide-react';
import { ArticleStatistics } from '@/types/articles';

import './animations.css';

interface ArticlesStatsGridProps {
  statistics: ArticleStatistics | null;
  loading?: boolean;
  className?: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ComponentType<any>;
  color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  color,
  trend,
  delay = 0
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const colorClasses = {
    primary: {
      bg: 'from-blue-50 to-cyan-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      glow: 'shadow-blue-200/50',
      text: 'text-blue-900'
    },
    secondary: {
      bg: 'from-yellow-50 to-orange-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      glow: 'shadow-yellow-200/50',
      text: 'text-yellow-900'
    },
    accent: {
      bg: 'from-purple-50 to-pink-50',
      border: 'border-purple-200',
      icon: 'text-purple-600',
      glow: 'shadow-purple-200/50',
      text: 'text-purple-900'
    },
    success: {
      bg: 'from-green-50 to-emerald-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      glow: 'shadow-green-200/50',
      text: 'text-green-900'
    },
    warning: {
      bg: 'from-orange-50 to-red-50',
      border: 'border-orange-200',
      icon: 'text-orange-600',
      glow: 'shadow-orange-200/50',
      text: 'text-orange-900'
    },
    error: {
      bg: 'from-red-50 to-pink-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      glow: 'shadow-red-200/50',
      text: 'text-red-900'
    }
  };

  const classes = colorClasses[color] || colorClasses.primary;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Animate number counting
      if (typeof value === 'number') {
        let start = 0;
        const end = value;
        const duration = 1000;
        const increment = end / (duration / 16);
        
        const counter = setInterval(() => {
          start += increment;
          if (start >= end) {
            setAnimatedValue(end);
            clearInterval(counter);
          } else {
            setAnimatedValue(Math.floor(start));
          }
        }, 16);
        
        return () => clearInterval(counter);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div
      className={`
        relative group
        bg-gradient-to-br ${classes.bg}
        border ${classes.border}
        rounded-lg p-3 backdrop-blur-sm
        shadow-sm ${classes.glow}
        transition-all duration-300 ease-in-out
        ${isVisible ? 'animate-slide-in-bottom' : 'opacity-0'}
        hover:shadow-md
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Content */}
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${classes.bg} border ${classes.border} shadow-sm`}>
          <Icon size={16} className={`${classes.icon} group-hover:scale-110 transition-transform duration-300`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className={`text-lg font-bold ${classes.text}`}>
              {typeof value === 'number' ? animatedValue.toLocaleString() : value}
            </div>

            {trend && (
              <div className={`flex items-center space-x-1 text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp size={12} className={trend.isPositive ? '' : 'rotate-180'} />
                <span>{trend.value}%</span>
              </div>
            )}
          </div>

          <h3 className={`text-xs font-medium ${classes.text} opacity-70 truncate`}>
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

const ArticlesStatsGrid: React.FC<ArticlesStatsGridProps> = ({ 
  statistics, 
  loading = false,
  className = ""
}) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border border-gray-300 skeleton"
          />
        ))}
      </div>
    );
  }

  const safeStats = statistics || {
    total: 0,
    published: 0,
    draft: 0,
    archived: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    articlesThisWeek: 0,
    articlesThisMonth: 0,
    featured: 0,
    averageReadingTime: 0,
    topCategories: [],
    topAuthors: [],
    recentActivity: []
  };

  const mainStats = [
    {
      title: 'Tổng số',
      value: safeStats.total,
      icon: FileText,
      color: 'primary' as const,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Đã xuất bản',
      value: safeStats.published,
      icon: Eye,
      color: 'success' as const,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Bản nháp',
      value: safeStats.draft,
      icon: Activity,
      color: 'warning' as const
    },
    {
      title: 'Lượt xem',
      value: safeStats.totalViews,
      icon: Users,
      color: 'accent' as const,
      trend: { value: 15, isPositive: true }
    },
    {
      title: 'Nổi bật',
      value: safeStats.featured,
      icon: Star,
      color: 'secondary' as const,
      trend: { value: 5, isPositive: true }
    },
    {
      title: 'Tuần này',
      value: safeStats.articlesThisWeek,
      icon: Calendar,
      color: 'primary' as const,
      trend: { value: 20, isPositive: true }
    }
  ];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 ${className}`}>
      {mainStats.map((stat, index) => (
        <StatCard
          key={index}
          {...stat}
          delay={index * 50}
        />
      ))}
    </div>
  );
};

export default ArticlesStatsGrid;
