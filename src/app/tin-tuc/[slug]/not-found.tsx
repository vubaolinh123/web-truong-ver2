/**
 * Not Found Page for Article Detail
 * Custom 404 page for missing articles
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import styles from './styles/not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <main className={styles.mainContent}>
          <div className={styles.errorContainer}>
            {/* 404 Illustration */}
            <div className={styles.illustration}>
              <div className={styles.illustrationText}>
                404
              </div>

              {/* Decorative elements */}
              <div className={`${styles.decorativeElement1} ${styles.floatingElement}`} />
              <div className={`${styles.decorativeElement2} ${styles.floatingElementDelayed}`} />
            </div>

            {/* Error Message */}
            <h1 className={styles.errorTitle}>
              Bài viết không tồn tại
            </h1>

            <p className={styles.errorMessage}>
              Bài viết bạn đang tìm kiếm có thể đã bị xóa, di chuyển hoặc URL không chính xác.
              Hãy thử tìm kiếm hoặc quay về trang chủ.
            </p>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              {/* Back Button */}
              <button
                onClick={() => window.history.back()}
                className={styles.backButton}
              >
                <ArrowLeft size={16} />
                Quay lại
              </button>

              {/* Home Button */}
              <Link
                href="/"
                className={styles.homeButton}
              >
                <Home size={16} />
                Trang chủ
              </Link>

              {/* Search Button */}
              <Link
                href="/tin-tuc"
                className={styles.searchButton}
              >
                <Search size={16} />
                Tìm bài viết
              </Link>
            </div>

            {/* Suggestions */}
            <div className={styles.suggestions}>
              <h3 className={styles.suggestionsTitle}>
                Gợi ý cho bạn:
              </h3>
              <ul className={styles.suggestionsList}>
                <li>
                  <Link
                    href="/tin-tuc"
                    className={styles.suggestionLink}
                  >
                    • Xem tất cả tin tức mới nhất
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tin-tuc/danh-muc/cong-nghe"
                    className={styles.suggestionLink}
                  >
                    • Khám phá tin tức công nghệ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tin-tuc/danh-muc/giao-duc"
                    className={styles.suggestionLink}
                  >
                    • Đọc tin tức giáo dục
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
