"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Lightbulb } from 'lucide-react';

const MissionVisionHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="mission-vision-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="mission-vision-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Sứ mệnh tầm nhìn
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Trường Cao đẳng Thông tin và Truyền thông cam kết đào tạo nguồn nhân lực chất lượng cao,
            góp phần vào sự phát triển bền vững của đất nước trong lĩnh vực Công nghệ Thông tin và Truyền thông.
          </p>
        </motion.div>

        {/* Key values */}
        <motion.div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Target className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Sứ mệnh</div>
                <div className="text-xs text-white/80">Đào tạo nhân lực</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Eye className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Tầm nhìn</div>
                <div className="text-xs text-white/80">Phát triển bền vững</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Heart className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Giá trị</div>
                <div className="text-xs text-white/80">Chất lượng cao</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Lightbulb className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Đổi mới</div>
                <div className="text-xs text-white/80">Sáng tạo liên tục</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionHero;

