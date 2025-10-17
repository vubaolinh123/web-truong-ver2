"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Wifi, Video, Globe } from 'lucide-react';

const OnlineLearningHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="online-learning-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="online-learning-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Học Trực Tuyến
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Trải nghiệm học tập trực tuyến hiện đại với nền tảng công nghệ tiên tiến,
            mang đến sự linh hoạt và hiệu quả cho sinh viên mọi lúc, mọi nơi.
          </p>
        </motion.div>

        {/* Key values */}
        <motion.div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Monitor className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Nền tảng</div>
                <div className="text-xs text-white/80">Hiện đại</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Wifi className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Kết nối</div>
                <div className="text-xs text-white/80">Ổn định</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Video className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Bài giảng</div>
                <div className="text-xs text-white/80">Chất lượng</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Globe className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Truy cập</div>
                <div className="text-xs text-white/80">Mọi nơi</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OnlineLearningHero;

