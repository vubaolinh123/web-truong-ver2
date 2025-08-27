"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, Users } from 'lucide-react';

const requirements = [
  {
    title: 'Điều kiện học lực',
    desc:
      'Tốt nghiệp THPT hoặc tương đương. Khuyến khích thí sinh có nền tảng Toán, Tin, Ngoại ngữ. Đối với ngành An toàn thông tin, ưu tiên thí sinh có điểm trung bình môn Toán/Lý/Tin từ 6.5 trở lên.',
    icon: CheckCircle,
  },
  {
    title: 'Hồ sơ xét tuyển',
    desc:
      'Bản sao công chứng bằng/giấy chứng nhận tốt nghiệp, học bạ THPT, CMND/CCCD, ảnh 3x4, phiếu đăng ký xét tuyển trực tuyến, các chứng chỉ (nếu có). Hỗ trợ nộp hồ sơ 100% online.',
    icon: FileText,
  },
  {
    title: 'Hình thức tuyển sinh hiện đại',
    desc:
      'Xét học bạ, điểm thi THPT, đánh giá năng lực; bổ sung phỏng vấn trực tuyến và yêu cầu portfolio số cho các chuyên ngành thiết kế, truyền thông số. Tư vấn trực tuyến theo lịch hẹn.',
    icon: Users,
  },
];

const AdmissionRequirements: React.FC = () => {
  return (
    <section aria-labelledby="requirements-title">
      <h2 id="requirements-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Điều kiện & tiêu chí xét tuyển</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {requirements.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <r.icon />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{r.title}</h3>
            <p className="text-slate-600">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AdmissionRequirements;

