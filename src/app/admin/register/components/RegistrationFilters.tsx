'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { RegistrationStatus } from '../types/registration';

export interface Filters {
  q: string;
  status: RegistrationStatus | '';
  from: string; // yyyy-mm-dd
  to: string;   // yyyy-mm-dd
}

interface Props {
  onChange?: (filters: Filters) => void;
}

const RegistrationFilters: React.FC<Props> = ({ onChange }) => {
  const [filters, setFilters] = useState<Filters>({ q: '', status: '', from: '', to: '' });

  useEffect(() => { onChange?.(filters); }, [filters]);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Từ khóa</label>
          <input
            type="text"
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            placeholder="Tìm theo tên hoặc email"
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value as any }))}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="">Tất cả</option>
            <option value="new">Mới</option>
            <option value="contacted">Đã liên hệ</option>
            <option value="enrolled">Đã nhập học</option>
            <option value="rejected">Từ chối</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Từ ngày</label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Đến ngày</label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationFilters;

