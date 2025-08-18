/**
 * Authentication Context
 * Quản lý authentication state toàn ứng dụng
 */

'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { 
  AuthState, 
  AuthContextType, 
  LoginCredentials, 
  User,
  ROLE_PERMISSIONS,
  Permission,
  Role
} from '@/types/auth';
import { 
  authApi, 
  getStoredUser, 
  getStoredToken, 
  getStoredRefreshToken,
  isTokenExpired,
  clearAuthData,
  AuthError
} from '@/lib/api/auth';

// Auth actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User } }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial state
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true for initial auth check
  error: null,
};

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: {
          accessToken: getStoredToken() || '',
          refreshToken: getStoredRefreshToken() || '',
          expiresIn: 0,
          tokenType: 'Bearer',
        },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider component
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Auto-refresh token interval
  const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

  // Refresh token function (defined before useEffect to avoid circular dependency)
  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const response = await authApi.refreshToken();

      if (response.status === 'success') {
        const storedUser = getStoredUser();
        if (storedUser) {
          dispatch({ type: 'AUTH_SUCCESS', payload: { user: storedUser } });
          return true;
        }
      }

      throw new AuthError('Token refresh failed', 'REFRESH_ERROR');
    } catch (error) {
      clearAuthData();
      dispatch({ type: 'AUTH_LOGOUT' });
      return false;
    }
  }, []);

  // Check initial authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log('🔍 Checking auth status...');
      const storedUser = getStoredUser();
      const storedToken = getStoredToken();

      console.log('📦 Stored user:', storedUser);
      console.log('🔑 Stored token:', storedToken ? 'Present' : 'Missing');

      if (!storedUser || !storedToken) {
        console.log('❌ No stored auth data, setting loading false');
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      // Check if token is expired
      if (isTokenExpired(storedToken)) {
        console.log('⏰ Token expired, trying to refresh...');
        try {
          const refreshSuccess = await refreshToken();
          if (!refreshSuccess) {
            console.log('❌ Token refresh failed');
            clearAuthData();
            dispatch({ type: 'AUTH_LOGOUT' });
          }
        } catch (error) {
          console.log('❌ Token refresh error:', error);
          clearAuthData();
          dispatch({ type: 'AUTH_LOGOUT' });
        }
        return;
      }

      // Token is valid, set user as authenticated
      console.log('✅ Token valid, setting user as authenticated');
      dispatch({ type: 'AUTH_SUCCESS', payload: { user: storedUser } });
    };

    checkAuthStatus();
  }, [refreshToken]);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    console.log('🚀 Starting login process...');
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await authApi.login(credentials);
      console.log('📡 Login API response:', response);

      if (response.status === 'success') {
        console.log('✅ Login successful, dispatching AUTH_SUCCESS');
        dispatch({ type: 'AUTH_SUCCESS', payload: { user: response.data.user } });
      } else {
        throw new AuthError(response.message, 'LOGIN_ERROR');
      }
    } catch (error) {
      console.log('❌ Login error:', error);
      const errorMessage = error instanceof AuthError
        ? error.message
        : 'Đăng nhập thất bại. Vui lòng thử lại.';

      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    console.log('🚪 Logging out...');
    try {
      await authApi.logout();
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  }, []);

  // Auto-refresh token
  useEffect(() => {
    if (!state.isAuthenticated) return;

    const interval = setInterval(async () => {
      const token = getStoredToken();
      if (token && isTokenExpired(token)) {
        try {
          await refreshToken();
        } catch (error) {
          // Auto-refresh failed, logout user
          logout();
        }
      }
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [state.isAuthenticated, refreshToken, logout]);

  // Clear error function
  const clearError = useCallback((): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // Check if user has specific role
  const hasRole = useCallback((role: string | string[]): boolean => {
    if (!state.user) return false;
    
    const userRole = state.user.role;
    
    if (Array.isArray(role)) {
      return role.includes(userRole);
    }
    
    return userRole === role;
  }, [state.user]);

  // Check if user has specific permission
  const hasPermission = useCallback((permission: Permission): boolean => {
    if (!state.user) return false;
    
    const userRole = state.user.role as Role;
    const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
    
    return rolePermissions.includes(permission as any);
  }, [state.user]);

  // Update user function
  const updateUser = useCallback((userData: Partial<User>): void => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  }, []);

  // Context value
  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    refreshToken,
    clearError,
    hasRole,
    hasPermission,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// HOC for components that require authentication
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  requiredRoles?: string[]
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const { isAuthenticated, hasRole, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Unauthorized Access
            </h2>
            <p className="text-gray-600">Please login to access this page.</p>
          </div>
        </div>
      );
    }

    if (requiredRoles && !hasRole(requiredRoles)) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Insufficient Permissions
            </h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  
  return AuthenticatedComponent;
};

export default AuthContext;
