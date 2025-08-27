"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, Trees, Users } from 'lucide-react';

const CampusOverview: React.FC = () => {
  return (
    <section aria-labelledby="campus-overview-title">
      <h2 id="campus-overview-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Tổng quan khuôn viên</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <MapPin className="text-blue-700" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Vị trí & diện tích</h3>
              <p className="text-slate-600">36 Cầu Diễn, Bắc Từ Liêm, Hà Nội. Tổng diện tích 3 ha, không gian xanh và thân thiện.</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Building2 className="text-blue-700" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Cơ sở hạ tầng</h3>
              <p className="text-slate-600">20+ tòa nhà: khối học, hành chính, thư viện, trung tâm công nghệ, ký túc xá, thể thao.</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Users className="text-blue-700" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Sức chứa & dịch vụ</h3>
              <p className="text-slate-600">2.000+ chỗ ngồi học, 1.000+ chỗ ở KTX, khu thể thao, sinh hoạt cộng đồng.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CampusOverview;

