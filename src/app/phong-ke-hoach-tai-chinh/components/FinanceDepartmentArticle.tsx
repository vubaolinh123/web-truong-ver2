"use client";

import React, { useEffect, useState } from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface Author {
  firstName?: string;
  lastName?: string;
  username?: string;
  role?: string;
  avatar?: string;
}

interface CategoryItem { 
  id?: string; 
  name?: string; 
  slug?: string;
}

interface ArticleDetail {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string | { url?: string; alt?: string };
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: Author;
  categories?: CategoryItem[];
  readingTime?: number;
  readingTimeDisplay?: string;
  tags?: Array<string | { name?: string }>;
  metaTitle?: string;
  metaDescription?: string;
}

const FinanceDepartmentArticle: React.FC = () => {
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const base = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '');
        const params = new URLSearchParams({ 
          limit: '1', 
          sort: 'newest', 
          status: 'published',
          noCache: 'true' 
        });
        const res = await fetch(`${base}/articles/by-category/phong-ke-hoach-tai-chinh?${params.toString()}`, { 
          cache: 'no-store' 
        });
        
        if (!res.ok) throw new Error('Failed to fetch finance department article');
        
        const data = await res.json();
        const items: any[] = data?.data?.articles || [];
        
        // Get the first published article
        const firstArticle = items[0] || null;
        
        if (mounted) setArticle(firstArticle);
      } catch (e: any) {
        if (mounted) setError('Không thể tải nội dung phòng kế hoạch tài chính.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    
    fetchArticle();
    return () => { mounted = false; };
  }, []);

  const getImageUrl = (image: ArticleDetail['featuredImage']) => {
    if (!image) return null;
    const rel = typeof image === 'string' ? image : image.url;
    if (!rel) return null;
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api\/?$/, '');
    return rel.startsWith('http') ? rel : `${baseUrl}${rel}`;
  };

  const formatDate = (d?: string) => 
    d ? new Date(d).toLocaleDateString('vi-VN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }) : '';

  if (loading) {
    return (
      <section className="w-[92%] md:w-[80%] mx-auto py-10">
        <div className="h-10 w-2/3 bg-slate-100 rounded mb-6 animate-pulse" />
        <div className="h-72 w-full bg-slate-100 rounded-xl mb-6 animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 w-full bg-slate-100 rounded animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-[92%] md:w-[80%] mx-auto py-10">
        <div role="alert" className="text-center py-12 bg-white/70 border border-red-100 rounded-2xl">
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-slate-600 mt-2">
            Vui lòng thử lại sau hoặc liên hệ quản trị viên.
          </p>
        </div>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="w-[92%] md:w-[80%] mx-auto py-10">
        <div className="text-center py-12 bg-white/70 border border-slate-100 rounded-2xl">
          <p className="text-slate-600 text-lg mb-2">Chưa có nội dung phòng kế hoạch tài chính.</p>
          <p className="text-sm text-slate-500">
            Nội dung đang được cập nhật. Vui lòng quay lại sau.
          </p>
        </div>
      </section>
    );
  }

  return (
    <article className="w-[92%] md:w-[80%] mx-auto py-10" aria-labelledby="finance-department-title">
      <header className="mb-6">
        <h1 id="finance-department-title" className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <time dateTime={article.publishedAt || article.createdAt} className="inline-flex items-center gap-1">
            <span className="inline-block h-2 w-2 rounded-full bg-[#2563eb]" />
            {formatDate(article.publishedAt || article.createdAt)}
          </time>
          {article.author && (
            <span aria-label="Tác giả" className="inline-flex items-center gap-2">
              {article.author.avatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.author.avatar}
                  alt={`${article.author.firstName} ${article.author.lastName}`}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <span>
                {article.author.firstName} {article.author.lastName}
              </span>
            </span>
          )}
          {article.readingTimeDisplay && (
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-slate-300" />
              {article.readingTimeDisplay}
            </span>
          )}
        </div>
        {article.excerpt && (
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">
            {article.excerpt}
          </p>
        )}
      </header>

      {getImageUrl(article.featuredImage) && (
        <figure className="w-full rounded-2xl overflow-hidden mb-8 bg-slate-50">
          <div className="aspect-video w-full">
            <OptimizedImage
              src={getImageUrl(article.featuredImage)}
              alt={article.title}
              width={1600}
              height={900}
              className="w-full h-full object-contain"
            />
          </div>
        </figure>
      )}

      <div className="prose prose-slate max-w-none text-slate-800 prose-headings:scroll-mt-20 prose-h1:text-slate-900 prose-h2:text-slate-900 prose-h3:text-slate-900 prose-a:text-[#2563eb] prose-strong:text-slate-900 prose-img:rounded-xl leading-relaxed">
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      {article.tags && article.tags.length > 0 && (
        <footer className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-600">Từ khóa:</span>
            {article.tags.map((tag, idx) => {
              const tagName = typeof tag === 'string' ? tag : tag.name || '';
              return (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                >
                  {tagName}
                </span>
              );
            })}
          </div>
        </footer>
      )}
    </article>
  );
};

export default FinanceDepartmentArticle;

