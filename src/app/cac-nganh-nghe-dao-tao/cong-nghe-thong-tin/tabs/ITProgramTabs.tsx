"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  'Nội dung',
  'Tiến độ đào tạo',
  'Đối tượng',
  'Hình thức tuyển sinh',
  'Thời gian đào tạo',
  'Học phí',
] as const;

type Tab = typeof tabs[number];

const ITProgramTabs: React.FC = () => {
  const [active, setActive] = useState<Tab>('Nội dung');

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex flex-wrap gap-2 p-4 border-b border-slate-100">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${active === t ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
            aria-current={active === t}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {active === 'Nội dung' && (
            <motion.div key="noi-dung" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-6">
              <section aria-labelledby="it-overview">
                <h3 id="it-overview" className="text-xl font-semibold text-slate-900">TỔNG QUAN</h3>
                <p className="text-slate-700">Chương trình Công nghệ thông tin trang bị nền tảng vững chắc về phát triển phần mềm, kiến trúc hệ thống và vận hành dịch vụ hiện đại. Sinh viên được học kết hợp giữa lý thuyết và dự án thực tế.</p>
              </section>
              <section aria-labelledby="it-curriculum">
                <h3 id="it-curriculum" className="text-xl font-semibold text-slate-900">NỘI DUNG ĐÀO TẠO</h3>
                <ul className="list-disc list-inside text-slate-700">
                  <li>Cấu trúc dữ liệu & giải thuật, OOP và thiết kế phần mềm.</li>
                  <li>Phát triển web Frontend/Backend, API và bảo mật ứng dụng.</li>
                  <li>Cơ sở dữ liệu, tối ưu truy vấn, cache, message queue.</li>
                  <li>Triển khai Cloud, Docker, CI/CD và giám sát hệ thống.</li>
                </ul>
              </section>
              <section aria-labelledby="it-careers">
                <h3 id="it-careers" className="text-xl font-semibold text-slate-900">CƠ HỘI NGHỀ NGHIỆP</h3>
                <p className="text-slate-700">Cơ hội việc làm đa dạng: Full‑stack Developer, Backend Engineer, QA Engineer, DevOps Engineer, với lộ trình thăng tiến rõ ràng và mức lương cạnh tranh.</p>
              </section>
            </motion.div>
          )}

          {active === 'Tiến độ đào tạo' && (
            <motion.div key="tien-do" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4">
              <div>
                <h3 className="font-semibold">Học kỳ 1</h3>
                <ul className="list-disc list-inside text-slate-700">
                  <li>Toán ứng dụng, Nhập môn lập trình, Kỹ năng học tập đại học</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Học kỳ 2</h3>
                <ul className="list-disc list-inside text-slate-700">
                  <li>Cấu trúc dữ liệu & giải thuật, Cơ sở dữ liệu, Lập trình hướng đối tượng</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Học kỳ 3</h3>
                <ul className="list-disc list-inside text-slate-700">
                  <li>Phát triển web, Hệ điều hành, Mạng máy tính</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Học kỳ 4</h3>
                <ul className="list-disc list-inside text-slate-700">
                  <li>Cloud, DevOps cơ bản, Bảo mật ứng dụng</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Học kỳ 5</h3>
                <ul className="list-disc list-inside text-slate-700">
                  <li>Đồ án tốt nghiệp hoặc thực tập doanh nghiệp</li>
                </ul>
              </div>
            </motion.div>
          )}

          {active === 'Đối tượng' && (
            <motion.div key="doi-tuong" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2 text-slate-700">
              <p>Tốt nghiệp THPT hoặc tương đương. Yêu thích công nghệ, tư duy logic, khả năng tự học tốt.</p>
              <p>Ưu tiên thí sinh có nền tảng Toán/Tin và kỹ năng tiếng Anh cơ bản.</p>
            </motion.div>
          )}

          {active === 'Hình thức tuyển sinh' && (
            <motion.div key="hinh-thuc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2 text-slate-700">
              <p>Xét học bạ/điểm thi THPT, phỏng vấn trực tuyến (nếu cần). Nộp hồ sơ online, bổ sung portfolio dự án (khuyến khích).</p>
              <p>Lịch tuyển sinh theo đợt, cập nhật trên trang “Thông tin tuyển sinh”.</p>
            </motion.div>
          )}

          {active === 'Thời gian đào tạo' && (
            <motion.div key="thoi-gian" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-2 text-slate-700">
              <p>Thời gian đào tạo: 2.5–3 năm, chia theo 5 học kỳ linh hoạt. Lịch học kết hợp lý thuyết, thực hành phòng lab và dự án.</p>
            </motion.div>
          )}

          {active === 'Học phí' && (
            <motion.div key="hoc-phi" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4 text-slate-700">
              <p>Học phí tính theo tín chỉ, trung bình 300.000–450.000 VNĐ/tín chỉ (tham khảo). Dưới đây là ví dụ phân bổ theo học kỳ:</p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2 pr-4">Học kỳ</th>
                      <th className="py-2 pr-4">Môn học</th>
                      <th className="py-2 pr-4">Số tín chỉ</th>
                      <th className="py-2 pr-4">Học phí ước tính</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 pr-4">HK1</td>
                      <td className="py-2 pr-4">Toán ứng dụng, Nhập môn lập trình, Kỹ năng học tập</td>
                      <td className="py-2 pr-4">10</td>
                      <td className="py-2 pr-4">3.000.000 – 4.500.000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">HK2</td>
                      <td className="py-2 pr-4">CTDL&GT, CSDL, OOP</td>
                      <td className="py-2 pr-4">12</td>
                      <td className="py-2 pr-4">3.600.000 – 5.400.000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">HK3</td>
                      <td className="py-2 pr-4">Web, Hệ điều hành, Mạng máy tính</td>
                      <td className="py-2 pr-4">12</td>
                      <td className="py-2 pr-4">3.600.000 - 5.400.000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4">HK4</td>
                      <td className="py-2 pr-4">Cloud, DevOps, Bảo mật ứng dụng</td>
                      <td className="py-2 pr-4">12</td>
                      <td className="py-2 pr-4">3.600.000 - 5.400.000</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">HK5</td>
                      <td className="py-2 pr-4">Đồ án tốt nghiệp/Thực tập</td>
                      <td className="py-2 pr-4">10</td>
                      <td className="py-2 pr-4">3.000.000 – 4.500.000</td>
                    </tr>
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

export default ITProgramTabs;

