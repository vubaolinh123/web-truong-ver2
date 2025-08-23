/**
 * Articles API Service
 * Quản lý tất cả API calls liên quan đến articles
 */

import {
  Article,
  ArticleFormData,
  ArticlesResponse,
  ArticleResponse,
  ArticleStatistics,
  ArticleStatisticsResponse,
  ArticleSearchResponse,
  ArticleSearchParams,
  BulkArticleOperation,
  BulkOperationResponse,
  DEFAULT_ARTICLE_PARAMS
} from '@/types/articles';
import {
  ArticleApiError,
  handleApiError,
  handleNetworkError,
  isApiError,
  type ApiResponse
} from '@/lib/utils/errorHandler';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
};

// Helper function to make API requests
const makeRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse> => {
  const token = getAuthToken();

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Server trả về lỗi với cấu trúc API chuẩn
      throw new ArticleApiError(
        data.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        data.code || 'HTTP_ERROR',
        data
      );
    }

    // Kiểm tra nếu API trả về status: 'error' trong response body
    if (isApiError(data)) {
      throw new ArticleApiError(
        data.message || 'Article operation failed',
        response.status,
        'API_ERROR',
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ArticleApiError) {
      throw error;
    }

    // Network or other errors
    const networkErrorMessage = handleNetworkError(error);
    throw new ArticleApiError(
      networkErrorMessage,
      0,
      'NETWORK_ERROR'
    );
  }
};

// Articles API functions
export const articlesApi = {
  /**
   * Get articles with pagination and filters (public access)
   */
  getArticles: async (params: Partial<ArticleSearchParams> = {}): Promise<ArticlesResponse> => {
    const searchParams = { ...DEFAULT_ARTICLE_PARAMS, ...params };

    const queryParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    return makeRequest(`/articles/public?${queryParams.toString()}`);
  },

  /**
   * Get articles with pagination and filters (admin access)
   */
  getAdminArticles: async (params: Partial<ArticleSearchParams> = {}): Promise<ArticlesResponse> => {
    const searchParams = { ...DEFAULT_ARTICLE_PARAMS, ...params };

    const queryParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    return makeRequest(`/articles/admin?${queryParams.toString()}`);
  },

  /**
   * Get single article by ID (public access)
   */
  getArticle: async (id: string): Promise<ArticleResponse> => {
    return makeRequest(`/articles/public/${id}`);
  },

  /**
   * Get single article by slug (public access)
   */
  getArticleBySlug: async (slug: string): Promise<ArticleResponse> => {
    return makeRequest(`/articles/public/slug/${slug}`);
  },

  /**
   * Get related articles by category ID (public access)
   */
  getRelatedArticlesByCategory: async (params: {
    categoryId: string;
    limit?: number;
    excludeId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ArticlesResponse> => {
    const { categoryId, limit = 6, excludeId, sortBy = 'publishedAt', sortOrder = 'desc' } = params;

    const queryParams = new URLSearchParams();
    queryParams.append('limit', limit.toString());
    queryParams.append('sortBy', sortBy);
    queryParams.append('sortOrder', sortOrder);

    if (excludeId) {
      queryParams.append('excludeId', excludeId);
    }

    return makeRequest(`/articles/public/related/${categoryId}?${queryParams.toString()}`);
  },

  /**
   * Create new article
   */
  createArticle: async (data: ArticleFormData): Promise<ArticleResponse> => {
    // Map frontend field names to backend expected field names
    const apiData = {
      ...data,
      categories: data.categoryIds, // Backend expects 'categories' field
      categoryIds: undefined // Remove the frontend field
    };

    // Debug: Log the API data being sent
    console.log('🚀 Sending article data to API:', {
      title: apiData.title,
      categories: apiData.categories,
      categoryCount: apiData.categories?.length || 0
    });

    return makeRequest('/articles', {
      method: 'POST',
      body: JSON.stringify(apiData),
    });
  },

  /**
   * Update existing article
   */
  updateArticle: async (id: string, data: Partial<ArticleFormData>): Promise<ArticleResponse> => {
    // Map frontend field names to backend expected field names
    const apiData = {
      ...data,
      categories: data.categoryIds, // Backend expects 'categories' field
      categoryIds: undefined // Remove the frontend field
    };

    return makeRequest(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(apiData),
    });
  },

  /**
   * Delete article
   */
  deleteArticle: async (id: string): Promise<{ status: string; message: string }> => {
    return makeRequest(`/articles/${id}`, {
      method: 'DELETE',
    });
  },

  /**
   * Get article statistics
   */
  getStatistics: async (): Promise<ArticleStatisticsResponse> => {
    return makeRequest('/articles/admin/statistics');
  },

  /**
   * Search articles (public access)
   */
  searchArticles: async (
    query: string,
    filters: Partial<ArticleSearchParams> = {}
  ): Promise<ArticleSearchResponse> => {
    const searchParams = new URLSearchParams();
    searchParams.append('keyword', query);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    return makeRequest(`/articles/public/search?${searchParams.toString()}`);
  },

  /**
   * Search articles (admin access)
   */
  searchAdminArticles: async (
    query: string,
    filters: Partial<ArticleSearchParams> = {}
  ): Promise<ArticleSearchResponse> => {
    const searchParams = new URLSearchParams();
    searchParams.append('keyword', query);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    return makeRequest(`/articles/admin/search?${searchParams.toString()}`);
  },

  /**
   * Bulk operations on articles
   */
  bulkOperation: async (operation: BulkArticleOperation): Promise<BulkOperationResponse> => {
    return makeRequest('/articles/bulk', {
      method: 'POST',
      body: JSON.stringify(operation),
    });
  },

  /**
   * Publish article
   */
  publishArticle: async (id: string): Promise<ArticleResponse> => {
    return makeRequest(`/articles/${id}/publish`, {
      method: 'POST',
    });
  },

  /**
   * Archive article
   */
  archiveArticle: async (id: string): Promise<ArticleResponse> => {
    return makeRequest(`/articles/${id}/archive`, {
      method: 'POST',
    });
  },

  /**
   * Feature/unfeature article
   */
  toggleFeature: async (id: string, featured: boolean): Promise<ArticleResponse> => {
    return makeRequest(`/articles/${id}/feature`, {
      method: 'POST',
      body: JSON.stringify({ featured }),
    });
  },

  /**
   * Get articles by category (public access)
   */
  getArticlesByCategory: async (categoryId: string, params: Partial<ArticleSearchParams> = {}): Promise<ArticlesResponse> => {
    const searchParams = { ...DEFAULT_ARTICLE_PARAMS, ...params };

    const queryParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    return makeRequest(`/articles/public?categoryId=${categoryId}&${queryParams.toString()}`);
  },

  /**
   * Get articles by author (public access)
   */
  getArticlesByAuthor: async (authorId: string, params: Partial<ArticleSearchParams> = {}): Promise<ArticlesResponse> => {
    const searchParams = { ...DEFAULT_ARTICLE_PARAMS, ...params };

    const queryParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    return makeRequest(`/articles/public?authorId=${authorId}&${queryParams.toString()}`);
  },

  /**
   * Upload article image
   */
  uploadImage: async (file: File): Promise<{ status: string; data: { url: string } }> => {
    const formData = new FormData();
    formData.append('image', file);

    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/images/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ArticleApiError(
        errorData.message || 'Upload failed',
        response.status,
        'UPLOAD_ERROR'
      );
    }

    return await response.json();
  },

  /**
   * Get article tags
   */
  getTags: async (): Promise<{ status: string; data: { tags: string[] } }> => {
    return makeRequest('/articles/tags');
  },

  /**
   * Get popular articles (public access)
   */
  getPopularArticles: async (limit: number = 10): Promise<ArticlesResponse> => {
    return makeRequest(`/articles/public/popular?limit=${limit}`);
  },

  /**
   * Get recent articles (public access)
   */
  getRecentArticles: async (limit: number = 10): Promise<ArticlesResponse> => {
    return makeRequest(`/articles/public?limit=${limit}&sortBy=publishedAt&sortOrder=desc`);
  },



  /**
   * Delete permanent image
   */
  deleteImage: async (imageUrl: string): Promise<ApiResponse> => {
    return makeRequest('/images/delete', {
      method: 'DELETE',
      body: JSON.stringify({ imageUrl }),
    });
  },


};

// Export the error class for use in other files
export { ArticleApiError };

export default articlesApi;
