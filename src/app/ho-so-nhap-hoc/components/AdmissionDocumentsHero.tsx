"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ClipboardCheck, UserCheck, HelpCircle } from 'lucide-react';

const AdmissionDocumentsHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="admission-documents-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="admission-documents-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Hồ Sơ Nhập Học
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Tìm hiểu về hồ sơ, thủ tục và quy trình nhập học tại trường, 
            giúp bạn chuẩn bị đầy đủ các giấy tờ cần thiết cho quá trình tuyển sinh.
          </p>
        </motion.div>

        {/* Key values */}
        <motion.div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <FileText className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Hồ sơ</div>
                <div className="text-xs text-white/80">Đầy đủ</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Thủ tục</div>
                <div className="text-xs text-white/80">Đơn giản</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <UserCheck className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Hỗ trợ</div>
                <div className="text-xs text-white/80">Tận tâm</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-yellow-300" />
              <div>
                <div className="text-sm font-bold">Tư vấn</div>
                <div className="text-xs text-white/80">Miễn phí</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionDocumentsHero;

