"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = ['Nội dung','Tiến độ đào tạo','Đối tượng','Hình thức tuyển sinh','Thời gian đào tạo','Học phí'] as const;

type Tab = typeof tabs[number];

const InfoSecProgramTabs: React.FC = () => {
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
              <section aria-labelledby="is-overview">
                <h3 id="is-overview" className="text-xl font-semibold text-slate-900">TỔNG QUAN</h3>
                <p className="text-slate-700">Chương trình tập trung vào bảo mật hệ thống, phân tích rủi ro, kiểm thử thâm nhập và điều tra số. Sinh viên được thực hành với thiết bị firewall, IDS/IPS và công cụ forensics.</p>
              </section>
              <section aria-labelledby="is-curriculum">
                <h3 id="is-curriculum" className="text-xl font-semibold text-slate-900">NỘI DUNG ĐÀO TẠO</h3>
                <ul className="list-disc list-inside text-slate-700">
                  <li>Kiến trúc bảo mật, quản trị an ninh mạng.</li>
                  <li>Phân tích mã độc, điều tra số, ứng cứu sự cố.</li>
                  <li>Kiểm thử thâm nhập, bảo mật ứng dụng web.</li>
                  <li>Giám sát an ninh (SIEM), chính sách và tuân thủ.</li>
                </ul>
              </section>
              <section aria-labelledby="is-careers">
                <h3 id="is-careers" className="text-xl font-semibold text-slate-900">CƠ HỘI NGHỀ NGHIỆP</h3>
                <p className="text-slate-700">Security Analyst, Pentester, SOC Analyst, Network Security Engineer, Incident Responder.</p>
              </section>
            </motion.div>
          )}
          {active === 'Tiến độ đào tạo' && (
            <motion.div key="tien-do" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4">
              <div><h3 className="font-semibold">Học kỳ 1</h3><ul className="list-disc list-inside text-slate-700"><li>Cơ sở CNTT, Nhập môn mạng, Kỹ năng học tập</li></ul></div>
              <div><h3 className="font-semibold">Học kỳ 2</h3><ul className="list-disc list-inside text-slate-700"><li>Hệ điều hành, Mạng máy tính, Lập trình cơ bản</li></ul></div>
              <div><h3 className="font-semibold">Học kỳ 3</h3><ul className="list-disc list-inside text-slate-700"><li>An ninh mạng, Pentest cơ bản, Forensics</li></ul></div>
              <div><h3 className="font-semibold">Học kỳ 4</h3><ul className="list-disc list-inside text-slate-700"><li>SIEM, Ứng cứu sự cố, Bảo mật ứng dụng</li></ul></div>
              <div><h3 className="font-semibold">Học kỳ 5</h3><ul className="list-disc list-inside text-slate-700"><li>Đồ án/Thực tập</li></ul></div>
            </motion.div>
          )}
          {active === 'Đối tượng' && (<motion.div key="doi-tuong" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2 text-slate-700"><p>Tốt nghiệp THPT; thích bảo mật, tư duy logic, kiên nhẫn và cẩn trọng.</p><p>Ưu tiên nền tảng mạng và hệ điều hành.</p></motion.div>)}
          {active === 'Hình thức tuyển sinh' && (<motion.div key="hinh-thuc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2 text-slate-700"><p>Xét học bạ/điểm thi; có thể phỏng vấn trực tuyến. Khuyến khích portfolio dự án bảo mật.</p></motion.div>)}
          {active === 'Thời gian đào tạo' && (<motion.div key="thoi-gian" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2 text-slate-700"><p>2.5–3 năm, kết hợp học lý thuyết và phòng lab chuyên dụng.</p></motion.div>)}
          {active === 'Học phí' && (
            <motion.div key="hoc-phi" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4 text-slate-700">
              <p>Học phí dựa trên tín chỉ (300.000–450.000 VNĐ/tín chỉ). Ví dụ phân bổ:</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead><tr className="text-left border-b"><th className="py-2 pr-4">Học kỳ</th><th className="py-2 pr-4">Môn học</th><th className="py-2 pr-4">Tín chỉ</th><th className="py-2 pr-4">Học phí ước tính</th></tr></thead>
                  <tbody>
                    <tr className="border-b"><td className="py-2 pr-4">HK1</td><td className="py-2 pr-4">Cơ sở CNTT, Nhập môn mạng, Kỹ năng</td><td className="py-2 pr-4">10</td><td className="py-2 pr-4">3.0–4.5 triệu</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4">HK2</td><td className="py-2 pr-4">Hệ điều hành, Lập trình, Mạng</td><td className="py-2 pr-4">12</td><td className="py-2 pr-4">3.6–5.4 triệu</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4">HK3</td><td className="py-2 pr-4">An ninh mạng, Pentest, Forensics</td><td className="py-2 pr-4">12</td><td className="py-2 pr-4">3.6–5.4 triệu</td></tr>
                    <tr className="border-b"><td className="py-2 pr-4">HK4</td><td className="py-2 pr-4">SIEM, Ứng cứu sự cố, Bảo mật ứng dụng</td><td className="py-2 pr-4">12</td><td className="py-2 pr-4">3.6–5.4 triệu</td></tr>
                    <tr><td className="py-2 pr-4">HK5</td><td className="py-2 pr-4">Đồ án/Thực tập</td><td className="py-2 pr-4">10</td><td className="py-2 pr-4">3.0–4.5 triệu</td></tr>
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

export default InfoSecProgramTabs;

