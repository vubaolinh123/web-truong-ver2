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
    <div className={`w-full ${className}`}>
      <form method="GET" className="relative">
        <div className="relative flex items-center bg-white rounded-full p-2 border border-sky-200 shadow-md focus-within:ring-2 focus-within:ring-sky-400 transition-all duration-300">
          <Search size={22} className="absolute left-5 text-slate-400" />
          <input
            type="text"
            name="search"
            defaultValue={defaultValue}
            placeholder="Tìm kiếm tin tức, thông báo, sự kiện..."
            className="flex-1 pl-14 pr-4 py-3 bg-transparent text-slate-800 placeholder-slate-500 outline-none rounded-full text-base"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-8 py-3 rounded-full font-semibold hover:from-sky-600 hover:to-sky-700 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
          >
            Tìm kiếm
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
