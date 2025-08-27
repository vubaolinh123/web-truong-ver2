"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Building2, GraduationCap, Rocket } from 'lucide-react';

const StatCard = ({ value, label, icon: Icon }: { value: string; label: string; icon: any }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}
    className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
        <Icon />
      </div>
      <div>
        <div className="text-2xl font-extrabold text-slate-900">{value}</div>
        <div className="text-slate-600">{label}</div>
      </div>
    </div>
  </motion.div>
);

const StatsAndVision: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-10">
      <section aria-labelledby="stats-title">
        <h2 id="stats-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Thống kê hiện tại</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard value="3.000+" label="Sinh viên đang theo học" icon={Users} />
          <StatCard value="120+" label="Giảng viên, cán bộ" icon={BookOpen} />
          <StatCard value="12" label="Chuyên ngành đào tạo" icon={Building2} />
          <StatCard value="85%" label="Có việc làm sau tốt nghiệp" icon={GraduationCap} />
        </div>
      </section>

      <section aria-labelledby="vision-title">
        <h2 id="vision-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Tầm nhìn & mục tiêu</h2>
        <div className="bg-gradient-to-r from-blue-50 to-yellow-50 border border-slate-100 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
              <Rocket />
            </div>
            <div className="space-y-2 text-slate-700">
              <p>
                Nhà trường hướng tới trở thành cơ sở đào tạo ứng dụng xuất sắc trong lĩnh vực Công nghệ Thông tin và Truyền thông,
                tiên phong trong chuyển đổi số giáo dục, gắn kết chặt chẽ với doanh nghiệp và cộng đồng.
              </p>
              <ul className="list-disc list-inside ml-2">
                <li>Tăng cường hợp tác quốc tế và chương trình liên kết.</li>
                <li>Phát triển hệ sinh thái khởi nghiệp đổi mới sáng tạo.</li>
                <li>Nâng cao chất lượng đào tạo theo chuẩn năng lực nghề nghiệp.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsAndVision;

