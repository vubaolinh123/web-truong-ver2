"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, UploadCloud, CheckCircle, Calendar } from 'lucide-react';

const steps = [
  { title: 'Bước 1: Tìm hiểu & tư vấn', desc: 'Khám phá ngành học, lịch tuyển sinh, tham gia tư vấn trực tuyến hoặc trực tiếp tại trường.', icon: FileText },
  { title: 'Bước 2: Nộp hồ sơ online', desc: 'Đăng ký trực tuyến, tải bảng điểm/học bạ, portfolio số (nếu có), chọn đợt xét tuyển.', icon: UploadCloud },
  { title: 'Bước 3: Đánh giá', desc: 'Xét học bạ/điểm thi, phỏng vấn trực tuyến nếu cần; bổ sung giấy tờ theo yêu cầu.', icon: CheckCircle },
  { title: 'Bước 4: Nhập học', desc: 'Nhận kết quả, hoàn thiện thủ tục, đóng học phí, sắp xếp ký túc xá. Tuần sinh hoạt công dân đầu khóa.', icon: Calendar },
];

const ApplicationProcess: React.FC = () => {
  return (
    <section aria-labelledby="process-title">
      <h2 id="process-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Quy trình đăng ký</h2>
      <div className="relative pl-6 md:pl-10">
        <div className="absolute left-2 md:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 to-yellow-200" aria-hidden="true" />
        <ul className="space-y-6">
          {steps.map((s, idx) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6"
            >
              <div className="absolute -left-3 md:-left-5 top-6 w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center text-blue-700">
                  <s.icon />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900">{s.title}</h3>
                  <p className="text-slate-600 mt-2">{s.desc}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
        <div className="mt-6">
          <motion.a
            href="/dang-ky-truc-tuyen"
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label="Bắt đầu đăng ký"
          >
            Bắt đầu đăng ký
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;

