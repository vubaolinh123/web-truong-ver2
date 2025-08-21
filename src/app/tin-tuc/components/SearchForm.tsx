/**
 * Search Form Component
 * Client-side search form with form submission
 */

'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  defaultValue?: string;
  className?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ defaultValue = '', className = '' }) => {
  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <form method="GET" className="relative">
        <div className="relative flex items-center bg-white/95 rounded-2xl p-2 backdrop-blur-sm border border-white/20 shadow-lg">
          <Search size={20} className="absolute left-4 text-gray-400" />
          <input
            type="text"
            name="search"
            defaultValue={defaultValue}
            placeholder="Tìm kiếm tin tức, thông báo, sự kiện..."
            className="flex-1 pl-12 pr-4 py-3 bg-transparent text-gray-900 placeholder-gray-500 outline-none rounded-xl"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-6 py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg"
          >
            Tìm kiếm
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
