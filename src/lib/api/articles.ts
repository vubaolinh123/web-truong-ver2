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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Custom error class for articles
export class ArticleApiError extends Error {
  constructor(
    message: string,
    public status: number = 0,
    public code: string = 'ARTICLE_ERROR',
    public details?: any
  ) {
    super(message);
    this.name = 'ArticleApiError';
  }
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
};

// Helper function to make API requests
const makeRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
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
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ArticleApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData.code || 'HTTP_ERROR',
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ArticleApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ArticleApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0,
      'NETWORK_ERROR'
    );
  }
};

// Articles API functions
export const articlesApi = {
  /**
   * Get articles with pagination and filters
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

    return makeRequest(`/articles?${queryParams.toString()}`);
  },

  /**
   * Get single article by ID
   */
  getArticle: async (id: string): Promise<ArticleResponse> => {
    return makeRequest(`/articles/${id}`);
  },

  /**
   * Create new article
   */
  createArticle: async (data: ArticleFormData): Promise<ArticleResponse> => {
    return makeRequest('/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update existing article
   */
  updateArticle: async (id: string, data: Partial<ArticleFormData>): Promise<ArticleResponse> => {
    return makeRequest(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
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
   * Search articles
   */
  searchArticles: async (
    query: string,
    filters: Partial<ArticleSearchParams> = {}
  ): Promise<ArticleSearchResponse> => {
    const searchParams = new URLSearchParams();
    searchParams.append('q', query);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    return makeRequest(`/articles/search?${searchParams.toString()}`);
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
   * Get articles by category
   */
  getArticlesByCategory: async (categoryId: string, params: Partial<ArticleSearchParams> = {}): Promise<ArticlesResponse> => {
    const searchParams = { ...DEFAULT_ARTICLE_PARAMS, ...params, categoryId };
    
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

    return makeRequest(`/articles/category/${categoryId}?${queryParams.toString()}`);
  },

  /**
   * Get articles by author
   */
  getArticlesByAuthor: async (authorId: string, params: Partial<ArticleSearchParams> = {}): Promise<ArticlesResponse> => {
    const searchParams = { ...DEFAULT_ARTICLE_PARAMS, ...params, authorId };
    
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

    return makeRequest(`/articles/author/${authorId}?${queryParams.toString()}`);
  },

  /**
   * Upload article image
   */
  uploadImage: async (file: File): Promise<{ status: string; data: { url: string } }> => {
    const formData = new FormData();
    formData.append('image', file);

    const token = getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}/articles/upload-image`, {
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
   * Get popular articles
   */
  getPopularArticles: async (limit: number = 10): Promise<ArticlesResponse> => {
    return makeRequest(`/articles/popular?limit=${limit}`);
  },

  /**
   * Get recent articles
   */
  getRecentArticles: async (limit: number = 10): Promise<ArticlesResponse> => {
    return makeRequest(`/articles/recent?limit=${limit}`);
  }
};

export default articlesApi;
