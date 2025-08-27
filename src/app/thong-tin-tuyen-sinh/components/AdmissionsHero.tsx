"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, CalendarDays, FileText, Award } from 'lucide-react';

const AdmissionsHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="admissions-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="admissions-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Thông tin tuyển sinh
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Tổng hợp đầy đủ điều kiện xét tuyển, chương trình đào tạo, quy trình đăng ký trực tuyến, học bổng và các mốc thời gian quan trọng cho thí sinh.
            Nhà trường ưu tiên ứng dụng công nghệ trong tuyển sinh với hồ sơ online, portfolio số, phỏng vấn trực tuyến và tư vấn 24/7.
          </p>
        </motion.div>

        <div className="mt-8">
          <motion.a
            href="/dang-ky-truc-tuyen"
            className="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 font-semibold px-5 py-3 rounded-lg shadow hover:bg-yellow-300 focus-visible:ring-2 focus-visible:ring-yellow-400"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            aria-label="Đăng ký trực tuyến"
          >
            Đăng ký trực tuyến
          </motion.a>
        </div>

        <motion.div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-yellow-300" />
              <div>
                <div className="text-xl font-bold">15/07</div>
                <div className="text-sm text-white/80">Hạn đăng ký đợt 1</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <FileText className="text-yellow-300" />
              <div>
                <div className="text-xl font-bold">Online</div>
                <div className="text-sm text-white/80">Hồ sơ trực tuyến</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <GraduationCap className="text-yellow-300" />
              <div>
                <div className="text-xl font-bold">12 ngành</div>
                <div className="text-sm text-white/80">Chuyên ngành đào tạo</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <Award className="text-yellow-300" />
              <div>
                <div className="text-xl font-bold">Học bổng</div>
                <div className="text-sm text-white/80">Tối đa 100%</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionsHero;

