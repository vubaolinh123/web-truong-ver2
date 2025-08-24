'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { Images, Image as ImageIcon, AlertCircle, Trash2, Upload } from 'lucide-react';
import ImageCard, { ImageData } from './components/ImageCard';
import PaginationControls from './components/PaginationControls';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import ImagePreviewModal from './components/ImagePreviewModal';
import ImageFilters, { FilterState } from './components/ImageFilters';
import toast from 'react-hot-toast';

const MediaManagementPage = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalImages: 0,
    limit: 30,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state management
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    type: 'single' as 'single' | 'bulk',
    image: null as ImageData | null,
    isLoading: false,
  });
  const [previewImage, setPreviewImage] = useState<ImageData | null>(null);
  const [filters, setFilters] = useState<FilterState>({ startDate: '', endDate: '', minSize: '', maxSize: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async (page = 1, limit = 30, currentFilters: FilterState) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('Authentication token not found.');

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (currentFilters.startDate) params.append('startDate', currentFilters.startDate);
      if (currentFilters.endDate) params.append('endDate', currentFilters.endDate);
      if (currentFilters.minSize) params.append('minSize', currentFilters.minSize);
      if (currentFilters.maxSize) params.append('maxSize', currentFilters.maxSize);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch images.');

      const data = await response.json();
      setImages(data.data.images);
      setPagination(data.data.pagination);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(msg);
      toast.error(`Lỗi: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(pagination.currentPage, pagination.limit, filters);
  }, [fetchImages, pagination.currentPage, pagination.limit, filters]);

  const handleSelectImage = (filename: string) => {
    setSelectedImages(prev =>
      prev.includes(filename)
        ? prev.filter(f => f !== filename)
        : [...prev, filename]
    );
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Đã sao chép URL vào clipboard!');
  };

  const handleDeleteImage = (image: ImageData) => {
    setDeleteModal({
      isOpen: true,
      type: 'single',
      image: image,
      isLoading: false,
    });
  };

  const performDelete = async (filename: string) => {
    const toastId = toast.loading('Đang xóa ảnh...');
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('Authentication token not found.');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ filename }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.error((t) => (
            <div className="max-w-xl">
              <p className="font-semibold break-all">Không thể xóa: {filename}</p>
              <p className="text-sm mt-1">Ảnh này đang được sử dụng trong các bài viết sau:</p>
              <ul className="text-xs list-disc list-inside mt-2 space-y-1">
                {data.data.articles.map((article: { id: string; title: string; slug: string }) => (
                  <li key={article.id}>
                    <Link href={`/admin/articles/${article.id}/edit`} className="text-blue-600 hover:underline" onClick={() => toast.dismiss(t.id)}>
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ), { id: toastId, duration: 10000 });
        } else {
          throw new Error(data.message || 'Failed to delete image.');
        }
      } else {
        toast.success('Ảnh đã được xóa thành công.', { id: toastId });
        fetchImages(pagination.currentPage, pagination.limit, filters);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred.';
      toast.error(`Lỗi: ${msg}`, { id: toastId });
    }
  };

  const handleBulkDelete = () => {
    setDeleteModal({
      isOpen: true,
      type: 'bulk',
      image: null,
      isLoading: false,
    });
  };

  // Modal handlers
  const handleModalClose = () => {
    if (!deleteModal.isLoading) {
      setDeleteModal({
        isOpen: false,
        type: 'single',
        image: null,
        isLoading: false,
      });
    }
  };

  const handleModalConfirm = async () => {
    setDeleteModal(prev => ({ ...prev, isLoading: true }));

    try {
      if (deleteModal.type === 'single' && deleteModal.image) {
        await performDelete(deleteModal.image.filename);
      } else if (deleteModal.type === 'bulk') {
        await performBulkDelete();
      }
      handleModalClose();
    } catch (error) {
      setDeleteModal(prev => ({ ...prev, isLoading: false }));
    }
  };

  const performBulkDelete = async () => {
    const toastId = toast.loading(`Đang xóa ${selectedImages.length} ảnh...`);
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('Authentication token not found.');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/bulk-delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ filenames: selectedImages }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Bulk delete failed.');

      const { deleted, failed } = data.data;
      const failedCount = Object.keys(failed).length;

      if (failedCount > 0) {
        // Show detailed error information for failed deletions
        toast.error(() => (
          <div className="max-w-lg">
            <p className="font-semibold mb-2">
              Kết quả xóa: {deleted.length} thành công, {failedCount} thất bại
            </p>
            {deleted.length > 0 && (
              <p className="text-sm text-green-600 mb-2">
                ✅ Đã xóa thành công: {deleted.join(', ')}
              </p>
            )}
            <div className="text-sm">
              <p className="font-medium text-red-600 mb-1">❌ Xóa thất bại:</p>
              <ul className="text-xs list-disc list-inside space-y-1">
                {Object.entries(failed).map(([filename, reason]) => (
                  <li key={filename} className="break-words">
                    <span className="font-medium">{filename}:</span> {String(reason)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ), { id: toastId, duration: 12000 });
      } else {
        toast.success(`Đã xóa thành công ${deleted.length} ảnh.`, { id: toastId });
      }

      setSelectedImages([]);
      fetchImages(pagination.currentPage, pagination.limit, filters);

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred.';
      toast.error(`Lỗi: ${msg}`, { id: toastId });
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
    setSelectedImages([]);
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
  };

  const handleClearFilters = () => {
    setFilters({ startDate: '', endDate: '', minSize: '', maxSize: '' });
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    setPagination(prev => ({
      ...prev,
      limit: newLimit,
      currentPage: 1, // Reset to first page
    }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('Authentication token not found.');
      return;
    }

    const uploadPromises = Array.from(files).map(file => {
      const toastId = toast.loading(`Đang tải lên ${file.name}...`);
      const formData = new FormData();
      formData.append('image', file);

      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      .then(async response => {
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Upload failed');
        }
        return response.json();
      })
      .then(() => {
        toast.success(`${file.name} đã được tải lên thành công!`, { id: toastId });
      })
      .catch((err) => {
        toast.error(`Tải lên ${file.name} thất bại: ${err.message}`, { id: toastId });
      });
    });

    await Promise.all(uploadPromises);
    fetchImages(1, pagination.limit, filters); // Refresh the list on the first page
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const renderContent = () => {
    if (loading) return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{Array.from({ length: 12 }).map((_, i) => <div key={i} className="w-full h-64 rounded-lg bg-gray-200 animate-pulse" />)}</div>;
    if (error) return <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-md flex"><AlertCircle className="h-5 w-5 text-red-400 mr-3" /><div className="text-sm text-red-700"><b>Lỗi:</b> {error}</div></div>;
    if (images.length === 0) return <div className="text-center py-16 bg-gray-50 rounded-lg"><ImageIcon className="mx-auto h-12 w-12 text-gray-400" /><h3 className="mt-2 text-sm font-medium text-gray-900">Không có ảnh nào</h3><p className="mt-1 text-sm text-gray-500">Chưa có ảnh nào được tải lên.</p></div>;
    return <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {images.map((image) => <ImageCard key={image.filename} image={image} onCopy={handleCopyUrl} onDelete={handleDeleteImage} isSelected={selectedImages.includes(image.filename)} onSelect={handleSelectImage} onPreview={setPreviewImage} />)}
    </div>;
  };

  return (
    <AdminLayout>
      <div className="p-6">
                <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept="image/jpeg,image/png,image/gif,image/webp"
        />
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Images className="h-6 w-6 text-blue-600" /></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Quản lý Media</h1>
              <p className="text-sm text-gray-500">{`Hiển thị ${images.length} trên tổng số ${pagination.totalImages} hình ảnh`}</p>
            </div>
          </div>
                    <div className="flex items-center space-x-2">
            <button onClick={triggerFileInput} className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              <Upload className="h-4 w-4 mr-2" />
              Tải lên ảnh mới
            </button>
            {selectedImages.length > 0 && (
            <button onClick={handleBulkDelete} className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa {selectedImages.length} mục đã chọn
            </button>
          )}
          </div>
        </div>
        <ImageFilters onApply={handleApplyFilters} onClear={handleClearFilters} />
        {renderContent()}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Hiển thị:</span>
            <select
              value={pagination.limit}
              onChange={handleLimitChange}
              className="p-2 border rounded-md bg-white text-sm"
            >
              <option value={12}>12</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={90}>90</option>
            </select>
            <span className="text-sm text-gray-600">ảnh trên mỗi trang</span>
          </div>
          <PaginationControls currentPage={pagination.currentPage} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        title="Xác nhận xóa"
        message={
          deleteModal.type === 'single' && deleteModal.image
            ? `Bạn có chắc muốn xóa <b>${deleteModal.image.filename}</b>?`
            : `Xóa ${selectedImages.length} ảnh đã chọn?<br><span class="text-sm text-gray-600 mt-1">Hành động này không thể hoàn tác.</span>`
        }
        confirmText={deleteModal.type === 'single' ? 'Xóa' : 'Xác nhận xóa'}
        cancelText="Hủy"
        confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
        isLoading={deleteModal.isLoading}
      />

      {/* Image Preview Modal */}
      <ImagePreviewModal image={previewImage} onClose={() => setPreviewImage(null)} />
    </AdminLayout>
  );
};

export default MediaManagementPage;

