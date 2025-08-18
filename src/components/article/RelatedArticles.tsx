/**
 * Related Articles Component
 * Hiển thị các bài viết liên quan với lazy loading
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, User, Eye, Clock, ArrowRight } from 'lucide-react';
import { Article } from '@/types/articles';
import ArticleImage from '@/components/common/ArticleImage';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

interface RelatedArticlesProps {
  articleId: string;
  categoryId?: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articleId, categoryId }) => {
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const params = new URLSearchParams({
          limit: '4',
          status: 'published'
        });

        if (categoryId) {
          params.append('category', categoryId);
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/articles/public?${params}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch related articles');
        }

        const data = await response.json();
        
        if (data.status === 'success') {
          // Filter out current article and limit to 4
          const filtered = data.data.articles
            .filter((article: Article) => article.id !== articleId)
            .slice(0, 4);
          
          setRelatedArticles(filtered);
        } else {
          throw new Error(data.message || 'Failed to fetch articles');
        }
      } catch (err) {
        console.error('Error fetching related articles:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedArticles();
  }, [articleId, categoryId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAuthorName = (author: any) => {
    if (!author) return 'Tác giả ẩn danh';
    return `${author.firstName} ${author.lastName}`;
  };

  if (loading) {
    return (
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Bài viết liên quan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <LoadingSkeleton key={index} variant="card" />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Bài viết liên quan</h2>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Không thể tải bài viết liên quan.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Thử lại
          </button>
        </div>
      </section>
    );
  }

  if (relatedArticles.length === 0) {
    return (
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Bài viết liên quan</h2>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Không có bài viết liên quan nào.</p>
          <Link
            href="/tin-tuc"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Xem tất cả tin tức
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-blue-900">Bài viết liên quan</h2>
        <Link 
          href="/tin-tuc"
          className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors group"
        >
          Xem tất cả
          <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {relatedArticles.map((article, index) => (
          <article 
            key={article.id} 
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link href={`/tin-tuc/${article.slug}`} className="block">
              {/* Article Image */}
              <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                <ArticleImage
                  featuredImage={article.featuredImage}
                  title={article.title}
                  fill
                  className="group-hover:scale-110 transition-transform duration-500 w-full h-full object-cover"
                  fallbackIcon="image"
                  fallbackSize={48}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Category Badge */}
                {article.category && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-blue-600 text-white shadow-lg">
                      {article.category.name}
                    </span>
                  </div>
                )}

                {/* Featured Badge */}
                {article.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-yellow-500 text-white shadow-lg">
                      ⭐
                    </span>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Article Content */}
              <div className="p-5 space-y-3">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                  {article.title}
                </h3>

                {/* Excerpt */}
                {article.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                )}

                {/* Meta Information */}
                <div className="space-y-2 text-xs text-gray-500">
                  {/* Author and Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User size={12} className="mr-1" />
                      <span className="font-medium">{getAuthorName(article.author)}</span>
                    </div>
                    {article.publishedAt && (
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        <Eye size={12} className="mr-1" />
                        <span>{article.viewCount?.toLocaleString()}</span>
                      </div>
                      {article.readingTime && (
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          <span>{article.readingTime}p</span>
                        </div>
                      )}
                    </div>
                    <div className="text-blue-600 font-semibold group-hover:text-blue-800 transition-colors">
                      Đọc thêm →
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {article.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                    {article.tags.length > 2 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-600">
                        +{article.tags.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* View More Button */}
      {relatedArticles.length >= 4 && (
        <div className="mt-8 text-center">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Xem thêm bài viết
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      )}
    </section>
  );
};

export default RelatedArticles;
