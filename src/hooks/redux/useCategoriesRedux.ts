/**
 * Redux-based Categories Hooks
 * Replacement for the original useCategories hooks using Redux state management
 */

import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  fetchCategories,
  fetchCategoryStatistics,
  searchCategories,
  createCategory as createCategoryAction,
  updateCategory as updateCategoryAction,
  deleteCategory as deleteCategoryAction,
  updateParams,
  clearError,
  clearSearchResults,
  setSearchKeyword,
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
  selectCategoriesPagination,
  selectCategoriesParams,
  selectCategoriesStatistics,
  selectCategoriesStatisticsLoading,
  selectCategoriesSearchResults,
  selectCategoriesSearchLoading,
  selectCategoriesSearchKeyword,
  selectCategoriesMutationLoading,
} from '@/lib/features/categories/categoriesSlice';
import { CreateCategoryData } from '@/lib/api/categories';

// Main categories hook - replaces useCategories
export const useCategoriesRedux = () => {
  const dispatch = useAppDispatch();
  
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectCategoriesLoading);
  const error = useAppSelector(selectCategoriesError);
  const pagination = useAppSelector(selectCategoriesPagination);
  const params = useAppSelector(selectCategoriesParams);

  // Load categories when params change
  useEffect(() => {
    dispatch(fetchCategories(params));
  }, [dispatch, params]);

  const updateParamsCallback = useCallback((newParams: Partial<typeof params>) => {
    dispatch(updateParams(newParams));
  }, [dispatch]);

  const refresh = useCallback(() => {
    dispatch(fetchCategories(params));
  }, [dispatch, params]);

  return {
    categories,
    loading,
    error,
    pagination,
    params,
    updateParams: updateParamsCallback,
    refresh,
  };
};

// Category statistics hook - replaces useCategoryStatistics
export const useCategoryStatisticsRedux = () => {
  const dispatch = useAppDispatch();
  
  const statistics = useAppSelector(selectCategoriesStatistics);
  const loading = useAppSelector(selectCategoriesStatisticsLoading);
  const error = useAppSelector((state) => state.categories.statisticsError);

  useEffect(() => {
    dispatch(fetchCategoryStatistics());
  }, [dispatch]);

  const refresh = useCallback(() => {
    dispatch(fetchCategoryStatistics());
  }, [dispatch]);

  return {
    statistics,
    loading,
    error,
    refresh,
  };
};

// Category mutations hook - replaces useCategoryMutations
export const useCategoryMutationsRedux = () => {
  const dispatch = useAppDispatch();
  
  const loading = useAppSelector(selectCategoriesMutationLoading);
  const error = useAppSelector((state) => state.categories.mutationError);

  const createCategory = useCallback(async (data: CreateCategoryData) => {
    const result = await dispatch(createCategoryAction(data));
    if (createCategoryAction.rejected.match(result)) {
      throw new Error(result.payload as string);
    }
    return result.payload;
  }, [dispatch]);

  const updateCategory = useCallback(async (id: string, data: Partial<CreateCategoryData>) => {
    const result = await dispatch(updateCategoryAction({ id, data }));
    if (updateCategoryAction.rejected.match(result)) {
      throw new Error(result.payload as string);
    }
    return result.payload;
  }, [dispatch]);

  const deleteCategory = useCallback(async (id: string) => {
    const result = await dispatch(deleteCategoryAction(id));
    if (deleteCategoryAction.rejected.match(result)) {
      throw new Error(result.payload as string);
    }
    return result.payload;
  }, [dispatch]);

  return {
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};

// Category search hook - replaces useCategorySearch
export const useCategorySearchRedux = () => {
  const dispatch = useAppDispatch();
  
  const results = useAppSelector(selectCategoriesSearchResults);
  const loading = useAppSelector(selectCategoriesSearchLoading);
  const keyword = useAppSelector(selectCategoriesSearchKeyword);

  const search = useCallback((searchKeyword: string) => {
    dispatch(setSearchKeyword(searchKeyword));
    dispatch(searchCategories(searchKeyword));
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
export const useCategoriesErrorRedux = () => {
  const dispatch = useAppDispatch();
  
  const clearCategoriesError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return { clearCategoriesError };
};
