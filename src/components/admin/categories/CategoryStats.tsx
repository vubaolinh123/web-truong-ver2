/**
 * Category Statistics Component
 * Hiển thị thống kê categories
 */

'use client';

import React from 'react';
import { CategoryStatistics } from '@/lib/api/categories';
import { 
  FolderOpen, 
  FileText, 
  TrendingUp, 
  BarChart3,
  Users,
  Activity
} from 'lucide-react';

interface CategoryStatsProps {
  statistics: CategoryStatistics | null;
  loading?: boolean;
}

const CategoryStats: React.FC<CategoryStatsProps> = ({ 
  statistics, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!statistics) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <p className="text-yellow-800 text-sm">
          Không có dữ liệu thống kê để hiển thị.
        </p>
      </div>
    );
  }

  // Defensive checks for required properties
  const safeStatistics = {
    total: statistics.total || 0,
    active: statistics.active || 0,
    inactive: statistics.inactive || 0,
    totalArticles: statistics.totalArticles || 0,
    averageArticlesPerCategory: statistics.averageArticlesPerCategory || 0,
    categoriesWithMostArticles: statistics.categoriesWithMostArticles || []
  };

  const stats = [
    {
      title: 'Tổng Categories',
      value: safeStatistics.total,
      icon: FolderOpen,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: `${safeStatistics.active} hoạt động, ${safeStatistics.inactive} không hoạt động`
    },
    {
      title: 'Tổng Bài Viết',
      value: safeStatistics.totalArticles,
      icon: FileText,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'Trong tất cả categories'
    },
    {
      title: 'Trung Bình',
      value: Math.round(safeStatistics.averageArticlesPerCategory * 10) / 10,
      icon: BarChart3,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      description: 'Bài viết/category'
    },
    {
      title: 'Hoạt Động',
      value: safeStatistics.total > 0
        ? `${Math.round((safeStatistics.active / safeStatistics.total) * 100)}%`
        : '0%',
      icon: Activity,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      description: 'Categories đang hoạt động'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">
                    {stat.description}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon size={24} className={stat.textColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Categories */}
      {safeStatistics.categoriesWithMostArticles.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp size={20} className="text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              Categories Có Nhiều Bài Viết Nhất
            </h3>
          </div>

          <div className="space-y-3">
            {safeStatistics.categoriesWithMostArticles.map((category, index) => (
              <div key={category.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {category.name || 'Không có tên'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText size={16} className="text-gray-400" />
                  <span className="text-sm font-semibold text-gray-900">
                    {category.articleCount || 0} bài viết
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State for Top Categories */}
      {safeStatistics.categoriesWithMostArticles.length === 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp size={20} className="text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">
              Categories Có Nhiều Bài Viết Nhất
            </h3>
          </div>
          <div className="text-center py-8">
            <FolderOpen size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              Chưa có categories nào có bài viết
            </p>
          </div>
        </div>
      )}

      {/* Quick Insights */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 size={20} className="text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Thông Tin Tổng Quan
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {safeStatistics.active}
            </p>
            <p className="text-sm text-gray-600">Categories Hoạt Động</p>
          </div>

          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">
              {safeStatistics.inactive}
            </p>
            <p className="text-sm text-gray-600">Categories Không Hoạt Động</p>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {safeStatistics.totalArticles}
            </p>
            <p className="text-sm text-gray-600">Tổng Bài Viết</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryStats;
