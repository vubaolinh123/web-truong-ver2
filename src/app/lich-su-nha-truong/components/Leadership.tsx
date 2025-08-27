"use client";

import React from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { motion } from 'framer-motion';
import { UserCircle2 } from 'lucide-react';

interface Leader {
  name: string;
  role: string;
  tenure: string;
  photo?: string;
}

const leaders: Leader[] = [
  { name: 'Nguyễn Văn An', role: 'Hiệu trưởng', tenure: '2010 - 2016', photo: '/images/leader-1.jpg' },
  { name: 'Trần Thị Bình', role: 'Hiệu trưởng', tenure: '2016 - 2021', photo: '/images/leader-2.jpg' },
  { name: 'Lê Quốc Dũng', role: 'Hiệu trưởng', tenure: '2021 - nay', photo: '/images/leader-3.jpg' },
];

const Leadership: React.FC = () => {
  return (
    <section aria-labelledby="leadership-title">
      <h2 id="leadership-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Lãnh đạo qua các thời kỳ</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaders.map((l, i) => (
          <motion.article
            key={l.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="relative h-56 bg-slate-50">
              {l.photo ? (
                <OptimizedImage src={l.photo} alt={`Ảnh ${l.name}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400" aria-label={`Không có ảnh của ${l.name}`}>
                  <UserCircle2 size={64} />
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-900">{l.name}</h3>
              <p className="text-slate-600">{l.role}</p>
              <p className="text-sm text-slate-500 mt-1">{l.tenure}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Leadership;

