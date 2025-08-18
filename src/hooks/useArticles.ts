/**
 * Articles Custom Hooks
 * Custom hooks để quản lý articles state và operations
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Article,
  ArticleFormData,
  ArticleStatistics,
  ArticleSearchParams,
  ArticlePagination,
  BulkArticleOperation,
  DEFAULT_ARTICLE_PARAMS
} from '@/types/articles';
import { articlesApi, ArticleApiError } from '@/lib/api/articles';

// Hook for articles list with pagination and filters
export const useArticles = (initialParams: Partial<ArticleSearchParams> = {}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<ArticlePagination>({
    currentPage: 1,
    totalPages: 1,
    totalArticles: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [params, setParams] = useState<ArticleSearchParams>({
    ...DEFAULT_ARTICLE_PARAMS,
    ...initialParams
  });

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await articlesApi.getArticles(params);
      
      if (response.status === 'success') {
        setArticles(response.data.articles);
        setPagination(response.data.pagination);
      } else {
        setError(response.message || 'Lỗi khi tải danh sách bài viết');
      }
    } catch (err) {
      const errorMessage = err instanceof ArticleApiError 
        ? err.message 
        : 'Lỗi kết nối khi tải danh sách bài viết';
      setError(errorMessage);
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const updateParams = useCallback((newParams: Partial<ArticleSearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  const refresh = useCallback(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    loading,
    error,
    pagination,
    params,
    updateParams,
    refresh,
  };
};

// Hook for article statistics
export const useArticleStatistics = () => {
  const [statistics, setStatistics] = useState<ArticleStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await articlesApi.getStatistics();
      
      if (response.status === 'success') {
        // Validate and normalize statistics data
        const stats = response.data.statistics;
        const normalizedStats: ArticleStatistics = {
          total: stats.total || 0,
          published: stats.published || 0,
          draft: stats.draft || 0,
          archived: stats.archived || 0,
          featured: stats.featured || 0,
          totalViews: stats.totalViews || 0,
          totalLikes: stats.totalLikes || 0,
          totalComments: stats.totalComments || 0,
          averageReadingTime: stats.averageReadingTime || 0,
          articlesThisMonth: stats.articlesThisMonth || 0,
          articlesThisWeek: stats.articlesThisWeek || 0,
          topCategories: Array.isArray(stats.topCategories) ? stats.topCategories : [],
          topAuthors: Array.isArray(stats.topAuthors) ? stats.topAuthors : [],
          recentActivity: Array.isArray(stats.recentActivity) ? stats.recentActivity : []
        };
        
        setStatistics(normalizedStats);
      } else {
        setError(response.message || 'Lỗi khi tải thống kê bài viết');
      }
    } catch (err) {
      const errorMessage = err instanceof ArticleApiError 
        ? err.message 
        : 'Lỗi kết nối khi tải thống kê bài viết';
      setError(errorMessage);
      console.error('Error fetching article statistics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  const refresh = useCallback(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return {
    statistics,
    loading,
    error,
    refresh,
  };
};

// Hook for article mutations (create, update, delete)
export const useArticleMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createArticle = useCallback(async (data: ArticleFormData): Promise<Article> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await articlesApi.createArticle(data);
      
      if (response.status === 'success') {
        return response.data.article;
      } else {
        throw new ArticleApiError(response.message || 'Lỗi khi tạo bài viết');
      }
    } catch (err) {
      const errorMessage = err instanceof ArticleApiError 
        ? err.message 
        : 'Lỗi kết nối khi tạo bài viết';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateArticle = useCallback(async (id: string, data: Partial<ArticleFormData>): Promise<Article> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await articlesApi.updateArticle(id, data);
      
      if (response.status === 'success') {
        return response.data.article;
      } else {
        throw new ArticleApiError(response.message || 'Lỗi khi cập nhật bài viết');
      }
    } catch (err) {
      const errorMessage = err instanceof ArticleApiError 
        ? err.message 
        : 'Lỗi kết nối khi cập nhật bài viết';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteArticle = useCallback(async (id: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await articlesApi.deleteArticle(id);
      
      if (response.status !== 'success') {
        throw new ArticleApiError(response.message || 'Lỗi khi xóa bài viết');
      }
    } catch (err) {
      const errorMessage = err instanceof ArticleApiError 
        ? err.message 
        : 'Lỗi kết nối khi xóa bài viết';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const bulkOperation = useCallback(async (operation: BulkArticleOperation): Promise<{ affected: number; failed: string[] }> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await articlesApi.bulkOperation(operation);
      
      if (response.status === 'success') {
        return response.data;
      } else {
        throw new ArticleApiError(response.message || 'Lỗi khi thực hiện thao tác hàng loạt');
      }
    } catch (err) {
      const errorMessage = err instanceof ArticleApiError 
        ? err.message 
        : 'Lỗi kết nối khi thực hiện thao tác hàng loạt';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const publishArticle = useCallback(async (id: string): Promise<Article> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await articlesApi.publishArticle(id);
      
      if (response.status === 'success') {
        return response.data.article;
      } else {
        throw new ArticleApiError(response.message || 'Lỗi khi xuất bản bài viết');
      }
    } catch (err) {
      const errorMessage = err instanceof ArticleApiError 
        ? err.message 
        : 'Lỗi kết nối khi xuất bản bài viết';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    createArticle,
    updateArticle,
    deleteArticle,
    bulkOperation,
    publishArticle,
    clearError,
  };
};

// Hook for article search
export const useArticleSearch = () => {
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>('');

  const search = useCallback(async (query: string, filters: Partial<ArticleSearchParams> = {}) => {
    if (!query.trim()) {
      setResults([]);
      setKeyword('');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setKeyword(query);
      
      const response = await articlesApi.searchArticles(query, filters);
      
      if (response.status === 'success') {
        setResults(response.data.articles);
      } else {
        setError(response.message || 'Lỗi khi tìm kiếm bài viết');
      }
    } catch (err) {
      const errorMessage = err instanceof ArticleApiError 
        ? err.message 
        : 'Lỗi kết nối khi tìm kiếm bài viết';
      setError(errorMessage);
      console.error('Error searching articles:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setResults([]);
    setKeyword('');
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    keyword,
    search,
    clearSearch,
  };
};
