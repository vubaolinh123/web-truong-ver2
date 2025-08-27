"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: 'Quy trình tuyển sinh như thế nào?', a: 'Thí sinh đăng ký trực tuyến hoặc trực tiếp tại trường, nộp hồ sơ theo hướng dẫn và tham gia xét tuyển.' },
  { q: 'Học phí và chính sách học bổng?', a: 'Học phí theo tín chỉ, nhiều chính sách học bổng theo thành tích học tập và hoàn cảnh.' },
  { q: 'Ký túc xá có đủ chỗ ở?', a: 'Ký túc xá có hơn 1.000 chỗ, ưu tiên tân sinh viên và sinh viên xa nhà.' },
];

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section aria-labelledby="faq-title">
      <h2 id="faq-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Câu hỏi thường gặp</h2>
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        {faqs.map((f, i) => (
          <div key={f.q} className="border-b last:border-b-0 border-slate-100 py-3">
            <button
              className="w-full text-left font-medium text-slate-900"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-${i}`}
            >
              {f.q}
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  id={`faq-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-slate-700 overflow-hidden"
                >
                  <div className="pt-2">{f.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;

