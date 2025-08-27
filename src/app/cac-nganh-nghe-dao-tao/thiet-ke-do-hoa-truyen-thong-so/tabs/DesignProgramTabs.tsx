"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = ['Nội dung','Tiến độ đào tạo','Đối tượng','Hình thức tuyển sinh','Thời gian đào tạo','Học phí'] as const;

type Tab = typeof tabs[number];

const DesignProgramTabs: React.FC = () => {
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
              <section aria-labelledby="des-overview">
                <h3 id="des-overview" className="text-xl font-semibold text-slate-900">TỔNG QUAN</h3>
                <p className="text-slate-700">Kết hợp mỹ thuật ứng dụng và công nghệ số: thiết kế thương hiệu, UI trực quan, nội dung động và hậu kỳ cơ bản. Tập trung xây dựng portfolio số.</p>
              </section>
              <section aria-labelledby="des-curriculum">
                <h3 id="des-curriculum" className="text-xl font-semibold text-slate-900">NỘI DUNG ĐÀO TẠO</h3>
                <ul className="list-disc list-inside text-slate-700">
                  <li>Nguyên lý thiết kế, màu sắc, typography.</li>
                  <li>Thiết kế thương hiệu, poster, ấn phẩm số.</li>
                  <li>UI cơ bản, motion graphics, dựng phim.</li>
                  <li>Quy trình làm việc với brief doanh nghiệp.</li>
                </ul>
              </section>
              <section aria-labelledby="des-careers">
                <h3 id="des-careers" className="text-xl font-semibold text-slate-900">CƠ HỘI NGHỀ NGHIỆP</h3>
                <p className="text-slate-700">Graphic Designer, Content Creator, Motion Designer, UI Visual Artist, Social Media Designer.</p>
              </section>
            </motion.div>
          )}
          {active === 'Tiến độ đào tạo' && (
            <motion.div key="tien-do" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4">
              <div><h3 className="font-semibold">Học kỳ 1</h3><ul className="list-disc list-inside text-slate-700"><li>Cơ sở mỹ thuật, Photoshop, Kỹ năng học tập</li></ul></div>
              <div><h3 className="font-semibold">Học kỳ 2</h3><ul className="list-disc list-inside text-slate-700"><li>Illustrator, Nguyên lý thiết kế, Typography</li></ul></div>
              <div><h3 className="font-semibold">Học kỳ 3</h3><ul className="list-disc list-inside text-slate-700"><li>Thiết kế thương hiệu, UI cơ bản, Motion</li></ul></div>
              <div><h3 className="font-semibold">Học kỳ 4</h3><ul className="list-disc list-inside text-slate-700"><li>Dự án thực tế, Dựng phim cơ bản</li></ul></div>
              <div><h3 className="font-semibold">Học kỳ 5</h3><ul className="list-disc list-inside text-slate-700"><li>Portfolio & Thực tập</li></ul></div>
            </motion.div>
          )}
          {active === 'Đối tượng' && (<motion.div key="doi-tuong" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2 text-slate-700"><p>Tốt nghiệp THPT; đam mê thiết kế và sáng tạo nội dung số.</p><p>Ưu tiên thí sinh có thẩm mỹ và kỹ năng phần mềm đồ họa cơ bản.</p></motion.div>)}
          {active === 'Hình thức tuyển sinh' && (<motion.div key="hinh-thuc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2 text-slate-700"><p>Xét học bạ/điểm thi; phỏng vấn/đánh giá portfolio (khuyến khích).</p></motion.div>)}
          {active === 'Thời gian đào tạo' && (<motion.div key="thoi-gian" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2 text-slate-700"><p>2–2.5 năm; linh hoạt giữa lý thuyết và dự án sáng tạo.</p></motion.div>)}
          {active === 'Học phí' && (
            <motion.div key="hoc-phi" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4 text-slate-700">
              <p>Học phí theo tín chỉ (300.000–450.000 VNĐ/tín chỉ). Ví dụ phân bổ:</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead><tr className="text-left border-b"><th className="py-2 pr-4">Học kỳ</th><th className="py-2 pr-4">Môn học</th><th className="py-2 pr-4">Tín chỉ</th><th className="py-2 pr-4">Học phí ước tính</th></tr></thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 pr-4">HK1</td><td className="py-2 pr-4">Cơ sở mỹ thuật, Photoshop, Kỹ năng</td><td className="py-2 pr-4">10</td><td className="py-2 pr-4">3.0–4.5 triệu</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4">HK2</td><td className="py-2 pr-4">Illustrator, Nguyên lý thiết kế, Typography</td><td className="py-2 pr-4">12</td><td className="py-2 pr-4">3.6–5.4 triệu</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4">HK3</td><td className="py-2 pr-4">Branding, UI, Motion</td><td className="py-2 pr-4">12</td><td className="py-2 pr-4">3.6–5.4 triệu</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4">HK4</td><td className="py-2 pr-4">Dự án, Dựng phim</td><td className="py-2 pr-4">12</td><td className="py-2 pr-4">3.6–5.4 triệu</td></tr>
                    <tr><td className="py-2 pr-4">HK5</td><td className="py-2 pr-4">Portfolio/Thực tập</td><td className="py-2 pr-4">10</td><td className="py-2 pr-4">3.0–4.5 triệu</td></tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DesignProgramTabs;

