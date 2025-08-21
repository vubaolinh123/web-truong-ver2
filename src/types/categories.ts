/**
 * Category Types
 * Type definitions cho categories
 */

export interface Category {
  id: string;
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  status: 'active' | 'inactive';
  sortOrder: number;
  articleCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  status: string;
  message: string;
  data: {
    categories: Category[];
    pagination?: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface CategoryResponse {
  status: string;
  message: string;
  data: {
    category: Category;
  };
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
  status?: 'active' | 'inactive';
  sortOrder?: number;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {
  id: string;
}

export interface CategoryFilters {
  search?: string;
  status?: 'active' | 'inactive';
  sort?: 'name' | 'created' | 'articles';
  page?: number;
  limit?: number;
}
