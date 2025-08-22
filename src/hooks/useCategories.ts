/**
 * Categories Hooks - Real API implementation
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Category,
  CategoryStatistics,
  CreateCategoryData,
  categoriesApi
} from '@/lib/api/categories';
import { ApiError, handleApiError } from '@/lib/utils/errorHandler';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    status: 'all',
    sortBy: 'name',
    sortOrder: 'asc' as 'asc' | 'desc'
  });

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const apiParams = {
        page: params.page,
        limit: params.limit,
        ...(params.status !== 'all' && { status: params.status }),
        sortBy: params.sortBy,
        sortOrder: params.sortOrder
      };

      const response = await categoriesApi.getCategories(apiParams);

      if (response.status === 'success') {
        setCategories(response.data.categories);
        setPagination({
          page: response.data.pagination.currentPage,
          limit: response.data.pagination.limit,
          total: response.data.pagination.totalCategories,
          totalPages: response.data.pagination.totalPages,
          hasNextPage: response.data.pagination.hasNextPage,
          hasPrevPage: response.data.pagination.hasPrevPage
        });
      } else {
        throw new Error(response.message || 'Không thể tải danh sách danh mục');
      }
    } catch (err: unknown) {
      console.error('Error loading categories:', err);
      if (err instanceof ApiError) {
        setError(`Lỗi API: ${err.message}`);
      } else {
        setError('Không thể tải danh sách danh mục. Vui lòng thử lại.');
      }
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const updateParams = useCallback((newParams: Partial<typeof params>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  const refresh = useCallback(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    loading,
    error,
    pagination,
    params,
    updateParams,
    refresh
  };
};

export const useCategoryStatistics = () => {
  const [statistics, setStatistics] = useState<CategoryStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStatistics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await categoriesApi.getStatistics();

      if (response.status === 'success') {
        // Ensure all required fields exist with fallbacks
        const stats = response.data.statistics;
        setStatistics({
          total: stats.total || 0,
          active: stats.active || 0,
          inactive: stats.inactive || 0,
          totalArticles: stats.totalArticles || 0,
          averageArticlesPerCategory: stats.averageArticlesPerCategory || 0,
          categoriesWithMostArticles: stats.categoriesWithMostArticles || []
        });
      } else {
        throw new Error(response.message || 'Không thể tải thống kê danh mục');
      }
    } catch (err: unknown) {
      console.error('Error loading statistics:', err);
      if (err instanceof ApiError) {
        setError(`Lỗi API: ${err.message}`);
      } else {
        setError('Không thể tải thống kê danh mục. Vui lòng thử lại.');
      }
      // Set fallback statistics to prevent crashes
      setStatistics({
        total: 0,
        active: 0,
        inactive: 0,
        totalArticles: 0,
        averageArticlesPerCategory: 0,
        categoriesWithMostArticles: []
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    loadStatistics();
  }, [loadStatistics]);

  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  return {
    statistics,
    loading,
    error,
    refresh
  };
};

export const useCategoryMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCategory = useCallback(async (data: CreateCategoryData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await categoriesApi.createCategory(data);

      if (response.status === 'success') {
        return response.data.category;
      } else {
        throw new Error(response.message || 'Không thể tạo danh mục');
      }
    } catch (err: unknown) {
      const errorMessage = handleApiError(err, 'Không thể tạo danh mục.');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCategory = useCallback(async (id: string, data: Partial<CreateCategoryData>) => {
    try {
      setLoading(true);
      setError(null);

      const response = await categoriesApi.updateCategory(id, data);

      if (response.status === 'success') {
        return response.data.category;
      } else {
        throw new Error(response.message || 'Không thể cập nhật danh mục');
      }
    } catch (err: unknown) {
      const errorMessage = handleApiError(err, 'Không thể cập nhật danh mục.');
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await categoriesApi.deleteCategory(id);

      if (response.status === 'success') {
        return true;
      } else {
        throw new Error(response.message || 'Không thể xóa danh mục');
      }
    } catch (err: unknown) {
      // The handleApiError function will show the toast
      const errorMessage = handleApiError(err, 'Không thể xóa danh mục.');
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
    createCategory,
    updateCategory,
    deleteCategory,
    clearError
  };
};

export const useCategorySearch = () => {
  const [results, setResults] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (searchKeyword: string) => {
    if (!searchKeyword.trim()) {
      setResults([]);
      setKeyword('');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setKeyword(searchKeyword);

      const response = await categoriesApi.searchCategories({
        keyword: searchKeyword,
        limit: 50,
        sortBy: 'name',
        sortOrder: 'asc'
      });

      if (response.status === 'success') {
        setResults(response.data.categories);
      } else {
        throw new Error(response.message || 'Không thể tìm kiếm danh mục');
      }
    } catch (err: unknown) {
      console.error('Error searching categories:', err);
      if (err instanceof ApiError) {
        setError(`Lỗi API: ${err.message}`);
      } else {
        setError('Không thể tìm kiếm danh mục. Vui lòng thử lại.');
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setKeyword('');
    setResults([]);
    setError(null);
  }, []);

  return {
    results,
    loading,
    keyword,
    error,
    search,
    clearSearch
  };
};
