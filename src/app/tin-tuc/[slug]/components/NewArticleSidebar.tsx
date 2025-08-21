/**
 * New Article Sidebar Component
 * Complete redesign with wide layout and enhanced article cards
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react';
import { Article } from '@/types/articles';
import styles from '../styles/new-sidebar.module.css';

interface NewArticleSidebarProps {
  relatedArticles: Article[];
  currentArticleId: string;
  loading?: boolean;
  error?: string | null;
  className?: string;
}

const NewArticleSidebar: React.FC<NewArticleSidebarProps> = ({
  relatedArticles,
  currentArticleId,
  loading = false,
  error = null,
  className = ''
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getImageSrc = (featuredImage: any) => {
    if (!featuredImage) return '/images/default-article.jpg';
    return typeof featuredImage === 'string' ? featuredImage : featuredImage?.url || '/images/default-article.jpg';
  };

  const getTagName = (tag: any) => {
    return typeof tag === 'string' ? tag : tag?.name || '';
  };

  // Filter out current article and limit to 6
  const filteredArticles = relatedArticles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 6);

  if (loading) {
    return (
      <aside className={`${styles.sidebar} ${className}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.sectionHeader}>
            <div className={styles.loadingTitle} />
          </div>
          <div className={styles.articlesGrid}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.loadingCard}>
                <div className={styles.loadingImage} />
                <div className={styles.loadingContent}>
                  <div className={styles.loadingLine} />
                  <div className={styles.loadingLine} style={{ width: '80%' }} />
                  <div className={styles.loadingLine} style={{ width: '60%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className={`${styles.sidebar} ${className}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Bài viết liên quan</h2>
          </div>
          <div className={styles.emptyState}>
            <p style={{ color: '#ef4444' }}>Có lỗi khi tải bài viết liên quan</p>
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{error}</p>
          </div>
        </div>
      </aside>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <aside className={`${styles.sidebar} ${className}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Bài viết liên quan</h2>
          </div>
          <div className={styles.emptyState}>
            <p>Không có bài viết liên quan</p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`${styles.sidebar} ${className}`}>
      <div className={styles.sidebarContent}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Bài viết liên quan</h2>
          <Link href="/tin-tuc" className={styles.viewAllLink}>
            <span>Xem tất cả</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className={styles.articlesGrid}>
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/tin-tuc/${article.slug}`}
              className={styles.articleCard}
            >
              {/* Featured Image */}
              <div className={styles.imageContainer}>
                <img
                  src={getImageSrc(article.featuredImage)}
                  alt={article.title}
                  className={styles.articleImage}
                  loading="lazy"
                />
                {/* Category Badge */}
                {article.category && (
                  <div className={styles.categoryBadge}>
                    {article.category.name}
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className={styles.cardContent}>
                {/* Title */}
                <h3 className={styles.articleTitle}>
                  {article.title}
                </h3>

                {/* Excerpt */}
                {article.excerpt && (
                  <p className={styles.articleExcerpt}>
                    {article.excerpt}
                  </p>
                )}

                {/* Metadata */}
                <div className={styles.articleMeta}>
                  {/* Author */}
                  {article.author && (
                    <div className={styles.metaItem}>
                      <User size={12} />
                      <span>{article.author.firstName} {article.author.lastName}</span>
                    </div>
                  )}

                  {/* Date */}
                  {article.publishedAt && (
                    <div className={styles.metaItem}>
                      <Calendar size={12} />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                  )}

                  {/* Reading Time */}
                  {article.readingTime && (
                    <div className={styles.metaItem}>
                      <Clock size={12} />
                      <span>{article.readingTime} phút</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className={styles.tagsContainer}>
                    <Tag size={12} />
                    <div className={styles.tags}>
                      {Array.isArray(article.tags) 
                        ? article.tags.slice(0, 2).map((tag: any, index) => (
                            <span key={index} className={styles.tag}>
                              {getTagName(tag)}
                            </span>
                          ))
                        : (article.tags as string[]).slice(0, 2).map((tag, index) => (
                            <span key={index} className={styles.tag}>
                              {tag}
                            </span>
                          ))
                      }
                      {article.tags.length > 2 && (
                        <span className={styles.moreTagsIndicator}>
                          +{article.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            Khám phá thêm nhiều bài viết thú vị khác
          </p>
          <Link href="/tin-tuc" className={styles.ctaButton}>
            <span>Xem tất cả tin tức</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default NewArticleSidebar;
