"use client";

import React from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, MonitorSmartphone } from 'lucide-react';

const items = [
  { icon: GraduationCap, title: 'Phòng học thông minh', desc: 'Trang bị máy chiếu, bảng tương tác, âm thanh hiện đại.', img: '/images/facility-class.jpg' },
  { icon: MonitorSmartphone, title: 'Phòng lab chuyên dụng', desc: 'Lab An toàn thông tin, Lập trình, Mạng máy tính.', img: '/images/facility-lab.jpg' },
  { icon: BookOpen, title: 'Thư viện & không gian học tập', desc: 'Tài nguyên số, khu tự học, phòng thảo luận nhóm.', img: '/images/facility-library.jpg' },
];

const AcademicFacilities: React.FC = () => {
  return (
    <section aria-labelledby="academic-facilities-title">
      <h2 id="academic-facilities-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Cơ sở đào tạo</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.article
            key={it.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="relative h-44 bg-slate-50">
              <OptimizedImage src={it.img} alt={it.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" loading="lazy" />
            </div>
            <div className="p-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <it.icon />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{it.title}</h3>
              <p className="text-slate-600">{it.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default AcademicFacilities;

