"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CalendarDays, Award, Users } from 'lucide-react';

const HistoryHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="history-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="history-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Lịch sử nhà trường
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Thành lập năm 2010, Trường Cao đẳng Thông tin và Truyền thông đã không ngừng phát triển,
            đào tạo nguồn nhân lực chất lượng cao trong các lĩnh vực Công nghệ Thông tin và Truyền thông,
            đóng góp vào quá trình chuyển đổi số quốc gia.
          </p>
        </motion.div>

        {/* Key stats */}
        <motion.div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-yellow-300" />
              <div>
                <div className="text-2xl font-bold">2010</div>
                <div className="text-sm text-white/80">Năm thành lập</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <GraduationCap className="text-yellow-300" />
              <div>
                <div className="text-2xl font-bold">12.000+</div>
                <div className="text-sm text-white/80">Cựu sinh viên</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Award className="text-yellow-300" />
              <div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-white/80">Giải thưởng</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Users className="text-yellow-300" />
              <div>
                <div className="text-2xl font-bold">3.000+</div>
                <div className="text-sm text-white/80">Sinh viên hiện tại</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HistoryHero;

