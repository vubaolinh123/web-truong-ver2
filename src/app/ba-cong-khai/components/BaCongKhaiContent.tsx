'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface Author {
    firstName?: string;
    lastName?: string;
    username?: string;
}

interface ArticleItem {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    featuredImage?: string | { url?: string; alt?: string };
    publishedAt?: string;
    createdAt?: string;
    author?: Author;
}

interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

const BaCongKhaiContent = () => {
    const [articles, setArticles] = useState<ArticleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationInfo | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        let mounted = true;

        const fetchArticles = async () => {
            try {
                setLoading(true);
                setError(null);

                const base = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '');
                const params = new URLSearchParams({
                    limit: String(ITEMS_PER_PAGE),
                    page: String(currentPage),
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
                const paginationData = data?.data?.pagination;

                if (mounted) {
                    setArticles(items);
                    if (paginationData) {
                        setPagination({
                            currentPage: paginationData.currentPage || 1,
                            totalPages: paginationData.totalPages || 1,
                            totalItems: paginationData.totalItems || items.length,
                            itemsPerPage: paginationData.itemsPerPage || ITEMS_PER_PAGE,
                        });
                    }
                }
            } catch (e: any) {
                if (mounted) {
                    setError('Không thể tải danh sách bài viết Ba Công Khai.');
                }
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
    }, [currentPage]);

    const getImageUrl = (image: ArticleItem['featuredImage']) => {
        if (!image) return '/images/logo.png'; // Fallback to logo
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
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gray-200 animate-pulse" />
                            <div className="flex-1 space-y-3">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-white rounded-xl shadow-md border border-red-100 p-8 text-center">
                <p className="text-red-600 mb-2">{error}</p>
                <p className="text-sm text-gray-500">
                    Vui lòng thử lại sau hoặc liên hệ quản trị viên.
                </p>
            </div>
        );
    }

    // Empty state
    if (articles.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 text-center">
                <p className="text-gray-600 text-lg mb-2">
                    Chưa có bài viết Ba Công Khai nào.
                </p>
                <p className="text-sm text-gray-500">
                    Nội dung đang được cập nhật. Vui lòng quay lại sau.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {articles.map((article) => (
                <Link
                    key={article.id}
                    href={`/tin-tuc/${article.slug}`}
                    className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
                >
                    <div className="flex items-start p-4 md:p-6 gap-4">
                        {/* Logo/Thumbnail */}
                        <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
                            <OptimizedImage
                                src={getImageUrl(article.featuredImage)}
                                alt={article.title}
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            {/* Date */}
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                <Calendar size={14} className="text-red-500" />
                                <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-base md:text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                                {article.title}
                            </h3>
                        </div>
                    </div>
                </Link>
            ))}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center pt-6">
                    <nav className="flex items-center gap-2">
                        {/* Previous button */}
                        {currentPage > 1 && (
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                &laquo; Trước
                            </button>
                        )}

                        {/* Page numbers */}
                        {Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, i) => {
                            let pageNum: number;
                            if (pagination.totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= pagination.totalPages - 2) {
                                pageNum = pagination.totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === pageNum
                                            ? 'bg-blue-800 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {/* Next button */}
                        {currentPage < pagination.totalPages && (
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Tiếp &raquo;
                            </button>
                        )}
                    </nav>
                </div>
            )}
        </div>
    );
};

export default BaCongKhaiContent;
