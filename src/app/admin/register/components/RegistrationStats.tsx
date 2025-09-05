"use client";

import React, { useEffect, useState } from 'react';

interface Stats {
  total: number;
  today: number;
  contacted: number;
  newCount: number;
}

const RegistrationStats: React.FC = () => {
  const [stats, setStats] = useState<Stats>({ total: 0, today: 0, contacted: 0, newCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder: compute from list API later if desired.
    setLoading(false);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: 'Tổng số', value: stats.total, color: 'bg-gradient-to-br from-blue-500 to-blue-700' },
        { label: 'Hôm nay', value: stats.today, color: 'bg-gradient-to-br from-yellow-400 to-yellow-500' },
        { label: 'Đã liên hệ', value: stats.contacted, color: 'bg-gradient-to-br from-green-500 to-green-700' },
        { label: 'Mới', value: stats.newCount, color: 'bg-gradient-to-br from-indigo-500 to-indigo-700' },
      ].map((s, idx) => (
        <div key={idx} className={`${s.color} text-white rounded-lg p-5 shadow-md`}> 
          <div className="text-sm opacity-90">{s.label}</div>
          <div className="text-2xl font-bold mt-1">{loading ? '...' : s.value}</div>
        </div>
      ))}
    </div>
  );
};

export default RegistrationStats;

