"use client";

import React from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { GraduationCap, Shield, Palette, Network, Server, Smartphone, Brain, ShoppingCart } from 'lucide-react';

interface Program {
  title: string;
  desc: string;
  highlights: string[];
  careers: string[];
  demand: string;
  salary: string;
  duration: string;
  cert: string;
  img: string;
  icon: React.ReactNode;
}

const programs: Program[] = [
  {
    title: 'Công nghệ thông tin',
    desc:
      'Chương trình toàn diện hướng tới năng lực phát triển phần mềm hiện đại: cấu trúc dữ liệu & giải thuật, lập trình web/mobile, hệ quản trị CSDL, DevOps và cloud-native. Sinh viên làm dự án theo nhóm, áp dụng quy trình Agile và CI/CD thực tế.',
    highlights: ['CSDL & Backend', 'Frontend/Full‑stack', 'Cloud & DevOps'],
    careers: ['Full‑stack Developer', 'Backend Engineer', 'QA Engineer', 'DevOps Engineer'],
    demand: 'Nhu cầu tuyển dụng cao, đặc biệt mảng web và dịch vụ nền tảng.',
    salary: 'Lương khởi điểm 10–18 triệu VNĐ tuỳ vị trí và năng lực.',
    duration: '2.5–3 năm',
    cert: 'Bằng Cao đẳng chính quy',
    img: '/images/program-it.jpg',
    icon: <GraduationCap />,
  },
  {
    title: 'An toàn thông tin',
    desc:
      'Tập trung bảo mật hệ thống, pentest, phân tích mã độc, điều tra số và quản trị an ninh mạng. Phòng lab chuyên dụng với firewall, IDS/IPS, SIEM và sandbox. Chú trọng kỹ năng thực hành qua bài lab và mô phỏng sự cố.',
    highlights: ['Pentest & Forensics', 'Security Operations', 'Network Security'],
    careers: ['Security Analyst', 'Pentester', 'SOC Analyst', 'Network Security Engineer'],
    demand: 'Nhu cầu gia tăng mạnh mẽ do chuyển đổi số và yêu cầu tuân thủ.',
    salary: 'Lương khởi điểm 12–20 triệu VNĐ.',
    duration: '2.5–3 năm',
    cert: 'Bằng Cao đẳng chính quy',
    img: '/images/program-cyber.jpg',
    icon: <Shield />,
  },
  {
    title: 'Thiết kế đồ họa & Truyền thông số',
    desc:
      'Kết hợp mỹ thuật ứng dụng và công nghệ: thương hiệu, UI trực quan, motion graphics, dựng phim cơ bản và nội dung số. Định hướng portfolio số, làm việc thực tế với brief doanh nghiệp.',
    highlights: ['Branding', 'UI Visual', 'Motion Graphics'],
    careers: ['Graphic Designer', 'Content Creator', 'Motion Designer', 'UI Visual Artist'],
    demand: 'Nhu cầu cao trong marketing số và sản xuất nội dung.',
    salary: 'Lương khởi điểm 8–15 triệu VNĐ.',
    duration: '2–2.5 năm',
    cert: 'Bằng Cao đẳng chính quy',
    img: '/images/program-design.jpg',
    icon: <Palette />,
  },
  {
    title: 'Mạng máy tính và Truyền thông dữ liệu',
    desc:
      'Trang bị năng lực thiết kế, triển khai, vận hành hạ tầng mạng doanh nghiệp: định tuyến, chuyển mạch, QoS, VPN và giám sát. Thực hành với thiết bị Cisco/Juniper và mô phỏng mạng hiện đại.',
    highlights: ['Routing & Switching', 'WAN & VPN', 'Network Monitoring'],
    careers: ['Network Engineer', 'System Operator', 'Infra Technician', 'NOC Staff'],
    demand: 'Doanh nghiệp luôn cần vận hành hệ thống ổn định, bảo mật.',
    salary: 'Lương khởi điểm 10–16 triệu VNĐ.',
    duration: '2.5–3 năm',
    cert: 'Bằng Cao đẳng chính quy',
    img: '/images/program-network.jpg',
    icon: <Network />,
  },
  {
    title: 'Quản trị mạng và Bảo mật thông tin',
    desc:
      'Tập trung quản trị hệ thống Windows/Linux, dịch vụ doanh nghiệp (AD, DNS, Mail), sao lưu, giám sát và bảo vệ hạ tầng. Rèn luyện quy trình vận hành, khắc phục sự cố và tuân thủ.',
    highlights: ['System Admin', 'Enterprise Services', 'Hardening'],
    careers: ['System Administrator', 'SOC Tier 1', 'Security Engineer', 'IT Helpdesk Lead'],
    demand: 'Thiết yếu với mọi tổ chức chuyển đổi số.',
    salary: 'Lương khởi điểm 9–16 triệu VNĐ.',
    duration: '2.5–3 năm',
    cert: 'Bằng Cao đẳng chính quy',
    img: '/images/program-secops.jpg',
    icon: <Server />,
  },
  {
    title: 'Lập trình ứng dụng di động',
    desc:
      'Học phát triển ứng dụng native/hybrid cho iOS/Android, quản lý vòng đời sản phẩm, tối ưu hiệu năng và bảo mật. Thực hành phát hành, theo dõi và phân tích dữ liệu sử dụng.',
    highlights: ['Native/Hybrid', 'Product Lifecycle', 'App Security'],
    careers: ['Mobile Developer', 'Flutter/React Native Engineer', 'Product Developer', 'Mobile QA'],
    demand: 'Nhu cầu cao cùng tăng trưởng ứng dụng di động.',
    salary: 'Lương khởi điểm 10–18 triệu VNĐ.',
    duration: '2–2.5 năm',
    cert: 'Bằng Cao đẳng chính quy',
    img: '/images/program-mobile.jpg',
    icon: <Smartphone />,
  },
  {
    title: 'Trí tuệ nhân tạo và Học máy',
    desc:
      'Cung cấp nền tảng ML/DL, xử lý dữ liệu, học có/không giám sát, CNN/RNN, MLOps cơ bản. Ứng dụng vào thị giác máy tính, NLP và hệ gợi ý với dự án thực tế.',
    highlights: ['ML/DL Basics', 'CV & NLP', 'MLOps Intro'],
    careers: ['ML Engineer', 'Data Scientist (Jr)', 'AI Research Assistant', 'Data Analyst'],
    demand: 'Nhu cầu ngày càng tăng trong mọi lĩnh vực.',
    salary: 'Lương khởi điểm 12–20 triệu VNĐ.',
    duration: '2.5–3 năm',
    cert: 'Bằng Cao đẳng chính quy',
    img: '/images/program-ai.jpg',
    icon: <Brain />,
  },
  {
    title: 'Thương mại điện tử',
    desc:
      'Kết hợp CNTT và kinh doanh số: vận hành sàn TMĐT, SEO/SEM, phân tích dữ liệu khách hàng, marketing tự động, thanh toán số và logistics. Thực hành với chiến dịch thực tế.',
    highlights: ['E‑commerce Ops', 'Digital Marketing', 'Analytics'],
    careers: ['E‑commerce Specialist', 'Digital Marketing Executive', 'Growth Analyst', 'CRM Executive'],
    demand: 'Doanh nghiệp số hoá cần nhân lực TMĐT có kỹ năng thực thi.',
    salary: 'Lương khởi điểm 9–16 triệu VNĐ.',
    duration: '2–2.5 năm',
    cert: 'Bằng Cao đẳng chính quy',
    img: '/images/program-ecommerce.jpg',
    icon: <ShoppingCart />,
  },
];

const ProgramsGrid: React.FC = () => {
  return (
    <section aria-labelledby="programs-grid-title">
      <h2 id="programs-grid-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Danh mục chương trình</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programs.map((p, i) => (
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
              <ul className="mt-2 text-slate-700 list-disc list-inside">
                {p.highlights.map(h => <li key={h}>{h}</li>)}
              </ul>
              <div className="mt-2 text-slate-700">
                <div className="text-sm"><span className="font-semibold">Cơ hội nghề nghiệp:</span> {p.careers.join(', ')}</div>
                <div className="text-sm"><span className="font-semibold">Nhu cầu:</span> {p.demand}</div>
                <div className="text-sm"><span className="font-semibold">Mức lương:</span> {p.salary}</div>
                <div className="text-sm"><span className="font-semibold">Thời lượng:</span> {p.duration} – <span className="font-semibold">Văn bằng:</span> {p.cert}</div>
              </div>
              <div className="mt-auto pt-4 flex items-center gap-3">
                <a href={p.title === 'Công nghệ thông tin' ? '/cac-nganh-nghe-dao-tao/cong-nghe-thong-tin' : '#'} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-600" aria-label={`Tìm hiểu thêm về ${p.title}`}>Tìm hiểu thêm</a>
                <a href="/dang-ky-truc-tuyen" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-blue-900 hover:bg-yellow-300 focus-visible:ring-2 focus-visible:ring-yellow-400" aria-label={`Đăng ký tư vấn ${p.title}`}>Đăng ký tư vấn</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ProgramsGrid;

