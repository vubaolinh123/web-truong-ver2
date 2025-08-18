/**
 * Authentication Types and Interfaces
 * Định nghĩa types cho authentication system
 */

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'faculty' | 'student';
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  phone?: string;
  emailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

export interface LoginCredentials {
  identifier: string; // username or email
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

export interface RefreshTokenResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    tokens: AuthTokens;
  };
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  clearError: () => void;
  hasRole: (role: string | string[]) => boolean;
  hasPermission: (permission: Permission) => boolean;
  updateUser: (user: Partial<User>) => void;
}

export interface AuthError {
  code: string;
  message: string;
  details?: any;
}

// JWT Payload interface
export interface JWTPayload {
  sub: string; // user id
  username: string;
  email: string;
  role: string;
  iat: number; // issued at
  exp: number; // expires at
  jti: string; // JWT ID
}

// Storage keys
export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: 'adminToken',
  REFRESH_TOKEN: 'adminRefreshToken',
  USER: 'adminUser',
  REMEMBER_ME: 'adminRememberMe',
} as const;

// Role permissions mapping
export const ROLE_PERMISSIONS = {
  admin: [
    'users.read',
    'users.write',
    'users.delete',
    'categories.read',
    'categories.write',
    'categories.delete',
    'articles.read',
    'articles.write',
    'articles.delete',
    'analytics.read',
    'settings.read',
    'settings.write',
  ],
  faculty: [
    'categories.read',
    'categories.write',
    'articles.read',
    'articles.write',
    'analytics.read',
  ],
  student: [
    'articles.read',
  ],
} as const;

export type Permission = typeof ROLE_PERMISSIONS[keyof typeof ROLE_PERMISSIONS][number];
export type Role = keyof typeof ROLE_PERMISSIONS;
