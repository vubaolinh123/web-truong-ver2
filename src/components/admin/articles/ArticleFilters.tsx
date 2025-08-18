/**
 * Article Filters Component
 * Component để search và filter articles
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  RefreshCw, 
  Grid3X3, 
  List,
  Calendar,
  Tag,
  User,
  FolderOpen,
  X
} from 'lucide-react';
import { ArticleSearchParams, ARTICLE_STATUS_OPTIONS, ARTICLE_SORT_OPTIONS } from '@/types/articles';

interface ArticleFiltersProps {
  onSearch: (keyword: string) => void;
  onFilterChange: (filters: Partial<ArticleSearchParams>) => void;
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  onViewModeChange: (mode: 'table' | 'grid') => void;
  onRefresh: () => void;
  loading?: boolean;
  viewMode: 'table' | 'grid';
  totalCount: number;
  categories?: Array<{ id: string; name: string }>;
  authors?: Array<{ id: string; name: string }>;
}

const ArticleFilters: React.FC<ArticleFiltersProps> = ({
  onSearch,
  onFilterChange,
  onSortChange,
  onViewModeChange,
  onRefresh,
  loading = false,
  viewMode,
  totalCount,
  categories = [],
  authors = []
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState<Partial<ArticleSearchParams>>({
    status: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Debounced search
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSearchChange = useCallback((value: string) => {
    setSearchKeyword(value);
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      onSearch(value);
    }, 300);
    
    setSearchTimeout(timeout);
  }, [onSearch, searchTimeout]);

  const handleFilterChange = useCallback((newFilters: Partial<ArticleSearchParams>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  }, [filters, onFilterChange]);

  const handleSortChange = useCallback((field: string) => {
    const newOrder = filters.sortBy === field && filters.sortOrder === 'desc' ? 'asc' : 'desc';
    handleFilterChange({ sortBy: field, sortOrder: newOrder });
    onSortChange(field, newOrder);
  }, [filters.sortBy, filters.sortOrder, handleFilterChange, onSortChange]);

  const clearFilters = useCallback(() => {
    const defaultFilters = {
      status: 'all' as const,
      sortBy: 'createdAt',
      sortOrder: 'desc' as const,
      categoryId: undefined,
      authorId: undefined,
      featured: undefined,
      dateFrom: undefined,
      dateTo: undefined
    };
    setFilters(defaultFilters);
    setSearchKeyword('');
    onFilterChange(defaultFilters);
    onSearch('');
  }, [onFilterChange, onSearch]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-4">
      {/* Search and Main Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchKeyword && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X size={16} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
              showAdvancedFilters 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter size={16} />
            <span className="hidden sm:inline">Bộ lọc</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-2 transition-colors ${
                viewMode === 'table' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid3X3 size={16} />
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trạng thái
              </label>
              <select
                value={filters.status || 'all'}
                onChange={(e) => handleFilterChange({ status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                {ARTICLE_STATUS_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FolderOpen size={16} className="inline mr-1" />
                Category
              </label>
              <select
                value={filters.categoryId || ''}
                onChange={(e) => handleFilterChange({ categoryId: e.target.value || undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tất cả categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Author Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User size={16} className="inline mr-1" />
                Tác giả
              </label>
              <select
                value={filters.authorId || ''}
                onChange={(e) => handleFilterChange({ authorId: e.target.value || undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tất cả tác giả</option>
                {authors.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nổi bật
              </label>
              <select
                value={filters.featured === undefined ? '' : filters.featured.toString()}
                onChange={(e) => handleFilterChange({ 
                  featured: e.target.value === '' ? undefined : e.target.value === 'true' 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tất cả</option>
                <option value="true">Nổi bật</option>
                <option value="false">Không nổi bật</option>
              </select>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar size={16} className="inline mr-1" />
                Từ ngày
              </label>
              <input
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => handleFilterChange({ dateFrom: e.target.value || undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Đến ngày
              </label>
              <input
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => handleFilterChange({ dateTo: e.target.value || undefined })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sắp xếp theo
              </label>
              <select
                value={filters.sortBy || 'createdAt'}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ARTICLE_SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thứ tự
              </label>
              <select
                value={filters.sortOrder || 'desc'}
                onChange={(e) => handleFilterChange({ sortOrder: e.target.value as 'asc' | 'desc' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="desc">Giảm dần</option>
                <option value="asc">Tăng dần</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Xóa tất cả bộ lọc
            </button>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-200 pt-4">
        <span>
          Hiển thị {totalCount.toLocaleString()} bài viết
        </span>
        {(searchKeyword || Object.values(filters).some(v => v && v !== 'all')) && (
          <span className="text-blue-600">
            Đang áp dụng bộ lọc
          </span>
        )}
      </div>
    </div>
  );
};

export default ArticleFilters;
