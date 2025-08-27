"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, BookOpenCheck, Users, Globe } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const items: TimelineItem[] = [
  {
    year: '2010',
    title: 'Thành lập trường',
    description: 'Trường chính thức được thành lập với sứ mệnh đào tạo nguồn nhân lực CNTT chất lượng cao.',
    icon: <Calendar className="text-blue-600" />
  },
  {
    year: '2013',
    title: 'Mở rộng chương trình đào tạo',
    description: 'Ra mắt các chương trình đào tạo Lập trình, An toàn thông tin, Thiết kế đồ họa.',
    icon: <BookOpenCheck className="text-blue-600" />
  },
  {
    year: '2016',
    title: 'Hợp tác doanh nghiệp',
    description: 'Ký kết hợp tác với các doanh nghiệp công nghệ trong và ngoài nước, tăng cơ hội việc làm cho sinh viên.',
    icon: <Globe className="text-blue-600" />
  },
  {
    year: '2019',
    title: 'Thành tựu nghiên cứu',
    description: 'Đạt nhiều giải thưởng về nghiên cứu khoa học cấp bộ và thành phố.',
    icon: <Award className="text-blue-600" />
  },
  {
    year: '2023',
    title: 'Chuyển đổi số toàn diện',
    description: 'Ứng dụng nền tảng số trong quản lý, giảng dạy và đánh giá học tập toàn trường.',
    icon: <Users className="text-blue-600" />
  }
];

const Timeline: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Các cột mốc quan trọng</h2>
      <div className="relative pl-6 md:pl-10">
        {/* Vertical line */}
        <div className="absolute left-2 md:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 to-yellow-200" aria-hidden="true" />

        <ul className="space-y-6">
          {items.map((item, idx) => (
            <motion.li
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6"
            >
              {/* Node */}
              <div className="absolute -left-3 md:-left-5 top-6 w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm text-slate-500 font-medium">{item.year}</div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 mt-1">{item.title}</h3>
                  <p className="text-slate-600 mt-2">{item.description}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Timeline;

