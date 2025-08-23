'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

// The path to the default placeholder image
const FALLBACK_IMAGE_SRC = '/images/placeholder.png';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string | undefined | null;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, ...props }) => {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE_SRC);

  useEffect(() => {
    setImageSrc(src || FALLBACK_IMAGE_SRC);
  }, [src]);

  const handleError = () => {
    // If there is an error, switch to the placeholder image
    setImageSrc(FALLBACK_IMAGE_SRC);
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};

export default OptimizedImage;

