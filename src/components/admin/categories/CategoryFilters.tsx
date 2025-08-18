/**
 * Category Filters Component
 * Bộ lọc và tìm kiếm categories
 */

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  SortAsc, 
  SortDesc,
  Grid,
  List,
  RefreshCw
} from 'lucide-react';

interface CategoryFiltersProps {
  onSearch: (keyword: string) => void;
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  onViewModeChange: (mode: 'grid' | 'table') => void;
  onRefresh: () => void;
  loading?: boolean;
  viewMode?: 'grid' | 'table';
  totalCount?: number;
}

interface FilterState {
  status: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  onSearch,
  onFilterChange,
  onSortChange,
  onViewModeChange,
  onRefresh,
  loading = false,
  viewMode = 'table',
  totalCount = 0
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchKeyword);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchKeyword, onSearch]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
    
    if (key === 'sortBy' || key === 'sortOrder') {
      onSortChange(newFilters.sortBy, newFilters.sortOrder);
    }
  };

  const clearFilters = () => {
    setSearchKeyword('');
    const defaultFilters: FilterState = {
      status: 'all',
      sortBy: 'name',
      sortOrder: 'asc'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
    onSortChange(defaultFilters.sortBy, defaultFilters.sortOrder);
    onSearch('');
  };

  const hasActiveFilters = searchKeyword || filters.status !== 'all';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
      {/* Top Row - Search and Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Tìm kiếm categories..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Xem dạng bảng"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Xem dạng lưới"
            >
              <Grid size={16} />
            </button>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
              showAdvancedFilters || hasActiveFilters
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter size={16} />
            <span>Bộ lọc</span>
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                !
              </span>
            )}
          </button>

          {/* Refresh */}
          <button
            onClick={onRefresh}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
            title="Làm mới"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trạng thái
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="all">Tất cả</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sắp xếp theo
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="name">Tên</option>
                <option value="createdAt">Ngày tạo</option>
                <option value="updatedAt">Ngày cập nhật</option>
                <option value="articleCount">Số bài viết</option>
                <option value="sortOrder">Thứ tự</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thứ tự
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={14} />
                <span>Xóa bộ lọc</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200">
        <div>
          Hiển thị <span className="font-medium">{totalCount}</span> categories
          {searchKeyword && (
            <span> cho từ khóa "<span className="font-medium">{searchKeyword}</span>"</span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {filters.sortOrder === 'asc' ? (
            <SortAsc size={14} className="text-gray-400" />
          ) : (
            <SortDesc size={14} className="text-gray-400" />
          )}
          <span>
            Sắp xếp theo {filters.sortBy === 'name' ? 'tên' : 
                         filters.sortBy === 'createdAt' ? 'ngày tạo' :
                         filters.sortBy === 'updatedAt' ? 'ngày cập nhật' :
                         filters.sortBy === 'articleCount' ? 'số bài viết' : 'thứ tự'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters;
