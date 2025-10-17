'use client';

import React from 'react';
import HeroSection from './HeroSection';
import FilterControls from './FilterControls';
import FeaturedArticles from './FeaturedArticles';
import ArticlesList from './ArticlesList';
import Pagination from './Pagination';
import { Article } from '@/types/articles';

interface NewsPageClientProps {
  articles: Article[];
  total: number;
  totalPages: number;
  categories: any[];
  featuredArticles: Article[];
  currentPage: number;
  search: string;
  category: string;
  sort: string;
}

const NewsPageClient: React.FC<NewsPageClientProps> = ({
  articles,
  total,
  totalPages,
  categories,
  featuredArticles,
  currentPage,
  search,
  category,
  sort
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-yellow-50">
      {/* Hero Section */}
      <HeroSection
        totalArticles={total}
        currentSearch={search}
      />

      {/* Main Content */}
      <div className="w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <FilterControls
          categories={categories}
          currentCategory={category}
          currentSort={sort}
          currentSearch={search}
          totalResults={total}
        />

        {/* Featured Articles (only on first page) */}
        {currentPage === 1 && featuredArticles.length > 0 && (
          <FeaturedArticles articles={featuredArticles} />
        )}

        {/* All Articles */}
        <ArticlesList
          articles={articles}
          currentPage={currentPage}
          totalPages={totalPages}
          search={search}
          category={category}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            search={search}
            category={category}
            sort={sort}
          />
        )}
      </div>
    </div>
  );
};

export default NewsPageClient;

