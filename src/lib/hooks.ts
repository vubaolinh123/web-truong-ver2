/**
 * Redux Typed Hooks
 * Pre-typed versions of React-Redux hooks for better TypeScript support
 */

import { useDispatch, useSelector, useStore } from 'react-redux';
import type { RootState, AppDispatch, AppStore } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

// Additional utility hooks for common patterns
export const useCategories = () => useAppSelector((state) => state.categories);
export const useArticles = () => useAppSelector((state) => state.articles);

// Redux-based auth hook implementation
import { useCallback } from 'react';
import {
  loginUser,
  logoutUser,
  refreshToken as refreshTokenAction,
  checkAuthStatus,
  clearError,
  updateUser as updateUserAction,
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError,
} from '@/lib/features/auth/authSlice';
import { LoginCredentials, User, ROLE_PERMISSIONS, Permission, Role } from '@/types/auth';

// Main authentication hook - replaces useAuth from AuthContext
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectAuthError);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    const result = await dispatch(loginUser(credentials));
    if (loginUser.rejected.match(result)) {
      throw new Error(result.payload as string);
    }
  }, [dispatch]);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    await dispatch(logoutUser());
  }, [dispatch]);

  // Refresh token function
  const refreshToken = useCallback(async (): Promise<boolean> => {
    const result = await dispatch(refreshTokenAction());
    return refreshTokenAction.fulfilled.match(result);
  }, [dispatch]);

  // Clear error function
  const clearAuthError = useCallback((): void => {
    dispatch(clearError());
  }, [dispatch]);

  // Check if user has specific role
  const hasRole = useCallback((role: string | string[]): boolean => {
    if (!user) return false;

    const userRole = user.role;

    if (Array.isArray(role)) {
      return role.includes(userRole);
    }

    return userRole === role;
  }, [user]);

  // Check if user has specific permission
  const hasPermission = useCallback((permission: Permission): boolean => {
    if (!user) return false;

    const userRole = user.role as Role;
    const rolePermissions = ROLE_PERMISSIONS[userRole] || [];

    return rolePermissions.includes(permission as any);
  }, [user]);

  // Update user function
  const updateUser = useCallback((userData: Partial<User>): void => {
    dispatch(updateUserAction(userData));
  }, [dispatch]);

  // Check auth status function
  const checkAuth = useCallback((): void => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return {
    // State
    user,
    tokens: auth.tokens,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    logout,
    refreshToken,
    clearError: clearAuthError,
    hasRole,
    hasPermission,
    updateUser,
    checkAuth,
  };
};
