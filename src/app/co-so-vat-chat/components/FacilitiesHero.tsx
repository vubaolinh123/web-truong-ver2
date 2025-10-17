"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Building, Wifi, BookOpen, Monitor } from 'lucide-react';

const FacilitiesHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="facilities-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="facilities-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Cơ Sở Vật Chất
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Trường Cao đẳng Thông tin và Truyền thông được trang bị cơ sở vật chất hiện đại,
            trang thiết bị tiên tiến, tạo môi trường học tập và nghiên cứu chuyên nghiệp cho sinh viên.
          </p>
        </motion.div>

        {/* Key values */}
        <motion.div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Building className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Cơ sở</div>
                <div className="text-xs text-white/80">Hiện đại</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Wifi className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Kết nối</div>
                <div className="text-xs text-white/80">Tốc độ cao</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <BookOpen className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Thư viện</div>
                <div className="text-xs text-white/80">Phong phú</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Monitor className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Thiết bị</div>
                <div className="text-xs text-white/80">Tiên tiến</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FacilitiesHero;


