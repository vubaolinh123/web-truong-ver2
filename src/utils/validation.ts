/**
 * Validation Utils
 * Utility functions cho form validation
 */

import { ArticleFormData } from '@/types/articles';

export interface ValidationErrors {
  [key: string]: string;
}

export const validateArticleForm = (data: ArticleFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Title validation
  if (!data.title.trim()) {
    errors.title = 'Tiêu đề là bắt buộc';
  } else if (data.title.length < 5) {
    errors.title = 'Tiêu đề phải có ít nhất 5 ký tự';
  } else if (data.title.length > 200) {
    errors.title = 'Tiêu đề không được vượt quá 200 ký tự';
  }

  // Slug validation
  if (!data.slug.trim()) {
    errors.slug = 'Đường dẫn URL là bắt buộc';
  } else {
    const slugError = validateSlug(data.slug);
    if (slugError) {
      errors.slug = slugError;
    }
  }

  // Content validation
  if (!data.content.trim()) {
    errors.content = 'Nội dung là bắt buộc';
  } else if (data.content.length < 50) {
    errors.content = 'Nội dung phải có ít nhất 50 ký tự';
  }

  // Category validation
  if (!data.categoryIds || data.categoryIds.length === 0) {
    errors.categoryIds = 'Vui lòng chọn ít nhất một danh mục';
  }

  // Excerpt validation
  if (data.excerpt && data.excerpt.length > 500) {
    errors.excerpt = 'Tóm tắt không được vượt quá 500 ký tự';
  }

  // Featured image validation
  if (data.featuredImage && typeof data.featuredImage === 'string' && !isValidUrl(data.featuredImage)) {
    errors.featuredImage = 'URL ảnh không hợp lệ';
  }



  // Tags validation
  if (data.tags && data.tags.length > 10) {
    errors.tags = 'Không được có quá 10 tags';
  }

  return errors;
};

export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: any, fieldName: string): string | null => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} là bắt buộc`;
  }
  return null;
};

export const validateMinLength = (value: string, minLength: number, fieldName: string): string | null => {
  if (value && value.length < minLength) {
    return `${fieldName} phải có ít nhất ${minLength} ký tự`;
  }
  return null;
};

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): string | null => {
  if (value && value.length > maxLength) {
    return `${fieldName} không được vượt quá ${maxLength} ký tự`;
  }
  return null;
};

export const validateSlug = (slug: string): string | null => {
  if (!slug) return 'Slug là bắt buộc';
  
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug)) {
    return 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang';
  }
  
  if (slug.length < 3) {
    return 'Slug phải có ít nhất 3 ký tự';
  }
  
  if (slug.length > 100) {
    return 'Slug không được vượt quá 100 ký tự';
  }
  
  return null;
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Mật khẩu phải có ít nhất 8 ký tự');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ hoa');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ thường');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 số');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt');
  }
  
  return errors;
};
