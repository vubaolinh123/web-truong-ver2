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

interface CategoryItem { id?: string; name?: string; slug?: string }

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

interface SingleProgramArticleProps {
  categorySlug: string;
}

const SingleProgramArticle: React.FC<SingleProgramArticleProps> = ({ categorySlug }) => {
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchOne = async () => {
      try {
        setLoading(true);
        setError(null);
        const base = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '');
        const params = new URLSearchParams({ limit: '1', sort: 'newest', status: 'published', authorRole: 'admin', noCache: 'true' });
        const res = await fetch(`${base}/articles/by-category/${categorySlug}?${params.toString()}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch program article');
        const data = await res.json();
        const items: any[] = data?.data?.articles || [];
        // Filter admin-authored only if backend returns author.role
        const adminFirst = items.find(a => a?.author?.role === 'admin') || items[0] || null;
        if (mounted) setArticle(adminFirst || null);
      } catch (e: any) {
        if (mounted) setError('Không thể tải bài viết chương trình.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchOne();
    return () => { mounted = false; };
  }, [categorySlug]);

  const getImageUrl = (image: ArticleDetail['featuredImage']) => {
    if (!image) return null;
    const rel = typeof image === 'string' ? image : image.url;
    if (!rel) return null;
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api\/?$/, '');
    return rel.startsWith('http') ? rel : `${baseUrl}${rel}`;
  };

  const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';

  if (loading) {
    return (
      <section className="w-[92%] md:w-[80%] mx-auto py-10">
        <div className="h-10 w-2/3 bg-slate-100 rounded mb-6 animate-pulse" />
        <div className="h-72 w-full bg-slate-100 rounded-xl mb-6 animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
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
        </div>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="w-[92%] md:w-[80%] mx-auto py-10">
        <div className="text-center text-slate-600">Chưa có bài viết cho chương trình này.</div>
      </section>
    );
  }

  return (
    <article className="w-[92%] md:w-[80%] mx-auto py-10" aria-labelledby="program-article-title">
      <header className="mb-6">
        <h1 id="program-article-title" className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
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
                <img src={article.author.avatar} alt="Avatar tác giả" className="h-6 w-6 rounded-full object-cover" />
              )}
              <span className="font-medium text-slate-800">
                {article.author.firstName || ''} {article.author.lastName || ''}
              </span>
              {article.author.role && (
                <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-[#2563eb]/10 text-[#2563eb]">{article.author.role}</span>
              )}
            </span>
          )}
          {article.readingTimeDisplay && (
            <span className="inline-flex items-center gap-2 text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              {article.readingTimeDisplay}
            </span>
          )}
          {!!article.categories?.length && (
            <span className="inline-flex flex-wrap items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              {article.categories.map((c, idx) => (
                <span key={idx} className="px-2 py-0.5 text-xs rounded-full bg-[#2563eb]/10 text-[#2563eb]">
                  {c.name}
                </span>
              ))}
            </span>
          )}
        </div>
        {(article.tags && (article.tags as any[]).length > 0) && (
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Thẻ bài viết">
            {(article.tags as any[]).map((t, i) => (
              <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
                {typeof t === 'string' ? t : t?.name}
              </span>
            ))}
          </div>
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
    </article>
  );
};

export default SingleProgramArticle;

