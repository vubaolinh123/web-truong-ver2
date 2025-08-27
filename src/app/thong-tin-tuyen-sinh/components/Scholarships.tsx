"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users } from 'lucide-react';

const Scholarships: React.FC = () => {
  return (
    <section aria-labelledby="scholarships-title">
      <h2 id="scholarships-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Học bổng & hỗ trợ tài chính</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center"><Award /></div>
            <div className="space-y-2 text-slate-700">
              <p>Chính sách học bổng đa dạng: đầu vào (theo điểm học bạ/thi THPT), học kỳ (thành tích học tập), khuyến khích nghiên cứu, hỗ trợ hoàn cảnh khó khăn. Mức học bổng lên đến 100% học phí.</p>
              <ul className="list-disc list-inside ml-2">
                <li>Học bổng Xuất sắc: 100% học phí năm đầu.</li>
                <li>Học bổng Khuyến học: 50% học phí theo học kỳ.</li>
                <li>Hỗ trợ tài chính: miễn/giảm theo chính sách, vay ưu đãi.</li>
              </ul>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center"><Users /></div>
            <div className="space-y-2 text-slate-700">
              <p>Hợp tác học bổng với doanh nghiệp và quỹ xã hội: ưu tiên ngành Công nghệ thông tin, An toàn thông tin, Thiết kế đồ họa. Thực tập hưởng lương và cơ hội việc làm sau tốt nghiệp.</p>
              <p>Deadline xét học bổng: 30/06 (đợt 1), 30/09 (đợt 2). Nộp minh chứng kèm theo (chứng chỉ, giải thưởng, sản phẩm dự án).</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Scholarships;

