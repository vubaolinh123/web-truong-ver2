"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Award, Target } from 'lucide-react';

const OrganizationHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="organization-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="organization-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Cơ Cấu Tổ Chức
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Tìm hiểu về cơ cấu tổ chức, chức năng và nhiệm vụ của các đơn vị trong trường,
            góp phần xây dựng môi trường giáo dục chuyên nghiệp và hiệu quả.
          </p>
        </motion.div>

        {/* Key values */}
        <motion.div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Users className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Đội ngũ</div>
                <div className="text-xs text-white/80">Chuyên nghiệp</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Building2 className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Tổ chức</div>
                <div className="text-xs text-white/80">Hiệu quả</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Award className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Chất lượng</div>
                <div className="text-xs text-white/80">Xuất sắc</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Target className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Mục tiêu</div>
                <div className="text-xs text-white/80">Rõ ràng</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganizationHero;

