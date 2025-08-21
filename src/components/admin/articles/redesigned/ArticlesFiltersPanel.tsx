/**
 * Articles Filters Panel Component
 * Advanced filtering with anime-inspired dark theme
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X,
  Calendar,
  Tag,
  User,
  FolderOpen,
  ChevronDown,
  SlidersHorizontal,
  Sparkles as SparklesIcon
} from 'lucide-react';
import { ArticleSearchParams, ARTICLE_STATUS_OPTIONS, ARTICLE_SORT_OPTIONS } from '@/types/articles';

import './animations.css';

interface ArticlesFiltersPanelProps {
  onSearch: (keyword: string) => void;
  onFilterChange: (filters: Partial<ArticleSearchParams>) => void;
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  loading?: boolean;
  totalCount: number;
  categories?: Array<{ id: string; name: string }>;
  authors?: Array<{ id: string; name: string }>;
  className?: string;
}

interface FilterChipProps {
  label: string;
  value: string;
  onRemove: () => void;
  color?: 'primary' | 'secondary' | 'accent';
}

const FilterChip: React.FC<FilterChipProps> = ({ label, value, onRemove, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-blue-100 border-blue-300 text-blue-700',
    secondary: 'bg-yellow-100 border-yellow-300 text-yellow-700',
    accent: 'bg-purple-100 border-purple-300 text-purple-700'
  };

  return (
    <div className={`
      inline-flex items-center space-x-2 px-3 py-1 rounded-full border backdrop-blur-sm
      ${colorClasses[color]} hover:scale-105 transition-all duration-200 animate-fade-in-scale
    `}>
      <span className="text-xs font-medium">{label}: {value}</span>
      <button
        onClick={onRemove}
        className="hover:bg-white/10 rounded-full p-0.5 transition-colors duration-200"
      >
        <X size={12} />
      </button>
    </div>
  );
};

const ArticlesFiltersPanel: React.FC<ArticlesFiltersPanelProps> = ({
  onSearch,
  onFilterChange,
  onSortChange,
  loading = false,
  totalCount,
  categories = [],
  authors = [],
  className = ""
}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((keyword: string) => {
      onSearch(keyword);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(searchKeyword);
  }, [searchKeyword, debouncedSearch]);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...activeFilters };
    
    if (value === '' || value === null || value === undefined) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (field: string, order: 'asc' | 'desc') => {
    setSortBy(field);
    setSortOrder(order);
    onSortChange(field, order);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchKeyword('');
    setSortBy('createdAt');
    setSortOrder('desc');
    onFilterChange({});
    onSearch('');
    onSortChange('createdAt', 'desc');
  };

  const activeFilterCount = Object.keys(activeFilters).length + (searchKeyword ? 1 : 0);

  return (
    <div className={`${className}`}>
      <div className="bg-gradient-to-r from-white via-blue-50 to-white backdrop-blur-sm border border-blue-200 rounded-xl p-4 shadow-lg">
        {/* Main search bar */}
        <div className="flex items-center space-x-3 mb-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-blue-500" />
            </div>

            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Tìm kiếm bài viết..."
              className="
                w-full pl-10 pr-4 py-3
                bg-white border border-blue-300 rounded-xl
                text-gray-900 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-all duration-300
                hover:bg-blue-50
              "
            />

            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-500 hover:text-blue-600 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Advanced filters toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
              flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300
              ${isExpanded 
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' 
                : 'bg-slate-800/50 border border-cyan-400/30 text-cyan-300 hover:bg-slate-700/50'
              }
              hover:scale-105
            `}
          >
            <SlidersHorizontal size={20} />
            <span>Bộ Lọc</span>
            {activeFilterCount > 0 && (
              <div className="px-2 py-1 bg-yellow-500 text-black text-xs rounded-full font-bold animate-pulse">
                {activeFilterCount}
              </div>
            )}
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-slate-800/30 rounded-xl border border-cyan-400/20">
            <span className="text-cyan-300 text-sm font-medium">Bộ lọc đang áp dụng:</span>
            
            {searchKeyword && (
              <FilterChip
                label="Tìm kiếm"
                value={searchKeyword}
                onRemove={() => setSearchKeyword('')}
                color="primary"
              />
            )}
            
            {Object.entries(activeFilters).map(([key, value]) => (
              <FilterChip
                key={key}
                label={getFilterLabel(key)}
                value={getFilterDisplayValue(key, value, categories, authors)}
                onRemove={() => handleFilterChange(key, null)}
                color={getFilterColor(key)}
              />
            ))}
            
            <button
              onClick={clearAllFilters}
              className="ml-2 px-3 py-1 bg-red-600/20 border border-red-400/30 text-red-300 rounded-full text-xs font-medium hover:bg-red-600/30 transition-colors duration-200"
            >
              Xóa tất cả
            </button>
          </div>
        )}

        {/* Advanced filters */}
        {isExpanded && (
          <div className="space-y-4 animate-slide-in-top">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status filter */}
              <div className="space-y-2">
                <label className="text-cyan-300 text-sm font-medium flex items-center space-x-2">
                  <Filter size={16} />
                  <span>Trạng thái</span>
                </label>
                <select
                  value={activeFilters.status || ''}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                >
                  <option value="">Tất cả trạng thái</option>
                  {ARTICLE_STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category filter */}
              <div className="space-y-2">
                <label className="text-cyan-300 text-sm font-medium flex items-center space-x-2">
                  <FolderOpen size={16} />
                  <span>Danh mục</span>
                </label>
                <select
                  value={activeFilters.categoryId || ''}
                  onChange={(e) => handleFilterChange('categoryId', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                >
                  <option value="">Tất cả danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author filter */}
              <div className="space-y-2">
                <label className="text-cyan-300 text-sm font-medium flex items-center space-x-2">
                  <User size={16} />
                  <span>Tác giả</span>
                </label>
                <select
                  value={activeFilters.authorId || ''}
                  onChange={(e) => handleFilterChange('authorId', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                >
                  <option value="">Tất cả tác giả</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort options */}
              <div className="space-y-2">
                <label className="text-cyan-300 text-sm font-medium flex items-center space-x-2">
                  <SparklesIcon size={16} />
                  <span>Sắp xếp</span>
                </label>
                <div className="flex space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value, sortOrder)}
                    className="flex-1 px-3 py-2 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  >
                    {ARTICLE_SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => handleSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
                    className={`
                      px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105
                      ${sortOrder === 'desc' 
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' 
                        : 'bg-slate-800/50 border border-cyan-400/30 text-cyan-300'
                      }
                    `}
                  >
                    {sortOrder === 'desc' ? '↓' : '↑'}
                  </button>
                </div>
              </div>
            </div>

            {/* Results summary */}
            <div className="flex items-center justify-between pt-4 border-t border-cyan-400/20">
              <div className="flex items-center space-x-2 text-cyan-300">
                <span className="text-sm">
                  Hiển thị {totalCount.toLocaleString()} kết quả
                </span>
              </div>
              
              {loading && (
                <div className="flex items-center space-x-2 text-yellow-300">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-yellow-300 border-t-transparent"></div>
                  <span className="text-sm">Đang tải...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

function getFilterLabel(key: string): string {
  const labels: Record<string, string> = {
    status: 'Trạng thái',
    categoryId: 'Danh mục',
    authorId: 'Tác giả',
    featured: 'Nổi bật',
    tags: 'Thẻ'
  };
  return labels[key] || key;
}

function getFilterDisplayValue(
  key: string, 
  value: any, 
  categories: Array<{ id: string; name: string }>, 
  authors: Array<{ id: string; name: string }>
): string {
  if (key === 'categoryId') {
    const category = categories.find(c => c.id === value);
    return category?.name || value;
  }
  
  if (key === 'authorId') {
    const author = authors.find(a => a.id === value);
    return author?.name || value;
  }
  
  if (key === 'status') {
    const status = ARTICLE_STATUS_OPTIONS.find(s => s.value === value);
    return status?.label || value;
  }
  
  return String(value);
}

function getFilterColor(key: string): 'primary' | 'secondary' | 'accent' {
  const colors: Record<string, 'primary' | 'secondary' | 'accent'> = {
    status: 'primary',
    categoryId: 'secondary',
    authorId: 'accent',
    featured: 'secondary',
    tags: 'accent'
  };
  return colors[key] || 'primary';
}

export default ArticlesFiltersPanel;
