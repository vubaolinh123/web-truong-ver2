"use client";

import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { GraduationCap, Code, Cog, Briefcase, Printer, Lightbulb } from 'lucide-react';

import { homepagePrograms } from '@/data/programs';

interface ProgramCard {
  title: string;
  desc: string;
  img: string;
  icon: React.ReactNode;
  href: string;
}

const programs: ProgramCard[] = homepagePrograms.map((p) => ({
  title: p.name,
  desc: p.description,
  img: p.image,
  href: p.href,
  icon:
    p.name === 'Công nghệ thông tin' ? <GraduationCap /> :
    p.name === 'Lập trình máy tính' ? <Code /> :
    p.name === 'Công nghệ kỹ thuật cơ khí' ? <Cog /> :
    p.name === 'Quản trị kinh doanh' ? <Briefcase /> :
    p.name === 'Công nghệ in' ? <Printer /> :
    p.name === 'Công nghệ và đổi mới sáng tạo' ? <Lightbulb /> : <GraduationCap />,
}));


const ProgramsGrid: React.FC = () => {
  const featuredTitles = [
    'Công nghệ thông tin',
    'Lập trình máy tính',
    'Công nghệ kỹ thuật cơ khí',
    'Quản trị kinh doanh',
    'Công nghệ in',
    'Công nghệ và đổi mới sáng tạo',
  ];
  const displayedPrograms = programs.filter(p => featuredTitles.includes(p.title));
  return (
    <section aria-labelledby="programs-grid-title">
      <h2 id="programs-grid-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Danh mục chương trình</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayedPrograms.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md h-full flex flex-col"
          >
            <div className="relative h-44 bg-slate-50">
              <OptimizedImage src={p.img} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" loading="lazy" />
            </div>
            <div className="p-5 flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">{p.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="text-slate-600">{p.desc}</p>


              <div className="mt-auto pt-4 flex items-center gap-3">
                <a
                  href={p.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-600"
                  aria-label={`Tìm hiểu thêm về ${p.title}`}
                >
                  Tìm hiểu thêm
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ProgramsGrid;

