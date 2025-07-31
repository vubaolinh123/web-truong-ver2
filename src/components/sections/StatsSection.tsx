'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Users, GraduationCap, BookOpen, Award } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Utility function to format numbers consistently across server and client
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

interface StatItem {
  icon: React.ReactNode;
  number: number;
  label: string;
  suffix?: string;
  color: string;
}

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats: StatItem[] = [
    {
      icon: <Users size={40} />,
      number: 25000,
      label: 'Sinh viên',
      suffix: '+',
      color: 'text-primary-blue'
    },
    {
      icon: <GraduationCap size={40} />,
      number: 15000,
      label: 'Cử nhân tốt nghiệp',
      suffix: '+',
      color: 'text-primary-yellow'
    },
    {
      icon: <BookOpen size={40} />,
      number: 45,
      label: 'Chương trình đào tạo',
      suffix: '',
      color: 'text-accent-blue'
    },
    {
      icon: <Award size={40} />,
      number: 98,
      label: 'Tỷ lệ có việc làm',
      suffix: '%',
      color: 'text-secondary-yellow'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary-blue to-secondary-blue relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase"
          >
            SỐ LIỆU TIÊU BIỂU
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">
              Cam kết chất lượng giáo dục
            </h3>
            <p className="text-white/90 leading-relaxed">
              Với hơn 50 năm kinh nghiệm trong lĩnh vực đào tạo tài nguyên và môi trường, 
              trường đã khẳng định vị thế là một trong những cơ sở giáo dục đại học hàng đầu 
              trong khu vực, đóng góp tích cực vào sự phát triển bền vững của đất nước.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface StatCardProps {
  stat: StatItem;
  index: number;
  isInView: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = stat.number / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.number) {
        setCount(stat.number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, stat.number]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="text-center group"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
        {/* Icon */}
        <div className={`${stat.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
          {stat.icon}
        </div>

        {/* Number */}
        <div className="mb-2">
          <span className="text-4xl md:text-5xl font-bold text-white">
            {formatNumber(count)}
          </span>
          <span className="text-2xl md:text-3xl font-bold text-primary-yellow">
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-white/90 font-medium text-lg">
          {stat.label}
        </p>

        {/* Decorative Line */}
        <div className="w-12 h-1 bg-primary-yellow mx-auto mt-4 rounded-full group-hover:w-16 transition-all duration-300"></div>
      </div>
    </motion.div>
  );
};

export default StatsSection;
