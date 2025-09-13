"use client";

import React from 'react';
import { Article } from '@/types/articles';
import ArticleCard from './ArticleCard';

export interface ArticlesGridProps {
  articles: Article[];
  columns?: {
    mobile?: 1 | 2;
    tablet?: 1 | 2 | 3;
    desktop?: 2 | 3 | 4;
  };
  className?: string;
}

const ArticlesGrid: React.FC<ArticlesGridProps> = ({
  articles,
  columns = { mobile: 1, tablet: 2, desktop: 4 },
  className = ''
}) => {
  const gridClasses = [
    'grid gap-6',
    columns.mobile === 1 ? 'grid-cols-1' : 'grid-cols-2',
    columns.tablet === 1 ? 'md:grid-cols-1' : columns.tablet === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3',
    columns.desktop === 2 ? 'lg:grid-cols-2' : columns.desktop === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4',
    className
  ].join(' ');

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12 bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl">
        <p className="text-slate-600">Chưa có bài viết nào cho mục này.</p>
      </div>
    );
  }

  return (
    <div className={gridClasses}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticlesGrid;

