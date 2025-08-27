"use client";

import React from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface Program {
  title: string;
  desc: string;
  careers: string[];
  img: string;
}

const programs: Program[] = [
  {
    title: 'Công nghệ thông tin',
    desc:
      'Chương trình trọng điểm với các học phần về cấu trúc dữ liệu & giải thuật, lập trình web, cơ sở dữ liệu, điện toán đám mây và DevOps. Nhấn mạnh dự án thực tế và kỹ năng làm việc nhóm.',
    careers: ['Lập trình viên Full‑stack', 'Kỹ sư DevOps', 'Chuyên viên QA/QC'],
    img: '/images/program-it.jpg',
  },
  {
    title: 'An toàn thông tin',
    desc:
      'Trang bị kiến thức về bảo mật hệ thống, pentest, mã độc, forensics, quản trị an ninh mạng. Phòng lab chuyên dụng với thiết bị tường lửa, IDS/IPS, sandbox thực hành.',
    careers: ['Chuyên viên bảo mật', 'Pentester', 'Quản trị an ninh mạng'],
    img: '/images/program-cyber.jpg',
  },
  {
    title: 'Thiết kế đồ họa & Truyền thông số',
    desc:
      'Kết hợp mỹ thuật ứng dụng và công nghệ: thiết kế thương hiệu, giao diện số, motion graphics, dựng phim cơ bản. Khuyến khích xây dựng portfolio số và hợp tác với doanh nghiệp.',
    careers: ['Designer', 'Content Creator', 'UI Visual Artist'],
    img: '/images/program-design.jpg',
  },
  {
    title: 'Mạng máy tính và Truyền thông dữ liệu',
    desc:
      'Trang bị kiến thức về thiết kế, triển khai và vận hành hạ tầng mạng doanh nghiệp; định tuyến, chuyển mạch, QoS và bảo mật lớp mạng. Thực hành với thiết bị Cisco/Juniper và mô phỏng hiện đại.',
    careers: ['Kỹ sư mạng', 'Chuyên viên vận hành hệ thống', 'Kỹ thuật viên hạ tầng'],
    img: '/images/program-network.jpg',
  },
  {
    title: 'Quản trị mạng và Bảo mật thông tin',
    desc:
      'Tập trung quản trị hệ thống Windows/Linux, dịch vụ doanh nghiệp (AD, DNS, Mail), triển khai bảo mật đa lớp và giám sát an ninh. Gắn với chuẩn nghề nghiệp và tình huống thực tế.',
    careers: ['Quản trị hệ thống', 'Chuyên viên SOC', 'Kỹ sư bảo mật hạ tầng'],
    img: '/images/program-secops.jpg',
  },
  {
    title: 'Lập trình ứng dụng di động',
    desc:
      'Học phát triển ứng dụng native/hybrid cho iOS/Android, kiến trúc MVVM, phát hành và phân tích sản phẩm. Nhấn mạnh UX di động, tối ưu hiệu năng và bảo mật ứng dụng.',
    careers: ['Mobile Developer', 'Flutter/React Native Engineer', 'Product Developer'],
    img: '/images/program-mobile.jpg',
  },
  {
    title: 'Trí tuệ nhân tạo và Học máy',
    desc:
      'Cung cấp nền tảng ML/DL, xử lý dữ liệu, học có giám sát/không giám sát, CNN/RNN, MLOps cơ bản. Ứng dụng trong thị giác máy tính, NLP và hệ gợi ý.',
    careers: ['Machine Learning Engineer', 'Data Scientist (Junior)', 'AI Research Assistant'],
    img: '/images/program-ai.jpg',
  },
  {
    title: 'Thương mại điện tử',
    desc:
      'Kết hợp kiến thức CNTT và kinh doanh số: vận hành sàn thương mại, SEO/SEM, phân tích dữ liệu khách hàng, marketing tự động, thanh toán số và logistics.',
    careers: ['Chuyên viên E‑commerce', 'Digital Marketing Executive', 'Growth Analyst'],
    img: '/images/program-ecommerce.jpg',
  },
];

const Programs: React.FC = () => {
  return (
    <section aria-labelledby="programs-title">
      <h2 id="programs-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Ngành học & chuyên ngành</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programs.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md"
          >
            <div className="relative h-44 bg-slate-50">
              <OptimizedImage src={p.img} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" loading="lazy" />
            </div>
            <div className="p-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center"><GraduationCap /></div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{p.title}</h3>
              <p className="text-slate-600">{p.desc}</p>
              <ul className="mt-2 text-slate-700 list-disc list-inside">
                {p.careers.map(c => <li key={c}>{c}</li>)}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Programs;

