'use client';

import React from 'react';
import { Registration } from '../types/registration';

interface Props {
  open: boolean;
  onClose: () => void;
  data?: Registration | null;
}

const RegistrationDetails: React.FC<Props> = ({ open, onClose, data }) => {
  if (!open || !data) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 modal-overlay" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-xl shadow-xl w-[95%] max-w-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-blue-700">Chi tiết đăng ký</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Đóng</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Họ và tên</div>
            <div className="font-medium">{data.name}</div>
          </div>
          <div>
            <div className="text-gray-500">Email</div>
            <div className="font-medium">{data.email}</div>
          </div>
          <div>
            <div className="text-gray-500">Số điện thoại</div>
            <div className="font-medium">{data.phone}</div>
          </div>
          <div>
            <div className="text-gray-500">Ngành học</div>
            <div className="font-medium">{data.major}</div>
          </div>
          {data.facebook && (
            <div className="md:col-span-2">
              <div className="text-gray-500">Facebook</div>
              <a href={data.facebook} target="_blank" className="text-blue-600 underline break-all">{data.facebook}</a>
            </div>
          )}
          <div>
            <div className="text-gray-500">Ngày đăng ký</div>
            <div className="font-medium">{new Date(data.createdAt).toLocaleString('vi-VN')}</div>
          </div>
          <div>
            <div className="text-gray-500">Trạng thái</div>
            <div className="font-medium capitalize">{data.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationDetails;

