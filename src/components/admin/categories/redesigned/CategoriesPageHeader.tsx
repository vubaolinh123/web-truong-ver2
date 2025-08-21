/**
 * Categories Page Header - Redesigned
 * Matches articles page header design exactly
 */

'use client';

import React from 'react';
import { 
  Plus, 
  RefreshCw, 
  Search, 
  Grid3X3, 
  List, 
  Trash2, 
  CheckCircle, 
  XCircle,
  X 
} from 'lucide-react';

interface CategoriesPageHeaderProps {
  onRefresh: () => void;
  onSearch: (keyword: string) => void;
  searchKeyword: string;
  onClearSearch: () => void;
  onViewModeChange: (mode: 'grid' | 'table') => void;
  viewMode: 'grid' | 'table';
  isLoading: boolean;
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkStatusChange: (status: 'active' | 'inactive') => void;
  showBulkActions: boolean;
  onCreateCategory: () => void;
}

const CategoriesPageHeader: React.FC<CategoriesPageHeaderProps> = ({
  onRefresh,
  onSearch,
  searchKeyword,
  onClearSearch,
  onViewModeChange,
  viewMode,
  isLoading,
  selectedCount,
  onBulkDelete,
  onBulkStatusChange,
  showBulkActions,
  onCreateCategory
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8 animate-slideInDown">
      {/* Main Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left side - Title and description */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Grid3X3 size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý danh mục</h1>
              <p className="text-gray-600">Tạo và quản lý các danh mục cho bài viết</p>
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchKeyword}
              onChange={handleSearchChange}
              className="
                block w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                placeholder-gray-400 text-sm bg-gray-50 hover:bg-white transition-colors
              "
            />
            {searchKeyword && (
              <button
                onClick={onClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => onViewModeChange('table')}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${viewMode === 'table' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
                }
              `}
            >
              <List size={16} />
              <span className="hidden sm:inline">Bảng</span>
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${viewMode === 'grid' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
                }
              `}
            >
              <Grid3X3 size={16} />
              <span className="hidden sm:inline">Lưới</span>
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="
              flex items-center space-x-2 px-4 py-2.5 
              bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl
              transition-all duration-200 font-medium
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <RefreshCw 
              size={16} 
              className={isLoading ? 'animate-spin' : ''} 
            />
            <span className="hidden sm:inline">Làm mới</span>
          </button>

          {/* Create Button */}
          <button
            onClick={onCreateCategory}
            className="
              flex items-center space-x-2 px-4 py-2.5
              bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
              text-white rounded-xl transition-all duration-200 font-medium
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              shadow-lg hover:shadow-xl transform hover:scale-105
            "
          >
            <Plus size={16} />
            <span>Tạo danh mục</span>
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {showBulkActions && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl animate-slideInUp">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle size={16} className="text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-900">
                Đã chọn {selectedCount} danh mục
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onBulkStatusChange('active')}
                className="
                  flex items-center space-x-2 px-3 py-2 
                  bg-green-600 hover:bg-green-700 text-white rounded-lg
                  transition-colors duration-200 text-sm font-medium
                "
              >
                <CheckCircle size={14} />
                <span>Kích hoạt</span>
              </button>
              
              <button
                onClick={() => onBulkStatusChange('inactive')}
                className="
                  flex items-center space-x-2 px-3 py-2 
                  bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg
                  transition-colors duration-200 text-sm font-medium
                "
              >
                <XCircle size={14} />
                <span>Vô hiệu hóa</span>
              </button>
              
              <button
                onClick={onBulkDelete}
                className="
                  flex items-center space-x-2 px-3 py-2 
                  bg-red-600 hover:bg-red-700 text-white rounded-lg
                  transition-colors duration-200 text-sm font-medium
                "
              >
                <Trash2 size={14} />
                <span>Xóa</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPageHeader;
