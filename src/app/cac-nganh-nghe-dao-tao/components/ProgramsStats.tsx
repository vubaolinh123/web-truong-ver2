"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Counter: React.FC<{ target: number; suffix?: string; duration?: number }> = ({ target, suffix = '', duration = 1400 }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * p));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return <span ref={ref}>{value.toLocaleString('vi-VN')}{suffix}</span>;
};

const ProgramsStats: React.FC = () => {
  return (
    <section aria-labelledby="programs-stats-title" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-12 md:py-16 text-white">
        <h2 id="programs-stats-title" className="text-2xl md:text-3xl font-bold mb-6">Thống kê chương trình đào tạo</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-md">
            <div className="text-3xl font-extrabold text-yellow-300"><Counter target={8} /></div>
            <div className="text-white/90">Ngành/chuyên ngành</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }} className="rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-md">
            <div className="text-3xl font-extrabold text-yellow-300"><Counter target={2000} suffix="+" /></div>
            <div className="text-white/90">Sinh viên đang học</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} className="rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-md">
            <div className="text-3xl font-extrabold text-yellow-300"><Counter target={12000} suffix="+" /></div>
            <div className="text-white/90">Cựu sinh viên</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 }} className="rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-md">
            <div className="text-3xl font-extrabold text-yellow-300"><Counter target={90} suffix="%" /></div>
            <div className="text-white/90">Có việc làm 6 tháng</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsStats;

