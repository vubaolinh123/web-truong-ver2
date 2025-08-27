"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = ['Nội dung','Tiến độ đào tạo','Đối tượng','Hình thức tuyển sinh','Thời gian đào tạo','Học phí'] as const;

type Tab = typeof tabs[number];

const InnovProgramTabs: React.FC = () => {
  const [active, setActive] = useState<Tab>('Nội dung');

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex flex-wrap gap-2 p-4 border-b border-slate-100">
        {tabs.map((t) => (
          <button key={t} onClick={() => setActive(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${active === t ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`} aria-current={active === t}>{t}</button>
        ))}
      </div>
      <div className="p-6">
        <AnimatePresence mode="wait">
          {active === 'Nội dung' && (
            <motion.div key="noi-dung" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-6">
              <section aria-labelledby="innov-overview"><h3 id="innov-overview" className="text-xl font-semibold text-slate-900">TỔNG QUAN</h3><p className="text-slate-700">Tư duy đổi mới sáng tạo, quy trình thiết kế sản phẩm (Design Thinking), khởi nghiệp và công nghệ mới.</p></section>
              <section aria-labelledby="innov-curriculum"><h3 id="innov-curriculum" className="text-xl font-semibold text-slate-900">NỘI DUNG ĐÀO TẠO</h3><ul className="list-disc list-inside text-slate-700"><li>Design Thinking & Product Discovery.</li><li>Prototyping, MVP, kiểm thử người dùng.</li><li>Kỹ năng pitching, gọi vốn, mô hình kinh doanh.</li><li>Cập nhật công nghệ mới (AI, IoT, XR... ở mức nhập môn).</li></ul></section>
              <section aria-labelledby="innov-careers"><h3 id="innov-careers" className="text-xl font-semibold text-slate-900">CƠ HỘI NGHỀ NGHIỆP</h3><p className="text-slate-700">Product Associate, Innovation Specialist (Jr), Startup Founder (early stage).</p></section>
            </motion.div>
          )}
          {active === 'Tiến độ đào tạo' && (
            <motion.div key="tien-do" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4">
              <div><h3 className="font-semibold">Học kỳ 1</h3><ul className="list-disc list-inside text-slate-700"><li>Tư duy sáng tạo, Kỹ năng học tập</li></ul></div>
              <div><h3 className="font-semibold">Học kỳ 2</h3><ul className="list-disc list-inside text-slate-700"><li>Design Thinking, Product Discovery</li></ul></div>
              <div><h3 className="font-semibold">Học kỳ 3</h3><ul className="list-disc list-inside text-slate-700"><li>MVP, Prototyping, UX cơ bản</li></ul></div>
              <div><h3 className="font-semibold">Học kỳ 4</h3><ul className="list-disc list-inside text-slate-700"><li>Mô hình kinh doanh, Pitching</li></ul></div>
              <div><h3 className="font-semibold">Học kỳ 5</h3><ul className="list-disc list-inside text-slate-700"><li>Thực tập/Thử nghiệm startup</li></ul></div>
            </motion.div>
          )}
          {active === 'Đối tượng' && (<motion.div key="doi-tuong" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2 text-slate-700"><p>Tốt nghiệp THPT; yêu thích sản phẩm, khởi nghiệp.</p><p>Ưu tiên tư duy sáng tạo và giao tiếp tốt.</p></motion.div>)}
          {active === 'Hình thức tuyển sinh' && (<motion.div key="hinh-thuc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2 text-slate-700"><p>Xét học bạ/điểm thi; có thể phỏng vấn định hướng.</p></motion.div>)}
          {active === 'Thời gian đào tạo' && (<motion.div key="thoi-gian" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2 text-slate-700"><p>2–2.5 năm; thiên về dự án & sản phẩm.</p></motion.div>)}
          {active === 'Học phí' && (
            <motion.div key="hoc-phi" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4 text-slate-700">
              <p>Học phí theo tín chỉ (300k–450k/tín chỉ). Ví dụ phân bổ:</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead><tr className="text-left border-b"><th className="py-2 pr-4">HK</th><th className="py-2 pr-4">Môn</th><th className="py-2 pr-4">TC</th><th className="py-2 pr-4">Học phí</th></tr></thead>
                  <tbody><tr className="border-b"><td className="py-2 pr-4">HK1</td><td className="py-2 pr-4">Tư duy sáng tạo, Kỹ năng</td><td className="py-2 pr-4">10</td><td className="py-2 pr-4">3.0–4.5 triệu</td></tr><tr className="border-b"><td className="py-2 pr-4">HK2</td><td className="py-2 pr-4">Design Thinking, Discovery</td><td className="py-2 pr-4">12</td><td className="py-2 pr-4">3.6–5.4 triệu</td></tr><tr className="border-b"><td className="py-2 pr-4">HK3</td><td className="py-2 pr-4">MVP, Prototype, UX</td><td className="py-2 pr-4">12</td><td className="py-2 pr-4">3.6–5.4 triệu</td></tr><tr className="border-b"><td className="py-2 pr-4">HK4</td><td className="py-2 pr-4">Biz Model, Pitch</td><td className="py-2 pr-4">12</td><td className="py-2 pr-4">3.6–5.4 triệu</td></tr><tr><td className="py-2 pr-4">HK5</td><td className="py-2 pr-4">Thực tập/Startup</td><td className="py-2 pr-4">10</td><td className="py-2 pr-4">3.0–4.5 triệu</td></tr></tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InnovProgramTabs;

