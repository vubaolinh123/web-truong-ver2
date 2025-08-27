"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Server, Network, ShieldCheck, Cpu } from 'lucide-react';

const items = [
  { icon: Server, title: 'Trung tâm dữ liệu mini', desc: 'Máy chủ học tập, hệ thống ảo hóa, lưu trữ nội bộ.' },
  { icon: Network, title: 'Hạ tầng mạng băng thông cao', desc: 'Wi‑Fi phủ sóng toàn campus, mạng có dây tốc độ gigabit.' },
  { icon: ShieldCheck, title: 'An toàn thông tin', desc: 'Thiết bị tường lửa, IDS/IPS, sandbox phục vụ thực hành.' },
  { icon: Cpu, title: 'Bản quyền phần mềm', desc: 'Bộ công cụ phát triển, mô phỏng mạng, bảo mật, thiết kế.' },
];

const TechnologyInfrastructure: React.FC = () => {
  return (
    <section aria-labelledby="tech-infra-title">
      <h2 id="tech-infra-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Hạ tầng công nghệ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
                <it.icon />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{it.title}</h3>
                <p className="text-slate-600">{it.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechnologyInfrastructure;

