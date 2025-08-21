/**
 * Article Header Component
 * Displays article title, metadata, and breadcrumbs
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, User, Clock, Eye, Tag } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { ArticleHeaderProps } from '../types/article.types';
import styles from '../styles/page.module.css';

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  article,
  breadcrumbs,
  className = ''
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorInitials = (author: any) => {
    return `${author.firstName?.[0] || ''}${author.lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <div className={`${className}`}>
      {/* Breadcrumbs */}
      <Breadcrumb
        items={breadcrumbs}
        showHomeIcon={false}
        maxItems={5}
      />

      {/* Article Header */}
      <header className={styles.articleHeader}>
        {/* Category Badge */}
        {article.category && (
          <div className={styles.categoryBadge}>
            {article.category.name}
          </div>
        )}

        {/* Article Title */}
        <h1 className={styles.articleTitle}>
          {article.title}
        </h1>

        {/* Article Excerpt */}
        {article.excerpt && (
          <p style={{
            fontSize: '1.125rem',
            opacity: 0.9,
            marginBottom: '1.5rem',
            lineHeight: 1.6
          }}>
            {article.excerpt}
          </p>
        )}

        {/* Article Metadata */}
        <div className={styles.articleMeta}>
          {/* Author */}
          {article.author && (
            <div className={styles.metaItem}>
              <User size={16} />
              <span>
                {article.author.firstName} {article.author.lastName}
              </span>
            </div>
          )}

          {/* Published Date */}
          {article.publishedAt && (
            <div className={styles.metaItem}>
              <Calendar size={16} />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          )}

          {/* Reading Time */}
          {article.readingTime && (
            <div className={styles.metaItem}>
              <Clock size={16} />
              <span>{article.readingTime} phút đọc</span>
            </div>
          )}

          {/* View Count */}
          <div className={styles.metaItem}>
            <Eye size={16} />
            <span>{article.viewCount.toLocaleString()} lượt xem</span>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className={styles.metaItem}>
              <Tag size={16} />
              <span>
                {Array.isArray(article.tags)
                  ? article.tags.slice(0, 2).map((tag: any) =>
                      typeof tag === 'string' ? tag : tag.name
                    ).join(', ')
                  : (article.tags as string[]).slice(0, 2).join(', ')
                }
                {article.tags.length > 2 && ` +${article.tags.length - 2}`}
              </span>
            </div>
          )}
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div style={{ 
            marginTop: '2rem',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <img
              src={typeof article.featuredImage === 'string'
                ? article.featuredImage
                : article.featuredImage?.url || ''
              }
              alt={article.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '400px',
                objectFit: 'cover'
              }}
              loading="eager" // Load immediately for featured image
            />
          </div>
        )}
      </header>
    </div>
  );
};

export default ArticleHeader;
