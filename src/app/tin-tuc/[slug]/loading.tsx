/**
 * Loading Page for Article Detail
 * Optimized loading state with skeleton UI
 */

import React from 'react';
import styles from './styles/page.module.css';

export default function Loading() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        {/* Main Content Skeleton */}
        <main className={styles.mainContent}>
          {/* Header Skeleton */}
          <div className={styles.articleHeader}>
            {/* Category Badge Skeleton */}
            <div style={{
              width: '80px',
              height: '24px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              marginBottom: '1rem',
              animation: 'pulse 2s infinite'
            }} />
            
            {/* Title Skeleton */}
            <div style={{
              width: '90%',
              height: '3rem',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              marginBottom: '1rem',
              animation: 'pulse 2s infinite'
            }} />
            
            {/* Excerpt Skeleton */}
            <div style={{
              width: '75%',
              height: '1.5rem',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              animation: 'pulse 2s infinite'
            }} />
            
            {/* Meta Skeleton */}
            <div style={{
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '120px',
                    height: '20px',
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '4px',
                    animation: 'pulse 2s infinite',
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            
            {/* Featured Image Skeleton */}
            <div style={{
              width: '100%',
              height: '300px',
              background: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              marginTop: '2rem',
              animation: 'pulse 2s infinite'
            }} />
          </div>
          
          {/* Content Skeleton */}
          <div className={styles.articleBody}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: i % 3 === 0 ? '100%' : i % 2 === 0 ? '85%' : '95%',
                  height: '1.5rem',
                  background: '#f3f4f6',
                  borderRadius: '4px',
                  marginBottom: '1rem',
                  animation: 'pulse 2s infinite',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </main>

        {/* Sidebar Skeleton */}
        <aside className={styles.sidebar}>
          {/* Social Share Skeleton */}
          <div className={styles.socialShare}>
            <div style={{
              width: '120px',
              height: '1.5rem',
              background: '#f3f4f6',
              borderRadius: '4px',
              marginBottom: '1rem',
              marginTop: '4px',
              animation: 'pulse 2s infinite'
            }} />
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#f3f4f6',
                    borderRadius: '8px',
                    animation: 'pulse 2s infinite',
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Author Card Skeleton */}
          <div className={styles.authorCard}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#f3f4f6',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }} />
              <div style={{ flex: 1 }}>
                <div style={{
                  width: '80px',
                  height: '1rem',
                  background: '#f3f4f6',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                  animation: 'pulse 2s infinite'
                }} />
                <div style={{
                  width: '60px',
                  height: '0.875rem',
                  background: '#f3f4f6',
                  borderRadius: '4px',
                  animation: 'pulse 2s infinite'
                }} />
              </div>
            </div>
            <div style={{
              width: '100%',
              height: '3rem',
              background: '#f3f4f6',
              borderRadius: '4px',
              animation: 'pulse 2s infinite'
            }} />
          </div>
          
          {/* Related Articles Skeleton */}
          <div className={styles.relatedArticles}>
            <div style={{
              width: '140px',
              height: '1.5rem',
              background: '#f3f4f6',
              borderRadius: '4px',
              marginBottom: '1rem',
              animation: 'pulse 2s infinite'
            }} />
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  padding: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}
              >
                <div style={{
                  width: '90%',
                  height: '1rem',
                  background: '#f3f4f6',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                  animation: 'pulse 2s infinite',
                  animationDelay: `${i * 0.1}s`
                }} />
                <div style={{
                  width: '70px',
                  height: '0.75rem',
                  background: '#f3f4f6',
                  borderRadius: '4px',
                  animation: 'pulse 2s infinite',
                  animationDelay: `${i * 0.1 + 0.1}s`
                }} />
              </div>
            ))}
          </div>
        </aside>
      </div>
      
      {/* Loading indicator */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        zIndex: 1000
      }}>
        <div className={styles.loadingSpinner} style={{ margin: '0 auto 1rem auto' }} />
        <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
          Đang tải bài viết...
        </p>
      </div>
    </div>
  );
}
