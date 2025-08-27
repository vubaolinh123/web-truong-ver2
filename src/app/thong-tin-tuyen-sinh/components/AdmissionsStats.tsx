"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
  target: number;
  suffix?: string;
  duration?: number; // ms
}

const Counter: React.FC<CounterProps> = ({ target, suffix = '', duration = 1500 }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      setValue(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return (
    <span ref={ref} aria-live="polite">
      {value.toLocaleString('vi-VN')}{suffix}
    </span>
  );
};

const AdmissionsStats: React.FC = () => {
  const rangeRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rangeRef, { margin: '-80px' });
  const [startVal, setStartVal] = useState(0);
  const [endVal, setEndVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const duration = 1600;
    const fromA = 0, toA = 12; // 12 triệu
    const fromB = 0, toB = 18; // 18 triệu
    const step = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / duration);
      setStartVal(Math.round(fromA + (toA - fromA) * p));
      setEndVal(Math.round(fromB + (toB - fromB) * p));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <section aria-labelledby="admissions-stats-title" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb]" aria-hidden="true" />
      <div className="relative w-[92%] md:w-[80%] mx-auto px-4 py-12 md:py-16 text-white">
        <h2 id="admissions-stats-title" className="text-2xl md:text-3xl font-bold mb-6">Thống kê tuyển sinh nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-md">
            <div className="text-3xl font-extrabold text-yellow-300">
              <Counter target={2500} suffix="+" />
            </div>
            <div className="text-white/90">Đơn đăng ký</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 }} className="rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-md">
            <div className="text-3xl font-extrabold text-yellow-300">
              <Counter target={85} suffix="%" />
            </div>
            <div className="text-white/90">Tỷ lệ trúng tuyển</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }} className="rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-md">
            <div className="text-3xl font-extrabold text-yellow-300">
              <Counter target={92} suffix="%" />
            </div>
            <div className="text-white/90">Có việc làm sau 6 tháng</div>
          </motion.div>

          <motion.div ref={rangeRef} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 }} className="rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-md">
            <div className="text-3xl font-extrabold text-yellow-300">
              {startVal}–{endVal} triệu VNĐ
            </div>
            <div className="text-white/90">Lương khởi điểm</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsStats;

