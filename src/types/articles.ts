/**
 * Article Types and Interfaces
 * Định nghĩa types cho articles system
 */

export interface FeaturedImage {
  url?: string;
  alt?: string;
  caption?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Author {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string | FeaturedImage;
  status: 'draft' | 'published' | 'archived';
  categoryId?: string;
  category?: Category;
  categories?: Category[];
  authorId: string;
  author?: Author;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  publishedAt?: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  featured: boolean;
  seoScore?: number;
  readingTime?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  categoryIds: string[];
  status: 'draft' | 'published' | 'archived';
  featuredImage: File | string | null;
  tags: string[];
  featured: boolean;
  publishedAt: string;
}

export interface ArticleFilters {
  status?: 'all' | 'draft' | 'published' | 'archived';
  categoryId?: string;
  authorId?: string;
  featured?: boolean;
  dateFrom?: string;
  dateTo?: string;
  tags?: string[];
}

export interface ArticleSearchParams extends ArticleFilters {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  keyword?: string;
}

export interface ArticlePagination {
  currentPage: number;
  totalPages: number;
  totalArticles: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ArticlesResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    articles: Article[];
    pagination: ArticlePagination;
  };
}

export interface ArticleResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    article: Article;
  };
}

export interface ArticleStatistics {
  total: number;
  published: number;
  draft: number;
  archived: number;
  featured: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  averageReadingTime: number;
  articlesThisMonth: number;
  articlesThisWeek: number;
  topCategories: Array<{
    id: string;
    name: string;
    articleCount: number;
  }>;
  topAuthors: Array<{
    id: string;
    name: string;
    articleCount: number;
  }>;
  recentActivity: Array<{
    id: string;
    title: string;
    action: 'created' | 'updated' | 'published' | 'archived';
    timestamp: string;
    author: string;
  }>;
}

export interface ArticleStatisticsResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    statistics: ArticleStatistics;
  };
}

export interface ArticleSearchResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    articles: Article[];
    total: number;
    query: string;
  };
}

export interface BulkArticleOperation {
  action: 'delete' | 'publish' | 'archive' | 'draft' | 'feature' | 'unfeature';
  articleIds: string[];
}

export interface BulkOperationResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    affected: number;
    failed: string[];
  };
}

// Article validation rules
export const ARTICLE_VALIDATION = {
  title: {
    minLength: 3,
    maxLength: 200,
    required: true
  },
  content: {
    minLength: 50,
    required: true
  },
  excerpt: {
    minLength: 10,
    maxLength: 500,
    required: true
  },
  metaTitle: {
    maxLength: 60
  },
  metaDescription: {
    maxLength: 160
  },
  tags: {
    maxCount: 10,
    maxLength: 30
  }
} as const;

// Article status options
export const ARTICLE_STATUS_OPTIONS = [
  { value: 'draft', label: 'Bản nháp', color: 'gray' },
  { value: 'published', label: 'Đã xuất bản', color: 'green' },
  { value: 'archived', label: 'Lưu trữ', color: 'red' }
] as const;

// Sort options for articles
export const ARTICLE_SORT_OPTIONS = [
  { value: 'createdAt', label: 'Ngày tạo' },
  { value: 'updatedAt', label: 'Ngày cập nhật' },
  { value: 'publishedAt', label: 'Ngày xuất bản' },
  { value: 'title', label: 'Tiêu đề' },
  { value: 'viewCount', label: 'Lượt xem' },
  { value: 'likeCount', label: 'Lượt thích' },
  { value: 'commentCount', label: 'Bình luận' }
] as const;

// Default pagination settings
export const DEFAULT_ARTICLE_PARAMS: ArticleSearchParams = {
  page: 1,
  limit: 10,
  sortBy: 'createdAt',
  sortOrder: 'desc',
  status: 'all'
};

export type ArticleStatus = typeof ARTICLE_STATUS_OPTIONS[number]['value'];
export type ArticleSortField = typeof ARTICLE_SORT_OPTIONS[number]['value'];
