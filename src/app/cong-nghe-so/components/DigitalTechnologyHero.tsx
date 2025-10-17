"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Smartphone, Cloud, Zap } from 'lucide-react';

const DigitalTechnologyHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="digital-technology-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="digital-technology-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Công Nghệ Số
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Khám phá các công nghệ số tiên tiến, ứng dụng và giải pháp chuyển đổi số,
            nâng cao chất lượng đào tạo và quản lý giáo dục hiện đại.
          </p>
        </motion.div>

        {/* Key values */}
        <motion.div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Cpu className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Công nghệ</div>
                <div className="text-xs text-white/80">Tiên tiến</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Smartphone className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Ứng dụng</div>
                <div className="text-xs text-white/80">Thông minh</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Cloud className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Đám mây</div>
                <div className="text-xs text-white/80">An toàn</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Zap className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Chuyển đổi</div>
                <div className="text-xs text-white/80">Nhanh chóng</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalTechnologyHero;

