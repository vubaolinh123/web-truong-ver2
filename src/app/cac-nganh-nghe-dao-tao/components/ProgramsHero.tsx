"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const ProgramsHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="programs-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="programs-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Các ngành nghề đào tạo
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Khám phá toàn bộ danh mục chương trình đào tạo của nhà trường, lộ trình học, kỹ năng cốt lõi và cơ hội nghề nghiệp sau tốt nghiệp.
            Chúng tôi xây dựng chương trình hiện đại, gắn với nhu cầu doanh nghiệp và xu hướng công nghệ mới.
          </p>
        </motion.div>

        <motion.div className="mt-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <a href="/dang-ky-truc-tuyen" className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 font-semibold px-5 py-3 rounded-lg shadow hover:bg-yellow-300 focus-visible:ring-2 focus-visible:ring-yellow-400" aria-label="Đăng ký tư vấn chương trình">
            <GraduationCap /> Đăng ký tư vấn chương trình
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsHero;

