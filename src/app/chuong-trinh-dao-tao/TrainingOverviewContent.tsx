"use client";

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const Section: React.FC<React.PropsWithChildren<{ title: string; id: string; }>> = ({ title, id, children }) => (
  <motion.section
    aria-labelledby={id}
    className="mb-10 md:mb-14"
    initial={fadeUp.initial}
    whileInView={fadeUp.whileInView}
    viewport={fadeUp.viewport as any}
    transition={fadeUp.transition}
  >
    <h2 id={id} className="text-xl md:text-2xl font-bold text-blue-600 mb-3">
      {title}
    </h2>
    <div className="prose prose-slate max-w-none text-slate-700">
      {children}
    </div>
  </motion.section>
);

const ProgramStructureTimeline = dynamic(() => import('./ProgramStructureTimeline'));
const ProgramsCTA = dynamic(() => import('./ProgramsCTA'));

const TrainingOverviewContent: React.FC = () => {
  return (
    <div className="w-[92%] md:w-[80%] mx-auto py-10 md:py-16">
      <motion.div
        initial={fadeUp.initial}
        whileInView={fadeUp.whileInView}
        viewport={fadeUp.viewport as any}
        transition={fadeUp.transition}
        className="mb-8 md:mb-12"
      >
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
          Tổng quan Chương trình đào tạo
        </h1>
        <p className="mt-3 text-slate-700">
          Lộ trình đào tạo tại trường được thiết kế theo triết lý cân bằng giữa nền tảng học thuật và năng lực thực hành, hướng đến
          khả năng làm việc trong môi trường doanh nghiệp ngay từ năm học thứ hai. Chúng tôi ứng dụng phương pháp học theo dự án (Project‑based),
          học kết hợp (Blended Learning), và tăng cường hợp tác doanh nghiệp để tối đa hóa trải nghiệm nghề nghiệp của sinh viên.
        </p>
      </motion.div>

      <Section id="philosophy" title="Triết lý & Mục tiêu đào tạo">
        <p>
          Chương trình hướng tới phát triển đồng thời ba năng lực cốt lõi: (1) Nền tảng kiến thức vững chắc, (2) Kỹ năng thực hành + tư duy giải quyết vấn đề,
          và (3) Năng lực thích ứng – giao tiếp – làm việc nhóm. Mỗi học phần đều gắn với mục tiêu đầu ra cụ thể và các hoạt động đánh giá đa dạng
          nhằm khuyến khích sinh viên chủ động học tập, phản biện và sáng tạo.
        </p>
        <ul>
          <li>Chuẩn đầu ra theo khung năng lực nghề nghiệp, bám sát yêu cầu doanh nghiệp.</li>
          <li>Lộ trình học tăng dần về độ sâu: nền tảng → chuyên ngành → đồ án ứng dụng/thực tập.</li>
          <li>Khuyến khích nghiên cứu, đổi mới sáng tạo và khởi nghiệp ở bậc cao đẳng.</li>
        </ul>
      </Section>

      <Section id="methodology" title="Phương pháp & Mô hình đào tạo">
        <p>
          Áp dụng mô hình <strong>Project‑based Learning</strong> và <strong>Blended Learning</strong>: lý thuyết tinh gọn trên lớp, thực hành tại phòng lab/xưởng,
          tự học có hướng dẫn qua LMS, kết hợp seminar chuyên đề từ chuyên gia. Mỗi môn học có ít nhất một dự án/bài tập lớn tích hợp kỹ năng nhóm,
          quản lý phiên bản (Git) và thuyết trình.
        </p>
        <ul>
          <li>Studio/Lab theo ca, học cụ và thiết bị đạt chuẩn an toàn.</li>
          <li>Mentoring theo nhóm, Sprint Review/Retrospective theo chu kỳ 2–3 tuần.</li>
          <li>Kho học liệu số, video hướng dẫn và ngân hàng bài tập/đề tài mở.</li>
        </ul>
      </Section>

      <Section id="practice-theory" title="Tỉ lệ Thực hành – Lý thuyết">
        <p>
          Tỉ lệ thời lượng trung bình: <strong>60–70% thực hành</strong> và <strong>30–40% lý thuyết</strong> tùy ngành. Học phần chuyên ngành tăng dần thời lượng xưởng/lab,
          ưu tiên trải nghiệm thiết bị và mô phỏng. Các học kỳ cuối tập trung <strong>đồ án tích hợp</strong> hoặc <strong>thực tập tại doanh nghiệp</strong>.
        </p>
      </Section>

      <Section id="industry" title="Hợp tác doanh nghiệp & Ứng dụng thực tiễn">
        <p>
          Nhà trường hợp tác sâu rộng với doanh nghiệp để đồng thiết kế môn học, tài trợ thiết bị, cung cấp mentor và đề tài thực tế. Sinh viên có cơ hội tham gia
          workshop tuyển dụng, ngày hội nghề nghiệp, dự án dịch vụ cộng đồng và chương trình thực tập trả lương.
        </p>
        <ul>
          <li>Tham quan doanh nghiệp, talkshow định hướng nghề nghiệp định kỳ.</li>
          <li>Đề tài đồ án xuất phát từ nhu cầu thực tế; hội đồng chấm đồ án có đại diện doanh nghiệp.</li>
          <li>Liên kết học bổng/kỳ thực tập với các đối tác chiến lược.</li>
        </ul>
      </Section>

      <Section id="assessment" title="Đánh giá & Đảm bảo chất lượng">
        <p>
          Đa dạng hình thức đánh giá: <em>quiz ngắn</em>, <em>bài tập lớn</em>, <em>thuyết trình</em>, <em>thực hành tại lab/xưởng</em>, <em>đồ án cuối kỳ</em>. Rubric chấm điểm minh bạch,
          phản hồi 2 chiều và cải tiến liên tục theo chuẩn <strong>PDCA</strong>. Học phần thực hành có checklist kỹ năng; học phần lý thuyết có kiểm tra chuẩn hóa.
        </p>
        <ul>
          <li>Chuẩn hóa đề cương, mục tiêu học tập (LOs) và rubric theo từng môn.</li>
          <li>Khảo sát hài lòng sinh viên – doanh nghiệp, đối sánh chuẩn đầu ra.</li>
          <li>Hội đồng chuyên môn cập nhật chương trình thường niên.</li>
        </ul>
      </Section>

      <Section id="outcomes" title="Chuẩn đầu ra & Chuẩn bị nghề nghiệp">
        <p>
          Sinh viên tốt nghiệp đạt năng lực nghề nghiệp ở bậc kỹ thuật viên/chuyên viên: tác phong chuyên nghiệp, kỹ năng số, giao tiếp – hợp tác, tư duy phản biện.
          Dịch vụ hỗ trợ nghề nghiệp gồm: cố vấn học tập, tư vấn CV/portfolio, mô phỏng phỏng vấn, kết nối việc làm và câu lạc bộ học thuật – khởi nghiệp.
        </p>
        <ul>
          <li>Portfolio/Showcase sản phẩm số hoặc nhật ký thực tập/xưởng.</li>
          <li>Hỗ trợ chứng chỉ nghề nghiệp nền tảng (VD: tin học, an toàn lao động…).</li>
          <li>Mạng lưới cựu sinh viên và doanh nghiệp đồng hành tuyển dụng.</li>
        </ul>
      </Section>

      <Section id="structure" title="Cấu trúc chương trình">
        <ProgramStructureTimeline />
      </Section>

      <motion.aside
        role="note"
        aria-label="Lưu ý về chương trình"
        className="mt-12 rounded-xl border border-yellow-200 bg-yellow-50 p-5 text-slate-800"
        initial={fadeUp.initial}
        whileInView={fadeUp.whileInView}
        viewport={fadeUp.viewport as any}
        transition={fadeUp.transition}
      >
        <h3 className="text-base md:text-lg font-semibold text-yellow-700 mb-1">Ghi chú</h3>
        <p className="text-sm">
          Nội dung có thể điều chỉnh định kỳ theo khuyến nghị hội đồng doanh nghiệp và xu hướng công nghệ. Vui lòng theo dõi cập nhật trên website tuyển sinh.
        </p>
      </motion.aside>

      <div className="mt-12">
        <ProgramsCTA />
      </div>
    </div>
  );
};

export default TrainingOverviewContent;

