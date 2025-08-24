'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { ImageData } from './ImageCard';

interface ImagePreviewModalProps {
  image: ImageData | null;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!image) return null;

    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '')}${image.url}`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-4 rounded-lg shadow-xl max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 p-2 bg-white text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={24} />
        </button>
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <Image
            src={fullUrl}
            alt={`Preview of ${image.filename}`}
            width={1200}
            height={800}
            className="max-w-full max-h-[80vh] object-contain"
          />
        </div>
        <p className="mt-2 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{image.filename}</p>
      </div>
    </div>
  );
};

export default ImagePreviewModal;

