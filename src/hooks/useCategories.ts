/**
 * Custom Hooks for Categories Management
 * Quản lý state và logic cho categories
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { categoriesApi, Category, CategoryStatistics, ApiError } from '@/lib/api/categories';

// Hook for categories list with pagination
export const useCategories = (initialParams: {
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} = {}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCategories: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    ...initialParams,
  });

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await categoriesApi.getCategories(params);
      
      if (response.status === 'success') {
        setCategories(response.data.categories);
        setPagination(response.data.pagination);
      } else {
        setError(response.message || 'Lỗi khi tải danh sách categories');
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Lỗi kết nối khi tải categories';
      setError(errorMessage);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const updateParams = useCallback((newParams: Partial<typeof params>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  const refresh = useCallback(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    pagination,
    params,
    updateParams,
    refresh,
  };
};

// Hook for single category
export const useCategory = (id: string | null) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await categoriesApi.getCategory(id);
      
      if (response.status === 'success') {
        setCategory(response.data.category);
      } else {
        setError(response.message || 'Lỗi khi tải thông tin category');
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Lỗi kết nối khi tải category';
      setError(errorMessage);
      console.error('Error fetching category:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCategory();
    } else {
      setCategory(null);
      setError(null);
    }
  }, [fetchCategory, id]);

  const refresh = useCallback(() => {
    fetchCategory();
  }, [fetchCategory]);

  return {
    category,
    loading,
    error,
    refresh,
  };
};

// Hook for category statistics
export const useCategoryStatistics = () => {
  const [statistics, setStatistics] = useState<CategoryStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatistics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await categoriesApi.getStatistics();
      
      if (response.status === 'success') {
        // Validate and normalize statistics data
        const stats = response.data.statistics;
        const normalizedStats: CategoryStatistics = {
          total: stats.total || 0,
          active: stats.active || 0,
          inactive: stats.inactive || 0,
          totalArticles: stats.totalArticles || 0,
          averageArticlesPerCategory: stats.averageArticlesPerCategory || 0,
          categoriesWithMostArticles: Array.isArray(stats.categoriesWithMostArticles)
            ? stats.categoriesWithMostArticles
            : []
        };

        setStatistics(normalizedStats);
      } else {
        setError(response.message || 'Lỗi khi tải thống kê');
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Lỗi kết nối khi tải thống kê';
      setError(errorMessage);
      console.error('Error fetching statistics:', err);
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

// Hook for category search
export const useCategorySearch = () => {
  const [results, setResults] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');

  const search = useCallback(async (searchKeyword: string, options: {
    status?: string;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}) => {
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
        ...options,
      });
      
      if (response.status === 'success') {
        setResults(response.data.categories);
      } else {
        setError(response.message || 'Lỗi khi tìm kiếm');
        setResults([]);
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Lỗi kết nối khi tìm kiếm';
      setError(errorMessage);
      setResults([]);
      console.error('Error searching categories:', err);
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

// Hook for category mutations (create, update, delete)
export const useCategoryMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCategory = useCallback(async (data: {
    name: string;
    description?: string;
    status?: 'active' | 'inactive';
    color?: string;
    icon?: string;
    sortOrder?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await categoriesApi.createCategory(data);
      
      if (response.status === 'success') {
        return response.data.category;
      } else {
        throw new Error(response.message || 'Lỗi khi tạo category');
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Lỗi kết nối khi tạo category';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCategory = useCallback(async (id: string, data: {
    name?: string;
    description?: string;
    status?: 'active' | 'inactive';
    color?: string;
    icon?: string;
    sortOrder?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await categoriesApi.updateCategory(id, data);
      
      if (response.status === 'success') {
        return response.data.category;
      } else {
        throw new Error(response.message || 'Lỗi khi cập nhật category');
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Lỗi kết nối khi cập nhật category';
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
        throw new Error(response.message || 'Lỗi khi xóa category');
      }
    } catch (err) {
      const errorMessage = err instanceof ApiError 
        ? err.message 
        : 'Lỗi kết nối khi xóa category';
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
    clearError,
  };
};

// Memoized hook for category options (for select dropdowns)
export const useCategoryOptions = (activeOnly: boolean = true) => {
  const { categories, loading, error } = useCategories({
    status: activeOnly ? 'active' : undefined,
    limit: 100, // Get all categories for options
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const options = useMemo(() => {
    return categories.map(category => ({
      value: category.id,
      label: category.name,
      color: category.color,
      articleCount: category.articleCount,
    }));
  }, [categories]);

  return {
    options,
    loading,
    error,
  };
};
