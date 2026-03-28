'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import OptimizedImage from '@/components/ui/OptimizedImage';
import toast from 'react-hot-toast';

type GallerySlot = 'co-so-vat-chat' | 'hoat-dong-sinh-vien' | 'thu-vien' | 'phong-thuc-hanh';

interface GalleryImage {
  slot: GallerySlot;
  label: string;
  imageUrl: string;
  updatedAt?: string | null;
}

const SLOT_CONFIG: Array<{ slot: GallerySlot; label: string }> = [
  { slot: 'co-so-vat-chat', label: 'Cơ sở vật chất' },
  { slot: 'hoat-dong-sinh-vien', label: 'Hoạt động sinh viên' },
  { slot: 'thu-vien', label: 'Thư viện' },
  { slot: 'phong-thuc-hanh', label: 'Phòng thực hành' },
];

const resolveImageUrl = (imageUrl?: string) => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) return imageUrl;
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api\/?$/, '');
  return `${baseUrl}${imageUrl}`;
};

const AdminGalleryPage = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingSlot, setUploadingSlot] = useState<GallerySlot | null>(null);
  const inputRefs = useRef<Record<GallerySlot, HTMLInputElement | null>>({
    'co-so-vat-chat': null,
    'hoat-dong-sinh-vien': null,
    'thu-vien': null,
    'phong-thuc-hanh': null,
  });

  const fetchGalleryImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`, { cache: 'no-store' });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Không thể tải dữ liệu thư viện ảnh.');
      }

      setGalleryImages(Array.isArray(data?.data?.galleryImages) ? data.data.galleryImages : []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Đã có lỗi xảy ra.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGalleryImages();
  }, [fetchGalleryImages]);

  const imageBySlot = useMemo(() => {
    const map = new Map<GallerySlot, GalleryImage>();
    for (const image of galleryImages) {
      map.set(image.slot, image);
    }
    return map;
  }, [galleryImages]);

  const handleUpload = async (slot: GallerySlot, file?: File) => {
    if (!file) return;

    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('Không tìm thấy token xác thực admin.');
      return;
    }

    setUploadingSlot(slot);
    const toastId = toast.loading('Đang cập nhật ảnh...');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery/${slot}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || 'Cập nhật ảnh thất bại.');
      }

      toast.success('Cập nhật ảnh thành công.', { id: toastId });
      await fetchGalleryImages();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Đã có lỗi xảy ra.';
      toast.error(message, { id: toastId });
    } finally {
      setUploadingSlot(null);
    }
  };

  const triggerSlotInput = (slot: GallerySlot) => {
    inputRefs.current[slot]?.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý hình ảnh trường</h1>
          <p className="text-sm text-gray-500 mt-1">Cập nhật 4 ảnh hiển thị tại mục &quot;Hình ảnh trường&quot; trên trang chủ.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SLOT_CONFIG.map(({ slot, label }) => {
            const current = imageBySlot.get(slot);
            const imageUrl = resolveImageUrl(current?.imageUrl);
            const isUploading = uploadingSlot === slot;

            return (
              <div key={slot} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                <input
                  ref={(el) => {
                    inputRefs.current[slot] = el;
                  }}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    void handleUpload(slot, file);
                    event.currentTarget.value = '';
                  }}
                />

                <div className="relative h-52 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  {imageUrl ? (
                    <OptimizedImage
                      src={imageUrl}
                      alt={`${label} - Trường Cao đẳng Thông tin và Truyền thông`}
                      width={600}
                      height={320}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                      Chưa có ảnh cho mục này
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-gray-800">{current?.label || label}</h2>
                    {current?.updatedAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Cập nhật: {new Date(current.updatedAt).toLocaleString('vi-VN')}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => triggerSlotInput(slot)}
                    disabled={loading || isUploading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isUploading ? 'Đang tải...' : 'Đổi ảnh'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminGalleryPage;
