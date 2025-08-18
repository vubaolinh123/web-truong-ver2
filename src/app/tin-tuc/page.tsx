/**
 * Tin Tức Page - Trang danh sách tin tức
 * Layout hiển thị danh sách các bài viết với search, filter và pagination
 */

import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { Calendar, User, Eye, Search, Filter, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ArticleImage from '@/components/common/ArticleImage';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { Article } from '@/types/articles';

export const metadata: Metadata = {
  title: 'Tin Tức - Trường Đại học ABC',
  description: 'Cập nhật tin tức mới nhất từ Trường Đại học ABC. Thông tin về hoạt động giáo dục, nghiên cứu khoa học, sự kiện và thành tích của nhà trường.',
  keywords: 'tin tức, bài viết, thông báo, sự kiện, đại học, giáo dục',
  openGraph: {
    title: 'Tin Tức - Trường Đại học ABC',
    description: 'Cập nhật tin tức mới nhất từ Trường Đại học ABC',
    type: 'website',
    url: '/tin-tuc',
    images: ['/images/news-og.jpg']
  },
  alternates: {
    canonical: '/tin-tuc'
  }
};

interface NewsPageProps {
  searchParams: {
    page?: string;
    search?: string;
    category?: string;
    sort?: string;
  };
}

// Fetch articles data with filters
async function getArticles(params: {
  page?: number;
  search?: string;
  category?: string;
  sort?: string;
}): Promise<{ articles: Article[]; total: number; totalPages: number }> {
  try {
    const searchParams = new URLSearchParams({
      page: (params.page || 1).toString(),
      limit: '12',
      status: 'published',
      ...(params.search && { search: params.search }),
      ...(params.category && { category: params.category }),
      ...(params.sort && { sort: params.sort })
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/articles/public?${searchParams}`,
      {
        next: { revalidate: 300 } // ISR: revalidate every 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data = await response.json();
    
    if (data.status === 'success') {
      return {
        articles: data.data.articles || [],
        total: data.data.pagination?.totalArticles || 0,
        totalPages: data.data.pagination?.totalPages || 1
      };
    }
    
    return { articles: [], total: 0, totalPages: 1 };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { articles: [], total: 0, totalPages: 1 };
  }
}

// Fetch categories for filter
async function getCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/categories/public`,
      {
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) return [];
    
    const data = await response.json();
    return data.status === 'success' ? data.data.categories : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const currentPage = parseInt(searchParams.page || '1');
  const search = searchParams.search || '';
  const category = searchParams.category || '';
  const sort = searchParams.sort || 'newest';

  // Fetch data
  const [{ articles, total, totalPages }, categories] = await Promise.all([
    getArticles({ page: currentPage, search, category, sort }),
    getCategories()
  ]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorName = (author: any) => {
    if (!author) return 'Tác giả ẩn danh';
    return `${author.firstName} ${author.lastName}`;
  };

  const breadcrumbItems = [
    { label: 'Tin Tức', current: true }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-12">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          <div className="text-center">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Tin Tức
              </h1>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6 rounded-full"></div>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Cập nhật những thông tin mới nhất từ Trường Đại học ABC
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto">
              <form className="relative">
                <div className="relative group">
                  <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="Tìm kiếm tin tức, thông báo..."
                    className="w-full px-6 py-4 pl-14 pr-32 rounded-2xl text-gray-900 bg-white/95 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300 text-lg placeholder-gray-500 shadow-lg"
                  />
                  <Search size={24} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                  >
                    Tìm kiếm
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{total}+</div>
                <div className="text-blue-100 text-sm uppercase tracking-wide">Bài viết</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{categories.length}</div>
                <div className="text-blue-100 text-sm uppercase tracking-wide">Danh mục</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">50K+</div>
                <div className="text-blue-100 text-sm uppercase tracking-wide">Lượt xem</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Results Info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">
                  <span className="font-bold text-blue-600">{total}</span> bài viết được tìm thấy
                </span>
              </div>
              {(search || category) && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Lọc theo:</span>
                  {search && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      "                      &ldquo;{search}&rdquo;"
                    </span>
                  )}
                  {category && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {categories.find((cat: { id: string; name: string }) => cat.id === category)?.name}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Enhanced Filters */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  name="category"
                  defaultValue={category}
                  className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm font-medium min-w-[160px]"
                >
                  <option value="">📁 Tất cả danh mục</option>
                  {categories.map((cat: { id: string; name: string }) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <Filter size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <select
                  name="sort"
                  defaultValue={sort}
                  className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm font-medium min-w-[140px]"
                >
                  <option value="newest">🕒 Mới nhất</option>
                  <option value="oldest">📅 Cũ nhất</option>
                  <option value="popular">🔥 Phổ biến</option>
                  <option value="views">👁️ Nhiều lượt xem</option>
                </select>
                <ArrowRight size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
              </div>

              {/* Clear Filters */}
              {(search || category || sort !== 'newest') && (
                <Link
                  href="/tin-tuc"
                  className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors border border-gray-300 rounded-xl hover:border-red-300 hover:bg-red-50"
                >
                  ✕ Xóa bộ lọc
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <Suspense fallback={<LoadingSkeleton variant="grid" />}>
          {articles.length > 0 ? (
            <>
              {/* Featured Articles */}
              {currentPage === 1 && articles.length >= 2 && (
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">✨ Tin tức nổi bật</h2>
                      <p className="text-gray-600">Những bài viết được quan tâm nhất</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span>Cập nhật liên tục</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {articles.slice(0, 2).map((article, index) => (
                      <article key={article.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 flex flex-col">
                        <Link href={`/tin-tuc/${article.slug}`}>
                          <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                            <ArticleImage
                              featuredImage={article.featuredImage}
                              title={article.title}
                              fill
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              fallbackIcon="image"
                              fallbackSize={48}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                              {article.category && (
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-600 text-white shadow-lg backdrop-blur-sm">
                                  {article.category.name}
                                </span>
                              )}
                              {article.featured && (
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 shadow-lg">
                                  ⭐ Nổi bật
                                </span>
                              )}
                            </div>

                            {/* Featured Number */}
                            <div className="absolute top-4 right-4">
                              <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-600 font-bold text-lg shadow-lg">
                                {index + 1}
                              </div>
                            </div>

                            {/* Read More Overlay */}
                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-semibold text-gray-900">Đọc bài viết</span>
                                  <ArrowRight size={16} className="text-blue-600" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                              {article.title}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                              {article.excerpt}
                            </p>

                            {/* Enhanced Meta */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User size={12} className="text-blue-600" />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">{getAuthorName(article.author)}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                  <Calendar size={12} />
                                  <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Eye size={12} />
                                  <span>{article.viewCount?.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* All Articles */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {currentPage === 1 ? '📰 Tất cả tin tức' : `📰 Tin tức - Trang ${currentPage}`}
                    </h2>
                    <p className="text-gray-600">
                      {currentPage === 1 ? 'Danh sách đầy đủ các bài viết mới nhất' : `Hiển thị trang ${currentPage} của ${totalPages}`}
                    </p>
                  </div>
                  {totalPages > 1 && (
                    <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                      <span>Trang {currentPage} / {totalPages}</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {(currentPage === 1 ? articles.slice(2) : articles).map((article) => (
                    <article key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-1 flex flex-col h-full">
                      <Link href={`/tin-tuc/${article.slug}`}>
                        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                          <ArticleImage
                            featuredImage={article.featuredImage}
                            title={article.title}
                            fill
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            fallbackIcon="image"
                            fallbackSize={32}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1">
                            {article.category && (
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-blue-600/90 text-white backdrop-blur-sm">
                                {article.category.name}
                              </span>
                            )}
                            {article.featured && (
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-yellow-500/90 text-white backdrop-blur-sm">
                                ⭐
                              </span>
                            )}
                          </div>

                          {/* Read More Button */}
                          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                              <ArrowRight size={16} className="text-blue-600" />
                            </div>
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                            {article.excerpt}
                          </p>

                          {/* Enhanced Meta */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <User size={10} className="text-blue-600" />
                              </div>
                              <span className="text-xs font-medium text-gray-700 truncate max-w-[100px]">
                                {getAuthorName(article.author)}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar size={10} />
                                <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye size={10} />
                                <span>{article.viewCount?.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center">
                  <div className="flex items-center gap-2">
                    {currentPage > 1 && (
                      <Link
                        href={`/tin-tuc?page=${currentPage - 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}${sort !== 'newest' ? `&sort=${sort}` : ''}`}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Trước
                      </Link>
                    )}
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <Link
                          key={page}
                          href={`/tin-tuc?page=${page}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}${sort !== 'newest' ? `&sort=${sort}` : ''}`}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            page === currentPage
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </Link>
                      );
                    })}

                    {currentPage < totalPages && (
                      <Link
                        href={`/tin-tuc?page=${currentPage + 1}${search ? `&search=${search}` : ''}${category ? `&category=${category}` : ''}${sort !== 'newest' ? `&sort=${sort}` : ''}`}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Sau
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* No Articles */
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {search || category ? 'Không tìm thấy bài viết nào' : 'Chưa có bài viết nào'}
              </h3>
              <p className="text-gray-600 mb-4">
                {search || category 
                  ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
                  : 'Hệ thống đang được cập nhật. Vui lòng quay lại sau.'
                }
              </p>
              {(search || category) && (
                <Link
                  href="/tin-tuc"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Xem tất cả tin tức
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              )}
            </div>
          )}
        </Suspense>
      </div>
    </div>
    </Layout>
  );
}
