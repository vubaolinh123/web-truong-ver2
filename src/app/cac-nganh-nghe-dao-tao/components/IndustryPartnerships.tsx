"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Handshake } from 'lucide-react';

const IndustryPartnerships: React.FC = () => {
  return (
    <section aria-labelledby="industry-partnerships-title">
      <h2 id="industry-partnerships-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Hợp tác doanh nghiệp</h2>
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center"><Handshake /></div>
          <div className="space-y-2 text-slate-700">
            <p>Nhà trường hợp tác với nhiều doanh nghiệp công nghệ trong đào tạo và thực tập. Sinh viên được tham gia dự án thực tế, chương trình mentorship và thực tập hưởng lương.</p>
            <ul className="list-disc list-inside ml-2">
              <li>Chương trình tham quan doanh nghiệp và workshop định kỳ.</li>
              <li>Quỹ học bổng từ doanh nghiệp tài trợ cho sinh viên xuất sắc.</li>
              <li>Ngày hội việc làm và tuyển dụng hằng năm.</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default IndustryPartnerships;

