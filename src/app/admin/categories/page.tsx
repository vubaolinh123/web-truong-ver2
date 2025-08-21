'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Trash2 } from 'lucide-react';

// Redux Hooks
import {
  useCategoriesRedux as useCategories,
  useCategoryStatisticsRedux as useCategoryStatistics,
  useCategoryMutationsRedux as useCategoryMutations,
  useCategorySearchRedux as useCategorySearch
} from '@/hooks/redux/useCategoriesRedux';

// Redesigned Components
import CategoriesPageHeader from '@/components/admin/categories/redesigned/CategoriesPageHeader';
import CategoriesStatsGrid from '@/components/admin/categories/redesigned/CategoriesStatsGrid';
import CategoriesFiltersPanel from '@/components/admin/categories/redesigned/CategoriesFiltersPanel';
import CategoriesDataGrid from '@/components/admin/categories/redesigned/CategoriesDataGrid';
import CategoriesCardGrid from '@/components/admin/categories/redesigned/CategoriesCardGrid';
import CategoryForm, { CategoryFormData } from '@/components/admin/categories/CategoryForm';

// Types
import { Category } from '@/lib/api/categories';

const CategoriesPage: React.FC = () => {
  // State
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Category | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<Category | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Hooks
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    pagination,
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
    deleteCategory
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

  // Page load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Update bulk actions visibility
  useEffect(() => {
    setShowBulkActions(selectedCategories.length > 0);
  }, [selectedCategories]);

  // Handlers
  const showNotification = useCallback((type: 'success' | 'error' | 'warning', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  }, []);

  const handleCreate = useCallback(() => {
    setShowCreateModal(true);
  }, []);

  const handleEdit = useCallback((category: Category) => {
    setShowEditModal(category);
  }, []);

  const handleDelete = useCallback((category: Category) => {
    setShowDeleteConfirm(category);
  }, []);

  const handleCreateCategory = useCallback(async (data: CategoryFormData) => {
    try {
      await createCategory(data);
      showNotification('success', 'Tạo danh mục thành công!');
      setShowCreateModal(false);
      refreshCategories();
      refreshStats();
    } catch (error) {
      showNotification('error', 'Có lỗi xảy ra khi tạo danh mục');
    }
  }, [createCategory, refreshCategories, refreshStats, showNotification]);

  const handleUpdateCategory = useCallback(async (data: CategoryFormData) => {
    if (!showEditModal) return;

    try {
      await updateCategory(showEditModal.id, data);
      showNotification('success', 'Cập nhật danh mục thành công!');
      setShowEditModal(null);
      refreshCategories();
      refreshStats();
    } catch (error) {
      showNotification('error', 'Có lỗi xảy ra khi cập nhật danh mục');
    }
  }, [showEditModal, updateCategory, refreshCategories, refreshStats, showNotification]);

  const handleDeleteCategory = useCallback(async (category: Category) => {
    try {
      await deleteCategory(category.id);
      showNotification('success', 'Xóa danh mục thành công!');
      setShowDeleteConfirm(null);
      refreshCategories();
      refreshStats();
    } catch (error) {
      showNotification('error', 'Có lỗi xảy ra khi xóa danh mục');
    }
  }, [deleteCategory, refreshCategories, refreshStats, showNotification]);

  const handleRefresh = useCallback(() => {
    refreshCategories();
    refreshStats();
    if (searchKeyword) {
      clearSearch();
    }
  }, [refreshCategories, refreshStats, searchKeyword, clearSearch]);

  const handleSearch = useCallback((keyword: string) => {
    if (keyword.trim()) {
      search(keyword);
    } else {
      clearSearch();
    }
  }, [search, clearSearch]);

  const handleViewModeChange = useCallback((mode: 'grid' | 'table') => {
    setViewMode(mode);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    updateParams({ page });
  }, [updateParams]);

  const handleLimitChange = useCallback((limit: number) => {
    updateParams({ limit, page: 1 });
  }, [updateParams]);

  const handleSortChange = useCallback((sortBy: string, sortOrder: 'asc' | 'desc') => {
    updateParams({ sortBy, sortOrder, page: 1 });
  }, [updateParams]);

  const handleFilterChange = useCallback((filters: any) => {
    updateParams({ ...filters, page: 1 });
  }, [updateParams]);

  const handleBulkDelete = useCallback(async () => {
    if (selectedCategories.length === 0) return;
    
    try {
      await Promise.all(selectedCategories.map(id => deleteCategory(id)));
      showNotification('success', `Đã xóa ${selectedCategories.length} danh mục thành công!`);
      setSelectedCategories([]);
      refreshCategories();
      refreshStats();
    } catch (error) {
      showNotification('error', 'Có lỗi xảy ra khi xóa danh mục');
    }
  }, [selectedCategories, deleteCategory, refreshCategories, refreshStats, showNotification]);

  const handleBulkStatusChange = useCallback(async (status: 'active' | 'inactive') => {
    if (selectedCategories.length === 0) return;
    
    try {
      await Promise.all(selectedCategories.map(id => 
        updateCategory(id, { status } as any)
      ));
      showNotification('success', `Đã cập nhật trạng thái ${selectedCategories.length} danh mục!`);
      setSelectedCategories([]);
      refreshCategories();
      refreshStats();
    } catch (error) {
      showNotification('error', 'Có lỗi xảy ra khi cập nhật trạng thái');
    }
  }, [selectedCategories, updateCategory, refreshCategories, refreshStats, showNotification]);

  const handleSelectionChange = useCallback((categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
  }, []);

  // Error handling
  if (categoriesError || statsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Có lỗi xảy ra</h3>
          <p className="text-gray-600 mb-4">Không thể tải dữ liệu danh mục</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 transition-all duration-1000 ${
      isPageLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="space-y-4 p-6">
        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' :
            'bg-yellow-500 text-white'
          }`}>
            <div className="flex items-center space-x-2">
              {notification.type === 'success' && <CheckCircle size={20} />}
              {notification.type === 'error' && <XCircle size={20} />}
              {notification.type === 'warning' && <AlertTriangle size={20} />}
              <span>{notification.message}</span>
            </div>
          </div>
        )}

        {/* Page Header */}
        <CategoriesPageHeader
          onRefresh={handleRefresh}
          onSearch={handleSearch}
          searchKeyword={searchKeyword}
          onClearSearch={clearSearch}
          onViewModeChange={handleViewModeChange}
          viewMode={viewMode}
          isLoading={isLoading}
          selectedCount={selectedCategories.length}
          onBulkDelete={handleBulkDelete}
          onBulkStatusChange={handleBulkStatusChange}
          showBulkActions={showBulkActions}
          onCreateCategory={handleCreate}
        />

        {/* Statistics Grid */}
        <CategoriesStatsGrid
          statistics={statistics}
          loading={statsLoading}
          className="mb-8"
        />

        {/* Filters Panel */}
        <CategoriesFiltersPanel
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          totalCount={pagination?.total || 0}
          currentPage={pagination?.page || 1}
          className="mb-8"
        />

        {/* Data Display */}
        {viewMode === 'table' ? (
          <CategoriesDataGrid
            categories={displayCategories}
            loading={isLoading}
            selectedCategories={selectedCategories}
            onSelectionChange={handleSelectionChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            pagination={pagination}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        ) : (
          <CategoriesCardGrid
            categories={displayCategories}
            loading={isLoading}
            selectedCategories={selectedCategories}
            onSelectionChange={handleSelectionChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            pagination={pagination}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        )}

        {/* Create Category Modal */}
        {showCreateModal && (
          <CategoryForm
            onSubmit={handleCreateCategory}
            onCancel={() => setShowCreateModal(false)}
            loading={mutationLoading}
            title="Tạo danh mục mới"
          />
        )}

        {/* Edit Category Modal */}
        {showEditModal && (
          <CategoryForm
            category={showEditModal}
            onSubmit={handleUpdateCategory}
            onCancel={() => setShowEditModal(null)}
            loading={mutationLoading}
            title="Chỉnh sửa danh mục"
          />
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <Trash2 size={20} className="text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Xác nhận xóa</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa danh mục <strong>{showDeleteConfirm.name}</strong>?
                Hành động này không thể hoàn tác.
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleDeleteCategory(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
