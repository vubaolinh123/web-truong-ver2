'use client';

import React, { useEffect, useState } from 'react';
import { Registration } from '../types/registration';
import RegistrationDetails from './RegistrationDetails';
import { fetchRegistrations } from '@/lib/api/registrations';
import toast from 'react-hot-toast';
import type { RegistrationFilters as Filters } from '../types/registration';

const PAGE_SIZE = 10;

const RegistrationList: React.FC<{ filters?: Partial<Filters> }> = ({ filters }) => {
  const [data, setData] = useState<Registration[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [selected, setSelected] = useState<Registration | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const rsp = await fetchRegistrations({ page, limit: PAGE_SIZE, ...(filters || {}) });
      setData(rsp.registrations);
      setTotal(rsp.total);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Không thể tải dữ liệu');
      toast.error(e.message || 'Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { setPage(1); }, [filters?.q, filters?.status, filters?.from, filters?.to]);
  useEffect(() => { load(); }, [page, filters?.q, filters?.status, filters?.from, filters?.to]);

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Họ và tên</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Số điện thoại</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Ngành học</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Facebook</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Ngày đăng ký</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">Trạng thái</th>
              <th className="px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && (
              <tr><td colSpan={8} className="px-4 py-6 text-center text-gray-500">Đang tải...</td></tr>
            )}
            {!loading && data.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-6 text-center text-gray-500">Không có dữ liệu</td></tr>
            )}
            {!loading && data.map((row) => (
              <tr key={row._id} className="hover:bg-blue-50/40">
                <td className="px-4 py-3 font-medium text-gray-900 max-w-[220px] truncate" title={row.name}>{row.name}</td>
                <td className="px-4 py-3 text-gray-700 max-w-[240px] truncate" title={row.email}>{row.email}</td>
                <td className="px-4 py-3 text-gray-700">{row.phone}</td>
                <td className="px-4 py-3 text-gray-700 max-w-[220px] truncate" title={row.major}>{row.major}</td>
                <td className="px-4 py-3 text-blue-600 underline max-w-[220px] truncate" title={row.facebook || ''}>
                  {row.facebook ? (<a href={row.facebook} target="_blank">Liên kết</a>) : <span className="text-gray-400">—</span>}
                </td>
                <td className="px-4 py-3 text-gray-700">{new Date(row.createdAt).toLocaleString('vi-VN')}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    row.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                    row.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                    row.status === 'enrolled' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>{row.status}</span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button onClick={()=>{ setSelected(row); setViewOpen(true); }} className="text-blue-600 hover:underline">Xem</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4">
        <div className="text-sm text-gray-600">Trang {page}/{pageCount} • Tổng {total}</div>
        <div className="space-x-2">
          <button disabled={page<=1} onClick={()=>setPage((p)=>Math.max(1, p-1))} className="px-3 py-1 rounded border disabled:opacity-50">Trước</button>
          <button disabled={page>=pageCount} onClick={()=>setPage((p)=>Math.min(pageCount, p+1))} className="px-3 py-1 rounded border disabled:opacity-50">Sau</button>
        </div>
      </div>

      {/* Details modal */}
      <RegistrationDetails open={viewOpen} onClose={()=>setViewOpen(false)} data={selected} />
    </div>
  );
};

export default RegistrationList;

