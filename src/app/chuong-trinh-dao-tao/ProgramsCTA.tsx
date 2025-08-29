"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { homepagePrograms } from '@/data/programs';

const ProgramsCTA: React.FC = () => {
  const items = homepagePrograms;
  return (
    <div className="w-full">
      <div className="flex items-end justify-between mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-blue-600">Khám phá các ngành đào tạo</h2>
        <Link
          href="/cac-nganh-nghe-dao-tao"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Xem tất cả các ngành đào tạo"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p, idx) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-40 overflow-hidden">
              <OptimizedImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className={`absolute inset-0 bg-gradient-to-t ${p.color} opacity-30`} />
            </div>
            <div className="p-5 flex flex-col h-full">
              <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
              <p className="mt-2 text-slate-700 line-clamp-3">{p.description}</p>
              <div className="mt-4">
                <Link
                  href={p.href}
                  aria-label={`Tìm hiểu thêm về ${p.name}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="mt-6 md:hidden">
        <Link
          href="/cac-nganh-nghe-dao-tao"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Xem tất cả các ngành đào tạo"
        >
          Xem tất cả
        </Link>
      </div>
    </div>
  );
};

export default ProgramsCTA;

