/**
 * Pagination Component
 * Pagination controls for news listing
 */

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  search?: string;
  category?: string;
  sort?: string;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  search = '',
  category = '',
  sort = 'newest'
}) => {
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams();
    
    if (page > 1) params.set('page', page.toString());
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (sort && sort !== 'newest') params.set('sort', sort);
    
    return `/tin-tuc${params.toString() ? `?${params.toString()}` : ''}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-2 bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
        {currentPage > 1 && (
          <Link
            href={buildPageUrl(currentPage - 1)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            <ChevronLeft size={16} />
            Trước
          </Link>
        )}
        
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page = i + 1;
          return (
            <Link
              key={page}
              href={buildPageUrl(page)}
              className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                page === currentPage
                  ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </Link>
          );
        })}

        {currentPage < totalPages && (
          <Link
            href={buildPageUrl(currentPage + 1)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Sau
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
