/**
 * Admin Articles Page
 * Trang quản lý articles cho admin dashboard
 */

'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Plus, AlertTriangle, CheckCircle, XCircle, Trash2 } from 'lucide-react';

// Hooks
import { 
  useArticles, 
  useArticleStatistics, 
  useArticleMutations,
  useArticleSearch 
} from '@/hooks/useArticles';

// Components
import ArticleStats from '@/components/admin/articles/ArticleStats';
import ArticleFilters from '@/components/admin/articles/ArticleFilters';
import ArticleTable from '@/components/admin/articles/ArticleTable';
import ArticleCard from '@/components/admin/articles/ArticleCard';
import Pagination from '@/components/ui/Pagination';

// Dynamic imports for better performance
const ArticleForm = dynamic(() => import('@/components/admin/articles/ArticleForm'), {
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
import { Article } from '@/types/articles';
import { ArticleFormData } from '@/types/articles';

const ArticlesPage: React.FC = () => {
  // State
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Article | null>(null);
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  // Hooks
  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
    pagination,
    params,
    updateParams,
    refresh: refreshArticles
  } = useArticles();

  const {
    statistics,
    loading: statsLoading,
    error: statsError,
    refresh: refreshStats
  } = useArticleStatistics();

  const {
    loading: mutationLoading,
    createArticle,
    updateArticle,
    deleteArticle,
    bulkOperation,
    clearError: clearMutationError
  } = useArticleMutations();

  const {
    results: searchResults,
    loading: searchLoading,
    keyword: searchKeyword,
    search,
    clearSearch
  } = useArticleSearch();

  // Computed values
  const displayArticles = searchKeyword ? searchResults : articles;
  const isLoading = articlesLoading || mutationLoading || searchLoading;

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
    refreshArticles();
    refreshStats();
    if (searchKeyword) {
      search(searchKeyword);
    }
  }, [refreshArticles, refreshStats, searchKeyword, search]);

  const handleCreateArticle = useCallback(() => {
    setEditingArticle(null);
    setShowForm(true);
  }, []);

  const handleEditArticle = useCallback((article: Article) => {
    setEditingArticle(article);
    setShowForm(true);
  }, []);

  const handleViewArticle = useCallback((article: Article) => {
    // TODO: Implement view article details modal or navigate to article page
    window.open(`/articles/${article.slug}`, '_blank');
  }, []);

  const handleDeleteArticle = useCallback((article: Article) => {
    setShowDeleteConfirm(article);
  }, []);

  const handleSelectArticle = useCallback((articleId: string) => {
    setSelectedArticles(prev => {
      const newSelected = prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId];
      setShowBulkActions(newSelected.length > 0);
      return newSelected;
    });
  }, []);

  const handleSelectAll = useCallback((selected: boolean) => {
    if (selected) {
      const allIds = displayArticles.map(article => article.id);
      setSelectedArticles(allIds);
      setShowBulkActions(allIds.length > 0);
    } else {
      setSelectedArticles([]);
      setShowBulkActions(false);
    }
  }, [displayArticles]);

  const handleBulkDelete = useCallback(async () => {
    if (selectedArticles.length === 0) return;

    try {
      await bulkOperation({
        action: 'delete',
        articleIds: selectedArticles
      });
      
      showNotification('success', `Đã xóa ${selectedArticles.length} bài viết thành công!`);
      setSelectedArticles([]);
      setShowBulkActions(false);
      refreshArticles();
      refreshStats();
    } catch (error) {
      showNotification('error', 'Có lỗi xảy ra khi xóa bài viết. Vui lòng thử lại.');
    }
  }, [selectedArticles, bulkOperation, showNotification, refreshArticles, refreshStats]);

  const handleFormSubmit = useCallback(async (data: ArticleFormData) => {
    try {
      if (editingArticle) {
        await updateArticle(editingArticle.id, data);
        showNotification('success', 'Cập nhật bài viết thành công!');
      } else {
        await createArticle(data);
        showNotification('success', 'Tạo bài viết mới thành công!');
      }
      
      setShowForm(false);
      setEditingArticle(null);
      refreshArticles();
      refreshStats();
      
      if (searchKeyword) {
        search(searchKeyword);
      }
    } catch (error) {
      showNotification('error', 'Có lỗi xảy ra. Vui lòng thử lại.');
    }
  }, [editingArticle, updateArticle, createArticle, showNotification, refreshArticles, refreshStats, searchKeyword, search]);

  const handleFormCancel = useCallback(() => {
    setShowForm(false);
    setEditingArticle(null);
    clearMutationError();
  }, [clearMutationError]);

  const confirmDelete = useCallback(async () => {
    if (!showDeleteConfirm) return;

    try {
      await deleteArticle(showDeleteConfirm.id);
      showNotification('success', 'Xóa bài viết thành công!');
      setShowDeleteConfirm(null);
      refreshArticles();
      refreshStats();
      
      if (searchKeyword) {
        search(searchKeyword);
      }
    } catch (error) {
      showNotification('error', 'Không thể xóa bài viết. Vui lòng thử lại.');
    }
  }, [showDeleteConfirm, deleteArticle, showNotification, refreshArticles, refreshStats, searchKeyword, search]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản Lý Bài Viết</h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý nội dung bài viết và tin tức website
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex items-center space-x-3">
          {/* Bulk Actions */}
          {showBulkActions && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-sm text-blue-700">
                Đã chọn {selectedArticles.length} bài viết
              </span>
              <button
                onClick={handleBulkDelete}
                className="flex items-center space-x-1 px-2 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                <Trash2 size={14} />
                <span>Xóa</span>
              </button>
            </div>
          )}
          
          <button
            onClick={handleCreateArticle}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            disabled={isLoading}
          >
            <Plus size={20} />
            <span>Tạo Bài Viết Mới</span>
          </button>
        </div>
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
      {articlesError && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <XCircle size={20} />
            <span>Lỗi: {articlesError}</span>
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
      <ArticleStats statistics={statistics} loading={statsLoading} />

      {/* Filters */}
      <ArticleFilters
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onViewModeChange={setViewMode}
        onRefresh={handleRefresh}
        loading={isLoading}
        viewMode={viewMode}
        totalCount={searchKeyword ? searchResults.length : pagination.totalArticles}
      />

      {/* Articles List */}
      {viewMode === 'table' ? (
        <ArticleTable
          articles={displayArticles}
          onEdit={handleEditArticle}
          onDelete={handleDeleteArticle}
          onView={handleViewArticle}
          onSort={handleSortChange}
          sortField={params.sortBy}
          sortDirection={params.sortOrder}
          loading={isLoading}
          selectedArticles={selectedArticles}
          onSelectArticle={handleSelectArticle}
          onSelectAll={handleSelectAll}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
              onView={handleViewArticle}
              loading={isLoading}
              selected={selectedArticles.includes(article.id)}
              onSelect={handleSelectArticle}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!searchKeyword && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalArticles}
          itemsPerPage={pagination.limit}
          onPageChange={(page) => updateParams({ page })}
          loading={isLoading}
        />
      )}

      {/* Article Form Modal */}
      {showForm && (
        <ArticleForm
          article={editingArticle}
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
                Xác nhận xóa bài viết
              </h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa bài viết "{showDeleteConfirm.title}"? 
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

export default ArticlesPage;
