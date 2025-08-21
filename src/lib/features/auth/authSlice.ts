/**
 * Auth Redux Slice
 * Manages authentication state with Redux Toolkit
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginCredentials, AuthTokens } from '@/types/auth';
import { authApi, getStoredUser, getStoredToken, getStoredRefreshToken, clearAuthData } from '@/lib/api/auth';
import { handleReduxError } from '@/lib/utils/errorHandler';

// Auth state interface
interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Async thunks for auth operations
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      if (response.status === 'success') {
        return {
          user: response.data.user,
          tokens: {
            accessToken: getStoredToken() || '',
            refreshToken: getStoredRefreshToken() || '',
            expiresIn: 0,
            tokenType: 'Bearer' as const,
          },
        };
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Đăng nhập thất bại');
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      clearAuthData();
      return null;
    } catch (error: any) {
      // Even if logout API fails, clear local data
      clearAuthData();
      return null;
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.refreshToken();
      if (response.status === 'success') {
        const storedUser = getStoredUser();
        if (storedUser) {
          return {
            user: storedUser,
            tokens: {
              accessToken: getStoredToken() || '',
              refreshToken: getStoredRefreshToken() || '',
              expiresIn: 0,
              tokenType: 'Bearer' as const,
            },
          };
        }
      }
      return rejectWithValue('Token refresh failed');
    } catch (error: any) {
      const errorMessage = handleReduxError(error, 'Token refresh failed');
      return rejectWithValue(errorMessage);
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const storedUser = getStoredUser();
      const storedToken = getStoredToken();

      if (!storedUser || !storedToken) {
        return null;
      }

      // Try to refresh token if needed
      const refreshResult = await dispatch(refreshToken()).unwrap();
      return refreshResult;
    } catch (error: any) {
      clearAuthData();
      return null;
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // Logout user
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });

    // Refresh token
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.tokens = action.payload.tokens;
          state.isAuthenticated = true;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });

    // Check auth status
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.tokens = action.payload.tokens;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.tokens = null;
          state.isAuthenticated = false;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

// Export actions
export const { clearError, updateUser, setLoading } = authSlice.actions;

// Export selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

// Export reducer
export default authSlice.reducer;
