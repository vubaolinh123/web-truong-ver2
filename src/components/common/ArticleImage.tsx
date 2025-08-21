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
  sizes
}) => {
  // Helper function to get image URL
  const getImageUrl = (img?: string | FeaturedImage): string | null => {
    if (!img) return null;
    if (typeof img === 'string') return img.trim() !== '' ? img : null;
    return img.url && img.url.trim() !== '' ? img.url : null;
  };

  // Helper function to get image alt text
  const getImageAlt = (img?: string | FeaturedImage): string => {
    if (!img || typeof img === 'string') return title || 'Article image';
    return img.alt || title || 'Article image';
  };

  // Check if we have a valid image URL
  const imageUrl = getImageUrl(featuredImage);
  const hasValidImage = !!imageUrl;

  // Fallback icon component
  const FallbackIcon = fallbackIcon === 'image' ? ImageIcon : Eye;

  if (hasValidImage) {
    const imageProps: any = {
      src: imageUrl,
      alt: getImageAlt(featuredImage),
      className: `object-cover ${className}`,
      priority
    };

    if (fill) {
      imageProps.fill = true;
      if (sizes) {
        imageProps.sizes = sizes;
      }
    } else {
      imageProps.width = width || 400;
      imageProps.height = height || 300;
    }

    return <Image {...imageProps} />;
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
