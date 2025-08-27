"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, Phone } from 'lucide-react';

const RegistrationHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="reg-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="reg-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Đăng ký trực tuyến
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Điền thông tin và lựa chọn ngành học để đăng ký xét tuyển trực tuyến. Chúng tôi sẽ liên hệ xác minh và tư vấn lộ trình phù hợp cho bạn.
          </p>
        </motion.div>

        <motion.div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20 flex items-center gap-3">
            <FileText className="text-yellow-300" />
            <span>Hồ sơ online</span>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20 flex items-center gap-3">
            <Mail className="text-yellow-300" />
            <span>Xác minh email</span>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20 flex items-center gap-3">
            <Phone className="text-yellow-300" />
            <span>Liên hệ tư vấn</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationHero;

