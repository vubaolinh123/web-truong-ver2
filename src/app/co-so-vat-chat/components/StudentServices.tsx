"use client";

import React from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { motion } from 'framer-motion';
import { BedDouble, UtensilsCrossed, Dumbbell, HeartPulse } from 'lucide-react';

const items = [
  { icon: BedDouble, title: 'Ký túc xá', desc: 'Phòng ở khang trang, an ninh 24/7, khu sinh hoạt chung.', img: '/images/facility-dorm.jpg' },
  { icon: UtensilsCrossed, title: 'Căng tin', desc: 'Suất ăn dinh dưỡng, giá hợp lý, vệ sinh an toàn thực phẩm.', img: '/images/facility-canteen.jpg' },
  { icon: Dumbbell, title: 'Thể thao', desc: 'Sân bóng, bóng rổ, phòng gym; hoạt động thể thao sôi nổi.', img: '/images/facility-sports.jpg' },
  { icon: HeartPulse, title: 'Y tế & an toàn', desc: 'Phòng y tế, PCCC, lối đi tiếp cận cho người khuyết tật.', img: '/images/facility-health.jpg' },
];

const StudentServices: React.FC = () => {
  return (
    <section aria-labelledby="student-services-title">
      <h2 id="student-services-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Dịch vụ sinh viên</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <motion.article
            key={it.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="relative h-40 bg-slate-50">
              <OptimizedImage src={it.img} alt={it.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover" loading="lazy" />
            </div>
            <div className="p-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <it.icon />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{it.title}</h3>
              <p className="text-slate-600">{it.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default StudentServices;

