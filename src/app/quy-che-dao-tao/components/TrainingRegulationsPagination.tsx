/**
 * Training Regulations Pagination Component
 * Pagination controls for training regulations page
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TrainingRegulationsPaginationProps {
  currentPage: number;
  totalPages: number;
  sort?: string;
}

const TrainingRegulationsPagination: React.FC<TrainingRegulationsPaginationProps> = ({
  currentPage,
  totalPages,
  sort = 'newest'
}) => {
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams();

    if (page > 1) params.set('page', page.toString());
    if (sort && sort !== 'newest') params.set('sort', sort);

    return `/quy-che-dao-tao${params.toString() ? `?${params.toString()}` : ''}`;
  };

  const getPagination = () => {
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
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

        {getPagination().map((page, index) =>
          typeof page === 'number' ? (
            <Link
              key={`${page}-${index}`}
              href={buildPageUrl(page)}
              className={`hidden md:block px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                page === currentPage
                  ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}>
              {page}
            </Link>
          ) : (
            <span key={`${page}-${index}`} className="hidden md:block px-4 py-2 text-sm font-medium text-gray-500">
              {page}
            </span>
          )
        )}

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

export default TrainingRegulationsPagination;

