"use client";

import React from 'react';
import { motion } from 'framer-motion';

const phases = [
  {
    step: 1,
    title: 'Học kỳ 1',
    subtitle: 'Nền tảng',
    desc: 'Toán cơ bản/ứng dụng, kỹ năng học tập, nhập môn chuyên ngành; xây dựng thói quen tự học và tư duy hệ thống.'
  },
  {
    step: 2,
    title: 'Học kỳ 2–3',
    subtitle: 'Kiến thức cốt lõi',
    desc: 'Học phần cơ sở ngành + lab/xưởng. Tăng dần độ khó, bài tập dự án nhóm, áp dụng quy trình và công cụ.'
  },
  {
    step: 3,
    title: 'Học kỳ 4',
    subtitle: 'Chuyên sâu & Ứng dụng',
    desc: 'Học phần chuyên sâu theo lĩnh vực, project tích hợp, seminar với chuyên gia doanh nghiệp.'
  },
  {
    step: 4,
    title: 'Học kỳ 5',
    subtitle: 'Đồ án/Thực tập',
    desc: 'Đồ án tốt nghiệp hoặc thực tập tại doanh nghiệp; hoàn thiện portfolio và kỹ năng phỏng vấn.'
  },
  {
    step: 5,
    title: 'Tốt nghiệp',
    subtitle: 'Sẵn sàng nghề nghiệp',
    desc: 'Đạt chuẩn đầu ra, có kinh nghiệm dự án và hồ sơ nghề nghiệp; kết nối việc làm qua mạng lưới đối tác.'
  }
];

const ProgramStructureTimeline: React.FC = () => {
  return (
    <div className="w-full">
      {/* Desktop/Tablet: horizontal steps */}
      <div className="hidden md:block">
        <div className="relative">
          {/* connecting line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-blue-100" aria-hidden />
          <div className="grid grid-cols-5 gap-6">
            {phases.map((p, idx) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="relative"
              >
                <div className="flex items-center gap-3">
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-lg ring-4 ring-blue-100">
                    <span className="font-bold">{p.step}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#2563eb] uppercase tracking-wide">{p.subtitle}</div>
                    <div className="text-base font-bold text-slate-900">{p.title}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-700">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden">
        <div className="relative pl-6">
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-blue-100" aria-hidden />
          <div className="space-y-6">
            {phases.map((p, idx) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="relative"
              >
                <div className="absolute -left-1 top-1 h-6 w-6 rounded-full bg-[#2563eb] ring-4 ring-blue-100" aria-hidden />
                <div className="ml-4">
                  <div className="text-xs font-semibold text-[#2563eb] uppercase tracking-wide">{p.subtitle}</div>
                  <div className="text-sm font-bold text-slate-900">{p.title}</div>
                  <p className="mt-2 text-sm text-slate-700">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramStructureTimeline;

