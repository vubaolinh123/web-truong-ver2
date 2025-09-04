'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

// Fallback placeholder to avoid broken UI
const FALLBACK_IMAGE_SRC = '/images/placeholder.png';

export interface BannerImageProps extends Omit<ImageProps, 'src' | 'objectFit' | 'objectPosition'> {
  src: string | null | undefined;
  // Optional: allow overriding objectFit/objectPosition/aspect ratio if needed later
  objectFit?: React.CSSProperties['objectFit'];
  objectPosition?: React.CSSProperties['objectPosition'];
}

/**
 * BannerImage
 * Dedicated image component for homepage banner.
 * - Ensures full-width display without side gaps
 * - Keeps entire image visible (no cropping) and maintains aspect ratio
 * - Works responsively with the banner container's aspect-ratio
 */
const BannerImage: React.FC<BannerImageProps> = ({
  src,
  alt,
  objectFit = 'contain',
  objectPosition = 'center center',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw',
  priority,
  loading,
  ...rest
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src || FALLBACK_IMAGE_SRC);

  useEffect(() => {
    setImageSrc(src || FALLBACK_IMAGE_SRC);
  }, [src]);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes={sizes}
      style={{ objectFit, objectPosition }}
      priority={priority}
      loading={loading}
      onError={() => setImageSrc(FALLBACK_IMAGE_SRC)}
      {...rest}
    />
  );
};

export default BannerImage;

