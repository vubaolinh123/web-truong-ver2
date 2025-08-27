"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const RegistrationInfo: React.FC = () => {
  return (
    <section aria-labelledby="reg-info-title">
      <h2 id="reg-info-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Thông tin bổ sung</h2>
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-start gap-3 text-slate-700">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center"><Info /></div>
          <div className="space-y-2">
            <p>Biểu mẫu trực tuyến giúp rút ngắn thời gian xử lý hồ sơ. Sau khi nhận được đăng ký, bộ phận Tuyển sinh sẽ liên hệ xác minh thông tin và hướng dẫn nộp hồ sơ.</p>
            <p>Thời gian phản hồi: trong vòng 1–2 ngày làm việc. Vui lòng theo dõi email/điện thoại để nhận thông báo tiếp theo.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default RegistrationInfo;

