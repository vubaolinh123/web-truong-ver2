"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Mail, MapPin } from 'lucide-react';

const ContactHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="contact-hero-title">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[url('/images/banner-education.svg')] opacity-10 bg-cover bg-center" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-16 md:py-24 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 id="contact-hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight uppercase">
            Liên hệ
          </h1>
          <p className="mt-4 md:mt-6 text-white/90 max-w-3xl">
            Kênh liên hệ chính thức của nhà trường. Hãy kết nối với chúng tôi qua điện thoại, email hoặc biểu mẫu trực tuyến.
          </p>
        </motion.div>

        <motion.div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20 flex items-center gap-3">
            <PhoneCall className="text-yellow-300" />
            <span>+84-24-3123-4567</span>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20 flex items-center gap-3">
            <Mail className="text-yellow-300" />
            <span>info@vcic.edu.vn</span>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/20 flex items-center gap-3">
            <MapPin className="text-yellow-300" />
            <span>36 Cầu Diễn, Bắc Từ Liêm, Hà Nội</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;

