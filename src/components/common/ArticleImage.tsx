/**
 * Article Image Component
 * Reusable component để hiển thị article images với proper fallback
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Eye, ImageIcon } from 'lucide-react';
import { FeaturedImage } from '@/types/articles';

interface ArticleImageProps {
  featuredImage?: string | FeaturedImage;
  title: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  fallbackIcon?: 'eye' | 'image';
  fallbackSize?: number;

  priority?: boolean;
  sizes?: string;
  loading?: 'eager' | 'lazy';
}

const ArticleImage: React.FC<ArticleImageProps> = ({
  featuredImage,
  title,
  width,
  height,
  fill = false,
  className = '',
  fallbackIcon = 'eye',
  fallbackSize = 48,
  priority = false,
  sizes,
  loading
}) => {
  // Helper function to resolve the image URL
  const getImageUrl = (img?: string | FeaturedImage): string => {
    const placeholder = '/images/placeholder.png';

    let relativeUrl: string | null = null;
    if (typeof img === 'string') {
      relativeUrl = img.trim() !== '' ? img : null;
    } else if (img?.url) {
      relativeUrl = img.url.trim() !== '' ? img.url : null;
    }

    if (!relativeUrl) {
      return placeholder;
    }

    if (relativeUrl.startsWith('http')) {
      return relativeUrl;
    }

    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api\/?$/, '');
    const finalRelativeUrl = relativeUrl.startsWith('/') ? relativeUrl : `/${relativeUrl}`;

    return `${baseUrl}/api${finalRelativeUrl.startsWith('/api') ? finalRelativeUrl.substring(4) : finalRelativeUrl}`;
  };

  // Helper function to get image alt text
  const getImageAlt = (img?: string | FeaturedImage): string => {
    if (!img || typeof img === 'string') return title || 'Article image';
    return img.alt || title || 'Article image';
  };

  const imageUrl = getImageUrl(featuredImage);
  const hasValidImage = imageUrl !== '/images/placeholder.png';

  // Fallback icon component
  const FallbackIcon = fallbackIcon === 'image' ? ImageIcon : Eye;

  if (hasValidImage) {
    const commonProps = {
      className: `object-cover ${className}`,
      priority: priority || false,
      loading,
      onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        (e.target as HTMLImageElement).src = '/images/placeholder.png';
      },
    };

    if (fill) {
      return <Image src={imageUrl} alt={getImageAlt(featuredImage)} fill sizes={sizes} {...commonProps} />;
    }

    return <Image src={imageUrl} alt={getImageAlt(featuredImage)} width={width || 400} height={height || 300} {...commonProps} />;
  }

  // Fallback when no image is available
  return (
    <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
      <FallbackIcon
        size={fallbackSize}
        className="text-gray-400"
      />
    </div>
  );
};

export default ArticleImage;
