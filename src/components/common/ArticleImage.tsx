/**
 * Article Image Component
 * Reusable component để hiển thị article images với proper fallback
 */

'use client';

import React from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { FeaturedImage } from '@/types/articles';

interface ArticleImageProps {
  featuredImage?: string | FeaturedImage;
  title: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  loading?: 'eager' | 'lazy';
}

const ArticleImage: React.FC<ArticleImageProps> = ({
  featuredImage,
  title,
  ...props
}) => {
  // Resolve the image URL and alt text from the featuredImage prop
  const get_image_details = (img?: string | FeaturedImage) => {
    let relative_url: string | null = null;
    let alt_text: string = title || 'Article image';

    if (typeof img === 'string') {
      relative_url = img.trim() !== '' ? img : null;
    } else if (img?.url) {
      relative_url = img.url.trim() !== '' ? img.url : null;
      alt_text = img.alt || alt_text;
    }

    // If there's no relative URL, return null to trigger the fallback in OptimizedImage
    if (!relative_url) {
      return { src: null, alt: alt_text };
    }

    // Construct the full URL for the image
    const base_url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api\/?$/, '');
    const full_url = relative_url.startsWith('http') ? relative_url : `${base_url}${relative_url}`;

    return { src: full_url, alt: alt_text };
  };

  const { src, alt } = get_image_details(featuredImage);

  return <OptimizedImage src={src} alt={alt} {...props} />;
};

export default ArticleImage;
