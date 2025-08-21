/**
 * Categories Stats Grid - Redesigned
 * Matches articles stats grid design exactly
 */

'use client';

import React from 'react';
import { FolderOpen, CheckCircle, XCircle, FileText, TrendingUp } from 'lucide-react';
import { CategoryStatistics } from '@/lib/api/categories';

interface CategoriesStatsGridProps {
  statistics: CategoryStatistics | null;
  loading: boolean;
  className?: string;
}

const CategoriesStatsGrid: React.FC<CategoriesStatsGridProps> = ({
  statistics,
  loading,
  className = ''
}) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!statistics) {
    return null;
  }

  // Safe fallback for statistics
  const safeStatistics = {
    total: statistics.total || 0,
    active: statistics.active || 0,
    inactive: statistics.inactive || 0,
    totalArticles: statistics.totalArticles || 0,
    averageArticlesPerCategory: statistics.averageArticlesPerCategory || 0,
    categoriesWithMostArticles: statistics.categoriesWithMostArticles || []
  };

  const statItems: Array<{
    title: string;
    value: number;
    icon: React.ComponentType<any>;
    color: string;
    bgGradient: string;
    bgLight: string;
    textColor: string;
    change?: string | null;
    percentage?: number;
    subtitle?: string;
  }> = [
    {
      title: 'Tổng danh mục',
      value: safeStatistics.total,
      icon: FolderOpen,
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: null // API doesn't provide recentlyCreated field
    },
    {
      title: 'Đang hoạt động',
      value: safeStatistics.active,
      icon: CheckCircle,
      color: 'green',
      bgGradient: 'from-green-500 to-green-600',
      bgLight: 'bg-green-50',
      textColor: 'text-green-600',
      percentage: safeStatistics.total > 0
        ? Math.round((safeStatistics.active / safeStatistics.total) * 100)
        : 0
    },
    {
      title: 'Không hoạt động',
      value: safeStatistics.inactive,
      icon: XCircle,
      color: 'red',
      bgGradient: 'from-red-500 to-red-600',
      bgLight: 'bg-red-50',
      textColor: 'text-red-600',
      percentage: safeStatistics.total > 0
        ? Math.round((safeStatistics.inactive / safeStatistics.total) * 100)
        : 0
    },
    {
      title: 'Tổng bài viết',
      value: safeStatistics.totalArticles,
      icon: FileText,
      color: 'purple',
      bgGradient: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-600',
      subtitle: `TB: ${safeStatistics.averageArticlesPerCategory.toFixed(1)}/danh mục`
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {statItems.map((item, index) => {
        const Icon = item.icon;
        
        return (
          <div
            key={index}
            className="
              bg-white rounded-2xl shadow-lg border border-gray-100 p-6 
              hover:shadow-xl transition-all duration-300 transform hover:scale-105
              animate-slideInUp group
            "
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {item.title}
                </p>
                <p className={`text-3xl font-bold ${item.textColor} group-hover:scale-110 transition-transform duration-300`}>
                  {item.value.toLocaleString()}
                </p>
                
                {/* Subtitle or change indicator */}
                {item.subtitle && (
                  <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
                )}
                {item.change && (
                  <p className="text-xs text-green-600 mt-1 font-medium">{item.change}</p>
                )}
              </div>
              
              <div className={`p-3 rounded-xl bg-gradient-to-r ${item.bgGradient} group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} className="text-white" />
              </div>
            </div>

            {/* Progress bar for percentage items */}
            {item.percentage !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Tỷ lệ</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${item.bgGradient} transition-all duration-1000 ease-out`}
                    style={{ 
                      width: `${item.percentage}%`,
                      animationDelay: `${index * 200 + 500}ms`
                    }}
                  />
                </div>
              </div>
            )}

            {/* Trend indicator */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <TrendingUp size={12} className="text-green-500" />
                <span className="text-xs text-gray-500">Xu hướng tăng</span>
              </div>
              <div className={`w-2 h-2 rounded-full ${item.bgLight} animate-pulse`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesStatsGrid;
