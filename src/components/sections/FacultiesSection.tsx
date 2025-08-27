'use client';

import React from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { homepagePrograms } from '@/data/programs';
import { ArrowRight, Users, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

// Utility function to format numbers consistently across server and client
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

interface Faculty {
  id: number;
  name: string;
  description: string;
  image: string;
  students: number;
  programs: number;
  achievements: number;
  color: string;
  href: string;
}

const FacultiesSection = () => {
  const faculties: Faculty[] = homepagePrograms.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    image: p.image,
    students: p.students,
    programs: p.programs,
    achievements: p.achievements,
    color: p.color,
    href: p.href,
  }));

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-blue-500 mb-4 uppercase"
          >
            CÁC NGÀNH NGHỀ ĐÀO TẠO
          </motion.h2>
        </div>

        {/* Faculties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculties.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={faculty.image}
                    alt={faculty.name}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${faculty.color} opacity-80`}></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{faculty.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {faculty.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    href={faculty.href}
                    aria-label={`Tìm hiểu thêm về ${faculty.name}`}
                    className="inline-flex items-center space-x-2 text-primary-blue hover:text-primary-yellow font-semibold transition-colors group-hover:translate-x-1 duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
                  >
                    <span>Tìm hiểu thêm</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/cac-nganh-nghe-dao-tao"
            className="inline-flex items-center space-x-2 bg-primary-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-yellow transition-colors duration-300 transform hover:scale-105"
          >
            <span>Xem tất cả ngành nghề đào tạo</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* Student Corner & Recruitment Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-stretch">
            {/* Left Column - Góc Sinh Viên (Student Corner) */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Users size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 uppercase">
                  Góc Sinh Viên
                </h3>
              </div>

              <div className="space-y-6 flex-grow">
                {/* Student Activities */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Hoạt động sinh viên</h4>
                    <p className="text-gray-600 text-sm">Tham gia các câu lạc bộ học thuật, thể thao, văn nghệ và hoạt động tình nguyện</p>
                  </div>
                </div>

                {/* Academic Support */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <BookOpen size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Hỗ trợ học tập</h4>
                    <p className="text-gray-600 text-sm">Tư vấn học tập, hỗ trợ nghiên cứu khoa học và phát triển kỹ năng mềm</p>
                  </div>
                </div>

                {/* Campus Life */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Đời sống sinh viên</h4>
                    <p className="text-gray-600 text-sm">Ký túc xá hiện đại, thư viện 24/7, khu vực giải trí và thể thao</p>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">15,000+</div>
                    <div className="text-xs text-gray-600">Sinh viên đang học</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-green-600">50+</div>
                    <div className="text-xs text-gray-600">Câu lạc bộ hoạt động</div>
                  </div>
                </div>

                {/* Featured Student Article */}
                <div className="mt-8 bg-white rounded-xl p-6 shadow-md border border-blue-100">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <OptimizedImage
                        src="/images/faculty-it.svg"
                        alt="Thành tích lập trình"
                        width={80}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">
                        Đội tuyển lập trình trường đạt giải Nhất cuộc thi ACM ICPC 2025
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        Đội tuyển gồm 3 sinh viên khoa CNTT đã xuất sắc giành giải Nhất khu vực miền Bắc, tạo tiền đề tham dự vòng chung kết thế giới...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">22/07/2025</span>
                        <Link
                          href="/sinh-vien/tin-tuc"
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                        >
                          <span>Xem thêm</span>
                          <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Tuyển Dụng (Recruitment/Career Services) */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg flex flex-col h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <Users size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 uppercase">
                  Tuyển Dụng
                </h3>
              </div>

              <div className="space-y-6 flex-grow">
                {/* Career Counseling */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Tư vấn nghề nghiệp</h4>
                    <p className="text-gray-600 text-sm">Hướng dẫn định hướng nghề nghiệp và phát triển kỹ năng chuyên môn</p>
                  </div>
                </div>

                {/* Industry Partnerships */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Award size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Liên kết doanh nghiệp</h4>
                    <p className="text-gray-600 text-sm">Hợp tác với 200+ doanh nghiệp hàng đầu trong và ngoài nước</p>
                  </div>
                </div>

                {/* Internship Opportunities */}
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <BookOpen size={16} className="text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Thực tập nghề nghiệp</h4>
                    <p className="text-gray-600 text-sm">Cơ hội thực tập tại các công ty công nghệ và doanh nghiệp uy tín</p>
                  </div>
                </div>

                {/* Employment Statistics */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-xs text-gray-600">Tỷ lệ có việc làm</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">200+</div>
                    <div className="text-xs text-gray-600">Đối tác tuyển dụng</div>
                  </div>
                </div>

                {/* Featured Career Article */}
                <div className="mt-8 bg-white rounded-xl p-6 shadow-md border border-green-100">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <OptimizedImage
                        src="/images/quality-education.svg"
                        alt="Thành công nghề nghiệp"
                        width={80}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">
                        Sinh viên CNTT đạt 100% tỷ lệ có việc làm sau tốt nghiệp
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        Khảo sát mới nhất cho thấy 100% sinh viên ngành Công nghệ Thông tin khóa 2024 đã có việc làm với mức lương khởi điểm từ 12-18 triệu đồng...
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">25/07/2025</span>
                        <Link
                          href="/tuyen-dung/tin-tuc"
                          className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold text-sm transition-colors"
                        >
                          <span>Xem thêm</span>
                          <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FacultiesSection;
