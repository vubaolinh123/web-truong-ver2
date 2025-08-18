/**
 * Admin Categories Page
 * Trang quản lý categories cho admin dashboard
 */

'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Plus, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

// Hooks
import { 
  useCategories, 
  useCategoryStatistics, 
  useCategoryMutations,
  useCategorySearch 
} from '@/hooks/useCategories';

// Components
import CategoryStats from '@/components/admin/categories/CategoryStats';
import CategoryFilters from '@/components/admin/categories/CategoryFilters';
import CategoryTable from '@/components/admin/categories/CategoryTable';
import CategoryCard from '@/components/admin/categories/CategoryCard';
import Pagination from '@/components/ui/Pagination';

// Dynamic imports for better performance
const CategoryForm = dynamic(() => import('@/components/admin/categories/CategoryForm'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Đang tải form...</p>
      </div>
    </div>
  )
});

// Types
import { Category } from '@/lib/api/categories';
import { CategoryFormData } from '@/components/admin/categories/CategoryForm';

const CategoriesPage: React.FC = () => {
  // State
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Category | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  // Hooks
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    pagination,
    params,
    updateParams,
    refresh: refreshCategories
  } = useCategories();

  const {
    statistics,
    loading: statsLoading,
    error: statsError,
    refresh: refreshStats
  } = useCategoryStatistics();

  const {
    loading: mutationLoading,
    createCategory,
    updateCategory,
    deleteCategory,
    clearError: clearMutationError
  } = useCategoryMutations();

  const {
    results: searchResults,
    loading: searchLoading,
    keyword: searchKeyword,
    search,
    clearSearch
  } = useCategorySearch();

  // Computed values
  const displayCategories = searchKeyword ? searchResults : categories;
  const isLoading = categoriesLoading || mutationLoading || searchLoading;

  // Handlers
  const showNotification = useCallback((type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  }, []);

  const handleSearch = useCallback((keyword: string) => {
    if (keyword.trim()) {
      search(keyword, {
        status: params.status !== 'all' ? params.status : undefined,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder
      });
    } else {
      clearSearch();
    }
  }, [search, clearSearch, params]);

  const handleFilterChange = useCallback((filters: any) => {
    updateParams(filters);
    
    // If searching, update search with new filters
    if (searchKeyword) {
      search(searchKeyword, {
        status: filters.status !== 'all' ? filters.status : undefined,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder
      });
    }
  }, [updateParams, searchKeyword, search]);

  const handleSortChange = useCallback((sortBy: string, sortOrder: 'asc' | 'desc') => {
    updateParams({ sortBy, sortOrder });
    
    // If searching, update search with new sort
    if (searchKeyword) {
      search(searchKeyword, {
        status: params.status !== 'all' ? params.status : undefined,
        sortBy,
        sortOrder
      });
    }
  }, [updateParams, searchKeyword, search, params.status]);

  const handleRefresh = useCallback(() => {
    refreshCategories();
    refreshStats();
    if (searchKeyword) {
      search(searchKeyword);
    }
  }, [refreshCategories, refreshStats, searchKeyword, search]);

  const handleCreateCategory = useCallback(() => {
    setEditingCategory(null);
    setShowForm(true);
  }, []);

  const handleEditCategory = useCallback((category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  }, []);

  const handleViewCategory = useCallback((category: Category) => {
    // TODO: Implement view category details modal
    showNotification('success', `Xem chi tiết category: ${category.name}`);
  }, [showNotification]);

  const handleDeleteCategory = useCallback((category: Category) => {
    setShowDeleteConfirm(category);
  }, []);

  const handleFormSubmit = useCallback(async (data: CategoryFormData) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, data);
        showNotification('success', 'Cập nhật category thành công!');
      } else {
        await createCategory(data);
        showNotification('success', 'Tạo category mới thành công!');
      }
      
      setShowForm(false);
      setEditingCategory(null);
      refreshCategories();
      refreshStats();
      
      if (searchKeyword) {
        search(searchKeyword);
      }
    } catch (error) {
      showNotification('error', 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  }, [editingCategory, updateCategory, createCategory, showNotification, refreshCategories, refreshStats, searchKeyword, search]);

  const handleFormCancel = useCallback(() => {
    setShowForm(false);
    setEditingCategory(null);
    clearMutationError();
  }, [clearMutationError]);

  const confirmDelete = useCallback(async () => {
    if (!showDeleteConfirm) return;

    try {
      await deleteCategory(showDeleteConfirm.id);
      showNotification('success', 'Xóa category thành công!');
      setShowDeleteConfirm(null);
      refreshCategories();
      refreshStats();
      
      if (searchKeyword) {
        search(searchKeyword);
      }
    } catch (error) {
      showNotification('error', 'Không thể xóa category. Vui lòng thử lại.');
    }
  }, [showDeleteConfirm, deleteCategory, showNotification, refreshCategories, refreshStats, searchKeyword, search]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Categories</h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý danh mục bài viết và nội dung website
          </p>
        </div>
        
        <button
          onClick={handleCreateCategory}
          className="mt-4 lg:mt-0 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          disabled={isLoading}
        >
          <Plus size={20} />
          <span>Tạo Category Mới</span>
        </button>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`p-4 rounded-lg border ${
          notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
          'bg-yellow-50 border-yellow-200 text-yellow-800'
        }`}>
          <div className="flex items-center space-x-2">
            {notification.type === 'success' && <CheckCircle size={20} />}
            {notification.type === 'error' && <XCircle size={20} />}
            {notification.type === 'warning' && <AlertTriangle size={20} />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Error Display */}
      {categoriesError && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <XCircle size={20} />
            <span>Lỗi: {categoriesError}</span>
          </div>
        </div>
      )}

      {/* Statistics Error */}
      {statsError && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle size={20} />
            <span>Lỗi thống kê: {statsError}</span>
            <button
              onClick={refreshStats}
              className="ml-auto px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
            >
              Thử lại
            </button>
          </div>
        </div>
      )}

      {/* Statistics */}
      <CategoryStats statistics={statistics} loading={statsLoading} />

      {/* Filters */}
      <CategoryFilters
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onViewModeChange={setViewMode}
        onRefresh={handleRefresh}
        loading={isLoading}
        viewMode={viewMode}
        totalCount={searchKeyword ? searchResults.length : pagination.totalCategories}
      />

      {/* Categories List */}
      {viewMode === 'table' ? (
        <CategoryTable
          categories={displayCategories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          onView={handleViewCategory}
          onSort={handleSortChange}
          sortField={params.sortBy}
          sortDirection={params.sortOrder}
          loading={isLoading}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
              onView={handleViewCategory}
              loading={isLoading}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!searchKeyword && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalCategories}
          itemsPerPage={pagination.limit}
          onPageChange={(page) => updateParams({ page })}
          loading={isLoading}
        />
      )}

      {/* Category Form Modal */}
      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          loading={mutationLoading}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle size={24} className="text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                Xác nhận xóa category
              </h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa category "{showDeleteConfirm.name}"? 
              Hành động này không thể hoàn tác.
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={mutationLoading}
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                disabled={mutationLoading}
              >
                {mutationLoading ? 'Đang xóa...' : 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
