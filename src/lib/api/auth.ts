/**
 * Authentication API Service
 * Quản lý tất cả API calls liên quan đến authentication
 */

import { 
  LoginCredentials, 
  LoginResponse, 
  RefreshTokenResponse, 
  User,
  AuthTokens,
  AUTH_STORAGE_KEYS 
} from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

// Custom error class for authentication
export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 0,
    public details?: any
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

// Helper function to make API requests
const makeRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new AuthError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        errorData.code || 'NETWORK_ERROR',
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    
    // Network or other errors
    throw new AuthError(
      error instanceof Error ? error.message : 'Network error occurred',
      'NETWORK_ERROR',
      0
    );
  }
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getStoredToken();
  
  return makeRequest(endpoint, {
    ...options,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
};

// Storage helpers
export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
};

export const getStoredRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
};

export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const userStr = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

export const storeAuthData = (user: User, tokens: AuthTokens, rememberMe: boolean = false): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
  localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
  localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user));
  localStorage.setItem(AUTH_STORAGE_KEYS.REMEMBER_ME, rememberMe.toString());
};

export const clearAuthData = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
  localStorage.removeItem(AUTH_STORAGE_KEYS.REMEMBER_ME);
};

export const isRememberMeEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_STORAGE_KEYS.REMEMBER_ME) === 'true';
};

// JWT Token validation
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    return true;
  }
};

export const getTokenPayload = (token: string): any => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

// Authentication API functions
export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      console.log('🔐 Making login request with credentials:', {
        identifier: credentials.identifier,
        rememberMe: credentials.rememberMe
      });

      const response = await makeRequest('/users/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      console.log('📡 Raw login response:', response);

      if (response.status === 'success') {
        // Normalize tokens format for frontend
        const normalizedTokens: AuthTokens = {
          accessToken: response.data.tokens.accessToken,
          refreshToken: response.data.tokens.refreshToken,
          expiresIn: 3600, // Default 1 hour
          tokenType: 'Bearer'
        };

        console.log('💾 Storing auth data...');
        console.log('👤 User:', response.data.user);
        console.log('🔑 Tokens:', normalizedTokens);

        // Store auth data
        storeAuthData(
          response.data.user,
          normalizedTokens,
          credentials.rememberMe || false
        );

        // Verify storage
        const storedUser = getStoredUser();
        const storedToken = getStoredToken();
        console.log('✅ Verification - Stored user:', storedUser);
        console.log('✅ Verification - Stored token:', storedToken ? 'Present' : 'Missing');

        // Return normalized response
        return {
          ...response,
          data: {
            user: response.data.user,
            tokens: normalizedTokens
          }
        };
      }

      return response;
    } catch (error) {
      console.log('❌ Login API error:', error);
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError('Login failed', 'LOGIN_ERROR');
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      // Call logout endpoint if available
      await makeAuthenticatedRequest('/users/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      // Always clear local storage
      clearAuthData();
    }
  },

  /**
   * Refresh access token
   */
  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const refreshToken = getStoredRefreshToken();
    
    if (!refreshToken) {
      throw new AuthError('No refresh token available', 'NO_REFRESH_TOKEN');
    }

    try {
      const response = await makeRequest('/users/auth/refresh-token', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });

      if (response.status === 'success') {
        // Update stored tokens
        const user = getStoredUser();
        const rememberMe = isRememberMeEnabled();
        
        if (user) {
          storeAuthData(user, response.data.tokens, rememberMe);
        }
      }

      return response;
    } catch (error) {
      // Clear auth data if refresh fails
      clearAuthData();
      
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError('Token refresh failed', 'REFRESH_ERROR');
    }
  },

  /**
   * Verify current token
   */
  verifyToken: async (): Promise<{ valid: boolean; user?: User }> => {
    try {
      const response = await makeAuthenticatedRequest('/users/auth/verify');
      
      if (response.status === 'success') {
        return { valid: true, user: response.data.user };
      }
      
      return { valid: false };
    } catch (error) {
      return { valid: false };
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    try {
      const response = await makeAuthenticatedRequest('/users/profile');
      
      if (response.status === 'success') {
        // Update stored user data
        const tokens = {
          accessToken: getStoredToken()!,
          refreshToken: getStoredRefreshToken()!,
          expiresIn: 0,
          tokenType: 'Bearer' as const,
        };
        const rememberMe = isRememberMeEnabled();
        
        storeAuthData(response.data.user, tokens, rememberMe);
        
        return response.data.user;
      }
      
      throw new AuthError('Failed to get profile', 'PROFILE_ERROR');
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError('Failed to get profile', 'PROFILE_ERROR');
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    try {
      const response = await makeAuthenticatedRequest('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      
      if (response.status === 'success') {
        // Update stored user data
        const tokens = {
          accessToken: getStoredToken()!,
          refreshToken: getStoredRefreshToken()!,
          expiresIn: 0,
          tokenType: 'Bearer' as const,
        };
        const rememberMe = isRememberMeEnabled();
        
        storeAuthData(response.data.user, tokens, rememberMe);
        
        return response.data.user;
      }
      
      throw new AuthError('Failed to update profile', 'UPDATE_PROFILE_ERROR');
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError('Failed to update profile', 'UPDATE_PROFILE_ERROR');
    }
  },

  /**
   * Change password
   */
  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> => {
    try {
      const response = await makeAuthenticatedRequest('/users/auth/change-password', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      if (response.status !== 'success') {
        throw new AuthError(response.message || 'Failed to change password', 'CHANGE_PASSWORD_ERROR');
      }
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }
      throw new AuthError('Failed to change password', 'CHANGE_PASSWORD_ERROR');
    }
  },
};

export default authApi;
