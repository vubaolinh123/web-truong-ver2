"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Library, FileText, Download } from 'lucide-react';

const LearningMaterialsHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="learning-materials-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="learning-materials-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Học Liệu
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Kho tàng học liệu phong phú với giáo trình, tài liệu tham khảo và nguồn học tập đa dạng,
            hỗ trợ sinh viên trong quá trình học tập và nghiên cứu.
          </p>
        </motion.div>

        {/* Key values */}
        <motion.div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <BookOpen className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Giáo trình</div>
                <div className="text-xs text-white/80">Chuẩn hóa</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Library className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Thư viện</div>
                <div className="text-xs text-white/80">Phong phú</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <FileText className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Tài liệu</div>
                <div className="text-xs text-white/80">Đa dạng</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Download className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Tải về</div>
                <div className="text-xs text-white/80">Dễ dàng</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningMaterialsHero;

