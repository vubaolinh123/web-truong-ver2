'use client';

import React from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { Copy, Trash2, Calendar, FileBox } from 'lucide-react';

export interface ImageData {
  filename: string;
  url: string;
  size: number;
  createdAt: string;
}

interface ImageCardProps {
  image: ImageData;
  onCopy: (url: string) => void;
  onDelete: (image: ImageData) => void;
  isSelected: boolean;
  onSelect: (filename: string) => void;
  onPreview: (image: ImageData) => void;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const ImageCard: React.FC<ImageCardProps> = ({ image, onCopy, onDelete, isSelected, onSelect, onPreview }) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '')}${image.url}`;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent click from propagating from buttons or checkbox
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    onPreview(image);
  };

  return (
    <div
      className={`relative border rounded-lg overflow-hidden flex flex-col bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'}`}
      onClick={handleCardClick}
    >
      <div className="absolute top-2 right-2 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(image.filename)}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white bg-opacity-75 cursor-pointer"
        />
      </div>
      <div className="p-0 pointer-events-none">
        <OptimizedImage
          src={fullUrl}
          alt={image.filename}
          width={400}
          height={300}
          loading="lazy"
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4 flex-grow pointer-events-none">
        <p className="text-sm font-semibold truncate text-gray-800" title={image.filename}>
          {image.filename}
        </p>
        <div className="text-xs text-gray-500 mt-2 space-y-1">
          <div className="flex items-center">
            <FileBox className="h-3 w-3 mr-1.5" />
            <span>{formatBytes(image.size)}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1.5" />
            <span>{new Date(image.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>
      </div>
      <div className="p-2 border-t border-gray-100 bg-gray-50">
        <div className="w-full flex justify-end space-x-2">
          <button onClick={(e) => { e.stopPropagation(); onCopy(fullUrl); }} className="flex items-center px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            <Copy className="h-3 w-3 mr-1.5" />
            Sao chép
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(image); }} className="flex items-center px-3 py-1.5 text-xs font-medium text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700 transition-colors">
            <Trash2 className="h-3 w-3 mr-1.5" />
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;

