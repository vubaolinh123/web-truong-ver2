'use client';

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export interface FilterState {
  startDate: string;
  endDate: string;
  minSize: string;
  maxSize: string;
}

interface ImageFiltersProps {
  onApply: (filters: FilterState) => void;
  onClear: () => void;
}

const ImageFilters: React.FC<ImageFiltersProps> = ({ onApply, onClear }) => {
  const [filters, setFilters] = useState<FilterState>({ startDate: '', endDate: '', minSize: '', maxSize: '' });
  const [minUnit, setMinUnit] = useState('KB');
  const [maxUnit, setMaxUnit] = useState('KB');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    const convertToBytes = (value: string, unit: string) => {
      if (!value) return '';
      const num = parseFloat(value);
      if (unit === 'KB') return (num * 1024).toString();
      if (unit === 'MB') return (num * 1024 * 1024).toString();
      return '';
    };

    onApply({
      ...filters,
      minSize: convertToBytes(filters.minSize, minUnit),
      maxSize: convertToBytes(filters.maxSize, maxUnit),
    });
  };

  const handleClear = () => {
    setFilters({ startDate: '', endDate: '', minSize: '', maxSize: '' });
    setMinUnit('KB');
    setMaxUnit('KB');
    onClear();
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Filters */}
        <div>
          <label className="text-sm font-medium text-gray-700">Ngày bắt đầu</label>
          <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Ngày kết thúc</label>
          <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
        </div>

        {/* Size Filters */}
        <div>
          <label className="text-sm font-medium text-gray-700">Dung lượng tối thiểu</label>
          <div className="flex">
            <input type="number" name="minSize" value={filters.minSize} onChange={handleChange} className="mt-1 w-full p-2 border rounded-l-md" />
            <select value={minUnit} onChange={(e) => setMinUnit(e.target.value)} className="mt-1 p-2 border-t border-b border-r rounded-r-md bg-gray-100">
              <option>KB</option>
              <option>MB</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Dung lượng tối đa</label>
          <div className="flex">
            <input type="number" name="maxSize" value={filters.maxSize} onChange={handleChange} className="mt-1 w-full p-2 border rounded-l-md" />
            <select value={maxUnit} onChange={(e) => setMaxUnit(e.target.value)} className="mt-1 p-2 border-t border-b border-r rounded-r-md bg-gray-100">
              <option>KB</option>
              <option>MB</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button onClick={handleClear} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-100">
          <X size={16} className="inline mr-1" />
          Xóa bộ lọc
        </button>
        <button onClick={handleApply} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          <Search size={16} className="inline mr-1" />
          Áp dụng bộ lọc
        </button>
      </div>
    </div>
  );
};

export default ImageFilters;

