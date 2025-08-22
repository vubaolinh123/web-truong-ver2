/**
 * Article Statistics Component
 * Hiển thị thống kê articles
 */

'use client';

import React from 'react';
import { ArticleStatistics } from '@/types/articles';
import { 
  FileText, 
  Eye, 
  Heart, 
  MessageSquare,
  TrendingUp, 
  BarChart3,
  Users,
  Activity,
  Star,
  Calendar,
  Clock
} from 'lucide-react';

interface ArticleStatsProps {
  statistics: ArticleStatistics | null;
  loading?: boolean;
}

const ArticleStats: React.FC<ArticleStatsProps> = ({ 
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
    published: statistics.published || 0,
    draft: statistics.draft || 0,
    archived: statistics.archived || 0,
    featured: statistics.featured || 0,
    totalViews: statistics.totalViews || 0,
    totalLikes: statistics.totalLikes || 0,
    totalComments: statistics.totalComments || 0,
    averageReadingTime: statistics.averageReadingTime || 0,
    articlesThisMonth: statistics.articlesThisMonth || 0,
    articlesThisWeek: statistics.articlesThisWeek || 0,
    topCategories: statistics.topCategories || [],
    topAuthors: statistics.topAuthors || [],
    recentActivity: statistics.recentActivity || []
  };

  const mainStats = [
    {
      title: 'Tổng Bài Viết',
      value: safeStatistics.total,
      icon: FileText,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: `${safeStatistics.published} đã xuất bản, ${safeStatistics.draft} bản nháp`
    },
    {
      title: 'Lượt Xem',
      value: safeStatistics.totalViews.toLocaleString(),
      icon: Eye,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'Tổng lượt xem tất cả bài viết'
    },
    {
      title: 'Tương Tác',
      value: (safeStatistics.totalLikes + safeStatistics.totalComments).toLocaleString(),
      icon: Heart,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      description: `${safeStatistics.totalLikes} thích, ${safeStatistics.totalComments} bình luận`
    },
    {
      title: 'Nổi Bật',
      value: safeStatistics.featured,
      icon: Star,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      description: 'Bài viết được đánh dấu nổi bật'
    }
  ];

  const activityStats = [
    {
      title: 'Tuần Này',
      value: safeStatistics.articlesThisWeek,
      icon: Calendar,
      description: 'Bài viết mới'
    },
    {
      title: 'Tháng Này',
      value: safeStatistics.articlesThisMonth,
      icon: Calendar,
      description: 'Bài viết mới'
    },
    {
      title: 'Thời Gian Đọc',
      value: `${Math.round(safeStatistics.averageReadingTime)} phút`,
      icon: Clock,
      description: 'Trung bình'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => {
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

      {/* Activity Stats */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Activity size={20} className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Hoạt Động Gần Đây
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {activityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <Icon size={24} className="text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Activity List */}
        {safeStatistics.recentActivity.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Hoạt động mới nhất:
            </h4>
            <div className="space-y-2">
              {safeStatistics.recentActivity.slice(0, 5).map((activity, index) => (
                <div key={activity.id || index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.action === 'created' ? 'bg-green-500' :
                      activity.action === 'updated' ? 'bg-blue-500' :
                      activity.action === 'published' ? 'bg-purple-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.action === 'created' ? 'Đã tạo' :
                         activity.action === 'updated' ? 'Đã cập nhật' :
                         activity.action === 'published' ? 'Đã xuất bản' :
                         'Đã lưu trữ'} bởi {activity.author}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(activity.timestamp).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Top Categories and Authors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        {safeStatistics.topCategories.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 size={20} className="text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                Categories Hàng Đầu
              </h3>
            </div>
            
            <div className="space-y-3">
              {safeStatistics.topCategories.slice(0, 5).map((category, index) => (
                <div key={category.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {category.name || 'Không có tên'}
                      </p>
                      {/* This is where the icon was, removing it */}
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

        {/* Top Authors */}
        {safeStatistics.topAuthors.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <Users size={20} className="text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                Tác Giả Hàng Đầu
              </h3>
            </div>
            
            <div className="space-y-3">
              {safeStatistics.topAuthors.slice(0, 5).map((author, index) => (
                <div key={author.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {author.name || 'Không có tên'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText size={16} className="text-gray-400" />
                    <span className="text-sm font-semibold text-gray-900">
                      {author.articleCount || 0} bài viết
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Status Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp size={20} className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Tổng Quan Trạng Thái
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {safeStatistics.published}
            </p>
            <p className="text-sm text-gray-600">Đã Xuất Bản</p>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">
              {safeStatistics.draft}
            </p>
            <p className="text-sm text-gray-600">Bản Nháp</p>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">
              {safeStatistics.archived}
            </p>
            <p className="text-sm text-gray-600">Lưu Trữ</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {safeStatistics.featured}
            </p>
            <p className="text-sm text-gray-600">Nổi Bật</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleStats;
