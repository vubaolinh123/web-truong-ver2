"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: 'Sau khi đăng ký, khi nào được liên hệ?', a: 'Bộ phận Tuyển sinh sẽ liên hệ trong 1–2 ngày làm việc qua email/điện thoại để xác minh và tư vấn.' },
  { q: 'Có thể chỉnh sửa thông tin sau khi gửi?', a: 'Bạn có thể phản hồi email xác nhận để yêu cầu chỉnh sửa hoặc liên hệ hotline tuyển sinh.' },
  { q: 'Cần chuẩn bị hồ sơ gì?', a: 'Ảnh CMND/CCCD, học bạ/bảng điểm, bằng tốt nghiệp/giấy chứng nhận tốt nghiệp, đường link portfolio (nếu có).' },
];

const RegistrationFAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section aria-labelledby="reg-faq-title">
      <h2 id="reg-faq-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Câu hỏi thường gặp</h2>
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        {faqs.map((f, i) => (
          <div key={f.q} className="border-b last:border-b-0 border-slate-100 py-3">
            <button className="w-full text-left font-medium text-slate-900" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`faq-${i}`}>
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

export default RegistrationFAQ;

