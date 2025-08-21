/**
 * Article Detail Page Types
 * TypeScript interfaces for article detail components - Updated to match API
 */

import { Article } from '@/types/articles';

// Re-export Article type from main types
export type ArticleContent = Article;

// Additional types for components
export interface ArticleAuthor {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  email?: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface ArticleTag {
  id: string;
  name: string;
  slug: string;
}

export interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt: string;
  category: ArticleCategory;
  readingTime: number;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

export interface SocialShareData {
  url: string;
  title: string;
  description: string;
  image?: string;
  hashtags: string[];
}


export interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  structuredData: any;
}

export interface ArticleHeaderProps {
  article: ArticleContent;
  breadcrumbs: BreadcrumbItem[];
  className?: string;
}

export interface ArticleContentProps {
  content: string;
  className?: string;
}

export interface SocialShareProps {
  shareData: SocialShareData;
  className?: string;
}

export interface ArticleLoadingProps {
  className?: string;
}

export interface ArticleErrorProps {
  error: Error;
  reset: () => void;
  className?: string;
}
