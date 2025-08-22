/**
 * Users API Service
 * Manages all API calls related to users
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'author' | 'user';
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
  updatedAt: string;
}

export interface UserListResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    users: User[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalUsers: number;
      limit: number;
    };
  };
}

// Import error handling utilities
import {
  ApiError,
  handleNetworkError,
  isApiError,
  type ApiResponse
} from '@/lib/utils/errorHandler';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken');
};

// Helper function to make authenticated requests
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
      throw new ApiError(
        data.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        data.code || 'HTTP_ERROR',
        data
      );
    }

    if (isApiError(data)) {
      throw new ApiError(
        data.message || 'User operation failed',
        response.status,
        'API_ERROR',
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    const networkErrorMessage = handleNetworkError(error);
    throw new ApiError(
      networkErrorMessage,
      0,
      'NETWORK_ERROR'
    );
  }
};

// Users API Functions
export const usersApi = {
  /**
   * Get a list of users with pagination and filtering
   */
  getUsers: async (params: {
    page?: number;
    limit?: number;
    role?: string;
    status?: string;
  } = {}): Promise<UserListResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.role) searchParams.append('role', params.role);
    if (params.status) searchParams.append('status', params.status);

    const queryString = searchParams.toString();
    const endpoint = `/users/admin${queryString ? `?${queryString}` : ''}`;
    
    return makeRequest(endpoint);
  },
};

export default usersApi;

