/**
 * Error Handler Utilities
 * Xử lý lỗi API nhất quán và hiển thị thông báo chính xác từ server
 */

import toast from 'react-hot-toast';

// Interface cho API Response chuẩn
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data: T;
}

// Interface cho API Error
export interface ApiErrorResponse {
  status: 'error';
  message: string;
  data: null;
  code?: string;
  details?: any;
}

// Custom Error Classes
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 0,
    public code: string = 'API_ERROR',
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class AuthError extends Error {
  constructor(
    message: string,
    public code: string = 'AUTH_ERROR',
    public status: number = 0,
    public details?: any
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

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

/**
 * Xử lý lỗi API và hiển thị toast notification với thông báo chính xác từ server
 */
export const handleApiError = (
  error: any,
  fallbackMessage: string = 'Có lỗi xảy ra. Vui lòng thử lại sau.',
  showToast: boolean = true
): string => {
  let errorMessage = fallbackMessage;

  // Xử lý các loại lỗi khác nhau
  if (error instanceof ApiError || error instanceof AuthError || error instanceof ArticleApiError) {
    // Lỗi từ custom error classes - đã có message từ server
    errorMessage = error.message;
  } else if (error?.response?.data?.message) {
    // Lỗi từ fetch response với cấu trúc API chuẩn
    errorMessage = error.response.data.message;
  } else if (error?.message) {
    // Lỗi JavaScript thông thường
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    // Lỗi dạng string
    errorMessage = error;
  }

  // Hiển thị toast notification nếu được yêu cầu
  if (showToast) {
    toast.error(errorMessage);
  }

  return errorMessage;
};

/**
 * Xử lý thành công API và hiển thị toast notification
 */
export const handleApiSuccess = (
  response: ApiResponse,
  fallbackMessage: string = 'Thao tác thành công',
  showToast: boolean = true
): string => {
  const successMessage = response.message || fallbackMessage;

  if (showToast) {
    toast.success(successMessage);
  }

  return successMessage;
};

/**
 * Wrapper function để xử lý API calls với error handling nhất quán
 */
export const withErrorHandling = async <T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: {
    successMessage?: string;
    errorMessage?: string;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
  } = {}
): Promise<T> => {
  const {
    successMessage = 'Thao tác thành công',
    errorMessage = 'Có lỗi xảy ra. Vui lòng thử lại sau.',
    showSuccessToast = false,
    showErrorToast = true
  } = options;

  try {
    const response = await apiCall();

    if (response.status === 'success') {
      if (showSuccessToast) {
        handleApiSuccess(response, successMessage, true);
      }
      return response.data;
    } else {
      // API trả về status: 'error'
      throw new ApiError(response.message || errorMessage);
    }
  } catch (error) {
    handleApiError(error, errorMessage, showErrorToast);
    throw error;
  }
};

/**
 * Xử lý lỗi cho Redux async thunks
 */
export const handleReduxError = (error: any, fallbackMessage: string = 'Có lỗi xảy ra'): string => {
  if (error instanceof ApiError || error instanceof AuthError || error instanceof ArticleApiError) {
    return error.message;
  } else if (error?.response?.data?.message) {
    return error.response.data.message;
  } else if (error?.message) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  }
  
  return fallbackMessage;
};

/**
 * Kiểm tra xem response có phải là lỗi không
 */
export const isApiError = (response: any): response is ApiErrorResponse => {
  return response && response.status === 'error';
};

/**
 * Tạo error message từ validation errors
 */
export const formatValidationErrors = (errors: Record<string, string[]>): string => {
  const errorMessages = Object.values(errors).flat();
  return errorMessages.join(', ');
};

/**
 * Xử lý network errors
 */
export const handleNetworkError = (error: any): string => {
  if (!navigator.onLine) {
    return 'Không có kết nối internet. Vui lòng kiểm tra kết nối và thử lại.';
  }

  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Không thể kết nối đến server. Vui lòng thử lại sau.';
  }

  return 'Lỗi kết nối. Vui lòng thử lại sau.';
};
