/**
 * Categories API Service
 * Quản lý tất cả API calls liên quan đến categories
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status: 'active' | 'inactive';
  color?: string;
  icon?: string;
  articleCount: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
  updatedBy?: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  status?: 'active' | 'inactive';
  color?: string;
  icon?: string;
  sortOrder?: number;
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {
  id: string;
}

export interface CategoryListResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    categories: Category[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalCategories: number;
      limit: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface CategoryResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    category: Category;
  };
}

export interface CategoryStatistics {
  total: number;
  active: number;
  inactive: number;
  totalArticles: number;
  averageArticlesPerCategory: number;
  categoriesWithMostArticles: Array<{
    id: string;
    name: string;
    articleCount: number;
  }>;
}

export interface CategoryStatisticsResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    statistics: CategoryStatistics;
  };
}

export interface SearchCategoriesResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    categories: Category[];
    resultCount: number;
    keyword: string;
  };
}

// API Error Class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
};

// Helper function to make authenticated requests
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
      throw new ApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      0
    );
  }
};

// Categories API Functions
export const categoriesApi = {
  /**
   * Lấy danh sách categories với pagination
   */
  getCategories: async (params: {
    page?: number;
    limit?: number;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<CategoryListResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.status) searchParams.append('status', params.status);
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

    const queryString = searchParams.toString();
    const endpoint = `/categories${queryString ? `?${queryString}` : ''}`;
    
    return makeRequest(endpoint);
  },

  /**
   * Lấy thông tin chi tiết một category
   */
  getCategory: async (id: string): Promise<CategoryResponse> => {
    return makeRequest(`/categories/${id}`);
  },

  /**
   * Tạo category mới
   */
  createCategory: async (data: CreateCategoryData): Promise<CategoryResponse> => {
    return makeRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Cập nhật category
   */
  updateCategory: async (id: string, data: Partial<CreateCategoryData>): Promise<CategoryResponse> => {
    return makeRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Xóa category
   */
  deleteCategory: async (id: string): Promise<{ status: string; message: string }> => {
    return makeRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  },

  /**
   * Lấy thống kê categories
   */
  getStatistics: async (): Promise<CategoryStatisticsResponse> => {
    return makeRequest('/categories/admin/statistics');
  },

  /**
   * Tìm kiếm categories
   */
  searchCategories: async (params: {
    keyword: string;
    status?: string;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<SearchCategoriesResponse> => {
    const searchParams = new URLSearchParams();
    
    searchParams.append('keyword', params.keyword);
    if (params.status) searchParams.append('status', params.status);
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

    const queryString = searchParams.toString();
    return makeRequest(`/categories/admin/search?${queryString}`);
  },

  /**
   * Lấy categories phổ biến
   */
  getPopularCategories: async (limit: number = 5): Promise<SearchCategoriesResponse> => {
    return makeRequest(`/categories/admin/popular?limit=${limit}`);
  },

  /**
   * Lấy categories theo thứ tự hiển thị
   */
  getOrderedCategories: async (): Promise<SearchCategoriesResponse> => {
    return makeRequest('/categories/admin/ordered');
  },
};

// Export default
export default categoriesApi;
