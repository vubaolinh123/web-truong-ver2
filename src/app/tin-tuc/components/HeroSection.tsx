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
    <section className="relative bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600 text-white py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative w-4/5 max-w-7xl mx-auto px-4">
        <div className="text-center">
          {/* Main Title */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
              <Newspaper size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Tin Tức & Thông Báo
            </h1>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-4 rounded-full"></div>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Cập nhật những thông tin mới nhất từ Trường Cao đẳng Thông tin và Truyền thông
            </p>
          </div>

          {/* Search Bar */}
          <SearchForm defaultValue={currentSearch} className="mb-8" />

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 text-blue-900 rounded-xl">
                <Newspaper size={20} />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-yellow-400">{totalArticles.toLocaleString()}+</div>
                <div className="text-blue-100 text-sm">Bài viết</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 text-blue-900 rounded-xl">
                <TrendingUp size={20} />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-yellow-400">50K+</div>
                <div className="text-blue-100 text-sm">Lượt xem</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 text-blue-900 rounded-xl">
                <Users size={20} />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-yellow-400">10K+</div>
                <div className="text-blue-100 text-sm">Độc giả</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
