"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: 'Hình thức tuyển sinh gồm những gì?', a: 'Xét học bạ, điểm thi THPT, đánh giá năng lực; một số ngành phỏng vấn trực tuyến và yêu cầu portfolio số.' },
  { q: 'Hồ sơ online gồm những giấy tờ nào?', a: 'Ảnh CMND/CCCD, học bạ/bảng điểm, bằng tốt nghiệp/giấy chứng nhận tốt nghiệp, chứng chỉ (nếu có).' },
  { q: 'Học phí và chính sách hỗ trợ?', a: 'Học phí theo tín chỉ. Có chính sách miễn/giảm và các gói học bổng theo thành tích và hoàn cảnh.' },
  { q: 'Ký túc xá và đời sống sinh viên?', a: 'KTX hơn 1.000 chỗ, khu thể thao, câu lạc bộ, hỗ trợ y tế. Ưu tiên tân sinh viên và sinh viên xa nhà.' },
  { q: 'Cơ hội việc làm sau tốt nghiệp?', a: 'Tỷ lệ có việc làm 6 tháng sau tốt nghiệp đạt 85%+, nhiều chương trình hợp tác doanh nghiệp và thực tập hưởng lương.' },
];

const AdmissionsFAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section aria-labelledby="admissions-faq-title">
      <h2 id="admissions-faq-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Câu hỏi thường gặp</h2>
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
                <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="text-slate-700 overflow-hidden">
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

export default AdmissionsFAQ;

