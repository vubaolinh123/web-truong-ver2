"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, FileCheck, Medal } from 'lucide-react';

const DiplomasHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="diplomas-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="diplomas-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Văn Bằng
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Tìm hiểu về các loại văn bằng, chứng chỉ và quy trình cấp phát tại trường,
            đảm bảo giá trị và uy tín của bằng cấp được công nhận rộng rãi.
          </p>
        </motion.div>

        {/* Key values */}
        <motion.div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Award className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Bằng cấp</div>
                <div className="text-xs text-white/80">Chính thức</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <GraduationCap className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Công nhận</div>
                <div className="text-xs text-white/80">Rộng rãi</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <FileCheck className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Xác thực</div>
                <div className="text-xs text-white/80">Nhanh chóng</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Medal className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Uy tín</div>
                <div className="text-xs text-white/80">Cao nhất</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiplomasHero;

