"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Medal, Trophy, Star } from 'lucide-react';

const achievements = [
  { icon: Award, title: 'Top 10 cơ sở đào tạo CNTT', desc: 'Được ghi nhận trong các kỳ bình chọn cấp thành phố.' },
  { icon: Medal, title: 'Giải thưởng sáng tạo', desc: 'Sinh viên đạt nhiều giải tại các cuộc thi công nghệ quốc gia.' },
  { icon: Trophy, title: 'Hợp tác doanh nghiệp', desc: 'Mạng lưới hợp tác với 50+ doanh nghiệp công nghệ.' },
  { icon: Star, title: 'Tỉ lệ có việc làm cao', desc: '85% sinh viên có việc làm trong 6 tháng sau tốt nghiệp.' },
];

const Achievements: React.FC = () => {
  return (
    <section aria-labelledby="achievements-title">
      <h2 id="achievements-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Thành tựu nổi bật</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-700 flex items-center justify-center">
                <a.icon />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{a.title}</h3>
                <p className="text-slate-600 text-sm">{a.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;

