/**
 * Categories Filters Panel - Redesigned
 * Matches articles filters panel design exactly
 */

'use client';

import React, { useState } from 'react';
import { Filter, SortAsc, SortDesc, Calendar, Tag, BarChart3, X } from 'lucide-react';

interface CategoriesFiltersPanelProps {
  onFilterChange: (filters: any) => void;
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  totalCount: number;
  currentPage: number;
  className?: string;
}

const CategoriesFiltersPanel: React.FC<CategoriesFiltersPanelProps> = ({
  onFilterChange,
  onSortChange,
  totalCount,
  currentPage,
  className = ''
}) => {
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    sortBy: 'name',
    sortOrder: 'asc' as 'asc' | 'desc',
    dateRange: 'all'
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortBy: string) => {
    const newOrder: 'asc' | 'desc' = activeFilters.sortBy === sortBy && activeFilters.sortOrder === 'asc' ? 'desc' : 'asc';
    const newFilters = { ...activeFilters, sortBy, sortOrder: newOrder };
    setActiveFilters(newFilters);
    onSortChange(sortBy, newOrder);
  };

  const clearFilters = () => {
    const defaultFilters = {
      status: 'all',
      sortBy: 'name',
      sortOrder: 'asc' as 'asc' | 'desc',
      dateRange: 'all'
    };
    setActiveFilters(defaultFilters);
    onFilterChange(defaultFilters);
    onSortChange('name', 'asc');
  };

  const hasActiveFilters = activeFilters.status !== 'all' || 
                          activeFilters.sortBy !== 'name' || 
                          activeFilters.sortOrder !== 'asc' ||
                          activeFilters.dateRange !== 'all';

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-slideInUp ${className}`}>
      {/* Main Filters Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left side - Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Filter size={16} className="text-blue-600" />
            </div>
            <select
              value={activeFilters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="
                border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 hover:bg-white
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-200
              "
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar size={16} className="text-green-600" />
            </div>
            <select
              value={activeFilters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="
                border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-gray-50 hover:bg-white
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-colors duration-200
              "
            >
              <option value="all">Tất cả thời gian</option>
              <option value="today">Hôm nay</option>
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="year">Năm này</option>
            </select>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`
              flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium
              transition-all duration-200 border
              ${showAdvancedFilters 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            <BarChart3 size={16} />
            <span>Bộ lọc nâng cao</span>
          </button>
        </div>

        {/* Right side - Sort and Results */}
        <div className="flex items-center justify-between lg:justify-end gap-4">
          {/* Results count */}
          <div className="text-sm text-gray-600">
            <span className="font-medium">{totalCount.toLocaleString()}</span> danh mục
          </div>

          {/* Sort controls */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sắp xếp:</span>
            <div className="flex bg-gray-100 rounded-xl p-1">
              {[
                { key: 'name', label: 'Tên', icon: Tag },
                { key: 'createdAt', label: 'Ngày tạo', icon: Calendar },
                { key: 'articleCount', label: 'Bài viết', icon: BarChart3 }
              ].map((sort) => {
                const Icon = sort.icon;
                const isActive = activeFilters.sortBy === sort.key;
                
                return (
                  <button
                    key={sort.key}
                    onClick={() => handleSortChange(sort.key)}
                    className={`
                      flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium
                      transition-all duration-200
                      ${isActive 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                      }
                    `}
                  >
                    <Icon size={14} />
                    <span className="hidden sm:inline">{sort.label}</span>
                    {isActive && (
                      activeFilters.sortOrder === 'asc' ? 
                        <SortAsc size={14} /> : 
                        <SortDesc size={14} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="
                flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800
                border border-gray-200 rounded-xl hover:bg-gray-50
                transition-colors duration-200
              "
            >
              <X size={14} />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200 animate-slideInDown">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số bài viết tối thiểu
              </label>
              <input
                type="number"
                min="0"
                placeholder="0"
                className="
                  w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  bg-gray-50 hover:bg-white transition-colors duration-200
                "
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số bài viết tối đa
              </label>
              <input
                type="number"
                min="0"
                placeholder="Không giới hạn"
                className="
                  w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  bg-gray-50 hover:bg-white transition-colors duration-200
                "
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Màu sắc
              </label>
              <select className="
                w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                bg-gray-50 hover:bg-white transition-colors duration-200
              ">
                <option value="">Tất cả màu</option>
                <option value="blue">Xanh dương</option>
                <option value="green">Xanh lá</option>
                <option value="red">Đỏ</option>
                <option value="purple">Tím</option>
                <option value="yellow">Vàng</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activeFilters.status !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Trạng thái: {activeFilters.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
            </span>
          )}
          {activeFilters.dateRange !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Thời gian: {activeFilters.dateRange}
            </span>
          )}
          {activeFilters.sortBy !== 'name' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Sắp xếp: {activeFilters.sortBy} ({activeFilters.sortOrder === 'asc' ? 'Tăng' : 'Giảm'})
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesFiltersPanel;
