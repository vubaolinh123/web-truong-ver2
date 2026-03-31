'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import OptimizedImage from '@/components/ui/OptimizedImage';
import toast from 'react-hot-toast';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Album {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImageUrl?: string;
  photoCount: number;
}

interface AlbumPhoto {
  _id: string;
  imageUrl: string;
  caption?: string;
}

interface PhotosResponse {
  photos: AlbumPhoto[];
  totalPages: number;
  currentPage: number;
  totalPhotos: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const resolveImageUrl = (imageUrl?: string): string => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) return imageUrl;
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api\/?$/, '');
  return `${baseUrl}${imageUrl}`;
};

const toSlug = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ýÿ]/g, 'y')
    .replace(/đ/g, 'd')
    // Vietnamese tones
    .replace(/[ăắặẵẫẳằẩấầẫậ]/g, 'a')
    .replace(/[ếệễểề]/g, 'e')
    .replace(/[ốộổỗồớợở]/g, 'o')
    .replace(/[ướựưở]/g, 'u')
    .replace(/[ị]/g, 'i')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

// ─── Page ─────────────────────────────────────────────────────────────────────

const AdminAlbumsPage = () => {
  // Album list state
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);

  // Create album form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [creating, setCreating] = useState(false);

  // Selected album & photos state
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [photos, setPhotos] = useState<AlbumPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [photosPage, setPhotosPage] = useState(1);
  const [photosTotalPages, setPhotosTotalPages] = useState(1);

  // Upload state
  const [uploadingAlbumId, setUploadingAlbumId] = useState<string | null>(null);
  const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement | null>(null);

  // ── Fetch albums ─────────────────────────────────────────────────────────────

  const fetchAlbums = useCallback(async () => {
    setLoadingAlbums(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Không thể tải danh sách album.');
      const list: Album[] = Array.isArray(data?.data?.albums)
        ? data.data.albums
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];
      setAlbums(list);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Đã có lỗi xảy ra.');
    } finally {
      setLoadingAlbums(false);
    }
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  // ── Fetch photos for selected album ──────────────────────────────────────────

  const fetchPhotos = useCallback(async (albumId: string, page: number) => {
    setLoadingPhotos(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/albums/${albumId}/photos?page=${page}&limit=20`,
        { cache: 'no-store' }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Không thể tải ảnh album.');
      const payload: PhotosResponse = data?.data ?? data;
      setPhotos(Array.isArray(payload?.photos) ? payload.photos : []);
      setPhotosTotalPages(payload?.totalPages ?? 1);
      setPhotosPage(payload?.currentPage ?? page);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Đã có lỗi xảy ra.');
    } finally {
      setLoadingPhotos(false);
    }
  }, []);

  const handleSelectAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setPhotosPage(1);
    void fetchPhotos(album._id, 1);
  };

  const handleCloseAlbum = () => {
    setSelectedAlbum(null);
    setPhotos([]);
    setPhotosPage(1);
    setPhotosTotalPages(1);
  };

  // ── Create album ─────────────────────────────────────────────────────────────

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormTitle(val);
    setFormSlug(toSlug(val));
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      toast.error('Vui lòng nhập tên album.');
      return;
    }
    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('Không tìm thấy token xác thực admin.');
      return;
    }
    setCreating(true);
    const toastId = toast.loading('Đang tạo album...');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formTitle.trim(),
          slug: formSlug || toSlug(formTitle.trim()),
          description: formDescription.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Tạo album thất bại.');
      toast.success('Tạo album thành công!', { id: toastId });
      setFormTitle('');
      setFormSlug('');
      setFormDescription('');
      setShowCreateForm(false);
      await fetchAlbums();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Đã có lỗi xảy ra.', { id: toastId });
    } finally {
      setCreating(false);
    }
  };

  // ── Upload photo ─────────────────────────────────────────────────────────────

  const handleUploadPhoto = async (file?: File) => {
    if (!file || !selectedAlbum) return;
    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('Không tìm thấy token xác thực admin.');
      return;
    }
    setUploadingAlbumId(selectedAlbum._id);
    const toastId = toast.loading('Đang tải ảnh lên...');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums/${selectedAlbum._id}/photos`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Tải ảnh thất bại.');
      toast.success('Thêm ảnh thành công!', { id: toastId });
      await fetchPhotos(selectedAlbum._id, photosPage);
      await fetchAlbums();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Đã có lỗi xảy ra.', { id: toastId });
    } finally {
      setUploadingAlbumId(null);
    }
  };

  // ── Delete photo ─────────────────────────────────────────────────────────────

  const handleDeletePhoto = async (photoId: string) => {
    if (!selectedAlbum) return;
    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('Không tìm thấy token xác thực admin.');
      return;
    }
    setDeletingPhotoId(photoId);
    const toastId = toast.loading('Đang xoá ảnh...');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/albums/${selectedAlbum._id}/photos/${photoId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Xoá ảnh thất bại.');
      toast.success('Xoá ảnh thành công.', { id: toastId });
      // If page becomes empty (deleted last photo on last page), go back a page
      const newPhotos = photos.filter((p) => p._id !== photoId);
      if (newPhotos.length === 0 && photosPage > 1) {
        const newPage = photosPage - 1;
        setPhotosPage(newPage);
        await fetchPhotos(selectedAlbum._id, newPage);
      } else {
        await fetchPhotos(selectedAlbum._id, photosPage);
      }
      await fetchAlbums();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Đã có lỗi xảy ra.', { id: toastId });
    } finally {
      setDeletingPhotoId(null);
    }
  };

  // ── Pagination ────────────────────────────────────────────────────────────────

  const handlePrevPage = () => {
    if (!selectedAlbum || photosPage <= 1) return;
    const newPage = photosPage - 1;
    setPhotosPage(newPage);
    void fetchPhotos(selectedAlbum._id, newPage);
  };

  const handleNextPage = () => {
    if (!selectedAlbum || photosPage >= photosTotalPages) return;
    const newPage = photosPage + 1;
    setPhotosPage(newPage);
    void fetchPhotos(selectedAlbum._id, newPage);
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Quản lý Album ảnh</h1>
            <p className="text-sm text-gray-500 mt-1">
              Tạo và quản lý các album ảnh hiển thị trên trang công khai.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowCreateForm((v) => !v)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors"
          >
            {showCreateForm ? 'Huỷ' : '+ Tạo album mới'}
          </button>
        </div>

        {/* Create album form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Tạo album mới</h2>
            <form onSubmit={(e) => void handleCreateAlbum(e)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="album-title">
                    Tên album <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="album-title"
                    type="text"
                    value={formTitle}
                    onChange={handleTitleChange}
                    placeholder="Ví dụ: Lễ khai giảng 2025"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="album-slug">
                    Đường dẫn (slug)
                  </label>
                  <input
                    id="album-slug"
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="le-khai-giang-2025"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="album-desc">
                  Mô tả (tuỳ chọn)
                </label>
                <textarea
                  id="album-desc"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                  placeholder="Mô tả ngắn về album..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {creating ? 'Đang tạo...' : 'Tạo album'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Album grid */}
        {loadingAlbums ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => `skeleton-album-${i}`).map((key) => (
              <div key={key} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 animate-pulse">
                <div className="h-44 bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : albums.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <div className="text-4xl mb-3">🖼️</div>
            <p className="text-gray-500 text-sm">Chưa có album nào. Hãy tạo album đầu tiên!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => {
              const coverUrl = resolveImageUrl(album.coverImageUrl);
              const isSelected = selectedAlbum?._id === album._id;
              return (
                <div
                  key={album._id}
                  className={`bg-white rounded-xl border shadow-sm p-4 transition-all ${
                    isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                  }`}
                >
                  {/* Cover image */}
                  <div className="relative h-44 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 mb-4">
                    {coverUrl ? (
                      <OptimizedImage
                        src={coverUrl}
                        alt={album.title}
                        width={400}
                        height={256}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                        Chưa có ảnh bìa
                      </div>
                    )}
                    {/* Photo count badge */}
                    <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                      {album.photoCount} ảnh
                    </span>
                  </div>

                  {/* Info */}
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-1 line-clamp-2">
                    {album.title}
                  </h3>
                  {album.description && (
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{album.description}</p>
                  )}

                  {/* Actions */}
                  <button
                    type="button"
                    onClick={() => (isSelected ? handleCloseAlbum() : handleSelectAlbum(album))}
                    className={`w-full mt-2 py-2 text-xs font-medium rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-blue-900 text-white hover:bg-blue-800'
                    }`}
                  >
                    {isSelected ? 'Đang xem' : 'Xem ảnh'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Selected album panel */}
        {selectedAlbum && (
          <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">
            {/* Panel header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">{selectedAlbum.title}</h2>
                <p className="text-xs text-gray-500 mt-0.5">{selectedAlbum.photoCount} ảnh trong album</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Upload trigger */}
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    void handleUploadPhoto(file);
                    e.currentTarget.value = '';
                  }}
                />
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  disabled={uploadingAlbumId === selectedAlbum._id}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  {uploadingAlbumId === selectedAlbum._id ? 'Đang tải...' : '+ Thêm ảnh'}
                </button>
                {/* Close panel */}
                <button
                  type="button"
                  onClick={handleCloseAlbum}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>

            {/* Photo grid */}
            {loadingPhotos ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }, (_, i) => `skeleton-photo-${i}`).map((key) => (
                  <div key={key} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
                ))}
              </div>
            ) : photos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">📷</div>
                <p className="text-gray-500 text-sm">Album chưa có ảnh nào. Hãy thêm ảnh đầu tiên!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => {
                  const photoUrl = resolveImageUrl(photo.imageUrl);
                  const isDeleting = deletingPhotoId === photo._id;
                  return (
                    <div key={photo._id} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <OptimizedImage
                        src={photoUrl}
                        alt={photo.caption || 'Ảnh album'}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => void handleDeletePhoto(photo._id)}
                        disabled={isDeleting}
                        className="absolute top-1.5 right-1.5 w-7 h-7 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
                        title="Xoá ảnh"
                      >
                        {isDeleting ? '…' : '✕'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {photosTotalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={photosPage <= 1 || loadingPhotos}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ← Trước
                </button>
                <span className="text-sm text-gray-600">
                  Trang {photosPage} / {photosTotalPages}
                </span>
                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={photosPage >= photosTotalPages || loadingPhotos}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Tiếp →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAlbumsPage;
