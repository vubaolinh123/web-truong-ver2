/**
 * Article Meta Component
 * Hiển thị metadata của bài viết
 */

'use client';

import React from 'react';
import { Calendar, User, FolderOpen, Tag, Clock, Eye, Heart, MessageSquare, Share2 } from 'lucide-react';
import { Article } from '@/types/articles';

interface ArticleMetaProps {
  article: Article;
}

const ArticleMeta: React.FC<ArticleMetaProps> = ({ article }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const authorName = article.author 
    ? `${article.author.firstName} ${article.author.lastName}`
    : 'Tác giả ẩn danh';

  return (
    <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Meta Info */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
          {/* Left Side - Author and Date */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            {/* Author Info */}
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <User size={24} className="text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{authorName}</p>
                <p className="text-sm text-gray-600">Tác giả bài viết</p>
              </div>
            </div>

            {/* Publication Date */}
            {article.publishedAt && (
              <div className="flex items-center text-sm text-gray-700 bg-white px-4 py-3 rounded-lg shadow-sm">
                <Calendar size={18} className="mr-3 text-blue-600" />
                <div>
                  <p className="font-semibold">Xuất bản:</p>
                  <p>{formatDate(article.publishedAt)}</p>
                </div>
              </div>
            )}

            {/* Last Updated */}
            {article.updatedAt && article.updatedAt !== article.publishedAt && (
              <div className="flex items-center text-sm text-gray-700 bg-white px-4 py-3 rounded-lg shadow-sm">
                <Clock size={18} className="mr-3 text-green-600" />
                <div>
                  <p className="font-semibold">Cập nhật:</p>
                  <p>{formatDate(article.updatedAt)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Category and Quick Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Category */}
            {article.category && (
              <div className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <FolderOpen size={18} className="mr-2" />
                <span className="font-semibold">{article.category.name}</span>
              </div>
            )}

            {/* Quick Share */}
            <button className="flex items-center bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-400 transition-colors font-semibold">
              <Share2 size={18} className="mr-2" />
              Chia sẻ
            </button>
          </div>
        </div>



        {/* Tags Section */}
        {article.tags && article.tags.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-start gap-3">
              <Tag size={20} className="text-gray-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Thẻ bài viết</h4>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Status Indicators */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          {/* Featured Badge */}
          {article.featured && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
              ⭐ Bài viết nổi bật
            </span>
          )}

          {/* Status Badge */}
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
            article.status === 'published'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : article.status === 'draft'
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {article.status === 'published' ? '✓ Đã xuất bản' :
             article.status === 'draft' ? '📝 Bản nháp' : '📁 Lưu trữ'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleMeta;
