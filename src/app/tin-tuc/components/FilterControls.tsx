/**
 * Filter Controls Component
 * Client-side filter controls with form submission
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Filter, ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface FilterControlsProps {
  categories: Category[];
  currentCategory?: string;
  currentSort?: string;
  currentSearch?: string;
  totalResults: number;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  categories,
  currentCategory = '',
  currentSort = 'newest',
  currentSearch = '',
  totalResults
}) => {
  const hasActiveFilters = currentSearch || currentCategory || (currentSort && currentSort !== 'newest');
  const selectedCategory = categories.find(cat => cat.id === currentCategory);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Results Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
            <span className="text-gray-700">
              <span className="font-bold text-sky-500">{totalResults.toLocaleString()}</span> bài viết được tìm thấy
            </span>
          </div>
          {(currentSearch || currentCategory) && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Lọc theo:</span>
              {currentSearch && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  &ldquo;{currentSearch}&rdquo;
                </span>
              )}
              {selectedCategory && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {selectedCategory.name}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <form method="GET" className="flex gap-4">
            {/* Preserve existing params */}
            {currentSearch && <input type="hidden" name="search" value={currentSearch} />}
            
            {/* Category Filter */}
            <div className="relative">
              <select
                name="category"
                defaultValue={currentCategory}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 text-sm font-medium min-w-[160px]"
                onChange={(e) => {
                  const form = e.target.closest('form') as HTMLFormElement;
                  form.submit();
                }}
              >
                <option value="">📁 Tất cả danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <Filter size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <select
                name="sort"
                defaultValue={currentSort}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 text-sm font-medium min-w-[140px]"
                onChange={(e) => {
                  const form = e.target.closest('form') as HTMLFormElement;
                  form.submit();
                }}
              >
                <option value="newest">🕒 Mới nhất</option>
                <option value="oldest">📅 Cũ nhất</option>
                <option value="popular">🔥 Phổ biến</option>
                <option value="views">👁️ Nhiều lượt xem</option>
              </select>
              <ArrowRight size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
            </div>
          </form>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Link
              href="/tin-tuc"
              className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors border border-gray-300 rounded-xl hover:border-red-300 hover:bg-red-50"
            >
              ✕ Xóa bộ lọc
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
