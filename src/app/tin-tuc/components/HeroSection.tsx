/**
 * Hero Section Component
 * Hero section with search and statistics
 */

import React from 'react';
import { Newspaper, TrendingUp, Users } from 'lucide-react';
import SearchForm from './SearchForm';

interface HeroSectionProps {
  totalArticles: number;
  currentSearch?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  totalArticles,
  currentSearch = ''
}) => {

  return (
    <section className="relative bg-gradient-to-br from-sky-50 via-blue-100 to-yellow-50 text-slate-800 py-20 overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-sky-200/50 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-yellow-200/50 rounded-full filter blur-3xl opacity-50"></div>

      <div className="relative w-full max-w-[92%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Title */}
          <div className="mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/80 rounded-full mb-6 shadow-md backdrop-blur-sm border border-sky-100">
              <Newspaper size={48} className="text-sky-500" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-slate-900">
              Tin Tức & Thông Báo
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-sky-400 to-yellow-400 mx-auto mb-4 rounded-full"></div>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Cập nhật những thông tin mới nhất, các hoạt động và sự kiện nổi bật từ Trường Cao đẳng Thông tin và Truyền thông.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <SearchForm defaultValue={currentSearch} />
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm border border-sky-100 rounded-2xl p-6 text-left shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-sky-100 to-sky-200 text-sky-600 rounded-xl">
                  <Newspaper size={28} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-sky-600">{totalArticles.toLocaleString()}+</div>
                  <div className="text-slate-500 font-medium">Bài viết</div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-yellow-100 rounded-2xl p-6 text-left shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-700 rounded-xl">
                  <TrendingUp size={28} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-700">50K+</div>
                  <div className="text-slate-500 font-medium">Lượt xem</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
