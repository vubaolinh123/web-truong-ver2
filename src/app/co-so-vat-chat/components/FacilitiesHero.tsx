"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Server, GraduationCap, Users } from 'lucide-react';

const FacilitiesHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="facilities-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="facilities-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Cơ sở vật chất
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Hạ tầng hiện đại phục vụ giảng dạy, học tập và nghiên cứu: phòng học thông minh, phòng thí nghiệm CNTT, thư viện số, ký túc xá và khu thể thao.
          </p>
        </motion.div>

        {/* Key stats */}
        <motion.div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Building2 className="text-yellow-300" />
              <div>
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm text-white/80">Tòa nhà chức năng</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Server className="text-yellow-300" />
              <div>
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-white/80">Phòng lab CNTT</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <GraduationCap className="text-yellow-300" />
              <div>
                <div className="text-2xl font-bold">2.000+</div>
                <div className="text-sm text-white/80">Chỗ ngồi học tập</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Users className="text-yellow-300" />
              <div>
                <div className="text-2xl font-bold">1.000+</div>
                <div className="text-sm text-white/80">Chỗ ở ký túc xá</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FacilitiesHero;

