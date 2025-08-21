/**
 * Lazy Categories Hook
 * Hook for lazy loading categories only when needed
 */

'use client';

import { useState, useCallback } from 'react';
import { categoriesApi, Category, ApiError } from '@/lib/api/categories';

interface UseLazyCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
  loadCategories: () => Promise<void>;
  isLoaded: boolean;
}

export const useLazyCategories = (): UseLazyCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadCategories = useCallback(async () => {
    // Don't reload if already loaded
    if (isLoaded && categories.length > 0) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Fetch all active categories without pagination for form dropdown
      const response = await categoriesApi.getCategories({
        status: 'active',
        limit: 100, // Get enough categories for dropdown
        sortBy: 'name',
        sortOrder: 'asc'
      });
      
      if (response.status === 'success') {
        setCategories(response.data.categories || []);
        setIsLoaded(true);
        console.log('Categories loaded:', response.data.categories?.length || 0);
      } else {
        setError(response.message || 'Lỗi khi tải danh sách categories');
        console.error('Categories API error:', response.message);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof ApiError
        ? err.message
        : 'Lỗi kết nối khi tải categories';
      setError(errorMessage);
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, categories.length]);

  return {
    categories,
    loading,
    error,
    loadCategories,
    isLoaded
  };
};
