"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, TrendingUp } from 'lucide-react';

const CareerOutlook: React.FC = () => {
  return (
    <section aria-labelledby="career-outlook-title">
      <h2 id="career-outlook-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Triển vọng nghề nghiệp</h2>
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex items-start gap-4 text-slate-700">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center"><TrendingUp /></div>
          <div className="space-y-2">
            <p>Tỷ lệ sinh viên có việc làm sau 6 tháng đạt trên 90%, nhiều vị trí liên quan trực tiếp đến chuyên ngành đào tạo. Mức lương khởi điểm dao động 10–20 triệu VNĐ, tuỳ lĩnh vực và năng lực.</p>
            <p>Nhà trường đẩy mạnh chương trình thực tập, dự án với doanh nghiệp và hoạt động hướng nghiệp, giúp sinh viên sẵn sàng cho thị trường lao động.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CareerOutlook;

