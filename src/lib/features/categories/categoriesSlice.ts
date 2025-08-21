/**
 * Categories Redux Slice
 * Manages categories state with Redux Toolkit
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Category, CategoryStatistics, CreateCategoryData, categoriesApi } from '@/lib/api/categories';
import { handleReduxError } from '@/lib/utils/errorHandler';

// Categories state interface
interface CategoriesState {
  // Categories list
  categories: Category[];
  loading: boolean;
  error: string | null;
  
  // Pagination
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  
  // Search and filters
  params: {
    page: number;
    limit: number;
    status: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    keyword?: string;
  };
  
  // Statistics
  statistics: CategoryStatistics | null;
  statisticsLoading: boolean;
  statisticsError: string | null;
  
  // Search results
  searchResults: Category[];
  searchLoading: boolean;
  searchKeyword: string;
  
  // Mutations
  mutationLoading: boolean;
  mutationError: string | null;
}

// Initial state
const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  params: {
    page: 1,
    limit: 10,
    status: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
  },
  statistics: null,
  statisticsLoading: false,
  statisticsError: null,
  searchResults: [],
  searchLoading: false,
  searchKeyword: '',
  mutationLoading: false,
  mutationError: null,
};

// Async thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (params: any, { rejectWithValue }) => {
    try {
      const apiParams = {
        page: params.page,
        limit: params.limit,
        ...(params.status !== 'all' && { status: params.status }),
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
      };

      const response = await categoriesApi.getCategories(apiParams);
      
      if (response.status === 'success') {
        return {
          categories: response.data.categories,
          pagination: {
            page: response.data.pagination.currentPage,
            limit: response.data.pagination.limit,
            total: response.data.pagination.totalCategories,
            totalPages: response.data.pagination.totalPages,
            hasNextPage: response.data.pagination.hasNextPage,
            hasPrevPage: response.data.pagination.hasPrevPage,
          },
        };
      } else {
        return rejectWithValue(response.message || 'Không thể tải danh sách danh mục');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể tải danh sách danh mục');
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchCategoryStatistics = createAsyncThunk(
  'categories/fetchStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoriesApi.getStatistics();
      
      if (response.status === 'success') {
        return response.data.statistics;
      } else {
        return rejectWithValue(response.message || 'Không thể tải thống kê danh mục');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể tải thống kê danh mục');
      return rejectWithValue(errorMessage);
    }
  }
);

export const searchCategories = createAsyncThunk(
  'categories/searchCategories',
  async (keyword: string, { rejectWithValue }) => {
    try {
      const response = await categoriesApi.searchCategories({ keyword });
      
      if (response.status === 'success') {
        return response.data.categories;
      } else {
        return rejectWithValue(response.message || 'Không thể tìm kiếm danh mục');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể tìm kiếm danh mục');
      return rejectWithValue(errorMessage);
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (data: CreateCategoryData, { rejectWithValue }) => {
    try {
      const response = await categoriesApi.createCategory(data);
      
      if (response.status === 'success') {
        return response.data.category;
      } else {
        return rejectWithValue(response.message || 'Không thể tạo danh mục');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể tạo danh mục');
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, data }: { id: string; data: Partial<CreateCategoryData> }, { rejectWithValue }) => {
    try {
      const response = await categoriesApi.updateCategory(id, data);
      
      if (response.status === 'success') {
        return response.data.category;
      } else {
        return rejectWithValue(response.message || 'Không thể cập nhật danh mục');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể cập nhật danh mục');
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await categoriesApi.deleteCategory(id);
      
      if (response.status === 'success') {
        return id;
      } else {
        return rejectWithValue(response.message || 'Không thể xóa danh mục');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể xóa danh mục');
      return rejectWithValue(errorMessage);
    }
  }
);

// Categories slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    updateParams: (state, action: PayloadAction<Partial<typeof initialState.params>>) => {
      state.params = { ...state.params, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
      state.mutationError = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchKeyword = '';
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch statistics
    builder
      .addCase(fetchCategoryStatistics.pending, (state) => {
        state.statisticsLoading = true;
        state.statisticsError = null;
      })
      .addCase(fetchCategoryStatistics.fulfilled, (state, action) => {
        state.statisticsLoading = false;
        state.statistics = action.payload;
        state.statisticsError = null;
      })
      .addCase(fetchCategoryStatistics.rejected, (state, action) => {
        state.statisticsLoading = false;
        state.statisticsError = action.payload as string;
      });

    // Search categories
    builder
      .addCase(searchCategories.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchCategories.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload as string;
      });

    // Create category
    builder
      .addCase(createCategory.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.categories.unshift(action.payload);
        state.mutationError = null;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload as string;
      });

    // Update category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.mutationLoading = false;
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.mutationError = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload as string;
      });

    // Delete category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
        state.mutationError = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload as string;
      });
  },
});

// Export actions
export const { updateParams, clearError, clearSearchResults, setSearchKeyword } = categoriesSlice.actions;

// Export selectors
export const selectCategories = (state: { categories: CategoriesState }) => state.categories.categories;
export const selectCategoriesLoading = (state: { categories: CategoriesState }) => state.categories.loading;
export const selectCategoriesError = (state: { categories: CategoriesState }) => state.categories.error;
export const selectCategoriesPagination = (state: { categories: CategoriesState }) => state.categories.pagination;
export const selectCategoriesParams = (state: { categories: CategoriesState }) => state.categories.params;
export const selectCategoriesStatistics = (state: { categories: CategoriesState }) => state.categories.statistics;
export const selectCategoriesStatisticsLoading = (state: { categories: CategoriesState }) => state.categories.statisticsLoading;
export const selectCategoriesSearchResults = (state: { categories: CategoriesState }) => state.categories.searchResults;
export const selectCategoriesSearchLoading = (state: { categories: CategoriesState }) => state.categories.searchLoading;
export const selectCategoriesSearchKeyword = (state: { categories: CategoriesState }) => state.categories.searchKeyword;
export const selectCategoriesMutationLoading = (state: { categories: CategoriesState }) => state.categories.mutationLoading;

// Export reducer
export default categoriesSlice.reducer;
