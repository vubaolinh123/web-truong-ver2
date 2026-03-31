'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface Album {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImageUrl?: string;
  photoCount: number;
}

interface Photo {
  _id: string;
  imageUrl?: string;
  caption?: string;
  altText?: string;
}

interface AlbumsResponse {
  status?: string;
  data?: {
    albums?: Album[];
  };
  message?: string;
}

interface PhotosResponse {
  status?: string;
  data?: {
    photos?: Photo[];
    totalPhotos?: number;
    page?: number;
    totalPages?: number;
  };
  message?: string;
}

interface SelectedAlbum {
  _id: string;
  title: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const PHOTOS_PER_PAGE = 12;

const resolveImageUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const base = API_URL.replace(/\/api\/?$/, '');
  return `${base}${url}`;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

function AlbumGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => `album-skeleton-${index}`).map((key) => (
        <div
          key={key}
          className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
        >
          <div className="aspect-[3/2] animate-pulse bg-gray-200" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function PhotoGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => `photo-skeleton-${index}`).map((key) => (
        <div key={key} className="space-y-3">
          <div className="aspect-square rounded-xl bg-gray-200 animate-pulse md:aspect-[3/2]" />
          <div className="h-4 w-3/4 rounded bg-gray-100 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default function GalleryContent() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<SelectedAlbum | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [albumsLoading, setAlbumsLoading] = useState(true);
  const [photosLoading, setPhotosLoading] = useState(false);
  const [albumsError, setAlbumsError] = useState<string | null>(null);
  const [photosError, setPhotosError] = useState<string | null>(null);

  const selectedAlbumDetails = useMemo(
    () => albums.find((album) => album._id === selectedAlbum?._id) ?? null,
    [albums, selectedAlbum]
  );

  const fetchAlbums = useCallback(async () => {
    setAlbumsLoading(true);
    setAlbumsError(null);

    try {
      const response = await fetch(`${API_URL}/albums`, { cache: 'no-store' });
      const result: AlbumsResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Không thể tải danh sách album.');
      }

      setAlbums(Array.isArray(result.data?.albums) ? result.data.albums : []);
    } catch (error) {
      setAlbums([]);
      setAlbumsError(getErrorMessage(error, 'Không thể tải danh sách album.'));
    } finally {
      setAlbumsLoading(false);
    }
  }, []);

  const fetchPhotos = useCallback(async (albumId: string, page: number) => {
    setPhotosLoading(true);
    setPhotosError(null);

    try {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: PHOTOS_PER_PAGE.toString(),
      });

      const response = await fetch(`${API_URL}/albums/${albumId}/photos?${searchParams.toString()}`, {
        cache: 'no-store',
      });
      const result: PhotosResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Không thể tải ảnh của album.');
      }

      setPhotos(Array.isArray(result.data?.photos) ? result.data.photos : []);
      setCurrentPage(result.data?.page || page);
      setTotalPages(Math.max(1, result.data?.totalPages || 1));
    } catch (error) {
      setPhotos([]);
      setTotalPages(1);
      setPhotosError(getErrorMessage(error, 'Không thể tải ảnh của album.'));
    } finally {
      setPhotosLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAlbums();
  }, [fetchAlbums]);

  useEffect(() => {
    if (!selectedAlbum) {
      return;
    }

    void fetchPhotos(selectedAlbum._id, currentPage);
  }, [currentPage, fetchPhotos, selectedAlbum]);

  const handleSelectAlbum = (album: SelectedAlbum) => {
    setSelectedAlbum(album);
    setCurrentPage(1);
    setTotalPages(1);
    setPhotos([]);
    setPhotosError(null);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setPhotos([]);
    setCurrentPage(1);
    setTotalPages(1);
    setPhotosError(null);
  };

  return (
    <section className="space-y-8">
      {!selectedAlbum ? (
        <>
          <div className="flex flex-col gap-2">
            <span className="inline-flex w-fit items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-700">
              Thư viện ảnh
            </span>
            <div>
              <h2 className="text-2xl font-bold text-blue-950 md:text-3xl">Album hình ảnh</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
                Tổng hợp các hoạt động, sự kiện và không gian học tập nổi bật của nhà trường qua từng album ảnh.
              </p>
            </div>
          </div>

          {albumsLoading ? (
            <AlbumGridSkeleton />
          ) : albums.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-blue-200 bg-white/80 px-6 py-16 text-center text-base font-medium text-gray-500 shadow-sm">
              {albumsError || 'Chưa có album ảnh nào.'}
            </div>
          ) : (
            <div className="space-y-4">
              {albumsError && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {albumsError}
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {albums.map((album) => {
                  const coverImage = resolveImageUrl(album.coverImageUrl);

                  return (
                    <button
                      key={album._id}
                      type="button"
                      onClick={() => handleSelectAlbum({ _id: album._id, title: album.title })}
                      className="group overflow-hidden rounded-xl border border-gray-100 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                    >
                      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                        <OptimizedImage
                          src={coverImage}
                          alt={album.title}
                          width={720}
                          height={480}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-blue-950/55 to-transparent" />
                        <span className="absolute right-3 top-3 rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-blue-950 shadow-sm">
                          {album.photoCount} ảnh
                        </span>
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900">{album.title}</h3>
                        {album.description ? (
                          <p className="mt-2 text-sm leading-6 text-gray-600">{album.description}</p>
                        ) : (
                          <p className="mt-2 text-sm leading-6 text-gray-500">
                            Nhấn để xem toàn bộ hình ảnh trong album này.
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-6 rounded-2xl border border-blue-100 bg-white/90 p-5 shadow-sm backdrop-blur-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <button
                type="button"
                onClick={handleBackToAlbums}
                className="inline-flex items-center rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
              >
                ← Tất cả album
              </button>
              <h2 className="mt-4 text-2xl font-bold text-blue-950 md:text-3xl">
                {selectedAlbum.title}
              </h2>
              {selectedAlbumDetails?.description && (
                <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
                  {selectedAlbumDetails.description}
                </p>
              )}
            </div>

            {selectedAlbumDetails && (
              <div className="inline-flex w-fit items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800">
                {selectedAlbumDetails.photoCount} ảnh trong album
              </div>
            )}
          </div>

          {photosError && (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {photosError}
            </div>
          )}

          {photosLoading ? (
            <PhotoGridSkeleton />
          ) : photos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 px-6 py-16 text-center text-base font-medium text-gray-500">
              Album này chưa có ảnh nào.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {photos.map((photo) => {
                const photoUrl = resolveImageUrl(photo.imageUrl);
                const photoAlt = photo.altText || photo.caption || `${selectedAlbum.title} - ảnh hoạt động`;

                return (
                  <article
                    key={photo._id}
                    className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:shadow-md"
                  >
                    <div className="overflow-hidden bg-gray-100 aspect-square md:aspect-[3/2]">
                      <OptimizedImage
                        src={photoUrl}
                        alt={photoAlt}
                        width={600}
                        height={600}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>

                    {photo.caption && (
                      <div className="p-3">
                        <p className="text-sm leading-6 text-gray-700">{photo.caption}</p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage <= 1 || photosLoading}
                className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ← Trước
              </button>

              <span className="text-sm font-medium text-gray-600">
                Trang {currentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage >= totalPages || photosLoading}
                className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Tiếp →
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
