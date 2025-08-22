/**
 * Articles Page Header Component
 * Anime-inspired header with floating elements and neon effects
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Plus,
  RefreshCw,
  Download,
  Upload,
  Filter,
  Grid3X3,
  List,
  Search,
  Settings,
  Zap,
  Sparkles as SparklesIcon
} from 'lucide-react';

import './animations.css';

interface ArticlesPageHeaderProps {
  totalCount: number;
  selectedCount?: number;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  onRefresh: () => void;
  onExport?: () => void;
  onImport?: () => void;
  loading?: boolean;
  className?: string;
  isMobile?: boolean;
}

const ArticlesPageHeader: React.FC<ArticlesPageHeaderProps> = ({
  totalCount,
  selectedCount = 0,
  viewMode,
  onViewModeChange,
  onRefresh,
  onExport,
  onImport,
  loading = false,
  className = "",
  isMobile = false
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className={`${className}`}>
      {/* Main header content */}
      <div className="bg-gradient-to-r from-white via-blue-50 to-white backdrop-blur-sm border border-blue-200 rounded-xl p-2 sm:p-4 shadow-lg">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          {/* Title and stats */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600">
                Quản Lý Bài Viết
              </h1>

              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 rounded-full">
                  <span className="text-blue-700 text-sm font-medium">
                    {totalCount.toLocaleString()} bài viết
                  </span>
                </div>

                {selectedCount > 0 && (
                  <div className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-full animate-pulse">
                    <span className="text-yellow-700 text-sm font-medium">
                      {selectedCount} đã chọn
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-600 text-sm">
              Tạo, chỉnh sửa và quản lý nội dung bài viết của bạn
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Create new article button */}
            <Link
              href="/admin/articles/new"
              className="group relative px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-blue-400/25 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-2">
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                <span>Tạo Bài Viết</span>
              </div>
            </Link>

            {/* Refresh button */}
            <button
              onClick={handleRefresh}
              disabled={loading || isRefreshing}
              className="group relative p-2 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 rounded-lg shadow-md hover:shadow-gray-400/20 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                size={18}
                className={`${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-300`}
              />

              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                Làm mới
              </div>
            </button>

            {/* Export button */}
            {onExport && (
              <button
                onClick={onExport}
                className="group relative p-3 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 text-white rounded-xl shadow-lg hover:shadow-green-400/20 transition-all duration-300 hover:scale-105"
              >
                <Download size={20} className="group-hover:translate-y-1 transition-transform duration-300" />

                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  Xuất dữ liệu
                </div>
              </button>
            )}

            {/* Import button */}
            {onImport && (
              <button
                onClick={onImport}
                className="group relative p-3 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white rounded-xl shadow-lg hover:shadow-purple-400/20 transition-all duration-300 hover:scale-105"
              >
                <Upload size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />

                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  Nhập dữ liệu
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Bottom section - View controls */}
        {!isMobile && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-blue-200">
          {/* View mode toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm font-medium">Chế độ xem:</span>

            <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
              <button
                onClick={() => onViewModeChange('table')}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${viewMode === 'table'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }
                `}
              >
                <List size={16} />
                <span>Bảng</span>
              </button>

              <button
                onClick={() => onViewModeChange('grid')}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                  ${viewMode === 'grid'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }
                `}
              >
                <Grid3X3 size={16} />
                <span>Lưới</span>
              </button>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPageHeader;
