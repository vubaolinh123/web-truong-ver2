"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

const VirtualTour: React.FC = () => {
  return (
    <section aria-labelledby="virtual-tour-title">
      <h2 id="virtual-tour-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Tham quan trực tuyến</h2>
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 border border-slate-100 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-slate-700">
            <p>
              Trải nghiệm không gian học tập và sinh hoạt của nhà trường thông qua video giới thiệu hoặc tour 360°.
              Hình ảnh chân thực, góc nhìn toàn cảnh, giúp phụ huynh và thí sinh hiểu rõ hơn về môi trường học tập.
            </p>
          </div>
          <motion.a
            href="#"
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3 px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label="Phát video tham quan"
          >
            <PlayCircle />
            Phát video tham quan
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;

