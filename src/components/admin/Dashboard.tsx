'use client';

import React from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  TrendingUp,
  Calendar,
  Award,
  Building
} from 'lucide-react';

const Dashboard: React.FC = () => {
  // TODO: Replace with real API data
  const stats = [
    {
      title: 'Tổng Số Sinh Viên',
      value: '0',
      change: null,
      changeType: 'neutral',
      icon: Users,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Giảng Viên',
      value: '0',
      change: null,
      changeType: 'neutral',
      icon: GraduationCap,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Chương Trình Học',
      value: '0',
      change: null,
      changeType: 'neutral',
      icon: BookOpen,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Bài Viết Tin Tức',
      value: '0',
      change: null,
      changeType: 'neutral',
      icon: FileText,
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    }
  ];

  // TODO: Replace with real activity data from API
  const recentActivities: any[] = [];

  const quickActions = [
    {
      title: 'Tạo Bài Viết Mới',
      description: 'Đăng bài viết mới',
      href: '/admin/articles/new',
      color: 'bg-blue-600 hover:bg-blue-700',
      icon: FileText
    },
    {
      title: 'Quản Lý Danh Mục',
      description: 'Thêm và chỉnh sửa danh mục',
      href: '/admin/categories',
      color: 'bg-green-600 hover:bg-green-700',
      icon: BookOpen
    },
    {
      title: 'Quản Lý Bài Viết',
      description: 'Xem tất cả bài viết',
      href: '/admin/articles',
      color: 'bg-purple-600 hover:bg-purple-700',
      icon: FileText
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Chào Mừng Đến Bảng Điều Khiển Quản Trị
        </h1>
        <p className="text-gray-600">
          Tổng quan hệ thống quản lý trường đại học
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      so với tháng trước
                    </span>
                  </div>
                </div>
                <div className={`${stat.lightColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Hoạt Động Gần Đây
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Thao Tác Nhanh
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a
                  key={index}
                  href={action.href}
                  className={`${action.color} text-white p-4 rounded-lg transition-colors duration-200 block`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <div>
                      <p className="font-medium text-sm">{action.title}</p>
                      <p className="text-xs opacity-90">{action.description}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chart Section Placeholder */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Tổng Quan Phân Tích
        </h2>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Biểu đồ và phân tích sẽ được hiển thị tại đây</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
