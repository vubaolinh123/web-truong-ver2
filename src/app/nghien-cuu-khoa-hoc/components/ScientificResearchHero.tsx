"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, FlaskConical, BookOpen, Lightbulb } from 'lucide-react';

const ScientificResearchHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="scientific-research-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="scientific-research-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Nghiên Cứu Khoa Học
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Khám phá các hoạt động nghiên cứu khoa học, dự án và công trình nghiên cứu của giảng viên và sinh viên,
            góp phần phát triển tri thức và ứng dụng thực tiễn.
          </p>
        </motion.div>

        {/* Key values */}
        <motion.div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Microscope className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Nghiên cứu</div>
                <div className="text-xs text-white/80">Chuyên sâu</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <FlaskConical className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Thực nghiệm</div>
                <div className="text-xs text-white/80">Hiện đại</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <BookOpen className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Công bố</div>
                <div className="text-xs text-white/80">Uy tín</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Lightbulb className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Sáng tạo</div>
                <div className="text-xs text-white/80">Đột phá</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScientificResearchHero;

