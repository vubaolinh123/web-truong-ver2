"use client";

import React, { useEffect, useState } from 'react';
import ArticlesGrid from '@/components/shared/ArticlesGrid';
import { Article } from '@/types/articles';
import { Newspaper } from 'lucide-react';

interface ProgramArticlesSectionProps {
  categorySlug: string; // e.g., 'cong-nghe-thong-tin'
}

const ProgramArticlesSection: React.FC<ProgramArticlesSectionProps> = ({ categorySlug }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          limit: '12',
          status: 'published',
          category: categorySlug,
          sort: 'newest'
        });
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/articles/public?${params.toString()}`, {
          cache: 'no-store'
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (isMounted) {
          const list = data?.data?.articles || [];
          setArticles(list);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) setError('Không thể tải các bài viết liên quan.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticles();
    return () => {
      isMounted = false;
    };
  }, [categorySlug]);

  return (
    <section aria-labelledby="program-articles-title" className="w-[92%] md:w-[80%] mx-auto py-8 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Newspaper />
          </div>
          <div>
            <h2 id="program-articles-title" className="text-xl md:text-2xl font-bold text-slate-900">Bài viết liên quan ngành Công nghệ thông tin</h2>
            <p className="text-slate-600 text-sm">Cập nhật các tin tức mới nhất về chương trình và lĩnh vực</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-72 bg-white rounded-2xl shadow-sm animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div role="alert" className="text-center py-12 bg-white/70 border border-red-100 rounded-2xl">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <ArticlesGrid
          articles={articles}
          columns={{ mobile: 1, tablet: 2, desktop: 4 }}
        />
      )}
    </section>
  );
};

export default ProgramArticlesSection;

