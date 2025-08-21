/**
 * Admin Articles Page - Redesigned
 * Anime-inspired dark theme articles management page
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Plus, AlertTriangle, CheckCircle, XCircle, Trash2, Edit } from 'lucide-react';

// Redux Hooks
import {
  useArticlesRedux as useArticles,
  useArticleStatisticsRedux as useArticleStatistics,
  useArticleMutationsRedux as useArticleMutations,
  useArticleSearchRedux as useArticleSearch
} from '@/hooks/redux/useArticlesRedux';

// Redesigned Components
import ArticlesPageHeader from '@/components/admin/articles/redesigned/ArticlesPageHeader';
import ArticlesStatsGrid from '@/components/admin/articles/redesigned/ArticlesStatsGrid';
import ArticlesFiltersPanel from '@/components/admin/articles/redesigned/ArticlesFiltersPanel';
import ArticlesDataGrid from '@/components/admin/articles/redesigned/ArticlesDataGrid';
import ArticlesCardGrid from '@/components/admin/articles/redesigned/ArticlesCardGrid';

// Legacy Components (for fallback)
import Pagination from '@/components/ui/Pagination';

// Types
import { Article } from '@/types/articles';
import { ArticleFormData } from '@/types/articles';

// Import animations
import '@/components/admin/articles/redesigned/animations.css';

const ArticlesPage: React.FC = () => {
  // State
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Article | null>(null);
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

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
  const totalCount = searchKeyword ? searchResults.length : (pagination?.totalArticles || 0);

  // Page load effect
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  const handleRefresh = useCallback(async () => {
    await Promise.all([refreshArticles(), refreshStats()]);
    showNotification('success', 'Dữ liệu đã được làm mới');
  }, [refreshArticles, refreshStats, showNotification]);

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

  // handleEditArticle removed - using direct navigation now

  const handleViewArticle = useCallback((article: Article) => {
    // Navigate to article detail page with correct Vietnamese URL structure
    window.open(`/tin-tuc/${article.slug}`, '_blank');
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

  // Remove form handlers since we're using separate pages now

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
    <div className={`
      min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100
      transition-all duration-1000 ease-in-out
      ${isPageLoaded ? 'opacity-100' : 'opacity-0'}
    `}>
      {/* Main content */}
      <div className="space-y-4 p-6">
        {/* Page Header */}
        <ArticlesPageHeader
          totalCount={totalCount}
          selectedCount={selectedArticles.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onRefresh={handleRefresh}
          loading={isLoading}
          className="animate-slide-in-top"
        />

        {/* Notification */}
        {notification && (
          <div className={`
            fixed top-4 right-4 z-50 p-4 rounded-xl border backdrop-blur-sm shadow-2xl animate-slide-in-top
            ${notification.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : notification.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-yellow-50 border-yellow-200 text-yellow-800'
            }
          `}>
            <div className="flex items-center space-x-2">
              {notification.type === 'success' && <CheckCircle size={20} />}
              {notification.type === 'error' && <XCircle size={20} />}
              {notification.type === 'warning' && <AlertTriangle size={20} />}
              <span className="font-medium">{notification.message}</span>
            </div>
          </div>
        )}

        {/* Statistics Grid - Compact */}
        <ArticlesStatsGrid
          statistics={statistics}
          loading={statsLoading}
          className="animate-slide-in-bottom"
        />

        {/* Filters Panel */}
        <ArticlesFiltersPanel
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          loading={isLoading}
          totalCount={totalCount}
          className="animate-fade-in-scale"
        />

        {/* Articles Content */}
        {viewMode === 'table' ? (
          <ArticlesDataGrid
            articles={displayArticles}
            onDelete={handleDeleteArticle}
            onView={handleViewArticle}
            onSort={handleSortChange}
            sortField={params.sortBy}
            sortDirection={params.sortOrder}
            loading={isLoading}
            selectedArticles={selectedArticles}
            onSelectArticle={handleSelectArticle}
            onSelectAll={handleSelectAll}
            className="animate-fade-in-scale"
          />
        ) : (
          <ArticlesCardGrid
            articles={displayArticles}
            onDelete={handleDeleteArticle}
            onView={handleViewArticle}
            loading={isLoading}
            selectedArticles={selectedArticles}
            onSelectArticle={handleSelectArticle}
            className="animate-fade-in-scale"
          />
        )}

        {/* Pagination */}
        {!searchKeyword && pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center animate-slide-in-bottom">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalArticles}
              itemsPerPage={pagination.limit}
              onPageChange={(page) => updateParams({ page })}
              loading={isLoading}
            />
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="absolute inset-0 bg-black/30" onClick={() => setShowDeleteConfirm(null)} />

            <div className="relative bg-white border border-red-200 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in-scale">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-50 border border-red-200 rounded-xl">
                  <AlertTriangle size={24} className="text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-red-700">
                  Xác nhận xóa bài viết
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                Bạn có chắc chắn muốn xóa bài viết <span className="font-medium text-gray-900">"{showDeleteConfirm.title}"</span>?
                Hành động này không thể hoàn tác.
              </p>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-all duration-200 hover:scale-105"
                  disabled={mutationLoading}
                >
                  Hủy
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 border border-red-500 rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-200 hover:scale-105 disabled:opacity-50"
                  disabled={mutationLoading}
                >
                  {mutationLoading ? 'Đang xóa...' : 'Xóa'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
