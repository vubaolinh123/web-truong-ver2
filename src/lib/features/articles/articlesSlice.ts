/**
 * Articles Redux Slice
 * Manages articles state with Redux Toolkit
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticleFormData, ArticleStatistics, ArticleSearchParams, ArticlePagination } from '@/types/articles';
import { articlesApi } from '@/lib/api/articles';
import { handleReduxError } from '@/lib/utils/errorHandler';

// Articles state interface
interface ArticlesState {
  // Articles list
  articles: Article[];
  loading: boolean;
  error: string | null;
  
  // Pagination
  pagination: ArticlePagination;
  
  // Search and filters
  params: ArticleSearchParams;
  
  // Statistics
  statistics: ArticleStatistics | null;
  statisticsLoading: boolean;
  statisticsError: string | null;
  
  // Search results
  searchResults: Article[];
  searchLoading: boolean;
  searchKeyword: string;
  
  // Single article
  currentArticle: Article | null;
  currentArticleLoading: boolean;
  currentArticleError: string | null;

  // Related articles
  relatedArticles: Article[];
  relatedArticlesLoading: boolean;
  relatedArticlesError: string | null;

  // Mutations
  mutationLoading: boolean;
  mutationError: string | null;
}

// Initial state
const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalArticles: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  },
  params: {
    page: 1,
    limit: 10,
    status: 'all',
    categoryId: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    keyword: '',
  },
  statistics: null,
  statisticsLoading: false,
  statisticsError: null,
  searchResults: [],
  searchLoading: false,
  searchKeyword: '',
  currentArticle: null,
  currentArticleLoading: false,
  currentArticleError: null,
  relatedArticles: [],
  relatedArticlesLoading: false,
  relatedArticlesError: null,
  mutationLoading: false,
  mutationError: null,
};

// Async thunks
export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (params: ArticleSearchParams, { rejectWithValue }) => {
    try {
      const response = await articlesApi.getAdminArticles(params);
      
      if (response.status === 'success') {
        return {
          articles: response.data.articles,
          pagination: response.data.pagination,
        };
      } else {
        return rejectWithValue(response.message || 'Không thể tải danh sách bài viết');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể tải danh sách bài viết');
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchArticle = createAsyncThunk(
  'articles/fetchArticle',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await articlesApi.getArticle(id);

      if (response.status === 'success') {
        return response.data.article;
      } else {
        return rejectWithValue(response.message || 'Không thể tải bài viết');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể tải bài viết');
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchRelatedArticles = createAsyncThunk(
  'articles/fetchRelatedArticles',
  async (params: {
    categoryId: string;
    limit?: number;
    excludeId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }, { rejectWithValue }) => {
    try {
      const response = await articlesApi.getRelatedArticlesByCategory(params);

      if (response.status === 'success') {
        return response.data.articles;
      } else {
        return rejectWithValue(response.message || 'Không thể tải bài viết liên quan');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể tải bài viết liên quan');
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchArticleBySlug = createAsyncThunk(
  'articles/fetchArticleBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await articlesApi.getArticleBySlug(slug);

      if (response.status === 'success') {
        return response.data.article;
      } else {
        return rejectWithValue(response.message || 'Không thể tải bài viết');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể tải bài viết');
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchArticleStatistics = createAsyncThunk(
  'articles/fetchStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await articlesApi.getStatistics();
      
      if (response.status === 'success') {
        return response.data.statistics;
      } else {
        return rejectWithValue(response.message || 'Không thể tải thống kê bài viết');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể tải thống kê bài viết');
      return rejectWithValue(errorMessage);
    }
  }
);

export const searchArticles = createAsyncThunk(
  'articles/searchArticles',
  async (params: { keyword: string; filters?: Partial<ArticleSearchParams> }, { rejectWithValue }) => {
    try {
      const { keyword, filters = {} } = params;
      const response = await articlesApi.searchAdminArticles(keyword, filters);

      if (response.status === 'success') {
        return response.data.articles;
      } else {
        return rejectWithValue(response.message || 'Không thể tìm kiếm bài viết');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể tìm kiếm bài viết');
      return rejectWithValue(errorMessage);
    }
  }
);

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (data: ArticleFormData, { rejectWithValue }) => {
    try {
      const response = await articlesApi.createArticle(data);
      
      if (response.status === 'success') {
        return response.data.article;
      } else {
        return rejectWithValue(response.message || 'Không thể tạo bài viết');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể tạo bài viết');
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ id, data }: { id: string; data: Partial<ArticleFormData> }, { rejectWithValue }) => {
    try {
      const response = await articlesApi.updateArticle(id, data);
      
      if (response.status === 'success') {
        return response.data.article;
      } else {
        return rejectWithValue(response.message || 'Không thể cập nhật bài viết');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể cập nhật bài viết');
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await articlesApi.deleteArticle(id);
      
      if (response.status === 'success') {
        return id;
      } else {
        return rejectWithValue(response.message || 'Không thể xóa bài viết');
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Không thể xóa bài viết');
      return rejectWithValue(errorMessage);
    }
  }
);

// Articles slice
const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    updateParams: (state, action: PayloadAction<Partial<ArticleSearchParams>>) => {
      state.params = { ...state.params, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
      state.mutationError = null;
      state.currentArticleError = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchKeyword = '';
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    clearCurrentArticle: (state) => {
      state.currentArticle = null;
      state.currentArticleError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch articles
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch single article
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.currentArticleLoading = true;
        state.currentArticleError = null;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.currentArticleLoading = false;
        state.currentArticle = action.payload;
        state.currentArticleError = null;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.currentArticleLoading = false;
        state.currentArticleError = action.payload as string;
      });

    // Fetch article by slug
    builder
      .addCase(fetchArticleBySlug.pending, (state) => {
        state.currentArticleLoading = true;
        state.currentArticleError = null;
      })
      .addCase(fetchArticleBySlug.fulfilled, (state, action) => {
        state.currentArticleLoading = false;
        state.currentArticle = action.payload;
        state.currentArticleError = null;
      })
      .addCase(fetchArticleBySlug.rejected, (state, action) => {
        state.currentArticleLoading = false;
        state.currentArticleError = action.payload as string;
      });

    // Fetch related articles
    builder
      .addCase(fetchRelatedArticles.pending, (state) => {
        state.relatedArticlesLoading = true;
        state.relatedArticlesError = null;
      })
      .addCase(fetchRelatedArticles.fulfilled, (state, action) => {
        state.relatedArticlesLoading = false;
        state.relatedArticles = action.payload;
        state.relatedArticlesError = null;
      })
      .addCase(fetchRelatedArticles.rejected, (state, action) => {
        state.relatedArticlesLoading = false;
        state.relatedArticlesError = action.payload as string;
      });

    // Fetch statistics
    builder
      .addCase(fetchArticleStatistics.pending, (state) => {
        state.statisticsLoading = true;
        state.statisticsError = null;
      })
      .addCase(fetchArticleStatistics.fulfilled, (state, action) => {
        state.statisticsLoading = false;
        state.statistics = action.payload;
        state.statisticsError = null;
      })
      .addCase(fetchArticleStatistics.rejected, (state, action) => {
        state.statisticsLoading = false;
        state.statisticsError = action.payload as string;
      });

    // Search articles
    builder
      .addCase(searchArticles.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchArticles.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload as string;
      });

    // Create article
    builder
      .addCase(createArticle.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.articles.unshift(action.payload);
        state.mutationError = null;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload as string;
      });

    // Update article
    builder
      .addCase(updateArticle.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.mutationLoading = false;
        const index = state.articles.findIndex(article => article.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
        if (state.currentArticle && state.currentArticle.id === action.payload.id) {
          state.currentArticle = action.payload;
        }
        state.mutationError = null;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload as string;
      });

    // Delete article
    builder
      .addCase(deleteArticle.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.articles = state.articles.filter(article => article.id !== action.payload);
        if (state.currentArticle && state.currentArticle.id === action.payload) {
          state.currentArticle = null;
        }
        state.mutationError = null;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload as string;
      });
  },
});

// Export actions
export const { updateParams, clearError, clearSearchResults, setSearchKeyword, clearCurrentArticle } = articlesSlice.actions;

// Export selectors
export const selectArticles = (state: { articles: ArticlesState }) => state.articles.articles;
export const selectArticlesLoading = (state: { articles: ArticlesState }) => state.articles.loading;
export const selectArticlesError = (state: { articles: ArticlesState }) => state.articles.error;
export const selectArticlesPagination = (state: { articles: ArticlesState }) => state.articles.pagination;
export const selectArticlesParams = (state: { articles: ArticlesState }) => state.articles.params;
export const selectArticlesStatistics = (state: { articles: ArticlesState }) => state.articles.statistics;
export const selectArticlesStatisticsLoading = (state: { articles: ArticlesState }) => state.articles.statisticsLoading;
export const selectArticlesSearchResults = (state: { articles: ArticlesState }) => state.articles.searchResults;
export const selectArticlesSearchLoading = (state: { articles: ArticlesState }) => state.articles.searchLoading;
export const selectArticlesSearchKeyword = (state: { articles: ArticlesState }) => state.articles.searchKeyword;
export const selectCurrentArticle = (state: { articles: ArticlesState }) => state.articles.currentArticle;
export const selectCurrentArticleLoading = (state: { articles: ArticlesState }) => state.articles.currentArticleLoading;
export const selectCurrentArticleError = (state: { articles: ArticlesState }) => state.articles.currentArticleError;
export const selectRelatedArticles = (state: { articles: ArticlesState }) => state.articles.relatedArticles;
export const selectRelatedArticlesLoading = (state: { articles: ArticlesState }) => state.articles.relatedArticlesLoading;
export const selectRelatedArticlesError = (state: { articles: ArticlesState }) => state.articles.relatedArticlesError;
export const selectArticlesMutationLoading = (state: { articles: ArticlesState }) => state.articles.mutationLoading;
export const selectArticlesMutationError = (state: { articles: ArticlesState }) => state.articles.mutationError;

// Export reducer
export default articlesSlice.reducer;
