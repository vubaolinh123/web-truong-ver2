/**
 * Social Share Component
 * Provides social media sharing functionality
 */

'use client';

import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { SocialShareProps } from '../types/article.types';
import styles from '../styles/page.module.css';

const SocialShare: React.FC<SocialShareProps> = ({
  shareData,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.title)}${shareData.hashtags ? `&hashtags=${shareData.hashtags.join(',')}` : ''}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    const url = shareUrls[platform];
    window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareData.url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (typeof window !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.description,
          url: shareData.url
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className={`${styles.socialShare} ${className}`}>
      <h3 className={styles.shareTitle}>Chia sẻ bài viết</h3>
      
      <div className={styles.shareButtons}>
        {/* Facebook */}
        <button
          onClick={() => handleShare('facebook')}
          className={`${styles.shareButton} ${styles.facebook}`}
          title="Chia sẻ lên Facebook"
          aria-label="Chia sẻ lên Facebook"
        >
          <Facebook size={18} />
        </button>

        {/* Twitter */}
        <button
          onClick={() => handleShare('twitter')}
          className={`${styles.shareButton} ${styles.twitter}`}
          title="Chia sẻ lên Twitter"
          aria-label="Chia sẻ lên Twitter"
        >
          <Twitter size={18} />
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare('linkedin')}
          className={`${styles.shareButton} ${styles.linkedin}`}
          title="Chia sẻ lên LinkedIn"
          aria-label="Chia sẻ lên LinkedIn"
        >
          <Linkedin size={18} />
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`${styles.shareButton} ${styles.copy}`}
          title={copied ? "Đã sao chép!" : "Sao chép liên kết"}
          aria-label={copied ? "Đã sao chép!" : "Sao chép liên kết"}
        >
          {copied ? <Check size={18} /> : <Link2 size={18} />}
        </button>

        {/* Native Share (mobile) */}
        {typeof window !== 'undefined' && 'share' in navigator && (
          <button
            onClick={handleNativeShare}
            className={`${styles.shareButton}`}
            style={{ background: '#10b981' }}
            title="Chia sẻ"
            aria-label="Chia sẻ"
          >
            📤
          </button>
        )}
      </div>

      {/* Share count or additional info */}
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.75rem', 
        color: '#6b7280',
        textAlign: 'center'
      }}>
        Chia sẻ để giúp nhiều người biết đến bài viết này
      </div>
    </div>
  );
};

export default SocialShare;
