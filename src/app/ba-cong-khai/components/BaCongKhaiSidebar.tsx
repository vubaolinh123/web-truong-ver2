'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface ArticleItem {
    id: string;
    title: string;
    slug: string;
    featuredImage?: string | { url?: string; alt?: string };
    publishedAt?: string;
    createdAt?: string;
}

interface BaCongKhaiSidebarProps {
    currentSlug?: string;
}

const BaCongKhaiSidebar: React.FC<BaCongKhaiSidebarProps> = ({ currentSlug }) => {
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchArticles = async () => {
            try {
                setLoading(true);

                const base = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '');
                const params = new URLSearchParams({
                    limit: '5',
                    sort: 'newest',
                    status: 'published',
                });

                const res = await fetch(`${base}/articles/by-category/ba-cong-khai?${params.toString()}`, {
                    cache: 'no-store',
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch articles');
                }

                const data = await res.json();
                const items: ArticleItem[] = data?.data?.articles || [];

                if (mounted) {
                    setArticles(items);
                }
            } catch (e: any) {
                // Silently fail for sidebar
                console.error('Failed to fetch sidebar articles:', e);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchArticles();
        return () => {
            mounted = false;
        };
    }, []);

    const getImageUrl = (image: ArticleItem['featuredImage']) => {
        if (!image) return '/images/logo.png';
        const rel = typeof image === 'string' ? image : image.url;
        if (!rel) return '/images/logo.png';
        const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api\/?$/, '');
        return rel.startsWith('http') ? rel : `${baseUrl}${rel}`;
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    // Loading skeleton
    if (loading) {
        return (
            <aside className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-800 to-blue-900 px-4 py-4">
                    <div className="h-6 w-40 bg-blue-700 rounded animate-pulse" />
                </div>
                <div className="divide-y divide-gray-100">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="p-4">
                            <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-lg bg-gray-200 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
        );
    }

    // Empty state - hide sidebar if no articles
    if (articles.length === 0) {
        return null;
    }

    return (
        <aside className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 px-4 py-4">
                <h2 className="text-lg font-bold text-white">Tin cùng chuyên mục</h2>
            </div>

            {/* Articles List */}
            <div className="divide-y divide-gray-100">
                {articles.map((article) => {
                    const isActive = currentSlug === article.slug;

                    return (
                        <Link
                            key={article.id}
                            href={`/tin-tuc/${article.slug}`}
                            className={`block p-4 transition-all duration-200 group ${isActive
                                    ? 'bg-red-50 border-l-4 border-red-500'
                                    : 'hover:bg-blue-50 border-l-4 border-transparent hover:border-blue-400'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                {/* Thumbnail */}
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
                                    <OptimizedImage
                                        src={getImageUrl(article.featuredImage)}
                                        alt={article.title}
                                        width={48}
                                        height={48}
                                        className="object-contain"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    {/* Date */}
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                                        <Calendar size={12} className="text-red-500" />
                                        <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className={`text-sm font-medium line-clamp-2 transition-colors ${isActive
                                                ? 'text-red-700'
                                                : 'text-gray-700 group-hover:text-blue-700'
                                            }`}
                                    >
                                        {article.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* View All Link */}
            <div className="p-4 border-t border-gray-100">
                <Link
                    href="/ba-cong-khai"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
                >
                    <span>Xem tất cả</span>
                    <ArrowRight size={16} />
                </Link>
            </div>
        </aside>
    );
};

export default BaCongKhaiSidebar;
