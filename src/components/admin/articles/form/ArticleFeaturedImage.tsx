/**
 * Article Featured Image Upload Component
 * Handles image upload with preview and validation
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { articlesApi } from '@/lib/api/articles';
import Image from 'next/image';
import { Upload, Image as ImageIcon, X, Camera } from 'lucide-react';

interface ArticleFeaturedImageProps {
  featuredImage: string | null;
  onImageChange: (image: string | null) => void;
  onImageUrlChange?: (url: string) => void;
  errors?: {
    featuredImage?: string;
  };
}

const ArticleFeaturedImage: React.FC<ArticleFeaturedImageProps> = ({
  featuredImage,
  onImageChange,
  onImageUrlChange,
  errors = {}
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(featuredImage);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ROOT_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace('/api', '');
    if (featuredImage) {
      const absoluteUrl = featuredImage.startsWith('http')
        ? featuredImage
        : `${ROOT_URL}${featuredImage}`;
      setPreviewUrl(absoluteUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [featuredImage]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file hình ảnh');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Kích thước file không được vượt quá 5MB');
      return;
    }

    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setUploading(true);
    setError(null);

    try {
      const response = await articlesApi.uploadImage(file);
      if (response.status === 'success' && response.data.url) {
        const ROOT_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace('/api', '');
        const relativeUrl = response.data.url;
        const absoluteUrl = `${ROOT_URL}${relativeUrl}`;
        setPreviewUrl(absoluteUrl);
        onImageChange(relativeUrl);
      } else {
        throw new Error((response as any).message || 'Lỗi không xác định trong quá trình tải lên');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Không thể tải lên hình ảnh.';
      setError(errorMessage);
      setPreviewUrl(null);
      onImageChange(null);
    } finally {
      setUploading(false);
      // Clean up the object URL to avoid memory leaks
      URL.revokeObjectURL(preview);
    }
  };


  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveImage = async () => {
    if (featuredImage) {
      try {
        // Since all images are now permanent, we always call deleteImage
        const response = await articlesApi.deleteImage(featuredImage);
        if (response && response.status === 'success') {
          toast.success(response.message || 'Đã xóa ảnh thành công.');
        }
      } catch (err: any) {
        console.error('Failed to delete image:', err);
        // Correctly parse the error message from the API response
        const errorMessage = err.response?.data?.message || err.message || 'Đã xảy ra lỗi khi xóa ảnh.';
        toast.error(errorMessage);
      }
    }

    // Always clear the UI state immediately for a responsive user experience
    setPreviewUrl(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <ImageIcon size={20} className="text-purple-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Hình ảnh đại diện</h2>
      </div>

      <div className="space-y-4">
        {/* Image Preview or Upload Area */}
        {previewUrl ? (
          <div className="relative">
            <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={previewUrl}
                alt="Featured image preview"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Remove Button */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 shadow-lg"
            >
              <X size={16} />
            </button>

            {/* Image Info */}
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Hình ảnh đã chọn</span>
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Thay đổi
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
              ${dragOver
                ? 'border-blue-400 bg-blue-50'
                : (errors.featuredImage || error)
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
          >
            {uploading ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                <p className="text-lg font-medium text-gray-700">Đang tải lên...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Camera size={24} className="text-gray-400" />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tải lên hình ảnh đại diện
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Kéo thả file vào đây hoặc click để chọn file
                  </p>

                  <button
                    type="button"
                    onClick={handleUploadClick}
                    disabled={uploading}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Upload size={20} />
                    <span>{'Chọn hình ảnh'}</span>
                  </button>
                </div>

                <div className="text-xs text-gray-400">
                  <p>Định dạng: JPG, PNG, GIF</p>
                  <p>Kích thước tối đa: 5MB</p>
                  <p>Kích thước khuyến nghị: 1200x630px</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-600 mt-2">Tải lên thất bại: {error}</p>
        )}
        {errors.featuredImage && (
          <p className="text-sm text-red-600">{errors.featuredImage}</p>
        )}

        {/* Image Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Hướng dẫn chọn hình ảnh:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Chọn hình ảnh có chất lượng cao, rõ nét</li>
            <li>• Hình ảnh nên liên quan đến nội dung bài viết</li>
            <li>• Tỷ lệ khung hình 16:9 hoặc 4:3 sẽ hiển thị đẹp nhất</li>
            <li>• Tránh sử dụng hình ảnh có bản quyền</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArticleFeaturedImage;
