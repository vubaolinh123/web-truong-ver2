/**
 * Redux-based Articles Hooks
 * Replacement for the original useArticles hooks using Redux state management
 */

import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  fetchArticles,
  fetchArticle,
  fetchArticleStatistics,
  searchArticles,
  createArticle as createArticleAction,
  updateArticle as updateArticleAction,
  deleteArticle as deleteArticleAction,
  updateParams,
  clearError as clearArticlesError,
  clearSearchResults,
  setSearchKeyword,
  clearCurrentArticle,
  selectArticles,
  selectArticlesLoading,
  selectArticlesError,
  selectArticlesPagination,
  selectArticlesParams,
  selectArticlesStatistics,
  selectArticlesStatisticsLoading,
  selectArticlesSearchResults,
  selectArticlesSearchLoading,
  selectArticlesSearchKeyword,
  selectCurrentArticle,
  selectCurrentArticleLoading,
  selectArticlesMutationLoading,
} from '@/lib/features/articles/articlesSlice';
import { ArticleFormData, ArticleSearchParams, BulkArticleOperation } from '@/types/articles';
import { articlesApi } from '@/lib/api/articles';

// Main articles hook - replaces useArticles
export const useArticlesRedux = (initialParams: Partial<ArticleSearchParams> = {}) => {
  const dispatch = useAppDispatch();
  
  const articles = useAppSelector(selectArticles);
  const loading = useAppSelector(selectArticlesLoading);
  const error = useAppSelector(selectArticlesError);
  const pagination = useAppSelector(selectArticlesPagination);
  const params = useAppSelector(selectArticlesParams);

  // Initialize params if provided
  useEffect(() => {
    if (Object.keys(initialParams).length > 0) {
      dispatch(updateParams(initialParams));
    }
  }, [dispatch, initialParams]);

  // Load articles when params change
  useEffect(() => {
    dispatch(fetchArticles(params));
  }, [dispatch, params]);

  const updateParamsCallback = useCallback((newParams: Partial<ArticleSearchParams>) => {
    dispatch(updateParams(newParams));
  }, [dispatch]);

  const refresh = useCallback(() => {
    dispatch(fetchArticles(params));
  }, [dispatch, params]);

  return {
    articles,
    loading,
    error,
    pagination,
    params,
    updateParams: updateParamsCallback,
    refresh,
  };
};

// Single article hook - replaces useArticle
export const useArticleRedux = (id: string) => {
  const dispatch = useAppDispatch();
  
  const data = useAppSelector(selectCurrentArticle);
  const isLoading = useAppSelector(selectCurrentArticleLoading);
  const error = useAppSelector((state) => state.articles.currentArticleError);

  useEffect(() => {
    if (id) {
      dispatch(fetchArticle(id));
    }
    
    // Cleanup when component unmounts or id changes
    return () => {
      dispatch(clearCurrentArticle());
    };
  }, [dispatch, id]);

  const refresh = useCallback(() => {
    if (id) {
      dispatch(fetchArticle(id));
    }
  }, [dispatch, id]);

  return {
    data,
    isLoading,
    error,
    refresh,
  };
};

// Article statistics hook - replaces useArticleStatistics
export const useArticleStatisticsRedux = () => {
  const dispatch = useAppDispatch();
  
  const statistics = useAppSelector(selectArticlesStatistics);
  const loading = useAppSelector(selectArticlesStatisticsLoading);
  const error = useAppSelector((state) => state.articles.statisticsError);

  useEffect(() => {
    dispatch(fetchArticleStatistics());
  }, [dispatch]);

  const refresh = useCallback(() => {
    dispatch(fetchArticleStatistics());
  }, [dispatch]);

  return {
    statistics,
    loading,
    error,
    refresh,
  };
};

// Article mutations hook - replaces useArticleMutations
export const useArticleMutationsRedux = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectArticlesMutationLoading);
  const error = useAppSelector((state) => state.articles.mutationError);
  const currentParams = useAppSelector(selectArticlesParams);

  const createArticle = useCallback(async (data: ArticleFormData) => {
    const result = await dispatch(createArticleAction(data));
    if (createArticleAction.rejected.match(result)) {
      throw new Error(result.payload as string);
    }
    return result.payload;
  }, [dispatch]);

  const updateArticle = useCallback(async (id: string, data: Partial<ArticleFormData>) => {
    const result = await dispatch(updateArticleAction({ id, data }));
    if (updateArticleAction.rejected.match(result)) {
      throw new Error(result.payload as string);
    }
    return result.payload;
  }, [dispatch]);

  const deleteArticle = useCallback(async (id: string) => {
    const result = await dispatch(deleteArticleAction(id));
    if (deleteArticleAction.rejected.match(result)) {
      throw new Error(result.payload as string);
    }
    return result.payload;
  }, [dispatch]);

  const bulkOperation = useCallback(async (operation: BulkArticleOperation) => {
    try {
      const response = await articlesApi.bulkOperation(operation);
      if (response.status === 'success') {
        // Refresh articles after bulk operation using current params
        dispatch(fetchArticles(currentParams));
        return response.data;
      } else {
        throw new Error(response.message || 'Lỗi khi thực hiện thao tác hàng loạt');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Lỗi kết nối khi thực hiện thao tác hàng loạt';
      throw new Error(message);
    }
  }, [dispatch, currentParams]);

  const publishArticle = useCallback(async (id: string) => {
    try {
      const response = await articlesApi.publishArticle(id);
      if (response.status === 'success') {
        // Update the article in Redux state
        dispatch(updateArticleAction({ id, data: { status: 'published' } }));
        return response.data.article;
      } else {
        throw new Error(response.message || 'Lỗi khi xuất bản bài viết');
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Lỗi kết nối khi xuất bản bài viết';
      throw new Error(message);
    }
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearArticlesError());
  }, [dispatch]);

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

// Article search hook - replaces useArticleSearch
export const useArticleSearchRedux = () => {
  const dispatch = useAppDispatch();
  
  const results = useAppSelector(selectArticlesSearchResults);
  const loading = useAppSelector(selectArticlesSearchLoading);
  const keyword = useAppSelector(selectArticlesSearchKeyword);

  const search = useCallback(async (query: string, filters: Partial<ArticleSearchParams> = {}) => {
    if (!query.trim()) {
      dispatch(clearSearchResults());
      return;
    }

    dispatch(setSearchKeyword(query));
    try {
      const response = await articlesApi.searchArticles(query, filters);
      if (response.status === 'success') {
        // Manually update search results since we're calling API directly
        dispatch(searchArticles(query));
      }
    } catch (error) {
      // Handle error if needed
      console.error('Search error:', error);
    }
  }, [dispatch]);

  const clearSearch = useCallback(() => {
    dispatch(clearSearchResults());
  }, [dispatch]);

  return {
    results,
    loading,
    keyword,
    search,
    clearSearch,
  };
};

// Utility hook to clear errors
export const useArticlesErrorRedux = () => {
  const dispatch = useAppDispatch();

  const clearArticlesErrorCallback = useCallback(() => {
    dispatch(clearArticlesError());
  }, [dispatch]);

  return { clearArticlesError: clearArticlesErrorCallback };
};
